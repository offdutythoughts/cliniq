// ── Pale Mucous Membranes — diagnostic approach (data) ───────────────────────
// Migration of the renderDxPaleGums{History,Exam,Dx}() inline views (legacy HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const paleGumsDx: DxApproach = {
  title: 'Pale MM',
  tabs: {

  history: {
    title: 'History: Pale MM',
    blocks: [
      { kind: 'branch', text: 'ANAEMIA vs POOR PERFUSION — AND IS IT ACUTE?' },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.4fr',
        dividers: true,
        headers: ['Pale MM means one of two things', { text: 'Mechanism', tone: 'teal' }],
        rows: [
          ['<strong>Anaemia</strong>', { text: 'Too few red cells', tone: 'teal' }],
          ['<strong>Poor perfusion</strong>', { text: 'Shock / vasoconstriction', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `The history starts to separate them and flags emergencies — acute haemorrhage, haemolytic crisis, shock.` },

      ...stepTable(1, 'ONSET, BLEEDING & PIGMENTURIA', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Acute collapse</strong>`, { text: 'Haemorrhage (trauma · splenic mass rupture) · haemolytic crisis · shock', tone: 'teal' }],
          [`${numBadge(2)}<strong>Evidence of blood loss</strong>`, { text: 'Melena · haematochezia · haematuria · epistaxis · trauma · recent surgery', tone: 'teal' }],
          [`${numBadge(3)}<strong>Red–brown urine</strong> (haemoglobinuria) + pallor`, { text: '<strong>Intravascular haemolysis</strong>', tone: 'teal' }],
          [`${numBadge(4)}<strong>Chronic, gradual</strong>`, { text: 'CKD (renal anaemia) · chronic disease · marrow disease · occult bleeding', tone: 'teal' }],
        ],
      }, '📋'),

      ...stepTable(2, 'TOXIN / DRUG / INFECTIOUS / SIGNALMENT', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Exposure / signalment', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Oxidant access</strong><br>onion/garlic (Allium) · zinc (coins, hardware) · paracetamol (🐱)', { text: 'Heinz-body haemolysis', tone: 'teal' }],
          ['<strong>Rodenticide access</strong>', { text: 'Haemorrhage', tone: 'teal' }],
          ['<strong>NSAIDs / steroids</strong>', { text: 'GI ulceration and bleeding', tone: 'teal' }],
          ['<strong>Tick exposure / travel</strong>', { text: 'Babesia · Mycoplasma · Cytauxzoon · Ehrlichia', tone: 'teal' }],
          ['<strong>FeLV / FIV status (🐱)</strong>', { text: 'Marrow suppression', tone: 'teal' }],
          ['<strong>Young, acute</strong>', { text: '<strong>IMHA</strong> — predisposed breeds: Cocker, Springer', tone: 'teal' }],
        ],
      }, '💊'),
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
      ...stepTable(1, 'PERFUSION PARAMETERS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Assess', { text: 'Pattern', tone: 'teal' }],
        rows: [
          ['<strong>Parameters to record</strong>', { text: 'MM colour · CRT · heart rate · pulse quality · extremity temperature · mentation', tone: 'teal' }],
          ['<strong>Anaemia</strong>', { text: 'Pale, but normal / bounding pulse and normal CRT (unless concurrent shock)', tone: 'teal' }],
          ['<strong>Hypoperfusion / shock</strong>', { text: 'Pale + prolonged CRT + weak pulses + tachycardia (🐕) — or <strong>bradycardia + hypothermia in a cat</strong> (decompensated)', tone: 'danger' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'SOURCE-HUNTING EXAM', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Icterus</strong> (with pallor)', { text: 'Haemolysis', tone: 'teal' }],
          ['<strong>Petechiae / ecchymoses</strong>', { text: 'Thrombocytopenia · coagulopathy', tone: 'teal' }],
          ['<strong>Abdominal distension / fluid wave</strong>', { text: 'Haemoabdomen (splenic mass)', tone: 'teal' }],
          ['<strong>Rectal exam</strong>', { text: 'Melena', tone: 'teal' }],
          ['<strong>Muffled heart + jugular distension</strong>', { text: 'Pericardial effusion', tone: 'teal' }],
          ['<strong>Murmur / arrhythmia</strong>', { text: 'Cardiogenic — note a <em>haemic</em> murmur may appear with severe anaemia', tone: 'teal' }],
        ],
      }, '🔍'),

      ...stepTable(3, 'DECIDE THE PATH', {
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['If', { text: 'Then', tone: 'teal' }],
        rows: [
          ['Pale + blood loss / icterus / petechiae', { text: '<strong>Anaemia path</strong> — PCV/TS · smear · reticulocytes', tone: 'teal' }],
          ['Pale + shock parameters, PCV normal', { text: '<strong>Perfusion path</strong> — lactate · BP · FAST · ECG', tone: 'teal' }],
        ],
      }, '⚡'),
      { kind: 'note', html: `The Diagnostics tab branches on PCV.` },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Pale MM — Diagnostics',
    blocks: [
      { kind: 'step', text: 'PALE MUCOUS MEMBRANES — DIAGNOSTIC APPROACH' },
      { kind: 'step', text: 'PCV/TS + CRT + HR + pulse quality' },
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
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
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
