// ── DX registry ─────────────────────────────────────────────────────────────
// All migrated diagnostic-approach views, keyed by sign id (matching the flow
// `{ to: 'dx', id }` link target, the Diagnostic-home tile, and the legacy
// renderDx<Pascal> name stem). A sign present here is rendered from data via
// renderDxId in cliniqApp.ts; signs not yet present fall back to their legacy
// renderDx<Pascal><Tab> function. Add a sign's DxApproach here as it is
// migrated.

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
