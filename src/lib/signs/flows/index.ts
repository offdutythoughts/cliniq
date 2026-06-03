// ── FLOWS registry ──────────────────────────────────────────────────────────
// All migrated flow pages, keyed by FlowPage.id. A SignEntry.flowId in
// ../registry that matches a key here is rendered from data (via renderFlowId in
// cliniqApp.ts); signs without a flowId still use their legacy render function.
// Add a sign's pages here as they are migrated — see DATA_MIGRATION.md.

import type { FlowPage } from '../flowTypes'
import { epistaxisFlow } from './epistaxis'
import { wetEyeFlow } from './wetEye'
import { blindEyeFlows } from './blindEye'
import { redEyeFlows } from './redEye'
import { abnormalPupilFlows } from './abnormalPupil'
import { coughingFlows } from './coughing'
import { sneezingFlows } from './sneezing'
import { encephalopathyFlows } from './encephalopathy'
import { diarrhoeaFlow } from './diarrhoea'
import { dyspnoeaFlows } from './dyspnoea'
import { vomitingFlows } from './vomiting'
import { haematuriaFlows } from './haematuria'
import { jaundiceFlows } from './jaundice'
import { paleGumsFlows } from './paleGums'
import { pupdFlows } from './pupd'
import { weaknessFlows } from './weakness'
import { seizuresFlows } from './seizures'
import { myelopathyFlows } from './myelopathy'
import { vestibularFlows } from './vestibular'
import { ataxiaFlows } from './ataxia'
import { bleedingFlows } from './bleeding'

export const FLOWS: Record<string, FlowPage> = Object.fromEntries(
  [
    epistaxisFlow, wetEyeFlow, ...blindEyeFlows, ...redEyeFlows, ...abnormalPupilFlows,
    // Phase 1b
    ...coughingFlows, ...sneezingFlows, ...encephalopathyFlows, diarrhoeaFlow, ...dyspnoeaFlows,
    // Phase 1c
    ...vomitingFlows, ...haematuriaFlows, ...jaundiceFlows, ...paleGumsFlows, ...pupdFlows, ...weaknessFlows,
    // Phase 2
    ...seizuresFlows, ...myelopathyFlows, ...vestibularFlows, ...ataxiaFlows, ...bleedingFlows,
  ].map(p => [p.id, p]),
)
