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

/**
 * What this platform calls its built-in unlock, for button and heading copy.
 *
 * `isUserVerifyingPlatformAuthenticatorAvailable` says only that one exists,
 * not what it is named — so offering "Face ID or Touch ID" to an Android phone
 * with a fingerprint sensor is a straightforward misdescription of a button
 * that is about to open a Google Password Manager sheet.
 */
export function biometricName(): string | null {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent
  if (/iPhone|iPad|Macintosh/.test(ua)) return 'Face ID or Touch ID'
  if (/Android/.test(ua)) return 'your fingerprint or screen lock'
  if (/Windows/.test(ua)) return 'Windows Hello'
  return null
}

/**
 * Can this browser offer passkeys from the email field's autofill dropdown —
 * "conditional mediation"? It is the flow both ecosystems expect: iCloud
 * Keychain on Apple devices and Google Password Manager on Android surface the
 * account there, and if the device holds no passkey for us nothing appears at
 * all. That silence is the point — unlike the button, it cannot dead-end.
 */
export async function conditionalMediationAvailable(): Promise<boolean> {
  if (!passkeysSupported()) return false
  try {
    const isAvailable = window.PublicKeyCredential.isConditionalMediationAvailable
    return typeof isAvailable === 'function' && (await isAvailable.call(window.PublicKeyCredential))
  } catch {
    return false
  }
}

/**
 * We aborted the ceremony ourselves — the only failure that must stay silent.
 * A conditional request runs for as long as the login page is open, and both
 * leaving the page and pressing the passkey button cancel it deliberately.
 */
export function isPasskeyAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/**
 * What to tell the user when a passkey ceremony fails.
 *
 * `NotAllowedError` deliberately covers both "you dismissed the sheet" and
 * "this device has no passkey for vetic" — the platform refuses to distinguish
 * them, because doing so would tell any page which sites you hold keys for. We
 * used to treat the whole error as a cancellation and show nothing, so the
 * commonest case by far — someone pressing the button on a device that has
 * never registered a passkey — looked exactly like a dead button. One message
 * that is true of both readings beats silence.
 */
export function passkeyErrorMessage(error: unknown, kind: 'signIn' | 'register'): string {
  const signIn = kind === 'signIn'
  if (error instanceof DOMException) {
    switch (error.name) {
      case 'NotAllowedError':
        return signIn
          ? 'No passkey was used. If you haven’t set one up on this device yet, sign in with your email and password — then add a passkey from your account page.'
          : 'No passkey was created — the prompt was dismissed or timed out.'
      case 'InvalidStateError':
        // The authenticator recognised itself in excludeCredentials.
        return 'This device already has a passkey for your account.'
      case 'SecurityError':
        // rpID vs origin mismatch: SITE_URL on the Convex deployment does not
        // match the address in the address bar.
        return 'Passkeys aren’t available on this address. Use your email and password instead.'
      case 'NotSupportedError':
        return 'This device can’t make the kind of passkey Vetic needs. Use your email and password instead.'
    }
  }
  return signIn
    ? 'That passkey didn’t work. Sign in with your email and password, or add a passkey from your account page.'
    : 'We couldn’t set up a passkey on this device. You can try again.'
}

/**
 * Run the "create a passkey" prompt. Returns the response as a JSON string,
 * shaped the way @simplewebauthn/server expects to verify it.
 */
export async function createPasskey(optionsJSON: string): Promise<string> {
  // The JSON `excludeCredentials` is pulled out of the spread rather than
  // overwritten: it holds base64url ids, and leaving it in the rest object
  // would keep that string-shaped field in the type even once it is replaced.
  const { excludeCredentials: encodedExcludes, ...rest } = JSON.parse(
    optionsJSON,
  ) as CreationOptionsJSON
  const options = rest
  const excludeCredentials = (encodedExcludes ?? []).map((credential) => ({
    id: fromBase64Url(credential.id),
    type: 'public-key' as const,
    transports: credential.transports as AuthenticatorTransport[] | undefined,
  }))
  const credential = (await navigator.credentials.create({
    publicKey: {
      ...options,
      challenge: fromBase64Url(options.challenge),
      user: { ...options.user, id: fromBase64Url(options.user.id) },
      // Only when there is something to exclude: an empty list means "no
      // constraint" to us but is one more field for an authenticator to
      // mishandle, and the account's first passkey always has an empty one.
      ...(excludeCredentials.length > 0 ? { excludeCredentials } : {}),
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

/**
 * Run the "use a passkey" ceremony. Returns the assertion as a JSON string.
 *
 * `conditional` puts the passkey in the email field's autofill dropdown instead
 * of a modal sheet, and `signal` cancels a request that is still waiting —
 * which a conditional one always is, since it sits open until the user picks.
 */
export async function assertPasskey(
  optionsJSON: string,
  { conditional = false, signal }: { conditional?: boolean; signal?: AbortSignal } = {},
): Promise<string> {
  // Pulled out of the spread for the same reason as `excludeCredentials` above.
  const { allowCredentials: encodedAllowed, ...options } = JSON.parse(
    optionsJSON,
  ) as RequestOptionsJSON
  // An empty `allowCredentials` is not the same as an absent one to every
  // authenticator, and every key we issue is discoverable — so leave it off and
  // let the platform offer whatever it holds for this domain.
  const allowCredentials = (encodedAllowed ?? []).map((credential) => ({
    id: fromBase64Url(credential.id),
    type: 'public-key' as const,
    transports: credential.transports as AuthenticatorTransport[] | undefined,
  }))
  const credential = (await navigator.credentials.get({
    mediation: conditional ? 'conditional' : undefined,
    signal,
    publicKey: {
      ...options,
      challenge: fromBase64Url(options.challenge),
      ...(allowCredentials.length > 0 ? { allowCredentials } : {}),
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
 * A name for the passkey the user just made, so the list reads "iPhone" rather
 * than "Passkey 3". They can rename it afterwards.
 *
 * Pass the registration response and the name gets better: an Apple or Android
 * passkey that syncs lives in a keychain rather than in the handset, so calling
 * it "iPhone" would be a lie the moment the user picks it up on their iPad.
 * `transports` says which — "internal" alone is bound to this device, while
 * "hybrid" means it was made on a phone scanned from another machine.
 */
export function suggestPasskeyLabel(responseJSON?: string): string {
  if (typeof navigator === 'undefined') return 'Passkey'
  const ua = navigator.userAgent
  const apple = /iPhone|iPad|Macintosh/.test(ua)
  const android = /Android/.test(ua)

  const transports = readTransports(responseJSON)
  if (transports !== null) {
    // Made by scanning a QR code with a phone — the key is on that phone, not
    // on whatever machine is showing this page.
    if (transports.includes('hybrid')) return apple ? 'iPhone or iPad' : 'Phone'
    // A removable security key: naming it after this computer would mislead.
    if (transports.includes('usb') || transports.includes('nfc') || transports.includes('ble')) {
      return 'Security key'
    }
    if (transports.includes('internal')) {
      if (apple) return 'iCloud Keychain'
      if (android) return 'Google Password Manager'
    }
  }

  if (/iPhone/.test(ua)) return 'iPhone'
  if (/iPad/.test(ua)) return 'iPad'
  if (android) return 'Android device'
  if (/Macintosh/.test(ua)) return 'Mac'
  if (/Windows/.test(ua)) return 'Windows PC'
  return 'This device'
}

/** The transports out of a registration response, or null if it says nothing. */
function readTransports(responseJSON?: string): string[] | null {
  if (responseJSON === undefined) return null
  try {
    const parsed = JSON.parse(responseJSON) as { response?: { transports?: string[] } }
    const transports = parsed.response?.transports
    return Array.isArray(transports) && transports.length > 0 ? transports : null
  } catch {
    return null
  }
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
