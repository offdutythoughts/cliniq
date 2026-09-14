// ── View ⇄ URL ──────────────────────────────────────────────────────────────
// One round-trippable encoding of a View, and the single table that defines it.
//
// Before this, `nav/view.ts` hand-wrote the same per-kind switch three times —
// `viewKey` (a render identity), `screenMeta().noteKey` (the persisted notes
// key) and `viewFromNoteKey` (its partial inverse) — plus `parseLegacyOnclick`
// for the pre-React `fn('a','b')` strings. Four spellings of "which screen is
// this", none of them a clean inverse of another, and adding a View kind meant
// finding all of them.
//
// This module owns ONE of those jobs properly: the URL. It is the only encoding
// that has to survive a round trip, because a reader can bookmark it, share it,
// or press reload on it.
//
// The note key is deliberately NOT unified into this. It is persisted reader
// data — `page:dxPupdHistory`, `proto:PROT-CPR` — in a scheme inherited from
// the pre-React app, and a "tidier" spelling would orphan every note anyone has
// saved. It stays in view.ts as what it is: a storage format with a migration
// obligation, not a routing concern.
//
// IDENTITY vs PARAMETER. `path` is what makes a screen that screen, and is what
// `viewKey` uses for React keys and slide animations. Anything that decorates a
// screen without changing which screen it is goes in `query`:
//
//   • `sp` (disease) pins which species tab opens. Putting it in the path would
//     make the species toggle a different screen — remounting the page and
//     throwing the reader back to the top mid-read.
//   • `filter` (lesionLoc) IS identity: acute and chronic are different lists.
//
// `name` on lesionLoc is not encoded at all — it is re-derived from db.ts on
// decode, so the URL stays short and a renamed location fixes itself.

import type { View, ViewKind, Tab } from './view'
import { SPECIES, type Species } from '../../lib/species'
import { DB } from '../../data/db'
import { FLOWS } from '../../lib/signs/flows'
import { DX } from '../../lib/signs/dx'

/** Location code → display name, for rehydrating a lesionLoc view from its id. */
const locNames = (() => {
  const m = new Map<string, string>()
  for (const l of DB.lesion_type) if (l.loc && !m.has(l.loc)) m.set(l.loc, l.loc_name || l.loc)
  return m
})()

/** URL slug per tab, in Tab-index order. Stable strings, not the display labels
 *  — "Mix & Match" is not something to put in a path. */
const TAB_SLUGS = ['clinical', 'diagnostic', 'disease', 'mixmatch', 'protocols', 'settings'] as const

export interface ViewUrl {
  /** Identity. `/app/<path>` — also the React key. Never empty. */
  path: string
  /** Decoration. Omitted when empty. */
  query?: Record<string, string>
}

// ── The table ───────────────────────────────────────────────────────────────
// One row per View kind. `to` builds the url; `from` rebuilds the view from the
// path segments after the kind slug, or returns null if they don't resolve to
// real content. Add a View kind => add a row here; the exhaustiveness check
// below refuses to compile without one.

interface Codec<K extends ViewKind> {
  /** First path segment. */
  slug: string
  to: (v: Extract<View, { kind: K }>) => ViewUrl
  from: (seg: string[], q: URLSearchParams) => View | null
}

const species = (s: string | null): Species | undefined =>
  SPECIES.find(x => x.toLowerCase() === (s ?? '').toLowerCase())

const CODECS: { [K in ViewKind]: Codec<K> } = {
  tab: {
    slug: '',
    to: v => ({ path: TAB_SLUGS[v.tab] }),
    from: () => null, // handled ahead of the table — a tab has no kind prefix
  },
  flow: {
    slug: 'flow',
    to: v => ({ path: `flow/${v.flowId}` }),
    from: ([id]) => (id && FLOWS[id] ? { kind: 'flow', flowId: id } : null),
  },
  dx: {
    slug: 'dx',
    to: v => ({ path: `dx/${v.sign}/${v.tab}` }),
    from: ([sign, tab]) => {
      const ap = sign ? DX[sign] : undefined
      if (!ap) return null
      const key = tab && ap.tabs[tab] ? tab : 'history'
      return { kind: 'dx', sign, tab: key }
    },
  },
  disease: {
    slug: 'disease',
    to: v => ({ path: `disease/${v.id}`, ...(v.sp ? { query: { sp: v.sp.toLowerCase() } } : {}) }),
    from: ([id], q) => {
      if (!id || !DB.disease_page.some(d => d.id === id)) return null
      const sp = species(q.get('sp'))
      return { kind: 'disease', id, ...(sp ? { sp } : {}) }
    },
  },
  protocol: {
    slug: 'protocol',
    to: v => ({ path: `protocol/${v.id}` }),
    from: ([id]) => (id && DB.protocols.some(p => p.id === id) ? { kind: 'protocol', id } : null),
  },
  lesionLoc: {
    slug: 'lesion',
    to: v => ({ path: `lesion/${v.loc}${v.filter ? `/${v.filter}` : ''}` }),
    from: ([loc, filter]) => {
      const name = loc ? locNames.get(loc) : undefined
      if (!name) return null
      const f = filter === 'acute' || filter === 'chronic' ? filter : undefined
      return { kind: 'lesionLoc', loc, name, ...(f ? { filter: f } : {}) }
    },
  },
  subTypeDetail: {
    slug: 'subtype',
    to: v => ({ path: `subtype/${v.id}` }),
    from: ([id]) => (id && DB.lesion_type.some(l => l.id === id) ? { kind: 'subTypeDetail', id } : null),
  },
  diff: {
    slug: 'diff',
    to: v => ({ path: `diff/${v.id}` }),
    from: ([id]) => (id && DB.differentials.some(d => d.id === id) ? { kind: 'diff', id } : null),
  },
}

const BY_SLUG = new Map<string, Codec<ViewKind>>(
  Object.values(CODECS)
    .filter(c => c.slug !== '')
    .map(c => [c.slug, c as Codec<ViewKind>]),
)

// ── Encode ──────────────────────────────────────────────────────────────────

/** The URL for a View, relative to /app. */
export function encodeView(v: View): ViewUrl {
  const codec = CODECS[v.kind] as Codec<ViewKind>
  return codec.to(v as never)
}

/** `/app/disease/DIS-CARD-MVD?sp=cat` — what goes in the address bar. */
export function viewHref(v: View): string {
  const { path, query } = encodeView(v)
  const qs = query ? new URLSearchParams(query).toString() : ''
  return `/app/${path}${qs ? `?${qs}` : ''}`
}

// ── Decode ──────────────────────────────────────────────────────────────────

/** Parse the part of the URL after `/app/`. Returns null when the path names
 *  content that does not exist — a renamed disease, a hand-typed id — so the
 *  caller can fall back to the home tab rather than render a broken screen. */
export function decodeView(path: string, query: URLSearchParams = new URLSearchParams()): View | null {
  const seg = path.split('/').filter(Boolean).map(decodeURIComponent)
  if (seg.length === 0) return { kind: 'tab', tab: 0 }

  // `disease` is BOTH a tab slug and a kind slug, so the leading segment alone
  // is ambiguous: /app/disease is the Disease tab, /app/disease/DIS-HCM is one
  // disease page. Segment count disambiguates, which also gives the reading a
  // URL should have — a bare noun is the index, a noun plus an id is the item.
  const codec = BY_SLUG.get(seg[0])
  if (codec && seg.length > 1) return codec.from(seg.slice(1), query)

  const tab = TAB_SLUGS.indexOf(seg[0] as (typeof TAB_SLUGS)[number])
  if (tab >= 0) return { kind: 'tab', tab: tab as Tab }

  // A kind slug with nothing after it ("/app/flow") resolves to nothing.
  return codec ? codec.from(seg.slice(1), query) : null
}

/** Decode a whole URL (`/app/flow/redEye`, or an absolute one). */
export function decodeHref(href: string): View | null {
  const url = new URL(href, 'http://x')
  const path = url.pathname.replace(/^\/app\/?/, '')
  return decodeView(path, url.searchParams)
}
