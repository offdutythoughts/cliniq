// ── Pollakiuria / Stranguria — diagnostic approach (data) ────────────────────
// Lower-urinary-tract signs: confirm it is LUT (not PU/PD or systemic), exclude
// obstruction, then localise (bladder vs urethra vs prostate) and stage with
// urinalysis + culture + imaging. Links to the LUT disease pages (DIS-URO-*).

import type { DxApproach } from '../dxTypes'

export const pollakiuriaDx: DxApproach = {
  title: 'Pollakiuria / Stranguria',
  tabs: {

    history: {
      title: 'History: Pollakiuria / Stranguria',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM LUT SIGNS & EXCLUDE OBSTRUCTION' },
        {
          kind: 'check',
          html: `• <strong>Pollakiuria</strong> = frequent small-volume voiding<br>• <strong>Stranguria</strong> = slow/painful straining<br>• <strong>Dysuria</strong> = difficult/painful urination<br>These are LOWER urinary tract signs — distinguish from <strong>polyuria</strong> (large volumes — see the PU/PD approach) and from <strong>tenesmus</strong> (straining to defecate).`,
        },
        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS THE PATIENT BLOCKED?' },
        {
          kind: 'check',
          html: `Repeated unproductive trips to the litter tray, vocalising, a <strong>large turgid painful bladder</strong>, or systemic collapse/bradycardia = urethral obstruction. This is a <strong>hyperkalaemic emergency</strong> — go straight to ECG + serum potassium and see <strong>Urethral obstruction</strong>. Male cats and male dogs (os penis calculus) are highest risk.`,
        },
        { kind: 'step', text: '🐾 STEP 2 — SIGNALMENT & PATTERN' },
        {
          kind: 'check',
          html: `<strong>Young–middle-aged cat, indoor, multi-cat or stressed household</strong> → feline idiopathic cystitis (FIC) is the commonest cause of feline LUTS.<br>
    <strong>Spayed female dog</strong> → bacterial cystitis is common (2× risk vs intact males).<br>
    <strong>Entire male dog</strong> → prostatic disease (BPH, prostatitis); <strong>older dog of any sex</strong> with persistent signs → urothelial carcinoma.<br>
    <strong>Breed clues:</strong> Dalmatian/PSS → urate; Miniature Schnauzer/Bichon → oxalate; Mastiff/Bulldog (intact male) → cystine.`,
        },
        { kind: 'step', text: '🔁 STEP 3 — COURSE, RECURRENCE & RESPONSE' },
        {
          kind: 'check',
          html: `<strong>Recurrent or relapsing signs</strong> → look for an underlying cause (urolith, anatomical anomaly, prostatic disease, neoplasia, endocrinopathy).<br>
    <strong>Failure to respond to appropriate antibiotics</strong> → reconsider the diagnosis (sterile FIC, urolith, neoplasia) rather than escalating antibiotics.<br>
    <strong>Diet & water intake</strong>, prior episodes, and any catheterisation history (stricture risk) are all relevant.`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS IN THE HISTORY',
          html: `A male cat straining unproductively = treat as obstructed until disproven · LUTS + fever / PU-PD / azotaemia = ascending pyelonephritis · Persistent LUTS in an older patient not responding to antibiotics = neoplasia until excluded.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Pollakiuria / Stranguria',
      blocks: [
        { kind: 'step', tone: 'teal', text: '🩺 STEP 1 — ABDOMINAL PALPATION (bladder size & turgor)' },
        {
          kind: 'check',
          html: `<strong>Large, firm, painful, non-expressible bladder</strong> → obstruction (emergency). <strong>Small, thickened, painful bladder</strong> → cystitis/FIC. A bladder that empties then rapidly refills with frequent small voids supports a true LUT problem. Palpate gently — an over-distended bladder can rupture.`,
        },
        { kind: 'step', text: '👆 STEP 2 — RECTAL EXAMINATION' },
        {
          kind: 'check',
          html: `Assess the <strong>prostate</strong> (size, symmetry, pain, mobility): symmetrical non-painful enlargement → BPH; painful → prostatitis; asymmetric/fixed/firm → carcinoma. Palpate the pelvic urethra for calculi/masses and assess <strong>sublumbar lymph nodes</strong> (enlarged with prostatic/urothelial carcinoma).`,
        },
        { kind: 'step', text: '🔬 STEP 3 — EXTERNAL GENITALIA & PERINEUM' },
        {
          kind: 'check',
          html: `Examine the vulva/penis and prepuce for conformation, discharge, masses or a palpable urethral calculus at the os penis. Perivulvar/perineal urine scald suggests chronic dribbling or incontinence overlapping the LUTS.`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Pollakiuria / Stranguria — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — IF OBSTRUCTED, STABILISE FIRST' },
        {
          kind: 'check',
          html: `ECG + serum potassium; treat hyperkalaemia (calcium gluconate to protect the myocardium, then dextrose ± insulin), restore volume, and decompress (catheterise or decompressive cystocentesis). See <strong>Urethral obstruction</strong>. Only then pursue the full work-up.`,
        },
        { kind: 'step', text: 'STEP 2 — URINALYSIS + CULTURE (the cornerstone)' },
        {
          kind: 'check',
          html: `<strong>Cystocentesis</strong> urinalysis is the single most useful first test: USG, pH, sediment (RBC, WBC, bacteria, crystals).<br>
    <strong>Culture & susceptibility (cystocentesis sample)</strong> is the gold standard for UTI — ISCAID advises culturing only with an active sediment + clinical signs, NOT subclinical bacteriuria.<br>
    Crystalluria suggests, but does not prove, urolithiasis (and is influenced by storage/temperature).`,
        },
        { kind: 'step', text: 'STEP 3 — IMAGING (localise & find stones/masses)' },
        {
          kind: 'check',
          html: `<strong>Radiography</strong> detects radiopaque uroliths (struvite, oxalate; cystine/urate are radiolucent — need ultrasound/contrast).<br>
    <strong>Ultrasound</strong> assesses bladder wall, mucosal/mural masses, prostate, and the proximal urethra, and screens the upper tract (renal pelvic dilation → pyelonephritis/ureteral obstruction).<br>
    <strong>Contrast cystourethrography</strong> for urethral lesions/strictures; <strong>CT</strong> for staging neoplasia.`,
        },
        { kind: 'step', text: 'STEP 4 — TARGETED / ADVANCED TESTS' },
        {
          kind: 'check',
          html: `<strong>Quantitative urolith analysis</strong> on any retrieved stone (directs dissolution/prevention).<br>
    <strong>Free-catch urine BRAF (V595E) mutation</strong> — high specificity for urothelial/prostatic carcinoma; avoid traumatic cystotomy/needle sampling (seeding).<br>
    <strong>Prostatic wash / ejaculate cytology + culture</strong> for prostatic disease.<br>
    <strong>Bloodwork ± endocrine testing</strong> if recurrent UTI (screen for diabetes, hyperadrenocorticism, CKD).`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Bacterial cystitis / UTI', link: { to: 'disease', id: 'DIS-URO-UTI' } },
            { label: 'Feline idiopathic cystitis', link: { to: 'disease', id: 'DIS-URO-FIC' } },
            { label: 'Struvite urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-STRUV' } },
            { label: 'Calcium oxalate urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-OXAL' } },
            { label: 'Bacterial prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
            { label: 'Benign prostatic hyperplasia', link: { to: 'disease', id: 'DIS-URO-BPH' } },
            { label: 'Urothelial carcinoma (TCC)', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
            { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
            { label: 'Haematuria — localisation', link: { to: 'dx', id: 'haematuria' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong>⚠️ Practical pearls:</strong><br>
  • Palpate the bladder first — never miss an obstruction.<br>
  • Cystocentesis urinalysis + culture answers most cases; don't treat sterile FIC or subclinical bacteriuria with antibiotics.<br>
  • Cystine and urate stones are radiolucent — a "clear" radiograph does not exclude urolithiasis.<br>
  • Persistent signs in an older patient not responding to antibiotics → image and consider urothelial/prostatic carcinoma (free-catch BRAF, no abdominal-wall biopsy).`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
