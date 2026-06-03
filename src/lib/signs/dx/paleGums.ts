// ── Pale Mucous Membranes — diagnostic approach (data) ───────────────────────
// Migration of the renderDxPaleGums{History,Exam,Dx}() inline views (legacy HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const paleGumsDx: DxApproach = {
  title: 'Pale MM',
  tabs: {

  history: {
    title: 'History: Pale MM',
    blocks: [
      { kind: 'branch', text: 'ANAEMIA vs POOR PERFUSION — AND IS IT ACUTE?' },
      {
        kind: 'check',
        html: `Pale mucous membranes = either <strong>anaemia</strong> (too few red cells) or <strong>poor perfusion</strong> (shock/vasoconstriction). The history starts to separate them and flags emergencies (acute haemorrhage, haemolytic crisis, shock).`,
      },
      { kind: 'step', text: '📋 ONSET, BLEEDING & PIGMENTURIA' },
      {
        kind: 'check',
        html: `<strong>Acute collapse</strong> → haemorrhage (trauma, splenic mass rupture), haemolytic crisis, or shock.<br>
      <strong>Evidence of blood loss</strong>: melena, haematochezia, haematuria, epistaxis, trauma, recent surgery.<br>
      <strong>Red–brown urine</strong> (haemoglobinuria) + pallor → intravascular haemolysis.<br>
      <strong>Chronic, gradual</strong> → CKD (renal anaemia), chronic disease, marrow disease, occult bleeding.`,
      },
      { kind: 'step', alt: true, text: '💊 TOXIN / DRUG / INFECTIOUS / SIGNALMENT' },
      {
        kind: 'check',
        html: `<strong>Oxidant access</strong>: onion/garlic (Allium), zinc (coins/hardware), paracetamol (cat) → Heinz-body haemolysis.<br>
      <strong>Rodenticide access</strong> → haemorrhage. <strong>NSAIDs/steroids</strong> → GI ulceration/bleeding.<br>
      <strong>Tick exposure / travel</strong> → Babesia, Mycoplasma, Cytauxzoon, Ehrlichia.<br>
      <strong>FeLV/FIV status (cat)</strong> → marrow suppression. Young, acute → consider IMHA (predisposed breeds: Cocker, Springer).`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> White/grey gums + weak pulses + tachycardia = shock — resuscitate now; the workup follows stabilisation.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Pale MM',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — PERFUSION PARAMETERS' },
      {
        kind: 'check',
        html: `Assess <strong>MM colour, CRT, heart rate, pulse quality, extremity temperature, mentation</strong>.<br>
      <strong>Anaemia</strong>: pale but with a normal/bounding pulse and normal CRT (unless concurrent shock).<br>
      <strong>Hypoperfusion/shock</strong>: pale + prolonged CRT + weak pulses + tachycardia (dog) — or <strong>bradycardia + hypothermia in a cat</strong> (decompensated).`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 2 — SOURCE-HUNTING EXAM' },
      {
        kind: 'check',
        html: `<strong>Icterus</strong> (with pallor) → haemolysis. <strong>Petechiae/ecchymoses</strong> → thrombocytopenia/coagulopathy.<br>
      <strong>Abdominal distension / fluid wave</strong> → haemoabdomen (splenic mass). <strong>Rectal exam</strong> for melena.<br>
      <strong>Muffled heart + jugular distension</strong> → pericardial effusion. <strong>Murmur/arrhythmia</strong> → cardiogenic.<br>
      A haemic murmur may appear with severe anaemia.`,
      },
      { kind: 'step', alt: true, text: '⚡ STEP 3 — DECIDE THE PATH' },
      {
        kind: 'check',
        html: `Pale + signs of blood loss/icterus/petechiae → anaemia path (PCV/TS, smear, reticulocytes). Pale + shock parameters with normal PCV → perfusion path (lactate, BP, FAST, ECG). The Diagnostics tab branches on PCV.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Pale MM — Diagnostics',
    blocks: [
      { kind: 'step', text: 'PALE MUCOUS MEMBRANES — DIAGNOSTIC APPROACH' },
      { kind: 'step', alt: true, text: 'PCV/TS + CRT + HR + pulse quality' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;"><strong>PCV LOW</strong><br><span style="font-size:9px;">= Anaemia → check TS + reticulocytes</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-row c2">
          <div class="dx-dx" style="font-size:9px;">TS normal/↑<br>= <strong>Haemolysis</strong></div>
          <div class="dx-dx" style="font-size:9px;">TS low<br>= <strong>Haemorrhage</strong></div>
        </div>
        <div class="dx-arrow">↓</div>
        <div class="dx-branch" style="width:100%;font-size:10px;">REGENERATIVE?</div>
        <div class="dx-note" style="width:100%;font-size:9px;">Regeneration can lag 3–5 d → recheck reticulocytes. Regen &gt; 60–80 ×10⁹/L.</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Smear:</strong> spherocytes (IMHA — reliable in DOGS, unreliable in cats), Heinz bodies + eccentrocytes (oxidative), schistocytes (DIC/microangiopathy), parasites (Babesia, Mycoplasma, Cytauxzoon).</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;cursor:pointer;" onclick="renderDiseasePage('DIS-BD-IMHA')">Persistent saline auto-agglutination (1:4 washed) → <strong>IMHA</strong> · else Coombs/flow</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;cursor:pointer;" onclick="renderDiseasePage('DIS-TOX-ZN')">Metallic FB on radiograph → <strong>Zinc toxicosis</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;cursor:pointer;" onclick="renderDiseasePage('DIS-TOX-ALLIUM')">Eccentrocytes + Allium history → <strong>Onion/garlic toxicosis</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;cursor:pointer;" onclick="renderDiseasePage('DIS-TOX-APAP')">Brown blood + muddy MM (esp. cat) → <strong>Paracetamol</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;cursor:pointer;" onclick="renderDxId('bleeding')">Blood-loss anaemia → find the bleed (<strong>bleeding workup</strong>)</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">No regen after 5 d → <strong>Bone marrow disease</strong> · cat FeLV/FIV</div>
      </div>
      <div class="dx-col">
        <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">PCV NORMAL<br><span style="font-weight:400;font-size:9px;">= Poor perfusion</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Assess:</strong> CRT, pulse quality, HR, BP, lactate, temperature</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Weak pulses + tachycardia → <strong>Hypovolaemic shock</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Muffled heart + JVD → <strong>Pericardial effusion</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Arrhythmia → <strong>Cardiogenic shock</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Hyperdynamic → decompensated → <strong>Sepsis/SIRS</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Cat: bradycardia + hypothermia = decompensated</div>
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ IMHA triad:</strong> anaemia + haemolysis + an immune marker. True agglutination persisting after saline wash is diagnostic (no Coombs needed). Thromboembolism — not the anaemia — kills many dogs: start clopidogrel unless platelets &lt; 30 ×10⁹/L. Never give azathioprine to cats.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ Transfusion:</strong> Dog PCV &lt; 20% · Cat PCV &lt; 15% — or clinical signs (tachycardia, weakness) at higher PCVs. Blood-type cats before any transfusion.`,
      },
      {
        kind: 'diseaseGrid',
        title: '📋 LINKED DISEASE PAGES',
        links: [
          { label: 'Immune-mediated haemolytic anaemia', link: { to: 'disease', id: 'DIS-BD-IMHA' } },
          { label: 'Immune-mediated neutropenia', link: { to: 'disease', id: 'DIS-IMNP' } },
          { label: 'Zinc toxicosis', link: { to: 'disease', id: 'DIS-TOX-ZN' } },
          { label: 'Allium (onion/garlic) toxicosis', link: { to: 'disease', id: 'DIS-TOX-ALLIUM' } },
          { label: 'Paracetamol toxicosis', link: { to: 'disease', id: 'DIS-TOX-APAP' } },
          { label: 'DIC', link: { to: 'disease', id: 'DIS-BD-DIC' } },
          { label: 'Thrombocytopenia (broad)', link: { to: 'disease', id: 'DIS-BD-TCP' } },
          { label: 'Bleeding / haemorrhage workup', link: { to: 'dx', id: 'bleeding' } },
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
