'use client'
// ── Screen dispatcher ────────────────────────────────────────────────────────
// Renders the component for a migrated View kind. During the migration the set
// of migrated kinds grows phase by phase; kinds not yet in MIGRATED are rendered
// from legacy HTML strings by the bridge in page.tsx (see isMigrated). When
// MIGRATED covers every kind (Phase 5) the bridge — and this comment — go away.

import type { ReactNode } from 'react'
import type { View, ViewKind } from '../nav/view'

/** View kinds rendered by real React components (vs the legacy-html bridge). */
export const MIGRATED = new Set<ViewKind>([
  // grows each phase: 'protocol', 'disease', 'dx', 'flow', 'tab', ...
])

export function isMigrated(view: View): boolean {
  return MIGRATED.has(view.kind)
}

export function Screen({ view }: { view: View }): ReactNode {
  switch (view.kind) {
    // Component cases land here as each kind is migrated, e.g.
    //   case 'protocol': return <ProtocolDetailView id={view.id} />
    default:
      // Unreachable: page.tsx only mounts <Screen> for migrated kinds.
      throw new Error(`Screen: no component for migrated view kind '${view.kind}'`)
  }
}
