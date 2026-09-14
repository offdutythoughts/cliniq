// ── DX registry ─────────────────────────────────────────────────────────────
// Every diagnostic-approach view, keyed by sign id — the key must match the
// flow's `{ to: 'dx', id }` link target and the sign's `dxId ?? id` in
// registry.ts.
//
// There is no fallback. DxApproachView looks the sign up here and renders
// <NotFound> if it is absent, so a sign missing from this map is a dead tile on
// the Diagnostic tab. (This header used to describe a fallback to a legacy
// renderDx<Pascal><Tab> function; that renderer, and the file it lived in, were
// deleted in e8d5347.)
//
// Adding a sign means editing three files — registry.ts, flows/index.ts and this
// one — which is a known sharp edge, not a design: see the audit note about
// deriving both barrels from SIGNS.

import type { DxApproach } from '../dxTypes'
import { epistaxisDx } from './epistaxis'
import { wetEyeDx } from './wetEye'
import { haematuriaDx } from './haematuria'
import { redEyeDx } from './redEye'
import { blindEyeDx } from './blindEye'
import { abnormalPupilDx } from './abnormalPupil'
import { bleedingDx } from './bleeding'
import { seizuresDx } from './seizures'
import { coughingDx } from './coughing'
import { encephalopathyDx } from './encephalopathy'
import { sneezingDx } from './sneezing'
import { paleGumsDx } from './paleGums'
import { vestibularDx } from './vestibular'
import { dyspnoeaDx } from './dyspnoea'
import { jaundiceDx } from './jaundice'
import { myelopathyDx } from './myelopathy'
import { weaknessDx } from './weakness'
import { ataxiaDx } from './ataxia'
import { vomitingDx } from './vomiting'
import { regurgitationDx } from './regurgitation'
import { diarrhoeaDx } from './diarrhoea'
import { pupdDx } from './pupd'
// Phase 3 — new sign screens (gap-analysis remediation)
import { pollakiuriaDx } from './pollakiuria'
import { syncopeDx } from './syncope'
import { heartMurmurDx } from './heartMurmur'
import { feverDx } from './fever'
import { dysphagiaDx } from './dysphagia'
import { melenaDx } from './melena'
import { constipationDx } from './constipation'
import { oedemaDx } from './oedema'
import { swollenJointsDx } from './swollenJoints'
import { anorexiaDx } from './anorexia'
import { weightLossDx } from './weightLoss'
import { polyphagiaDx } from './polyphagia'
import { cyanosisDx } from './cyanosis'
import { tremorsDx } from './tremors'

/** Every approach, keyed by its own `sign`.
 *
 *  This used to be a hand-written map of 38 `'anorexia': anorexiaDx` lines. Two
 *  of them pointed at the same module — `pale-gums` and `pale-mm` — an alias
 *  added because FlowPageView's getDxSign strips suffixes off a flow page id
 *  until it finds a DX key, and the pale flow is `pale-mm` while its approach is
 *  `pale-gums`. registry.ts already records that relationship (`flowId` vs
 *  `dxId`); getDxSign now reads it there instead, so the alias is gone and a key
 *  can no longer disagree with the module it points at.
 *
 *  signs.test.ts fails if a sign in the registry has no approach here, or an
 *  approach here answers to no sign. */
const APPROACHES: DxApproach[] = [
  anorexiaDx, weightLossDx, polyphagiaDx, cyanosisDx, tremorsDx, pollakiuriaDx,
  syncopeDx, heartMurmurDx, feverDx, dysphagiaDx, melenaDx, constipationDx,
  oedemaDx, swollenJointsDx, epistaxisDx, wetEyeDx, haematuriaDx, redEyeDx,
  blindEyeDx, abnormalPupilDx, bleedingDx, seizuresDx, coughingDx,
  encephalopathyDx, sneezingDx, paleGumsDx, vestibularDx, dyspnoeaDx,
  jaundiceDx, myelopathyDx, weaknessDx, ataxiaDx, vomitingDx, regurgitationDx,
  diarrhoeaDx, pupdDx,
]

export const DX: Record<string, DxApproach> = Object.fromEntries(
  APPROACHES.map(a => [a.sign, a]),
)
