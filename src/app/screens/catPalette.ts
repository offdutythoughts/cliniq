// ── Aetiology-category palette ────────────────────────────────────────────────
// One category → one colour, on every screen that groups by aetiology. The
// triple is built from CSS variables so light/dark is handled by the token block
// in globals.css and never by a per-screen branch; alphas stay tokenised
// (--tile-bg-a / --tile-bd-a) so the tint is legible in both modes.
//
// Two consumers, one table:
//   • flow pages — `categoryColumns` / `categoryGrid` headers and tiles
//     (resolveCatStyle in FlowPageView), keyed by the `CatLabel` union;
//   • Mix & Match — the result groups, keyed by CAT_ORDER in diseaseSearch.
// The two vocabularies overlap but are not identical, hence the second map.

export type CatTint = { bg: string; border: string; col: string }

export const catStyle = (v: string): CatTint => ({
  bg: `rgba(var(--cat-${v}),var(--tile-bg-a))`,
  border: `rgba(var(--cat-${v}),var(--tile-bd-a))`,
  col: `var(--cat-${v}-fg)`,
})

// Keys are the `CatLabel` union in flowTypes; `lint:cats` fails any category
// column whose label is neither a key here nor a reviewed page-specific
// (anatomical / mechanism) column.
export const CAT_STYLE: Record<string, CatTint> = {
  'Vascular': catStyle('vascular'),
  'Inflammatory': catStyle('inflammatory'),
  'Infectious': catStyle('infectious'),
  'Neoplastic': catStyle('neoplastic'),
  'Immune-mediated': catStyle('immune'),
  'Degenerative': catStyle('degenerative'),
  'Metabolic / Endocrine': catStyle('metabolic'),
  'Metabolic': catStyle('metabolic'),
  'Endocrine': catStyle('endocrine'),
  'Neurological': catStyle('neurological'),
  'Toxic': catStyle('toxic'),
  // Drug-induced disease is iatrogenic toxicity — same palette, distinct label.
  'Drug-induced': catStyle('toxic'),
  'Trauma': catStyle('trauma'),
  'Anomalous': catStyle('anomalous'),
}

// Mix & Match's CAT_ORDER (diseaseSearch). Every label maps, so a result group
// never falls back to undifferentiated grey. The four labels the flow taxonomy
// doesn't carry have their own tokens — see the note above them in globals.css
// for why three of them reuse a triplet.
export const MIXMATCH_CAT: Record<string, CatTint> = {
  'Inflammatory': CAT_STYLE['Inflammatory'],
  'Infectious': CAT_STYLE['Infectious'],
  'Immune-mediated': CAT_STYLE['Immune-mediated'],
  'Neoplastic': CAT_STYLE['Neoplastic'],
  'Vascular': CAT_STYLE['Vascular'],
  'Metabolic': CAT_STYLE['Metabolic'],
  'Endocrine': CAT_STYLE['Endocrine'],
  'Structural': catStyle('structural'),
  'Degenerative': CAT_STYLE['Degenerative'],
  'Neuromuscular': catStyle('neuromuscular'),
  'Toxic': CAT_STYLE['Toxic'],
  'Congenital/Inherited': catStyle('congenital'),
  'Other': catStyle('other'),
}
