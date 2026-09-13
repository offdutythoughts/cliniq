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

export const DX: Record<string, DxApproach> = {
  'anorexia': anorexiaDx,
  'weight-loss': weightLossDx,
  'polyphagia': polyphagiaDx,
  'cyanosis': cyanosisDx,
  'tremors': tremorsDx,
  'pollakiuria': pollakiuriaDx,
  'syncope': syncopeDx,
  'heart-murmur': heartMurmurDx,
  'fever': feverDx,
  'dysphagia': dysphagiaDx,
  'melena': melenaDx,
  'constipation': constipationDx,
  'oedema': oedemaDx,
  'swollen-joints': swollenJointsDx,
  'epistaxis': epistaxisDx,
  'wet-eye': wetEyeDx,
  'haematuria': haematuriaDx,
  'red-eye': redEyeDx,
  'blind-eye': blindEyeDx,
  'abnormal-pupil': abnormalPupilDx,
  'bleeding': bleedingDx,
  'seizures': seizuresDx,
  'coughing': coughingDx,
  'encephalopathy': encephalopathyDx,
  'sneezing': sneezingDx,
  'pale-gums': paleGumsDx,
  'pale-mm': paleGumsDx,
  'vestibular': vestibularDx,
  'dyspnoea': dyspnoeaDx,
  'jaundice': jaundiceDx,
  'myelopathy': myelopathyDx,
  'weakness': weaknessDx,
  'ataxia': ataxiaDx,
  'vomiting': vomitingDx,
  'regurgitation': regurgitationDx,
  'diarrhoea': diarrhoeaDx,
  'pupd': pupdDx,
}
