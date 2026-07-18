// ── Pollakiuria / Stranguria flowchart ───────────────────────────────────────
// Lower-urinary-tract signs (frequent small-volume voiding, straining, dysuria).
// First decision: is the bladder large and turgid (OBSTRUCTION — emergency) or
// not? Then localise: bladder lumen/wall vs urethra/outflow vs prostate (male).
// Links into the LUT disease pages (DIS-URO-*) and the haematuria flow.

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
                { label: 'URETHRAL OBSTRUCTION / PLUG', tone: 'danger', link: { to: 'protocol', id: 'PROT-URO-OBS' } },
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
                      kind: 'endpoints',
                      items: [
                        { label: 'BACTERIAL CYSTITIS / UTI', sublabel: 'Most common canine cause', tone: 'orange', link: { to: 'disease', id: 'DIS-URO-UTI' } },
                        { label: 'FELINE IDIOPATHIC CYSTITIS', sublabel: 'Most common feline cause', tone: 'teal', link: { to: 'disease', id: 'DIS-URO-FIC' } },
                        { label: 'UROLITHIASIS', tone: 'info', link: { to: 'disease', id: 'DIS-URO-UROLITH-STRUV' } },
                        { label: 'UROTHELIAL CARCINOMA (TCC)', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
                      ],
                    },
                  ],
                },
                {
                  header: 'URETHRA / PROSTATE (esp. male)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { label: 'BACTERIAL PROSTATITIS', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
                        { label: 'BENIGN PROSTATIC HYPERPLASIA', tone: 'neutral', link: { to: 'disease', id: 'DIS-URO-BPH' } },
                        { label: 'PROSTATIC CARCINOMA', tone: 'violet', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
                        { label: 'URETHRAL UROLITH', tone: 'warning', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
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
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Urethral obstruction</strong> — palpate a large turgid bladder; ECG + serum potassium FIRST; treat hyperkalaemia before sedation/decompression',
        { bold: 'Ascending pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' }, html: ' — LUTS + fever/azotaemia/PU-PD means the upper tract is involved' },
        '<strong>Urothelial / prostatic carcinoma</strong> — older patient with persistent LUTS unresponsive to antibiotics; do NOT biopsy via the abdominal wall (seeding)',
        '<strong>Do not over-treat with antibiotics</strong> — most feline LUTS is sterile FIC (ISCAID: culture only with active sediment + signs)',
      ],
    },

  ],
}
