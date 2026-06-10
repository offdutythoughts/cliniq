'use client'
// ── Screen dispatcher ────────────────────────────────────────────────────────
// Maps the current View to its React component. Every kind is a component — the
// app no longer renders any HTML strings.

import type { ReactNode } from 'react'
import type { View } from '../nav/view'
import { ProtocolDetailView } from './ProtocolDetailView'
import { DiseasePageView } from './DiseasePageView'
import { DxApproachView } from './DxApproachView'
import { FlowPageView } from './FlowPageView'
import { LesionLocView } from './LesionLocView'
import { SubTypeDetailView } from './SubTypeDetailView'
import { LesionDetailView } from './LesionDetailView'
import { DiffDetailView } from './DiffDetailView'
import { TabHome } from './TabHome'

export function Screen({ view }: { view: View }): ReactNode {
  switch (view.kind) {
    case 'tab': return <TabHome tab={view.tab} />
    case 'protocol': return <ProtocolDetailView id={view.id} />
    case 'disease': return <DiseasePageView id={view.id} />
    case 'dx': return <DxApproachView sign={view.sign} active={view.tab} />
    case 'flow': return <FlowPageView flowId={view.flowId} />
    case 'lesionLoc': return <LesionLocView loc={view.loc} name={view.name} filter={view.filter} />
    case 'subTypeDetail': return <SubTypeDetailView id={view.id} />
    case 'lesionDetail': return <LesionDetailView id={view.id} />
    case 'diff': return <DiffDetailView id={view.id} />
    default: {
      // Exhaustive: every View kind has a component.
      const _exhaustive: never = view
      throw new Error(`Screen: unhandled view ${JSON.stringify(_exhaustive)}`)
    }
  }
}
