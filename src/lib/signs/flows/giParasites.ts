// ── GI parasites hub — grouped by anatomical localisation ────────────────────
// A shared reference section: every generic "parasites" differential across the
// GI sign flows links here, and each tile opens the parasite's disease page.
// Viruses are intentionally NOT included (they live in the sign flows themselves).
import type { FlowPage } from '../flowTypes'

export const giParasitesFlow: FlowPage = {
  id: 'gi-parasites',
  title: 'GI Parasites — by location',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' GI PARASITES — by location' },
    {
      kind: 'callout',
      tone: 'info',
      html: ' <strong>Localise, then test appropriately.</strong> Faecal centrifugal flotation ×3 (intermittent shedding) is the mainstay for intestinal nematodes • Giardia needs antigen ELISA/SNAP + zinc-sulphate flotation • Tritrichomonas needs faecal PCR • gastric/oesophageal worms (Physaloptera, Ollulanus, Spirocerca) are frequently flotation-negative — reach for endoscopy, vomit examination, or an empirical anthelmintic trial. Empirical deworming is often justified given low test sensitivity.',
    },
    { kind: 'node', variant: 'step', text: 'WHERE DOES THE PARASITE LIVE?' },
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
  ],
}
