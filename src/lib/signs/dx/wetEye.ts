// ── Wet Eye / Epiphora — diagnostic approach (data) ──────────────────────────
// Migration of wetEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../wetEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const wetEyeDx: DxApproach = {
  title: 'Wet Eye / Epiphora',
  tabs: {

  history: {
    title: 'History: Wet Eye',
    blocks: [
      { kind: 'branch', text: 'CHARACTERISE THE EPIPHORA' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
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
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">🧪 Discharge character</strong><br>
      Serous (clear) vs mucoid vs mucopurulent<br>
      Unilateral vs bilateral<br>
      <span style="opacity:.75;">Mucopurulent → bacterial / dacryocystitis</span>`,
          },
        ],
      },

      ...stepTable(1, 'ONSET + DURATION', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Acute</strong><br>hours–days', { text: 'Ulcer · foreign body · conjunctivitis · acute uveitis (with concurrent miosis + flare) · ectopic cilia (often acute presentation despite chronic anatomy)', tone: 'teal' }],
          ['<strong>Subacute</strong><br>days–weeks', { text: 'Dacryocystitis · KCS-related reflex tearing · persistent FB (grass awn under TEL) · early uveitis · viral / allergic conjunctivitis', tone: 'teal' }],
          ['<strong>Chronic / lifelong</strong><br>months–years', { text: 'Congenital NLS atresia / micropuncta (puppy · kitten) · distichiasis (often well-tolerated) · brachycephalic ocular surface disease · ectropion / euryblepharon with poor drainage · pannus / plasmoma · idiopathic dacryocystitis (intermittent)', tone: 'teal' }],
          ['<strong>Chronic with discharge change</strong>', { text: 'Dacryocystitis (mucopurulent, waxing/waning) · orbital or nasal neoplasia (unilateral, progressive ± epistaxis)', tone: 'teal' }],
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
          ['<strong>Drugs / topicals</strong>', { text: 'Recent topical anaesthetic or NSAID (reflex tearing as confounder) · sulfonamides, etodolac (drug-induced KCS — paradoxical tearing as KCS evolves) · recent dental / nasal surgery (post-op NLS damage)', tone: 'teal' }],
          ['<strong>Trauma</strong>', { text: 'Facial or eyelid trauma can lacerate the canaliculi or puncta → persistent epiphora; corneal abrasion produces acute reflex tearing', tone: 'teal' }],
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
        html: `Acute unilateral wet eye + severe blepharospasm = FB or ulcer until proven otherwise · Chronic unilateral epiphora + epistaxis = nasal neoplasia · Mucopurulent epiphora unresponsive to topicals = consider dacryocystitis · Young dog with bilateral epiphora + no discomfort = congenital NLS anomaly · Concurrent KCS + reflex tearing = STT before any drops`,
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
          ['<strong>Tear track location</strong>', { text: 'Medial canthus (early epiphora — overflow) · full face track (chronic / severe)', tone: 'teal' }],
          ['<strong>Discharge character</strong>', { text: 'Serous · mucoid · mucopurulent · sanguineous', tone: 'teal' }],
          ['<strong>Blepharospasm / photophobia</strong>', { text: 'Pain → production cause', tone: 'teal' }],
          ['<strong>Eyelid conformation</strong>', { text: 'Entropion · ectropion · macroblepharon (visible sclera) · eyelid coloboma · diamond eye (entropion + ectropion + macroblepharon)', tone: 'teal' }],
          ['<strong>Globe position</strong>', { text: 'Exophthalmos (orbital mass / NLS compression) · proptosis history', tone: 'teal' }],
          ['<strong>Facial symmetry</strong>', { text: 'Unilateral facial swelling → dacryocystitis · abscess · neoplasia', tone: 'teal' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'STRUCTURED OCULAR EXAM', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Looking for', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Eyelids</strong>`, { text: 'Evert upper + lower with magnification — distichiasis (extra hairs from Meibomian gland openings) · ectopic cilia (through palpebral conjunctiva — usually dorsal corneal linear ulcer) · trichiasis (normal-position hairs contacting cornea) · entropion / ectropion · eyelid mass', tone: 'teal' }],
          [`${numBadge(2)}<strong>Third eyelid (TEL)</strong>`, { text: 'Evert under topical anaesthetic — FB classically hides here (grass awn, plant material) · follicular hyperplasia · cherry eye · plasmoma', tone: 'teal' }],
          [`${numBadge(3)}<strong>Conjunctiva</strong>`, { text: 'Hyperaemia distribution · chemosis · FB · neoplasia', tone: 'teal' }],
          [`${numBadge(4)}<strong>Cornea</strong>`, { text: 'Ulceration (fluorescein) · neovascularisation pattern (superficial branching vs deep brush) · sequestrum (🐱) · pannus (GSD)', tone: 'teal' }],
          [`${numBadge(5)}<strong>Lacrimal puncta</strong>`, { text: 'Identify upper and lower puncta with magnification ± brief sedation — atresia · micropuncta · scarring · FB (a grass-awn fragment lodged in the punctum is easy to miss)', tone: 'teal' }],
          [`${numBadge(6)}<strong>Iris / pupil / AC</strong>`, { text: 'Miosis + flare = uveitis (reflex tearing common) — <strong>rule out before steroids</strong>', tone: 'danger' }],
          [`${numBadge(7)}<strong>NLS region</strong>`, { text: 'Palpate medial canthus and rostromedial maxilla for swelling (dacryocystitis) · fluctuance (abscess) · firm mass (neoplasia). Expressing the lacrimal sac may produce purulent material from the upper punctum — diagnostic of dacryocystitis', tone: 'teal' }],
        ],
      }, '👁️'),

      ...stepTable(3, 'PATTERN RECOGNITION', {
        cols: '1fr 1.2fr',
        dividers: true,
        headers: ['Finding', { text: 'Most likely', tone: 'teal' }],
        rows: [
          ['Unilateral acute serous epiphora + blepharospasm + FB visible', { text: 'Conjunctival / corneal FB · ectopic cilia', tone: 'danger' }],
          ['Unilateral acute + fluorescein-positive defect + reflex miosis', { text: 'Ulcerative keratitis (with reflex uveitis)', tone: 'danger' }],
          ['Bilateral mucopurulent + lower STT + dull cornea', { text: 'Keratoconjunctivitis sicca (KCS)', tone: 'warning' }],
          ['Bilateral serous + chemosis + atopic dermatitis', { text: 'Allergic conjunctivitis', tone: 'green' }],
          ['Bilateral serous + sneezing + nasal discharge + young cat', { text: 'Feline URTI (FHV-1 · FCV · Chlamydia)', tone: 'green' }],
          ['Unilateral chronic mucopurulent + medial canthal swelling + reflux on lacrimal sac press', { text: 'Dacryocystitis', tone: 'warning' }],
          ['Chronic bilateral wet eye in young dog + no discomfort + small / absent puncta', { text: 'Congenital puncta atresia / micropuncta', tone: 'info' }],
          ['Chronic unilateral wet eye + epistaxis ± facial deformity + older animal', { text: 'Nasal / orbital neoplasia', tone: 'danger' }],
          ['Concurrent entropion + ectropion + macroblepharon (large eyelid opening)', { text: 'Diamond eye conformation', tone: 'warning' }],
          ['Photophobia + blepharospasm but no surface lesion identified', { text: 'Anterior uveitis — rule out flare + IOP', tone: 'danger' }],
        ],
      }, '🔍'),

      ...stepTable(4, 'PROXYMETACAINE / PROPARACAINE TEST FOR PAIN', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Response at 2–3 min', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Spasm resolves</strong>', { text: 'Painful surface disease (ulcer · FB · ectopic cilia · distichiasis · KCS irritation) → re-examine for the source now the eyelid is relaxed', tone: 'teal' }],
          ['<strong>Spasm persists</strong>', { text: 'Likely true entropion or deeper pain (uveitis · orbital · dental) → surgical correction or further workup', tone: 'teal' }],
          ['<strong>Spastic vs true entropion</strong>', { text: 'Spastic entropion is secondary to surface pain and resolves with relief; true entropion persists and requires Hotz-Celsus or similar correction', tone: 'teal' }],
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
          [`${numBadge(2)}<strong>Conjunctival cytology / swab</strong>`, { text: 'If mucopurulent — Gram stain · culture + sensitivity · PCR (Chlamydia / Mycoplasma in cats)', tone: 'teal' }],
          [`${numBadge(3)}<strong>Fluorescein stain</strong>`, { text: 'Rule out ulcer + perform the <strong>Jones test</strong> simultaneously (no rinse; watch nostril ≤4 min)', tone: 'teal' }],
          [`${numBadge(4)}<strong>Tonometry</strong>`, { text: 'Exclude uveitis (↓ IOP) and glaucoma (↑ IOP) as occult drivers', tone: 'teal' }],
          [`${numBadge(5)}<strong>Topical anaesthetic + magnified eyelid exam</strong>`, { text: 'Evert lids and TEL — distichiasis · ectopic cilia · conjunctival FB · puncta atresia', tone: 'teal' }],
          [`${numBadge(6)}<strong>Direct + indirect ophthalmoscopy</strong>`, { text: 'After pupil dilation (tropicamide 1% — after IOP)', tone: 'teal' }],
        ],
      }, '👁️'),

      ...stepTable(2, 'JONES TEST + NASOLACRIMAL FLUSH', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test / result', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Jones test — technique</strong>', { text: 'Apply fluorescein into the lateral conjunctival fornix without rinsing; observe the ipsilateral nostril (or oropharynx in brachycephalics) for ≤4 min', tone: 'teal' }],
          ['<strong>Stain at nostril</strong>', { text: 'Patent system (Jones positive) — focus on increased-production differentials', tone: 'teal' }],
          ['<strong>No stain</strong>', { text: 'Does <strong>NOT</strong> confirm obstruction — many normal dogs (especially brachycephalics) are Jones-negative', tone: 'danger' }],
          ['<strong>NLS flush — technique</strong>', { text: 'Under topical anaesthetic (± sedation in cats / fractious dogs) cannulate the upper punctum with a 22–24 G blunt-ended cannula; inject 3–5 mL warm sterile saline', tone: 'teal' }],
          ['<strong>Free flow from nostril and/or lower punctum</strong>', { text: 'Patent NLS', tone: 'teal' }],
          ['<strong>No flow or backflow</strong>', { text: 'Obstruction — submit fluid for cytology / culture if mucopurulent; consider grass-awn or other FB', tone: 'teal' }],
          ['<strong>Excessive resistance</strong>', { text: 'Consider dacryolith or stricture', tone: 'teal' }],
          ['<strong>Dacryocystorhinography</strong>', { text: 'Inject iohexol into the upper punctum and image with x-ray / fluoroscopy — identifies strictures · dacryoliths · fistulas · neoplastic compression', tone: 'teal' }],
          ['<strong>Lacrimal sac expression</strong>', { text: 'Gentle pressure over the medial canthus / lacrimal sac, watching the upper punctum for purulent reflux — diagnostic of dacryocystitis. Submit material for cytology + C&amp;S', tone: 'teal' }],
        ],
      }, '💧'),

      ...stepTable(3, 'TARGETED ADVANCED IMAGING', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Modality', { text: 'What it shows', tone: 'teal' }],
        rows: [
          ['<strong>CT of skull / orbit</strong><br>gold standard for NLS / orbital pathology in adult–senior patients', { text: 'Confirms patency or obstruction at any level along the NLS · defines neoplasia (orbital · nasal · paranasal sinus) compressing the NLS ("Bonny disease") · identifies dental disease causing maxillary / lacrimal sac involvement · identifies dacryolith or FB causing chronic dacryocystitis', tone: 'teal' }],
          ['<strong>MRI</strong>', { text: 'Better soft-tissue resolution for orbital / retrobulbar mass · optic nerve sheath disease', tone: 'teal' }],
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
          ['<strong>Ulcer / FB</strong>', { text: 'Remove FB · topical broad-spectrum antibiotic · topical atropine if reflex uveitis · E-collar (LOC-RE-CORNEA-SUP)', tone: 'teal' }],
          ['<strong>Distichiasis</strong>', { text: 'Cryoepilation · electroepilation · surgical excision', tone: 'teal' }],
          ['<strong>Ectopic cilia</strong>', { text: 'En-bloc surgical resection — recurrent dorsal ulcer in a young dog', tone: 'teal' }],
          ['<strong>Entropion</strong>', { text: 'Hotz-Celsus or breed-specific procedure; rule out spastic entropion with proxymetacaine first', tone: 'teal' }],
          ['<strong>Trichiasis</strong>', { text: 'Trim hairs (medial canthal trichiasis in brachycephalics); medial canthoplasty if structural', tone: 'teal' }],
          ['<strong>KCS</strong>', { text: 'Topical cyclosporine 0.2–2% BID lifelong; treat secondary bacterial infection (LOC-RE-CONJ-KCS)', tone: 'teal' }],
          ['<strong>Conjunctivitis</strong>', { text: 'Cytology-guided topical antibiotic; systemic doxycycline for Chlamydia / Mycoplasma in cats', tone: 'teal' }],
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
          ['<strong>Dacryocystitis</strong>', { text: 'NLS flush + topical antibiotic; consider an indwelling silicone NLS catheter for 2–4 weeks; investigate for occult FB', tone: 'teal' }],
          ['<strong>Entropion / ectropion / euryblepharon / diamond eye</strong>', { text: 'Surgical correction — Hotz-Celsus · modified Kuhnt-Szymanowski · lateral canthoplasty', tone: 'teal' }],
          ['<strong>Orbital / nasal neoplasia</strong>', { text: 'Refer for staging + oncology — CT · biopsy · radiation / chemotherapy / palliation', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'alert',
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
