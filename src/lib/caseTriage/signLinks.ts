// ── Case Triage: presenting problems → clinical-sign flowcharts ────────────
// Pure lookup — which sign flowchart (Tab 0) each presenting problem opens.
// Matching is deliberately strict: a problem links only when it NAMES the
// sign (the card title or one of its "A / B" alternates, plural/-ing folded),
// or is an abbreviation the sign lists verbatim (PU/PD). The registry's
// keyword lists are search aids and far broader — "lethargy" is a Weakness
// keyword, but lethargy is not weakness, and sending a clinician to the wrong
// flowchart is worse than saying none exists yet.

import { FLOW_SIGNS } from '../signs/registry'

export type SignLink = { term: string; flowId: string | null; title: string | null }

const words = (s: string): string[] =>
  s.toLowerCase()
    .replace(/ae/g, 'e').replace(/oe/g, 'e')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map(w => (w.length > 4 ? w.replace(/(ing|s)$/, '') : w))

// Each flow sign's names, as word lists: the title's alternates and the id.
const NAMES = FLOW_SIGNS.map(sign => ({
  sign,
  names: [...sign.title.split('/'), sign.id.replace(/-/g, ' ')].map(words).filter(ws => ws.length > 0),
  abbreviations: (sign.keywords ?? []).filter(k => /[A-Z]/.test(k) && !/[a-z]/.test(k)),
}))

export function signLink(term: string): SignLink {
  const have = new Set(words(term))
  const hit = NAMES.find(({ names, abbreviations }) =>
    abbreviations.includes(term.trim().toUpperCase())
    || names.some(ws => ws.every(w => have.has(w))))
  return hit
    ? { term, flowId: hit.sign.flowId, title: hit.sign.title }
    : { term, flowId: null, title: null }
}

export function signLinks(terms: string[]): SignLink[] {
  return terms.map(signLink)
}
