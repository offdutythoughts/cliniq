import type { Protocol } from '../types'

export const protocols: Protocol[] = [
  {id:'PROT-RESP',name:'Respiratory Crisis — Initial Stabilisation',sp:'Dog + Cat',trigger:'Severe dyspnoea, open-mouth breathing, cyanosis, orthopnoea',priority:'IMMEDIATE',
   steps:[
     {n:1,action:'Flow-by oxygen immediately. Do NOT restrain patient.',note:'Oxygen before everything. A stressed dyspnoeic cat can die from handling.',branch:'',flag:'Cyanosis, paradoxical breathing, exhaustion = imminent arrest'},
     {n:2,action:'Assess SpO₂ via pulse oximeter (digit or ear). Target >95%.',note:'Consider sedation + intubation if SpO₂ not responding to O₂',branch:'SpO₂ <90% → immediate intervention',flag:''},
     {n:3,action:'Auscultate once patient tolerating. Identify pattern — refer to Clinical tab.',note:'',branch:'Muffled bilateral → pleural effusion → proceed to thoracocentesis',flag:''},
     {n:4,action:'CAT SPECIFIC: Check heart rate, gallop rhythm, murmur, rectal temperature.',note:'Bradycardia in a dyspnoeic cat is a red flag — not reassuring.',branch:'Gallop + tachycardia + bilateral muffling → cardiogenic → furosemide 1mg/kg IM',flag:'⚠️ Bradycardia + hypothermia in dyspnoeic cat = severe decompensation or end-stage — grave prognosis'},
     {n:5,action:'Once SpO₂ >95% and RR settling: targeted diagnostics — CXR, FAST ultrasound, bloodwork.',note:'Never take CXR in a severely dyspnoeic patient — stabilise first.',branch:'',flag:''},
   ]},
  {id:'PROT-THOR',name:'Thoracocentesis — Emergency Pleural Tap',sp:'Dog + Cat',trigger:'Suspected pleural effusion or pneumothorax',priority:'URGENT',
   steps:[
     {n:1,action:'Equipment: 19–21G butterfly needle, 3-way tap, 20ml syringe, collection pot for cytology.',note:'Confirm with FAST ultrasound if available before proceeding.',branch:'',flag:''},
     {n:2,action:'Insert needle cranial to rib margin, 7th–9th ICS. Dorsal ⅓ for air, ventral ⅓ for fluid.',note:'Avoid caudal rib edge — intercostal vessels. Can be performed conscious with local anaesthetic.',branch:'',flag:''},
     {n:3,action:'Aspirate gently. Collect sample in EDTA + plain tube for cytology and culture. Measure volume removed.',note:'',branch:'Haemorrhagic fluid → compare PCV fluid vs peripheral blood. Non-clotting = haemothorax',flag:''},
     {n:4,action:"Drain to clinical improvement — do not drain completely in first tap (rebound oedema risk).",note:'Monitor SpO₂ throughout. Stop if coughing excessively.',branch:'',flag:''},
   ]},
]
