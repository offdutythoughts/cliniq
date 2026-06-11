// ── Sneezing — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxSneezing{History,Exam,Dx} (legacy inline render() funcs
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepPair } from './shared/dxHelpers'

export const sneezingDx: DxApproach = {
  title: 'Sneezing',
  tabs: {

  history: {
    title: 'History: Sneezing',
    blocks: [
      { kind: 'branch', text: 'ACUTE vs CHRONIC, AND LATERALITY' },
      {
        kind: 'comparisonTable',
        cols: [
          { label: 'Onset + laterality', isLabel: true, width: '28%' },
          { label: 'Discharge type', color: '#94a3b8', width: '28%' },
          { label: 'Likely diagnosis → next step' },
        ],
        rows: [
          { kind: 'row', cells: ['<strong>Peracute, violent</strong> + unilateral', 'Serous → moist', '<strong>Foreign body</strong> (grass seed) → rhinoscopy (urgent)'] },
          { kind: 'row', cells: ['<strong>Acute, progressive</strong> + unilateral', 'Haemorrhagic', '<strong>Neoplasia or fungal</strong> (aspergillosis) → CT + rhinoscopy + biopsy'] },
          { kind: 'row', cells: ['<strong>Acute</strong> + bilateral', 'Serous to mucopurulent', '<strong>Infectious</strong> (viral URTI, FHV-1/FCV in 🐱; CIRD in 🐕) → PCR panel'] },
          { kind: 'row', cells: ['<strong>Chronic, progressive</strong> + unilateral', 'Mucopurulent ± epistaxis', '<strong>Neoplasia</strong> (older dolichocephalic dog) → CT + biopsy'] },
          { kind: 'row', cells: ['<strong>Chronic, bilateral</strong>', 'Mucopurulent', '<strong>Chronic rhinosinusitis / lymphoplasmacytic rhinitis</strong> → CT + rhinoscopy + biopsy'] },
          { kind: 'row', cells: ['With <strong>dental disease</strong>', 'Mucopurulent from one side', '<strong>Tooth-root abscess / oronasal fistula</strong> → dental radiographs'] },
          { kind: 'row', cells: ['<strong>Young cat</strong> + stertor', 'Serous', '<strong>Nasopharyngeal polyp</strong> → retroflex pharyngoscopy'] },
        ],
        fontSize: '11px',
        scrollable: false,
      },
      { kind: 'step', text: '📋 DISCHARGE & ASSOCIATED SIGNS' },
      {
        kind: 'check',
        html: `<strong>Serous</strong> → early viral/allergic. <strong>Mucopurulent</strong> → secondary bacterial, chronic disease. <strong>Haemorrhagic / epistaxis</strong> → neoplasia, fungal (aspergillosis), FB, coagulopathy → see Epistaxis.<br>
      <strong>Cat with conjunctivitis + ocular discharge + oral ulcers</strong> → FHV-1 / FCV (cat flu).<br>
      <strong>Signs worse with eating / dropped food into nose</strong> → oronasal fistula, cleft.`,
      },
      { kind: 'step', alt: true, text: '🌍 SIGNALMENT / ENVIRONMENT' },
      {
        kind: 'check',
        html: `<strong>Older dolichocephalic dog</strong> → nasal neoplasia / aspergillosis. <strong>Young multi-cat household / shelter</strong> → viral URTI.<br>
      <strong>Cat with "Roman nose"/facial swelling, endemic area</strong> → cryptococcosis.<br>
      <strong>Dental disease history</strong> → tooth-root abscess / oronasal fistula. <strong>Outdoor access</strong> → foreign body.`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Any haemorrhagic nasal discharge → cross over to the <strong>Epistaxis</strong> approach (local vs systemic).` },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Sneezing',
    blocks: [
      { kind: 'step', text: 'STEP 1 — EXTERNAL NOSE AND FACE' },
      {
        kind: 'check',
        html: `Facial symmetry &amp; bony contour — deformity suggests neoplasia or fungal erosion. <strong>Skull percussion</strong>: dull sound over nasal sinus indicates fluid or mass — compare both sides.<br>
      <strong>Pain on facial palpation</strong>: fungal erosion, neoplasia. <strong>Nasal planum pigmentation / ulceration / depigmentation</strong>: Aspergillus causes nasal depigmentation; also consider autoimmune disease.<br>
      <strong>Nasal airflow</strong>: test each nostril with a glass slide or cotton wisp — unilateral reduction indicates obstruction. <strong>Ocular retropulsion</strong>: reduced with retrobulbar or caudal nasal mass.`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — ORAL CAVITY AND DENTAL ARCADE' },
      {
        kind: 'check',
        html: `Examine <strong>hard palate</strong> for erosion (fungal) and <strong>dental arcades</strong> for fractures, abscessed teeth, or fistulae.<br>
      <strong>Fistula probing</strong>: if oronasal fistula suspected, probe with a blunt instrument from the oral side.<br>
      <strong>Percussion of upper premolars/molars</strong>: pain indicates tooth-root abscess — especially carnassial teeth.<br>
      <strong>Soft palate elevation</strong>: reveals the nasopharynx — nasopharyngeal polyp may be visible. Assess for stertor (nasopharyngeal disease).`,
      },
      { kind: 'step', text: 'STEP 3 — OCULAR AND REGIONAL' },
      {
        kind: 'check',
        html: `<strong>Conjunctivitis / epiphora</strong>: viral URTI (FHV-1/FCV); nasolacrimal obstruction from intranasal mass or chronic rhinitis.<br>
      <strong>Nasolacrimal drainage assessment</strong>: fluorescein Jones test — indicates NLS patency; failure to appear at nares suggests obstruction.<br>
      <strong>Horner syndrome</strong>: the sympathetic chain runs near the ear and nasopharynx — polyp or neoplasia can compress it (miosis, ptosis, enophthalmos, third-eyelid protrusion).<br>
      <strong>Submandibular lymphadenopathy</strong>: sample if enlarged — neoplasia, fungal infection.`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — FUNDUS AND SYSTEMIC' },
      {
        kind: 'check',
        html: `Fundoscopy: chorioretinitis suggests systemic fungal (Cryptococcus, Aspergillus, Blastomyces in endemic areas) or distemper.<br>
      Lymphadenopathy (submandibular, cervical): sample if enlarged — neoplasia, fungal. Full body condition + weight: neoplasia.<br>
      Coagulopathy signs (petechiae, ecchymoses): if haemorrhagic sneezing/epistaxis — check CBC + coag profile before rhinoscopy.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Sneezing — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'LATERALITY OF DISCHARGE = THE KEY DECISION AXIS' },
      {
        kind: 'comparisonTable',
        cols: [
          { label: 'Feature', isLabel: true, width: '30%' },
          { label: 'Unilateral', color: '#E8713A', width: '35%' },
          { label: 'Bilateral', color: 'var(--tone-green-fg)' },
        ],
        rows: [
          { kind: 'row', cells: ['First thought', 'Structural (FB, neoplasia, fungal, fistula)', 'Infectious / inflammatory'] },
          { kind: 'row', cells: ['Key initial test', 'CT nose + paranasal sinuses', 'PCR panel (FHV-1/FCV/Chlamydia in 🐱; B.bronch/virus in 🐕)'] },
          { kind: 'row', cells: ['Rhinoscopy', 'Essential — directed biopsy', 'Useful for chronic bilateral'] },
          { kind: 'row', cells: ['Key diagnoses', 'FB · Neoplasia · Aspergillosis · Oronasal fistula', 'Viral URTI · Chronic rhinosinusitis · NP polyp (🐱) · Crypto (🐱)'] },
        ],
        fontSize: '11px',
        scrollable: false,
      },
      ...stepPair(1, 'MINIMUM DATABASE', `CBC + biochemistry: leukocytosis (infectious); thrombocytopenia (coagulopathy → haemorrhagic sneezing / epistaxis — check before rhinoscopy). Coagulation panel (PT/aPTT) if haemorrhagic discharge.<br>
      🐱 FIV/FeLV. Blood pressure (hypertension → epistaxis in older cats).<br>
      Aspergillus serology (agar gel double diffusion, AGID) or in-house lateral flow assay (sensitivity ~70% for sinonasal aspergillosis — better for disseminated).`),
      ...stepPair(2, 'CT OF NOSE AND PARANASAL SINUSES (gold standard)', `Preferred over radiographs for all nasal disease. Assess: turbinate destruction (neoplasia — aggressive lysis; Aspergillus — characteristic turbinate lysis with preserved bony plate); mass/soft-tissue density (neoplasia, polyp); fluid/mucosal thickening; cribriform plate integrity (neoplasia — invasion = guarded prognosis); bony expansion (fungal granuloma).<br>
      Essential before rhinoscopy to plan approach and biopsy sites.`),
      ...stepPair(3, 'RHINOSCOPY + BIOPSY', `Under GA after CT. <strong>Anterior rhinoscopy</strong> (rigid endoscope or paediatric bronchoscope): visualise nasal turbinates, identify FB (grass awn, plant material), polyp, mass, fungal plaques (Aspergillus: white-grey ulcerative plaques on ethmoid turbinates).<br>
      <strong>Retroflex pharyngoscopy</strong> (flexible scope looped through mouth): essential for nasopharyngeal polyp in cats and caudal nasal disease / choanal masses in dogs.<br>
      Biopsy all masses — cytology alone inadequate for definitive diagnosis. FB removal if found.`),
      ...stepPair(4, 'DENTAL RADIOGRAPHS (IF ORONASAL FISTULA SUSPECTED)', `Full-mouth intraoral dental radiographs under GA. Periapical lucency around carnassial/premolar roots → tooth root abscess. Probe suspected fistula from oral side.<br>
      Consider concurrent CT for extent of sinus involvement. Treatment: tooth extraction ± sinus debridement; mucosal flap closure.`),
      ...stepPair(5, 'INFECTIOUS PANEL (BILATERAL / INFLAMMATORY PATTERN)', `Nasal flush cytology + culture (bacterial secondary infection common — does not confirm primary cause).<br>
      PCR panel: 🐱 FHV-1, FCV, Chlamydophila felis, Mycoplasma (nasopharyngeal swab); 🐕 B. bronchiseptica, CIV, CAV-2, CDV.<br>
      Cryptococcus: nasal swab/lavage cytology (India ink) + Cryptococcal antigen titre (highly sensitive); biopsy for histopathology + culture.<br>
      Aspergillus: serum AGID + rhinoscopy with biopsy (hyphae in culture / histology).`),
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
