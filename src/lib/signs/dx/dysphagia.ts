// ── Dysphagia / Gagging — diagnostic approach (data) ─────────────────────────
// Confirm it is a swallowing problem (not vomiting), localise along the swallow
// (oral → pharyngeal/cricopharyngeal → oesophageal), screen for aspiration
// pneumonia and megaoesophagus, then pursue the functional work-up. The
// videofluoroscopic swallow study (VFSS) is the criterion standard for functional
// dysphagia / cricopharyngeal asynchrony. Links to GI/neuromuscular disease pages.
// (Ettinger Ch 47)

import type { DxApproach } from '../dxTypes'

export const dysphagiaDx: DxApproach = {
  title: 'Dysphagia / Gagging',
  tabs: {

    history: {
      title: 'History: Dysphagia / Gagging',
      blocks: [
        { kind: 'branch', text: 'GOAL: SWALLOWING PROBLEM vs VOMITING, THEN LOCALISE' },
        {
          kind: 'check',
          html: `• <strong>Dysphagia</strong> = difficulty swallowing (a clinical finding, not a diagnosis)<br>• <strong>Gagging</strong> = airway-protective reflex (tongue base/palate/epiglottis → CN V afferent, CN X efferent)<br>Distinguish from:<br>• <strong>Regurgitation</strong> = passive expulsion from pharynx/oesophagus — head down, food falls out, no nausea<br>• <strong>True vomiting</strong> = active, centrally-mediated, with prodromal nausea, retching and abdominal contractions — see the Vomiting approach<br>• <strong>Expectoration</strong> = "hacking" terminal retch of a coughing paroxysm → respiratory disease<br>Regurgitation is uncommon in cats — assume vomiting in a cat unless proven otherwise. <span style="opacity:.7">(Ettinger Ch 47)</span>`,
        },
        { kind: 'step', text: ' STEP 1 — WATCH THE PATIENT EAT & LOCALISE' },
        {
          kind: 'check',
          html: `Offer food and water and observe.<br>
    <strong>Oral (prehension/mastication):</strong> drops food, drools, pain on opening the mouth, pawing at the face, tilts the head to chew.<br>
    <strong>Pharyngeal/cricopharyngeal:</strong> repeated swallowing attempts, gagging, coughing or nasal reflux while eating, the bolus won't clear the throat.<br>
    <strong>Oesophageal:</strong> passive regurgitation of undigested food/saliva (variable timing after eating), cervical oesophageal distension, weight loss despite a good appetite. (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — SIGNALMENT, AGE & BREED' },
        {
          kind: 'check',
          html: `<strong>Young dog at weaning</strong> → congenital causes: <strong>cricopharyngeal achalasia</strong> (Cocker Spaniel, Golden Retriever), <strong>vascular ring anomaly / PRAA</strong> (German Shepherd, Irish Setter — regurgitation of solids as it starts on solid food), congenital megaoesophagus (Shar-Pei, GSD, Great Dane, Irish Setter, Labrador, Newfoundland).<br>
    <strong>Adult dog</strong> → acquired megaoesophagus (idiopathic; or secondary to MG, hypothyroidism, hypoadrenocorticism, lead), oesophagitis, stricture, foreign body, neoplasia.<br>
    <strong>MG signalment</strong> is bimodal (&lt;4 yr or &gt;9 yr); Akita, GSP, Chihuahua, GSD, Golden Retriever overrepresented.<br>
    <strong>Masticatory myositis</strong> → painful/swollen then atrophied jaw muscles, inability to open the mouth. (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — ONSET, COURSE & EXPOSURES' },
        {
          kind: 'check',
          html: `<strong>Acute onset</strong> + retching + hypersalivation → suspect <strong>oesophageal foreign body</strong> (emergency).<br>
    <strong>Post-anaesthetic / post-prolonged-recumbency</strong> regurgitation → reflux oesophagitis ± stricture.<br>
    <strong>Progressive with appendicular weakness that worsens on exercise</strong> → generalised MG.<br>
    <strong>Dysphagia + hypersalivation + behaviour change in an unvaccinated or exposed patient</strong> → consider <strong>rabies</strong> (zoonotic — isolate, notifiable). Ask about toxin access (lead, organophosphate/anticholinesterase, thallium) and any history of coughing (concurrent aspiration / aerodigestive disease — 80% of dogs coughing exclusively had swallow dysfunction on VFSS). (Ettinger Ch 47, 221)`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Acute retching + drooling = oesophageal foreign body until disproven · Acquired megaoesophagus = run an AChR titre for MG · Coughing / fever after regurgitation = aspiration pneumonia · Dysphagia + hypersalivation in an unvaccinated patient = handle as possible rabies.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Dysphagia / Gagging',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — include ORAL, NEURO & THORACIC AUSCULTATION' },
        { kind: 'step', text: ' STEP 1 — ORAL EXAMINATION (often needs sedation)' },
        {
          kind: 'check',
          html: `A conscious oral exam is rarely complete — <strong>examine the oral cavity under sedation/GA</strong> for dental/periodontal disease, oral masses, foreign bodies (e.g. a stick lodged across the palate), stomatitis, cleft palate, TMJ disorder and a retrobulbar abscess (pain on opening + exophthalmos). Assess salivary swellings (mucocele/sialocele) and the tonsils/pharynx. (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — NEUROLOGIC EXAM (cranial nerves)' },
        {
          kind: 'check',
          html: `Localise functional dysphagia by cranial nerve:<br>
    <strong>CN V</strong> — masticatory muscle bulk/symmetry, dropped jaw (bilateral), facial hypalgesia.<br>
    <strong>CN VII</strong> — facial paresis (lip/cheek control of the bolus).<br>
    <strong>CN IX / X</strong> — <strong>gag reflex</strong>; reduced gag, dysphagia, dysphonia, laryngeal paralysis, megaoesophagus.<br>
    <strong>CN XII</strong> — tongue strength/symmetry (lingual paresis).<br>
    Assess for generalised/exercise-induced weakness (MG), neck ventroflexion, and signs of LMN polyneuropathy (polyradiculoneuritis). (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — MASTICATORY MUSCLES & JAW' },
        {
          kind: 'check',
          html: `Palpate the temporal and masseter muscles for pain/swelling (acute) or atrophy (chronic). Assess the range of jaw opening — restricted, painful opening with masticatory muscle atrophy suggests <strong>masticatory myositis</strong> (confirm with the type 2M-fibre antibody). Trismus/inability to open also occurs with retrobulbar disease and tetanus. (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: ' STEP 4 — THORACIC AUSCULTATION & GENERAL' },
        {
          kind: 'check',
          html: `Auscult for crackles/increased lung sounds of <strong>aspiration pneumonia</strong> (cranioventral; the major complication). Note body condition/weight loss, cervical oesophageal distension, fever, and any systemic signs pointing to an endocrine (hypothyroid coat changes) or neuromuscular cause. (Ettinger Ch 47)`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Dysphagia / Gagging — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — THORACIC RADIOGRAPHS (every dysphagic patient)' },
        {
          kind: 'check',
          html: `Take <strong>thoracic radiographs (minimum 3 views) in ALL dysphagic patients</strong> to identify <strong>megaoesophagus</strong> and <strong>aspiration pneumonia</strong> (cranioventral alveolar pattern). Aspiration is the leading lethal complication — among aspiration cases, oesophageal disease accounted for ~40% (megaoesophagus = 71% of that group) and neurologic disease ~27%. Stabilise/treat aspiration before invasive work-up. (Ettinger Ch 47, 221)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — VFSS / CONTRAST SWALLOW STUDY (the key functional test)' },
        {
          kind: 'check',
          html: `The <strong>videofluoroscopic swallow study (VFSS)</strong> is the <strong>criterion standard for functional dysphagia</strong> — the free-feeding, free-standing protocol is preferred. It defines <strong>cricopharyngeal achalasia vs dyssynchrony</strong> (timing of upper-sphincter relaxation against the pharyngeal contraction — the distinction changes the surgery), detects segmental oesophageal dysmotility, the <strong>LES achalasia-like syndrome (LES-AS)</strong>, and sliding hiatal hernia better than static radiographs. A static <strong>barium/contrast oesophagram</strong> (± food) helps when fluoroscopy is unavailable, but cannot assess the dynamic phases. (Ettinger Ch 47, 221)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — OESOPHAGOSCOPY' },
        {
          kind: 'check',
          html: `<strong>Oesophagoscopy</strong> directly assesses and treats mucosal/luminal disease: <strong>oesophagitis</strong>, <strong>stricture</strong> (and balloon dilation), <strong>foreign body</strong> (retrieval), diverticulum, neoplasia and the gastro-oesophageal junction. Image (thoracic rads ± contrast) first; endoscope when a mucosal/obstructive lesion is suspected or when retrieval/dilation is planned. (Ettinger Ch 47)`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — TEST FOR SECONDARY / NEUROMUSCULAR CAUSES' },
        {
          kind: 'check',
          html: `For acquired megaoesophagus or pharyngeal/oesophageal functional dysphagia, screen the secondary causes:<br>
    <strong>AChR antibody titre</strong> — gold standard for <strong>myasthenia gravis</strong> (≈98% sensitive in dogs); megaoesophagus occurs in 84% of dogs / 40% of cats with generalised MG. A negative titre does not fully exclude focal/seronegative MG.<br>
    <strong>Type 2M-fibre (masticatory muscle) antibody</strong> — for <strong>masticatory myositis</strong> when the jaw muscles are painful/atrophied; biopsy if equivocal.<br>
    <strong>Endocrine</strong> — total/free T4 + TSH (hypothyroidism), basal cortisol / ACTH stimulation (hypoadrenocorticism).<br>
    <strong>Toxin screens</strong> — blood lead, cholinesterase activity where exposure is plausible.<br>
    <strong>CBC/chemistry</strong> for systemic/inflammatory disease, and advanced neuro imaging (MRI/CT) for a brainstem lesion affecting the CN IX/X nuclei. (Ettinger Ch 47)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
            { label: 'Oesophagitis', link: { to: 'disease', id: 'DIS-GI-ESOPHAGITIS' } },
            { label: 'Oesophageal stricture', link: { to: 'disease', id: 'DIS-GI-STRICTURE' } },
            { label: 'Vascular ring anomaly (PRAA)', link: { to: 'disease', id: 'DIS-GI-PRAA' } },
            { label: 'Salivary mucocele / sialocele', link: { to: 'disease', id: 'DIS-GI-SIALOCELE' } },
            { label: 'Dental / oronasal disease', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
            { label: 'Myasthenia gravis', link: { to: 'disease', id: 'DIS-WK-MG' } },
            { label: 'Dysautonomia', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
            { label: 'Rabies', link: { to: 'disease', id: 'DIS-INFECT-RABIES' } },
            { label: 'Regurgitation — diagnostic approach', link: { to: 'dx', id: 'regurgitation' } },
            { label: 'Vomiting — diagnostic approach', link: { to: 'dx', id: 'vomiting' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • First decide: swallowing problem vs true vomiting — watch the patient eat and look for nausea/abdominal effort.<br>
  • Thoracic radiographs in EVERY dysphagic patient — never miss megaoesophagus or aspiration pneumonia.<br>
  • VFSS (free-feeding) is the criterion standard for functional dysphagia and is the test that separates cricopharyngeal achalasia from dyssynchrony — get it before committing to a myotomy.<br>
  • Acquired megaoesophagus → run an AChR titre; MG drives 84% of canine generalised cases and a negative titre doesn't exclude focal/seronegative MG.<br>
  • Dysphagia + hypersalivation in an unvaccinated/exposed patient → handle as possible rabies (zoonotic, notifiable).<br>
  • Protect the airway and withhold oral feeding in severe pharyngeal/oesophageal dysfunction until aspiration risk is controlled.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
