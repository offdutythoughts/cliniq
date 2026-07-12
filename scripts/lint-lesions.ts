// Validates lesion sub-type pages against the "redundant / jumbled intermediate page" defect.
//
// SubTypeDetailView (src/app/screens/SubTypeDetailView.tsx) redirects straight to the
// disease page when `directDis && dis`. Otherwise it renders a standalone leaf whose
// Etiology card falls back to the sibling DIFFERENTIALS (`diffs.map(d => d.name)`) when
// the lesion has no authored `etiology`. That fallback lists every sibling of the sub-type
// as if it were the sub-type's own aetiology — clinically wrong — and, when a `dis` link is
// present, produces an extra page that just leads to the real disease page (e.g. the
// coughing → cardiac → "DCM" jumble that duplicated Dilated Cardiomyopathy).
//
// Rule: a lesion that renders SubTypeDetailView (i.e. NOT (directDis && dis)) and carries a
// `dis` link MUST author its own leaf content (etiology / patho / diag / treat / ddx),
// otherwise it should set `directDis: true` to redirect to the disease page. A lesion that
// only ever links to a disease and has nothing bespoke to say belongs in the directDis path.
//
// Sub-types with NO `dis` link are exempt: for broad symptom sub-types (e.g. "Syncope",
// "Seizure disorder") the differential fallback IS the intended aetiology content, and there
// is no duplicate disease page to redirect to.

import { DB } from '../src/data/db'
import type { Lesion } from '../src/types'

const RICH_FIELDS: (keyof Lesion)[] = ['etiology', 'patho', 'diag', 'treat', 'ddx']

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

for (const l of DB.lesion_type as unknown as Lesion[]) {
  const redirects = !!(l.directDis && l.dis)
  if (redirects) continue // goes straight to the disease page — no intermediate leaf rendered

  const hasRich = RICH_FIELDS.some(f => {
    const v = l[f]
    return typeof v === 'string' && v.trim().length > 0
  })
  if (hasRich) continue // intentional rich leaf page (authors its own content)

  // No redirect and no bespoke content. Only a defect when the sub-type ALSO links to a
  // specific disease: SubTypeDetailView then shows the sibling-differential fallback as this
  // sub-type's "Etiology" and appends a disease card — a jumbled, redundant intermediate page
  // that should instead set directDis: true and go straight to the disease.
  if (l.dis) {
    fail(`[${l.id}] "${l.sub}" links to ${l.dis} but has no directDis and no authored leaf content — renders a jumbled etiology fallback + redundant disease card. Add directDis:true or author etiology.`)
  }
}

if (errors > 0) {
  console.error(`\n${errors} lesion lint error(s) found.`)
  process.exit(1)
} else {
  console.log(`✓ All lesion sub-type pages pass lint (${(DB.lesion_type as unknown as Lesion[]).length} lesions checked).`)
}
