// ── Diarrhoea — diagnostic approach (data) ──────────────────────────────────
// Migration of diarrhoea{History,Exam,Dx,Sec}Html (legacy HTML consts in
// ../diarrhoea.ts) to the typed DxApproach model. Rendered by renderDxApproach.
// Non-standard 4-tab nav (adds 'sec').

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const diarrhoeaDx: DxApproach = {
  title: 'Diarrhoea',
  navVariant: 'alt',
  nav: [
    { key: 'history', label: '📋 History' },
    { key: 'exam', label: '🩺 Exam' },
    { key: 'dx', label: '🔬 Diagnostics' },
    { key: 'sec', label: '🟠 Secondary' },
  ],
  tabs: {

    history: {
      title: 'History: Diarrhoea',
      blocks: [
        { kind: 'branch', text: 'SB OR LB LOCALISATION' },
        {
          kind: 'row',
          cols: 2,
          items: [
            {
              style: 'text-align:left;font-size:9px;',
              html: `<strong style="font-size:10px;">🟡 Small bowel</strong><br>
      Large volume · Normal or mildly ↑ freq<br>
      No tenesmus · Weight loss common<br>
      Melaena · Steatorrhoea (→ run TLI)<br>
      Watery or soft · Malabsorption signs`,
            },
            {
              style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
              html: `<strong style="font-size:10px;">🔵 Large bowel</strong><br>
      Small volume · Markedly ↑ freq<br>
      Tenesmus, urgency, dyschezia<br>
      Mucus · Haematochezia<br>
      Weight loss uncommon`,
            },
          ],
        },

        ...stepTable(1, 'KEY HISTORY', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Ask about', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Duration + onset</strong>', { text: 'Acute (&lt;3 wk) or chronic (&gt;3 wk)?', tone: 'teal' }],
            ['<strong>Diet</strong>', { text: 'Recent change? Raw diet? Novel exposures? Treats · chews · table scraps?', tone: 'teal' }],
            ['<strong>Parasites</strong>', { text: 'Worming history? Last treatment? Which product?', tone: 'teal' }],
            ['<strong>Vaccination</strong>', { text: 'Up to date? Parvo · distemper in young unvaccinated animals', tone: 'teal' }],
            ['<strong>Medications</strong>', { text: 'NSAIDs · antibiotics · corticosteroids · chemotherapy', tone: 'teal' }],
            ['<strong>Environment</strong>', { text: 'Outdoor access? Boarding? Shelter? Multiple pets? Travel?', tone: 'teal' }],
            ['<strong>Water source</strong>', { text: 'Ponds · creeks · standing water — Giardia · Heterobilharzia', tone: 'teal' }],
            ['<strong>Weight change</strong>', { text: 'Progressive loss? Polyphagia despite weight loss (EPI)?', tone: 'teal' }],
          ],
        }, '📋'),

        ...stepTable(2, 'SIGNALMENT + BREED CLUES', {
          cols: '0.9fr 1.25fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young + unvaccinated</strong>', { text: 'Parvovirus · parasites', tone: 'teal' }],
            ['<strong>Young + polyphagia + weight loss</strong>', { text: 'EPI — GSD · CKCS · Chow Chow · Rough Collie', tone: 'teal' }],
            ['<strong>Middle-aged + chronic ± vomiting</strong>', { text: 'IBD / small cell lymphoma (🐱)', tone: 'teal' }],
            ['<strong>Yorkshire Terrier / Wheaten Terrier</strong>', { text: 'Lymphangiectasia + PLE', tone: 'teal' }],
            ['<strong>Boxer / French Bulldog</strong>', { text: 'Granulomatous colitis (AIEC)', tone: 'teal' }],
            ['<strong>🐱 Cat + chronic diarrhoea + weight loss</strong>', { text: 'Hyperthyroidism · small cell lymphoma · IBD', tone: 'teal' }],
            ['<strong>🐕 Dog + waxing/waning GI signs</strong>', { text: '<strong>Addison\'s</strong> — run <strong>basal cortisol</strong> first to rule out; &lt;55 nmol/L → ACTH stim', tone: 'danger' }],
            ['<strong>🐕 Dog + Gulf Coast / tropical</strong>', { text: '<em>Heterobilharzia americana</em>', tone: 'teal' }],
          ],
        }, '🐾'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS',
          html: `Young unvaccinated + haemorrhagic (parvo) · Profuse haemorrhagic diarrhoea (AHDS/HGE) · Acute abdomen · Severe dehydration/shock · Palpable mass or intussusception`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Diarrhoea',
      blocks: [
        { kind: 'step', text: '🩺 PHYSICAL EXAMINATION', noArrowAfter: true },
        {
          kind: 'gridTable',
          label: 'General',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Assess', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>BCS / MCS</strong>', { text: 'Weight loss → chronicity · malabsorption · protein loss', tone: 'teal' }],
            ['<strong>Coat / skin</strong>', { text: 'Poor coat quality (EPI · PLE · hypoalbuminaemia) · pruritus + otitis (food-responsive)', tone: 'teal' }],
            ['<strong>Mucous membranes</strong>', { text: 'Pallor (blood loss · anaemia) · icterus (hepatic / haemolytic)', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Abdomen',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Thickened intestinal loops</strong>', { text: 'IBD · lymphoma · infiltrative disease', tone: 'teal' }],
            ['<strong>Palpable mass / intussusception</strong>', { text: 'Obstructive or neoplastic disease', tone: 'danger' }],
            ['<strong>Pain on palpation</strong>', { text: 'Pancreatitis · peritonitis · intussusception', tone: 'teal' }],
            ['<strong>Fluid wave / tympany</strong>', { text: 'Ascites → hypoalbuminaemia · lymphangiectasia · PLE', tone: 'teal' }],
            ['<strong>Borborygmi / gas</strong>', { text: 'Malabsorption · EPI · rapid motility', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Digital rectal exam — ESSENTIAL IN ALL PATIENTS',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Rectal lumen</strong>', { text: 'Mass or stricture', tone: 'danger' }],
            ['<strong>Faecal character</strong>', { text: 'Melaena vs haematochezia vs mucus', tone: 'teal' }],
            ['<strong>Anal tone · perineum</strong>', { text: 'Neurological and perineal disease', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Systemic',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Assess', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Peripheral lymph nodes</strong>', { text: 'Generalised lymphadenopathy — lymphoma · fungal · systemic disease', tone: 'teal' }],
            ['<strong>🐱 Thyroid</strong>', { text: 'Goitre or asymmetric lobe → hyperthyroidism', tone: 'teal' }],
            ['<strong>Cavitary effusions</strong>', { text: 'Pleural dullness · pericardial muffling — hypoalbuminaemia · lymphangiectasia', tone: 'teal' }],
            ['<strong>Oedema</strong>', { text: 'Peripheral pitting oedema — hypoalbuminaemia · lymphangiectasia', tone: 'teal' }],
            ['<strong>Eyes / CNS</strong>', { text: 'Hepatic encephalopathy signs (PSS) · uveitis (systemic disease)', tone: 'teal' }],
          ],
        },
      ],
      after: [
        {
          kind: 'html',
          html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px;">
  <div style="font-size:10px;color:var(--gray);line-height:1.6;">
    💡 <strong style="color:var(--white);">Digital rectal exam</strong> is mandatory — rectal masses, polyps and strictures are missed without it.<br>
    💡 <strong style="color:var(--white);">Ascites + hypoalbuminaemia</strong> — check albumin AND globulin. Panhypoproteinaemia = PLE.
  </div>
</div>`,
        },
        { kind: 'disclaimer' },
      ],
    },

    dx: {
      title: 'Dx: Diarrhoea',
      blocks: [
        { kind: 'step', text: 'SB vs LB — KEY FEATURES' },
        {
          kind: 'row',
          cols: 2,
          items: [
            {
              style: 'text-align:left;font-size:9px;',
              html: `<strong style="font-size:10px;">🔵 Small Bowel</strong><br>
      Large volume · Low freq (3–5×/day)<br>
      Weight loss common · Melaena<br>
      Steatorrhoea (→ run TLI) · Borborygmi<br>
      Vomiting ±`,
            },
            {
              style: 'text-align:left;background:rgba(13,148,136,0.2);border-color:rgba(13,148,136,0.45);font-size:9px;',
              html: `<strong style="font-size:10px;color:var(--tone-teal-fg);">🟢 Large Bowel</strong><br>
      Small volume · High freq (&gt;5×/day)<br>
      Tenesmus · Urgency · Mucus<br>
      Haematochezia · No weight loss<br>
      Usually primary GI — systemic workup rarely needed`,
            },
          ],
        },
        {
          kind: 'html',
          html: `<div style="background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.35);border-left:3px solid #14B8A6;border-radius:10px;padding:10px 12px;">
    <div style="font-size:10px;font-weight:700;color:var(--tone-teal-fg);margin-bottom:4px;">🟢 LB FIRST — DIGITAL RECTAL EXAM</div>
    <div style="font-size:10.5px;color:var(--white);">Mandatory before any further diagnostics in LB disease. Palpate for mass, stricture, polyp, mucosal irregularity, pain. A rectal mass found here changes the entire workup.</div>
  </div>`,
        },

        { kind: 'step', text: '💊 STEP 1 — EMPIRIC MEDICAL MANAGEMENT', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Measure', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Antiparasitic</strong> — give in <em>all</em> cases regardless of faecal result', { text: '<strong>Fenbendazole 50 mg/kg PO SID ×5 days</strong> — covers Giardia · roundworms · hookworms · whipworms. Re-dose at 3 and 6 weeks if LB diarrhoea (whipworm ova shed intermittently — flotation often false-negative)', tone: 'warning' }],
            ['<strong>Bland diet</strong>', { text: 'Boiled chicken + rice, or commercial GI diet × 3–5 days (acute) — reduces antigenic load, highly digestible', tone: 'teal' }],
            ['<strong>Novel protein / hydrolysed diet trial</strong>', { text: '4–6 weeks exclusive if food-responsive enteropathy suspected after the acute phase — <strong>no treats, chews, or flavoured medications</strong>', tone: 'teal' }],
            ['<strong>Highly digestible low-fat diet</strong>', { text: 'Reduces osmotic load in malabsorptive / SB diarrhoea', tone: 'teal' }],
            ['<strong>Kaolin-pectin</strong>', { text: 'Coats and soothes mucosa · binds bacterial toxins · safe in all species', tone: 'teal' }],
            ['<strong>Smectite (diosmectite)</strong>', { text: 'Binds toxins and pathogens · mucosal barrier support', tone: 'teal' }],
            ['<strong>Sucralfate</strong>', { text: '0.5–1 g PO TID — if mucosal ulceration suspected (haemorrhagic diarrhoea · known NSAID use)', tone: 'teal' }],
            ['<strong>Probiotics</strong>', { text: '<em>Enterococcus faecium</em> SF68 (FortiFlora®) or a multi-strain probiotic — supports microbiome recovery; recommended alongside antibiotics if used', tone: 'teal' }],
            ['<strong>Metronidazole</strong>', { text: '10–15 mg/kg PO BID × 5–7 days — anti-anaerobic + anti-Giardia; consider if haemorrhagic, mucosal, or high Giardia suspicion. <strong>Avoid routine use in every case</strong> — emerging resistance and microbiome disruption', tone: 'danger' }],
            ['<strong>Fluid + electrolyte support</strong>', { text: 'Oral electrolyte solution if mild–moderate dehydration and not vomiting · IV fluids (Hartmann\'s / Plasma-Lyte) if moderate–severe dehydration, vomiting or collapse', tone: 'teal' }],
          ],
        },
        {
          kind: 'callout',
          tone: 'green',
          title: '🟢 LARGE BOWEL',
          html: `<strong>High-fibre supplementation first line</strong> — psyllium husk / wheat bran 1–6 tsp/day OR commercial high-fibre diet for 3–4 weeks. Effective for idiopathic LB diarrhoea and stress colitis. Fenbendazole course ×3 (repeat at 3 and 6 weeks) to cover <em>Trichuris vulpis</em> even if flotation negative. Avoid metronidazole as sole treatment — address fibre and parasites first.`,
        },

        { kind: 'step', text: '🔬 STEP 2 — FAECAL PANEL', noArrowAfter: true },
        {
          kind: 'gridTable',
          label: 'Minimum panel',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Test', { text: 'Detects', tone: 'teal' }],
          rows: [
            ['<strong>Direct wet mount</strong>', { text: 'Motile Giardia trophozoites · other protozoa', tone: 'teal' }],
            ['<strong>Giardia ELISA / SNAP</strong>', { text: 'More sensitive than wet mount alone', tone: 'teal' }],
            ['<strong>Parvovirus SNAP</strong>', { text: 'Young or unvaccinated animals — do not delay', tone: 'danger' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Extended panel — chronic · no response to empiric treatment · systemic signs',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Test', { text: 'Detects', tone: 'teal' }],
          rows: [
            ['<strong>ZnSO₄ centrifugal flotation ×3</strong>', { text: 'Helminth ova · protozoan cysts — serial samples improve sensitivity', tone: 'teal' }],
            ['<strong>Cryptosporidium</strong>', { text: 'Acid-fast stain or faecal PCR — young / immunocompromised', tone: 'teal' }],
            ['<strong>Faecal PCR panel</strong>', { text: 'Salmonella · Campylobacter · <em>Clostridium perfringens</em> toxin / <em>difficile</em>', tone: 'teal' }],
            ['<strong>Faecal sedimentation</strong>', { text: '<em>Heterobilharzia americana</em> ova — Gulf Coast dogs', tone: 'teal' }],
          ],
        },
        {
          kind: 'callout',
          tone: 'green',
          title: '🟢 LARGE BOWEL',
          html: `Priority target is <strong><em>Trichuris vulpis</em></strong> — ova shed intermittently, flotation frequently negative; treat empirically regardless. <strong>Cats:</strong> <em>Tritrichomonas foetus</em> — <strong>InPouch culture or faecal PCR</strong> (young cats, crowded environments); NOT detected on routine flotation. Treat with ronidazole 30–50 mg/kg PO SID ×14 days. Faecal culture if haemorrhagic, febrile, or zoonotic risk.`,
        },

        { kind: 'step', text: '🩸 STEP 3 — BLOODWORK<span style="font-weight:400;font-size:9px;opacity:.8;"> · not resolving after empiric Rx · chronic (&gt;3 wk) · weight loss · systemic signs</span>', noArrowAfter: true },
        {
          kind: 'gridTable',
          label: 'CBC',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Leucopenia</strong>', { text: 'Parvovirus / panleukopenia — young unvaccinated', tone: 'teal' }],
            ['<strong>Eosinophilia</strong>', { text: 'Parasitism · dietary hypersensitivity · eosinophilic enteritis', tone: 'teal' }],
            ['<strong>Absent stress leukogram in a sick dog</strong>', { text: '<strong>Hypoadrenocorticism</strong>', tone: 'danger' }],
            ['<strong>Regenerative anaemia</strong>', { text: 'GI haemorrhage / blood loss', tone: 'teal' }],
            ['<strong>Lymphopenia</strong>', { text: 'Lymphangiectasia / PLE', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Serum biochemistry & urinalysis',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>↓ Albumin + ↓ Globulin</strong> (panhypoproteinaemia)', { text: '<strong>PLE</strong> — lymphangiectasia · IBD · neoplasia', tone: 'teal' }],
            ['<strong>↓ Albumin alone</strong>', { text: 'Hepatic disease · malabsorption · GI loss', tone: 'teal' }],
            ['<strong>Na:K &lt;27</strong>', { text: '<strong>Classical hypoadrenocorticism</strong> — confirm with ACTH stimulation', tone: 'danger' }],
            ['<strong>Absent stress leukogram + normal Na:K</strong>', { text: '<strong>Atypical hypoadrenocorticism</strong> — run <strong>basal cortisol</strong>; &lt;55 nmol/L or ongoing suspicion → <strong>ACTH stimulation test</strong>', tone: 'danger' }],
            ['<strong>↑ ALT / ALP / GGT + ↓ albumin</strong>', { text: 'Hepatic disease · <strong>PSS</strong>', tone: 'teal' }],
            ['<strong>↓ BUN + ↓ albumin + ↓ cholesterol + ↑ liver enzymes ± ↑ ammonia</strong>', { text: '<strong>PSS (portosystemic shunt)</strong>', tone: 'teal' }],
            ['<strong>🐱 Serum T4 — ALL cats with chronic diarrhoea</strong>', { text: 'Hyperthyroidism', tone: 'teal' }],
            ['<strong>🐱 ↑ fPLI + ↑ ALT</strong>', { text: 'Triaditis — pancreatitis + cholangitis + IBD', tone: 'teal' }],
            ['<strong>USG &lt;1.030 in a dehydrated dog</strong>', { text: 'CKD · hypoadrenocorticism · DI', tone: 'teal' }],
            ['<strong>Ammonium biurate crystals</strong>', { text: '<strong>PSS</strong>', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'GI-specific panel — chronic SB diarrhoea · steatorrhoea · weight loss',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>cTLI (🐕) / fTLI (🐱)</strong>', { text: 'EPI — cTLI &lt;2.5 μg/L diagnostic · fTLI &lt;8 μg/L. <em>Must be a fasted sample</em>', tone: 'teal' }],
            ['<strong>Serum cobalamin (B12)</strong>', { text: 'Low in EPI · severe ileal disease · severe IBD. Supplement <strong>all</strong> EPI cats regardless of level', tone: 'teal' }],
            ['<strong>Serum folate</strong>', { text: 'Elevated with proximal SI SIBO · low with proximal SI mucosal disease', tone: 'teal' }],
            ['<strong>fPLI / cPLI</strong>', { text: 'Pancreatitis — the most sensitive and specific serum marker', tone: 'teal' }],
          ],
        },
        {
          kind: 'callout',
          tone: 'green',
          title: '🟢 LARGE BOWEL',
          html: `Bloodwork usually normal in straightforward LB disease. Run if: weight loss, systemic signs, haemorrhagic diarrhoea, refractory to empiric treatment, or patient &gt;7 years old. GI-specific panel (TLI / cobalamin / folate) not routinely indicated — only if concurrent SB signs or systemic disease suspected.`,
        },

        { kind: 'step', text: '📊 STEP 4 — ABDOMINAL IMAGING<span style="font-weight:400;font-size:9px;opacity:.8;"> · chronic · weight loss · palpable abnormality</span>', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Survey radiograph — reduced serosal detail</strong>', { text: 'Effusion — hypoalbuminaemia · PLE · lymphangiectasia', tone: 'teal' }],
            ['<strong>Survey radiograph — organomegaly / gas pattern</strong>', { text: 'Hepatomegaly · splenomegaly · obstruction', tone: 'teal' }],
            ['<strong>US — SI wall thickening</strong>', { text: '<em>Layering preserved + thickened</em> → IBD / enteritis · <em>layering lost</em> → neoplasia', tone: 'teal' }],
            ['<strong>US — mesenteric lymphadenopathy</strong>', { text: 'IBD · lymphoma · systemic disease', tone: 'teal' }],
            ['<strong>US — pancreatic changes</strong>', { text: 'Pancreatitis · EPI (atrophy)', tone: 'teal' }],
            ['<strong>US — bilateral small adrenal glands</strong>', { text: 'Hypoadrenocorticism', tone: 'teal' }],
            ['<strong>US — hepatic architecture / gallbladder / bile duct thickening</strong>', { text: 'Hepatic or biliary disease · triaditis (🐱)', tone: 'teal' }],
            ['<strong>US — microhepatica + renomegaly</strong>', { text: '<strong>PSS (portosystemic shunt)</strong>', tone: 'teal' }],
          ],
        },
        {
          kind: 'callout',
          tone: 'green',
          title: '🟢 LARGE BOWEL',
          html: `Lower yield in straightforward LB disease. Ultrasound useful for colonic wall thickening and mesenteric LN if chronic or severe. Rectal exam and colonoscopy are higher-yield.`,
        },

        { kind: 'step', text: '🔬 STEP 5 — ENDOSCOPY + BIOPSY<span style="font-weight:400;font-size:9px;opacity:.8;"> · dietary trial failed · systemic causes excluded · progressive weight loss</span>', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Full-thickness surgical biopsy</strong> — preferred', { text: 'Necessary for lymphoma subtyping and transmural disease (pythiosis · histoplasmosis)', tone: 'teal' }],
            ['<strong>PARR PCR on biopsy</strong>', { text: 'If lymphoma suspected — sensitivity ~70%; a negative does <strong>not</strong> exclude', tone: 'teal' }],
            ['<strong>Culture + sensitivity</strong>', { text: 'If an infectious aetiology is not fully excluded', tone: 'teal' }],
            ['<strong>Duodenal aspirate for quantitative culture</strong>', { text: 'If SIBO suspected', tone: 'teal' }],
          ],
        },
        {
          kind: 'callout',
          tone: 'green',
          title: '🟢 LARGE BOWEL',
          html: `<strong>Colonoscopy + multiple biopsies</strong> — indicated if chronic, refractory, haemorrhagic, mass on rectal exam, or progressive. <strong>Boxer / French Bulldog / Malamute:</strong> FISH for adherent invasive <em>E. coli</em> (AIEC) — enrofloxacin often curative.`,
        },
        {
          kind: 'html',
          html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
    <div class="dx-dx" onclick="goLesionTab('LOC-DI-SI','Small intestine')">SI Primary lesions →</div>
    <div class="dx-dx" style="background:rgba(13,148,136,0.2);border-color:rgba(13,148,136,0.5);" onclick="goLesionTab('LOC-DI-LB','Large intestine / colon')">LI Primary lesions →</div>
  </div>
  <div style="height:4px;"></div>
  <div class="dx-dx" onclick="renderDxId('diarrhoea','sec')" style="background:rgba(217,119,6,0.15);border-color:rgba(217,119,6,0.4);">🟠 Full secondary workup →</div>`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS',
          html: `Young unvaccinated + haemorrhagic diarrhoea (parvo) · Acute abdomen · Profuse AHDS · Palpable mass / intussusception · Severe dehydration / shock · Addisonian crisis · Palpable rectal mass · Progressive weight loss with LB signs (neoplasia)`,
        },
        {
          kind: 'html',
          html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px;">
  <div style="font-size:10px;color:var(--gray);line-height:1.6;">
    💡 <strong style="color:var(--white);">Fenbendazole in all cases</strong> — treat regardless of faecal result; repeat ×3 for LB diarrhoea (whipworm).<br>
    💡 <strong style="color:var(--white);">Panhypoproteinaemia</strong> (↓ alb + ↓ glob) = PLE. Albumin &lt;15 g/L = poor prognosis.<br>
    💡 <strong style="color:var(--white);">T4 in every cat</strong> with chronic diarrhoea — T4 can be falsely normal with concurrent illness.<br>
    💡 <strong style="color:var(--white);">Waxing/waning GI signs</strong> → always rule out Addison's — run basal cortisol first; &lt;55 nmol/L → ACTH stim. Normal Na:K does NOT exclude atypical disease.<br>
    💡 <strong style="color:var(--white);">Digital rectal exam mandatory</strong> — polyps and rectal masses are missed without it.<br>
    💡 <strong style="color:var(--white);">Tritrichomonas</strong> — only InPouch culture or PCR, NOT routine flotation.
  </div>
</div>`,
        },
        { kind: 'disclaimer' },
      ],
    },

    sec: {
      title: 'Dx: Secondary Diarrhoea',
      blocks: [
        {
          kind: 'html',
          html: `<div class="dx-step" style="background:rgba(217,119,6,0.2);border-color:rgba(217,119,6,0.45);color:var(--amber-text);">🟠 SECONDARY / SYSTEMIC CAUSES — TARGETED TESTS</div>`,
        },
        {
          kind: 'note',
          style: 'font-size:10.5px;',
          html: `<strong>Suspect when:</strong> chronic SI-pattern diarrhoea + weight loss · systemic signs (PU/PD · lethargy · episodic weakness · jaundice · tachycardia) · bloodwork abnormalities pointing away from primary GI · poor response to GI treatment`,
        },

        { kind: 'step', text: '🩸 STEP 1 — BLOODWORK FLAGS + FIRST TESTS', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Suspected cause', { text: 'Flags and first tests', tone: 'teal' }],
          rows: [
            ['<strong>Hypoadrenocorticism (Addison\'s)</strong>', { text: 'Na:K &lt;27 → classical, confirm with <strong>ACTH stimulation test</strong>. Absent stress leukogram ± eosinophilia in a sick dog (<em>even with normal Na:K</em>) → atypical — <strong>basal cortisol</strong> first; &lt;55 nmol/L → ACTH stim; 55–165 nmol/L (equivocal) → proceed to ACTH stim anyway. <strong>Post-stim cortisol &lt;55 nmol/L = diagnostic.</strong> Normal electrolytes do <strong>NOT</strong> exclude atypical Addison\'s — never rely on Na:K alone', tone: 'danger' }],
            ['<strong>🐱 Hyperthyroidism</strong>', { text: '<strong>Serum T4 — mandatory in ALL cats with chronic diarrhoea.</strong> Equivocal → free T4 by equilibrium dialysis or recheck in 3 weeks. T4 can be falsely normal with concurrent illness (occult hyperthyroidism)', tone: 'teal' }],
            ['<strong>Hepatic disease / PSS</strong>', { text: '↑ ALT/ALP/GGT + ↓ albumin → hepatic disease · PSS · hepatic lipidosis (🐱). ↓ BUN + ↓ albumin + ↓ cholesterol + ↑ liver enzymes ± ↑ ammonia → <strong>PSS</strong>. Ammonium biurate crystals on UA → PSS', tone: 'teal' }],
            ['<strong>EPI</strong>', { text: 'Polyphagia + weight loss + voluminous steatorrhoeic diarrhoea. <strong>cTLI &lt;2.5 μg/L (🐕)</strong> / <strong>fTLI &lt;8 μg/L (🐱)</strong> — must be a fasted sample; recheck if borderline', tone: 'teal' }],
            ['<strong>🐱 Triaditis</strong>', { text: '↑ fPLI + ↑ ALT + ↑ GGT + bilirubin → pancreatitis + cholangitis + IBD', tone: 'teal' }],
            ['<strong>Protein-losing enteropathy (PLE)</strong>', { text: '↓ Albumin + ↓ Globulin (panhypoproteinaemia) → SI protein loss confirmed. ↓ Albumin alone → hepatic disease or malabsorption (globulins spared)', tone: 'teal' }],
            ['<strong>Regional infectious clue</strong>', { text: 'Hypercalcaemia + Gulf Coast dog + outdoor water exposure → <em>Heterobilharzia americana</em>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'TARGETED FOLLOW-UP BY SUSPECTED CAUSE', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['If suspected', { text: 'Then', tone: 'teal' }],
          rows: [
            ['<strong>Hypoadrenocorticism</strong>', { text: 'Abdominal US: bilateral small adrenal glands (&lt;3.5 mm) — supportive but not diagnostic · ACTH stimulation test (gold standard) · treat Addisonian crisis with IV saline + dexamethasone 0.1–0.2 mg/kg IV stat', tone: 'green' }],
            ['<strong>Hepatic disease / PSS</strong>', { text: '<strong>Pre/post-prandial bile acids</strong> · <strong>abdominal ultrasound</strong> (hepatic architecture · microhepatica (PSS) · aberrant vessel · biliary sludge or wall thickening (triaditis) · pancreatic changes) · plasma ammonia if encephalopathic signs · liver biopsy (Tru-cut or surgical) if hepatic parenchymal disease confirmed', tone: 'green' }],
            ['<strong>EPI</strong>', { text: 'Serum cobalamin (B12) + folate — cobalamin low in EPI and severe ileal disease; supplement cobalamin in <strong>all</strong> EPI cats regardless of level. Monitor TLI annually — chronic pancreatitis leads to progressive EPI. Pancreatic enzyme supplementation + low-fat diet', tone: 'green' }],
            ['<strong>PLE</strong>', { text: 'Faecal α₁-protease inhibitor (🐕) — most sensitive marker of GI protein loss · abdominal US (intestinal wall layering · mucosal striations of lymphangiectasia · effusion) · endoscopy + full-thickness biopsy (lymphangiectasia with dilated lacteals · IBD · lymphoma) · check cobalamin + folate (B12 low → ileal disease; folate ↑ → SIBO)', tone: 'green' }],
          ],
        }, '🎯'),

        ...stepTable(3, 'REGION-SPECIFIC INFECTIOUS CAUSES', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Agent', { text: 'Clue · tests · treatment', tone: 'teal' }],
          rows: [
            ['<strong><em>Heterobilharzia americana</em></strong><br>Gulf Coast / SE USA · outdoor + freshwater exposure', { text: '<strong>Clue:</strong> hypercalcaemia (granulomatous inflammation). <strong>Tests:</strong> faecal sedimentation for ova · faecal PCR (more sensitive). <strong>Treat:</strong> praziquantel 25 mg/kg TID ×2 days + fenbendazole 40 mg/kg SID ×10 days', tone: 'danger' }],
            ['<strong>Histoplasmosis</strong><br>Ohio / Mississippi / Missouri river valleys · Great Lakes', { text: '<strong>Clue:</strong> concurrent respiratory signs · weight loss · hepatosplenomegaly · pancytopenia. <strong>Tests:</strong> urine Histoplasma antigen ELISA (most sensitive — MiraVista) · rectal scraping cytology (intracellular yeast in macrophages — most rapid) · faecal PCR. <strong>Treat:</strong> itraconazole 5 mg/kg SID or BID × minimum 6 months; monitor with urine antigen titre', tone: 'danger' }],
            ['<strong>Pythiosis</strong><br>Gulf Coast / tropical · freshwater exposure', { text: '<strong>Clue:</strong> transmural GI mass + weight loss + young large-breed dog. <strong>Tests:</strong> Pythium ELISA titre ≥1:400 suggestive · abdominal US (transmural mass · mural thickening) · full-thickness biopsy + FISH for definitive diagnosis. <strong>Treat:</strong> surgical resection + itraconazole + terbinafine. Prognosis guarded — early surgery offers the best chance', tone: 'danger' }],
          ],
        }, '🌍'),
        {
          kind: 'html',
          html: `<div class="dx-dx" onclick="goLesionTab('LOC-DI-SI-SEC','Small intestine — Secondary')">Secondary / Systemic lesions →</div>`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS',
          html: `Addisonian crisis (bradycardia + hypotension + weakness) · Hepatic encephalopathy (PSS) · Pythiosis (rapid transmural mass progression) · Panhypoproteinaemia + ascites (albumin &lt;15 g/L = poor prognosis)`,
        },
        {
          kind: 'html',
          html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px;">
  <div style="font-size:10px;color:var(--gray);line-height:1.6;">
    💡 <strong style="color:var(--white);">T4 in every cat</strong> with chronic diarrhoea — T4 can be falsely normal with concurrent illness.<br>
    💡 <strong style="color:var(--white);">Atypical Addison's</strong> — normal Na:K does NOT exclude. Absent stress leukogram = check basal cortisol.<br>
    💡 <strong style="color:var(--white);">Hypercalcaemia + Gulf Coast dog</strong> → Heterobilharzia until proven otherwise.<br>
    💡 <strong style="color:var(--white);">Panhypoproteinaemia</strong> (↓ alb + ↓ glob) = PLE — hepatic disease spares globulins.
  </div>
</div>`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
