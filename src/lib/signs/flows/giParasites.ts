// ── GI parasites hub — grouped by anatomical localisation ────────────────────
// A shared reference section: every generic "parasites" differential across the
// GI sign flows links here, and each tile opens the parasite's disease page.
// Viruses are intentionally NOT included (they live in the sign flows themselves).
import type { FlowPage } from '../flowTypes'

export const giParasitesFlow: FlowPage = {
  id: 'gi-parasites',
  title: 'GI Parasites — by location',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' GI PARASITES — by location', sub: 'The shared parasite reference behind every GI sign flow — grouped by where the parasite lives' },
    { kind: 'node', variant: 'step', text: 'WHERE DOES THE PARASITE LIVE?', sub: 'Localise first — the site decides which test is worth running' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Stomach / Oesophagus',
          tone: 'orange',
          tiles: [
            { label: 'Spirocerca lupi (oesophagus)', link: { to: 'disease', id: 'DIS-GI-SPIRO' } },
            { label: 'Physaloptera (dog)', link: { to: 'disease', id: 'DIS-GI-PHYSAL' } },
            { label: 'Ollulanus tricuspis (cat)', link: { to: 'disease', id: 'DIS-GI-OLLUL' } },
          ],
        },
        {
          cat: 'Small intestine',
          tone: 'teal',
          tiles: [
            { label: 'Roundworm (Toxocara / Toxascaris)', link: { to: 'disease', id: 'DIS-GI-ROUND' } },
            { label: 'Hookworm (Ancylostoma / Uncinaria)', link: { to: 'disease', id: 'DIS-GI-HOOK' } },
            { label: 'Giardia', link: { to: 'disease', id: 'DIS-GI-GIARDIA' } },
            { label: 'Coccidia (Cystoisospora)', link: { to: 'disease', id: 'DIS-GI-COCCI' } },
            { label: 'Cryptosporidium', link: { to: 'disease', id: 'DIS-GI-CRYPTO' } },
          ],
        },
        {
          cat: 'Large intestine',
          tone: 'violet',
          tiles: [
            { label: 'Whipworm (Trichuris)', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
            { label: 'Tritrichomonas foetus (cat)', link: { to: 'disease', id: 'DIS-GI-TRICHO' } },
            { label: 'Coccidia (Cystoisospora)', link: { to: 'disease', id: 'DIS-GI-COCCI' } },
          ],
        },
      ],
    },

    // Test selection is a lookup, so it is a table: the old paragraph hid four
    // parasite→test pairs inside one sentence.
    {
      kind: 'table',
      boxTone: 'info',
      gap: 12,
      title: ' WHICH TEST FOR WHICH PARASITE',
      cols: '38% 1fr',
      headers: ['Target', 'Test of choice'],
      rows: [
        ['Intestinal nematodes', 'Faecal centrifugal flotation ×3 — shedding is intermittent'],
        ['Giardia', 'Antigen ELISA / SNAP + zinc-sulphate flotation'],
        ['Tritrichomonas foetus', 'Faecal PCR'],
        ['Gastric / oesophageal worms', 'Frequently flotation-NEGATIVE — endoscopy, vomit examination, or an empirical anthelmintic trial'],
      ],
      footnote: 'Faecal test sensitivity is low, so empirical deworming is often justified before the results are back.',
    },
  ],
}
