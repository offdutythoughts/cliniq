// ClinIQ application logic — bridges original render functions to React state
// render() generates HTML strings; React injects them via dangerouslySetInnerHTML
// onclick handlers in generated HTML call window globals set up by mountGlobals()

/* eslint-disable */
// @ts-nocheck

import { SIGNS } from './signs/registry'
import { renderFlowPage } from './signs/renderFlow'
import { FLOWS } from './signs/flows'
import { renderDxApproach } from './signs/renderDx'
import { DX } from './signs/dx'
import { DB } from '../data/db'

type SetContent = (html: string, dir: 'left' | 'right') => void
type SetTopbar = (title: string, showBack: boolean) => void
type SetTab = (tab: number) => void
type SetPage = (pageKey: string, pageTitle: string) => void

let _setContent: SetContent = () => {}
let _setTopbar: SetTopbar = () => {}
let _setTab: SetTab = () => {}
let _setPage: SetPage = () => {}

// HMR resilience: restore callbacks from window if the module is hot-reloaded
// (Turbopack re-evaluates the module on file save, resetting module-level vars)
if (typeof window !== 'undefined' && (window as any).__cliniqCbs) {
  const cb = (window as any).__cliniqCbs
  _setContent = cb.c
  _setTopbar = cb.t
  _setTab = cb.s
  if (cb.p) _setPage = cb.p
}

export function initCliniqApp(setContent: SetContent, setTopbarCb: SetTopbar, setTabCb: SetTab, setPageCb: SetPage) {
  _setContent = setContent
  _setTopbar = setTopbarCb
  _setTab = setTabCb
  _setPage = setPageCb
  // Persist across HMR re-evaluations
  if (typeof window !== 'undefined') {
    ;(window as any).__cliniqCbs = { c: setContent, t: setTopbarCb, s: setTabCb, p: setPageCb }
  }
}


function $(id){ return document.getElementById(id); }

// ── REACT-AWARE NAVIGATION ───────────────────────────────────────────────────
var slideDir = 'right';
var currentNoteKey = 'tab-0';
var currentNoteTitle = 'Clinical — General';
var currentNav = 0;
var history = [];
var openSystems = new Set();

// HMR: restore currentNav so we re-render the right tab
if (typeof window !== 'undefined' && (window as any).__cliniqState) {
  currentNav = (window as any).__cliniqState.nav ?? 0;
}

function _cb() { return (typeof window !== 'undefined' && (window as any).__cliniqCbs) || { c: _setContent, t: _setTopbar, s: _setTab, p: _setPage } }

function _pageSlug(fnName) {
  // 'renderRedEyeFlow' → 'redEyeFlow'
  return fnName.replace(/^render/, '').replace(/^[A-Z]/, function(c){ return c.toLowerCase(); });
}

function render(html) {
  _cb().c(html, slideDir);
  _cb().p(currentNoteKey, currentNoteTitle);
  slideDir = 'right';
}

function setTopbar(title, showBack) {
  _cb().t(title, showBack && history.length > 0);
}

var _goingBack = false;
function push(fn, title, key) {
  if (!_goingBack) history.push({ fn, title, nav: currentNav });
  if (key !== undefined) {
    currentNoteKey = key;
    if (title) currentNoteTitle = title;
  } else if (fn && fn.name) {
    currentNoteKey = 'page:' + _pageSlug(fn.name);
    currentNoteTitle = title || fn.name;
  }
  setTopbar(title, history.length > 0);
}
function replace(fn, title, key) {
  if (history.length > 0) {
    history[history.length - 1] = { fn, title, nav: currentNav };
  } else {
    history.push({ fn, title, nav: currentNav });
  }
  if (key !== undefined) {
    currentNoteKey = key;
    if (title) currentNoteTitle = title;
  } else if (fn && fn.name) {
    currentNoteKey = 'page:' + _pageSlug(fn.name);
    currentNoteTitle = title || fn.name;
  }
  setTopbar(title, history.length > 0);
}
function goBack() {
  if (!history.length) return;
  history.pop();
  const prev = history[history.length - 1];
  slideDir = 'left';
  _goingBack = true;
  if (prev) {
    if (prev.nav !== undefined && prev.nav !== currentNav) {
      currentNav = prev.nav;
      _setTab(prev.nav);
    }
    prev.fn();
    setTopbar(prev.title, history.length > 0);
  } else {
    navTo(currentNav, true);
  }
  _goingBack = false;
}

function navTo(n, noHistory) {
  currentNav = n;
  if (typeof window !== 'undefined') (window as any).__cliniqState = { nav: n };
  if (!noHistory) history = [];
  var tabNames = ['Clinical', 'Diagnostic', 'Disease', 'Protocols', 'Settings'];
  currentNoteKey = 'tab-' + n;
  currentNoteTitle = tabNames[n] + ' — General';
  _cb().s(n);
  setTopbar('', false);
  try {
    if (n === 0) renderLocalise();
    else if (n === 1) renderLesionHome();
    else if (n === 2) renderDiseaseHome();
    else if (n === 3) renderProtoList();
    else if (n === 4) renderSettings();
  } catch(e) {
    console.error('[ClinIQ navTo] render error for tab', n, e);
    _setContent('<div style="padding:20px;color:#DC2626;font-size:13px;background:#fff0f0;border-radius:8px;margin:16px;"><strong>Tab render error (tab '+n+')</strong><br><pre style="margin-top:8px;white-space:pre-wrap;font-size:11px;">'+(e && e.stack ? e.stack : String(e))+'</pre></div>', 'right');
  }
}

function toggleSystem(id) {
  if (openSystems.has(id)) openSystems.delete(id); else openSystems.add(id);
  renderLesionHome();
}

function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('cliniq-theme', t);
  renderSettings();
}

function renderSettings(){
  if(currentNav!==4) navTo(4,true);
  const dark = document.documentElement.getAttribute('data-theme')==='dark';
  const btnBase='padding:7px 18px;border-radius:6px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;';
  const active=btnBase+'background:var(--teal);color:#fff;';
  const inactive=btnBase+'background:transparent;color:var(--gray);';
  render(`
    <div style="padding:4px 0 20px;">
      <div style="font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px;">Appearance</div>
      <div style="background:var(--navy2);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
        <div style="padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div>
            <div style="font-size:14px;font-weight:500;color:var(--white);">Theme</div>
            <div style="font-size:12px;color:var(--gray);margin-top:2px;">${dark?'Dark':'Light'} mode active</div>
          </div>
          <div style="display:flex;background:var(--navy3);border-radius:8px;padding:3px;gap:2px;flex-shrink:0;">
            <button onclick="setTheme('light')" style="${!dark?active:inactive}">☀️ Light</button>
            <button onclick="setTheme('dark')" style="${dark?active:inactive}">🌙 Dark</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function urgTag(u){
  if(!u)return'';
  const u2=u.toUpperCase();
  if(u2==='EMERGENCY') return'<span class="tag tag-em">⚠️ EMERGENCY</span>';
  if(u2==='HIGH') return'<span class="tag tag-hi">↑ High</span>';
  if(u==='Moderate'||u==='Moderate–High'||u==='Low–Moderate') return'<span class="tag tag-mo">Moderate</span>';
  return'<span class="tag tag-lo">Low</span>';
}
function spTag(sp){
  if(!sp)return'';
  if(sp==='Dog') return'<span class="tag tag-sp-dog">Dog</span>';
  if(sp==='Cat') return'<span class="tag tag-sp-cat">Cat</span>';
  return'<span class="tag tag-sp-all">Dog + Cat</span>';
}
function urgClass(u){
  if(!u)return'';
  const u2=u.toUpperCase();
  if(u2==='EMERGENCY')return' em';
  if(u2==='HIGH')return' hi';
  return'';
}
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ── HOME / LOCALISE ───────────────────────────────────────────────────────────
// Sign cards are generated from the SIGNS registry (./signs/registry) — the
// single source of truth for the home screen. To add/edit a sign, change the
// registry, not this function.
function renderLocalise(){
  const cards = SIGNS.map(s=>
    `<div class="card" onclick="renderFlowId('${s.flowId}')"><div class="card-row"><div class="card-icon">${s.icon}</div><div style="flex:1"><div class="card-title">${esc(s.title)}</div><div class="card-sub">${esc(s.sub)}</div></div><div class="card-arrow">›</div></div></div>`
  ).join('');
  render(`
  <div class="stitle">Select a clinical sign</div>
  ${cards}
  <div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.</div>
  `);
}

// ── DATA-DRIVEN FLOW DISPATCH ─────────────────────────────────────────────────
// Renders a flow page from FLOWS data. Home cards and flow→flow links both route
// here. Every clinical sign is migrated, so FLOWS is the sole source.
function renderFlowId(flowId){
  const page = FLOWS[flowId];
  if(page){
    push(()=>renderFlowId(flowId), page.title, 'flow:'+flowId);
    render(renderFlowPage(page));
    return;
  }
  render('<div class="empty"><h3>Not found</h3><p>Flow “'+esc(flowId)+'” is not available.</p></div>');
}

// Diagnostic-approach dispatch. Migrated signs (in DX) render from data; signs
// not yet migrated fall back to their legacy renderDx<Pascal><Tab> function.
// `tab` is one of history|exam|dx. Uses replace() + the legacy note key so the
// 3-tab nav swaps in place exactly like the hand-authored views did.
function renderDxId(sign, tab){
  tab = tab || 'history';
  const approach = DX[sign];
  if(approach){
    // The note key matches the legacy page slug (page:dx<Stem><Tab>) so saved
    // notes carry over. <Stem> = Pascal of the kebab key, except PUPD's all-caps.
    const Pascal = (sign === 'pupd') ? 'PUPD' : sign.replace(/(^|[-_ ])(\w)/g, function(_,__,c){ return c.toUpperCase(); });
    const Tab = tab.charAt(0).toUpperCase() + tab.slice(1); // History | Exam | Dx
    const t = approach.tabs[tab] || approach.tabs.history;
    replace(()=>renderDxId(sign, tab), t.title, 'page:dx'+Pascal+Tab);
    render(renderDxApproach(sign, approach, tab));
    return;
  }
  render('<div class="empty"><h3>Not found</h3><p>Diagnostic approach “'+esc(sign)+'” is not available.</p></div>');
}

// ── DYSPNOEA FLOWCHART ────────────────────────────────────────────────────────

function goLocEp(locId, locName, system, cls){
  push(()=>goLocEp(locId,locName,system,cls), locName, 'loc:'+locId);
  currentNoteTitle = locName;
  const lesions = DB.lesion_type.filter(l=>l.loc===locId);
  render(`
  <div class="fn-ep ${cls}" style="cursor:default;margin-bottom:14px;">
    <div class="ep-sys">${esc(system)}</div>
    <div class="ep-loc">📍 ${esc(locName)}</div>
  </div>
  <div class="stitle">${lesions.length} lesion type${lesions.length!==1?'s':''} at this location</div>
  ${lesions.length ? lesions.map(l=>`
    <div class="lesion-card${urgClass(l.urg)}" onclick="renderLesionDetail('${l.id}')">
      <div class="lesion-head">${urgTag(l.urg)}<span class="lesion-cat">${esc(l.cat)}</span></div>
      <div class="lesion-name">${esc(l.sub)}</div>
      <div class="lesion-signs">${esc(l.signs)}</div>
      ${l.proto?`<div class="lesion-proto">→ Protocol: ${esc(l.proto)}</div>`:''}
    </div>`).join('') : '<div class="empty"><p>No lesion types for this location yet.</p></div>'}
  `);
}

// ── VOMITING FLOWCHART ────────────────────────────────────────────────────────

// ── LESION DETAIL ─────────────────────────────────────────────────────────────
function renderLesionDetail(id){
  const l = DB.lesion_type.find(x=>x.id===id);
  if(!l)return;
  push(()=>renderLesionDetail(id), l.sub, 'lesion:'+id);
  const diffs = DB.differentials.filter(d=>d.filter===l.filter).sort((a,b)=>a.order-b.order);
  render(`
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">${urgTag(l.urg)}${spTag(l.sp)}<span class="tag tag-sp-all">${esc(l.cat)}</span></div>
  <div class="detail-label">Key clinical signs</div>
  <div class="detail-val highlight">${esc(l.signs)}</div>
  ${l.note?`<div class="detail-label">Clinical notes</div><div class="detail-val">${esc(l.note)}</div>`:''}
  ${l.proto?`
  <hr class="sep">
  <div class="card" onclick="renderProtoDetail('${l.proto}')">
    <div class="card-row"><div><div class="card-title">⚡ Protocol: ${esc(l.proto)}</div><div class="card-sub">Tap to open</div></div><div class="card-arrow">›</div></div>
  </div>`:''}
  <hr class="sep">
  <div class="stitle">${diffs.length} differential${diffs.length!==1?'s':''}</div>
  ${diffs.length ? diffs.map((d,i)=>`
  <div class="diff-row" onclick="renderDiffDetail('${d.id}')">
    <div class="diff-num">${i+1}</div>
    <div class="diff-body">
      <div class="diff-name">${esc(d.name)}</div>
      <div class="diff-feat">${esc(d.feat)}</div>
    </div>
    <div class="diff-arrow">›</div>
  </div>`).join('') : '<div class="empty"><p>No differentials listed yet for this lesion type.</p></div>'}
  `);
}

// ── LESION HOME ───────────────────────────────────────────────────────────────

function renderLesionHome(){
  render(`
  <div class="stitle">Diagnostic approaches</div>
  <div class="card" onclick="renderDxId('encephalopathy')"><div class="card-row"><div class="card-icon">🧬</div><div style="flex:1"><div class="card-title">Acute Encephalopathy</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('myelopathy')"><div class="card-row"><div class="card-icon">🦴</div><div style="flex:1"><div class="card-title">Acute Myelopathy</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('vestibular')"><div class="card-row"><div class="card-icon">🌀</div><div style="flex:1"><div class="card-title">Acute Vestibular</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('abnormal-pupil')"><div class="card-row"><div class="card-icon">🔵</div><div style="flex:1"><div class="card-title">Anisocoria / Abnormal Pupil</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('ataxia')"><div class="card-row"><div class="card-icon">🚶</div><div style="flex:1"><div class="card-title">Ataxia</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('bleeding')"><div class="card-row"><div class="card-icon">🔴</div><div style="flex:1"><div class="card-title">Bleeding / Petechiae / Ecchymoses</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('blind-eye')"><div class="card-row"><div class="card-icon">⚫</div><div style="flex:1"><div class="card-title">Blind Eye / Acute Vision Loss</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('coughing')"><div class="card-row"><div class="card-icon">🫁</div><div style="flex:1"><div class="card-title">Coughing</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('diarrhoea')"><div class="card-row"><div class="card-icon">💩</div><div style="flex:1"><div class="card-title">Diarrhoea</div><div class="card-sub">Dog + Cat · Small bowel vs large bowel diagnostic approach</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('dyspnoea')"><div class="card-row"><div class="card-icon">🌬️</div><div style="flex:1"><div class="card-title">Dyspnoea</div><div class="card-sub">Dog 🐕 + Cat 🐱 · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('epistaxis')"><div class="card-row"><div class="card-icon">👃</div><div style="flex:1"><div class="card-title">Epistaxis</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('haematuria')"><div class="card-row"><div class="card-icon">🩸</div><div style="flex:1"><div class="card-title">Haematuria</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('jaundice')"><div class="card-row"><div class="card-icon">🟡</div><div style="flex:1"><div class="card-title">Jaundice</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('pale-gums')"><div class="card-row"><div class="card-icon">🩸</div><div style="flex:1"><div class="card-title">Pale Mucous Membranes</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('pupd')"><div class="card-row"><div class="card-icon">💧</div><div style="flex:1"><div class="card-title">Polyuria / Polydipsia</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('red-eye')"><div class="card-row"><div class="card-icon">👁️</div><div style="flex:1"><div class="card-title">Red Eye</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('regurgitation')"><div class="card-row"><div class="card-icon">🔄</div><div style="flex:1"><div class="card-title">Regurgitation</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('seizures')"><div class="card-row"><div class="card-icon">🧠</div><div style="flex:1"><div class="card-title">Seizures</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('sneezing')"><div class="card-row"><div class="card-icon">🤧</div><div style="flex:1"><div class="card-title">Sneezing</div><div class="card-sub">Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('vomiting')"><div class="card-row"><div class="card-icon">🤢</div><div style="flex:1"><div class="card-title">Vomiting</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('weakness')"><div class="card-row"><div class="card-icon">⚡</div><div style="flex:1"><div class="card-title">Weakness / Collapse</div><div class="card-sub">Dog + Cat · Stepwise diagnostic workup</div></div><div class="card-arrow">›</div></div></div>
  <div class="card" onclick="renderDxId('wet-eye')"><div class="card-row"><div class="card-icon">💧</div><div style="flex:1"><div class="card-title">Wet Eye / Epiphora</div><div class="card-sub">Dog + Cat · History · Exam · Diagnostics</div></div><div class="card-arrow">›</div></div></div>
  <div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.</div>
  `);
}

function renderLesionFlow(locId, locName){
  push(()=>renderLesionFlow(locId,locName), locName, 'loc:'+locId);
  currentNoteTitle = locName;
  const allLesions = DB.lesion_type.filter(l=>l.loc===locId);
  const cats = [...new Set(allLesions.map(l=>l.cat))];

  // Category colour map
  const CAT_STYLE = {
    'Fluid':              'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.35);color:#BFDBFE;',
    'Gas':                'background:rgba(217,119,6,0.12);border-color:rgba(217,119,6,0.35);color:var(--amber-text);',
    'Mass':               'background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.35);color:#DDD6FE;',
    'Mass/Neoplasia':     'background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.35);color:#DDD6FE;',
    'Fluid/Oedema':       'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.35);color:#BFDBFE;',
    'Fluid/Inflammation': 'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.35);color:#BFDBFE;',
    'Inflammation':       'background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.35);color:#A7F3D0;',
    'Obstruction':        'background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:#FCA5A5;',
    'Obstruction/Dysmotility': 'background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:#FCA5A5;',
    'Dysmotility':        'background:rgba(100,116,139,0.12);border-color:rgba(100,116,139,0.35);color:#CBD5E1;',
    'Ulceration':         'background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.35);color:#FED7AA;',
    'Neuromuscular':      'background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.35);color:#E9D5FF;',
    'Dynamic collapse':   'background:rgba(100,116,139,0.12);border-color:rgba(100,116,139,0.35);color:#CBD5E1;',
    'Metabolic':          'background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.35);color:#FED7AA;',
    'Endocrine':          'background:rgba(217,119,6,0.12);border-color:rgba(217,119,6,0.35);color:var(--amber-text);',
    'Idiopathic':         'background:rgba(100,116,139,0.12);border-color:rgba(100,116,139,0.35);color:#CBD5E1;',
    'Inflammatory':       'background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.35);color:#A7F3D0;',
    'Infectious':         'background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.35);color:#FED7AA;',
    'Neoplastic':         'background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.35);color:#DDD6FE;',
    'Vascular':           'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.35);color:#BFDBFE;',
    'Toxic':              'background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:#FCA5A5;',
    'Nutritional':        'background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#FCD34D;',
    'Congenital':         'background:rgba(56,189,248,0.10);border-color:rgba(56,189,248,0.35);color:#BAE6FD;',
    'Traumatic':          'background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:#FCA5A5;',
    'Compressive':        'background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:#FCA5A5;',
    'Non-compressive':    'background:rgba(249,115,22,0.12);border-color:rgba(249,115,22,0.35);color:#FED7AA;',
    'Neoplasia':          'background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.35);color:#DDD6FE;',
  };
  const defaultStyle = 'background:var(--card2);border-color:var(--border2);color:var(--white);';

  const catGrid = cats.length <= 3 ? `grid-template-columns:repeat(${cats.length},1fr)`
                : cats.length === 4 ? 'grid-template-columns:repeat(4,1fr)'
                : 'grid-template-columns:repeat(3,1fr)';

  render(`
  <div class="flow-wrap">
    <div class="flow-node entry">📍 ${esc(locName)}</div>
    <div class="flow-arrow-v">↓</div>
    <div class="flow-node step" style="font-size:11px;">IDENTIFY LESION CATEGORY</div>
    <div class="flow-arrow-v">↓</div>

    <!-- Category row -->
    <div style="display:grid;${catGrid};gap:6px;width:100%;">
      ${cats.map(cat=>{
        const style = CAT_STYLE[cat] || defaultStyle;
        const items = allLesions.filter(l=>l.cat===cat);
        return `<div class="flow-node" style="${style}cursor:pointer;font-size:11px;" onclick="renderSubTypeFlow('${locId}','${esc(locName)}','${esc(cat)}')">${esc(cat)}<br><span style="font-size:9px;opacity:.7">${items.length} type${items.length!==1?'s':''}</span></div>`;
      }).join('')}
    </div>

    <div class="flow-arrow-v">↓</div>
    <div style="padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;font-size:11px;color:var(--gray);text-align:center;width:100%;">
      Tap a category to see sub-types and urgency
    </div>
  </div>
  `);
}

function renderSubTypeFlow(locId, locName, cat){
  push(()=>renderSubTypeFlow(locId,locName,cat), cat, 'loc:'+locId+':'+cat);
  currentNoteTitle = locName + ' — ' + cat;
  const items = DB.lesion_type.filter(l=>l.loc===locId && l.cat===cat);

  const URG_STYLE = {
    'EMERGENCY': 'background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.5);color:#FCA5A5;',
    'High':      'background:rgba(217,119,6,0.15);border-color:rgba(217,119,6,0.5);color:var(--amber-text);',
    'Moderate':  'background:rgba(13,148,136,0.15);border-color:rgba(13,148,136,0.5);color:#99F6E4;',
    'Moderate–High': 'background:rgba(217,119,6,0.15);border-color:rgba(217,119,6,0.5);color:var(--amber-text);',
    'Low–Moderate':  'background:rgba(13,148,136,0.15);border-color:rgba(13,148,136,0.5);color:#99F6E4;',
    'Low':       'background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.35);color:#BFDBFE;',
  };

  const subGrid = items.length <= 2 ? `grid-template-columns:repeat(${items.length},1fr)`
               : items.length === 3 ? 'grid-template-columns:repeat(3,1fr)'
               : 'grid-template-columns:repeat(2,1fr)';

  render(`
  <div class="flow-wrap">
    <div class="flow-node entry" style="font-size:11px;">📍 ${esc(locName)}</div>
    <div class="flow-arrow-v">↓</div>
    <div class="flow-node" style="background:rgba(255,255,255,0.07);border-color:var(--border2);color:var(--white);font-size:12px;">${esc(cat)}</div>
    <div class="flow-arrow-v">↓</div>
    <div class="flow-node step" style="font-size:11px;">IDENTIFY SUB-TYPE</div>
    <div class="flow-arrow-v">↓</div>

    <!-- Sub-type cards — tappable words -->
    <div style="display:grid;${subGrid};gap:8px;width:100%;">
      ${items.map(item=>{
        const s = URG_STYLE[item.urg] || URG_STYLE['Moderate'];
        const hasProto = !!item.proto;
        return `<div onclick="renderSubTypeDetail('${item.id}')" style="${s}border:1.5px solid;border-radius:12px;padding:10px 10px;cursor:pointer;transition:all .2s;font-size:11px;font-weight:600;text-align:center;line-height:1.4;">
          ${esc(item.sub)}
          <div style="font-size:9px;font-weight:400;opacity:.75;margin-top:4px;">${urgTag(item.urg)}</div>
          ${hasProto ? `<div style="font-size:9px;color:#2DD4BF;margin-top:3px;">→ Protocol available</div>` : ''}
        </div>`;
      }).join('')}
    </div>

    <div class="flow-arrow-v">↓</div>
    <div style="padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;font-size:11px;color:var(--gray);text-align:center;width:100%;">
      Tap a sub-type to see key signs, urgency and differentials
    </div>
  </div>
  `);
}

function renderSubTypeDetail(id){
  const l = DB.lesion_type.find(x=>x.id===id);
  if(!l)return;
  if(l.directDis && l.dis){ currentNav=2; _setTab(2); renderDiseasePage(l.dis); return; }
  const title = l.sub.slice(0,30)+(l.sub.length>30?'…':'');
  push(()=>renderSubTypeDetail(id), title, 'lesion:'+id);
  currentNoteTitle = l.sub;

  const diffs = DB.differentials.filter(d=>d.filter===l.filter).sort((a,b)=>a.order-b.order);
  const isEM = l.urg === 'EMERGENCY';

  // Collect unique diagnostic tests from differentials
  const dxTests = new Set();
  diffs.forEach(d=>{
    if(d.minDx) d.minDx.split(',').forEach(t=>dxTests.add(t.trim()));
    if(d.addDx) d.addDx.split(',').forEach(t=>{if(t.trim())dxTests.add(t.trim());});
  });

  render(`
  ${isEM ? '<div class="em-alert">⚠️ EMERGENCY — initiate stabilisation before full diagnostic workup</div>' : ''}
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">${urgTag(l.urg)}${spTag(l.sp)}<span class="tag tag-sp-all">${esc(l.cat)}</span></div>

  ${l.proto?`
  <div class="card" style="margin-bottom:14px;" onclick="renderProtoDetail('${l.proto}')">
    <div class="card-row"><div><div class="card-title">⚡ Protocol: ${esc(l.proto)}</div><div class="card-sub">Tap to open step-by-step protocol</div></div><div class="card-arrow">›</div></div>
  </div>`:''}

  <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Etiology</div>
    <div style="font-size:12px;color:var(--white);line-height:1.6;">${esc(l.sub)}</div>
    ${(l.etiology||diffs.length) ? '<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);">'+(l.etiology ? l.etiology.split('|').map(e=>{const t=e.trim();if(t.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;">▸ '+esc(t.slice(1).trim())+'</div>';const isInd=t.startsWith('-');const inner=isInd?t.slice(1).trim():t;if(inner.startsWith('@')){const ci=inner.indexOf(':');const did=ci>0?inner.slice(1,ci):inner.slice(1);const lbl=ci>0?inner.slice(ci+1):did;const lk='<span onclick="renderDiseasePage(\''+did+'\')" style="color:var(--teal-light);text-decoration:underline;cursor:pointer;">'+esc(lbl)+'</span>';return isInd?'<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+lk+'</div>':'<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+lk+'</div>';}if(isInd)return '<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+esc(inner)+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(inner)+'</div>';}).join('') : diffs.map(d=>'<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(d.name)+'</div>').join(''))+'</div>' : ''}
  </div>

  <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Clinical Signs</div>
    <div style="font-size:12px;color:var(--gray);line-height:1.6;">${esc(l.signs)}</div>
  </div>

  ${l.patho?`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Pathophysiology</div>
    ${l.patho.split('|').map(p=>'<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(p.trim())+'</div>').join('')}
  </div>`:''}

  ${(l.diag||dxTests.size)?`
  <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Diagnostic Investigation</div>
    ${l.diag ? l.diag.split('|').map(d=>{const t=d.trim();if(t.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;">▸ '+esc(t.slice(1).trim())+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(t)+'</div>';}).join('') : ''}
    ${(!l.diag && dxTests.size) ? '<div>'+ [...dxTests].map(t=>'<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(t)+'</div>').join('')+'</div>' : ''}
  </div>`:''}

  ${l.treat?`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">General Treatment</div>
    ${l.treat.split('|').map(t=>{const s=t.trim();if(s.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;">▸ '+esc(s.slice(1).trim())+'</div>';if(s.startsWith('-'))return '<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+esc(s.slice(1).trim())+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(s)+'</div>';}).join('')}
  </div>`:''}

  ${l.ddx?`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Differential Diagnosis</div>
    ${l.ddx.split('|').map(d=>{const t=d.trim();if(t.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;">▸ '+esc(t.slice(1).trim())+'</div>';if(t.startsWith('-'))return '<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+esc(t.slice(1).trim())+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(t)+'</div>';}).join('')}
  </div>`:''}

  ${l.note?`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Notes</div>
    <div style="font-size:11px;color:var(--gray);line-height:1.6;">${esc(l.note)}</div>
  </div>`:''}

  ${l.dis?`
  <div class="card" style="margin-bottom:14px;" onclick="renderDiseasePage('${l.dis}')">
    <div class="card-row"><div><div class="card-title">📋 Disease Page</div><div class="card-sub">Tap to view full disease profile</div></div><div class="card-arrow">›</div></div>
  </div>`:''}

  `);
}

function renderDiffFlowchart(diffs, subName){
  // Render differentials as a flowchart — location box → ranked diff nodes → tap → disease page
  const cols = diffs.length <= 2 ? `grid-template-columns:repeat(${diffs.length},1fr)`
             : diffs.length === 3 ? 'grid-template-columns:repeat(3,1fr)'
             : 'grid-template-columns:repeat(2,1fr)';

  return `
  <div class="flow-wrap" style="gap:4px;">
    <div class="flow-node step" style="font-size:11px;">POSSIBLE CAUSES — ${esc(subName)}</div>
    <div class="flow-arrow-v">↓</div>
    <div style="display:grid;${cols};gap:7px;width:100%;">
      ${diffs.map((d,i)=>`
      <div onclick="renderDiffDetail('${d.id}')" style="background:rgba(255,255,255,0.05);border:1px solid var(--border2);border-radius:12px;padding:10px 10px;cursor:pointer;transition:all .2s;text-align:center;">
        <div style="font-size:10px;font-weight:700;color:var(--white);line-height:1.4;margin-bottom:5px;">${esc(d.name)}</div>
        <div style="font-size:9px;color:var(--gray);line-height:1.4;margin-bottom:5px;">${esc((d.feat||'').slice(0,55))}${(d.feat||'').length>55?'…':''}</div>
        <div style="font-size:9px;background:var(--card2);border-radius:6px;padding:2px 6px;color:var(--gray2);">Dx: ${esc((d.minDx||'').slice(0,40))}${(d.minDx||'').length>40?'…':''}</div>
        ${d.dis?`<div style="font-size:9px;color:var(--teal-light);margin-top:5px;font-weight:600;">📋 Disease page →</div>`:''}
      </div>`).join('')}
    </div>
  </div>`;
}

// ── DIFFERENTIALS HOME ────────────────────────────────────────────────────────
function renderDiffHome(){
  render(`
  <div class="search-wrap">
    <span class="search-icon">🔍</span>
    <input type="text" placeholder="Search differentials..." oninput="filterDiffs(this.value)" id="diff-search">
  </div>
  <div style="padding:9px 12px;background:rgba(13,148,136,0.07);border:1px solid rgba(13,148,136,0.2);border-radius:10px;font-size:11px;color:#2DD4BF;margin-bottom:12px;">
    💡 Best accessed via Lesion tab: tap a location → category → sub-type → see differentials as a flowchart
  </div>
  <div class="stitle">${DB.differentials.length} differentials — all signs</div>
  <div id="diff-list">${renderDiffRows(DB.differentials)}</div>
  `);
}
function renderDiffRows(diffs){
  if(!diffs.length) return'<div class="empty"><p>No results</p></div>';
  return diffs.map((d,i)=>`
  <div class="diff-row" onclick="renderDiffDetail('${d.id}')">
    <div class="diff-num">${i+1}</div>
    <div class="diff-body">
      <div class="diff-name">${esc(d.name)}</div>
      <div class="diff-feat">${esc((d.feat||'').slice(0,70))}${(d.feat||'').length>70?'…':''}</div>
    </div>
    <div class="diff-arrow">›</div>
  </div>`).join('');
}
function filterDiffs(q){
  const filtered = q ? DB.differentials.filter(d=>
    d.name.toLowerCase().includes(q.toLowerCase()) ||
    (d.feat||'').toLowerCase().includes(q.toLowerCase())
  ) : DB.differentials;
  $('diff-list').innerHTML = renderDiffRows(filtered);
}

// ── DIFF DETAIL ───────────────────────────────────────────────────────────────
function renderDiffDetail(id){
  const d = DB.differentials.find(x=>x.id===id);
  if(!d)return;
  push(()=>renderDiffDetail(id), d.name.slice(0,30)+(d.name.length>30?'…':''), 'diff:'+id);
  currentNoteTitle = d.name;
  const dis = d.dis ? DB.disease_page.find(x=>x.id===d.dis) : null;
  render(`
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">${spTag(d.sp)}</div>
  <div class="detail-label">Key distinguishing feature</div>
  <div class="detail-val highlight">${esc(d.feat)}</div>
  <div class="detail-label">Minimum diagnostics</div>
  <div class="detail-val">${esc(d.minDx)}</div>
  ${d.addDx?`<div class="detail-label">Additional diagnostics</div><div class="detail-val">${esc(d.addDx)}</div>`:''}
  ${dis?`
  <hr class="sep">
  <div class="card" onclick="renderDiseasePage('${dis.id}')">
    <div class="card-row"><div><div class="card-title">📋 ${esc(dis.name)}</div><div class="card-sub">Open full disease page</div></div><div class="card-arrow">›</div></div>
  </div>`:''}  `);
}

// ── DISEASE HOME ──────────────────────────────────────────────────────────────
function renderDiseaseHome(){
  render(`
  <div class="search-wrap">
    <span class="search-icon">🔍</span>
    <input type="text" placeholder="Search disease pages..." oninput="filterDiseases(this.value)" id="dis-search">
  </div>
  <div class="stitle">${DB.disease_page.length} disease pages</div>
  <div id="dis-list">${renderDiseaseCards([...DB.disease_page].sort((a,b)=>a.name.localeCompare(b.name)))}</div>
  `);
}
function renderDiseaseCards(diseases){
  if(!diseases.length) return'<div class="empty"><p>No results</p></div>';
  return diseases.map(d=>`
  <div class="card" onclick="renderDiseasePage('${d.id}')">
    <div class="card-row">
      <div style="flex:1">
        <div class="card-title">${esc(d.name)}</div>
        <div class="card-sub" style="margin-top:3px;">${spTag(d.sp)} <span style="font-size:11px;color:var(--gray2)">${esc(d.synonyms||'')}</span></div>
      </div>
      <div class="card-arrow">›</div>
    </div>
  </div>`).join('');
}
function filterDiseases(q){
  const filtered = (q ? DB.disease_page.filter(d=>
    d.name.toLowerCase().includes(q.toLowerCase()) ||
    (d.synonyms||'').toLowerCase().includes(q.toLowerCase())
  ) : DB.disease_page).sort((a,b)=>a.name.localeCompare(b.name));
  $('dis-list').innerHTML = renderDiseaseCards(filtered);
}

// ── DISEASE PAGE ──────────────────────────────────────────────────────────────
function renderDiseasePage(id){
  const d = DB.disease_page.find(x=>x.id===id);
  if(!d){render('<div class="empty"><h3>Not found</h3><p>Disease page coming soon — add content in your Google Sheet.</p></div>');return;}
  push(()=>renderDiseasePage(id), '', 'disease:'+id);
  currentNoteTitle = d.name;
  const C = (title,body)=>`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">${title}</div>${body}</div>`;
  const linkify = (s)=>{
    if(s.startsWith('@')){const ci=s.indexOf(':');const did=ci>0?s.slice(1,ci):s.slice(1);const lbl=ci>0?s.slice(ci+1):did;const fn=did.startsWith('PROT-')?'renderProtoDetail':'renderDiseasePage';return '<span onclick="'+fn+'(\''+did+'\')" style="color:var(--teal-light);text-decoration:underline;cursor:pointer;">'+esc(lbl)+'</span>';}
    const re=/@([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)(?::([A-Za-z0-9 \/\-.]+))?/g;let last=0;const parts=[];let m;
    while((m=re.exec(s))!==null){if(m.index>last)parts.push(esc(s.slice(last,m.index)));const id=m[1],lbl=(m[2]||id).trim();const fn=id.startsWith('PROT-')?'renderProtoDetail':'renderDiseasePage';parts.push('<span onclick="'+fn+'(\''+id+'\')" style="color:var(--teal-light);text-decoration:underline;cursor:pointer;">'+esc(lbl)+'</span>');last=m.index+m[0].length;}
    if(last===0)return esc(s);parts.push(esc(s.slice(last)));return parts.join('');
  };
  const bul = (str)=>str.split('|').map(s=>{const t=s.trim();if(t.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;">▸ '+esc(t.slice(1).trim())+'</div>';if(t.startsWith('-'))return '<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+linkify(t.slice(1).trim())+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+linkify(t)+'</div>';}).join('');
  const txt = (str)=>`<div style="font-size:12px;color:var(--gray);line-height:1.6;">${esc(str)}</div>`;
  const pip = (str)=>str&&str.includes('|');
  const sub = (label)=>`<div style="font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-top:10px;margin-bottom:4px;padding-top:8px;border-top:1px solid var(--border);">${label}</div>`;
  render(`
  <div style="font-size:18px;font-weight:700;color:var(--white);margin-bottom:10px;line-height:1.3;">${esc(d.name)}</div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">${spTag(d.sp)}</div>
  ${d.topAlert?`<div style="background:rgba(220,38,38,0.18);border:1.5px solid rgba(220,38,38,0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:13px;font-weight:700;color:#FCA5A5;letter-spacing:.01em;">🚨 ${esc(d.topAlert)}</div>`:''}
  ${d.severe?`<div class="em-alert">⚠️ ${esc(d.severe)}</div>`:''}
  ${d.etiology?C('Etiology',bul(d.etiology)):''}
  ${C('Signalment',`
    <div style="font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;">Breed</div>
    <div style="font-size:12px;color:var(--gray);line-height:1.6;margin-bottom:8px;">${pip(d.breed)?bul(d.breed):esc(d.breed)}</div>
    <div style="font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;">Age</div>
    <div style="font-size:12px;color:var(--gray);line-height:1.6;margin-bottom:8px;">${pip(d.age)?bul(d.age):esc(d.age)}</div>
    ${d.sex?`<div style="font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;">Sex</div><div style="font-size:12px;color:var(--gray);line-height:1.6;">${esc(d.sex)}</div>`:''}
  `)}
  ${d.risk?C('Risk Factors',bul(d.risk)):''}
  ${C('Pathophysiology',pip(d.path)?bul(d.path):txt(d.path))}
  ${C('Clinical Signs',(pip(d.signs)?bul(d.signs):txt(d.signs))+(d.showGradingTable?injuryGradingTable():''))}
  ${C('Diagnostic Investigation',(pip(d.conf)?bul(d.conf):txt(d.conf))+(d.supp?sub('Supportive Diagnostics')+(pip(d.supp)?bul(d.supp):txt(d.supp)):'')+((d as any).locFunc?`<div style="margin-top:10px;"><div class="card" style="cursor:pointer;padding:10px 14px;" onclick="${(d as any).locFunc}()"><div class="card-row"><div class="card-icon">🔬</div><div style="flex:1;"><div class="card-title">Localise lesion</div><div class="card-sub">Phenylephrine test — interactive decision tree</div></div><div class="card-arrow">›</div></div></div></div>` : ''))}
  ${C('Treatment',`<div style="font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">First-line</div>${pip(d.tx1)?bul(d.tx1):txt(d.tx1)}${d.tx2?sub('Second-line / Alternatives')+(pip(d.tx2)?bul(d.tx2):txt(d.tx2)):''}`)}
  ${d.outpatient?C('Outpatient Protocol',pip(d.outpatient)?bul(d.outpatient):txt(d.outpatient)):''}
  ${C('Monitoring',pip(d.monitor)?bul(d.monitor):txt(d.monitor))}
  ${C('Prognosis',pip(d.prog)?bul(d.prog):txt(d.prog))}
  ${d.ddx?C('Differential Diagnosis',bul(d.ddx)):''}
  <div class="pearl">💡 Clinical pearls: ${esc(d.pearl)}</div>
  <div class="disclaimer">For qualified veterinary professionals only.</div>
  `);
}

// ── PROTOCOL LIST ─────────────────────────────────────────────────────────────
function renderProtoList(){
  const emergency = DB.protocols.filter(p=>p.id==='PROT-CPR'||p.id==='PROT-RESP'||p.id==='PROT-SHOCK'||p.id==='PROT-THOR');
  const neuro = DB.protocols.filter(p=>p.id.startsWith('PROT-SEIZ')||p.id.startsWith('PROT-NEURO')||p.id==='PROT-ATAXIA');
  const tox = DB.protocols.filter(p=>p.id==='PROT-TOX'||p.id.startsWith('PROT-TOX-'));
  const eye = DB.protocols.filter(p=>p.id.startsWith('PROT-EYE'));
  const icon = p => p.id.startsWith('PROT-TOX') ? '☠️' : p.id.startsWith('PROT-SEIZ')||p.id.startsWith('PROT-NEURO')||p.id==='PROT-ATAXIA' ? '🧠' : p.id.startsWith('PROT-EYE') ? '👁️' : '⚡';
  const card = p=>`
  <div class="card" onclick="renderProtoDetail('${p.id}')">
    <div class="card-row">
      <div style="flex:1">
        <div class="card-title">${icon(p)} ${esc(p.name)}</div>
        <div class="card-sub" style="margin-top:3px;">
          <span class="tag ${p.priority==='IMMEDIATE'?'tag-em':'tag-hi'}">${p.priority}</span>
          <span style="font-size:11px;color:var(--gray2);margin-left:6px;">${esc(p.sp)}</span>
        </div>
      </div>
      <div class="card-arrow">›</div>
    </div>
  </div>`;
  render(`
  <div class="stitle">Emergency Protocols</div>
  ${emergency.map(card).join('')}
  <div class="stitle">Neurology</div>
  ${neuro.map(card).join('')}
  <div class="stitle">Toxicology</div>
  ${tox.map(card).join('')}
  <div class="stitle">Ophthalmology</div>
  ${eye.map(card).join('')}
  <div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
  `);
}

function renderProtoDetail(id){
  const p = DB.protocols.find(x=>x.id===id);
  if(!p)return;
  push(()=>renderProtoDetail(id), p.name.slice(0,28), 'proto:'+id);
  currentNoteTitle = p.name;
  render(`
  <div class="em-alert">${p.priority==='IMMEDIATE'?'🚨':'⚡'} ${p.priority} — ${esc(p.trigger)}</div>
  <div class="stitle">Step-by-step</div>
  ${(()=>{const pbul=(str)=>str.split('|').map(t=>{t=t.trim();if(!t)return '';if(t.startsWith('#'))return '<div style="font-size:10px;font-weight:700;color:var(--teal-light);margin-top:6px;margin-bottom:2px;">▸ '+esc(t.slice(1).trim())+'</div>';if(t.startsWith('!'))return '<div style="font-size:11px;font-weight:700;color:#f87171;margin:4px 0 2px;background:rgba(239,68,68,0.12);padding:3px 7px;border-radius:4px;">⚠️ '+esc(t.slice(1).trim())+'</div>';if(t.startsWith('-'))return '<div style="display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:12px;margin-bottom:1px;"><span style="flex-shrink:0;opacity:.5;">–</span>'+esc(t.slice(1).trim())+'</div>';return '<div style="display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;"><span style="color:var(--teal-light);flex-shrink:0;">•</span>'+esc(t)+'</div>';}).join('');const ph=(s)=>s&&s.includes('|');return p.steps.map(s=>`
  <div class="proto-step">
    <div class="step-num">${s.n}</div>
    <div class="step-body">
      <div class="step-action">${ph(s.action)?pbul(s.action):esc(s.action)}</div>
      ${s.note?`<div class="step-note" style="display:flex;align-items:flex-start;gap:5px;"><span style="flex-shrink:0;">💡</span><div style="flex:1;">${ph(s.note)?pbul(s.note):esc(s.note)}</div></div>`:''}
      ${s.branch?`<div class="step-branch">↳ ${ph(s.branch)?pbul(s.branch):esc(s.branch)}</div>`:''}
      ${s.flag?`<div class="step-flag">${ph(s.flag)?pbul(s.flag):esc(s.flag)}</div>`:''}
    </div>
  </div>`).join('');})()}  <div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
  `);
}

// Navigate to lesion details, staying within the current tab
function goLesionTab(locId, locName){
  push(()=>goLesionTab(locId,locName), locName, 'loc:'+locId);
  currentNoteTitle = locName;
  const lesions = DB.lesion_type.filter(l=>l.loc===locId);
  if(!lesions.length){render('<div class="empty"><p>No lesion types for this location yet.</p></div>');return;}

    // Group by category
    const groups = {};
    lesions.forEach(l=>{const cat=l.cat||'Other';if(!groups[cat])groups[cat]=[];groups[cat].push(l);});
    const cats = Object.keys(groups);
    const cols = cats.length;
    // Scale down text/padding when many columns must fit side-by-side
    const catFontSize  = cols <= 4 ? 11 : cols === 5 ? 10 : 9;
    const cardFontSize = cols <= 4 ? 10 : cols === 5 ?  9 : 8;
    const cardPadding  = cols <= 4 ? '6px 8px' : cols === 5 ? '5px 6px' : '3px 4px';
    const noteFontSize = cols <= 4 ?  9 : 7;
    const noteChars    = cols <= 4 ? 50 : 30;
    const diffFontSize = cols <= 5 ?  9 : 8;

    // Category colours
    const CC = {
      'Mass':'rgba(139,92,246,','Mass/Neoplasia':'rgba(139,92,246,',
      'Fluid':'rgba(37,99,235,','Fluid/Oedema':'rgba(37,99,235,',
      'Gas':'rgba(217,119,6,','Infection':'rgba(220,38,38,',
      'Infection/Inflammation':'rgba(220,38,38,','Inflammation':'rgba(249,115,22,',
      'Structural':'rgba(100,116,139,','Cardiac':'rgba(220,38,38,',
      'Infectious':'rgba(220,38,38,','Inflammatory':'rgba(249,115,22,',
      'Neuromuscular':'rgba(99,102,241,','Dynamic collapse':'rgba(100,116,139,',
      'Obstruction':'rgba(220,38,38,','Ulceration':'rgba(220,38,38,',
      'Dysmotility':'rgba(139,92,246,','Haemolytic':'rgba(220,38,38,',
      'Hepatocellular':'rgba(217,119,6,','Biliary obstruction':'rgba(13,148,136,',
      'Compressive':'rgba(37,99,235,','Vascular':'rgba(220,38,38,',
      'Non-compressive':'rgba(13,148,136,','Traumatic':'rgba(220,38,38,',
      'Peripheral':'rgba(13,148,136,','Central':'rgba(220,38,38,',
      'Bilateral':'rgba(217,119,6,','Neoplastic':'rgba(139,92,246,',
      'Immune-mediated':'rgba(249,115,22,','Metabolic':'rgba(217,119,6,',
      'Idiopathic':'rgba(37,99,235,','Reactive':'rgba(220,38,38,',
      'Regenerative':'rgba(13,148,136,','Non-regenerative':'rgba(220,38,38,',
      'Pre-regenerative':'rgba(217,119,6,','Shock':'rgba(220,38,38,',
      'Foreign body':'rgba(100,116,139,','Dental':'rgba(217,119,6,',
      'Parasitic':'rgba(217,119,6,','Toxic':'rgba(220,38,38,',
      'Inherited':'rgba(139,92,246,','Endocrine':'rgba(217,119,6,',
      'Endocrine/Metabolic':'rgba(217,119,6,',
      'Cardiovascular':'rgba(220,38,38,','Junctionopathy':'rgba(99,102,241,',
      'Neuropathy':'rgba(139,92,246,','Myopathy':'rgba(249,115,22,',
      'Syncope':'rgba(220,38,38,','Seizure':'rgba(220,38,38,',
      'Sleep disorder':'rgba(99,102,241,','Stress':'rgba(100,116,139,',
      'Dietary':'rgba(13,148,136,','Antibiotic-responsive':'rgba(37,99,235,',
      'Infiltrative':'rgba(249,115,22,','Maldigestion':'rgba(139,92,246,',
      'Protein-losing':'rgba(220,38,38,','Secondary GI':'rgba(217,119,6,',
      'Neoplasia':'rgba(249,115,22,','Obstruction/Dysmotility':'rgba(220,38,38,',
      'Behavioural/Neurological':'rgba(99,102,241,',
      'Renal failure':'rgba(220,38,38,','Osmotic diuresis':'rgba(37,99,235,',
      'Adrenal':'rgba(217,119,6,','Pancreatic':'rgba(139,92,246,',
      'Thyroid':'rgba(13,148,136,','Calcium':'rgba(249,115,22,',
      'Pituitary':'rgba(99,102,241,','Hepatic':'rgba(217,119,6,',
      'Uterine':'rgba(220,38,38,','Electrolyte':'rgba(37,99,235,',
      'Neurological':'rgba(139,92,246,','Renal tubular':'rgba(220,38,38,',
    };
    const def='rgba(148,163,184,';
    function cBg(c){return (CC[c]||def)+'0.12)';}
    function cBd(c){return (CC[c]||def)+'0.4)';}
    function cTx(c){
      const m={'rgba(37,99,235,':'#93C5FD','rgba(139,92,246,':'#DDD6FE','rgba(220,38,38,':'#FCA5A5',
        'rgba(217,119,6,':'var(--amber-text)','rgba(13,148,136,':'#99F6E4','rgba(249,115,22,':'#FED7AA',
        'rgba(99,102,241,':'#C7D2FE','rgba(100,116,139,':'#CBD5E1','rgba(148,163,184,':'#CBD5E1'};
      return m[CC[c]||def]||'#CBD5E1';
    }
    function isEM(u){return u&&u.toUpperCase()==='EMERGENCY';}

    let html = '<div class="flow-wrap">';
    html += `<div class="flow-node entry">${esc(locName)}</div>`;
    html += '<div class="flow-arrow-v">\u2193</div>';
    html += '<div class="flow-node step">IDENTIFY LESION CATEGORY</div>';
    html += '<div class="flow-arrow-v">\u2193</div>';

    // Category row
    html += `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;">`;
    cats.forEach(cat=>{
      html += `<div class="flow-node" style="background:${cBg(cat)};border-color:${cBd(cat)};color:${cTx(cat)};font-size:${catFontSize}px;cursor:default;min-width:0;">${esc(cat)}</div>`;
    });
    html += '</div>';

    // Arrows — no margin-top so they connect flush to category boxes
    html += `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;">`;
    cats.forEach(()=>{html += '<div class="flow-arrow-v">\u2193</div>';});
    html += '</div>';

    // Subtypes as tappable nodes under each column
    html += `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;align-items:start;">`;
    cats.forEach(cat=>{
      const items = groups[cat];
      html += '<div style="display:flex;flex-direction:column;gap:4px;">';
      items.forEach(l=>{
        const em = isEM(l.urg) ? ' <span class="tag tag-em" style="font-size:8px;padding:2px 5px;">\u26a0\ufe0f</span>' : '';
        const dc = DB.differentials.filter(d=>d.filter===l.filter).length;
        html += `<div onclick="renderSubTypeDetail('${l.id}')" style="border-radius:8px;padding:${cardPadding};font-size:${cardFontSize}px;font-weight:600;text-align:center;border:1.5px solid ${cBd(cat)};background:${cBg(cat)};color:${cTx(cat)};cursor:pointer;transition:all .2s;line-height:1.3;word-break:break-word;" onmouseover="this.style.filter='brightness(1.2)'" onmouseout="this.style.filter=''">
          ${esc(l.sub)}${em}
        </div>`;
      });
      html += '</div>';
    });
    html += '</div></div>';
    // Add diagnostic approach card for relevant locations
    const dxMap = {
      'LOC-GI-UPPER':'vomiting', 'LOC-GI-PRIMARY':'vomiting',
      'LOC-GI-SECONDARY':'vomiting', 'LOC-OESOPH':'vomiting',
      'LOC-DI-SI':'diarrhoea', 'LOC-DI-SI-SEC':'diarrhoea',
      'LOC-DI-LB':'diarrhoea',
      'LOC-LARYNX':'dyspnoea', 'LOC-NASAL':'dyspnoea',
      'LOC-PARENCH':'dyspnoea', 'LOC-PLEURAL':'dyspnoea',
      'LOC-JD-PREHEP':'jaundice', 'LOC-JD-HEP':'jaundice',
      'LOC-JD-POSTHEP':'jaundice',
      'LOC-WK-EPISODIC':'weakness', 'LOC-WK-PERSISTENT':'weakness',
      'LOC-WK-COLLAPSE':'weakness',
      'LOC-NM-NEURO':'weakness', 'LOC-NM-JUNC':'weakness',
      'LOC-NM-MYO':'weakness',
      'LOC-PUPD-RENAL':'pupd', 'LOC-PUPD-ENDO':'pupd',
      'LOC-PUPD-MED':'pupd', 'LOC-PUPD-NDI':'pupd',
      'LOC-PUPD-CDI':'pupd', 'LOC-PUPD-PRIM':'pupd',
      'LOC-SZ-INTRACRANIAL':'seizures', 'LOC-SZ-EXTRACRANIAL':'seizures',
      'LOC-MY-TL':'myelopathy', 'LOC-MY-CERV':'myelopathy', 'LOC-MY-L4S3':'myelopathy', 'LOC-MY-CONUS':'myelopathy',
      'LOC-VE-PERIPH':'vestibular', 'LOC-VE-CENTRAL':'vestibular',
      'LOC-VE-BILAT':'vestibular',
      'LOC-EN-INFLAM':'encephalopathy', 'LOC-EN-NEO':'encephalopathy',
      'LOC-EN-CVA':'encephalopathy', 'LOC-EN-METAB':'encephalopathy',
      'LOC-CO-DRY':'coughing', 'LOC-CO-WET':'coughing',
      'LOC-SN-UNI':'sneezing', 'LOC-SN-BI':'sneezing',
      'LOC-PM-ANAEMIA':'pale-gums', 'LOC-PM-PERFUSION':'pale-gums',
      'LOC-AT-CEREB':'ataxia',
      'LOC-RE-ADNEXA':'red-eye','LOC-RE-TEL':'red-eye',
      'LOC-RE-CONJ':'red-eye','LOC-RE-EPISC':'red-eye',
      'LOC-RE-CORNEA-SUP':'red-eye','LOC-RE-CORNEA-DEEP':'red-eye',
      'LOC-RE-UVEA':'red-eye','LOC-RE-AC':'red-eye',
      'LOC-RE-GLAUCOMA':'red-eye','LOC-RE-ORBIT':'red-eye',
      'LOC-RE-RETINA':'red-eye',
      'LOC-AP-IRIS':'abnormal-pupil','LOC-AP-LENS':'abnormal-pupil',
      'LOC-AP-RETINA':'abnormal-pupil','LOC-AP-MIOSIS':'abnormal-pupil',
      'LOC-AP-MYDR':'abnormal-pupil','LOC-AP-NEURO':'abnormal-pupil',
      'LOC-BL-OPAQUE':'blind-eye','LOC-BL-RETINA':'blind-eye',
      'LOC-BL-OPTIC':'blind-eye','LOC-BL-CHIASM':'blind-eye',
      'LOC-BL-CORTEX':'blind-eye',
      'LOC-WE-DRAIN':'wet-eye','LOC-WE-PROD':'wet-eye',
      'LOC-HU-UPPER':'haematuria','LOC-HU-BLADDER':'haematuria',
      'LOC-HU-URETHRA':'haematuria','LOC-HU-PROST':'haematuria',
      'LOC-HU-GENIT':'haematuria','LOC-HU-SYS':'haematuria',
      'LOC-BD-PRIM':'bleeding','LOC-BD-SEC':'bleeding',
      'LOC-BD-MIX':'bleeding','LOC-BD-VASC':'bleeding'
    };
    if(dxMap[locId]){
      html += '<div style="margin-top:12px;"><div class="card" onclick="renderDxId(\''+dxMap[locId]+'\')"><div class="card-row"><div class="card-icon">🔬</div><div style="flex:1"><div class="card-title">Diagnostic Approach</div><div class="card-sub">Stepwise clinical workup flowchart</div></div><div class="card-arrow">\u203a</div></div></div></div>';
    }
    html += '<div class="disclaimer">Tap a subtype to see differentials and causes.</div>';
    render(html);
}

function injuryGradingTable(){
  const gth=(t,c)=>`<th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:${c};border-bottom:1.5px solid ${c};text-align:center;white-space:nowrap;">${t}</th>`;
  const T3='#FCD34D'; const C1='#6EE7B7';
  const row=(g,gc,desc,tl,tlc,cerv,cervc,alt)=>`
    <tr${alt?' style="background:rgba(255,255,255,0.02);"':''}>
      <td style="padding:5px 5px;text-align:center;font-weight:700;color:${gc};border-bottom:1px solid rgba(148,163,184,0.1);">${g}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${gc};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${desc}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${tlc||'var(--gray)'};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${tl}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${cervc||'var(--gray)'};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${cerv}</td>
    </tr>`;
  return `
  <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;margin-top:8px;">Injury Grading</div>
  <div style="overflow-x:auto;width:100%;margin-bottom:8px;">
  <table style="width:100%;border-collapse:collapse;font-size:8.5px;min-width:360px;">
    <thead>
      <tr>
        <th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:center;width:28px;">Grade</th>
        <th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:left;min-width:120px;">Description</th>
        ${gth('Thoracolumbar',T3)}
        ${gth('Cervical',C1)}
      </tr>
    </thead>
    <tbody>
      ${row(1,'var(--white)','Pain only; neurologically intact','Spinal pain; normal neurologic function','var(--gray)','Spinal pain; normal neurologic function','var(--gray)',false)}
      ${row(2,'var(--white)','Ambulatory paresis; CP deficits ± ataxia','Ambulatory paraparesis + HL ataxia','var(--gray)','Ambulatory tetraparesis + tetra-ataxia','var(--gray)',true)}
      ${row(3,T3,'Non-ambulatory paresis; voluntary movement present','Non-ambulatory paraparesis',T3,'Non-ambulatory tetraparesis',T3,false)}
      ${row(4,'#FB923C','Paralysis; DPP intact','Paraplegia; intact pain perception','#FB923C','Tetraplegia; normal ventilation','#FB923C',true)}
      ${row(5,'#F87171','Paralysis; DPP <strong>absent</strong>','Paraplegia; <strong>absent</strong> DPP in HLs + tail','#F87171','Tetraplegia; <strong>hypoventilation</strong>','#F87171',false)}
    </tbody>
  </table>
  </div>`;
}

// ── PALE GUMS — sub-flows ─────────────────────────────────────────────────────

// ── DIAGNOSTIC APPROACH: VOMITING ────────────────────────────────────────────







// ── DIAGNOSTIC APPROACH: DIARRHOEA ───────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: DYSPNOEA ────────────────────────────────────────────




// ── DIAGNOSTIC APPROACH: JAUNDICE ────────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: WEAKNESS ────────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: PU/PD ───────────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: SEIZURES ────────────────────────────────────────────

// ── DIAGNOSTIC APPROACH: MYELOPATHY ──────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: VESTIBULAR ──────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: ENCEPHALOPATHY ──────────────────────────────────────





// ── DIAGNOSTIC APPROACH: COUGHING ────────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: SNEEZING ────────────────────────────────────────────





// ── DIAGNOSTIC APPROACH: PALE MUCOUS MEMBRANES ───────────────────────────────





// ── ATAXIA CLINICAL FLOWCHART ────────────────────────────────────────────────

// ── DIAGNOSTIC APPROACH: ATAXIA ──────────────────────────────────────────────





// ── BLEEDING / PETECHIAE — clinical sign flowchart (Tab 0) ─────────────────

// ── BLEEDING — diagnostic approach (3 tabs) ────────────────────────────────

// ── EPISTAXIS — clinical flowchart + diagnostic approach (3 tabs) ───────────


// ── BLEEDING — clinical flowchart sub-branches ─────────────────────────────

// ── HAEMATURIA — clinical sign flowchart (Tab 0) ───────────────────────────

// ── HAEMATURIA — clinical flowchart sub-branches ───────────────────────────

// ── HAEMATURIA — diagnostic approach (3 tabs) ──────────────────────────────

// ── WET EYE / EPIPHORA — clinical sign flowchart (Tab 0) ───────────────────

// ── WET EYE — diagnostic approach (3 tabs) ─────────────────────────────────

// ── BLIND EYE — clinical sign flowchart (Tab 0) ────────────────────────────

// ── BLIND EYE — diagnostic approach (3 tabs) ───────────────────────────────

// ── ABNORMAL PUPIL — clinical sign flowchart (Tab 0) ───────────────────────

// ── ANISOCORIA — neurological decision trees ───────────────────────────────

// ── ABNORMAL PUPIL — diagnostic approach (3 tabs) ──────────────────────────

// ── RED EYE — clinical sign flowchart (Tab 0) ──────────────────────────────
// Content lives in src/lib/signs/redEye.ts; these wrappers add nav/breadcrumbs.

// ── RED EYE — diagnostic approach (3 tabs) ─────────────────────────────────

// ── NOTES SIDEBAR ────────────────────────────────────────────────────────────

// Expose all functions globally so onclick attributes in rendered HTML can call them
export function mountGlobals() {
  const w = window;
  w.navTo = navTo;
  w.goBack = goBack;
  w.setTheme = setTheme;
  w.toggleSystem = toggleSystem;
  w.renderLocalise = renderLocalise;
  w.renderFlowId = renderFlowId;
  w.renderDxId = renderDxId;
  w.goLocEp = goLocEp;
  w.renderLesionDetail = renderLesionDetail;
  w.renderLesionHome = renderLesionHome;
  w.renderLesionFlow = renderLesionFlow;
  w.renderSubTypeFlow = renderSubTypeFlow;
  w.renderSubTypeDetail = renderSubTypeDetail;
  w.renderDiffFlowchart = renderDiffFlowchart;
  w.renderDiffHome = renderDiffHome;
  w.filterDiffs = filterDiffs;
  w.renderDiffDetail = renderDiffDetail;
  w.renderDiseaseHome = renderDiseaseHome;
  w.filterDiseases = filterDiseases;
  w.renderDiseasePage = renderDiseasePage;
  w.renderProtoList = renderProtoList;
  w.renderProtoDetail = renderProtoDetail;
  w.goLesionTab = goLesionTab;
}

// HMR auto-re-render: if callbacks exist (app already mounted), re-render the
// current tab immediately using updated render functions from this new module eval
if (typeof window !== 'undefined' && (window as any).__cliniqCbs) {
  setTimeout(() => {
    try {
      mountGlobals();
      const n = currentNav;
      if (n === 0) renderLocalise();
      else if (n === 1) renderLesionHome();
      else if (n === 2) renderDiseaseHome();
      else if (n === 3) renderProtoList();
      else if (n === 4) renderSettings();
    } catch(e) { console.error('[ClinIQ HMR re-render]', e); }
  }, 0);
}

export { navTo, goBack, renderLocalise };
