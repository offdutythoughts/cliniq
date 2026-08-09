// ── Passkeys, browser side ───────────────────────────────────────────────────
//
// The glue between the JSON the server sends (convex/passkeys.ts) and the
// ArrayBuffers `navigator.credentials` insists on. WebAuthn's JSON dialect is
// base64url everywhere the API wants bytes, so the whole job is decoding on the
// way in and encoding on the way out.
//
// Written by hand rather than pulling in @simplewebauthn/browser: it is ~50
// lines, and the published versions collide with the optional peer dependency
// @auth/core declares.

/** Server-issued options for creating a passkey (a subset of what we use). */
type CreationOptionsJSON = {
  challenge: string
  rp: { id?: string; name: string }
  user: { id: string; name: string; displayName: string }
  pubKeyCredParams: { alg: number; type: 'public-key' }[]
  timeout?: number
  attestation?: AttestationConveyancePreference
  excludeCredentials?: { id: string; type?: string; transports?: string[] }[]
  authenticatorSelection?: AuthenticatorSelectionCriteria
}

/** Server-issued options for signing in with a passkey. */
type RequestOptionsJSON = {
  challenge: string
  rpId?: string
  timeout?: number
  userVerification?: UserVerificationRequirement
  allowCredentials?: { id: string; type?: string; transports?: string[] }[]
}

/** Does this browser speak WebAuthn at all? */
export function passkeysSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.PublicKeyCredential !== 'undefined' &&
    typeof navigator.credentials?.create === 'function'
  )
}

/**
 * Is there a built-in authenticator — Face ID, Touch ID, Windows Hello, an
 * Android fingerprint sensor? Decides whether we offer biometrics by name or
 * fall back to the generic "passkey" wording.
 */
export async function biometricAuthenticatorAvailable(): Promise<boolean> {
  if (!passkeysSupported()) return false
  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

/** The user cancelled the system prompt (or it timed out) rather than failing. */
export function isPasskeyCancellation(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === 'NotAllowedError' || error.name === 'AbortError')
  )
}

/**
 * Run the "create a passkey" prompt. Returns the response as a JSON string,
 * shaped the way @simplewebauthn/server expects to verify it.
 */
export async function createPasskey(optionsJSON: string): Promise<string> {
  const options = JSON.parse(optionsJSON) as CreationOptionsJSON
  const credential = (await navigator.credentials.create({
    publicKey: {
      ...options,
      challenge: fromBase64Url(options.challenge),
      user: { ...options.user, id: fromBase64Url(options.user.id) },
      excludeCredentials: (options.excludeCredentials ?? []).map((credential) => ({
        id: fromBase64Url(credential.id),
        type: 'public-key' as const,
        transports: credential.transports as AuthenticatorTransport[] | undefined,
      })),
    },
  })) as PublicKeyCredential | null

  if (credential === null) throw new Error('No passkey was created.')
  const response = credential.response as AuthenticatorAttestationResponse & {
    getTransports?: () => string[]
  }

  return JSON.stringify({
    id: credential.id,
    rawId: toBase64Url(credential.rawId),
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: credential.authenticatorAttachment ?? undefined,
    response: {
      clientDataJSON: toBase64Url(response.clientDataJSON),
      attestationObject: toBase64Url(response.attestationObject),
      transports: response.getTransports?.() ?? [],
    },
  })
}

/** Run the "use a passkey" prompt. Returns the assertion as a JSON string. */
export async function assertPasskey(optionsJSON: string): Promise<string> {
  const options = JSON.parse(optionsJSON) as RequestOptionsJSON
  const credential = (await navigator.credentials.get({
    publicKey: {
      ...options,
      challenge: fromBase64Url(options.challenge),
      allowCredentials: (options.allowCredentials ?? []).map((credential) => ({
        id: fromBase64Url(credential.id),
        type: 'public-key' as const,
        transports: credential.transports as AuthenticatorTransport[] | undefined,
      })),
    },
  })) as PublicKeyCredential | null

  if (credential === null) throw new Error('No passkey was used.')
  const response = credential.response as AuthenticatorAssertionResponse

  return JSON.stringify({
    id: credential.id,
    rawId: toBase64Url(credential.rawId),
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults(),
    authenticatorAttachment: credential.authenticatorAttachment ?? undefined,
    response: {
      clientDataJSON: toBase64Url(response.clientDataJSON),
      authenticatorData: toBase64Url(response.authenticatorData),
      signature: toBase64Url(response.signature),
      // Base64url like every other byte field here — the server decodes it back
      // to the Convex user ID it stamped into the passkey at registration.
      userHandle: response.userHandle === null ? undefined : toBase64Url(response.userHandle),
    },
  })
}

/**
 * A name for the passkey the user just made, guessed from the platform so the
 * list reads "iPhone" rather than "Passkey 3". They can rename it afterwards.
 */
export function suggestPasskeyLabel(): string {
  if (typeof navigator === 'undefined') return 'Passkey'
  const ua = navigator.userAgent
  if (/iPhone/.test(ua)) return 'iPhone'
  if (/iPad/.test(ua)) return 'iPad'
  if (/Android/.test(ua)) return 'Android device'
  if (/Macintosh/.test(ua)) return 'Mac'
  if (/Windows/.test(ua)) return 'Windows PC'
  return 'This device'
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, '='))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}
