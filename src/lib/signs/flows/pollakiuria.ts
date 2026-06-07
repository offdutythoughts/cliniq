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
                { icon: '🐈', label: 'URETHRAL OBSTRUCTION / PLUG', sublabel: 'Blocked cat · urolith · plug · stricture — treat K⁺ then decompress', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
                { icon: '⚙️', label: 'PROSTATIC / URETHRAL MASS', sublabel: 'Older dog · TCC or prostatic carcinoma at the trigone/urethra', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
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
                        { icon: '🦠', label: 'BACTERIAL CYSTITIS / UTI', sublabel: 'Commonest in dogs · ISCAID; uncommon in young cats', tone: 'orange', link: { to: 'disease', id: 'DIS-URO-UTI' } },
                        { icon: '😿', label: 'FELINE IDIOPATHIC CYSTITIS', sublabel: 'Commonest cause of feline LUTS · Pandora / MEMO', tone: 'teal', link: { to: 'disease', id: 'DIS-URO-FIC' } },
                        { icon: '🪨', label: 'UROLITHIASIS', sublabel: 'Struvite · oxalate · urate · cystine', tone: 'info', link: { to: 'disease', id: 'DIS-URO-UROLITH-STRUV' } },
                        { icon: '🧬', label: 'UROTHELIAL CARCINOMA (TCC)', sublabel: 'Older dog · trigone · BRAF', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
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
                        { icon: '🔴', label: 'BACTERIAL PROSTATITIS', sublabel: 'Entire male · fever · painful DRE', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
                        { icon: '⚙️', label: 'BENIGN PROSTATIC HYPERPLASIA', sublabel: 'Older entire male · symmetric · bloody drip', tone: 'neutral', link: { to: 'disease', id: 'DIS-URO-BPH' } },
                        { icon: '🧬', label: 'PROSTATIC CARCINOMA', sublabel: 'Intact OR neutered · fixed · sublumbar LN', tone: 'violet', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
                        { icon: '🪨', label: 'URETHRAL UROLITH', sublabel: 'Lodges at os penis (dog) — obstruction risk', tone: 'warning', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
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
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong>Urethral obstruction</strong> — palpate a large turgid bladder; ECG + serum potassium FIRST; treat hyperkalaemia before sedation/decompression',
        '<strong onclick="renderDiseasePage(\'DIS-URO-PYELO\')" style="cursor:pointer;text-decoration:underline;">Ascending pyelonephritis</strong> — LUTS + fever/azotaemia/PU-PD means the upper tract is involved',
        '<strong>Urothelial / prostatic carcinoma</strong> — older patient with persistent LUTS unresponsive to antibiotics; do NOT biopsy via the abdominal wall (seeding)',
        '<strong>Do not over-treat with antibiotics</strong> — most feline LUTS is sterile FIC (ISCAID: culture only with active sediment + signs)',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'pollakiuria' } },
        { label: '🩸 Haematuria — localisation flowchart', link: { to: 'flow', id: 'haematuria' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Urethral obstruction / feline plug', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
        { label: 'Bacterial cystitis / UTI (ISCAID)', link: { to: 'disease', id: 'DIS-URO-UTI' } },
        { label: 'Feline idiopathic cystitis', link: { to: 'disease', id: 'DIS-URO-FIC' } },
        { label: 'Struvite urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-STRUV' } },
        { label: 'Calcium oxalate urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-OXAL' } },
        { label: 'Urate urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-URATE' } },
        { label: 'Cystine urolithiasis', link: { to: 'disease', id: 'DIS-URO-UROLITH-CYST' } },
        { label: 'Bacterial prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
        { label: 'Benign prostatic hyperplasia', link: { to: 'disease', id: 'DIS-URO-BPH' } },
        { label: 'Prostatic carcinoma', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
        { label: 'Urothelial carcinoma (TCC)', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
        { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
      ],
    },
  ],
}
