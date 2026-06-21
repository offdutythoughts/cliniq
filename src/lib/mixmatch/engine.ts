// ── Mix & Match engine ───────────────────────────────────────────────────────
// Builds two indices at module load:
//   signToLocs  — sign id → Set of LOC-* codes reachable from its flow tree
//   locToItems  — LOC-* → [{ diseaseId, cat }]
//
// searchMixMatch() takes a set of sign ids + optional signalment filters and
// returns all matching diseases scored by how many of the selected signs they
// appear under, grouped by normalised lesion category.

import type { Block, Link } from '../signs/flowTypes'
import type { DiseaseRow } from '../../data/db'
import { FLOWS } from '../signs/flows'
import { FLOW_SIGNS } from '../signs/registry'
import { DB } from '../../data/db'

// ── 1. Flow traversal ────────────────────────────────────────────────────────

function visitLink(link: Link, locs: Set<string>, visited: Set<string>) {
  if (link.to === 'lesion') {
    locs.add(link.loc)
  } else if (link.to === 'flow') {
    visitPage(link.id, locs, visited)
  }
}

function visitBlock(block: Block, locs: Set<string>, visited: Set<string>) {
  switch (block.kind) {
    case 'choices':
      for (const item of block.items) if (item.link) visitLink(item.link, locs, visited)
      break
    case 'endpoints':
      for (const item of block.items) if (item.link) visitLink(item.link, locs, visited)
      break
    case 'branch':
      for (const col of block.columns) for (const b of col.blocks) visitBlock(b, locs, visited)
      break
    case 'cardGrid':
      for (const tile of block.tiles) if (tile.link) visitLink(tile.link, locs, visited)
      break
    case 'diseaseGrid':
      for (const ll of block.links) visitLink(ll.link, locs, visited)
      break
    case 'dxRow':
      for (const ll of block.items) visitLink(ll.link, locs, visited)
      break
    case 'categoryGrid':
      for (const col of block.columns) for (const tile of col.tiles) if (tile.link) visitLink(tile.link, locs, visited)
      break
    case 'categoryColumns':
      for (const col of block.columns) for (const tile of col.tiles) if (tile.link) visitLink(tile.link, locs, visited)
      break
    case 'alert':
      for (const item of block.items) if (typeof item === 'object' && 'link' in item) visitLink(item.link, locs, visited)
      break
    case 'cardSection':
      for (const card of block.cards) if (card.link) visitLink(card.link, locs, visited)
      break
    default:
      break
  }
}

function visitPage(flowId: string, locs: Set<string>, visited: Set<string>) {
  if (visited.has(flowId)) return
  visited.add(flowId)
  const page = FLOWS[flowId]
  if (!page) return
  for (const block of page.blocks) visitBlock(block, locs, visited)
}

// ── 2. Build indices (once at module load) ───────────────────────────────────

/** sign id → LOC-* codes reachable from the sign's flow */
const signToLocs: Map<string, Set<string>> = new Map()

for (const sign of FLOW_SIGNS) {
  const locs = new Set<string>()
  visitPage(sign.flowId, locs, new Set())
  signToLocs.set(sign.id, locs)
}

interface LocItem { diseaseId: string; cat: string }

/** LOC-* → [{diseaseId, cat}] */
const locToItems: Map<string, LocItem[]> = new Map()

// helper: add without duplicates
function addItem(loc: string, item: LocItem) {
  let list = locToItems.get(loc)
  if (!list) { list = []; locToItems.set(loc, list) }
  if (!list.some(x => x.diseaseId === item.diseaseId)) list.push(item)
}

// From lesion_type — direct disease links
for (const les of DB.lesion_type) {
  if (les.dis) addItem(les.loc, { diseaseId: les.dis as string, cat: les.cat })
}

// From differentials (via filter → lesion_type → loc)
const filterToLoc = new Map<string, string>()
const filterToCat = new Map<string, string>()
for (const les of DB.lesion_type) {
  if (les.filter && !filterToLoc.has(les.filter as string)) {
    filterToLoc.set(les.filter as string, les.loc)
    filterToCat.set(les.filter as string, les.cat)
  }
}
for (const diff of DB.differentials) {
  if (!diff.dis) continue
  const loc = filterToLoc.get(diff.filter)
  if (!loc) continue
  const cat = filterToCat.get(diff.filter) ?? 'Other'
  addItem(loc, { diseaseId: diff.dis as string, cat })
}

// ── 3. Category normalisation ────────────────────────────────────────────────

const CAT_ORDER: string[] = [
  'Inflammatory',
  'Infectious',
  'Immune-mediated',
  'Neoplastic',
  'Vascular',
  'Metabolic',
  'Endocrine',
  'Structural',
  'Degenerative',
  'Neuromuscular',
  'Toxic',
  'Congenital/Inherited',
  'Other',
]

function normCat(raw: string): string {
  const r = raw.trim()
  if (/^inflammat/i.test(r)) return 'Inflammatory'
  if (/^infect/i.test(r) || r === 'Parasitic' || r === 'Parasitic/Vascular' || r === 'Infection/Fungal') return 'Infectious'
  if (/immune/i.test(r) || /autoimmune/i.test(r)) return 'Immune-mediated'
  if (/neoplas|tumour|tumor|mass|malignan/i.test(r)) return 'Neoplastic'
  if (/vascular|cardiovasc|thromboe/i.test(r)) return 'Vascular'
  if (/metabol/i.test(r)) return 'Metabolic'
  if (/endocrin/i.test(r)) return 'Endocrine'
  if (/struct|conform|obstruct|foreign|hiatal|motility/i.test(r)) return 'Structural'
  if (/degener/i.test(r)) return 'Degenerative'
  if (/neuromusc|neurolog|dynamic collapse/i.test(r)) return 'Neuromuscular'
  if (/tox/i.test(r)) return 'Toxic'
  if (/congen|inherit|anomal/i.test(r)) return 'Congenital/Inherited'
  if (/fluid|oedema|cardiac/i.test(r)) return 'Vascular'
  if (/ulcer/i.test(r)) return 'Inflammatory'
  if (/trauma|traumatic/i.test(r)) return 'Structural'
  if (/idio|reactive|stress|behav/i.test(r)) return 'Other'
  return 'Other'
}

// ── 4. Public API ────────────────────────────────────────────────────────────

export interface MixMatchResultItem {
  disease: DiseaseRow
  matchedSignIds: string[]
  category: string
}

export interface MixMatchCategory {
  name: string
  items: MixMatchResultItem[]
}

export interface Signalement {
  species: 'all' | 'dog' | 'cat'
  breedQuery?: string
}

export function searchMixMatch(
  selectedSignIds: string[],
  signalement: Signalement,
): MixMatchCategory[] {
  if (selectedSignIds.length === 0) return []

  // For each sign, collect its LOCs
  const signLocs: Array<Set<string>> = selectedSignIds.map(id => signToLocs.get(id) ?? new Set())

  // Disease → which sign indices it appears under + which cat
  const diseaseSignIdx = new Map<string, Set<number>>()
  const diseaseCat = new Map<string, string>()

  selectedSignIds.forEach((_, si) => {
    for (const loc of signLocs[si]) {
      for (const item of locToItems.get(loc) ?? []) {
        let set = diseaseSignIdx.get(item.diseaseId)
        if (!set) { set = new Set(); diseaseSignIdx.set(item.diseaseId, set) }
        set.add(si)
        // First cat encountered wins
        if (!diseaseCat.has(item.diseaseId)) diseaseCat.set(item.diseaseId, item.cat)
      }
    }
  })

  // Build disease lookup
  const diseaseById = new Map(DB.disease_page.map(d => [d.id, d]))

  // Filter and score
  const results: MixMatchResultItem[] = []
  for (const [diseaseId, signIdxSet] of diseaseSignIdx) {
    const disease = diseaseById.get(diseaseId)
    if (!disease) continue

    // Signalment filter — species
    if (signalement.species !== 'all') {
      const sp = (disease.sp as string ?? '').toLowerCase()
      const wantDog = signalement.species === 'dog'
      const hasDog = sp.includes('dog')
      const hasCat = sp.includes('cat')
      if (wantDog && !hasDog) continue
      if (!wantDog && !hasCat) continue
    }

    // Signalment filter — breed text search
    if (signalement.breedQuery) {
      const q = signalement.breedQuery.toLowerCase()
      const breedText = ((disease.breed as string) ?? (disease.signs as string) ?? '').toLowerCase()
      if (!breedText.includes(q)) continue
    }

    const matchedSignIds = [...signIdxSet].map(i => selectedSignIds[i])
    const rawCat = diseaseCat.get(diseaseId) ?? 'Other'
    results.push({ disease, matchedSignIds, category: normCat(rawCat) })
  }

  // Sort: more matched signs first, then alphabetically
  results.sort((a, b) => {
    const diff = b.matchedSignIds.length - a.matchedSignIds.length
    if (diff !== 0) return diff
    return (a.disease.name as string).localeCompare(b.disease.name as string)
  })

  // Group by category
  const catMap = new Map<string, MixMatchResultItem[]>()
  for (const r of results) {
    let list = catMap.get(r.category)
    if (!list) { list = []; catMap.set(r.category, list) }
    list.push(r)
  }

  // Sort groups by CAT_ORDER
  const catOrder = new Map(CAT_ORDER.map((c, i) => [c, i]))
  return [...catMap.entries()]
    .sort(([a], [b]) => (catOrder.get(a) ?? 99) - (catOrder.get(b) ?? 99))
    .map(([name, items]) => ({ name, items }))
}

