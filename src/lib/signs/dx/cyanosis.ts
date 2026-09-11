// ── Cyanosis — diagnostic approach (data) ────────────────────────────────────
// Cyanosis = ≥5 g/dL deoxygenated haemoglobin (≈3 g/dL arterial); a severely
// anaemic patient may be too anaemic to look cyanotic. This is an emergency:
// oxygen first, then localise. History/Exam separate central (low SaO2 —
// respiratory or R→L shunt) from peripheral (poor perfusion) from
// dyshaemoglobinaemia (methaemoglobinaemia — normal PaO2, brown blood, pulse-ox
// unreliable). Diagnostics: stabilise → SpO2 → ABG / co-oximetry → thoracic
// imaging ± thoracocentesis → echo ± bubble study → metHb spot test.
// Links to the respiratory / cardiac disease pages (DIS-RESP-*, DIS-CARD-*) and
// the emergency protocols. (Ettinger Ch 27)

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const cyanosisDx: DxApproach = {
  title: 'Cyanosis',
  tabs: {

    history: {
      title: 'History: Cyanosis',
      blocks: [
        { kind: 'branch', text: 'GOAL: CENTRAL vs PERIPHERAL vs DYSHAEMOGLOBINAEMIA' },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.4fr',
          dividers: true,
          headers: ['Definition', { text: 'Consequence', tone: 'teal' }],
          rows: [
            ['<strong>Cyanosis</strong><br>blue / dark discoloration of skin and mucosa', { text: 'Requires <strong>≥5 g/dL deoxygenated haemoglobin</strong> (≈3 g/dL arterial)', tone: 'teal' }],
            ['<strong>Severe anaemia</strong>', { text: 'May <strong>NOT</strong> look cyanotic even when critically hypoxic', tone: 'danger' }],
            ['<strong>Polycythaemia</strong>', { text: 'Cyanoses early', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `Never use mucous-membrane colour as your only oxygenation gauge. <span style="opacity:.7">(Ettinger Ch 27)</span>` },

        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS THIS AN EMERGENCY? (it usually is)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Central cyanosis + respiratory distress</strong>', { text: 'An emergency — <strong>give oxygen and minimise stress before any history-taking is completed</strong>', tone: 'danger' }],
            ['<strong>Take the history</strong>', { text: 'From the owner <em>while</em> the patient is in an oxygen cage', tone: 'teal' }],
            ['<strong>Ask about</strong>', { text: 'Speed of onset · exercise tolerance · any toxin access', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'ONSET, COURSE & EXERCISE', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Pattern', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Peracute</strong>', { text: 'Toxin (paracetamol · benzocaine · nitrate → methaemoglobinaemia) · pulmonary thromboembolism · aortic thromboembolism · pneumothorax · airway crisis', tone: 'teal' }],
            ['<strong>Chronic / lifelong, worse on exercise, young animal</strong>', { text: 'Cyanotic congenital heart disease (R→L shunt) with secondary erythrocytosis', tone: 'teal' }],
            ['<strong>Differential cyanosis</strong><br>caudal end blue, cranial pink, worse with light exercise', { text: '<strong>Reverse PDA</strong>', tone: 'teal' }],
            ['<strong>Cough · wheeze · stridor · honking</strong>', { text: 'Parenchymal vs lower- vs upper-airway disease', tone: 'teal' }],
          ],
        }, '⏱️'),

        ...stepTable(3, 'TOXIN & DRUG EXPOSURE (methaemoglobinaemia)', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Ask about', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Paracetamol (acetaminophen)</strong>', { text: 'Highly toxic, especially to cats', tone: 'danger' }],
            ['<strong>Benzocaine / topical local anaesthetics</strong>', { text: 'Oxidant exposure', tone: 'teal' }],
            ['<strong>Nitrates / nitrites · hydroxyurea · skunk musk</strong>', { text: 'Oxidant exposure', tone: 'teal' }],
            ['<strong>Effect of these oxidants</strong>', { text: '<strong>Acute cyanosis with a normal PaO₂</strong>, often with a concurrent Heinz-body haemolytic anaemia', tone: 'teal' }],
            ['<strong>Hereditary methaemoglobinaemia</strong><br>cytochrome-b5 reductase deficiency', { text: 'Mild, persistent cyanosis with erythrocytosis', tone: 'teal' }],
          ],
        }, '💊'),

        ...stepTable(4, 'SIGNALMENT & BREED', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Brachycephalic dog</strong>', { text: 'BOAS / upper-airway obstruction', tone: 'teal' }],
            ['<strong>Older large-breed dog with stridor</strong>', { text: 'Laryngeal paralysis', tone: 'teal' }],
            ['<strong>Toy breed with a honking cough</strong>', { text: 'Tracheal collapse', tone: 'teal' }],
            ['<strong>🐱 Cat with acute distress</strong>', { text: 'Feline asthma · pleural effusion · congestive heart failure', tone: 'teal' }],
            ['<strong>🐱 Cat with painful pulseless hind limbs</strong>', { text: 'Aortic thromboembolism', tone: 'danger' }],
          ],
        }, '🐾'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Acute distress + cyanosis = oxygen NOW, history later · Known paracetamol/benzocaine/nitrate access = methaemoglobinaemia until disproven (O2 won't fix it) · Lifelong exercise-limited cyanosis in a young animal = R→L cardiac shunt · Acute hind-limb pain + cyanotic pads in a cat = aortic thromboembolism.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Cyanosis',
      blocks: [
        { kind: 'step', tone: 'teal', text: '🫁 Stabilise on oxygen first — examine in stages, do not stress a dyspnoeic patient' },

        ...stepTable(1, 'IS THE CYANOSIS GENERALISED OR DISTAL?', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Type', { text: 'What you see / means', tone: 'teal' }],
          rows: [
            ['<strong>Central cyanosis</strong>', { text: 'Blue mucous membranes <strong>and</strong> skin throughout the body — low arterial saturation (respiratory disease or R→L shunt)', tone: 'teal' }],
            ['<strong>Peripheral cyanosis</strong>', { text: 'Limited to distal extremities with <em>normal</em> SaO₂ — poor perfusion (shock · thromboembolism · hypothermia)', tone: 'teal' }],
            ['<strong>Differential cyanosis</strong>', { text: 'Caudal mucous membranes / pads blue while cranial (oral) membranes stay pink → <strong>reverse PDA</strong>. Compare oral mucosa with vulvar / preputial mucosa', tone: 'teal' }],
          ],
        }, '🔵'),

        ...stepTable(2, 'RESPIRATORY PATTERN & THORACIC AUSCULTATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Inspiratory effort / stridor</strong>', { text: 'Upper-airway obstruction — BOAS · laryngeal paralysis · tracheal collapse', tone: 'teal' }],
            ['<strong>Expiratory effort / wheeze</strong>', { text: 'Lower-airway disease — feline asthma', tone: 'teal' }],
            ['<strong>Increased lung sounds / crackles</strong>', { text: 'Parenchymal disease — pneumonia · oedema', tone: 'teal' }],
            ['<strong>Muffled / absent lung sounds ventrally or dorsally</strong>', { text: 'Pleural space disease (effusion · pneumothorax) — <strong>this patient needs a thoracocentesis, not a delay</strong>', tone: 'danger' }],
          ],
        }, '👂'),

        ...stepTable(3, 'CARDIAC EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Murmur</strong>', { text: 'Congenital shunt · MVD; assess for signs of congestive failure', tone: 'teal' }],
            ['<strong>Young cyanotic animal + murmur + exercise intolerance + high PCV (erythrocytosis)</strong>', { text: '<strong>R→L shunt</strong>', tone: 'teal' }],
            ['<strong>🐱 Femoral pulses + footpads</strong>', { text: 'Absent pulses + cold cyanotic pads + pain = <strong>aortic thromboembolism</strong>', tone: 'danger' }],
          ],
        }, '❤️'),

        ...stepTable(4, 'LOOK AT THE BLOOD ITSELF', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Blood colour', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Chocolate-brown, does NOT brighten on exposure to air</strong>', { text: '<strong>Methaemoglobinaemia</strong>', tone: 'danger' }],
            ['<strong>Dark red / violet, turns bright red with O₂</strong>', { text: 'Normal hypoxaemic blood', tone: 'teal' }],
          ],
        }, '🩸'),
        { kind: 'note', html: `This single bedside observation can redirect the entire work-up.` },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Cyanosis — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '🫁 STEP 1 — STABILISE: OXYGEN FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Caveat', tone: 'teal' }],
          rows: [
            ['<strong>Supplement oxygen immediately</strong>', { text: 'In every cyanotic patient, and minimise handling stress', tone: 'teal' }],
            ['<strong>Oxygen does NOT correct a right-to-left shunt</strong>', { text: 'Shunted blood never meets alveolar gas', tone: 'danger' }],
            ['<strong>Oxygen is of little use in methaemoglobinaemia</strong>', { text: 'metHb cannot bind O₂ — a failure to pink up on oxygen is itself a diagnostic clue <span style="opacity:.7">(Ettinger Ch 27)</span>', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'PULSE OXIMETRY (SpO₂) — useful but flawed', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Normal</strong>', { text: 'SpO₂ &gt;95%', tone: 'teal' }],
            ['<strong>Limitations</strong>', { text: 'Fast non-invasive screen, but <strong>overestimates</strong> SaO₂ at low ranges (&lt;70–80%); degraded by pigmentation, poor perfusion and severe anaemia', tone: 'teal' }],
            ['<strong>Methaemoglobinaemia</strong>', { text: 'SpO₂ is <strong>falsely pinned at ~85%</strong> regardless of true oxygenation — a clinically cyanotic patient with an "85%" pulse-ox that won\'t move is a red flag for metHb', tone: 'danger' }],
          ],
        }, '📟'),

        ...stepTable(3, 'ARTERIAL BLOOD GAS / CO-OXIMETRY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Arterial blood gas</strong>', { text: 'Gold standard for PaO₂ — normal 80–100 mmHg on room air at sea level; severe hypoxaemia = PaO₂ &lt;60 mmHg / SaO₂ &lt;90%', tone: 'teal' }],
            ['<strong>Normal PaO₂ with clinical cyanosis</strong>', { text: 'Indicts a <strong>dyshaemoglobinaemia</strong>', tone: 'danger' }],
            ['<strong>Pulse CO-oximetry</strong>', { text: 'Multiple wavelengths neutralise the effect of dyshaemoglobins (quantifies metHb directly) and estimates haemoglobin concentration — the test of choice when methaemoglobinaemia is suspected', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(4, 'THORACIC IMAGING ± THORACOCENTESIS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Thoracic radiography</strong>', { text: 'Characterises parenchymal, airway, pleural-space and cardiac disease', tone: 'teal' }],
            ['<strong>Muffled lung sounds + unstable patient</strong>', { text: '<strong>Thoracocentesis comes BEFORE radiographs</strong> — diagnostic and immediately therapeutic for pleural effusion / pneumothorax (see the thoracocentesis protocol). Defer GA/CT until stable', tone: 'danger' }],
            ['<strong>Thoracic CT</strong>', { text: 'Sensitive for pulmonary thromboembolism and other respiratory causes of hypoxaemia — once the patient can tolerate it', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(5, 'ECHOCARDIOGRAPHY ± BUBBLE STUDY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Echocardiography</strong>', { text: 'Gold standard for structural cardiac disease and pulmonary hypertension', tone: 'teal' }],
            ['<strong>Contrast echo ("bubble study")</strong>', { text: 'Agitated saline injected IV — confirms a <strong>right-to-left shunt</strong> when bubbles appear in the systemic (left-sided) circulation', tone: 'teal' }],
            ['<strong>Point-of-care NT-proBNP</strong>', { text: 'Differentiates cardiac from non-cardiac respiratory distress, especially in cats', tone: 'teal' }],
          ],
        }, '❤️'),

        ...stepTable(6, 'METHAEMOGLOBINAEMIA SPOT TEST', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Step', { text: 'Detail', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Technique</strong>`, { text: 'Place 1–3 drops of blood on white filter paper', tone: 'teal' }],
            [`${numBadge(2)}<strong>Interpret</strong>`, { text: '<strong>Chocolate-brown that stays brown against the white background = methaemoglobinaemia</strong>; hypoxaemic blood is dark red / violet and turns bright red as it oxygenates. metHb &gt;2–3% of total Hb is abnormal', tone: 'teal' }],
            [`${numBadge(3)}<strong>Confirm &amp; treat</strong>`, { text: 'Confirm with co-oximetry, then remove the oxidant and give <strong>methylene blue</strong> + N-acetylcysteine (or transfusion) for acquired metHb — see the metHb protocol. <strong>Oxygen alone will not work</strong>', tone: 'danger' }],
          ],
        }, '🟤'),
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Laryngeal paralysis', link: { to: 'disease', id: 'DIS-LP' } },
            { label: 'Tracheal collapse', link: { to: 'disease', id: 'DIS-RESP-TRACOLL' } },
            { label: 'Feline asthma', link: { to: 'disease', id: 'DIS-RESP-ASTHMA' } },
            { label: 'Bacterial pneumonia', link: { to: 'disease', id: 'DIS-RESP-BACPNEU' } },
            { label: 'Pyothorax / pleural effusion', link: { to: 'disease', id: 'DIS-PYOTHORAX' } },
            { label: 'Pneumothorax', link: { to: 'disease', id: 'DIS-RESP-PNX' } },
            { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: 'Pulmonary thromboembolism', link: { to: 'disease', id: 'DIS-RESP-PTE' } },
            { label: 'Aortic thromboembolism (ATE)', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
            { label: 'Methaemoglobinaemia protocol', link: { to: 'protocol', id: 'PROT-TOX-METHB' } },
            { label: 'Thoracocentesis protocol', link: { to: 'protocol', id: 'PROT-THOR' } },
            { label: 'Respiratory-distress stabilisation protocol', link: { to: 'protocol', id: 'PROT-RESP' } },
            { label: 'Dyspnoea — localisation', link: { to: 'dx', id: 'dyspnoea' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Oxygen first, always — but remember it fixes neither a R→L shunt nor methaemoglobinaemia.<br>
  • Cyanosis needs ≥5 g/dL deoxyHb — a severely anaemic patient can be lethally hypoxic yet still look pink. Trust the ABG, not the gums.<br>
  • A pulse-ox stuck at ~85% in an obviously cyanotic patient = methaemoglobinaemia until proven otherwise — do the brown-blood spot test.<br>
  • Muffled lung sounds + distress → thoracocentesis before radiographs; it is diagnostic and therapeutic.<br>
  • Differential cyanosis (caudal blue, cranial pink) is pathognomonic for reverse PDA; confirm a R→L shunt with a bubble study.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
