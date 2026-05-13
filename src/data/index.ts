export { lesions } from './lesions'
export { differentials } from './differentials'
export { diseases } from './diseases'
export { protocols } from './protocols'

import type { BodySystem } from '../types'

export const BODY_SYSTEMS: BodySystem[] = [
  {id:'digestive',    label:'Digestive',                  locs:['LOC-OESOPH','LOC-GI-UPPER','LOC-GI-PRIMARY','LOC-GI-SECONDARY','LOC-DI-SI','LOC-DI-SI-SEC','LOC-DI-LB','LOC-JD-PREHEP','LOC-JD-HEP','LOC-JD-POSTHEP']},
  {id:'respiratory',  label:'Respiratory',                locs:['LOC-NASAL','LOC-SN-UNI','LOC-SN-BI','LOC-LARYNX','LOC-PARENCH','LOC-PLEURAL','LOC-CO-DRY','LOC-CO-WET']},
  {id:'neuro',        label:'Neurological',               locs:['LOC-EN-INFLAM','LOC-EN-CVA','LOC-EN-METAB','LOC-EN-NEO','LOC-AT-CEREB','LOC-SZ-EXTRACRANIAL','LOC-SZ-INTRACRANIAL','LOC-VE-PERIPH','LOC-VE-CENTRAL','LOC-VE-BILAT']},
  {id:'neuromusc',    label:'Neuromuscular / Weakness',   locs:['LOC-NM-NEURO','LOC-NM-JUNC','LOC-NM-MYO','LOC-WK-EPISODIC','LOC-WK-PERSISTENT','LOC-WK-COLLAPSE']},
  {id:'spine',        label:'Spine / Myelopathy',         locs:['LOC-MY-CERV','LOC-MY-TL']},
  {id:'cardiohaem',   label:'Cardiovascular / Haematology',locs:['LOC-PM-ANAEMIA','LOC-PM-PERFUSION']},
  {id:'endocrine',    label:'Endocrine / PU·PD',          locs:['LOC-PUPD-RENAL','LOC-PUPD-ENDO','LOC-PUPD-MED','LOC-PUPD-CDI','LOC-PUPD-NDI','LOC-PUPD-PRIM']},
  {id:'ophthalmic',   label:'Ophthalmic',                  locs:['LOC-RE-ADNEXA','LOC-RE-TEL','LOC-RE-CONJ','LOC-RE-EPISC','LOC-RE-CORNEA-SUP','LOC-RE-CORNEA-DEEP','LOC-RE-UVEA','LOC-RE-AC','LOC-RE-GLAUCOMA','LOC-RE-RETINA','LOC-RE-ORBIT','LOC-AP-IRIS','LOC-AP-LENS','LOC-AP-RETINA','LOC-AP-MIOSIS','LOC-AP-MYDR','LOC-AP-NEURO']},
]
