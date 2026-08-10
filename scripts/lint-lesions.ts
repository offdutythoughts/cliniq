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
//
// SECOND RULE — a protocol is reached through the page for the diagnosis it treats
// (see src/app/screens/protocolCards.tsx):
//
//     lesion category  →  disease page  →  protocol
//
// So a lesion that HAS a disease page must not also declare `proto`. The disease
// page declares it, in `protos`, and shows it as a card at the top of the page;
// declaring it on the lesion too let the reader reach treatment steps a tap
// before the diagnosis, and split the answer to "which protocol treats this?"
// across two rows that could drift apart. A lesion WITHOUT a disease page is a
// genuine leaf (a fluid class, an oedema type, a shock category) — its `proto`
// is the only route to the steps and is expected.
//
// THIRD RULE — `proto` must name a protocol that exists, or the card navigates
// to a NotFound (LES-HU-GEN-PYO pointed at PROT-REPRO-PYO, which was never written).

import { DB } from '../src/data/db'
import type { Lesion } from '../src/types'

const RICH_FIELDS: (keyof Lesion)[] = ['etiology', 'patho', 'diag', 'treat', 'ddx']

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const pageIds = new Set(DB.disease_page.map(d => d.id))

/** The disease page a sub-type is really *about*, inferred from the differential of the same
 *  name in its own filter group. This is how a sub-type that never authored a `dis` link is
 *  still recognisable as a single disease. */
function impliedDisease(l: Lesion): string | undefined {
  const twin = DB.differentials.find(d => d.filter === l.filter && norm(d.name) === norm(l.sub))
  const dis = typeof twin?.dis === 'string' ? twin.dis : undefined
  return dis && pageIds.has(dis) ? dis : undefined
}

const protocolIds = new Set(DB.protocols.map(p => p.id))

for (const l of DB.lesion_type as unknown as Lesion[]) {
  // The protocol rules apply to EVERY lesion, including the directDis redirects
  // below — a redirecting row's `proto` was silently inherited by the disease
  // page it points at, which is exactly the drift this closes.
  if (l.proto) {
    if (l.dis) {
      fail(`[${l.id}] "${l.sub}" declares proto:'${l.proto}' AND links to ${l.dis} — a protocol is reached through the disease page. Move it to protos:'${l.proto}' on ${l.dis} and drop it here.`)
    } else if (!protocolIds.has(l.proto)) {
      fail(`[${l.id}] "${l.sub}" declares proto:'${l.proto}', which is not a protocol — the card would navigate to a NotFound.`)
    }
  }

  const redirects = !!(l.directDis && l.dis)
  if (redirects) continue // goes straight to the disease page — no intermediate leaf rendered

  // A sub-type that names one disease is not a category, whatever it has authored: the leaf
  // it renders is a thinner retelling of a page that already exists, and its Diagnostic
  // Investigation falls back to the union of EVERY sibling differential's tests — how
  // "Feline URTI (FHV-1 / FCV)" came to list cryptococcal antigen and FIV testing. Redirect.
  const implied = impliedDisease(l)
  if (implied) {
    fail(`[${l.id}] "${l.sub}" is the same entity as ${implied} but renders its own leaf — the diagnostics fallback lists every sibling differential's tests. Set dis:'${implied}' + directDis:true.`)
    continue
  }

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
  console.log(`✓ All lesion sub-type pages pass lint, and every lesion protocol is reached through its disease page (${(DB.lesion_type as unknown as Lesion[]).length} lesions checked).`)
}
