// ── Case Triage: the wording eval's cases ───────────────────────────────────
// Each case is written several ways — as pasted, in shorthand, with US
// spelling, as an owner would say it, with conventional units — and every
// version must give the same answer. Read by scripts/eval-case-wording.ts.
//
// `expect` is deliberately loose: the top differential, and diseases that
// must or must not be on the chart. Exact positions below the top drift with
// every content edit and would make the eval noise.

export type WordingCase = {
  name: string
  versions: { label: string; text: string; interp?: string }[]
  expect: {
    /** The disease that must rank first. */
    top: string
    /** Must be on the chart (anywhere in the top 12). */
    present?: string[]
    /** Must not be on the chart at all. */
    absent?: string[]
  }
}

const AIREDALE_AS_PASTED = `A 7 year-old female-neutered Airedale terrier presented with a history of seizures.
48 hours before presentation the dog was investigated by a colleague due to the owner’s concern that the dog had developed a rather stilted/stiff hindlimb gait on walks and general lethargy. Radiographs of the spine, pelvis and proximal hindlimbs had been performed and were unremarkable.
The night before presentation three generalised tonic–clonic seizures had been witnessed by the
owner, each lasting approximately 60 seconds.

Bloods:
CBC - wnl (stress leukogram present)
Biochemistry: elevated lat 194 IU/l, AS
T 97 IU/l and GGT IU/l
Lytes: mild hypochloremia 100mmol/l and hypocalcemia 1.0mmol/l and elevated inorganic phosphate 1.8mmol/l and elevated glucose 6.1mmol/l
CK (creatinine kinase) elevated 590 IU/l`

export const WORDING_CASES: WordingCase[] = [
  {
    // The reference case: hypoparathyroidism, with a borderline glucose that
    // must not put diabetes on the chart.
    name: 'Airedale — seizures, stiff gait, low Ca / high P',
    versions: [
      { label: 'as pasted (typos, broken line)', text: AIREDALE_AS_PASTED },
      {
        label: 'shorthand',
        text: `7yo FN Airedale. Hx 3x GTC sz overnight, ~60s each. 2d hx stiff/stilted HL gait + lethargy; rads spine/pelvis/HL NAD.
CBC: stress leukogram. Biochem: ALT 194, AST 97, CK 590 IU/L. Lytes: Cl 100 (L), Ca 1.0 (L), PO4 1.8 (H), BG 6.1 mmol/L.`,
      },
      {
        label: 'US spelling, values only',
        text: `7 year old spayed female Airedale Terrier. Generalized tonic-clonic seizures x3 last night. Stiff hind limb gait and lethargy for 2 days, spinal radiographs normal.
Chemistry: ALT 194 U/L, AST 97 U/L, CK 590 U/L, chloride 100 mmol/L, calcium 1.0 mmol/L, phosphorus 1.8 mmol/L, glucose 6.1 mmol/L. CBC: stress leukogram.`,
      },
      {
        label: 'owner phrasing',
        text: `Our 7-year-old spayed Airedale had three fits last night where she went stiff and paddled for about a minute each. For a couple of days before that she'd been walking oddly stiff in the back legs and was very flat. X-rays of her back and hips were fine. Blood test showed low calcium, high phosphate, slightly high liver enzymes and muscle enzyme, and a blood sugar of 6.1.`,
      },
      {
        label: 'conventional units',
        text: `7 y FN Airedale terrier, three generalized seizures overnight, stiff hindlimb gait and lethargy for 48 h, radiographs unremarkable.
ALT 194 U/L, AST 97 U/L, CK 590 U/L, total calcium 4.0 mg/dL (low), phosphorus 5.6 mg/dL (high), glucose 110 mg/dL, chloride 100 mmol/L. Stress leukogram.`,
      },
      {
        label: 'as pasted + interpretation',
        text: AIREDALE_AS_PASTED,
        interp: 'Mild hyperglycaemia — stress. ALT/AST mild, CK points to muscle after seizures. The main finding is hypocalcaemia with hyperphosphataemia.',
      },
    ],
    expect: {
      top: 'DIS-ENDO-HYPOPTH',
      absent: ['DIS-ENDO-DM'],
    },
  },
  {
    // The guard against over-correcting: a real diabetic must still rank
    // diabetes first, however it is worded.
    name: 'Schnauzer — PU/PD, weight loss, glucose in diabetic range',
    versions: [
      {
        label: 'clinical',
        text: `9-year-old female neutered Miniature Schnauzer, 3-week history of polyuria, polydipsia, polyphagia and weight loss. Bilateral cataracts developing. Glucose 22.4 mmol/L, glucosuria 4+ on dipstick, ketones negative. ALP mildly elevated.`,
      },
      {
        label: 'shorthand, mg/dL',
        text: `9yo FN Mini Schnauzer. 3/52 PU/PD, PP, WL. Early bilat cataracts. BG 403 mg/dL, UA glucose 4+, ketones neg, ALP mildly ↑.`,
      },
      {
        label: 'owner phrasing',
        text: `My 9 year old spayed Mini Schnauzer is drinking and peeing loads, always hungry but losing weight over the last 3 weeks, and her eyes are going cloudy. The vet said her blood sugar was 22 and there was sugar in her urine.`,
      },
    ],
    expect: {
      top: 'DIS-ENDO-DM',
    },
  },
]
