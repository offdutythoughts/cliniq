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

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

type TileLike = { label?: string; link?: unknown; links?: unknown[]; terminal?: boolean }

const isGap = (t: TileLike) =>
  !t.link && !(Array.isArray(t.links) && t.links.length > 0) && t.terminal !== true

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
          const where = `${pageId} · ${col.cat}`
          if (tile.link) record(label, tile.link, where)
          for (const ll of (tile.links ?? []) as any[]) record(String(ll.label ?? label), ll.link, where)
        }
      }
    }
    // Recurse into branch columns (they nest blocks)
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
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
  console.error(`\n${errors} category-tile issue(s) found. Link a page / set terminal:true / make the label's target consistent.`)
  process.exit(1)
} else {
  console.log(`✓ All category tiles resolve and every label maps to one target, across ${Object.keys(FLOWS).length} flow pages.`)
}
