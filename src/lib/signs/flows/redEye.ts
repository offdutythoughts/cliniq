// ── Red Eye flowchart (data) ────────────────────────────────────────────────
// Migration of redEyeFlowHtml + redEyeCoatsHtml + redEyeIrisHtml +
// redEyeBleedHtml + redEyeOrbitHtml (src/lib/signs/redEye.ts). The Dx views are
// out of scope. The entry uses the 'flow' layout (.flow-wrap); the four
// sub-flows use the legacy 'fn' layout (fnHeader + cardGrid + .fn-arrow).

import type { FlowPage } from '../flowTypes'

// ── Entry flowchart (4-region branch) ───────────────────────────────────────
const redEyeEntry: FlowPage = {
  id: 'red-eye',
  title: 'Red Eye',
  blocks: [
    { kind: 'node', variant: 'entry', text: '👁️ RED EYE' },
    {
      kind: 'node', variant: 'step', text: 'WHERE IS THE REDNESS?',
      sub: 'Ocular coats vs iris hyperaemia vs intraocular bleed vs retrobulbar',
    },
    {
      kind: 'choices',
      cols: 4,
      connectAfter: false,
      items: [
        { label: 'Ocular coats', sublabel: 'eyelid · TEL · conj · episcl · cornea', link: { to: 'flow', id: 'red-eye-coats' } },
        { label: 'Iris hyperaemia', sublabel: 'rubeosis · PIFM · uveal mass', link: { to: 'flow', id: 'red-eye-iris' } },
        { label: 'Intraocular bleed', sublabel: 'hyphaema · vitreal · retinal', link: { to: 'flow', id: 'red-eye-bleed' } },
        { label: 'Retrobulbar', sublabel: 'orbital cellulitis · neoplasia', link: { to: 'flow', id: 'red-eye-orbit' } },
      ],
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      title: '⚡ SIGHT-THREATENING RED EYE — DO NOT MISS',
      html:
        '• <strong onclick="renderDiseasePage(\'DIS-OPH-GLAUCOMA\')" style="cursor:pointer;text-decoration:underline;">Acute glaucoma</strong> — episcleral congestion + mydriasis + corneal oedema + IOP &gt;25 mmHg → sight loss within hours<br>' +
        '• <strong onclick="renderDiseasePage(\'DIS-EYE-UVEITIS-ANT\')" style="cursor:pointer;text-decoration:underline;">Anterior uveitis</strong> — miosis + aqueous flare + ↓ IOP → if untreated → secondary glaucoma, blindness<br>' +
        '• <strong>Deep / melting ulcer</strong> — stromal loss + Seidel-positive → globe rupture<br>' +
        '• <strong>Hyphaema with hypertension</strong> — measure BP; uncontrolled HT can blind quickly<br>' +
        '• <strong>Globe rupture / corneal laceration</strong> — minimise handling, no tonometry, refer',
    },
    { kind: 'banner', tone: 'info', html: 'Tap a region to see lesion types and urgency' },
  ],
}

// ── Sub-flow: Ocular Coats (fn layout) ──────────────────────────────────────
const redEyeCoats: FlowPage = {
  id: 'red-eye-coats',
  title: 'Red Eye — Ocular Coats',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'insp', text: 'OCULAR COATS' },
    { kind: 'fnHeader', variant: 'step', text: 'SUB-LOCALISE' },
    {
      kind: 'cardGrid',
      tiles: [
        { anat: 'nasal', sys: 'Periocular skin · Meibomian · Eyelid margin', loc: 'Eyelids / Adnexa', link: { to: 'lesion', loc: 'LOC-RE-ADNEXA', name: 'Eyelids / Adnexa' } },
        { anat: 'larynx', sys: 'TEL — cartilage · gland · lymphoid', loc: 'Third eyelid', link: { to: 'lesion', loc: 'LOC-RE-TEL', name: 'Third eyelid' } },
        { anat: 'pleural', sys: 'Dichotomous · moves with cotton-tip · fornixes', loc: 'Conjunctiva', link: { to: 'lesion', loc: 'LOC-RE-CONJ', name: 'Conjunctiva' } },
        { anat: 'mechanic', sys: 'Straight radial · no movement · limbal', loc: 'Episclera / Sclera', link: { to: 'lesion', loc: 'LOC-RE-EPISC', name: 'Episclera / Sclera' } },
        { anat: 'pleural', sys: 'Superficial neovascularisation ("trees")', loc: 'Cornea — surface disease', link: { to: 'lesion', loc: 'LOC-RE-CORNEA-SUP', name: 'Cornea — surface' } },
        { anat: 'larynx', sys: 'Deep neovascularisation ("brush") at limbus', loc: 'Cornea — deep / intraocular signal', link: { to: 'lesion', loc: 'LOC-RE-CORNEA-DEEP', name: 'Cornea — deep' } },
      ],
    },
    {
      // Conjunctival vs episcleral discriminator — a bespoke 2-column compare
      // box (purple, two tinted sub-cards + footnote). Escape-hatch html keeps
      // it byte-identical (a 2-col compare block would be the typed home later).
      kind: 'html',
      html: `<div style="margin-top:14px;padding:10px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
  <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:8px;">🔍 CONJUNCTIVAL vs EPISCLERAL INJECTION — KEY DISCRIMINATOR</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
    <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
      <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">Conjunctival hyperaemia</div>
      • Dichotomous (tree-like) branching<br>
      • Superficial — MOVES with conjunctiva on cotton-tip<br>
      • Most evident in the <strong>fornixes</strong><br>
      • Blanches rapidly with topical phenylephrine 2.5%<br>
      <strong style="color:#FCD34D;">⇒ Ocular surface disease</strong>
    </div>
    <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
      <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">Episcleral hyperaemia</div>
      • No dichotomous division — straight radial vessels<br>
      • Deeper — does <strong>NOT move</strong> with the conjunctiva<br>
      • Most evident close to the <strong>limbus</strong><br>
      • Blanches with phenylephrine 2.5% (slower / less complete than conjunctival — scleritis vessels do NOT blanch)<br>
      <strong style="color:#F87171;">⇒ Deeper / intraocular disease (uveitis, glaucoma, scleritis)</strong>
    </div>
  </div>
  <div style="margin-top:7px;font-size:9.5px;line-height:1.6;color:rgba(196,181,253,.8);">
    💡 <strong style="color:#C4B5FD;">Superficial corneal vascularisation</strong> = long, branching ("trees") → surface disease.<br>
    💡 <strong style="color:#C4B5FD;">Deep corneal vascularisation</strong> = short, straight, deep red ("brush") → uveitis or glaucoma.
  </div>
</div>`,
    },
  ],
}

// ── Sub-flow: Iris Hyperaemia (fn layout) ───────────────────────────────────
const redEyeIris: FlowPage = {
  id: 'red-eye-iris',
  title: 'Red Eye — Iris',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'exp', text: 'IRIS HYPERAEMIA' },
    { kind: 'fnHeader', variant: 'step', text: 'DIFFERENTIATE MECHANISM' },
    {
      kind: 'cardGrid',
      connectAfter: false,
      tiles: [
        { anat: 'nasal', sys: 'Engorgement of normal vasculature · most common cause', loc: 'Anterior uveitis', link: { to: 'lesion', loc: 'LOC-RE-UVEA', name: 'Anterior uvea — uveitis' } },
        { anat: 'larynx', sys: 'Pre-iridal fibrovascular membranes — chronic insult', loc: 'Iris rubeosis / PIFM', link: { to: 'lesion', loc: 'LOC-RE-UVEA', name: 'Anterior uvea — rubeosis / PIFM' } },
        { anat: 'pleural', sys: 'Pigmented or vascular mass · iris cyst differential', loc: 'Iris neoplasia', link: { to: 'lesion', loc: 'LOC-RE-UVEA', name: 'Iris mass / neoplasia' } },
        { anat: 'mechanic', sys: 'Bleed into anterior chamber', loc: 'Anterior chamber bleed', link: { to: 'lesion', loc: 'LOC-RE-AC', name: 'Hyphaema / iris bleed' } },
      ],
    },
    {
      kind: 'callout',
      tone: 'purple',
      gap: 10,
      html: '💡 <strong>True iris rubeosis</strong> = new vessel growth across the iris surface (PIFM) — usually chronic uveitis, intraocular tumour, retinal detachment or glaucoma. Distinguish from simple <strong>uveitic hyperaemia</strong> (reversible engorgement) by chronicity, response to anti-inflammatories, and ultrasound for posterior segment disease.',
    },
  ],
}

// ── Sub-flow: Intraocular Bleed (fn layout) ─────────────────────────────────
const redEyeBleed: FlowPage = {
  id: 'red-eye-bleed',
  title: 'Red Eye — Intraocular Bleed',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'rest', text: 'INTRAOCULAR BLEED' },
    { kind: 'fnHeader', variant: 'step', text: 'LOCALISE BLEED' },
    {
      kind: 'cardGrid',
      connectAfter: false,
      tiles: [
        { anat: 'pleural', sys: 'Blood in AC ± hypopyon ± aqueous flare', loc: 'Hyphaema', badge: '⚠️ CHECK BP + COAGS', link: { to: 'lesion', loc: 'LOC-RE-AC', name: 'Anterior chamber — hyphaema' } },
        { anat: 'mechanic', sys: 'Posterior segment haemorrhage · obscures fundus', loc: 'Vitreal haemorrhage', link: { to: 'lesion', loc: 'LOC-RE-AC', name: 'Vitreal cavity bleed' } },
        { anat: 'nasal', sys: 'Retinal detachment · bullous lesions · hypertension', loc: 'Retinal / choroidal haemorrhage', link: { to: 'lesion', loc: 'LOC-RE-RETINA', name: 'Retinal / choroidal bleed' } },
        { anat: 'larynx', sys: 'Uncommon · always with corneal neovascularisation', loc: 'Intracorneal haemorrhage', link: { to: 'lesion', loc: 'LOC-RE-CORNEA-SUP', name: 'Intracorneal haemorrhage' } },
      ],
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      html: '⚡ <strong>Any intraocular bleed → systemic workup:</strong> blood pressure, CBC + smear, platelet count, BMBT, PT/aPTT, retinal exam of opposite eye. Bilateral hyphaema with retinal detachment → systemic hypertension until proven otherwise (CKD, hyperthyroidism, HAC, primary HT). Unilateral with trauma history → trauma or intraocular neoplasia.',
    },
  ],
}

// ── Sub-flow: Retrobulbar / Orbital (fn layout) ─────────────────────────────
const redEyeOrbit: FlowPage = {
  id: 'red-eye-orbit',
  title: 'Red Eye — Retrobulbar',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'mixed', text: 'RETROBULBAR / ORBITAL DISEASE' },
    { kind: 'fnHeader', variant: 'step', text: 'KEY EXAM CLUES' },
    {
      // Legacy uses a `.dx-check` box here, sitting between two .fn-arrow
      // connectors → must be a spine block, so a neutral callout (not html).
      kind: 'callout',
      tone: 'neutral',
      html: '• Exophthalmos · third eyelid protrusion · resistance on retropulsion<br>' +
        '• Pain on opening mouth (zygomatic abscess/cellulitis) — typical of acute orbital inflammation<br>' +
        '• Strabismus (extraocular muscle involvement)<br>' +
        '• Exposure keratitis from incomplete blink<br>' +
        '• Acute + painful + young/mid-age dog → orbital cellulitis / abscess (often dental)<br>' +
        '• Chronic + non-painful + older patient → orbital neoplasia until proven otherwise<br>' +
        '• Cat: zygomatic salivary mucocoele · retrobulbar lymphoma<br>' +
        '• Masticatory muscle myositis (MMM) → bilateral exophthalmos + jaw pain + 2M antibodies',
    },
    {
      kind: 'cardGrid',
      tiles: [
        { anat: 'pleural', sys: 'Acute · painful · pyrexia', loc: 'Orbital cellulitis / abscess', link: { to: 'lesion', loc: 'LOC-RE-ORBIT', name: 'Retrobulbar — inflammatory' } },
        { anat: 'mechanic', sys: 'Chronic · non-painful · older patient', loc: 'Orbital neoplasia', link: { to: 'lesion', loc: 'LOC-RE-ORBIT', name: 'Retrobulbar — mass' } },
      ],
    },
  ],
}

export const redEyeFlows: FlowPage[] = [redEyeEntry, redEyeCoats, redEyeIris, redEyeBleed, redEyeOrbit]
