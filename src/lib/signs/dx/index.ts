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

export const DX: Record<string, DxApproach> = {
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
