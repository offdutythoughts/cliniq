// ── Weakness / Collapse flowchart (data) ────────────────────────────────────
// Migration of the inline renderWeaknessFlow + renderEpisodicWeakness +
// renderPersistentWeakness + renderCollapseFlow functions in cliniqApp.ts (no
// HTML-string const — these flows were authored as inline render functions).
// The Dx views (renderDxWeakness*) are out of scope.
//
// Notes on escape-hatch html usage (flagged for the parent agent):
//  • The three sub-flow branch bodies use `.flow-endpoint.<anat>` colour classes
//    (pleural/larynx/bronchi/parench/mechanic/gi-upper/gi-secondary) which the
//    typed `endpoints` block cannot reproduce (it uses a `tone` with different
//    rgba alphas — 0.09/0.32 vs the anat classes' 0.12/0.4 — and different text
//    colours), so the branch bodies are kept as byte-identical `html`.
//  • Several endpoints link via `renderDiffDetail('D-WK###')`, for which there
//    is NO typed `Link` variant (the model has disease/protocol/lesion/flow/dx
//    only). Those onclicks are preserved verbatim inside the `html` blocks.
//    → links inside `html` are NOT validated by flows.test.ts.

import { forkHtml, type FlowPage } from '../flowTypes'
import { episodicTriageTable } from './episodicTriage'

// ── 1. Entry — Weakness / Collapse ──────────────────────────────────────────
const weaknessEntry: FlowPage = {
  id: 'weakness',
  title: 'Weakness / Collapse',
  blocks: [
    { kind: 'node', variant: 'entry', text: '⚡ WEAKNESS / COLLAPSE' },
    {
      kind: 'node', variant: 'step', text: 'STEP 1 — DEFINE THE PROBLEM',
      sub: 'What happens before, during and after the episode?',
    },
    {
      kind: 'choices',
      cols: 3,
      size: 10,
      items: [
        { variant: 'insp', label: 'EPISODIC weakness', link: { to: 'flow', id: 'weakness-episodic' } },
        { variant: 'exp', label: 'PERSISTENT weakness', link: { to: 'flow', id: 'weakness-persistent' } },
        { variant: 'mixed', label: 'COLLAPSE ± loss of<br>consciousness', link: { to: 'flow', id: 'weakness-collapse' } },
      ],
    },
    {
      kind: 'node', variant: 'step', text: 'STEP 2 — DEFINE THE SYSTEM',
      sub: 'Primary CNS/neuromuscular OR secondary (cardiovascular, metabolic, toxic)?',
    },
    {
      kind: 'compareBox',
      tone: 'info',
      cols: 2,
      cards: [
        {
          header: 'PRIMARY — structural CNS/NM',
          html: 'Asymmetrical deficits likely<br>Pain may be present<br>Spinal reflexes decreased<br>Sensory deficits (neuropathy)<br>CK markedly elevated (myopathy)',
        },
        {
          header: 'SECONDARY — functional',
          html: 'Symmetrical deficits<br>No pain from NM system<br>Abnormal biochemistry<br>Signs of other organ disease<br>Minimum database first',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      html: '⚠️ <b>Critical distinction:</b> Syncope (cardiac) vs Seizure (brain) — anti-epileptic drugs can WORSEN syncopal episodes. Always get ECG in collapse patient.',
    },
    {
      kind: 'banner',
      tone: 'info',
      html: 'Tap a presentation above to follow the diagnostic pathway',
    },
  ],
}

// ── 2. Episodic weakness ─────────────────────────────────────────────────────
const weaknessEpisodic: FlowPage = {
  id: 'weakness-episodic',
  title: 'Episodic weakness',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'EPISODIC WEAKNESS — normal between episodes' , sub: 'Weak in discrete episodes with a normal exam in between · often exercise- or excitement-triggered' },
    { kind: 'node', variant: 'step', text: 'Is it triggered by exercise / excitement?', connectAfter: false },
    {
      // Two-column branch with nested arrow-chains, anat-classed endpoints and
      // renderDiffDetail links — kept as byte-identical html (no typed home).
      kind: 'html',
      html: `${forkHtml(2, 8)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node insp" style="width:100%;font-size:10px;">YES — exercise/excitement triggered</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Check cardiac signs: arrhythmia, pulse deficits, murmur</div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:flex;flex-direction:column;gap:4px;width:100%;">
          <div class="flow-endpoint pleural" onclick="goLesionTab('LOC-WK-EPISODIC','Episodic weakness')" style="font-size:9px;">
            Cardiovascular causes
          </div>
          <div class="flow-endpoint gi-secondary" onclick="goLesionTab('LOC-WK-EPISODIC','Episodic weakness')" style="font-size:9px;">
            Metabolic causes
          </div>
          <div class="flow-endpoint larynx" onclick="renderDiffDetail('D-WK007')" style="font-size:9px;">
            Myasthenia gravis
          </div>
          <div class="flow-endpoint bronchi" onclick="renderDiffDetail('D-WK004')" style="font-size:9px;">
            Exercise-induced collapse (EIC)
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node exp" style="width:100%;font-size:10px;">With REGURGITATION present</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Always consider myasthenia gravis</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint larynx" onclick="renderDiffDetail('D-WK007')" style="width:100%;font-size:9px;">
          Myasthenia gravis
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:9px;">Chest radiograph: megaoesophagus?<br>Aspiration pneumonia?</div>
      </div>
    </div>

`,
    },
    {
      kind: 'infoBox',
      tone: 'slate',
      html: '<strong style="color:var(--white);">Minimum database for episodic weakness:</strong> Haematology + biochemistry (electrolytes, glucose) + ECG + blood pressure + urinalysis',
    },
  ],
}

// ── 3. Persistent weakness ───────────────────────────────────────────────────
const weaknessPersistent: FlowPage = {
  id: 'weakness-persistent',
  title: 'Persistent weakness',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'PERSISTENT WEAKNESS — continuously weak' , sub: 'Weak at every examination · define whether the limbs are flaccid (LMN) or stiff (UMN) before listing causes' },
    {
      kind: 'node',
      variant: 'step',
      text: 'NEUROLOGICAL EXAMINATION — flaccid or stiff?',
      connectAfter: false,
      // The two boxes below are name-only, so the exam findings that separate
      // them are stated here rather than under each box.
      subItems: [
        'FLACCID — ↓ reflexes, ↓ tone, atrophy',
        'STIFF — normal or ↑ tone, ± pain',
      ],
    },
    {
      // Two-column branch: nested YES/NO sub-grid + anat-classed lesion
      // endpoints — kept as byte-identical html.
      kind: 'html',
      html: `${forkHtml(2, 8)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node rest" style="width:100%;font-size:10px;">FLACCID paresis</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Ataxia present?</div>
        ${forkHtml(2, 4)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <div>
            <div style="font-size:9px;color:var(--amber-text);text-align:center;margin-bottom:2px;">YES — ataxia</div>
            <div class="flow-endpoint gi-secondary" onclick="goLesionTab('LOC-WK-PERSISTENT','Peripheral neuropathy')" style="font-size:9px;">
              Peripheral neuropathy
            </div>
          </div>
          <div>
            <div style="font-size:9px;color:var(--tone-green-fg);text-align:center;margin-bottom:2px;">NO — paresis only</div>
            <div class="flow-endpoint bronchi" onclick="goLesionTab('LOC-WK-PERSISTENT','Junctionopathy / Myopathy')" style="font-size:9px;">
              MG / Myopathy
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node mixed" style="width:100%;font-size:10px;">STIFF stilted gait</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">CK level?</div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:flex;flex-direction:column;gap:4px;width:100%;">
          <div class="flow-endpoint pleural" onclick="goLesionTab('LOC-WK-PERSISTENT','Myopathy')" style="font-size:9px;">
            CK markedly elevated →<br>Primary myopathy
          </div>
          <div class="flow-endpoint gi-upper" onclick="goLesionTab('LOC-WK-PERSISTENT','Endocrine weakness')" style="font-size:9px;">
            CK mildly elevated →<br>Endocrine / metabolic
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:10px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:9px 12px;font-size:10px;color:var(--gray);width:100%;">
      <b style="color:var(--amber-text);">Cat pearl:</b> Ventroflexion of neck = hypokalaemia until proven otherwise. Check K⁺ first.<br>
      <b style="color:var(--white);">CK interpretation:</b> &lt;1000 U/L = non-specific. Thousands-tens of thousands = likely primary myopathy.
    </div>`,
    },
  ],
}

// ── 4. Collapse / LOC ────────────────────────────────────────────────────────
const weaknessCollapse: FlowPage = {
  id: 'weakness-collapse',
  title: 'Collapse / LOC',
  blocks: [
    // The em-alert banner has no dedicated typed block — use callout with connectAfter:false
    // so the entry node below does NOT get a spurious connector arrow from the callout.
    { kind: 'callout', tone: 'danger', html: '⚠️ Collapse with loss of consciousness — always get ECG immediately', connectAfter: false },
    { kind: 'node', variant: 'entry', text: 'COLLAPSE ± LOSS OF CONSCIOUSNESS' },
    { kind: 'node', variant: 'step', text: 'KEY QUESTION: Syncope, Seizure, or other?' },
    // The seven-disorder split is authored once in ./episodicTriage and shared
    // with the seizures and syncope entries, so the three pages cannot drift.
    episodicTriageTable,
    {
      kind: 'choices',
      cols: 2,
      items: [
        { tone: 'danger', label: 'SYNCOPE', link: { to: 'flow', id: 'syncope' } },
        { tone: 'orange', label: 'SEIZURE', link: { to: 'flow', id: 'seizures' } },
        { tone: 'teal', label: 'VESTIBULAR EPISODE', link: { to: 'flow', id: 'vestibular' } },
        // No sign screen exists for these three yet — they read off the table above.
        { tone: 'violet', label: 'DYSKINESIA / PMD',},
        { tone: 'warning', label: 'NARCOLEPSY / CATAPLEXY',},
        { tone: 'info', label: 'REM SLEEP DISORDER',},
        { tone: 'lime', label: 'NEUROMUSCULAR COLLAPSE', link: { to: 'flow', id: 'weakness-episodic' } },
      ],
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      html: '⚠️ Status epilepticus (&gt;5 min): IV diazepam 0.5 mg/kg OR midazolam 0.2 mg/kg. Check blood glucose immediately. Do NOT give phenobarbitone IV rapidly — respiratory depression risk.',
    },
  ],
}

export const weaknessFlows: FlowPage[] = [
  weaknessEntry,
  weaknessEpisodic,
  weaknessPersistent,
  weaknessCollapse,
]
