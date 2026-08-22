// Validates category-tile links across every flow page.
//
// CHECK 1 — no authoring gaps.
// A tile inside a `categoryGrid` / `categoryColumns` column must resolve to one
// of three intents:
//   • `link`            — a single destination page
//   • `links` (≥1)      — multiple destinations (sub-bullets)
//   • `terminal: true`  — an intentional leaf note with no page to link to
// A tile with NONE of these is an authoring gap (a forgotten link) — it renders
// greyed + aria-disabled ("No linked page available"). This lint fails on any
// such tile so the greyed state never ships: either wire the disease/flow page
// or mark it `terminal`.
//
// CHECK 2 — link-target consistency.
// The same tile label must resolve to the SAME target everywhere it appears.
// A label pointing at two different pages (e.g. "Heatstroke" → PROT-HEATSTROKE
// on one flow but → DIS-ENV-HEAT on another) is almost always an oversight — a
// named cause should have one canonical destination. Many labels → one target is
// fine; one label → many targets fails. This catches the divergence class that
// `resolve`-only checks miss without false-flagging intentional protocol links
// (they stay consistent across pages).
//
// CHECK 3 — name-only tile labels (mirrors lint-chips Rule 2 for endpoints).
// A LINKED tile (`link`) taps through to a disease/protocol/flow page that already
// carries the clinical detail, so a descriptive clause appended to the label
// ("NAME — murmur character · radiation · workup") is redundant clutter — strip it
// to the name. The ONLY post-dash text worth keeping on a linked tile is a terse
// species / ranking triage qualifier ("— dog", "— cat (#1), dog (#2)") — context
// the destination page does not surface at a glance. TERMINAL tiles (no link) are
// exempt: their label is the sole home of that content, so stripping would delete
// it. Parenthetical abbreviations / subtypes ("(VSD)", "(SAS)", '("shaker pup")')
// are part of the name and never tripped (this only looks past an em-dash).
//
// KEPT_TILE_DETAIL lists the few reviewed linked tiles whose post-dash text is the
// essential diagnosis/triage, not a strippable description, keyed `pageId::label`.
//
// CHECK 4 — no nested sub-bullet tiles.
// A tile must be ONE named cause pointing at ONE page. The `links` (plural) form —
// a parent label with "→ child" bullets nested inside the chip ("Pyelonephritis /
// Leptospirosis" → two sub-links) — was rejected as a flowchart format: a reader
// scanning a category column should see every differential as its own chip, at the
// same level, not two of them hidden one layer down inside a third. Split such a
// tile into one tile per cause. This lint fails on any tile that still uses it.
//
// CHECK 6 — a category tile names a DIAGNOSIS, so it links to a disease page.
// A tile is a lesion category: "Metaldehyde", "Diabetic ketoacidosis", "Sepsis".
// Linking one straight to its protocol skipped the disease page entirely, so the
// reader met the treatment steps without the aetiology, signalment, confirmation
// or prognosis — and the same condition behaved differently depending on which
// flow reached it. The protocol is not lost by this: a disease page surfaces its
// own protocols as the first cards on the page (`protos` in db.ts). So the route
// is always tile → disease page → protocol, never tile → protocol.
// PROTOCOL_ONLY_TILES lists the reviewed exceptions: conditions with a protocol
// but no disease page yet. Each is a content gap — write the page and remove the
// entry, rather than adding new ones.
//
// CHECK 7 — fn-layout LOCATION CARDS are name-only (`cardGrid`).
// The .fn-ep cards the legacy sign pages split into are separation boxes, so they
// follow the same rule as a `choices` box (lint-choices): the card carries the
// location / differential NAME and nothing else. The `sys` line above the name —
// "Dichotomous · moves with cotton-tip · fornixes", "Sound: Stertor" — was the
// discriminator, and it belongs in the step, callout or lookup table above the
// grid where the reader meets it once. `loc` carries no emoji. A `badge` may keep
// a glyph ONLY where it flags an emergency, matching the one kept siren on
// pollakiuria's obstructed column.
//
// CHECK 8 — a tile's SUBLABEL is a triage qualifier, not a description
// (mirrors lint-chips Rule 2, and applies to linked and unlinked tiles alike).
// A category tile renders exactly like an endpoints chip — name, then a dimmed
// second line — so it follows the same rule: the box carries the DIAGNOSIS NAME.
// The only second line worth its space is one that helps pick between the boxes:
// a ranking ("Most common feline cause") or a species restriction ("🐱 Cats").
// Anatomy, mechanism, breed lists and lab thresholds are disease-page content.
//
// CHECK 5 — no SHOUTING tile labels.
// A lesion/disease name on a tile is written in sentence case ("Bacterial septic
// arthritis"), not block capitals ("BACTERIAL SEPTIC ARTHRITIS"). The category
// HEADER above the column is the emphasis; shouting every chip underneath flattens
// the hierarchy and is markedly slower to read at 8–9px. Genuine acronyms keep
// their capitals (IMHA, MMVD, SRMA, DJD …) — add new ones to ACRONYMS below.

import { eachPageBlock, eachTile, pageCount } from './lib/walk'
import { lint } from './lib/lint'

const { fail, done } = lint('category-tile')

type TileLike = { label?: string; sublabel?: string; link?: unknown; links?: unknown[]; terminal?: boolean }

const isGap = (t: TileLike) =>
  !t.link && !(Array.isArray(t.links) && t.links.length > 0) && t.terminal !== true

// Post-em-dash text that is a pure species / ranking qualifier — kept on linked
// tiles (e.g. "dog", "cat", "dog (#1)", "cat (#1), dog (#2)", "dog (#3)").
const SPECIES_RANK = /^(dog|cat)(\s*\(#\d+\))?(\s*,\s*(dog|cat)(\s*\(#\d+\))?)*$/i

// CHECK 8 — the only sublabel a tile may keep. Same shape as lint-chips'
// ALLOWED_SUBLABEL, because a tile and a chip are the same box to the reader.
const ALLOWED_SUBLABEL = /^(?:#\d+ cause\b.*|.*most common .*cause.*|(?:🐱|🐶)?\s*(?:cats?|dogs?)(?: only)?)$/i

// Reviewed linked tiles whose post-dash text is load-bearing (the specific linked
// diagnosis / triage), not a strippable description. Keyed `pageId::label`.
const KEPT_TILE_DETAIL = new Set<string>([
  'cyanosis-methb::Acquired — oxidant toxicosis (most common)',
  'constipation-pelvic::Prostatomegaly — BPH',
])

// ── CHECK 5 — sentence case ───────────────────────────────────────────────────
// Words allowed to stay in capitals: clinical acronyms, initialisms and the few
// all-caps proper nouns. Everything else in a tile label is sentence case.
const ACRONYMS = new Set<string>([
  'AGASACA', 'AHDS', 'ARDS', 'ATE', 'BPH', 'CDV', 'CKD', 'CN', 'CRGV', 'DCM', 'DIC', 'DJD',
  'DKA', 'EPI', 'EPO', 'FCE', 'FeLV', 'FIC', 'FIP', 'FIV', 'GDV', 'GI', 'GME', 'HAC', 'HCM',
  'IBD', 'IE', 'IMHA', 'IMPA', 'IMTP', 'ITP', 'IVDD', 'KBr', 'LSA', 'MDR1', 'MMVD', 'MUA',
  'MUO', 'NLE', 'NME', 'OA', 'OCD', 'PDA', 'PLE', 'PLN', 'PRAA', 'PS', 'PSS', 'PTE', 'RA',
  'RMSF', 'SA', 'SAS', 'SaO2', 'SLE', 'SNRIs', 'SRMA', 'SSRIs', 'TCC', 'URI', 'UTI', 'VSD', 'ASD',
])
// The NAME of the diagnosis — the part before any " — " detail clause or " (…)"
// qualifier. Only the name is checked; the detail clause is prose and already
// lowercase by convention.
const tileName = (label: string) => label.split(/\s[—–]\s|\s\(/)[0].trim()
const isShouting = (label: string) => {
  const rest = tileName(label)
    .split(/[\s/·+,]+/)
    .filter(w => w && !ACRONYMS.has(w))
    .join('')
    .replace(/[^A-Za-z]/g, '')
  return rest.length >= 4 && rest.replace(/[^A-Z]/g, '').length / rest.length > 0.6
}

// Normalise a label for grouping: strip emoji / arrows / symbols and leading
// junk, collapse whitespace, lowercase. Keeps internal punctuation so
// "Hypocalcaemia (tremors)" and "Hypocalcaemia" stay distinct keys.
const normLabel = (label: string) =>
  label
    .replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}️]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

// Reviewed tiles allowed to link straight to a protocol because no disease page
// covers the condition yet. Keyed `pageId::label`. Removing an entry is the goal.
const PROTOCOL_ONLY_TILES = new Set([
  // No DIS- page for anaphylaxis/angioedema — PROT-ANAPHYLAXIS is all there is.
  'oedema-permeability::Angioedema / anaphylaxis / envenomation',
])

// A stable key for a link target (or null if the value isn't a resolvable link).
const targetKey = (link: unknown): string | null => {
  if (!link || typeof link !== 'object') return null
  const l = link as { to?: unknown; id?: unknown; loc?: unknown }
  if (l.to === 'lesion') return `lesion:${String(l.loc)}`
  if (l.to && l.id) return `${String(l.to)}:${String(l.id)}`
  return null
}

// normLabel → (targetKey → example "where" strings)
const seen = new Map<string, Map<string, string[]>>()
const record = (label: string, link: unknown, where: string) => {
  const key = targetKey(link)
  if (!key) return
  const norm = normLabel(label)
  if (!norm) return
  const byTarget = seen.get(norm) ?? new Map<string, string[]>()
  const wheres = byTarget.get(key) ?? []
  if (wheres.length < 3) wheres.push(where)
  byTarget.set(key, wheres)
  seen.set(norm, byTarget)
}

// One shared, exhaustive walk (scripts/lib/walk.ts) — it recurses into branch
// columns, fork legs AND speciesChooser panels, so no block kind is silently skipped.
for (const { pageId, kind, cat, tile } of eachTile()) {
  const label = String(tile.label ?? '').trim()
  if (isGap(tile)) {
    fail(`[${pageId}] ${kind} · ${cat} · "${label || '(no label)'}" — no link/links/terminal`)
  }
  // CHECK 3: a LINKED tile must be name-only past any em-dash.
  const dash = label.match(/\s—\s(.+)$/)
  if (tile.link && dash && !SPECIES_RANK.test(dash[1].trim()) &&
      !KEPT_TILE_DETAIL.has(`${pageId}::${label}`)) {
    fail(`[${pageId}] ${cat} · "${label}" — linked tile carries a description the tap-through page already gives; strip to the name (keep only a species/ranking qualifier).`)
  }
  // CHECK 8: the second line is a ranking / species qualifier or it does not exist.
  const sublabel = String(tile.sublabel ?? '').trim()
  if (sublabel && !ALLOWED_SUBLABEL.test(sublabel)) {
    fail(`[${pageId}] ${cat} · "${label}" sublabel "${sublabel}" — a tile carries the diagnosis name only; strip it (keep only a ranking or species qualifier, e.g. "Most common feline cause", "🐱 Cats").`)
  }
  // CHECK 5: sentence case — the column header carries the emphasis.
  if (isShouting(label)) {
    fail(`[${pageId}] ${cat} · "${label}" — tile label is in block capitals; write the diagnosis in sentence case (acronyms keep their capitals).`)
  }
  // CHECK 6: a tile is a diagnosis, so it links to the disease page — which
  // carries that diagnosis's protocols as its own top cards.
  const links = [tile.link, ...((tile.links ?? []) as unknown[])]
  if (links.some(l => (l as { to?: string })?.to === 'protocol') &&
      !PROTOCOL_ONLY_TILES.has(`${pageId}::${label}`)) {
    fail(`[${pageId}] ${cat} · "${label}" — tile links straight to a protocol; point it at the disease page and declare the protocol there (protos in db.ts), so the reader gets the diagnosis before the treatment steps.`)
  }
  // CHECK 4: the nested sub-bullet form is banned — one tile, one cause.
  if (Array.isArray(tile.links) && tile.links.length > 0) {
    const kids = (tile.links as { label?: string }[]).map(ll => `"${String(ll.label ?? '')}"`).join(' + ')
    fail(`[${pageId}] ${cat} · "${label}" — nested sub-bullet tile (links: ${kids}); split it into one tile per cause.`)
  }
  const where = `${pageId} · ${cat}`
  if (tile.link) record(label, tile.link, where)
  for (const ll of (tile.links ?? []) as { label?: string; link?: unknown }[]) record(String(ll.label ?? label), ll.link, where)
}

// CHECK 2: any label that resolves to more than one distinct target.
for (const [norm, byTarget] of seen) {
  if (byTarget.size > 1) {
    const detail = [...byTarget.entries()]
      .map(([target, wheres]) => `${target} (${wheres.join(', ')})`)
      .join('  vs  ')
    fail(`label "${norm}" resolves to ${byTarget.size} different targets — ${detail}`)
  }
}

// ── CHECK 7 — fn-layout location cards are name-only ─────────────────────────
const EMOJI = /\p{Extended_Pictographic}/u
const EMERGENCY_BADGE = /emergency/i
for (const { pageId, block } of eachPageBlock()) {
  if (block.kind !== 'cardGrid') continue
  for (const tile of block.tiles) {
    if (tile.sys) {
      fail(`[${pageId}] card "${tile.loc}" has a sys line "${tile.sys}" — a location card is name-only; put the finding that picks it in the step, callout or table above the grid.`)
    }
    if (EMOJI.test(tile.loc)) {
      fail(`[${pageId}] card "${tile.loc}" has an emoji in its name — the card's colour already comes from its anat class.`)
    }
    if (tile.badge && EMOJI.test(tile.badge) && !EMERGENCY_BADGE.test(tile.badge)) {
      fail(`[${pageId}] card "${tile.loc}" badge "${tile.badge}" carries an emoji but does not flag an emergency — keep the words, drop the glyph.`)
    }
  }
}

done(
  `All category tiles resolve, map to one target, are name-only when linked, are in sentence case, and carry no nested sub-bullets — and every fn-layout location card is name-only — across ${pageCount()} flow pages.`,
  "Link a page / set terminal:true / make the label's target consistent / strip the linked tile or location card to its name / split a sub-bullet tile into one tile per cause.",
)
