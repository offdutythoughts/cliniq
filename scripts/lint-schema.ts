// Validates the SHAPE of every row in src/data/db.ts.
//
// Nothing previously stopped a new field being invented on a row. That is how
// `note` came to exist: a catch-all with no renderer contract, which grew to 278
// authored notes — 161 of them on rows that redirect to a disease page and so
// never rendered at all. It also left 125 rows carrying an empty `note:""` long
// after the field was retired.
//
// The fix is not a style rule, it is a closed set. A field that is not declared
// below fails the build, so the next catch-all cannot take root: whoever adds it
// has to declare it here, which is the moment to ask "what renders this?".
//
// Schemas are deliberately permissive about VALUES (most fields are free pipe-
// markup prose, policed by the other content lints). What they pin down is the
// KEY SET and the handful of structural invariants that have actually bitten.

import { z } from 'zod'
import { DB } from '../src/data/db'
import { lint } from './lib/lint'

const { fail, done } = lint('row-schema')

const text = z.string()
const flag = z.boolean()

/** Pipe-markup prose fields shared by disease pages and lesion sub-types. */
const clinical = {
  etiology: text.optional(),
  path: text.optional(),
  signs: text.optional(),
  conf: text.optional(),
  supp: text.optional(),
  tx1: text.optional(),
  tx2: text.optional(),
  monitor: text.optional(),
  prog: text.optional(),
  pearl: text.optional(),
  ddx: text.optional(),
}

const diseasePage = z.object({
  id: z.string().regex(/^DIS-[A-Z0-9-]+$/, 'disease ids are DIS-…'),
  name: text,
  sp: text,
  synonyms: text.optional(),
  breed: text.optional(),
  age: text.optional(),
  sex: text.optional(),
  risk: text.optional(),
  severe: text.optional(),
  outpatient: text.optional(),
  topAlert: text.optional(),
  showGradingTable: flag.optional(),
  zoo: flag.optional(),
  ...clinical,
}).strict()

const lesionType = z.object({
  id: z.string().regex(/^LES-[A-Z0-9-]+$/, 'lesion ids are LES-…'),
  loc: text,
  loc_name: text,
  sp: text,
  cat: text,
  sub: text,
  urg: text,
  // Leaf-page fields. `diag`/`treat`/`patho` are the lesion spellings of
  // conf/tx1/path — kept distinct because the renderer maps them separately.
  diag: text.optional(),
  treat: text.optional(),
  patho: text.optional(),
  signalment: text.optional(),
  onset: text.optional(),
  filter: text.optional(),
  proto: text.optional(),
  dis: text.optional(),
  directDis: flag.optional(),
  noDiffFlow: flag.optional(),
  zoo: flag.optional(),
  ...clinical,
}).strict()

const differential = z.object({
  id: text, loc: text, sp: text, name: text, feat: text, minDx: text,
  order: z.number(), filter: text.optional(), dis: text.optional(), addDx: text.optional(),
}).strict()

const protocol = z.object({
  id: text, name: text, sp: text, trigger: text, priority: text,
  steps: z.array(z.object({
    n: z.number(), action: text,
    doses: text.optional(), note: text.optional(), branch: text.optional(), flag: text.optional(),
  })),
}).strict()

const TABLES = [
  ['disease_page', diseasePage, DB.disease_page],
  ['lesion_type', lesionType, DB.lesion_type],
  ['differentials', differential, DB.differentials],
  ['protocols', protocol, DB.protocols],
] as const

let checked = 0
for (const [table, schema, rows] of TABLES) {
  for (const row of rows as unknown[]) {
    checked++
    const res = schema.safeParse(row)
    if (res.success) continue
    const id = (row as { id?: string }).id ?? '(no id)'
    for (const issue of res.error.issues) {
      const where = issue.path.join('.') || '(row)'
      // An unrecognised key is the case this lint exists for — name it plainly.
      const msg = issue.code === 'unrecognized_keys'
        ? `undeclared field(s) ${(issue as unknown as { keys: string[] }).keys.join(', ')} — declare them in scripts/lint-schema.ts (and give them a renderer) or remove them`
        : `${where}: ${issue.message}`
      fail(`[${table}] ${id} — ${msg}`)
    }
  }
}

done(`All ${checked} DB rows match their declared schema (no undeclared fields).`)
