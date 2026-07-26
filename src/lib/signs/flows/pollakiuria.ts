// ── Pollakiuria / Stranguria flowchart ───────────────────────────────────────
// Lower-urinary-tract signs (frequent small-volume voiding, straining, dysuria).
// First decision: is the bladder large and turgid (OBSTRUCTION — emergency) or
// not? Then localise anatomically (bladder lumen/wall vs urethra/outflow vs
// prostate) and, within each site, by pathophysiological category (Infection /
// Inflammatory / Metabolic / Mass) — mirroring the pale-MM category layout.
// The emergency arm routes to the DIS-URO-URETHRAL-OBS disease page (which links
// the ⚡ unblocking protocol internally) rather than jumping straight to it.
// Upper-tract stones (nephrolith / ureterolith → SUB) are cross-linked but kept
// distinct from the lower-tract urolithiasis differential.

import type { FlowPage } from '../flowTypes'

export const pollakiuriaFlow: FlowPage = {
  id: 'pollakiuria',
  title: 'Pollakiuria / Stranguria',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🚽 POLLAKIURIA / STRANGURIA' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>FIRST: is the bladder large, firm and non-expressible?</strong> A blocked male cat (or dog with urethral calculus) is a <strong>hyperkalaemic emergency</strong> — palpate the bladder, then ECG + potassium <em>before</em> anything else.',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'IS THE PATIENT OBSTRUCTED?',
      sub: 'Large turgid painful bladder + repeated unproductive straining = outflow obstruction until proven otherwise',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🚨 OBSTRUCTED — emergency',
          tone: 'danger',
          sub: 'Large turgid bladder · unproductive straining · collapse / bradycardia (hyperkalaemia)',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'URETHRAL PLUG (cat)', sublabel: 'Most common blocked-cat cause', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
                { label: 'URETHRAL UROLITH (dog / cat)', tone: 'warning', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
                { label: 'PROSTATIC / URETHRAL MASS', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
              ],
            },
          ],
        },
        {
          header: '🔵 NON-OBSTRUCTED — localise',
          tone: 'teal',
          sub: 'Small bladder · comfortable to express · frequent small voids ± haematuria',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'BLADDER vs URETHRA vs PROSTATE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  header: 'BLADDER LUMEN / WALL',
                  blocks: [
                    {
                      kind: 'categoryColumns',
                      cols: 1,
                      connectAfter: false,
                      columns: [
                        { cat: 'Infection', tiles: [{ label: 'Bacterial cystitis / UTI', sublabel: 'Most common canine cause', link: { to: 'disease', id: 'DIS-URO-UTI' } }] },
                        { cat: 'Inflammatory', tiles: [{ label: 'Feline idiopathic cystitis', sublabel: 'Most common feline cause', link: { to: 'disease', id: 'DIS-URO-FIC' } }] },
                        { cat: 'Metabolic / Endocrine', tiles: [{ label: 'Urolithiasis', sublabel: 'Lower-tract (cystoliths)', link: { to: 'disease', id: 'DIS-URO-UROLITH-STRUV' } }] },
                        { cat: 'Mass', tiles: [{ label: 'Urothelial carcinoma (TCC)', link: { to: 'disease', id: 'DIS-NEO-TCC' } }] },
                      ],
                    },
                  ],
                },
                {
                  header: 'URETHRA / PROSTATE (esp. male)',
                  blocks: [
                    {
                      kind: 'categoryColumns',
                      cols: 1,
                      connectAfter: false,
                      columns: [
                        { cat: 'Infection', tiles: [{ label: 'Bacterial prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } }] },
                        { cat: 'Metabolic / Endocrine', tiles: [{ label: 'Benign prostatic hyperplasia', link: { to: 'disease', id: 'DIS-URO-BPH' } }] },
                        { cat: 'Mass', tiles: [{ label: 'Prostatic carcinoma', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } }] },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'callout',
      tone: 'info',
      gap: 12,
      title: '🪨 Urolithiasis — where is the stone?',
      html: 'This flow covers <strong>lower-tract</strong> stones — <strong>cystoliths</strong> (bladder → pollakiuria, haematuria) and <strong>urethroliths</strong> (→ outflow obstruction, an emergency). <strong>Upper-tract</strong> stones present differently: a <strong>nephrolith</strong> is usually clinically silent (monitor, don’t reflexively remove), whereas an obstructing <strong>ureterolith</strong> causes azotaemia and PU/PD and needs SUB (subcutaneous ureteral bypass) placement rather than medical expulsion.',
    },

    {
      kind: 'diseaseGrid',
      title: 'RELATED — UPPER URINARY TRACT',
      links: [
        { label: 'Nephrolithiasis (renolith)', link: { to: 'disease', id: 'DIS-URO-NEPHROLITH' } },
        { label: 'Ureteral obstruction / ureterolith → SUB', link: { to: 'disease', id: 'DIS-URO-URETER-OBS' } },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Urethral obstruction</strong> — palpate a large turgid bladder; ECG + serum potassium FIRST; treat hyperkalaemia before sedation/decompression',
        { bold: 'Ascending pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' }, html: ' — LUTS + fever/azotaemia/PU-PD means the upper tract is involved' },
        { bold: 'Obstructing ureterolith', link: { to: 'disease', id: 'DIS-URO-URETER-OBS' }, html: ' — azotaemia/PU-PD rather than LUTS; moderate–severe obstruction needs SUB placement, not medical expulsion' },
        '<strong>Urothelial / prostatic carcinoma</strong> — older patient with persistent LUTS unresponsive to antibiotics; do NOT biopsy via the abdominal wall (seeding)',
        '<strong>Do not over-treat with antibiotics</strong> — most feline LUTS is sterile FIC (ISCAID: culture only with active sediment + signs)',
      ],
    },

  ],
}
