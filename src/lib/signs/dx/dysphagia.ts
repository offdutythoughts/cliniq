// ── Dysphagia / Gagging — diagnostic approach (data) ─────────────────────────
// Confirm it is a swallowing problem (not vomiting), localise along the swallow
// (oral → pharyngeal/cricopharyngeal → oesophageal), screen for aspiration
// pneumonia and megaoesophagus, then pursue the functional work-up. The
// videofluoroscopic swallow study (VFSS) is the criterion standard for functional
// dysphagia / cricopharyngeal asynchrony. Links to GI/neuromuscular disease pages.
// (Ettinger Ch 47)

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const dysphagiaDx: DxApproach = {
  title: 'Dysphagia / Gagging',
  tabs: {

    history: {
      title: 'History: Dysphagia / Gagging',
      blocks: [
        { kind: 'branch', text: 'GOAL: SWALLOWING PROBLEM vs VOMITING, THEN LOCALISE' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Dysphagia</strong>', { text: 'Difficulty swallowing — a clinical finding, not a diagnosis', tone: 'teal' }],
            ['<strong>Gagging</strong>', { text: 'Airway-protective reflex — tongue base / palate / epiglottis → CN V afferent, CN X efferent', tone: 'teal' }],
            ['<strong>Regurgitation</strong>', { text: 'Passive expulsion from pharynx / oesophagus — head down, food falls out, no nausea', tone: 'teal' }],
            ['<strong>True vomiting</strong>', { text: 'Active, centrally-mediated, with prodromal nausea, retching and abdominal contractions — see the Vomiting approach', tone: 'teal' }],
            ['<strong>Expectoration</strong>', { text: '"Hacking" terminal retch of a coughing paroxysm → respiratory disease', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `Regurgitation is uncommon in cats — assume vomiting in a cat unless proven otherwise. <span style="opacity:.7">(Ettinger Ch 47)</span>` },

        ...stepTable(1, 'WATCH THE PATIENT EAT & LOCALISE', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Phase', { text: 'What you see', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Oral</strong><br>prehension / mastication`, { text: 'Drops food · drools · pain on opening the mouth · pawing at the face · tilts the head to chew', tone: 'teal' }],
            [`${numBadge(2)}<strong>Pharyngeal / cricopharyngeal</strong>`, { text: 'Repeated swallowing attempts · gagging · coughing or nasal reflux while eating · the bolus won\'t clear the throat', tone: 'teal' }],
            [`${numBadge(3)}<strong>Oesophageal</strong>`, { text: 'Passive regurgitation of undigested food / saliva (variable timing after eating) · cervical oesophageal distension · weight loss despite a good appetite', tone: 'teal' }],
          ],
        }, '👀'),
        { kind: 'note', html: `Offer food and water and observe. <span style="opacity:.7">(Ettinger Ch 47)</span>` },

        ...stepTable(2, 'SIGNALMENT, AGE & BREED', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Signalment', { text: 'Differential diagnosis', tone: 'teal' }],
          rows: [
            ['<strong>Young dog at weaning</strong>', { text: '<strong>Cricopharyngeal achalasia</strong> (Cocker Spaniel · Golden Retriever) · <strong>vascular ring anomaly / PRAA</strong> (German Shepherd · Irish Setter — regurgitation of solids as it starts on solid food) · congenital megaoesophagus (Shar-Pei · GSD · Great Dane · Irish Setter · Labrador · Newfoundland)', tone: 'teal' }],
            ['<strong>Adult dog</strong>', { text: 'Acquired megaoesophagus (idiopathic, or secondary to MG · hypothyroidism · hypoadrenocorticism · lead) · oesophagitis · stricture · foreign body · neoplasia', tone: 'teal' }],
            ['<strong>MG signalment</strong>', { text: 'Bimodal — &lt;4 yr or &gt;9 yr. Akita · GSP · Chihuahua · GSD · Golden Retriever overrepresented', tone: 'teal' }],
            ['<strong>Masticatory myositis</strong>', { text: 'Painful / swollen then atrophied jaw muscles · inability to open the mouth', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'ONSET, COURSE & EXPOSURES', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['History', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Acute onset + retching + hypersalivation</strong>', { text: '<strong>Oesophageal foreign body</strong> — emergency', tone: 'danger' }],
            ['<strong>Post-anaesthetic / post-prolonged-recumbency regurgitation</strong>', { text: 'Reflux oesophagitis ± stricture', tone: 'teal' }],
            ['<strong>Progressive, with appendicular weakness worsening on exercise</strong>', { text: 'Generalised myasthenia gravis', tone: 'teal' }],
            ['<strong>Dysphagia + hypersalivation + behaviour change, unvaccinated or exposed</strong>', { text: 'Consider <strong>rabies</strong> — zoonotic, isolate, notifiable', tone: 'danger' }],
            ['<strong>Toxin access</strong>', { text: 'Lead · organophosphate / anticholinesterase · thallium', tone: 'teal' }],
            ['<strong>Any history of coughing</strong>', { text: 'Concurrent aspiration / aerodigestive disease — 80% of dogs coughing exclusively had swallow dysfunction on VFSS', tone: 'teal' }],
          ],
        }, '⏱️'),
        { kind: 'note', html: `<span style="opacity:.7">(Ettinger Ch 47, 221)</span>` },
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

        ...stepTable(1, 'ORAL EXAMINATION (often needs sedation)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Oral cavity under sedation / GA</strong>', { text: 'A conscious oral exam is rarely complete', tone: 'teal' }],
            ['<strong>Teeth &amp; mucosa</strong>', { text: 'Dental / periodontal disease · oral masses · stomatitis · cleft palate', tone: 'teal' }],
            ['<strong>Foreign bodies</strong>', { text: 'E.g. a stick lodged across the palate', tone: 'teal' }],
            ['<strong>Jaw &amp; orbit</strong>', { text: 'TMJ disorder · retrobulbar abscess (pain on opening + exophthalmos)', tone: 'teal' }],
            ['<strong>Salivary swellings</strong>', { text: 'Mucocele / sialocele', tone: 'teal' }],
            ['<strong>Tonsils / pharynx</strong>', { text: 'Inflammation · masses <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '👄'),

        ...stepTable(2, 'NEUROLOGIC EXAM (cranial nerves)', {
          cols: '0.55fr 1.6fr',
          dividers: true,
          headers: ['Nerve', { text: 'Assess', tone: 'teal' }],
          rows: [
            ['<strong>CN V</strong>', { text: 'Masticatory muscle bulk / symmetry · dropped jaw (bilateral) · facial hypalgesia', tone: 'teal' }],
            ['<strong>CN VII</strong>', { text: 'Facial paresis — lip / cheek control of the bolus', tone: 'teal' }],
            ['<strong>CN IX / X</strong>', { text: '<strong>Gag reflex</strong> — reduced gag · dysphagia · dysphonia · laryngeal paralysis · megaoesophagus', tone: 'teal' }],
            ['<strong>CN XII</strong>', { text: 'Tongue strength / symmetry — lingual paresis', tone: 'teal' }],
            ['<strong>Generalised</strong>', { text: 'Exercise-induced weakness (MG) · neck ventroflexion · LMN polyneuropathy signs (polyradiculoneuritis) <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '🧠'),

        ...stepTable(3, 'MASTICATORY MUSCLES & JAW', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Temporal + masseter palpation</strong>', { text: 'Pain / swelling (acute) or atrophy (chronic)', tone: 'teal' }],
            ['<strong>Range of jaw opening</strong>', { text: 'Restricted, painful opening + masticatory muscle atrophy → <strong>masticatory myositis</strong> (confirm with the type 2M-fibre antibody)', tone: 'teal' }],
            ['<strong>Trismus / inability to open</strong>', { text: 'Also occurs with retrobulbar disease and tetanus <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '🦷'),

        ...stepTable(4, 'THORACIC AUSCULTATION & GENERAL', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Thoracic auscultation</strong>', { text: 'Crackles / increased lung sounds of <strong>aspiration pneumonia</strong> — cranioventral; the major complication', tone: 'danger' }],
            ['<strong>Body condition</strong>', { text: 'Weight loss', tone: 'teal' }],
            ['<strong>Neck</strong>', { text: 'Cervical oesophageal distension', tone: 'teal' }],
            ['<strong>Systemic signs</strong>', { text: 'Fever · endocrine clues (hypothyroid coat changes) · neuromuscular signs <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '🫁'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Dysphagia / Gagging — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '📊 STEP 1 — THORACIC RADIOGRAPHS (every dysphagic patient)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Do</strong>', { text: 'Thoracic radiographs (minimum 3 views) in <strong>ALL</strong> dysphagic patients', tone: 'teal' }],
            ['<strong>Looking for</strong>', { text: '<strong>Megaoesophagus</strong> · <strong>aspiration pneumonia</strong> (cranioventral alveolar pattern)', tone: 'teal' }],
            ['<strong>Why</strong>', { text: 'Aspiration is the leading lethal complication — among aspiration cases, oesophageal disease accounted for ~40% (megaoesophagus = 71% of that group) and neurologic disease ~27%', tone: 'danger' }],
            ['<strong>Then</strong>', { text: 'Stabilise / treat aspiration before invasive work-up <span style="opacity:.7">(Ettinger Ch 47, 221)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'VFSS / CONTRAST SWALLOW STUDY (the key functional test)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Videofluoroscopic swallow study (VFSS)</strong>', { text: '<strong>Criterion standard for functional dysphagia</strong> — the free-feeding, free-standing protocol is preferred', tone: 'teal' }],
            ['<strong>What it defines</strong>', { text: '<strong>Cricopharyngeal achalasia vs dyssynchrony</strong> (timing of upper-sphincter relaxation against the pharyngeal contraction — the distinction changes the surgery) · segmental oesophageal dysmotility · the <strong>LES achalasia-like syndrome (LES-AS)</strong> · sliding hiatal hernia — all better than static radiographs', tone: 'teal' }],
            ['<strong>Static barium / contrast oesophagram</strong>', { text: '± food; helps when fluoroscopy is unavailable, but cannot assess the dynamic phases <span style="opacity:.7">(Ettinger Ch 47, 221)</span>', tone: 'teal' }],
          ],
        }, '🎬'),

        ...stepTable(3, 'OESOPHAGOSCOPY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>What it assesses and treats</strong>', { text: '<strong>Oesophagitis</strong> · <strong>stricture</strong> (and balloon dilation) · <strong>foreign body</strong> (retrieval) · diverticulum · neoplasia · the gastro-oesophageal junction', tone: 'teal' }],
            ['<strong>Sequencing</strong>', { text: 'Image (thoracic rads ± contrast) first; endoscope when a mucosal / obstructive lesion is suspected or when retrieval or dilation is planned <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '🔬'),

        ...stepTable(4, 'TEST FOR SECONDARY / NEUROMUSCULAR CAUSES', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            ['<strong>AChR antibody titre</strong>', { text: 'Gold standard for <strong>myasthenia gravis</strong> (≈98% sensitive in dogs). Megaoesophagus occurs in 84% of dogs / 40% of cats with generalised MG. A negative titre does <strong>not</strong> fully exclude focal / seronegative MG', tone: 'teal' }],
            ['<strong>Type 2M-fibre (masticatory muscle) antibody</strong>', { text: '<strong>Masticatory myositis</strong> when the jaw muscles are painful / atrophied; biopsy if equivocal', tone: 'teal' }],
            ['<strong>Endocrine</strong>', { text: 'Total / free T4 + TSH (hypothyroidism) · basal cortisol / ACTH stimulation (hypoadrenocorticism)', tone: 'teal' }],
            ['<strong>Toxin screens</strong>', { text: 'Blood lead · cholinesterase activity where exposure is plausible', tone: 'teal' }],
            ['<strong>CBC / chemistry</strong>', { text: 'Systemic / inflammatory disease', tone: 'teal' }],
            ['<strong>Advanced neuro imaging (MRI / CT)</strong>', { text: 'Brainstem lesion affecting the CN IX / X nuclei <span style="opacity:.7">(Ettinger Ch 47)</span>', tone: 'teal' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `Screen these in any acquired megaoesophagus or pharyngeal / oesophageal functional dysphagia.` },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
            { label: 'Oesophagitis', link: { to: 'disease', id: 'DIS-OES-ITIS' } },
            { label: 'Oesophageal stricture', link: { to: 'disease', id: 'DIS-OES-STRICT' } },
            { label: 'Vascular ring anomaly (PRAA)', link: { to: 'disease', id: 'DIS-OES-VRA' } },
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
