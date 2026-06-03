// ── DX registry ─────────────────────────────────────────────────────────────
// All migrated diagnostic-approach views, keyed by sign id (matching the flow
// `{ to: 'dx', id }` link target, the Diagnostic-home tile, and the legacy
// renderDx<Pascal> name stem). A sign present here is rendered from data via
// renderDxId in cliniqApp.ts; signs not yet present fall back to their legacy
// renderDx<Pascal><Tab> function. Add a sign's DxApproach here as it is
// migrated — see DATA_MIGRATION.md.

import type { DxApproach } from '../dxTypes'
import { epistaxisDx } from './epistaxis'
import { wetEyeDx } from './wetEye'
import { haematuriaDx } from './haematuria'
import { redEyeDx } from './redEye'
import { blindEyeDx } from './blindEye'
import { abnormalPupilDx } from './abnormalPupil'
import { bleedingDx } from './bleeding'
import { seizuresDx } from './seizures'

export const DX: Record<string, DxApproach> = {
  'epistaxis': epistaxisDx,
  'wet-eye': wetEyeDx,
  'haematuria': haematuriaDx,
  'red-eye': redEyeDx,
  'blind-eye': blindEyeDx,
  'abnormal-pupil': abnormalPupilDx,
  'bleeding': bleedingDx,
  'seizures': seizuresDx,
}
