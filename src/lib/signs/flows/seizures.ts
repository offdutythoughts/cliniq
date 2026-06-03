// ── Seizures flowchart (data) ───────────────────────────────────────────────
// Migration of renderSeizureFlow (inline in src/lib/cliniqApp.ts, ~line 3945)
// to the FlowPage model. Self-contained: one entry page, no sub-flows. The only
// onclicks are two goLesionTab lesion links (Idiopathic → LOC-SZ-INTRACRANIAL,
// Reactive → LOC-SZ-EXTRACRANIAL), a renderDxId('seizures') dx button and a
// renderProtoDetail('PROT-SEIZ') protocol card in the trailing card row. The Dx
// views (seizureDx*Html / renderDxSeizures*) are OUT of scope.
//
// Most of this page is bespoke multi-column card layouts that the current typed
// blocks cannot reproduce byte-for-byte, so they stay as escape-hatch `html`
// transcribed verbatim from the legacy:
//   • the 3-col Prodrome/Ictal/Postictal phase cards;
//   • the "Rule out mimics" reference box;
//   • the Focal/Generalised and 3-way Idiopathic/Structural/Reactive grids —
//     these use the `.flow-node insp/rest/mixed` pattern variants with a
//     `.fn-sub` subtitle holding multi-line text + coloured <strong> arrows.
//     The typed `choices` block instead renders its sublabel as a
//     <span> (font-size size-2px, opacity .8, font-weight 400) rather than a
//     `.fn-sub` div (10px gray) and forces the node font-weight to 700 — both
//     visible differences, and the opacity would dim the coloured arrows — so
//     these grids are kept as `html` (matching the diarrhoea/jaundice/paleGums
//     precedent for insp/rest/mixed + fn-sub headers);
//   • the 4-box interictal-exam grid + summary box;
//   • the 2-box Idiopathic breed-predisposition grid;
//   • the 8-box VITAMIN-D acronym grid (coloured letter boxes — see FLAG below);
//   • the 3-col Reactive (Metabolic/Toxins/Medications) cause lists;
//   • the trailing card row (Diagnostic Approach / SE Protocol) + the two info
//     boxes (Status epilepticus / maintenance AEDs), which the legacy authored
//     OUTSIDE .flow-wrap — reproduced here inside the wrap (full-width grids).
// The spine STEP headers and entry are typed `node` blocks; the connecting
// `.flow-arrow-v` between a typed node and the following `html` grid is included
// at the head of that html (with connectAfter:false on the node) to match the
// legacy. The footer uses the typed `disclaimer` block (renders outside .flow-wrap).
//
// ⚠️ FLAG — links inside `html` are NOT validated by the link-integrity test:
//   • goLesionTab('LOC-SZ-INTRACRANIAL','Intracranial')  (Idiopathic box)
//   • goLesionTab('LOC-SZ-EXTRACRANIAL','Extracranial')  (Reactive box)
//   • renderDxId('seizures')           (Diagnostic Approach card → dx id 'seizures')
//   • renderProtoDetail('PROT-SEIZ')                      (SE Protocol card)
// All four targets exist in cliniqApp.ts.
//
// ⚠️ FLAG — NEW BLOCK that would help: the VITAMIN-D acronym grid (an N-box
// grid where each box is a coloured letter-boxed mnemonic: a large first letter
// + the rest of the word, with a small caption beneath) has no typed equivalent.
// A `mnemonicGrid` block — { cols, boxes: { letter, word, tone, caption(html) }[] }
// — would replace this html and also serve other VITAMIN-D/DAMNIT-V mnemonic
// pages across the app. Legacy snippet of one box:
//   <div style="background:rgba(220,38,38,0.12);border:1.5px solid rgba(220,38,38,0.4);
//        border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;
//        font-weight:600;color:#FCA5A5;line-height:1.3;">
//     <span style="font-size:13px;">V</span>ascular
//     <div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">
//       CVA / stroke<br>Peracute, non-progressive<br>Cats: ischaemic</div>
//   </div>

import type { FlowPage } from '../flowTypes'

export const seizuresFlow: FlowPage = {
  id: 'seizures',
  title: 'Seizures',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🧠 SEIZURES' },

    // Seizure phases — 3-col Prodrome / Ictal / Postictal cards
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <!-- Seizure phases -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%;">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 8px;font-size:9px;color:var(--gray);line-height:1.5;text-align:center;">
        <strong style="color:#C4B5FD;font-size:10px;">Prodrome</strong><br>Hours–days before<br>Restlessness · anxiety<br>Hiding · attention-seeking<br><em>Not always present</em>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 8px;font-size:9px;color:var(--gray);line-height:1.5;text-align:center;">
        <strong style="color:#FCD34D;font-size:10px;">Ictal</strong><br>Active seizure<br>Tonic-clonic · tonic · atonic<br>Autonomic signs<br>Focal or generalised
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 8px;font-size:9px;color:var(--gray);line-height:1.5;text-align:center;">
        <strong style="color:#6EE7B7;font-size:10px;">Postictal</strong><br>After seizure ends<br>Disorientation · blindness<br>Ataxia · hypersalivation<br>Minutes to hours
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // CONFIRM EPILEPTIC SEIZURE — step (font-size:11px) + rule-out-mimics box.
    // The step keeps its legacy 11px so it stays html (the typed `node` step
    // renders at the default 12px). Trailing arrow → CHARACTERISE.
    {
      kind: 'html',
      html: `<div class="flow-node step" style="font-size:11px;">CONFIRM EPILEPTIC SEIZURE</div>
    <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:9px;color:var(--gray);line-height:1.6;width:100%;box-sizing:border-box;margin-top:5px;">
      <strong style="color:var(--white);">Rule out mimics:</strong><br>
      <strong>Syncope</strong> — sudden onset, brief, rapid full recovery; triggered by exertion or Valsalva; no tonic-clonic, no postictal<br>
      <strong>Vestibular episode</strong> — head tilt, rolling, nystagmus; consciousness preserved; no tonic-clonic<br>
      <strong>Dyskinesia / paroxysmal movement disorder</strong> — dystonia, no loss of consciousness, breed-specific (Cavalier, Scottish Terrier, Labrador)<br>
      <strong>Narcolepsy / cataplexy</strong> — sudden loss of muscle tone triggered by excitement; rapid recovery; Dobermann, Labrador<br>
      <strong>REM sleep disorder</strong> — occurs during sleep, stops when woken; often mistaken for seizures<br>
      <strong>Neuromuscular collapse</strong> — exercise-induced; Labrador, Border Collie; no loss of consciousness
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // CHARACTERISE SEIZURE TYPE — step + Focal/Generalised grid
    { kind: 'node', variant: 'step', text: 'CHARACTERISE SEIZURE TYPE', connectAfter: false },
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
      <div class="flow-node insp" style="font-size:11px;">
        Focal<div class="fn-sub">One body region / side<br>Facial twitching · lip smacking<br>Fly-catching · limb jerking<br>Consciousness may be preserved<br>May secondarily generalise<br><strong style="color:#93C5FD;">→ Strongly favours structural</strong></div>
      </div>
      <div class="flow-node rest" style="font-size:11px;">
        Generalised<div class="fn-sub">Both sides simultaneously<br>Tonic-clonic · tonic · atonic<br>Loss of consciousness<br>Urination · defaecation<br><strong style="color:var(--amber-text);">→ Any category possible</strong></div>
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // INTERICTAL NEUROLOGICAL EXAMINATION — step + 4 exam boxes + summary box
    { kind: 'node', variant: 'step', text: 'INTERICTAL NEUROLOGICAL EXAMINATION', connectAfter: false },
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;margin-bottom:6px;">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:10px;color:var(--gray);line-height:1.5;">
        <strong style="color:var(--white);">Mentation</strong><br>
        Alert / obtunded / stuporous?<br>
        Head pressing? Compulsive circling?<br>
        Personality / behaviour change?
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:10px;color:var(--gray);line-height:1.5;">
        <strong style="color:var(--white);">Postural reactions</strong><br>
        CP positioning · Hopping<br>
        Hemi-walking · Wheelbarrowing<br>
        <strong>Asymmetry = lateralising sign</strong>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:10px;color:var(--gray);line-height:1.5;">
        <strong style="color:var(--white);">Cranial nerves</strong><br>
        Menace (II, VII) · PLR (II, III)<br>
        Facial symmetry (VII) · Jaw tone (V)<br>
        Fixed dilated pupil = herniation ⚠️
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:10px;color:var(--gray);line-height:1.5;">
        <strong style="color:var(--white);">Gait + Fundoscopy</strong><br>
        Ataxia · Paresis · Head tilt?<br>
        Circling (ipsilateral to lesion)<br>
        Papilloedema = ↑ ICP
      </div>
    </div>
    <div style="margin-top:5px;background:rgba(37,99,235,0.1);border:1px solid rgba(37,99,235,0.25);border-radius:10px;padding:8px 10px;font-size:9.5px;color:#93C5FD;line-height:1.5;">
      <strong>Normal interictal exam</strong> → idiopathic epilepsy possible (if 6mo–6yr and normal bloods)<br>
      <strong>Abnormal interictal exam</strong> → structural disease until proven otherwise — proceed to MRI
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // CLASSIFY AETIOLOGY — step + 3-way Idiopathic/Structural/Reactive grid
    { kind: 'node', variant: 'step', text: 'CLASSIFY AETIOLOGY', connectAfter: false },
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">
      <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-SZ-INTRACRANIAL','Intracranial')">
        Idiopathic<div class="fn-sub">Onset 6mo–6yr<br>Normal bloods<br>Normal interictal exam<br>Usually generalised<br>Breed predisposed↓</div>
      </div>
      <div class="flow-node rest" style="font-size:11px;cursor:default;">
        Structural<div class="fn-sub">&lt;6mo or &gt;6yr<br>Abnormal interictal exam<br>Focal onset / signs<br>Progressive course<br>VITAMIN D↓</div>
      </div>
      <div class="flow-node mixed" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-SZ-EXTRACRANIAL','Extracranial')">
        Reactive<div class="fn-sub">Abnormal bloods<br>Metabolic / toxic cause<br>Any age<br>⚠️ High SE risk<br>Causes↓</div>
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // IDIOPATHIC — BREED PREDISPOSITIONS — coloured step + 2-box grid
    {
      kind: 'html',
      html: `<div class="flow-node step" style="background:#1E40AF;font-size:11px;">IDIOPATHIC — BREED PREDISPOSITIONS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%;margin-top:5px;">
      <div style="background:rgba(37,99,235,0.1);border:1px solid rgba(37,99,235,0.25);border-radius:10px;padding:8px 9px;font-size:8.5px;color:var(--gray);line-height:1.6;">
        <strong style="color:#93C5FD;">🐕 Dog (genetic epilepsy)</strong><br>
        Border Collie · Labrador · GSD<br>
        Golden Retriever · Belgian Shepherd<br>
        Beagle · Keeshond · Vizsla<br>
        Finnish Spitz · Irish Setter
      </div>
      <div style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);border-radius:10px;padding:8px 9px;font-size:8.5px;color:var(--gray);line-height:1.6;">
        <strong style="color:#C4B5FD;">⚠️ Structural mimics</strong><br>
        <strong>MUO:</strong> Pug · Yorkie · Maltese<br>
        · Chihuahua · French Bulldog<br>
        <strong>Glioma:</strong> brachycephalics (&gt;5yr)<br>
        <strong>Meningioma:</strong> dolichocephalics<br>
        <strong>PSS reactive:</strong> toy breeds &lt;1yr
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // STRUCTURAL — VITAMIN D — coloured step + 8-box acronym grid (FLAG above)
    {
      kind: 'html',
      html: `<div class="flow-node step" style="background:#D97706;font-size:11px;">STRUCTURAL — VITAMIN D</div>
    <div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:5px;width:100%;">
      <div style="background:rgba(220,38,38,0.12);border:1.5px solid rgba(220,38,38,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#FCA5A5;line-height:1.3;">
        <span style="font-size:13px;">V</span>ascular<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">CVA / stroke<br>Peracute, non-progressive<br>Cats: ischaemic</div>
      </div>
      <div style="background:rgba(249,115,22,0.12);border:1.5px solid rgba(249,115,22,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#FED7AA;line-height:1.3;">
        <span style="font-size:13px;">I</span>nflammatory<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">MUO / GME<br>Encephalitis<br>Multifocal, progressive</div>
      </div>
      <div style="background:rgba(220,38,38,0.12);border:1.5px solid rgba(220,38,38,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#FCA5A5;line-height:1.3;">
        <span style="font-size:13px;">T</span>raumatic<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">Head trauma<br>History of injury<br>RTA, falls</div>
      </div>
      <div style="background:rgba(37,99,235,0.12);border:1.5px solid rgba(37,99,235,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#93C5FD;line-height:1.3;">
        <span style="font-size:13px;">A</span>nomalous<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">Hydrocephalus<br>Lissencephaly<br>&lt;1yr, toy/brachy breeds</div>
      </div>
    </div>
    <div style="height:5px;"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:5px;width:100%;">
      <div style="background:rgba(217,119,6,0.12);border:1.5px solid rgba(217,119,6,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:var(--amber-text);line-height:1.3;">
        <span style="font-size:13px;">M</span>etabolic<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">Storage diseases<br>NCL (inborn errors)<br>Breed-specific</div>
      </div>
      <div style="background:rgba(37,99,235,0.12);border:1.5px solid rgba(37,99,235,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#93C5FD;line-height:1.3;">
        <span style="font-size:13px;">I</span>diopathic<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">No cause found<br>Dx of exclusion<br>Normal MRI + CSF</div>
      </div>
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#DDD6FE;line-height:1.3;">
        <span style="font-size:13px;">N</span>eoplastic<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">Meningioma · Glioma<br>Lymphoma · Met.<br>Older animals</div>
      </div>
      <div style="background:rgba(100,116,139,0.12);border:1.5px solid rgba(100,116,139,0.4);border-radius:10px;padding:7px 5px;text-align:center;font-size:10px;font-weight:600;color:#CBD5E1;line-height:1.3;">
        <span style="font-size:13px;">D</span>egenerative<div style="font-weight:400;font-size:8px;margin-top:3px;opacity:.8;">Neuronal degen.<br>NCL / lysosomal<br>Breed-specific</div>
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // REACTIVE CAUSES — coloured step + 3-col Metabolic/Toxins/Medications lists
    {
      kind: 'html',
      html: `<div class="flow-node step" style="background:#059669;font-size:11px;">REACTIVE CAUSES — METABOLIC &amp; TOXIC</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%;margin-top:5px;">
      <div style="background:rgba(5,150,105,0.1);border:1px solid rgba(5,150,105,0.3);border-radius:10px;padding:8px 9px;font-size:8.5px;color:var(--gray);line-height:1.6;">
        <strong style="color:#6EE7B7;">Metabolic</strong><br>
        Hypoglycaemia (insulinoma, PSS,<br>Addison's, toy breed pup)<br>
        Hepatic encephalopathy (PSS)<br>
        Hypocalcaemia (eclampsia)<br>
        Hyponatraemia / Hypernatraemia<br>
        Uraemic encephalopathy<br>
        Polycythaemia (↑ viscosity)<br>
        Hypertensive encephalopathy<br>
        Hyperthyroidism (cats — rare)
      </div>
      <div style="background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:10px;padding:8px 9px;font-size:8.5px;color:var(--gray);line-height:1.6;">
        <strong style="color:#FCA5A5;">Toxins</strong><br>
        Organophosphates / carbamates<br>
        Bromethalin rodenticide<br>
        Metaldehyde (slug bait)<br>
        Ethylene glycol (antifreeze)<br>
        Mycotoxins (mouldy food)<br>
        Lead (young dogs)<br>
        Methylxanthines (chocolate)<br>
        Strychnine<br>
        Ivermectin (MDR1 dogs)
      </div>
      <div style="background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.2);border-radius:10px;padding:8px 9px;font-size:8.5px;color:var(--gray);line-height:1.6;">
        <strong style="color:var(--amber-text);">Medications</strong><br>
        5-FU cream (cats — any trace)<br>
        SSRIs / SNRIs<br>
        Metronidazole (esp. cats)<br>
        Tramadol (cats)<br>
        Fluoroquinolones (cats)<br>
        Lidocaine (cats)<br>
        Pyrethrins / pyrethroids (cats)<br>
        Amphetamines / stimulants<br>
        <strong>AED withdrawal</strong> → SE risk
      </div>
    </div>`,
    },

    // Trailing card row + info boxes. The legacy authored these OUTSIDE
    // .flow-wrap (block-level, full container width). Here they render INSIDE
    // the wrap, whose `align-items:center` would otherwise shrink the plain
    // info-box divs to content width — so they are nested in a `width:100%`
    // wrapper to reproduce the legacy full-width layout. (DOM differs by one
    // wrapper div; visible result is identical.)
    {
      kind: 'html',
      connectAfter: false,
      html: `<div style="width:100%;"><div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
    <div class="card" onclick="renderDxId('seizures')"><div class="card-row"><div class="card-icon">🔬</div><div style="flex:1"><div class="card-title">Diagnostic Approach</div><div class="card-sub">History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
    <div class="card" onclick="renderProtoDetail('PROT-SEIZ')"><div class="card-row"><div class="card-icon">🚨</div><div style="flex:1"><div class="card-title">SE Protocol</div><div class="card-sub">Diazepam → LEV → PB → Propofol</div></div><div class="card-arrow">›</div></div></div>
  </div>

  <div style="margin-top:8px;padding:10px 14px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:12px;">
    <div style="font-size:11px;font-weight:600;color:#F87171;">⚠️ Status epilepticus (&gt;5 min) — treat immediately</div>
    <div style="font-size:10px;color:#FCA5A5;line-height:1.7;margin-top:4px;">
      <strong>1st:</strong> Diazepam 0.5 mg/kg IV (×3, q5min) OR Midazolam 0.2–0.3 mg/kg IM/intranasal<br>
      <strong>2nd:</strong> Levetiracetam 20–60 mg/kg IV over 5–15 min OR Phenobarbital 2–5 mg/kg IV (max 24 mg/kg/24h)<br>
      <strong>3rd:</strong> Propofol 1–3 mg/kg IV → CRI 0.1–0.6 mg/kg/min + intubation<br>
      Check BG immediately — dextrose IV if &lt;3.5 mmol/L
    </div>
  </div>
  <div style="margin-top:6px;padding:8px 14px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.2);border-radius:12px;">
    <div style="font-size:10px;font-weight:600;color:#93C5FD;">💊 When to start maintenance AEDs</div>
    <div style="font-size:9.5px;color:#BFDBFE;line-height:1.6;margin-top:3px;">
      Cluster (≥2/24h) · SE occurred · &gt;1 seizure/6 months · Progressive or focal signs · Structural disease confirmed<br>
      <strong>PB</strong> 2–3 mg/kg q12h PO · <strong>KBr</strong> 30–40 mg/kg q24h PO (dogs only ⚠️) · <strong>LEV</strong> 20–30 mg/kg q8h PO
    </div>
  </div></div>`,
    },

    { kind: 'disclaimer' },
  ],
}

export const seizuresFlows: FlowPage[] = [seizuresFlow]
