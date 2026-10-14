// ── Case Triage: veterinary abbreviation glossary ───────────────────────────
// Case notes are written in shorthand ("8yo MN DSH, PU/PD, V+ x3d, CKD IRIS
// 2"), and the extraction model can only turn that into search keywords if it
// reads each abbreviation the way the author meant it. This module finds the
// abbreviations in a case, resolves the ones it knows, and reports the ones it
// doesn't — CaseTriageScreen then asks the reader for the full form of each
// unknown one instead of letting the model guess.
//
// Small-animal clinical terms only, curated from two reference lists (the
// livestock, poultry, organisation and journal entries are dropped — they never
// appear in a dog/cat case and only widen the ambiguity):
//   - University of Illinois Library, Veterinary Medicine Abbreviations
//     https://www.library.illinois.edu/vex/vetabbrev/
//   - VetCompass Australia, Veterinary Acronyms
//     https://www.vetcompass.com.au/research/veterinary-acronyms/
// plus common clinic shorthand neither list carries (signalment, breed,
// vital-sign and physical-exam abbreviations).
//
// An entry with several `senses` is genuinely ambiguous ("PE" = physical exam,
// pleural effusion, pulmonary embolism) — every sense is handed to the model,
// which picks by context. Never collapse those to one.

export type AbbrevEntry = {
  /** Spellings as written. Dots are ignored when matching ("b.i.d." = "bid"). */
  abbr: string[]
  senses: string[]
  /** Also match when written in lower or title case ("bid", "Dx"). Off for
   *  entries whose lowercase spelling is an ordinary word or unit ("mm",
   *  "hr", "pe"), which only match in capitals. */
  anyCase?: boolean
}

export const VET_ABBREVIATIONS: AbbrevEntry[] = [
  // ── Signalment & breed ──────────────────────────────────────────────────
  { abbr: ['MN', 'M/N', 'MC', 'M/C', 'CM'], senses: ['male neutered (castrated)'] },
  { abbr: ['MI', 'M/I', 'ME', 'M/E'], senses: ['male intact (entire)'] },
  { abbr: ['FS', 'F/S'], senses: ['female spayed', 'fluorescein stain'] },
  { abbr: ['SF'], senses: ['spayed female'] },
  { abbr: ['FN', 'F/N'], senses: ['female neutered (spayed)'] },
  { abbr: ['FI', 'F/I', 'FE', 'F/E'], senses: ['female intact (entire)'] },
  { abbr: ['YO', 'Y/O'], senses: ['years old'], anyCase: true },
  { abbr: ['MO'], senses: ['months old'], anyCase: true },
  { abbr: ['DSH'], senses: ['domestic shorthair (cat)'] },
  { abbr: ['DDB'], senses: ['Dogue de Bordeaux'] },
  { abbr: ['DMH'], senses: ['domestic medium-hair (cat)'] },
  { abbr: ['DLH'], senses: ['domestic longhair (cat)'] },
  { abbr: ['GSD'], senses: ['German Shepherd Dog'] },
  { abbr: ['GSP'], senses: ['German Shorthaired Pointer'] },
  { abbr: ['CKCS'], senses: ['Cavalier King Charles Spaniel'] },
  { abbr: ['JRT'], senses: ['Jack Russell Terrier'] },
  { abbr: ['WHWT', 'WHT'], senses: ['West Highland White Terrier'] },
  { abbr: ['SBT', 'SBTs', 'Staffy'], senses: ['Staffordshire Bull Terrier'] },
  { abbr: ['BMD'], senses: ['Bernese Mountain Dog', 'bone mineral density'] },
  { abbr: ['IRIS'], senses: ['International Renal Interest Society (CKD/AKI staging)'] },
  { abbr: ['ACVIM'], senses: ['American College of Veterinary Internal Medicine (e.g. ACVIM stage B2 heart disease)'] },
  { abbr: ['MGCS'], senses: ['modified Glasgow coma scale'] },
  { abbr: ['BW'], senses: ['body weight'] },
  { abbr: ['BCS'], senses: ['body condition score'] },
  { abbr: ['MCS'], senses: ['muscle condition score'] },

  // ── History & record shorthand ──────────────────────────────────────────
  { abbr: ['Hx'], senses: ['history'], anyCase: true },
  { abbr: ['PMH'], senses: ['past medical history'] },
  { abbr: ['CC'], senses: ['chief complaint'] },
  { abbr: ['Dx'], senses: ['diagnosis'], anyCase: true },
  { abbr: ['DDx', 'DDX'], senses: ['differential diagnoses'], anyCase: true },
  { abbr: ['Tx'], senses: ['treatment'], anyCase: true },
  { abbr: ['Rx'], senses: ['prescription / treatment'], anyCase: true },
  { abbr: ['Sx'], senses: ['surgery', 'signs (symptoms)'], anyCase: true },
  { abbr: ['Bx'], senses: ['biopsy'], anyCase: true },
  { abbr: ['Fx'], senses: ['fracture'], anyCase: true },
  { abbr: ['Px'], senses: ['physical examination', 'prognosis'], anyCase: true },
  { abbr: ['PE'], senses: ['physical examination', 'pleural effusion', 'pulmonary embolism'] },
  { abbr: ['GPE'], senses: ['general physical examination'] },
  { abbr: ['GHC'], senses: ['general health check'] },
  { abbr: ['SOAP'], senses: ['subjective, objective, assessment, plan (record format)'] },
  { abbr: ['BAR'], senses: ['bright, alert, responsive'] },
  { abbr: ['QAR'], senses: ['quiet, alert, responsive'] },
  { abbr: ['NQR'], senses: ['not quite right'] },
  { abbr: ['ADR'], senses: ["ain't doing right (vague malaise)", 'adverse drug reaction'] },
  { abbr: ['NAD'], senses: ['no abnormalities detected'] },
  { abbr: ['NAF'], senses: ['no abnormal findings'] },
  { abbr: ['NSF'], senses: ['no significant findings'] },
  { abbr: ['WNL'], senses: ['within normal limits'], anyCase: true },
  { abbr: ['NE'], senses: ['not evaluated'] },
  { abbr: ['NOC'], senses: ['no other concerns'] },
  { abbr: ['INI'], senses: ['if no improvement'] },
  { abbr: ['UTD'], senses: ['up to date (vaccination / parasite prevention)'] },
  { abbr: ['EDDU', 'EDUF'], senses: ['eating, drinking, urinating, defecating'] },
  { abbr: ['V/D/C/S', 'VDCS'], senses: ['vomiting, diarrhoea, coughing, sneezing'] },
  { abbr: ['V+', 'V++'], senses: ['vomiting present'] },
  { abbr: ['D+', 'D++'], senses: ['diarrhoea present'] },
  { abbr: ['V/D', 'V+D', 'VD'], senses: ['vomiting and diarrhoea', 'ventrodorsal (radiograph view)'] },
  { abbr: ['PU/PD', 'PUPD', 'PD/PU', 'PDPU'], senses: ['polyuria and polydipsia'] },
  { abbr: ['PU'], senses: ['polyuria'] },
  { abbr: ['PD'], senses: ['polydipsia', 'periodontal disease'] },
  { abbr: ['PP'], senses: ['polyphagia'] },
  { abbr: ['WL'], senses: ['weight loss'] },
  { abbr: ['HBC'], senses: ['hit by car'] },
  { abbr: ['KBH'], senses: ['kicked by horse'] },
  { abbr: ['FB'], senses: ['foreign body'] },
  { abbr: ['GIFB'], senses: ['gastrointestinal foreign body'] },
  { abbr: ['DOA'], senses: ['dead on arrival'] },
  { abbr: ['DNR'], senses: ['do not resuscitate'] },
  { abbr: ['PTS'], senses: ['put to sleep (euthanasia)'] },
  { abbr: ['QOL'], senses: ['quality of life'] },
  { abbr: ['TGH'], senses: ['to go home'] },
  { abbr: ['POC'], senses: ['post-op check', 'point of care'] },
  { abbr: ['BIOP'], senses: ["been in owner's possession"] },
  { abbr: ['WB'], senses: ['weight bearing', 'whole blood'] },
  { abbr: ['NWB'], senses: ['non-weight bearing'] },
  { abbr: ['TPR'], senses: ['temperature, pulse, respiration'] },

  // ── Dosing & routes ─────────────────────────────────────────────────────
  { abbr: ['SID', 'QD', 'q24h'], senses: ['once daily'], anyCase: true },
  { abbr: ['BID', 'q12h'], senses: ['twice daily'], anyCase: true },
  { abbr: ['TID', 'q8h'], senses: ['three times daily'], anyCase: true },
  { abbr: ['QID', 'q6h'], senses: ['four times daily'], anyCase: true },
  { abbr: ['EOD', 'QOD'], senses: ['every other day'], anyCase: true },
  { abbr: ['PRN'], senses: ['as needed'], anyCase: true },
  { abbr: ['PO'], senses: ['by mouth (per os)'], anyCase: true },
  { abbr: ['NPO'], senses: ['nothing by mouth'], anyCase: true },
  { abbr: ['IV'], senses: ['intravenous'], anyCase: true },
  { abbr: ['IM'], senses: ['intramuscular'], anyCase: true },
  { abbr: ['SC', 'SQ', 'SubQ', 'Sub-Q'], senses: ['subcutaneous'], anyCase: true },
  { abbr: ['IO'], senses: ['intraosseous'] },
  { abbr: ['IN'], senses: ['intranasal'] },
  { abbr: ['CRI'], senses: ['constant rate infusion'] },
  { abbr: ['LRS'], senses: ["lactated Ringer's solution"] },
  { abbr: ['NaCl'], senses: ['sodium chloride (saline)'] },
  { abbr: ['ABX', 'Abx'], senses: ['antibiotics'], anyCase: true },
  { abbr: ['AH'], senses: ['antihistamines'] },
  { abbr: ['NSAID', 'NSAIDs'], senses: ['non-steroidal anti-inflammatory drug'] },
  { abbr: ['UDCA'], senses: ['ursodeoxycholic acid'] },
  { abbr: ['ACEi', 'ACEI'], senses: ['ACE inhibitor'] },
  { abbr: ['DOCP'], senses: ['desoxycorticosterone pivalate'] },
  { abbr: ['HWI'], senses: ['heartworm injection'] },
  { abbr: ['NGS'], senses: ['NexGard Spectra (parasiticide)'] },
  { abbr: ['MLV'], senses: ['modified live vaccine'] },
  { abbr: ['DHPP', 'DHLPP', 'DHLP-P', 'DA2PP', 'DAPP'], senses: ['canine core vaccine (distemper, adenovirus/hepatitis, parainfluenza, parvovirus ± leptospirosis)'] },
  { abbr: ['C3', 'C5'], senses: ['canine core vaccine (C3: distemper, hepatitis, parvovirus; C5 adds parainfluenza and Bordetella)'] },
  { abbr: ['C2i'], senses: ['canine leptospirosis + coronavirus vaccine'] },
  { abbr: ['F3', 'FVRCP'], senses: ['feline core vaccine (rhinotracheitis, calicivirus, panleukopenia)'] },
  { abbr: ['RV'], senses: ['rabies vaccine', 'right ventricle'] },

  // ── Vitals & physical exam ──────────────────────────────────────────────
  { abbr: ['HR'], senses: ['heart rate'] },
  { abbr: ['RR'], senses: ['respiratory rate'] },
  { abbr: ['SRR'], senses: ['sleeping respiratory rate'] },
  { abbr: ['RE'], senses: ['respiratory effort'] },
  { abbr: ['BP'], senses: ['blood pressure'] },
  { abbr: ['SBP'], senses: ['systolic blood pressure'] },
  { abbr: ['MAP'], senses: ['mean arterial pressure'] },
  { abbr: ['CRT'], senses: ['capillary refill time'], anyCase: true },
  { abbr: ['MM', 'MMs'], senses: ['mucous membranes'] },
  { abbr: ['bpm'], senses: ['beats per minute'], anyCase: true },
  { abbr: ['brpm'], senses: ['breaths per minute'], anyCase: true },
  { abbr: ['HLs'], senses: ['heart and lungs'] },
  { abbr: ['BV'], senses: ['bronchovesicular (lung sounds)'] },
  { abbr: ['LN', 'LNs', 'LNN'], senses: ['lymph node(s)'] },
  { abbr: ['PLN'], senses: ['peripheral lymph nodes', 'protein-losing nephropathy'] },
  { abbr: ['EENT'], senses: ['ears, eyes, nose, throat'] },
  { abbr: ['ROM'], senses: ['range of motion'] },
  { abbr: ['FL', 'FLs'], senses: ['forelimb(s)'] },
  { abbr: ['HL'], senses: ['hindlimb'] },
  { abbr: ['LF', 'RF', 'LH', 'RH'], senses: ['left fore / right fore / left hind / right hind limb'] },
  { abbr: ['LHL', 'RHL', 'LFL', 'RFL', 'LPL', 'RPL', 'LTL', 'RTL'], senses: ['left/right hind, fore, pelvic or thoracic limb'] },
  { abbr: ['CP'], senses: ['conscious proprioception'] },
  { abbr: ['PLR'], senses: ['pupillary light reflex'] },
  { abbr: ['UMN'], senses: ['upper motor neuron'] },
  { abbr: ['LMN'], senses: ['lower motor neuron'] },
  { abbr: ['CN'], senses: ['cranial nerve(s)'] },
  { abbr: ['OD'], senses: ['right eye (oculus dexter)', 'overdose'] },
  { abbr: ['OS'], senses: ['left eye (oculus sinister)'] },
  { abbr: ['OU'], senses: ['both eyes'] },
  { abbr: ['AD'], senses: ['right ear'] },
  { abbr: ['AS'], senses: ['left ear', 'aortic stenosis'] },
  { abbr: ['AU'], senses: ['both ears'] },
  { abbr: ['IOP'], senses: ['intraocular pressure'] },
  { abbr: ['STT'], senses: ['Schirmer tear test'] },
  { abbr: ['SM'], senses: ['systolic murmur'] },
  { abbr: ['DM'], senses: ['diabetes mellitus', 'degenerative myelopathy', 'diastolic murmur'] },
  { abbr: ['VHS'], senses: ['vertebral heart score'] },
  { abbr: ['VLAS'], senses: ['vertebral left atrial size'] },
  { abbr: ['LA:Ao', 'LA/Ao'], senses: ['left atrium to aorta ratio'] },
  { abbr: ['DRE'], senses: ['digital rectal examination'] },
  { abbr: ['AG', 'AGs'], senses: ['anal gland(s) (anal sacs)', 'anion gap'] },

  // ── Clinical pathology ──────────────────────────────────────────────────
  { abbr: ['CBC'], senses: ['complete blood count'] },
  { abbr: ['FBC'], senses: ['full blood count'] },
  { abbr: ['MDB'], senses: ['minimum database (CBC, biochemistry, urinalysis)'] },
  { abbr: ['Chem', 'Biochem'], senses: ['serum biochemistry'] },
  { abbr: ['UA', 'UAnl'], senses: ['urinalysis'] },
  { abbr: ['USG', 'SG'], senses: ['urine specific gravity'] },
  { abbr: ['UPC', 'UPCR', 'UP:C'], senses: ['urine protein:creatinine ratio'] },
  { abbr: ['C&S', 'C/S'], senses: ['culture and sensitivity'] },
  { abbr: ['PCV'], senses: ['packed cell volume'] },
  { abbr: ['TP', 'TS'], senses: ['total protein / total solids'] },
  { abbr: ['Hct', 'HCT'], senses: ['haematocrit'] },
  { abbr: ['Hb', 'Hgb', 'HGB'], senses: ['haemoglobin'] },
  { abbr: ['RBC'], senses: ['red blood cells'] },
  { abbr: ['WBC'], senses: ['white blood cells'] },
  { abbr: ['nRBC', 'NRBC'], senses: ['nucleated red blood cells'] },
  { abbr: ['MCV'], senses: ['mean corpuscular volume'] },
  { abbr: ['MCH'], senses: ['mean corpuscular haemoglobin'] },
  { abbr: ['MCHC'], senses: ['mean corpuscular haemoglobin concentration'] },
  { abbr: ['PLT', 'Plt', 'Plts'], senses: ['platelets'] },
  { abbr: ['PMN'], senses: ['neutrophils (polymorphonuclear leukocytes)'] },
  { abbr: ['BUN'], senses: ['blood urea nitrogen'] },
  { abbr: ['Crea', 'Creat'], senses: ['creatinine'] },
  { abbr: ['SDMA'], senses: ['symmetric dimethylarginine'] },
  { abbr: ['ALP', 'ALKP', 'SAP'], senses: ['alkaline phosphatase'] },
  { abbr: ['ALT', 'SGPT', 'GPT'], senses: ['alanine aminotransferase'] },
  { abbr: ['AST', 'SGOT', 'GOT'], senses: ['aspartate aminotransferase'] },
  { abbr: ['GGT'], senses: ['gamma-glutamyl transferase'] },
  { abbr: ['TBil', 'TBIL', 'Tbili'], senses: ['total bilirubin'] },
  { abbr: ['CK', 'CPK'], senses: ['creatine kinase'] },
  { abbr: ['Glu', 'BG', 'BGL'], senses: ['blood glucose'] },
  { abbr: ['TCO2', 'tCO2'], senses: ['total carbon dioxide (bicarbonate)'] },
  { abbr: ['PT'], senses: ['prothrombin time'] },
  { abbr: ['aPTT', 'APTT', 'PTT'], senses: ['activated partial thromboplastin time'] },
  { abbr: ['ACT'], senses: ['activated clotting time'] },
  { abbr: ['BMBT'], senses: ['buccal mucosal bleeding time'] },
  { abbr: ['FDP', 'FDPs'], senses: ['fibrin degradation products'] },
  { abbr: ['vWF'], senses: ['von Willebrand factor'] },
  { abbr: ['TT4', 'T4'], senses: ['total thyroxine'] },
  { abbr: ['fT4', 'FT4'], senses: ['free thyroxine'] },
  { abbr: ['T3'], senses: ['triiodothyronine'] },
  { abbr: ['TSH'], senses: ['thyroid-stimulating hormone'] },
  { abbr: ['ACTH'], senses: ['adrenocorticotropic hormone (or ACTH stimulation test)'] },
  { abbr: ['LDDST', 'LDDS'], senses: ['low-dose dexamethasone suppression test'] },
  { abbr: ['HDDST', 'HDDS'], senses: ['high-dose dexamethasone suppression test'] },
  { abbr: ['UCCR', 'UC:CR'], senses: ['urine cortisol:creatinine ratio'] },
  { abbr: ['PTH'], senses: ['parathyroid hormone'] },
  { abbr: ['PTHrP'], senses: ['parathyroid hormone-related protein'] },
  { abbr: ['IGF-1', 'IGF1'], senses: ['insulin-like growth factor 1'] },
  { abbr: ['TLI'], senses: ['trypsin-like immunoreactivity'] },
  { abbr: ['PLI', 'cPLI', 'fPLI', 'Spec cPL', 'SNAP cPL'], senses: ['pancreatic lipase immunoreactivity'] },
  { abbr: ['BA', 'BAs', 'SBA', 'SBAs'], senses: ['(serum) bile acids'] },
  { abbr: ['NT-proBNP', 'proBNP', 'BNP'], senses: ['N-terminal pro-B-type natriuretic peptide'] },
  { abbr: ['cTnI', 'TnI'], senses: ['cardiac troponin I'] },
  { abbr: ['CRP'], senses: ['C-reactive protein'] },
  { abbr: ['SAA'], senses: ['serum amyloid A'] },
  { abbr: ['ANA'], senses: ['antinuclear antibody'] },
  { abbr: ['ABG'], senses: ['arterial blood gas'] },
  { abbr: ['VBG'], senses: ['venous blood gas'] },
  { abbr: ['HPF'], senses: ['high-power field'] },
  { abbr: ['LPF'], senses: ['low-power field'] },
  { abbr: ['TNTC'], senses: ['too numerous to count'] },
  { abbr: ['EPG'], senses: ['eggs per gram (faeces)'] },
  { abbr: ['NMB'], senses: ['new methylene blue'] },
  { abbr: ['PCR'], senses: ['polymerase chain reaction'] },
  { abbr: ['ELISA'], senses: ['enzyme-linked immunosorbent assay'] },
  { abbr: ['IFA'], senses: ['indirect fluorescent antibody'] },
  { abbr: ['Ab'], senses: ['antibody'] },
  { abbr: ['Ag'], senses: ['antigen'] },
  { abbr: ['SNAP', '4Dx', '4DX'], senses: ['in-clinic SNAP test (heartworm antigen ± tick-borne antibodies, or FeLV/FIV)'] },
  { abbr: ['HW', 'HWT'], senses: ['heartworm (test)'] },
  { abbr: ['DTM'], senses: ['dermatophyte test medium'] },
  { abbr: ['RAST'], senses: ['radioallergosorbent test'] },
  { abbr: ['IDST', 'IDT'], senses: ['intradermal skin test'] },

  // ── Imaging & procedures ────────────────────────────────────────────────
  { abbr: ['Rads', 'XR', 'DR'], senses: ['radiographs'], anyCase: true },
  { abbr: ['TXR', 'TRads', 'CXR'], senses: ['thoracic radiographs'] },
  { abbr: ['AXR'], senses: ['abdominal radiographs'] },
  { abbr: ['DV'], senses: ['dorsoventral (radiograph view)'] },
  { abbr: ['LL', 'RL', 'R lat', 'L lat'], senses: ['left / right lateral (radiograph view)'] },
  { abbr: ['US', 'U/S', 'AUS', 'AFAST'], senses: ['ultrasound (abdominal; AFAST = abdominal focused assessment with sonography for trauma)'] },
  { abbr: ['TFAST'], senses: ['thoracic focused assessment with sonography for trauma'] },
  { abbr: ['POCUS'], senses: ['point-of-care ultrasound'] },
  { abbr: ['Echo'], senses: ['echocardiogram'] },
  { abbr: ['ECG', 'EKG'], senses: ['electrocardiogram'] },
  { abbr: ['CT'], senses: ['computed tomography'] },
  { abbr: ['MRI'], senses: ['magnetic resonance imaging'] },
  { abbr: ['BAER'], senses: ['brainstem auditory evoked response'] },
  { abbr: ['EMG'], senses: ['electromyography'] },
  { abbr: ['EEG'], senses: ['electroencephalogram'] },
  { abbr: ['BIPS'], senses: ['barium-impregnated polyethylene spheres'] },
  { abbr: ['FNA'], senses: ['fine-needle aspirate'] },
  { abbr: ['BAL'], senses: ['bronchoalveolar lavage'] },
  { abbr: ['TTW'], senses: ['transtracheal wash'] },
  { abbr: ['CSF'], senses: ['cerebrospinal fluid'] },
  { abbr: ['BMA'], senses: ['bone marrow aspirate'] },
  { abbr: ['DSP'], senses: ['dental scale and polish'] },
  { abbr: ['COHAT'], senses: ['comprehensive oral health assessment and treatment'] },
  { abbr: ['TPLO'], senses: ['tibial plateau levelling osteotomy'] },
  { abbr: ['TTA'], senses: ['tibial tuberosity advancement'] },
  { abbr: ['TECA', 'TECA-LBO'], senses: ['total ear canal ablation (± lateral bulla osteotomy)'] },
  { abbr: ['FHO'], senses: ['femoral head ostectomy'] },
  { abbr: ['OHE', 'OVH', 'OHX'], senses: ['ovariohysterectomy (spay)'] },
  { abbr: ['GA'], senses: ['general anaesthesia'] },
  { abbr: ['CPR'], senses: ['cardiopulmonary resuscitation'] },
  { abbr: ['TPN'], senses: ['total parenteral nutrition'] },
  { abbr: ['RER'], senses: ['resting energy requirement'] },
  { abbr: ['MER'], senses: ['maintenance energy requirement'] },

  // ── Diseases & syndromes ────────────────────────────────────────────────
  { abbr: ['CKD'], senses: ['chronic kidney disease'] },
  { abbr: ['CRF'], senses: ['chronic renal failure (chronic kidney disease)'] },
  { abbr: ['CRD'], senses: ['chronic renal disease'] },
  { abbr: ['AKI'], senses: ['acute kidney injury'] },
  { abbr: ['ARF'], senses: ['acute renal failure'] },
  { abbr: ['UTI'], senses: ['urinary tract infection'] },
  { abbr: ['FLUTD', 'fLUTD'], senses: ['feline lower urinary tract disease'] },
  { abbr: ['FIC'], senses: ['feline idiopathic cystitis'] },
  { abbr: ['FUS'], senses: ['feline urological syndrome'] },
  { abbr: ['UO', 'UTO'], senses: ['urethral (urinary tract) obstruction'] },
  { abbr: ['USMI'], senses: ['urethral sphincter mechanism incompetence'] },
  { abbr: ['TCC'], senses: ['transitional cell carcinoma (urothelial carcinoma)'] },
  { abbr: ['DI'], senses: ['diabetes insipidus'] },
  { abbr: ['DKA'], senses: ['diabetic ketoacidosis'] },
  { abbr: ['HHS'], senses: ['hyperosmolar hyperglycaemic state'] },
  { abbr: ['HAC'], senses: ["hyperadrenocorticism (Cushing's)"] },
  { abbr: ['PDH'], senses: ['pituitary-dependent hyperadrenocorticism'] },
  { abbr: ['ADH'], senses: ['adrenal-dependent hyperadrenocorticism', 'antidiuretic hormone'] },
  { abbr: ['HA', 'HoAC'], senses: ["hypoadrenocorticism (Addison's)"] },
  { abbr: ['HT', 'HyperT4'], senses: ['hyperthyroidism'] },
  { abbr: ['HHM'], senses: ['humoral hypercalcaemia of malignancy'] },
  { abbr: ['PHPT'], senses: ['primary hyperparathyroidism'] },
  { abbr: ['IBD'], senses: ['inflammatory bowel disease'] },
  { abbr: ['CE'], senses: ['chronic enteropathy'] },
  { abbr: ['PLE'], senses: ['protein-losing enteropathy'] },
  { abbr: ['LPE'], senses: ['lymphocytic-plasmacytic enteritis'] },
  { abbr: ['ARD'], senses: ['antibiotic-responsive diarrhoea'] },
  { abbr: ['SIBO'], senses: ['small intestinal bacterial overgrowth'] },
  { abbr: ['EPI'], senses: ['exocrine pancreatic insufficiency'] },
  { abbr: ['HGE', 'AHDS'], senses: ['haemorrhagic gastroenteritis (acute haemorrhagic diarrhoea syndrome)'] },
  { abbr: ['GDV'], senses: ['gastric dilatation-volvulus'] },
  { abbr: ['GDU'], senses: ['gastroduodenal ulceration'] },
  { abbr: ['GI'], senses: ['gastrointestinal'] },
  { abbr: ['PSS'], senses: ['portosystemic shunt'] },
  { abbr: ['HE'], senses: ['hepatic encephalopathy'] },
  { abbr: ['HL', 'FHL'], senses: ['hepatic lipidosis (feline)'] },
  { abbr: ['CCHS'], senses: ['cholangitis/cholangiohepatitis syndrome'] },
  { abbr: ['GBM'], senses: ['gallbladder mucocoele'] },
  { abbr: ['CHF'], senses: ['congestive heart failure'] },
  { abbr: ['L-CHF', 'LCHF', 'R-CHF', 'RCHF'], senses: ['left- / right-sided congestive heart failure'] },
  { abbr: ['MMVD', 'MVD', 'DMVD'], senses: ['myxomatous mitral valve disease'] },
  { abbr: ['DCM'], senses: ['dilated cardiomyopathy'] },
  { abbr: ['HCM'], senses: ['hypertrophic cardiomyopathy'] },
  { abbr: ['RCM'], senses: ['restrictive cardiomyopathy'] },
  { abbr: ['ARVC'], senses: ['arrhythmogenic right ventricular cardiomyopathy'] },
  { abbr: ['ATE', 'FATE'], senses: ['(feline) aortic thromboembolism'] },
  { abbr: ['PDA'], senses: ['patent ductus arteriosus'] },
  { abbr: ['VSD'], senses: ['ventricular septal defect'] },
  { abbr: ['PS'], senses: ['pulmonic stenosis'] },
  { abbr: ['SAS'], senses: ['subaortic stenosis'] },
  { abbr: ['AF', 'AFib'], senses: ['atrial fibrillation'] },
  { abbr: ['VPC', 'VPCs', 'PVC', 'PVCs'], senses: ['ventricular premature complexes'] },
  { abbr: ['VT', 'VTach'], senses: ['ventricular tachycardia'] },
  { abbr: ['SVT'], senses: ['supraventricular tachycardia'] },
  { abbr: ['AV', 'AVB'], senses: ['atrioventricular (block)'] },
  { abbr: ['SSS'], senses: ['sick sinus syndrome'] },
  { abbr: ['PH', 'PHT'], senses: ['pulmonary hypertension'] },
  { abbr: ['HWD'], senses: ['heartworm disease'] },
  { abbr: ['FHD'], senses: ['feline heartworm disease'] },
  { abbr: ['HARD'], senses: ['heartworm-associated respiratory disease'] },
  { abbr: ['BOAS'], senses: ['brachycephalic obstructive airway syndrome'] },
  { abbr: ['CIRD', 'CIRDC'], senses: ['canine infectious respiratory disease (complex)'] },
  { abbr: ['URTD', 'URTI', 'URI'], senses: ['upper respiratory tract disease / infection'] },
  { abbr: ['FURTD'], senses: ['feline upper respiratory tract disease'] },
  { abbr: ['LP'], senses: ['laryngeal paralysis'] },
  { abbr: ['GOLPP'], senses: ['geriatric onset laryngeal paralysis polyneuropathy'] },
  { abbr: ['TC'], senses: ['tracheal collapse'] },
  { abbr: ['ARDS'], senses: ['acute respiratory distress syndrome'] },
  { abbr: ['PTE'], senses: ['pulmonary thromboembolism'] },
  { abbr: ['IMHA'], senses: ['immune-mediated haemolytic anaemia'] },
  { abbr: ['IMTP', 'ITP'], senses: ['immune-mediated thrombocytopenia'] },
  { abbr: ['AIHA'], senses: ['autoimmune haemolytic anaemia'] },
  { abbr: ['IMPA'], senses: ['immune-mediated polyarthritis'] },
  { abbr: ['DIC'], senses: ['disseminated intravascular coagulation'] },
  { abbr: ['vWD'], senses: ["von Willebrand's disease"] },
  { abbr: ['SIRS'], senses: ['systemic inflammatory response syndrome'] },
  { abbr: ['MODS'], senses: ['multiple organ dysfunction syndrome'] },
  { abbr: ['FUO'], senses: ['fever of unknown origin'] },
  { abbr: ['SLE'], senses: ['systemic lupus erythematosus'] },
  { abbr: ['DLE'], senses: ['discoid lupus erythematosus'] },
  { abbr: ['LE'], senses: ['lupus erythematosus'] },
  { abbr: ['PF'], senses: ['pemphigus foliaceus'] },
  { abbr: ['AD', 'CAD'], senses: ['atopic dermatitis'] },
  { abbr: ['FAD'], senses: ['flea allergy dermatitis'] },
  { abbr: ['CAFR', 'AFR'], senses: ['(cutaneous) adverse food reaction'] },
  { abbr: ['OE'], senses: ['otitis externa'] },
  { abbr: ['OM'], senses: ['otitis media'] },
  { abbr: ['OI'], senses: ['otitis interna'] },
  { abbr: ['SA'], senses: ['sebaceous adenitis', 'small animal'] },
  { abbr: ['SL'], senses: ['skin lesion'] },
  { abbr: ['CFA'], senses: ['cat fight abscess'] },
  { abbr: ['KCS'], senses: ['keratoconjunctivitis sicca (dry eye)'] },
  { abbr: ['PRA'], senses: ['progressive retinal atrophy'] },
  { abbr: ['SARDS'], senses: ['sudden acquired retinal degeneration syndrome'] },
  { abbr: ['SCCED'], senses: ['spontaneous chronic corneal epithelial defect'] },
  { abbr: ['FHV', 'FHV-1'], senses: ['feline herpesvirus'] },
  { abbr: ['FCV'], senses: ['feline calicivirus'] },
  { abbr: ['FeLV'], senses: ['feline leukaemia virus'] },
  { abbr: ['FIV'], senses: ['feline immunodeficiency virus'] },
  { abbr: ['FIP'], senses: ['feline infectious peritonitis'] },
  { abbr: ['FECV', 'FCoV'], senses: ['feline (enteric) coronavirus'] },
  { abbr: ['FPV', 'FPLV'], senses: ['feline panleukopenia virus'] },
  { abbr: ['CPV', 'CPV-2'], senses: ['canine parvovirus'] },
  { abbr: ['CDV'], senses: ['canine distemper virus'] },
  { abbr: ['CAV', 'CAV-1', 'CAV-2'], senses: ['canine adenovirus'] },
  { abbr: ['ICH'], senses: ['infectious canine hepatitis'] },
  { abbr: ['CCV', 'CCoV'], senses: ['canine coronavirus'] },
  { abbr: ['CIV'], senses: ['canine influenza virus'] },
  { abbr: ['CHV'], senses: ['canine herpesvirus'] },
  { abbr: ['RMSF'], senses: ['Rocky Mountain spotted fever'] },
  { abbr: ['TB'], senses: ['tuberculosis'] },
  { abbr: ['MRSP'], senses: ['methicillin-resistant Staphylococcus pseudintermedius'] },
  { abbr: ['MRSA'], senses: ['methicillin-resistant Staphylococcus aureus'] },
  { abbr: ['TOXO', 'Toxo'], senses: ['Toxoplasma / toxoplasmosis'] },
  { abbr: ['IVDD', 'IVDE', 'IVDH'], senses: ['intervertebral disc disease / extrusion / herniation'] },
  { abbr: ['IVD'], senses: ['intervertebral disc'] },
  { abbr: ['FCE'], senses: ['fibrocartilaginous embolism'] },
  { abbr: ['ANNPE'], senses: ['acute non-compressive nucleus pulposus extrusion'] },
  { abbr: ['MUO', 'MUE'], senses: ['meningoencephalitis of unknown origin/aetiology'] },
  { abbr: ['GME'], senses: ['granulomatous meningoencephalomyelitis'] },
  { abbr: ['NME', 'NLE'], senses: ['necrotising meningo- / leuko-encephalitis'] },
  { abbr: ['SRMA'], senses: ['steroid-responsive meningitis-arteritis'] },
  { abbr: ['CSM'], senses: ['cervical spondylomyelopathy (wobbler syndrome)'] },
  { abbr: ['DLSS'], senses: ['degenerative lumbosacral stenosis'] },
  { abbr: ['CM', 'CM/SM'], senses: ['Chiari-like malformation / syringomyelia'] },
  { abbr: ['IE'], senses: ['idiopathic epilepsy'] },
  { abbr: ['CCD', 'CDS'], senses: ['canine cognitive dysfunction'] },
  { abbr: ['MG'], senses: ['myasthenia gravis'] },
  { abbr: ['HPP', 'HYPP'], senses: ['hyperkalaemic periodic paralysis'] },
  { abbr: ['DJD'], senses: ['degenerative joint disease (osteoarthritis)'] },
  { abbr: ['OA'], senses: ['osteoarthritis'] },
  { abbr: ['CCL', 'CrCL', 'CCLR', 'CrCLR'], senses: ['cranial cruciate ligament (rupture)'] },
  { abbr: ['ACL'], senses: ['anterior (cranial) cruciate ligament'] },
  { abbr: ['MPL'], senses: ['medial patellar luxation'] },
  { abbr: ['LPL'], senses: ['lateral patellar luxation'] },
  { abbr: ['HD'], senses: ['hip dysplasia'] },
  { abbr: ['ED'], senses: ['elbow dysplasia'] },
  { abbr: ['OCD'], senses: ['osteochondritis dissecans'] },
  { abbr: ['FCP', 'MCD'], senses: ['fragmented (medial) coronoid process'] },
  { abbr: ['UAP'], senses: ['ununited anconeal process'] },
  { abbr: ['HOD'], senses: ['hypertrophic osteodystrophy'] },
  { abbr: ['ACB'], senses: ['accessory carpal bone'] },
  { abbr: ['TMJ'], senses: ['temporomandibular joint'] },
  { abbr: ['TR'], senses: ['tooth resorption'] },
  { abbr: ['FORL', 'FORLs'], senses: ['feline odontoclastic resorptive lesion (tooth resorption)'] },
  { abbr: ['FCGS'], senses: ['feline chronic gingivostomatitis'] },
  { abbr: ['OSCC', 'SCC'], senses: ['(oral) squamous cell carcinoma'] },
  { abbr: ['LSA', 'LSa', 'LS'], senses: ['lymphoma (lymphosarcoma)'] },
  { abbr: ['HSA'], senses: ['haemangiosarcoma'] },
  { abbr: ['OSA'], senses: ['osteosarcoma'] },
  { abbr: ['MCT'], senses: ['mast cell tumour'] },
  { abbr: ['STS'], senses: ['soft tissue sarcoma'] },
  { abbr: ['FISS', 'ISS'], senses: ['(feline) injection-site sarcoma'] },
  { abbr: ['TVT'], senses: ['transmissible venereal tumour'] },
  { abbr: ['BCH'], senses: ['benign cutaneous histiocytoma'] },
  { abbr: ['AGASACA', 'ASAC'], senses: ['apocrine gland anal sac adenocarcinoma'] },
  { abbr: ['MGT'], senses: ['mammary gland tumour'] },
  { abbr: ['BPH'], senses: ['benign prostatic hyperplasia'] },
  { abbr: ['CEH'], senses: ['cystic endometrial hyperplasia'] },
  { abbr: ['WRP'], senses: ['wound-related pain'] },
  { abbr: ['SLUD', 'SLUDGE', 'DUMBELS'], senses: ['cholinergic toxidrome (salivation, lacrimation, urination, defecation ± GI upset, emesis)'] },
  { abbr: ['OP'], senses: ['organophosphate'] },
  { abbr: ['AR', 'LAAR'], senses: ['(long-acting) anticoagulant rodenticide'] },
  { abbr: ['EG'], senses: ['ethylene glycol'] },
]

// Letters-only capitals that look like abbreviations in a case but aren't
// clinical ones — never flagged as unknown.
const NOT_ABBREVIATIONS = new Set([
  'OK', 'AM', 'PM', 'TV', 'UK', 'USA', 'AU', 'NZ', 'EU', 'ER', 'ICU', 'OR', 'VS', 'VET', 'DVM',
  'NO', 'YES', 'NOT', 'AND', 'THE', 'WITH', 'FOR', 'BUT',
])

// Units that are written in capitals or mixed case ("mL", "IU") — not flagged.
const UNITS = new Set(['ML', 'DL', 'IU', 'MG', 'KG', 'MMHG', 'MMOL', 'UMOL', 'MEQ', 'MCG', 'UG', 'NG', 'PG', 'GL', 'HZ', 'BPM'])

const norm = (s: string) => s.replace(/\./g, '').toUpperCase()

type Indexed = { entry: AbbrevEntry; anyCase: boolean }
const INDEX = new Map<string, Indexed[]>()
for (const entry of VET_ABBREVIATIONS) {
  for (const a of entry.abbr) {
    const key = norm(a)
    const list = INDEX.get(key) ?? []
    list.push({ entry, anyCase: !!entry.anyCase })
    INDEX.set(key, list)
  }
}

// A word-ish run: letters/digits, joined by "/", "+", "&", ":", "-" or ".",
// optionally followed by trailing "+"s ("V++"). Leading digits allowed so
// "4Dx" and "8yo" are seen whole. A run that isn't itself in the glossary is
// split on its joiners and each part looked up alone ("CKD-related",
// "HR:120", "PU/PD/PP").
const TOKEN_RE = /[A-Za-z0-9]+(?:[/&:.\-+][A-Za-z0-9]+)*\+*/g
const SPLIT_RE = /[/&:\-+]+/
const DOSE_INTERVAL_RE = /^q(\d{1,2})h$/i
// Murmur grades ("III/VI", "4/6") and bare roman numerals.
const ROMAN_RE = /^[IVX]+(?:\/[IVX]+)?$/

const upperCount = (s: string) => (s.match(/[A-Z]/g) ?? []).length

/** Does this token look like an abbreviation regardless of whether it's known?
 *  Two or more capitals ("CKD", "FeLV", "CrCL"), or a capital next to a digit
 *  ("T4", "C3"). */
function abbreviationShaped(tok: string): boolean {
  return upperCount(tok) >= 2 || /[A-Z]\d|\d[A-Z]/.test(tok)
}

function lookupExact(tok: string): AbbrevEntry[] | null {
  const hits = INDEX.get(norm(tok))
  if (!hits) return null
  // Capitals match anything; a plain lower/title-case word only matches
  // entries flagged anyCase — otherwise "pe", "hr" and "mm" in ordinary prose
  // would all resolve.
  const caps = abbreviationShaped(tok) || (/[A-Z]/.test(tok) && tok === tok.toUpperCase())
  const usable = hits.filter(h => caps || h.anyCase)
  return usable.length ? [...new Set(usable.map(h => h.entry))] : null
}

function lookup(tok: string): AbbrevEntry[] | null {
  // Whole token first ("4Dx" is the SNAP test, not "4" + "Dx"), then a
  // leading number stripped off an age/duration suffix ("8yo", "10mo").
  return lookupExact(tok) ?? (/^\d+[A-Za-z]{1,3}$/.test(tok) ? lookupExact(tok.replace(/^\d+/, '')) : null)
}

export type FoundAbbreviation = { abbr: string; senses: string[] }

export type AbbreviationScan = {
  /** Recognised abbreviations, first-occurrence order, deduped. */
  known: FoundAbbreviation[]
  /** Abbreviation-shaped tokens with no glossary entry — the reader is asked
   *  to write the full form of each. Excludes any the notes already spell
   *  out inline ("SDMA (symmetric dimethylarginine)", "symmetric
   *  dimethylarginine (SDMA)"). */
  unknown: string[]
}

export function scanAbbreviations(text: string): AbbreviationScan {
  const known = new Map<string, FoundAbbreviation>()
  const unknown = new Map<string, string>()
  // Notes typed in all capitals make every word abbreviation-shaped; leave
  // unknown-detection to the model there rather than flag the whole case.
  const letters = text.replace(/[^A-Za-z]/g, '')
  const shouting = letters.length > 20 && upperCount(letters) / letters.length > 0.6

  const visit = (raw: string, before: string, after: string, depth: number) => {
    raw = raw.replace(/[.\-:]+$/, '')
    if (!raw) return
    const key = norm(raw)

    const interval = DOSE_INTERVAL_RE.exec(raw)
    if (interval) {
      if (!known.has(key)) known.set(key, { abbr: raw, senses: [`every ${interval[1]} hours`] })
      return
    }
    if (ROMAN_RE.test(raw) || /^\d+\/\d+$/.test(raw)) return

    const entries = lookup(raw)
    if (entries) {
      if (!known.has(key)) known.set(key, { abbr: raw, senses: [...new Set(entries.flatMap(e => e.senses))] })
      return
    }

    if (depth === 0 && SPLIT_RE.test(raw)) {
      for (const part of raw.split(SPLIT_RE)) visit(part, '', '', 1)
      return
    }

    if (shouting || !abbreviationShaped(raw) || /^\d/.test(raw)) return
    const caps = key.replace(/[^A-Z]/g, '')
    if (NOT_ABBREVIATIONS.has(key) || UNITS.has(caps) || caps.length > 7) return
    // Already expanded inline: "XYZ (…)", "XYZ = …", or "(XYZ)" after the words.
    if (/^\s*[(=]/.test(after) || /\(\s*$/.test(before)) return
    if (!unknown.has(key)) unknown.set(key, raw)
  }

  for (const m of text.matchAll(TOKEN_RE)) {
    const start = m.index ?? 0
    const end = start + m[0].length
    visit(m[0], text.slice(Math.max(0, start - 2), start), text.slice(end, end + 3), 0)
  }

  return { known: [...known.values()], unknown: [...unknown.values()] }
}

/** Normalised key for a user-supplied expansion, so "b.i.d." and "BID" share one. */
export const abbreviationKey = norm

/** The abbreviation key appended to the case notes before they go to the
 *  model: every abbreviation found, with all its senses, plus the reader's
 *  own full forms for the unknown ones. Empty string when there's nothing to
 *  add. */
export function abbreviationKeyBlock(scan: AbbreviationScan, userExpansions: Record<string, string>): string {
  const lines: string[] = []
  for (const k of scan.known) {
    const own = userExpansions[norm(k.abbr)]?.trim()
    lines.push(own ? `- ${k.abbr} = ${own} (per the author)` : `- ${k.abbr} = ${k.senses.join(' OR ')}`)
  }
  for (const u of scan.unknown) {
    const own = userExpansions[norm(u)]?.trim()
    if (own) lines.push(`- ${u} = ${own} (per the author)`)
  }
  if (!lines.length) return ''
  return `\n\n${ABBREVIATION_KEY_HEADER}\n${lines.join('\n')}`
}

/** Marks where the appended key starts — the backend prompt refers to it. */
export const ABBREVIATION_KEY_HEADER = '[Abbreviation key]'
