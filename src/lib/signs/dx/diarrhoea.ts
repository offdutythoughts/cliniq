// ── Diarrhoea — diagnostic approach (data) ──────────────────────────────────
// Migration of diarrhoea{History,Exam,Dx,Sec}Html (legacy HTML consts in
// ../diarrhoea.ts) to the typed DxApproach model. Rendered by renderDxApproach.
// Non-standard 4-tab nav (adds 'sec').

import type { DxApproach } from '../dxTypes'

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
        { kind: 'step', text: '📋 KEY HISTORY' },
        {
          kind: 'check',
          html: `<strong>Duration + onset:</strong> Acute (&lt;3 wk) or chronic (&gt;3 wk)?<br>
    <strong>Diet:</strong> Recent change? Raw diet? Novel exposures? Treats, chews, table scraps?<br>
    <strong>Parasites:</strong> Worming history? Last treatment? Which product?<br>
    <strong>Vaccination:</strong> Up to date? (parvo, distemper in young unvaccinated animals)<br>
    <strong>Medications:</strong> NSAIDs, antibiotics, corticosteroids, chemotherapy?<br>
    <strong>Environment:</strong> Outdoor access? Boarding? Shelter? Multiple pets? Travel?<br>
    <strong>Water source:</strong> Ponds, creeks, standing water? (Giardia, Heterobilharzia)<br>
    <strong>Weight change:</strong> Progressive loss? Polyphagia despite weight loss? (EPI)`,
        },
        { kind: 'step', alt: true, text: '🐾 SIGNALMENT + BREED CLUES' },
        {
          kind: 'check',
          html: `<strong>Young + unvaccinated:</strong> Parvovirus, parasites<br>
    <strong>Young + polyphagia + weight loss:</strong> EPI (GSD, CKCS, Chow Chow, Rough Collie)<br>
    <strong>Middle-aged + chronic ± vomiting:</strong> IBD / small cell lymphoma (cats)<br>
    <strong>Yorkshire Terrier / Wheaten Terrier:</strong> Lymphangiectasia + PLE<br>
    <strong>Boxer / French Bulldog:</strong> Granulomatous colitis (AIEC)<br>
    <strong>Cat + chronic diarrhoea + weight loss:</strong> Hyperthyroidism · Small cell lymphoma · IBD<br>
    <strong>Dog + waxing/waning GI signs:</strong> Addison's — run <strong>basal cortisol</strong> first to rule out; &lt;55 nmol/L → ACTH stim<br>
    <strong>Dog + Gulf Coast / tropical:</strong> Heterobilharzia americana`,
        },
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
        { kind: 'step', text: '🩺 PHYSICAL EXAMINATION' },
        {
          kind: 'check',
          html: `<strong>BCS / MCS:</strong> Weight loss → chronicity, malabsorption, protein-losing<br>
    <strong>Coat / skin:</strong> Poor coat quality (EPI, PLE, hypoalbuminaemia); pruritus + otitis (food-responsive)<br>
    <strong>Mucous membranes:</strong> Pallor (blood loss, anaemia); icterus (hepatic/haemolytic)`,
        },
        {
          kind: 'check',
          html: `<strong>Abdomen:</strong><br>
    • Thickened intestinal loops (IBD, lymphoma, infiltrative disease)<br>
    • Palpable mass / intussusception<br>
    • Pain on palpation (pancreatitis, peritonitis, intussusception)<br>
    • Fluid wave / tympany (ascites → hypoalbuminaemia, lymphangiectasia, PLE)<br>
    • Borborygmi / gas (malabsorption, EPI, rapid motility)`,
        },
        {
          kind: 'check',
          html: `<strong>Digital rectal exam</strong> — ESSENTIAL IN ALL PATIENTS<br>
    • Mass or stricture in rectum?<br>
    • Character of faeces: melaena vs haematochezia vs mucus?<br>
    • Anal tone, perineal exam`,
        },
        {
          kind: 'check',
          html: `<strong>Peripheral lymph nodes:</strong> Generalised lymphadenopathy (lymphoma, fungal, systemic disease)<br>
    <strong>Thyroid (cat):</strong> Goitre or asymmetric lobe → hyperthyroidism<br>
    <strong>Cavitary effusions:</strong> Pleural dullness · Pericardial muffling (hypoalbuminaemia, lymphangiectasia)<br>
    <strong>Oedema:</strong> Peripheral pitting oedema (hypoalbuminaemia, lymphangiectasia)<br>
    <strong>Eyes / CNS:</strong> Hepatic encephalopathy signs (PSS), uveitis (systemic disease)`,
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
        { kind: 'step', alt: true, text: 'STEP 1 — EMPIRIC MEDICAL MANAGEMENT' },
        {
          kind: 'check',
          html: `<span style="font-size:10px;opacity:.8;">Start empiric treatment in all cases while awaiting diagnostics. Many acute diarrhoeas resolve with supportive care alone.</span><br><br>
    <strong style="color:var(--tone-warning-fg);">Antiparasitic — give in all cases regardless of faecal result:</strong><br>
    • <strong>Fenbendazole 50 mg/kg PO SID ×5 days</strong> — covers Giardia, roundworms, hookworms, whipworms<br>
    • Re-dose at 3 and 6 weeks if LB diarrhoea (whipworm ova shed intermittently — flotation often false-negative)<br><br>
    <strong style="color:var(--tone-warning-fg);">Dietary modification:</strong><br>
    • <strong>Bland diet</strong> — boiled chicken + rice, or commercial GI diet ×3–5 days (acute); reduces antigenic load and is highly digestible<br>
    • <strong>Novel protein / hydrolysed diet trial</strong> (4–6 weeks exclusive) — if food-responsive enteropathy suspected after acute phase; no treats, chews, or flavoured medications<br>
    • <strong>Highly digestible low-fat diet</strong> — reduces osmotic load in malabsorptive/SB diarrhoea<br><br>
    <strong style="color:var(--tone-warning-fg);">Gut protectants / adsorbents:</strong><br>
    • <strong>Kaolin-pectin</strong> — coats and soothes mucosa; binds bacterial toxins; safe in all species<br>
    • <strong>Smectite (diosmectite)</strong> — binds toxins + pathogens; mucosal barrier support<br>
    • <strong>Sucralfate</strong> 0.5–1g PO TID — if mucosal ulceration suspected (haemorrhagic diarrhoea, known NSAID use)<br><br>
    <strong style="color:var(--tone-warning-fg);">Probiotics:</strong><br>
    • <em>Enterococcus faecium</em> SF68 (FortiFlora®) or multi-strain probiotic — supports microbiome recovery; recommended alongside antibiotics if used<br><br>
    <strong style="color:var(--tone-warning-fg);">Metronidazole:</strong><br>
    • 10–15 mg/kg PO BID ×5–7 days — anti-anaerobic + anti-Giardia; consider if haemorrhagic, mucosal, or high Giardia suspicion<br>
    • Avoid routine use in every case — emerging resistance and microbiome disruption concerns<br><br>
    <strong style="color:var(--tone-warning-fg);">Fluid + electrolyte support:</strong><br>
    • Oral electrolyte solution if mild–moderate dehydration and not vomiting<br>
    • IV fluids (Hartmann's / Plasma-Lyte) if moderate–severe dehydration, vomiting, or collapse
    <div style="margin-top:8px;background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-left:3px solid #14B8A6;border-radius:8px;padding:8px 10px;font-size:10.5px;">
      <span style="font-weight:700;color:var(--tone-teal-fg);">🟢 Large Bowel:</span> <strong>High-fibre supplementation first line</strong> — psyllium husk / wheat bran 1–6 tsp/day OR commercial high-fibre diet for 3–4 weeks. Effective for idiopathic LB diarrhoea and stress colitis. Fenbendazole course ×3 (repeat at 3 and 6 weeks) to cover <em>Trichuris vulpis</em> even if flotation negative. Avoid metronidazole as sole treatment — address fibre and parasites first.
    </div>`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — FAECAL PANEL' },
        {
          kind: 'check',
          html: `<strong>Minimum panel:</strong><br>
    • <strong>Direct wet mount</strong> — motile Giardia trophozoites, other protozoa<br>
    • <strong>Giardia ELISA / SNAP</strong> — more sensitive than wet mount alone<br>
    • <strong>Parvovirus SNAP</strong> — young or unvaccinated animals (do not delay)<br><br>
    <strong>Extended panel</strong> (chronic, no response to empiric treatment, or systemic signs):<br>
    • <strong>ZnSO₄ centrifugal flotation ×3</strong> — helminth ova, protozoan cysts (serial samples improve sensitivity)<br>
    • <strong>Cryptosporidium</strong> — acid-fast stain or faecal PCR (young / immunocompromised)<br>
    • <strong>Faecal PCR panel</strong> — Salmonella, Campylobacter, Clostridium perfringens toxin / difficile<br>
    • <strong>Faecal sedimentation</strong> — <em>Heterobilharzia americana</em> ova (Gulf Coast dogs)
    <div style="margin-top:8px;background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-left:3px solid #14B8A6;border-radius:8px;padding:8px 10px;font-size:10.5px;">
      <span style="font-weight:700;color:var(--tone-teal-fg);">🟢 Large Bowel:</span> Priority target is <strong><em>Trichuris vulpis</em></strong> — ova shed intermittently, flotation frequently negative; treat empirically regardless. <strong>Cats:</strong> <em>Tritrichomonas foetus</em> — <strong>InPouch culture or faecal PCR</strong> (young cats, crowded environments); NOT detected on routine flotation. Treat with ronidazole 30–50 mg/kg PO SID ×14 days. Faecal culture if haemorrhagic, febrile, or zoonotic risk.
    </div>`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — BLOODWORK<span style="font-weight:400;font-size:9px;opacity:.8;"> · indicated if: not resolving after empiric Rx · chronic (&gt;3 wk) · weight loss · systemic signs</span>' },
        {
          kind: 'check',
          html: `<strong style="color:var(--tone-warning-fg);">CBC:</strong><br>
    • Leucopenia → parvovirus / panleukopenia (young unvaccinated)<br>
    • Eosinophilia → parasitism, dietary hypersensitivity, eosinophilic enteritis<br>
    • <strong>Absent stress leukogram in a sick dog</strong> → hypoadrenocorticism (see biochem below)<br>
    • Regenerative anaemia → GI haemorrhage / blood loss<br>
    • Lymphopenia → lymphangiectasia / PLE<br><br>
    <strong style="color:var(--tone-warning-fg);">Serum biochemistry:</strong><br>
    • ↓ Albumin + ↓ Globulin (panhypoproteinaemia) → <strong>PLE</strong> — lymphangiectasia, IBD, neoplasia<br>
    • ↓ Albumin alone → hepatic disease, malabsorption, GI loss<br>
    • Na:K &lt;27 → <strong>classical hypoadrenocorticism</strong> — confirm with ACTH stimulation<br>
    • <strong>Absent stress leukogram</strong> + normal Na:K → <strong>atypical hypoadrenocorticism</strong> — run <strong>basal cortisol</strong>; &lt;55 nmol/L or ongoing suspicion → <strong>ACTH stimulation test</strong><br>
    • ↑ ALT / ALP / GGT + ↓ albumin → hepatic disease / <strong>PSS (portosystemic shunt)</strong><br>
    • ↓ BUN + ↓ albumin + ↓ cholesterol + ↑ liver enzymes ± ↑ ammonia → <strong>PSS</strong><br>
    • <strong>Serum T4 (ALL cats with chronic diarrhoea)</strong> → hyperthyroidism<br>
    • ↑ fPLI + ↑ ALT (cat) → triaditis (pancreatitis + cholangitis + IBD)<br><br>
    <strong style="color:var(--tone-warning-fg);">Urinalysis:</strong><br>
    • USG &lt;1.030 in dehydrated dog → CKD / hypoadrenocorticism / DI<br>
    • Ammonium biurate crystals → <strong>PSS (portosystemic shunt)</strong><br><br>
    <strong style="color:var(--tone-warning-fg);">GI-specific panel</strong> <span style="font-size:9.5px;opacity:.8;">(chronic SB diarrhoea · steatorrhoea · weight loss)</span><strong style="color:var(--tone-warning-fg);">:</strong><br>
    • <strong>cTLI (dog) / fTLI (cat)</strong> — EPI: cTLI &lt;2.5 μg/L diagnostic; fTLI &lt;8 μg/L (cat). <em>Must be fasted sample.</em><br>
    • <strong>Serum cobalamin (B12)</strong> — low in EPI, severe ileal disease, severe IBD. Supplement ALL EPI cats regardless of level.<br>
    • <strong>Serum folate</strong> — elevated with proximal SI SIBO; low with proximal SI mucosal disease<br>
    • <strong>fPLI / cPLI</strong> — pancreatitis (most sensitive/specific serum marker)
    <div style="margin-top:8px;background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-left:3px solid #14B8A6;border-radius:8px;padding:8px 10px;font-size:10.5px;">
      <span style="font-weight:700;color:var(--tone-teal-fg);">🟢 Large Bowel:</span> Bloodwork usually normal in straightforward LB disease. Run if: weight loss, systemic signs, haemorrhagic diarrhoea, refractory to empiric treatment, or patient &gt;7 years old. GI-specific panel (TLI / cobalamin / folate) not routinely indicated — only if concurrent SB signs or systemic disease suspected.
    </div>`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — ABDOMINAL IMAGING<span style="font-weight:400;font-size:9px;opacity:.8;"> · chronic · weight loss · palpable abnormality</span>' },
        {
          kind: 'check',
          html: `<strong>Survey radiograph:</strong><br>
    • Reduced serosal detail → effusion (hypoalbuminaemia, PLE, lymphangiectasia)<br>
    • Hepatomegaly / splenomegaly / gas pattern / obstruction<br><br>
    <strong>Abdominal ultrasound:</strong><br>
    • SI wall thickening — <em>layering preserved + thickened</em> → IBD/enteritis; <em>layering lost</em> → neoplasia<br>
    • Mesenteric lymphadenopathy — IBD, lymphoma, systemic disease<br>
    • Pancreatic changes — pancreatitis, EPI (atrophy)<br>
    • <strong>Bilateral small adrenal glands</strong> → hypoadrenocorticism<br>
    • Hepatic architecture / gallbladder / bile duct thickening → hepatic / biliary disease, triaditis (cat)<br>
    • Microhepatica + renomegaly → <strong>PSS (portosystemic shunt)</strong>
    <div style="margin-top:8px;background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-left:3px solid #14B8A6;border-radius:8px;padding:8px 10px;font-size:10.5px;">
      <span style="font-weight:700;color:var(--tone-teal-fg);">🟢 Large Bowel:</span> Lower yield in straightforward LB disease. Ultrasound useful for colonic wall thickening and mesenteric LN if chronic or severe. Rectal exam and colonoscopy are higher-yield.
    </div>`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — ENDOSCOPY + BIOPSY<span style="font-weight:400;font-size:9px;opacity:.8;"> · dietary trial failed · systemic causes excluded · progressive weight loss</span>' },
        {
          kind: 'check',
          html: `• <strong>Full-thickness surgical biopsy</strong> preferred — necessary for lymphoma subtyping, transmural disease (pythiosis, histoplasmosis)<br>
    • <strong>PARR PCR</strong> on biopsy if lymphoma suspected — sensitivity ~70%; negative does not exclude<br>
    • <strong>Culture + sensitivity</strong> if infectious aetiology not fully excluded<br>
    • Duodenal aspirate for quantitative culture if SIBO suspected
    <div style="margin-top:8px;background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-left:3px solid #14B8A6;border-radius:8px;padding:8px 10px;font-size:10.5px;">
      <span style="font-weight:700;color:var(--tone-teal-fg);">🟢 Large Bowel:</span> <strong>Colonoscopy + multiple biopsies</strong> — indicated if chronic, refractory, haemorrhagic, mass on rectal exam, or progressive. <strong>Boxer / French Bulldog / Malamute:</strong> FISH for adherent invasive <em>E. coli</em> (AIEC) — enrofloxacin often curative.
    </div>`,
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
          kind: 'check',
          style: 'font-size:10.5px;',
          html: `<strong>Suspect when:</strong> chronic SI-pattern diarrhoea + weight loss · systemic signs (PU/PD, lethargy, episodic weakness, jaundice, tachycardia) · bloodwork abnormalities pointing away from primary GI · poor response to GI treatment`,
        },
        { kind: 'step', alt: true, text: 'STEP 1 — BLOODWORK FLAGS + FIRST TESTS' },
        {
          kind: 'check',
          html: `<strong style="color:var(--tone-warning-fg);">Hypoadrenocorticism (Addison's):</strong><br>
    • Na:K &lt;27 → classical — <strong>ACTH stimulation test</strong> to confirm<br>
    • Absent stress leukogram ± eosinophilia in a sick dog (even with NORMAL Na:K) → atypical — <strong>basal cortisol</strong> first; &lt;55 nmol/L → ACTH stim; 55–165 nmol/L (equivocal) → proceed to ACTH stim anyway<br>
    • Post-stim cortisol &lt;55 nmol/L = diagnostic<br>
    • <span style="font-size:10px;opacity:.75;">Normal electrolytes do NOT exclude atypical Addison's — never rely on Na:K alone</span><br><br>
    <strong style="color:var(--tone-warning-fg);">Hyperthyroidism (cat):</strong><br>
    • <strong>Serum T4 — mandatory in ALL cats with chronic diarrhoea</strong><br>
    • Equivocal result → free T4 by equilibrium dialysis OR recheck in 3 weeks<br>
    • T4 can be falsely normal with concurrent illness (occult hyperthyroidism)<br><br>
    <strong style="color:var(--tone-warning-fg);">Hepatic disease / PSS:</strong><br>
    • ↑ ALT/ALP/GGT + ↓ albumin → hepatic disease / PSS / hepatic lipidosis (cat)<br>
    • ↓ BUN + ↓ albumin + ↓ cholesterol + ↑ liver enzymes ± ↑ ammonia → <strong>PSS (portosystemic shunt)</strong><br>
    • Ammonium biurate crystals on UA → PSS<br><br>
    <strong style="color:var(--tone-warning-fg);">EPI (exocrine pancreatic insufficiency):</strong><br>
    • Polyphagia + weight loss + voluminous steatorrhoeic diarrhoea<br>
    • <strong>cTLI &lt;2.5 μg/L (dog)</strong> / <strong>fTLI &lt;8 μg/L (cat)</strong> — must be fasted sample; recheck if borderline<br><br>
    <strong style="color:var(--tone-warning-fg);">Triaditis (cat):</strong><br>
    • ↑ fPLI + ↑ ALT + ↑ GGT + bilirubin → pancreatitis + cholangitis + IBD<br><br>
    <strong style="color:var(--tone-warning-fg);">Protein-losing enteropathy (PLE):</strong><br>
    • ↓ Albumin + ↓ Globulin (panhypoproteinaemia) → SI protein loss confirmed<br>
    • ↓ Albumin alone → hepatic disease or malabsorption (globulins spared)<br><br>
    <strong style="color:var(--tone-warning-fg);">Regional infectious clue:</strong><br>
    • Hypercalcaemia + Gulf Coast dog + outdoor water exposure → <em>Heterobilharzia americana</em>`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — TARGETED FOLLOW-UP BY SUSPECTED CAUSE' },
        {
          kind: 'check',
          html: `<strong style="color:var(--tone-green-fg);">If hypoadrenocorticism suspected:</strong><br>
    • Abdominal US: bilateral small adrenal glands (&lt;3.5mm) — supportive but not diagnostic<br>
    • ACTH stimulation test (as above) — gold standard<br>
    • Treat Addisonian crisis: IV saline + dexamethasone (0.1–0.2 mg/kg IV) stat<br><br>
    <strong style="color:var(--tone-green-fg);">If hepatic disease / PSS suspected:</strong><br>
    • <strong>Pre/post-prandial bile acids</strong> — hepatic dysfunction, portosystemic shunting<br>
    • <strong>Abdominal ultrasound</strong> — hepatic architecture, microhepatica (PSS), aberrant vessel, biliary sludge/wall thickening (triaditis), pancreatic changes<br>
    • Plasma ammonia if encephalopathic signs<br>
    • Liver biopsy (Tru-cut or surgical) if hepatic parenchymal disease confirmed<br><br>
    <strong style="color:var(--tone-green-fg);">If EPI suspected:</strong><br>
    • Serum cobalamin (B12) + folate — cobalamin low in EPI, severe ileal disease; supplement cobalamin in ALL EPI cats regardless of level<br>
    • Monitor TLI annually — chronic pancreatitis leads to progressive EPI<br>
    • Pancreatic enzyme supplementation + low-fat diet<br><br>
    <strong style="color:var(--tone-green-fg);">If PLE suspected:</strong><br>
    • Faecal α₁-protease inhibitor (dogs) — most sensitive marker of GI protein loss<br>
    • Abdominal US: intestinal wall layering, mucosal striations (lymphangiectasia), effusion<br>
    • Endoscopy + full-thickness biopsy — lymphangiectasia (dilated lacteals), IBD, lymphoma<br>
    • Check cobalamin + folate (B12 low → ileal disease; folate ↑ → SIBO)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — REGION-SPECIFIC INFECTIOUS CAUSES' },
        {
          kind: 'check',
          html: `<strong style="color:var(--tone-danger-fg);">Heterobilharzia americana</strong> (Gulf Coast / SE USA · outdoor + freshwater exposure):<br>
    • Clue: hypercalcaemia (granulomatous inflammation)<br>
    • Tests: <strong>faecal sedimentation for ova</strong>; <strong>faecal PCR</strong> (more sensitive)<br>
    • Treat: praziquantel 25 mg/kg TID ×2 days + fenbendazole 40 mg/kg SID ×10 days<br><br>
    <strong style="color:var(--tone-danger-fg);">Histoplasmosis</strong> (Ohio / Mississippi / Missouri river valleys · Great Lakes):<br>
    • Clue: concurrent respiratory signs, weight loss, hepatosplenomegaly, pancytopenia<br>
    • Tests: <strong>urine Histoplasma antigen ELISA</strong> (most sensitive — MiraVista Diagnostics); rectal scraping cytology (intracellular yeast in macrophages — most rapid); faecal PCR<br>
    • Treat: itraconazole 5 mg/kg SID or BID × minimum 6 months; monitor with urine antigen titre<br><br>
    <strong style="color:var(--tone-danger-fg);">Pythiosis</strong> (Gulf Coast / tropical · freshwater exposure):<br>
    • Clue: transmural GI mass + weight loss + young large breed dog<br>
    • Tests: <strong>Pythium ELISA titre ≥1:400</strong> suggestive; abdominal US (transmural mass, mural thickening); full-thickness biopsy + FISH for definitive diagnosis<br>
    • Treat: surgical resection + itraconazole + terbinafine. Prognosis guarded — early surgery offers best chance`,
        },
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
