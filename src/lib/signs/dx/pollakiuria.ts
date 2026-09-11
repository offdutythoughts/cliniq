// ── Pollakiuria / Stranguria — diagnostic approach (data) ────────────────────
// Lower-urinary-tract signs: confirm it is LUT (not PU/PD or systemic), exclude
// obstruction, then localise (bladder vs urethra vs prostate) and stage with
// urinalysis + culture + imaging. Links to the LUT disease pages (DIS-URO-*).

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const pollakiuriaDx: DxApproach = {
  title: 'Pollakiuria / Stranguria',
  tabs: {

    history: {
      title: 'History: Pollakiuria / Stranguria',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM LUT SIGNS & EXCLUDE OBSTRUCTION' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Pollakiuria</strong>', { text: 'Frequent small-volume voiding', tone: 'teal' }],
            ['<strong>Stranguria</strong>', { text: 'Slow / painful straining', tone: 'teal' }],
            ['<strong>Dysuria</strong>', { text: 'Difficult / painful urination', tone: 'teal' }],
            ['<strong>Not this:</strong> polyuria', { text: 'Large volumes — see the PU/PD approach', tone: 'teal' }],
            ['<strong>Not this:</strong> tenesmus', { text: 'Straining to defecate', tone: 'teal' }],
          ],
        },

        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS THE PATIENT BLOCKED?', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Action', tone: 'teal' }],
          rows: [
            ['<strong>Repeated unproductive trips to the litter tray · vocalising · large turgid painful bladder · systemic collapse or bradycardia</strong>', { text: '<strong>Urethral obstruction</strong> — a hyperkalaemic emergency. Go straight to ECG + serum potassium; see <strong>Urethral obstruction</strong>', tone: 'danger' }],
            ['<strong>Highest-risk signalment</strong>', { text: 'Male cats · male dogs (os penis calculus)', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'SIGNALMENT & PATTERN', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young–middle-aged cat, indoor, multi-cat or stressed household</strong>', { text: '<strong>Feline idiopathic cystitis (FIC)</strong> — the commonest cause of feline LUTS', tone: 'teal' }],
            ['<strong>Spayed female dog</strong>', { text: 'Bacterial cystitis is common — 2× the risk of intact males', tone: 'teal' }],
            ['<strong>Entire male dog</strong>', { text: 'Prostatic disease — BPH · prostatitis', tone: 'teal' }],
            ['<strong>Older dog, any sex, persistent signs</strong>', { text: 'Urothelial carcinoma', tone: 'teal' }],
            ['<strong>Breed clues</strong>', { text: 'Dalmatian / PSS → urate · Miniature Schnauzer / Bichon → oxalate · Mastiff / Bulldog (intact male) → cystine', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'COURSE, RECURRENCE & RESPONSE', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['History', { text: 'What it means', tone: 'teal' }],
          rows: [
            ['<strong>Recurrent or relapsing signs</strong>', { text: 'Look for an underlying cause — urolith · anatomical anomaly · prostatic disease · neoplasia · endocrinopathy', tone: 'teal' }],
            ['<strong>Failure to respond to appropriate antibiotics</strong>', { text: 'Reconsider the diagnosis (sterile FIC · urolith · neoplasia) rather than escalating antibiotics', tone: 'teal' }],
            ['<strong>Also ask</strong>', { text: 'Diet and water intake · prior episodes · any catheterisation history (stricture risk)', tone: 'teal' }],
          ],
        }, '🔁'),
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
        { kind: 'step', tone: 'teal', text: '🩺 STEP 1 — ABDOMINAL PALPATION (bladder size & turgor)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Bladder', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Large, firm, painful, non-expressible</strong>', { text: '<strong>Obstruction</strong> — emergency', tone: 'danger' }],
            ['<strong>Small, thickened, painful</strong>', { text: 'Cystitis / FIC', tone: 'teal' }],
            ['<strong>Empties then rapidly refills with frequent small voids</strong>', { text: 'Supports a true LUT problem', tone: 'teal' }],
            ['<strong>Technique</strong>', { text: 'Palpate gently — an over-distended bladder can rupture', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'RECTAL EXAMINATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Prostate</strong> — size · symmetry · pain · mobility', { text: 'Symmetrical non-painful enlargement → <strong>BPH</strong> · painful → <strong>prostatitis</strong> · asymmetric / fixed / firm → <strong>carcinoma</strong>', tone: 'teal' }],
            ['<strong>Pelvic urethra</strong>', { text: 'Calculi · masses', tone: 'teal' }],
            ['<strong>Sublumbar lymph nodes</strong>', { text: 'Enlarged with prostatic / urothelial carcinoma', tone: 'teal' }],
          ],
        }, '👆'),

        ...stepTable(3, 'EXTERNAL GENITALIA & PERINEUM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Vulva / penis and prepuce</strong>', { text: 'Conformation · discharge · masses · a palpable urethral calculus at the os penis', tone: 'teal' }],
            ['<strong>Perivulvar / perineal skin</strong>', { text: 'Urine scald suggests chronic dribbling or incontinence overlapping the LUTS', tone: 'teal' }],
          ],
        }, '🔬'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Pollakiuria / Stranguria — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — IF OBSTRUCTED, STABILISE FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>ECG + serum potassium</strong>', { text: 'Assess the hyperkalaemic emergency', tone: 'danger' }],
            ['<strong>Treat hyperkalaemia</strong>', { text: 'Calcium gluconate to protect the myocardium, then dextrose ± insulin', tone: 'danger' }],
            ['<strong>Restore volume, then decompress</strong>', { text: 'Catheterise or perform decompressive cystocentesis — see <strong>Urethral obstruction</strong>', tone: 'danger' }],
            ['<strong>Only then</strong>', { text: 'Pursue the full work-up', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'URINALYSIS + CULTURE (the cornerstone)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Cystocentesis urinalysis</strong>', { text: 'The single most useful first test — USG · pH · sediment (RBC · WBC · bacteria · crystals)', tone: 'teal' }],
            ['<strong>Culture &amp; susceptibility</strong> (cystocentesis sample)', { text: 'Gold standard for UTI — ISCAID advises culturing only with an active sediment <em>plus</em> clinical signs, <strong>not</strong> subclinical bacteriuria', tone: 'teal' }],
            ['<strong>Crystalluria</strong>', { text: 'Suggests, but does not prove, urolithiasis — and is influenced by storage and temperature', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(3, 'IMAGING (localise & find stones/masses)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Modality', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Radiography</strong>', { text: 'Radiopaque uroliths (struvite · oxalate). <strong>Cystine and urate are radiolucent</strong> — need ultrasound / contrast', tone: 'teal' }],
            ['<strong>Ultrasound</strong>', { text: 'Bladder wall · mucosal / mural masses · prostate · proximal urethra; screens the upper tract (renal pelvic dilation → pyelonephritis / ureteral obstruction)', tone: 'teal' }],
            ['<strong>Contrast cystourethrography</strong>', { text: 'Urethral lesions and strictures', tone: 'teal' }],
            ['<strong>CT</strong>', { text: 'Staging neoplasia', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(4, 'TARGETED / ADVANCED TESTS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Quantitative urolith analysis</strong>', { text: 'On any retrieved stone — directs dissolution and prevention', tone: 'teal' }],
            ['<strong>Free-catch urine BRAF (V595E) mutation</strong>', { text: 'High specificity for urothelial / prostatic carcinoma — <strong>avoid traumatic cystotomy or needle sampling</strong> (seeding)', tone: 'danger' }],
            ['<strong>Prostatic wash / ejaculate cytology + culture</strong>', { text: 'For prostatic disease', tone: 'teal' }],
            ['<strong>Bloodwork ± endocrine testing</strong>', { text: 'If recurrent UTI — screen for diabetes · hyperadrenocorticism · CKD', tone: 'teal' }],
          ],
        }, '🎯'),
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
