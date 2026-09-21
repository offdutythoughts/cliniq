// ── Wet Eye / Epiphora — diagnostic approach (data) ──────────────────────────
// Migration of wetEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../wetEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, stepPatterns, numBadge, bullets } from './shared/dxHelpers'

export const wetEyeDx: DxApproach = {
  sign: 'wet-eye',
  title: 'Wet Eye / Epiphora',
  tabs: {

  history: {
    title: 'History: Wet Eye',
    blocks: [
      { kind: 'goal', text: 'CHARACTERISE THE EPIPHORA' },

      // Pain IS the production-vs-drainage fork, so its arms are a matched pair
      // carrying the same blue/teal the flowchart gives INCREASED PRODUCTION /
      // REDUCED DRAINAGE. Discharge character and laterality are two further
      // independent axes — each narrows the differential on its own, so each
      // gets a finding → points-to table rather than a one-line banner.
      {
        kind: 'row',
        cols: 2,
        label: 'Painful or not — production vs drainage',
        items: [
          {
            style: 'text-align:left;background:rgba(var(--tone-info),var(--tile-bg-a));border:1px solid rgba(var(--tone-info),var(--tile-bd-a));color:var(--tone-info-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">😣 Painful?</strong><br>
      Blepharospasm · rubbing<br>
      Photophobia · lacrimation<br>
      <span style="opacity:.75;">→ Production: surface disease / CN V irritation</span>`,
          },
          {
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">😐 Non-painful?</strong><br>
      Wet face, tear staining only<br>
      No squint, no rubbing<br>
      <span style="opacity:.75;">→ Drainage: NLS / conformational</span>`,
          },
        ],
      },
      {
        kind: 'accordion',
        variant: 'section',
        label: 'Discharge character',
        cols: 2,
        items: [
          {
            title: 'Serous / clear',
            lines: [
              '<strong>Reflex tearing</strong> from pain — ulcer, FB, ectopic cilium',
              'Pure <strong>drainage failure</strong> — NLS obstruction, puncta atresia (clear tears spilling, no discomfort)',
              'Early viral conjunctivitis',
              'Allergic conjunctivitis',
            ],
          },
          {
            title: 'Mucoid / ropy',
            lines: [
              '<strong>KCS</strong> — paradoxical epiphora with tacky grey mucus',
              'Chronic conjunctivitis',
              'Brachycephalic ocular surface disease',
            ],
          },
          {
            title: 'Mucopurulent',
            lines: [
              '<strong>Dacryocystitis</strong> — waxing/waning, reflux on lacrimal sac pressure',
              'Bacterial conjunctivitis',
              'Feline URTI (Chlamydia · Mycoplasma · FHV-1)',
              'KCS with secondary infection',
              'Infected / deep ulcer',
            ],
          },
          {
            title: 'Haemorrhagic',
            lines: [
              '<strong>Nasal or orbital neoplasia</strong> — especially with epistaxis · facial deformity',
              'Trauma — eyelid, canalicular or punctal laceration',
              'Fungal rhinitis eroding the NLS',
              'Severe FHV-1 (🐱)',
              'Coagulopathy',
            ],
          },
        ],
      },
      {
        kind: 'accordion',
        variant: 'section',
        label: 'Laterality',
        items: [
          {
            title: 'Unilateral',
            lines: [
              'A <strong>focal, mechanical cause</strong> until proven otherwise',
              'Foreign body (grass awn under the TEL) · ectopic cilium · ulcer',
              'Dacryocystitis · NLS obstruction (dacryolith, stricture)',
              'Nasal / orbital neoplasia in an older patient',
              'Trauma to the puncta or canaliculi',
            ],
          },
          {
            title: 'Bilateral',
            lines: [
              'A <strong>surface, conformational or systemic cause</strong>',
              'KCS · allergic conjunctivitis',
              'Infectious — FHV-1 · FCV · Chlamydia (🐱); CIRD (🐕)',
              'Brachycephalic conformation · macroblepharon · entropion · distichiasis',
              'Congenital puncta atresia / micropuncta (young, lifelong)',
            ],
          },
          {
            title: 'Unilateral → bilateral',
            lines: [
              'Infectious conjunctivitis spreading to the second eye',
              'KCS that began asymmetrically',
            ],
          },
        ],
      },

      ...stepTable(1, 'ONSET + DURATION', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Acute</strong><br>hours–days', { text: bullets(['Ulcer', 'Foreign body', 'Conjunctivitis', 'Acute uveitis (with concurrent miosis + flare)', 'Ectopic cilia (often acute presentation despite chronic anatomy)']), tone: 'teal' }],
          ['<strong>Subacute</strong><br>days–weeks', { text: bullets(['Dacryocystitis', 'KCS-related reflex tearing', 'Persistent FB (grass awn under TEL)', 'Early uveitis', 'Viral / allergic conjunctivitis']), tone: 'teal' }],
          ['<strong>Chronic / lifelong</strong><br>months–years', { text: bullets(['Congenital NLS atresia / micropuncta (puppy · kitten)', 'Distichiasis (often well-tolerated)', 'Brachycephalic ocular surface disease', 'Ectropion / euryblepharon with poor drainage', 'Pannus / plasmoma', 'Idiopathic dacryocystitis (intermittent)']), tone: 'teal' }],
          ['<strong>Chronic with discharge change</strong>', { text: bullets(['Dacryocystitis (mucopurulent, waxing/waning)', 'Orbital or nasal neoplasia (unilateral, progressive ± epistaxis)']), tone: 'teal' }],
        ],
      }, '📋'),

      { kind: 'step', text: '🐾 STEP 2 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Pug', 'Bulldog', 'Pekingese', 'Shih Tzu'], tone: 'warning', html: 'brachycephalic — multifactorial: lower NLS opening into the oropharynx, exposure keratopathy, macroblepharon, entropion, distichiasis. Tear staining classical.' },
          { breeds: ['Maltese', 'Toy Poodle', 'Bichon', 'Yorkshire Terrier'], tone: 'green', html: 'toy / miniature — cosmetic tear stain (chronic, non-painful), chronic KCS or distichiasis.' },
          { breeds: ['Cocker Spaniel'], tone: 'danger', html: 'ectropion + cherry eye + KCS + chronic dacryocystitis.' },
          { breeds: ['Cavalier King Charles Spaniel', 'West Highland White Terrier', 'Yorkshire Terrier', 'Bichon'], tone: 'warning', html: 'KCS — paradoxical reflex tearing.' },
          { breeds: ['German Shepherd', 'Greyhound', 'Husky'], tone: 'danger', html: 'pannus / plasmoma.' },
          { breeds: ['Young dog (&lt;1 yr), bilateral lifelong wet eyes'], group: 'signalment', tone: 'violet', html: 'puncta atresia / micropuncta — examine the puncta under sedation.' },
          { breeds: ['Older dog, unilateral epiphora ± epistaxis ± facial deformity'], group: 'signalment', tone: 'info', html: 'orbital or nasal neoplasia.' },
        ],
        cat: [
          { breeds: ['Persian', 'Himalayan', 'Exotic Shorthair'], tone: 'violet', html: 'brachycephalic ocular surface disease, lower-punctum malposition, entropion, corneal sequestrum, KCS.' },
          { breeds: ['Young cat, bilateral mucopurulent epiphora + sneezing'], group: 'signalment', tone: 'warning', html: 'feline URTI (FHV-1, FCV, Chlamydia, Mycoplasma).' },
          { breeds: ['Outdoor / hunting cat'], group: 'signalment', tone: 'danger', html: 'trauma, foreign body (grass awn), bite-wound dacryocystitis.' },
          { breeds: ['Senior cat, chronic unilateral epiphora ± facial swelling ± nasal discharge'], group: 'signalment', tone: 'green', html: 'nasal SCC, lymphoma, fungal rhinitis with NLS obstruction.' },
          { breeds: ['Kitten with symblepharon'], group: 'signalment', tone: 'info', html: 'severe neonatal FHV-1 with destroyed NLS punctum or canaliculus.' },
        ],
      },

      ...stepTable(3, 'OTHER HISTORY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Ask about', { text: 'Significance', tone: 'teal' }],
        rows: [
          ['<strong>Drugs / topicals</strong>', { text: bullets(['Recent topical anaesthetic or NSAID (reflex tearing as confounder)', 'Sulfonamides, etodolac (drug-induced KCS — paradoxical tearing as KCS evolves)', 'Recent dental / nasal surgery (post-op NLS damage)']), tone: 'teal' }],
          ['<strong>Trauma</strong>', { text: bullets(['Facial or eyelid trauma can lacerate the canaliculi or puncta → persistent epiphora', 'Corneal abrasion produces acute reflex tearing']), tone: 'teal' }],
          ['<strong>Concurrent dermatitis</strong>', { text: 'Atopy / food allergy → allergic conjunctivitis with bilateral serous tearing', tone: 'teal' }],
          ['<strong>Recent grooming / scenting</strong>', { text: 'Chemical irritation or grass-seed exposure — often unilateral acute wet eye with blepharospasm', tone: 'teal' }],
          ['<strong>Owner-perceived tear-staining vs true epiphora</strong>', { text: 'Cosmetic discoloration of fur without active disease is common — examine carefully before recommending treatment', tone: 'teal' }],
        ],
      }, '💊'),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        items: [
          `Acute unilateral wet eye + severe blepharospasm = FB or ulcer until proven otherwise`,
          `Chronic unilateral epiphora + epistaxis = nasal neoplasia`,
          `Mucopurulent epiphora unresponsive to topicals = consider dacryocystitis`,
          `Young dog with bilateral epiphora + no discomfort = congenital NLS anomaly`,
          `Concurrent KCS + reflex tearing = STT before any drops`,
        ],
        gap: 12,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Wet Eye',
    blocks: [
      ...stepTable(1, 'OBSERVE BEFORE TOUCHING', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Observe', { text: 'What to note', tone: 'teal' }],
        rows: [
          ['<strong>Tear track location</strong>', { text: bullets(['Medial canthus (early epiphora — overflow)', 'Full face track (chronic / severe)']), tone: 'teal' }],
          ['<strong>Discharge character</strong>', { text: bullets(['Serous', 'Mucoid', 'Mucopurulent', 'Sanguineous']), tone: 'teal' }],
          ['<strong>Blepharospasm / photophobia</strong>', { text: 'Pain → production cause', tone: 'teal' }],
          ['<strong>Eyelid conformation</strong>', { text: bullets(['Entropion', 'Ectropion', 'Macroblepharon (visible sclera)', 'Eyelid coloboma', 'Diamond eye (entropion + ectropion + macroblepharon)']), tone: 'teal' }],
          ['<strong>Globe position</strong>', { text: bullets(['Exophthalmos (orbital mass / NLS compression)', 'Proptosis history']), tone: 'teal' }],
          ['<strong>Facial symmetry</strong>', { text: bullets(['Unilateral facial swelling → dacryocystitis', 'Abscess', 'Neoplasia']), tone: 'teal' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'STRUCTURED OCULAR EXAM', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Looking for', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Eyelids</strong>`, { text: bullets(['Evert upper + lower with magnification — distichiasis (extra hairs from Meibomian gland openings)', 'Ectopic cilia (through palpebral conjunctiva — usually dorsal corneal linear ulcer)', 'Trichiasis (normal-position hairs contacting cornea)', 'Entropion / ectropion', 'Eyelid mass']), tone: 'teal' }],
          [`${numBadge(2)}<strong>Third eyelid (TEL)</strong>`, { text: bullets(['Evert under topical anaesthetic — FB classically hides here (grass awn, plant material)', 'Follicular hyperplasia', 'Cherry eye', 'Plasmoma']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Conjunctiva</strong>`, { text: bullets(['Hyperaemia distribution', 'Chemosis', 'FB', 'Neoplasia']), tone: 'teal' }],
          [`${numBadge(4)}<strong>Cornea</strong>`, { text: bullets(['Ulceration (fluorescein)', 'Neovascularisation pattern (superficial branching vs deep brush)', 'Sequestrum (🐱)', 'Pannus (GSD)']), tone: 'teal' }],
          [`${numBadge(5)}<strong>Lacrimal puncta</strong>`, { text: bullets(['Identify upper and lower puncta with magnification ± brief sedation — atresia', 'Micropuncta', 'Scarring', 'FB (a grass-awn fragment lodged in the punctum is easy to miss)']), tone: 'teal' }],
          [`${numBadge(6)}<strong>Iris / pupil / AC</strong>`, { text: 'Miosis + flare = uveitis (reflex tearing common) — <strong>rule out before steroids</strong>', tone: 'danger' }],
          [`${numBadge(7)}<strong>NLS region</strong>`, { text: bullets(['Palpate medial canthus and rostromedial maxilla for swelling (dacryocystitis)', 'Fluctuance (abscess)', 'Firm mass (neoplasia). Expressing the lacrimal sac may produce purulent material from the upper punctum — diagnostic of dacryocystitis']), tone: 'teal' }],
        ],
      }, '👁️'),

      ...stepPatterns(3, 'PATTERN RECOGNITION', {
        rows: [
          { section: 'Acute · unilateral' },
          { cues: ['Unilateral acute serous epiphora', 'blepharospasm', 'FB visible'], dx: 'Conjunctival / corneal FB · ectopic cilia', tone: 'danger' },
          { cues: ['Unilateral acute', 'fluorescein-positive defect', 'reflex miosis'], dx: 'Ulcerative keratitis', note: '(with reflex uveitis)', tone: 'danger' },
          { section: 'Bilateral' },
          { cues: ['Bilateral mucopurulent', 'lower STT', 'dull cornea'], dx: 'Keratoconjunctivitis sicca (KCS)', tone: 'warning' },
          { cues: ['Bilateral serous', 'chemosis', 'atopic dermatitis'], dx: 'Allergic conjunctivitis', tone: 'green' },
          { cues: ['Bilateral serous', 'sneezing', 'nasal discharge', 'young cat'], dx: 'Feline URTI (FHV-1 · FCV · Chlamydia)', tone: 'green' },
          { section: 'Chronic' },
          { cues: ['Unilateral chronic mucopurulent', 'medial canthal swelling', 'reflux on lacrimal sac press'], dx: 'Dacryocystitis', tone: 'warning' },
          { cues: ['Chronic bilateral wet eye in young dog', 'no discomfort', 'small / absent puncta'], dx: 'Congenital puncta atresia / micropuncta', tone: 'info' },
          { cues: ['Chronic unilateral wet eye', 'epistaxis ± facial deformity', 'older animal'], dx: 'Nasal / orbital neoplasia', tone: 'danger', emphasis: true },
          { section: 'Other patterns' },
          { cues: ['Concurrent entropion', 'ectropion', 'macroblepharon (large eyelid opening)'], dx: 'Diamond eye conformation', tone: 'warning' },
          { cues: ['Photophobia', 'blepharospasm but no surface lesion identified'], dx: 'Anterior uveitis — rule out flare + IOP', tone: 'danger' },
        ],
      }, '🔍'),

      ...stepTable(4, 'PROXYMETACAINE / PROPARACAINE TEST FOR PAIN', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Response at 2–3 min', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Spasm resolves</strong>', { text: 'Painful surface disease (ulcer · FB · ectopic cilia · distichiasis · KCS irritation) → re-examine for the source now the eyelid is relaxed', tone: 'teal' }],
          ['<strong>Spasm persists</strong>', { text: 'Likely true entropion or deeper pain (uveitis · orbital · dental) → surgical correction or further workup', tone: 'teal' }],
          ['<strong>Spastic vs true entropion</strong>', { text: bullets(['Spastic entropion is secondary to surface pain and resolves with relief', 'True entropion persists and requires Hotz-Celsus or similar correction']), tone: 'teal' }],
        ],
      }, '🧪'),
      { kind: 'note', html: `Apply one drop of topical anaesthetic and observe blepharospasm + tearing over 2–3 minutes.` },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Wet Eye — Diagnostics',
    blocks: [
      ...stepTable(1, 'STANDARD OPHTHALMIC BATTERY (ORDER MATTERS)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Schirmer Tear Test (STT-1) FIRST</strong>`, { text: 'Before any drops — KCS with paradoxical mucoid epiphora is the classical pitfall', tone: 'danger' }],
          [`${numBadge(2)}<strong>Conjunctival cytology / swab</strong>`, { text: bullets(['If mucopurulent — Gram stain', 'Culture + sensitivity', 'PCR (Chlamydia / Mycoplasma in cats)']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Fluorescein stain</strong>`, { text: 'Rule out ulcer + perform the <strong>Jones test</strong> simultaneously (no rinse; watch nostril ≤4 min)', tone: 'teal' }],
          [`${numBadge(4)}<strong>Tonometry</strong>`, { text: 'Exclude uveitis (↓ IOP) and glaucoma (↑ IOP) as occult drivers', tone: 'teal' }],
          [`${numBadge(5)}<strong>Topical anaesthetic + magnified eyelid exam</strong>`, { text: bullets(['Evert lids and TEL — distichiasis', 'Ectopic cilia', 'Conjunctival FB', 'Puncta atresia']), tone: 'teal' }],
          [`${numBadge(6)}<strong>Direct + indirect ophthalmoscopy</strong>`, { text: 'After pupil dilation (tropicamide 1% — after IOP)', tone: 'teal' }],
        ],
      }, '👁️'),

      ...stepTable(2, 'JONES TEST + NASOLACRIMAL FLUSH', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test / result', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Jones test — technique</strong>', { text: bullets(['Apply fluorescein into the lateral conjunctival fornix without rinsing', 'Observe the ipsilateral nostril (or oropharynx in brachycephalics) for ≤4 min']), tone: 'teal' }],
          ['<strong>Stain at nostril</strong>', { text: 'Patent system (Jones positive) — focus on increased-production differentials', tone: 'teal' }],
          ['<strong>No stain</strong>', { text: 'Does <strong>NOT</strong> confirm obstruction — many normal dogs (especially brachycephalics) are Jones-negative', tone: 'danger' }],
          ['<strong>NLS flush — technique</strong>', { text: bullets(['Under topical anaesthetic (± sedation in cats / fractious dogs) cannulate the upper punctum with a 22–24 G blunt-ended cannula', 'Inject 3–5 mL warm sterile saline']), tone: 'teal' }],
          ['<strong>Free flow from nostril and/or lower punctum</strong>', { text: 'Patent NLS', tone: 'teal' }],
          ['<strong>No flow or backflow</strong>', { text: bullets(['Obstruction — submit fluid for cytology / culture if mucopurulent', 'Consider grass-awn or other FB']), tone: 'teal' }],
          ['<strong>Excessive resistance</strong>', { text: 'Consider dacryolith or stricture', tone: 'teal' }],
          ['<strong>Dacryocystorhinography</strong>', { text: bullets(['Inject iohexol into the upper punctum and image with x-ray / fluoroscopy — identifies strictures', 'Dacryoliths', 'Fistulas', 'Neoplastic compression']), tone: 'teal' }],
          ['<strong>Lacrimal sac expression</strong>', { text: bullets(['Gentle pressure over the medial canthus / lacrimal sac, watching the upper punctum for purulent reflux — diagnostic of dacryocystitis', 'Submit material for cytology + C&amp;S']), tone: 'teal' }],
        ],
      }, '💧'),

      ...stepTable(3, 'TARGETED ADVANCED IMAGING', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Modality', { text: 'What it shows', tone: 'teal' }],
        rows: [
          ['<strong>CT of skull / orbit</strong><br>gold standard for NLS / orbital pathology in adult–senior patients', { text: bullets(['Confirms patency or obstruction at any level along the NLS', 'Defines neoplasia (orbital · nasal · paranasal sinus) compressing the NLS ("Bonny disease")', 'Identifies dental disease causing maxillary / lacrimal sac involvement', 'Identifies dacryolith or FB causing chronic dacryocystitis']), tone: 'teal' }],
          ['<strong>MRI</strong>', { text: bullets(['Better soft-tissue resolution for orbital / retrobulbar mass', 'Optic nerve sheath disease']), tone: 'teal' }],
          ['<strong>Rhinoscopy + nasal biopsy</strong>', { text: 'Chronic unilateral epiphora + nasal signs (epistaxis · sneezing · facial deformity)', tone: 'teal' }],
          ['<strong>Dental imaging</strong>', { text: 'Caudal maxillary tooth root disease can erode into the NLS or lacrimal sac and present as chronic epiphora ± dacryocystitis', tone: 'teal' }],
        ],
      }, '📊'),

      { kind: 'step', text: '💉 STEP 4 — TREATMENT OF SPECIFIC CAUSES', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Increased production (CN V irritation)',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Cause', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Ulcer / FB</strong>', { text: bullets(['Remove FB', 'Topical broad-spectrum antibiotic', 'Topical atropine if reflex uveitis', 'E-collar (LOC-RE-CORNEA-SUP)']), tone: 'teal' }],
          ['<strong>Distichiasis</strong>', { text: bullets(['Cryoepilation', 'Electroepilation', 'Surgical excision']), tone: 'teal' }],
          ['<strong>Ectopic cilia</strong>', { text: 'En-bloc surgical resection — recurrent dorsal ulcer in a young dog', tone: 'teal' }],
          ['<strong>Entropion</strong>', { text: bullets(['Hotz-Celsus or breed-specific procedure', 'Rule out spastic entropion with proxymetacaine first']), tone: 'teal' }],
          ['<strong>Trichiasis</strong>', { text: bullets(['Trim hairs (medial canthal trichiasis in brachycephalics)', 'Medial canthoplasty if structural']), tone: 'teal' }],
          ['<strong>KCS</strong>', { text: bullets(['Topical cyclosporine 0.2–2% BID lifelong', 'Treat secondary bacterial infection (LOC-RE-CONJ-KCS)']), tone: 'teal' }],
          ['<strong>Conjunctivitis</strong>', { text: bullets(['Cytology-guided topical antibiotic', 'Systemic doxycycline for Chlamydia / Mycoplasma in cats']), tone: 'teal' }],
          ['<strong>Anterior uveitis</strong>', { text: 'Topical steroid + atropine + treat the underlying cause (LOC-RE-UVEA)', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Reduced drainage',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Cause', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Lacrimal puncta atresia</strong>', { text: 'Surgical resection of the membrane covering the punctum', tone: 'teal' }],
          ['<strong>Micropuncta</strong>', { text: 'Surgical enlargement — snip / canthoplasty', tone: 'teal' }],
          ['<strong>Dacryocystitis</strong>', { text: bullets(['NLS flush + topical antibiotic', 'Consider an indwelling silicone NLS catheter for 2–4 weeks', 'Investigate for occult FB']), tone: 'teal' }],
          ['<strong>Entropion / ectropion / euryblepharon / diamond eye</strong>', { text: bullets(['Surgical correction — Hotz-Celsus', 'Modified Kuhnt-Szymanowski', 'Lateral canthoplasty']), tone: 'teal' }],
          ['<strong>Orbital / nasal neoplasia</strong>', { text: bullets(['Refer for staging + oncology — CT', 'Biopsy', 'Radiation / chemotherapy / palliation']), tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Pearls:</strong><br>
  • STT before any drops — KCS with paradoxical reflex tearing is missed otherwise.<br>
  • Tear stain alone in a brachycephalic / toy breed without ocular pain or discharge is often cosmetic — do not over-treat.<br>
  • Foreign bodies under the TEL are a classic miss — always evert.<br>
  • Topical broad-spectrum antibiotics will not resolve dacryocystitis without addressing the obstruction.<br>
  • A persistent unilateral wet eye in an older patient should never be dismissed as "tear staining" — image to exclude orbital / nasal neoplasia.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
