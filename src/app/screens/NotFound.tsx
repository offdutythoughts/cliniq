// Generic empty/not-found state, matching the legacy `.empty` block used by the
// flow/dx/disease dispatchers. Only reachable with an unknown id (never for the
// data-derived links the app actually renders).
export function NotFound({ what = 'This page' }: { what?: string }) {
  return (
    <div className="empty">
      <h3>Not found</h3>
      <p>{what} is not available.</p>
    </div>
  )
}
