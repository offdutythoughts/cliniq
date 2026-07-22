// ── FLOWS registry ──────────────────────────────────────────────────────────
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
// Phase 3 — new sign screens (gap-analysis remediation)
import { pollakiuriaFlow } from './pollakiuria'
import { syncopeFlows } from './syncope'
import { heartMurmurFlows } from './heartMurmur'
import { feverFlows } from './fever'
import { dysphagiaFlows } from './dysphagia'
import { melenaFlows } from './melena'
import { constipationFlows } from './constipation'
import { oedemaFlows } from './oedema'
import { swollenJointsFlows } from './swollenJoints'
import { anorexiaFlows } from './anorexia'
import { weightLossFlows } from './weightLoss'
import { polyphagiaFlows } from './polyphagia'
import { cyanosisFlows } from './cyanosis'
import { tremorsFlows } from './tremors'
// Shared reference hubs (not tied to a single sign)
import { giParasitesFlow } from './giParasites'

export const FLOWS: Record<string, FlowPage> = Object.fromEntries(
  [
    epistaxisFlow, wetEyeFlow, ...blindEyeFlows, ...redEyeFlows, ...abnormalPupilFlows,
    // Phase 1b
    ...coughingFlows, ...sneezingFlows, ...encephalopathyFlows, diarrhoeaFlow, ...dyspnoeaFlows,
    // Phase 1c
    ...vomitingFlows, ...haematuriaFlows, ...jaundiceFlows, ...paleGumsFlows, ...pupdFlows, ...weaknessFlows,
    // Phase 2
    ...seizuresFlows, ...myelopathyFlows, ...vestibularFlows, ...ataxiaFlows, ...bleedingFlows,
    // Phase 3
    pollakiuriaFlow,
    ...syncopeFlows, ...heartMurmurFlows, ...feverFlows, ...dysphagiaFlows,
    ...melenaFlows, ...constipationFlows, ...oedemaFlows, ...swollenJointsFlows,
    ...anorexiaFlows, ...weightLossFlows, ...polyphagiaFlows, ...cyanosisFlows, ...tremorsFlows,
    // Shared reference hubs
    giParasitesFlow,
  ].map(p => [p.id, p]),
)
