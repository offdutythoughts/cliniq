// Validates category-column labels across every flow page.
//
// A category column is either
//   (a) a LESION CATEGORY — the shared VITAMIN-D-style taxonomy every flow uses
//       ("Inflammatory", "Neoplastic", "Immune-mediated" …). One category is one
//       word and one colour on every page, so a reader who learns the palette on
//       the jaundice flow reads the seizures flow the same way; or
//   (b) a PAGE-SPECIFIC split — anatomy or mechanism, not aetiology ("Cervical
//       (C1–T2)", "Left-to-Right Shunt", "Small intestine"). These are legitimate
//       and keep their own `tone`.
//
// Before this lint the corpus had 101 distinct column labels for what the type
// declared as 9 categories: "Infection" vs "Infectious", "Mass" vs "Neoplastic"
// vs "Neoplastic / Mass", "Immune-Mediated" vs "Immune-mediated", "Endocrine /
// Metabolic" vs "Metabolic / Endocrine" — each rendering in a different colour
// because unrecognised labels fall through to an index-cycled fallback tone.
//
// CHECK 1 — every label is a CatLabel (case- and order-exact) or is listed in
// PAGE_SPECIFIC below, keyed `pageId::label`.
//
// CHECK 2 — a CatLabel column must NOT carry a `tone` override, or it would opt
// out of the shared palette and reintroduce the drift by another route.

import type { CatLabel } from '../src/lib/signs/flowTypes'
import { eachPageBlock, pageCount } from './lib/walk'
import { lint } from './lib/lint'

const { fail, done } = lint('category-label')

const CANON: CatLabel[] = [
  'Vascular', 'Inflammatory', 'Infectious', 'Neoplastic', 'Immune-mediated', 'Degenerative',
  'Metabolic / Endocrine', 'Metabolic', 'Endocrine', 'Neurological', 'Toxic', 'Drug-induced',
  'Trauma', 'Anomalous',
]
const CANON_SET = new Set<string>(CANON)

// Reviewed columns that split by ANATOMY or MECHANISM rather than aetiology.
// Keyed `pageId::label`. Adding a row here is a deliberate statement that the
// column is not a lesion category — not a way to keep a misspelt one.
const PAGE_SPECIFIC = new Set<string>([
  'anisocoria-mydriasis::Afferent', 'anisocoria-mydriasis::Iris / Ocular',
  'anisocoria-horners::Sympathetic', 'anisocoria-horners::Uveal', 'anisocoria-horners::Structural',
  'haematuria-pseudo::Haemoglobinuria', 'haematuria-pseudo::Myoglobinuria', 'haematuria-pseudo::Pigmenturia',
  'myelopathy::Cervical (C1–T2)', 'myelopathy::Thoracolumbar (T3–L3)',
  'myelopathy::Lumbosacral (L4–S3)', 'myelopathy::S2–Ca5 (conus)',
  'syncope-cardiac::Arrhythmia (Brady or Tachy)', 'syncope-cardiac::Structural / Outflow',
  'syncope-cardiac::Pulmonary Hypertension / R-Sided',
  'syncope-reflex::Neurocardiogenic / Reflex', 'syncope-reflex::Metabolic Mimic', 'syncope-reflex::Not Syncope — Seizure',
  'heart-murmur-acquired::Degenerative / Myocardial', 'heart-murmur-acquired::Feline Cardiomyopathy',
  'heart-murmur-acquired::Pericardial / Miscellaneous',
  'heart-murmur-congenital::Left-to-Right Shunt', 'heart-murmur-congenital::Outflow Obstruction',
  'heart-murmur-functional::Physiological / Developmental', 'heart-murmur-functional::High-Output State',
  'heart-murmur-functional::Systemic',
  'fever-hyperthermia::Environmental / Exertional', 'fever-hyperthermia::Miscellaneous',
  'dysphagia-oral::Mechanical (Pain / Mass)', 'dysphagia-oral::Neuromuscular (CN / Muscle)',
  'dysphagia-pharyngeal::Mechanical (Mass / Obstruction)', 'dysphagia-pharyngeal::Neuromuscular',
  'dysphagia-oesophageal::Mechanical (Obstruction)', 'dysphagia-oesophageal::Motility / Inflammatory',
  // bleeding-dest-infect splits the infectious causes of platelet destruction by
  // PATHOGEN CLASS, not by lesion category — the whole page sits under the
  // parent page's 'Infectious' arm, so 'Infectious' as a column would be circular.
  'bleeding-dest-infect::Tick-borne', 'bleeding-dest-infect::Viral',
  'bleeding-dest-infect::Protozoal / fungal', 'bleeding-dest-infect::Bacterial / parasitic',
  'melena-upper::Infectious / Parasitic', 'melena-lower::Infectious / Parasitic',
  'constipation-obstructive::Impaction / Dietary', 'constipation-obstructive::Infectious / Inflammatory',
  'constipation-pelvic::Structural / Mechanical',
  'constipation-neuromet::Renal / Systemic',
  'oedema-hypoalbumin::Renal (Protein Loss)', 'oedema-hypoalbumin::GI (Protein Loss)',
  'oedema-hypoalbumin::Hepatobiliary (↓ Synthesis)',
  'oedema-hydrostatic::Right-Sided / Congestive', 'oedema-hydrostatic::Venous / Lymphatic (Localised)',
  'oedema-permeability::Infectious / Septic', 'oedema-permeability::Acute / Allergic',
  'swollen-joints-septic::Single Joint — Bacterial', 'swollen-joints-septic::Vector-Borne Polyarthritis',
  'swollen-joints-immune::Non-Erosive (Commonest)', 'swollen-joints-immune::Erosive',
  'swollen-joints-noninflam::Degenerative / Traumatic',
  'anorexia-pseudo::Oral / Dental', 'anorexia-pseudo::Neuromuscular', 'anorexia-pseudo::Oesophageal',
  'anorexia-true::GI · Pancreas', 'anorexia-true::Hepatobiliary', 'anorexia-true::Renal · Metabolic',
  'anorexia-true::Pain · CNS',
  'weight-loss-appetite::GI Malassimilation', 'weight-loss-appetite::Endocrine / Hypermetabolism',
  'weight-loss-reduced::Chronic Organ Disease', 'weight-loss-reduced::Chronic Infection',
  'polyphagia-weightloss::Endocrine (↑ Demand / Glucose Loss)', 'polyphagia-weightloss::GI Malassimilation',
  'polyphagia-weightgain::Drug-Induced / Endocrine', 'polyphagia-weightgain::Hypoglycaemia-Driven',
  'polyphagia-weightgain::Behavioural',
  'cyanosis-central::Airway Obstruction', 'cyanosis-central::Parenchymal / Infectious',
  'cyanosis-central::Pleural Space / Vascular',
  'cyanosis-cardiac::Congenital Shunt', 'cyanosis-cardiac::Underlying Heart Failure',
  'cyanosis-methb::Methaemoglobinaemia', 'cyanosis-methb::Peripheral — Poor Perfusion',
  'tremors-toxic::Toxins — Acute / Hyperthermic', 'tremors-toxic::Metabolic — Check the Bloods',
  'tremors-cerebellar::Developmental / Degenerative', 'tremors-cerebellar::Inflammatory / Infectious',
  'tremors-idiopathic::Idiopathic / Steroid-Responsive', 'tremors-idiopathic::Breed-Related / Benign',
  'gi-parasites::Stomach / Oesophagus', 'gi-parasites::Small intestine', 'gi-parasites::Large intestine',
  // Surfaced when this lint started walking `speciesChooser` panels (it never
  // had before — see lib/walk.ts). Both sit in the DIC page's per-species grids.
  //
  // "Cardiac" is a clean organ-system split, same shape as syncope-cardiac's
  // columns above — it holds cardiomyopathy and ATE, which are a site, not an
  // aetiology.
  //
  // "Vascular / Trauma" is NOT settled. It merges two canonical CatLabels behind
  // a slash and takes a manual tone, which is the exact drift pattern this lint
  // exists to stop ("Neoplastic / Mass"). It holds GDV + major trauma. The right
  // fix is probably two columns, but that changes the page's layout and is a
  // clinical-authoring call, so it is parked here rather than silently rewritten.
  'bleeding-dic::Cardiac',
  'bleeding-dic::Vascular / Trauma',
])

// Traversal comes from lib/walk. The old hand-rolled recursion here descended
// into `branch` columns and `fork` legs but not `speciesChooser` panels — whose
// per-species CatColumn grids are exactly what this lint exists to check.
for (const { pageId, block: b } of eachPageBlock()) {
  if (b.kind !== 'categoryGrid' && b.kind !== 'categoryColumns') continue
  for (const col of b.columns ?? []) {
    const cat = String(col.cat ?? '')
    const key = `${pageId}::${cat}`
    if (CANON_SET.has(cat)) {
      if (col.tone) {
        fail(`[${pageId}] column "${cat}" carries tone:'${col.tone}' — a shared category takes the shared colour; drop the override.`)
      }
    } else if (!PAGE_SPECIFIC.has(key)) {
      fail(`[${pageId}] column "${cat}" is neither a CatLabel nor a reviewed page-specific split. Use the canonical spelling (${CANON.join(' · ')}) or add "${key}" to PAGE_SPECIFIC.`)
    }
  }
}

done(`All category columns use a canonical CatLabel (unstyled) or a reviewed page-specific split (${pageCount()} flow pages checked).`,
  'One lesion category = one canonical label = one colour, on every flow.')
