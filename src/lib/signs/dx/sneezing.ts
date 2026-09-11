// ── Sneezing — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxSneezing{History,Exam,Dx} (legacy inline render() funcs
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const sneezingDx: DxApproach = {
  title: 'Sneezing',
  tabs: {

  history: {
    title: 'History: Sneezing',
    blocks: [
      { kind: 'branch', text: 'ACUTE vs CHRONIC, AND LATERALITY' },
      {
        kind: 'gridTable',
        cols: '0.28fr 0.28fr 0.44fr',
        dividers: true,
        headers: ['Onset + laterality', 'Discharge type', { text: 'Differential & next step', tone: 'teal' }],
        rows: [
          ['<strong>Peracute, violent</strong> + unilateral', 'Serous → moist', { text: '<strong>Foreign body</strong> (grass seed)<br>Rhinoscopy — urgent', tone: 'teal' }],
          ['<strong>Acute, progressive</strong> + unilateral', 'Haemorrhagic', { text: '<strong>Neoplasia or fungal</strong> (aspergillosis)<br>CT + rhinoscopy + biopsy', tone: 'teal' }],
          ['<strong>Acute</strong> + bilateral', 'Serous to mucopurulent', { text: '<strong>Infectious</strong> (FHV-1/FCV 🐱; CIRD 🐕)<br>PCR panel', tone: 'teal' }],
          ['<strong>Chronic, progressive</strong> + unilateral', 'Mucopurulent ± epistaxis', { text: '<strong>Neoplasia</strong> (older dolichocephalic dog)<br>CT + biopsy', tone: 'teal' }],
          ['<strong>Chronic, bilateral</strong>', 'Mucopurulent', { text: '<strong>Chronic rhinosinusitis / lymphoplasmacytic rhinitis</strong><br>CT + rhinoscopy + biopsy', tone: 'teal' }],
          ['With <strong>dental disease</strong>', 'Mucopurulent from one side', { text: '<strong>Tooth-root abscess / oronasal fistula</strong><br>Dental radiographs', tone: 'teal' }],
          ['<strong>Young cat</strong> + stertor', 'Serous', { text: '<strong>Nasopharyngeal polyp</strong><br>Retroflex pharyngoscopy', tone: 'teal' }],
        ],
      },

      ...stepTable(1, 'DISCHARGE & ASSOCIATED SIGNS', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Serous</strong>', { text: 'Early viral / allergic', tone: 'teal' }],
          ['<strong>Mucopurulent</strong>', { text: 'Secondary bacterial · chronic disease', tone: 'teal' }],
          ['<strong>Haemorrhagic / epistaxis</strong>', { text: 'Neoplasia · fungal (aspergillosis) · FB · coagulopathy → see <strong>Epistaxis</strong>', tone: 'teal' }],
          ['<strong>🐱 Conjunctivitis + ocular discharge + oral ulcers</strong>', { text: 'FHV-1 / FCV (cat flu)', tone: 'teal' }],
          ['<strong>Signs worse with eating / dropped food into nose</strong>', { text: 'Oronasal fistula · cleft', tone: 'teal' }],
        ],
      }, '📋'),

      ...stepTable(2, 'SIGNALMENT / ENVIRONMENT', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Signalment / environment', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Older dolichocephalic dog</strong>', { text: 'Nasal neoplasia · aspergillosis', tone: 'teal' }],
          ['<strong>Young multi-cat household / shelter</strong>', { text: 'Viral URTI', tone: 'teal' }],
          ['<strong>🐱 "Roman nose" / facial swelling, endemic area</strong>', { text: 'Cryptococcosis', tone: 'teal' }],
          ['<strong>Dental disease history</strong>', { text: 'Tooth-root abscess · oronasal fistula', tone: 'teal' }],
          ['<strong>Outdoor access</strong>', { text: 'Foreign body', tone: 'teal' }],
        ],
      }, '🌍'),
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Any haemorrhagic nasal discharge → cross over to the <strong>Epistaxis</strong> approach (local vs systemic).` },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Sneezing',
    blocks: [
      ...stepTable(1, 'EXTERNAL NOSE AND FACE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Facial symmetry &amp; bony contour</strong>', { text: 'Deformity suggests neoplasia or fungal erosion', tone: 'teal' }],
          ['<strong>Skull percussion</strong>', { text: 'Dull sound over nasal sinus = fluid or mass — compare both sides', tone: 'teal' }],
          ['<strong>Pain on facial palpation</strong>', { text: 'Fungal erosion · neoplasia', tone: 'teal' }],
          ['<strong>Nasal planum</strong>', { text: 'Pigmentation / ulceration / depigmentation — <em>Aspergillus</em> causes nasal depigmentation; also consider autoimmune disease', tone: 'teal' }],
          ['<strong>Nasal airflow</strong>', { text: 'Test each nostril with a glass slide or cotton wisp — unilateral reduction indicates obstruction', tone: 'teal' }],
          ['<strong>Ocular retropulsion</strong>', { text: 'Reduced with retrobulbar or caudal nasal mass', tone: 'teal' }],
        ],
      }, '👃'),

      ...stepTable(2, 'ORAL CAVITY AND DENTAL ARCADE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Hard palate</strong>', { text: 'Erosion (fungal)', tone: 'teal' }],
          ['<strong>Dental arcades</strong>', { text: 'Fractures · abscessed teeth · fistulae', tone: 'teal' }],
          ['<strong>Fistula probing</strong>', { text: 'If oronasal fistula suspected, probe with a blunt instrument from the oral side', tone: 'teal' }],
          ['<strong>Percussion of upper premolars / molars</strong>', { text: 'Pain indicates tooth-root abscess — especially carnassial teeth', tone: 'teal' }],
          ['<strong>Soft palate elevation</strong>', { text: 'Reveals the nasopharynx — nasopharyngeal polyp may be visible. Assess for stertor (nasopharyngeal disease)', tone: 'teal' }],
        ],
      }, '👄'),

      ...stepTable(3, 'OCULAR AND REGIONAL', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Conjunctivitis / epiphora</strong>', { text: 'Viral URTI (FHV-1 / FCV) · nasolacrimal obstruction from intranasal mass or chronic rhinitis', tone: 'teal' }],
          ['<strong>Nasolacrimal drainage assessment</strong>', { text: 'Fluorescein Jones test — indicates NLS patency; failure to appear at the nares suggests obstruction', tone: 'teal' }],
          ['<strong>Horner syndrome</strong>', { text: 'The sympathetic chain runs near the ear and nasopharynx — polyp or neoplasia can compress it (miosis · ptosis · enophthalmos · third-eyelid protrusion)', tone: 'teal' }],
          ['<strong>Submandibular lymphadenopathy</strong>', { text: 'Sample if enlarged — neoplasia · fungal infection', tone: 'teal' }],
        ],
      }, '👁'),

      ...stepTable(4, 'FUNDUS AND SYSTEMIC', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Fundoscopy</strong>', { text: 'Chorioretinitis suggests systemic fungal disease (Cryptococcus · Aspergillus · Blastomyces in endemic areas) or distemper', tone: 'teal' }],
          ['<strong>Lymphadenopathy</strong> — submandibular, cervical', { text: 'Sample if enlarged — neoplasia · fungal', tone: 'teal' }],
          ['<strong>Body condition + weight</strong>', { text: 'Neoplasia', tone: 'teal' }],
          ['<strong>Coagulopathy signs</strong> — petechiae · ecchymoses', { text: 'If haemorrhagic sneezing / epistaxis — check CBC + coag profile <strong>before rhinoscopy</strong>', tone: 'danger' }],
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Sneezing — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'LATERALITY OF DISCHARGE = THE KEY DECISION AXIS' },
      {
        kind: 'gridTable',
        cols: '0.3fr 0.35fr 0.35fr',
        dividers: true,
        headers: ['Feature', { text: 'Unilateral', tone: 'orange' }, { text: 'Bilateral', tone: 'green' }],
        rows: [
          ['First thought', { text: 'Structural (FB, neoplasia, fungal, fistula)', tone: 'orange' }, { text: 'Infectious / inflammatory', tone: 'green' }],
          ['Key initial test', { text: 'CT nose + paranasal sinuses', tone: 'orange' }, { text: 'PCR panel (FHV-1/FCV/Chlamydia 🐱; B. bronch/virus 🐕)', tone: 'green' }],
          ['Rhinoscopy', { text: 'Essential — directed biopsy', tone: 'orange' }, { text: 'Useful for chronic bilateral', tone: 'green' }],
          ['Key diagnoses', { text: 'FB · Neoplasia · Aspergillosis · Oronasal fistula', tone: 'orange' }, { text: 'Viral URTI · Chronic rhinosinusitis · NP polyp (🐱) · Crypto (🐱)', tone: 'green' }],
        ],
      },

      ...stepTable(1, 'MINIMUM DATABASE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
        rows: [
          ['<strong>CBC + biochemistry</strong>', { text: 'Leukocytosis (infectious) · thrombocytopenia (coagulopathy → haemorrhagic sneezing / epistaxis — <strong>check before rhinoscopy</strong>)', tone: 'teal' }],
          ['<strong>Coagulation panel (PT / aPTT)</strong>', { text: 'If haemorrhagic discharge', tone: 'teal' }],
          ['<strong>🐱 FIV / FeLV</strong>', { text: 'Retroviral status', tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Hypertension → epistaxis in older cats', tone: 'teal' }],
          ['<strong>Aspergillus serology</strong>', { text: 'Agar gel double diffusion (AGID) or in-house lateral flow assay — sensitivity ~70% for sinonasal aspergillosis, better for disseminated', tone: 'teal' }],
        ],
      }, '🧪'),

      ...stepTable(2, 'CT OF NOSE AND PARANASAL SINUSES (gold standard)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Turbinate destruction</strong>', { text: 'Neoplasia — aggressive lysis · <em>Aspergillus</em> — characteristic turbinate lysis with preserved bony plate', tone: 'teal' }],
          ['<strong>Mass / soft-tissue density</strong>', { text: 'Neoplasia · polyp', tone: 'teal' }],
          ['<strong>Fluid / mucosal thickening</strong>', { text: 'Rhinosinusitis', tone: 'teal' }],
          ['<strong>Cribriform plate integrity</strong>', { text: 'Neoplasia — invasion = guarded prognosis', tone: 'danger' }],
          ['<strong>Bony expansion</strong>', { text: 'Fungal granuloma', tone: 'teal' }],
        ],
      }, '📊'),
      { kind: 'note', html: `Preferred over radiographs for all nasal disease, and <strong>essential before rhinoscopy</strong> to plan the approach and biopsy sites.` },

      ...stepTable(3, 'RHINOSCOPY + BIOPSY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Technique', { text: 'What it shows / does', tone: 'teal' }],
        rows: [
          ['<strong>Anterior rhinoscopy</strong><br>rigid endoscope or paediatric bronchoscope', { text: 'Visualise nasal turbinates · identify FB (grass awn, plant material) · polyp · mass · fungal plaques (<em>Aspergillus</em>: white-grey ulcerative plaques on ethmoid turbinates)', tone: 'teal' }],
          ['<strong>Retroflex pharyngoscopy</strong><br>flexible scope looped through the mouth', { text: 'Essential for nasopharyngeal polyp in cats and caudal nasal disease / choanal masses in dogs', tone: 'teal' }],
          ['<strong>Biopsy</strong>', { text: 'Biopsy <strong>all</strong> masses — cytology alone is inadequate for definitive diagnosis. Remove FB if found', tone: 'teal' }],
        ],
      }, '🔬'),
      { kind: 'note', html: `Under GA, after CT.` },

      ...stepTable(4, 'DENTAL RADIOGRAPHS (IF ORONASAL FISTULA SUSPECTED)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Step', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Full-mouth intraoral dental radiographs</strong>', { text: 'Under GA', tone: 'teal' }],
          ['<strong>Periapical lucency</strong> around carnassial / premolar roots', { text: 'Tooth root abscess', tone: 'teal' }],
          ['<strong>Probe suspected fistula</strong>', { text: 'From the oral side', tone: 'teal' }],
          ['<strong>Consider concurrent CT</strong>', { text: 'Extent of sinus involvement', tone: 'teal' }],
          ['<strong>Treatment</strong>', { text: 'Tooth extraction ± sinus debridement · mucosal flap closure', tone: 'teal' }],
        ],
      }, '🦷'),

      ...stepTable(5, 'INFECTIOUS PANEL (BILATERAL / INFLAMMATORY PATTERN)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Nasal flush cytology + culture</strong>', { text: 'Secondary bacterial infection is common — a positive culture does <strong>not</strong> confirm the primary cause', tone: 'teal' }],
          ['<strong>PCR panel</strong>', { text: '🐱 FHV-1 · FCV · <em>Chlamydophila felis</em> · Mycoplasma (nasopharyngeal swab) · 🐕 <em>B. bronchiseptica</em> · CIV · CAV-2 · CDV', tone: 'teal' }],
          ['<strong>Cryptococcus</strong>', { text: 'Nasal swab / lavage cytology (India ink) + cryptococcal antigen titre (highly sensitive) · biopsy for histopathology + culture', tone: 'teal' }],
          ['<strong>Aspergillus</strong>', { text: 'Serum AGID + rhinoscopy with biopsy (hyphae on culture / histology)', tone: 'teal' }],
        ],
      }, '🦠'),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'ESCALATION TRIGGERS',
        gap: 10,
        html: `Haemorrhagic discharge + thrombocytopenia = do NOT do rhinoscopy until coagulopathy is corrected.<br>
      Facial swelling / bony deformity + progressive epistaxis = neoplasia until proven otherwise → CT urgently.<br>
      Cribriform plate erosion on CT = guarded prognosis for neoplasia → referral oncology.<br>
      Young cat with dyspnoea + stertor = nasopharyngeal polyp → may need urgent retroflex scope under GA.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ Clinical pearls:</strong> Unilateral discharge = structural until proven otherwise. Always CT before rhinoscopy. Biopsy every nasal mass — even if CT looks inflammatory (chronic rhinosinusitis and early nasal lymphoma look identical on CT). Aspergillus serology alone has ~70% sensitivity — rhinoscopy + biopsy needed for confirmation.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
