// ── FLOWS registry ──────────────────────────────────────────────────────────
// All migrated flow pages, keyed by FlowPage.id. A SignEntry.flowId in
// ../registry that matches a key here is rendered from data (via renderFlowId in
// cliniqApp.ts); signs without a flowId still use their legacy render function.
// Add a sign's pages here as they are migrated — see DATA_MIGRATION.md.

import type { FlowPage } from '../flowTypes'
import { epistaxisFlow } from './epistaxis'
import { wetEyeFlow } from './wetEye'
import { blindEyeFlows } from './blindEye'

export const FLOWS: Record<string, FlowPage> = Object.fromEntries(
  [epistaxisFlow, wetEyeFlow, ...blindEyeFlows].map(p => [p.id, p]),
)
