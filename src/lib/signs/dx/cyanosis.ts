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

export const cyanosisDx: DxApproach = {
  title: 'Cyanosis',
  tabs: {

    history: {
      title: 'History: Cyanosis',
      blocks: [
        { kind: 'branch', text: 'GOAL: CENTRAL vs PERIPHERAL vs DYSHAEMOGLOBINAEMIA' },
        {
          kind: 'check',
          html: `<strong>Cyanosis</strong> is blue/dark discoloration of skin and mucosa from <strong>≥5 g/dL deoxygenated haemoglobin</strong> (≈3 g/dL arterial). Because it depends on absolute deoxyHb, a <strong>severely anaemic patient may NOT look cyanotic</strong> even when critically hypoxic, while a polycythaemic one cyanoses early — never use mucous-membrane colour as your only oxygenation gauge. (Ettinger Ch 27)`,
        },
        { kind: 'step', tone: 'danger', text: ' STEP 1 — IS THIS AN EMERGENCY? (it usually is)' },
        {
          kind: 'check',
          html: `Central cyanosis + respiratory distress is an emergency — <strong>give oxygen and minimise stress before any history-taking is completed</strong>. Take the history from the owner <em>while</em> the patient is in an oxygen cage. Ask about <strong>speed of onset, exercise tolerance, and any toxin access</strong>.`,
        },
        { kind: 'step', text: ' STEP 2 — ONSET, COURSE & EXERCISE' },
        {
          kind: 'check',
          html: `<strong>Peracute</strong> → toxin (paracetamol, benzocaine, nitrate — methaemoglobinaemia), pulmonary thromboembolism, aortic thromboembolism, pneumothorax, or airway crisis.<br>
    <strong>Chronic / lifelong, worse on exercise, in a young animal</strong> → cyanotic congenital heart disease (R→L shunt) with secondary erythrocytosis. <strong>Differential cyanosis</strong> (caudal end blue, cranial pink, worse with light exercise) = reverse PDA.<br>
    <strong>Cough, wheeze, stridor or honking</strong> → parenchymal vs lower- vs upper-airway disease.`,
        },
        { kind: 'step', text: ' STEP 3 — TOXIN & DRUG EXPOSURE (methaemoglobinaemia)' },
        {
          kind: 'check',
          html: `Ask specifically about <strong>paracetamol (acetaminophen)</strong> — highly toxic, especially to cats — <strong>benzocaine / topical local anaesthetics</strong>, <strong>nitrates / nitrites</strong>, hydroxyurea, and <strong>skunk musk</strong>. These oxidant exposures cause <strong>acute cyanosis with a normal PaO2</strong> and often a concurrent Heinz-body haemolytic anaemia. <strong>Hereditary methaemoglobinaemia</strong> (cytochrome-b5 reductase deficiency) gives mild, persistent cyanosis with erythrocytosis.`,
        },
        { kind: 'step', text: ' STEP 4 — SIGNALMENT & BREED' },
        {
          kind: 'check',
          html: `<strong>Brachycephalic dog</strong> → BOAS / upper-airway obstruction. <strong>Older large-breed dog with stridor</strong> → laryngeal paralysis. <strong>Toy breed with a honking cough</strong> → tracheal collapse. <strong>Cat with acute distress</strong> → feline asthma, pleural effusion, or congestive heart failure; <strong>cat with painful pulseless hind limbs</strong> → aortic thromboembolism.`,
        },
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
        { kind: 'step', tone: 'teal', text: ' Stabilise on oxygen first — examine in stages, do not stress a dyspnoeic patient' },
        { kind: 'step', text: ' STEP 1 — IS THE CYANOSIS GENERALISED OR DISTAL?' },
        {
          kind: 'check',
          html: `<strong>Central cyanosis</strong> = blue mucous membranes AND skin throughout the body, reflecting low arterial saturation (respiratory disease or R→L shunt).<br>
    <strong>Peripheral cyanosis</strong> = limited to distal extremities with <em>normal</em> SaO2 (poor perfusion — shock, thromboembolism, hypothermia).<br>
    <strong>Differential cyanosis</strong> = caudal mucous membranes/pads blue while cranial (oral) membranes stay pink → reverse PDA — compare oral mucosa with the vulvar/preputial mucosa.`,
        },
        { kind: 'step', text: ' STEP 2 — RESPIRATORY PATTERN & THORACIC AUSCULTATION' },
        {
          kind: 'check',
          html: `<strong>Inspiratory effort / stridor</strong> → upper-airway obstruction (BOAS, laryngeal paralysis, tracheal collapse). <strong>Expiratory effort / wheeze</strong> → lower-airway disease (feline asthma).<br>
    <strong>Increased lung sounds / crackles</strong> → parenchymal disease (pneumonia, oedema). <strong>Muffled / absent lung sounds ventrally or dorsally</strong> → pleural space disease (effusion, pneumothorax) — this patient needs a thoracocentesis, not a delay.`,
        },
        { kind: 'step', text: ' STEP 3 — CARDIAC EXAM' },
        {
          kind: 'check',
          html: `Auscultate for a <strong>murmur</strong> (congenital shunt, MVD) and assess for signs of congestive failure. A young cyanotic animal with a murmur, exercise intolerance and a <strong>packed-cell volume that is high (erythrocytosis)</strong> points to a R→L shunt. In a cat with peripheral cyanosis, palpate the <strong>femoral pulses and footpads</strong> — absent pulses + cold cyanotic pads + pain = aortic thromboembolism.`,
        },
        { kind: 'step', text: ' STEP 4 — LOOK AT THE BLOOD ITSELF' },
        {
          kind: 'check',
          html: `When you draw blood, <strong>look at its colour</strong>. <strong>Chocolate-brown blood that does NOT brighten on exposure to air</strong> = methaemoglobinaemia. Normal hypoxaemic blood is dark red/violet and turns bright red with O2 exposure. This single observation can redirect the entire work-up at the bedside.`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Cyanosis — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — STABILISE: OXYGEN FIRST' },
        {
          kind: 'check',
          html: `<strong>Supplement oxygen immediately</strong> in every cyanotic patient and minimise handling stress.<br>
    Two important caveats: oxygen does <strong>NOT</strong> correct a <strong>right-to-left shunt</strong> (shunted blood never meets alveolar gas), and oxygen is <strong>of little use in methaemoglobinaemia</strong> (metHb cannot bind O2). A failure to pink up on oxygen is itself a diagnostic clue. (Ettinger Ch 27)`,
        },
        { kind: 'step', text: 'STEP 2 — PULSE OXIMETRY (SpO2) — useful but flawed' },
        {
          kind: 'check',
          html: `<strong>Normal SpO2 &gt;95%.</strong> SpO2 is a fast non-invasive screen but it <strong>overestimates</strong> SaO2 at low ranges (&lt;70–80%) and is degraded by pigmentation, poor perfusion and severe anaemia.<br>
    <strong>Critically: in methaemoglobinaemia, SpO2 is FALSELY pinned at ~85% regardless of true oxygenation</strong> — a clinically cyanotic patient with an "85%" pulse-ox that won't move is a red flag for metHb.`,
        },
        { kind: 'step', text: 'STEP 3 — ARTERIAL BLOOD GAS / CO-OXIMETRY' },
        {
          kind: 'check',
          html: `<strong>Arterial blood gas is the gold standard for PaO2</strong> (normal 80–100 mmHg on room air at sea level; severe hypoxaemia = PaO2 &lt;60 mmHg / SaO2 &lt;90%). A <strong>normal PaO2 with clinical cyanosis</strong> indicts a dyshaemoglobinaemia.<br>
    <strong>Pulse CO-oximetry</strong> uses multiple wavelengths to neutralise the effect of dyshaemoglobins (quantifies metHb directly) and also estimates haemoglobin concentration — the test of choice when methaemoglobinaemia is suspected.`,
        },
        { kind: 'step', text: 'STEP 4 — THORACIC IMAGING ± THORACOCENTESIS' },
        {
          kind: 'check',
          html: `<strong>Thoracic radiography</strong> characterises parenchymal, airway, pleural-space and cardiac disease.<br>
    <strong>If lung sounds are muffled and the patient is unstable, thoracocentesis comes BEFORE radiographs</strong> — it is both diagnostic and immediately therapeutic for pleural effusion / pneumothorax (see the thoracocentesis protocol). Defer GA/CT until the patient is stable.<br>
    <strong>Thoracic CT</strong> is sensitive for pulmonary thromboembolism and other respiratory causes of hypoxaemia once the patient can tolerate it.`,
        },
        { kind: 'step', text: 'STEP 5 — ECHOCARDIOGRAPHY ± BUBBLE STUDY' },
        {
          kind: 'check',
          html: `<strong>Echocardiography</strong> is the gold standard for structural cardiac disease and pulmonary hypertension. A <strong>contrast echo ("bubble study")</strong> — agitated saline injected IV — confirms a <strong>right-to-left shunt</strong> when bubbles appear in the systemic (left-sided) circulation.<br>
    <strong>Point-of-care NT-proBNP</strong> helps differentiate cardiac from non-cardiac respiratory distress, especially in cats.`,
        },
        { kind: 'step', text: 'STEP 6 — METHAEMOGLOBINAEMIA SPOT TEST' },
        {
          kind: 'check',
          html: `Place <strong>1–3 drops of blood on white filter paper</strong>: <strong>chocolate-brown that stays brown against the white background = methaemoglobinaemia</strong>; hypoxaemic blood is dark red/violet and turns bright red as it oxygenates. metHb &gt;2–3% of total Hb is abnormal.<br>
    Confirm with co-oximetry, then treat the cause: remove the oxidant, give <strong>methylene blue</strong> + N-acetylcysteine (or transfusion) for acquired metHb — see the metHb protocol. Oxygen alone will not work.`,
        },
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
