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

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

type TileLike = { label?: string; link?: unknown; links?: unknown[]; terminal?: boolean }

const isGap = (t: TileLike) =>
  !t.link && !(Array.isArray(t.links) && t.links.length > 0) && t.terminal !== true

// Post-em-dash text that is a pure species / ranking qualifier — kept on linked
// tiles (e.g. "dog", "cat", "dog (#1)", "cat (#1), dog (#2)", "dog (#3)").
const SPECIES_RANK = /^(dog|cat)(\s*\(#\d+\))?(\s*,\s*(dog|cat)(\s*\(#\d+\))?)*$/i

// Reviewed linked tiles whose post-dash text is load-bearing (the specific linked
// diagnosis / triage), not a strippable description. Keyed `pageId::label`.
const KEPT_TILE_DETAIL = new Set<string>([
  'cyanosis-methb::ACQUIRED — OXIDANT TOXICOSIS (most common)',
  'constipation-pelvic::PROSTATOMEGALY — BPH',
])

// Normalise a label for grouping: strip emoji / arrows / symbols and leading
// junk, collapse whitespace, lowercase. Keeps internal punctuation so
// "Hypocalcaemia (tremors)" and "Hypocalcaemia" stay distinct keys.
const normLabel = (label: string) =>
  label
    .replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}️]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

// A stable key for a link target (or null if the value isn't a resolvable link).
const targetKey = (link: any): string | null => {
  if (!link || typeof link !== 'object') return null
  if (link.to === 'lesion') return `lesion:${link.loc}`
  if (link.to && link.id) return `${link.to}:${link.id}`
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

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks as any[]) {
    if (b.kind === 'categoryGrid' || b.kind === 'categoryColumns') {
      for (const col of b.columns ?? []) {
        for (const tile of col.tiles ?? []) {
          const label = String(tile.label ?? '').trim()
          if (isGap(tile)) {
            fail(`[${pageId}] ${b.kind} · ${col.cat} · "${label || '(no label)'}" — no link/links/terminal`)
          }
          // CHECK 3: a LINKED tile must be name-only past any em-dash (species /
          // ranking qualifiers and reviewed KEPT exceptions excepted).
          const dash = label.match(/\s—\s(.+)$/)
          if (tile.link && dash && !SPECIES_RANK.test(dash[1].trim()) &&
              !KEPT_TILE_DETAIL.has(`${pageId}::${label}`)) {
            fail(`[${pageId}] ${col.cat} · "${label}" — linked tile carries a description the tap-through page already gives; strip to the name (keep only a species/ranking qualifier).`)
          }
          // CHECK 4: the nested sub-bullet form is banned — one tile, one cause.
          if (Array.isArray(tile.links) && tile.links.length > 0) {
            const kids = (tile.links as any[]).map(ll => `"${String(ll.label ?? '')}"`).join(' + ')
            fail(`[${pageId}] ${col.cat} · "${label}" — nested sub-bullet tile (links: ${kids}); split it into one tile per cause.`)
          }
          const where = `${pageId} · ${col.cat}`
          if (tile.link) record(label, tile.link, where)
          for (const ll of (tile.links ?? []) as any[]) record(String(ll.label ?? label), ll.link, where)
        }
      }
    }
    // Recurse into the block kinds that nest blocks (branch columns, fork legs)
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
    if (b.kind === 'fork') for (const leg of b.legs ?? []) checkBlocks(pageId, leg.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

// CHECK 2: any label that resolves to more than one distinct target.
for (const [norm, byTarget] of seen) {
  if (byTarget.size > 1) {
    const detail = [...byTarget.entries()]
      .map(([target, wheres]) => `${target} (${wheres.join(', ')})`)
      .join('  vs  ')
    fail(`label "${norm}" resolves to ${byTarget.size} different targets — ${detail}`)
  }
}

if (errors > 0) {
  console.error(`\n${errors} category-tile issue(s) found. Link a page / set terminal:true / make the label's target consistent / strip the linked tile to its name / split a sub-bullet tile into one tile per cause.`)
  process.exit(1)
} else {
  console.log(`✓ All category tiles resolve, map to one target, are name-only when linked, and carry no nested sub-bullets, across ${Object.keys(FLOWS).length} flow pages.`)
}
