/**
 * Reads the single query parameter that account links carry.
 *
 * `convex/emails.ts` packs the address and the token into one value as
 * `address~token`, and both landing pages (`/verify`, `/reset`) unpack it here.
 * The reason it is one parameter rather than two is written up in
 * `convex/emailVerification.ts`: an `&` never survived the trip from the inbox,
 * and a parameter named `code` is consumed by ConvexAuthProvider before a page
 * can read it.
 *
 * Returns empty strings when anything is missing or malformed, which is what the
 * pages already treat as a dead link.
 */
export function unpackCredential(packed: string | null): { email: string; code: string } {
  const empty = { email: '', code: '' }
  if (packed === null) return empty

  // The token never contains the separator, so the last one is the boundary —
  // an address that contains one still unpacks correctly.
  const boundary = packed.lastIndexOf('~')
  if (boundary <= 0 || boundary === packed.length - 1) return empty

  return {
    email: packed.slice(0, boundary).trim().toLowerCase(),
    code: packed.slice(boundary + 1),
  }
}
