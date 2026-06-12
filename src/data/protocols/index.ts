import type { ProtocolRow } from '../db'
import { protocols_emergency } from './emergency'
import { protocols_tox } from './tox'
import { protocols_neuro } from './neuro'
import { protocols_eye } from './eye'
import { protocols_bleeding } from './bleeding'
import { protocols_gi } from './gi'
import { protocols_endo_uro_repro } from './endo-uro-repro'
import { protocols_renal_cardiac_vasc } from './renal-cardiac-vasc'

export const protocols: ProtocolRow[] = [
  ...protocols_emergency,
  ...protocols_tox,
  ...protocols_neuro,
  ...protocols_eye,
  ...protocols_bleeding,
  ...protocols_gi,
  ...protocols_endo_uro_repro,
  ...protocols_renal_cardiac_vasc,
]
