(() => {
const C = CORE, $ = s => document.querySelector(s);
const NS = 'http://www.w3.org/2000/svg';
const CATS = [
  ['power', ['wire']],
  ['passive', ['resistor', 'pot', 'diode']],
  ['out', ['led', 'bulb', 'buzzer', 'motor']],
  ['sw', ['button', 'switch']],
  ['sens', ['ldr']],
  ['tools', ['ammeter', 'voltmeter']],
];
const R_VALUES = [10, 47, 100, 220, 330, 470, 1000, 2200, 4700, 10000];
const LED_COLORS = { red: '#ff3b3b', green: '#35e06b', blue: '#3d8bff', yellow: '#ffd23b', white: '#f4f7ff' };
const WIRE_COLORS = { red: '#e8463c', black: '#2b2f36', blue: '#3a7bea', green: '#2fb45a', yellow: '#f2c230', orange: '#f28a30' };
const BAND = ['#111', '#7b3f00', '#d52b2b', '#f07d1a', '#f4d21c', '#26a641', '#2d5be3', '#8e3fd6', '#8a8a8a', '#f5f5f5'];

/* ---------------- state ---------------- */
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const navLang = (navigator.language || 'en').slice(0, 2);
const S = Object.assign({
  lang: { sr: 'sr', hr: 'sr', bs: 'sr', mk: 'mk', ro: 'ro', bg: 'bg' }[navLang] || 'en',
  mode: 'learn', sound: true, light: 0.7, lesson: 0, done: [],
  boards: { free: { parts: [] }, learn: { parts: [] } }, nextId: 1,
}, load('rk_state', {}));
S.tool = 'select'; S.pending = null; S.sel = null; S.sim = false; S.res = null; S.hover = null;
const hist = { free: { u: [], r: [] }, learn: { u: [], r: [] } };
const persist = () => store('rk_state', { lang: S.lang, mode: S.mode, sound: S.sound, light: S.light, lesson: S.lesson, done: S.done, boards: S.boards, nextId: S.nextId });

const L = () => I18N[S.lang] || I18N.en;
const t = (k, v) => { let s = L().ui[k] ?? I18N.en.ui[k] ?? k; if (v) for (const x in v) s = s.replace('{' + x + '}', v[x]); return s; };
const pn = type => L().parts[type];
const board = () => S.boards[S.mode];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- unlocking ---------------- */
function unlockedTypes() {
  if (S.mode === 'free') return new Set(C.ALL_TYPES);
  const s = new Set();
  for (let i = 0; i <= S.lesson; i++) C.LESSONS[i].unlock.forEach(x => s.add(x));
  return s;
}
const maxLesson = () => { let i = 0; while (i < C.LESSONS.length - 1 && S.done.includes(C.LESSONS[i].id)) i++; return i; };

/* ---------------- history ---------------- */
function snapshot() { const h = hist[S.mode]; h.u.push(JSON.stringify(board().parts)); if (h.u.length > 80) h.u.shift(); h.r = []; }
function undo() { const h = hist[S.mode]; if (!h.u.length) return; h.r.push(JSON.stringify(board().parts)); board().parts = JSON.parse(h.u.pop()); S.sel = null; changed(); }
function redo() { const h = hist[S.mode]; if (!h.r.length) return; h.u.push(JSON.stringify(board().parts)); board().parts = JSON.parse(h.r.pop()); S.sel = null; changed(); }

/* ---------------- sound ---------------- */
let actx = null, osc = null, gain = null;
function audio() { if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (actx && actx.state === 'suspended') actx.resume().catch(() => {}); return actx; }
function beep(f, d = 0.08, v = 0.05, type = 'sine', when = 0) {
  if (!S.sound || !audio()) return;
  const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + when;
  o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + d + 0.02);
}
function buzz(level) {
  if (!S.sound || !S.sim || level <= 0) { if (osc) { try { osc.stop(); } catch (e) {} osc = null; } return; }
  if (!audio()) return;
  if (!osc) { osc = actx.createOscillator(); gain = actx.createGain(); osc.type = 'square'; osc.frequency.value = 1400; osc.connect(gain).connect(actx.destination); osc.start(); }
  gain.gain.setTargetAtTime(0.025 + 0.04 * Math.min(1, level), actx.currentTime, 0.02);
}

/* ---------------- toast / status ---------------- */
let toastT = null;
function toast(msg, kind = '') {
  const el = $('#toast'); el.innerHTML = msg; el.className = 'show ' + kind;
  clearTimeout(toastT); toastT = setTimeout(() => (el.className = ''), 3200);
}
function status(msg, kind = '') { const el = $('#status'); el.innerHTML = msg || ''; el.className = kind; }

/* ---------------- drawing ---------------- */
const fmtR = r => r >= 1000 ? (r / 1000).toString().replace('.', ',') + 'k' : String(r);
function bands(R) {
  const e = Math.floor(Math.log10(R)) - 1;
  const d1 = Math.floor(R / Math.pow(10, e + 1)) % 10, d2 = Math.round(R / Math.pow(10, e)) % 10;
  return [d1, d2, Math.max(0, e)];
}
// body in local coords, horizontal, pin0 on the left. st = sim state for part
function body(type, pr = {}, st = null, sim = false) {
  const on = sim && st;
  switch (type) {
    case 'resistor': {
      const b = bands(pr.R || 330);
      return `<rect x="-17" y="-6" width="34" height="12" rx="5" fill="#d9c29a" stroke="#9b8462"/>` +
        b.map((d, i) => `<rect x="${-10 + i * 6}" y="-6" width="3.2" height="12" fill="${BAND[d]}"/>`).join('') +
        `<rect x="10" y="-6" width="3" height="12" fill="#c9a43a"/>`;
    }
    case 'led': {
      const col = LED_COLORS[pr.color || 'red'];
      if (pr.burned) return `<path d="M-9 6 L-9 -2 A9 9 0 0 1 9 -2 L9 6 Z" fill="#444" stroke="#222"/><text x="0" y="4" text-anchor="middle" font-size="10" fill="#bbb">✕</text><circle cx="3" cy="-14" r="4" fill="#888" opacity=".5" class="smoke"/>`;
      const br = on ? st.bright || 0 : 0;
      return (br > 0.02 ? `<circle r="${12 + 14 * br}" fill="${col}" opacity="${0.25 + 0.45 * br}" filter="url(#glow)"/>` : '') +
        `<path d="M-9 6 L-9 -2 A9 9 0 0 1 9 -2 L9 6 Z" fill="${col}" fill-opacity="${0.45 + 0.55 * br}" stroke="${br > 0.02 ? '#fff' : 'rgba(0,0,0,.45)'}" stroke-width="${br > 0.02 ? 1.5 : 1}"/>` +
        `<rect x="-11" y="5" width="22" height="3" rx="1" fill="${col}" fill-opacity=".8"/>`;
    }
    case 'diode':
      return `<rect x="-12" y="-5" width="24" height="10" rx="2" fill="#1b1b1f" stroke="#555"/><rect x="6" y="-5" width="3.5" height="10" fill="#cfd3da"/>` +
        (on && st.conducting ? `<rect x="-12" y="-5" width="24" height="10" rx="2" fill="none" stroke="#4ade80" stroke-width="1.2"/>` : '');
    case 'bulb': {
      const br = on ? Math.min(1, st.bright || 0) : 0;
      return (br > 0.05 ? `<circle r="${14 + 16 * br}" fill="#ffe27a" opacity="${0.2 + 0.5 * br}" filter="url(#glow)"/>` : '') +
        `<rect x="-6" y="6" width="12" height="7" rx="1.5" fill="#9aa0a8"/>` +
        `<circle cy="-4" r="12" fill="${br > 0.05 ? '#fff3b0' : 'rgba(220,235,255,.25)'}" fill-opacity="${0.35 + 0.65 * br}" stroke="#cdd6e0"/>` +
        `<path d="M-4 6 L-4 -2 L-2 -6 L0 -2 L2 -6 L4 -2 L4 6" fill="none" stroke="${br > 0.05 ? '#ff9d00' : '#777'}" stroke-width="1.3"/>`;
    }
    case 'buzzer': {
      const s = on && st.sounding;
      return `<circle r="13" fill="#15161a" stroke="#3a3d45"/><circle r="3" fill="#000" stroke="#333"/>` +
        (s ? `<g class="waves"><path d="M16 -8 Q21 0 16 8" stroke="#ffd166" fill="none" stroke-width="2"/><path d="M21 -12 Q28 0 21 12" stroke="#ffd166" fill="none" stroke-width="2"/></g>` : '');
    }
    case 'motor': {
      const sp = on ? st.speed || 0 : 0, spin = on && st.spinning;
      const dur = spin ? Math.max(0.12, 0.9 / Math.min(2, Math.abs(sp))) : 0;
      return `<rect x="-14" y="-12" width="28" height="24" rx="5" fill="#8a929e" stroke="#59606b"/>` +
        `<text x="0" y="4" font-size="11" font-weight="800" fill="#2a2e35" text-anchor="middle">M</text>` +
        `<g transform="translate(0,-20)"><g class="${spin ? 'spin' : ''}" style="animation-duration:${dur}s;animation-direction:${sp < 0 ? 'reverse' : 'normal'}">` +
        `<ellipse rx="13" ry="3.2" fill="#ff7a33"/><ellipse rx="3.2" ry="13" fill="#ffb37a"/><circle r="2.5" fill="#333"/></g></g>`;
    }
    case 'button': {
      const p = pr.pressed;
      return `<rect x="-11" y="-11" width="22" height="22" rx="3" fill="#2a2d33" stroke="#555"/>` +
        `<circle r="${p ? 6 : 7}" fill="${p ? '#e05252' : '#ff6b6b'}" stroke="${p ? '#fff' : '#922'}" stroke-width="${p ? 1.5 : 1}"/>`;
    }
    case 'switch': {
      const o = pr.on;
      return `<rect x="-15" y="-7" width="30" height="14" rx="3" fill="#2b4f7c" stroke="#1b3354"/>` +
        `<rect x="${o ? 1 : -13}" y="-5" width="12" height="10" rx="2" fill="${o ? '#4ade80' : '#d8dde5'}"/>` +
        `<text x="0" y="-11" font-size="8" fill="${o ? '#4ade80' : '#9aa3af'}" text-anchor="middle" font-weight="700">${o ? 'ON' : 'OFF'}</text>`;
    }
    case 'ldr':
      return `<circle r="10" fill="#c8813b" stroke="#7d4d1e"/><path d="M-6 -3 H4 V0 H-4 V3 H6" fill="none" stroke="#5a2e0b" stroke-width="1.6"/>`;
    case 'ammeter': case 'voltmeter': {
      const u = type === 'ammeter' ? 'A' : 'V';
      let txt = '-- ' + (u === 'A' ? 'mA' : 'V');
      if (on && st.reading !== undefined) txt = u === 'A' ? st.reading.toFixed(Math.abs(st.reading) < 10 ? 2 : 1) + ' mA' : st.reading.toFixed(2) + ' V';
      return `<rect x="-26" y="-15" width="52" height="30" rx="6" fill="${u === 'A' ? '#f2b53a' : '#3ab0f2'}" stroke="#222"/>` +
        `<rect x="-21" y="-11" width="42" height="14" rx="2" fill="#bfe3b4"/><text x="0" y="0" font-size="9" font-family="JetBrains Mono,monospace" text-anchor="middle" fill="#1d2b18">${txt}</text>` +
        `<text x="0" y="12" font-size="8" font-weight="800" text-anchor="middle" fill="#222">${u}</text>`;
    }
  }
  return '';
}

function icon(type) {
  let inner;
  if (type === 'wire') inner = `<path d="M-26 8 Q0 -14 26 8" stroke="#e8463c" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  else if (type === 'pot') inner = potBody({ pos: 0.5 }, 0.62);
  else inner = `<line x1="-28" x2="28" stroke="#b8bec8" stroke-width="2"/><g transform="scale(${type === 'ammeter' || type === 'voltmeter' ? 0.75 : 1})">${body(type, { R: 330, color: 'red' })}</g>`;
  return `<svg viewBox="-30 -24 60 40" class="ico">${inner}</svg>`;
}
function potBody(pr, s = 1) {
  const a = -135 + 270 * (pr.pos ?? 0.5);
  return `<g transform="scale(${s})"><rect x="-26" y="-20" width="52" height="26" rx="4" fill="#2f63b8" stroke="#1d3f78"/>` +
    `<circle cx="0" cy="-7" r="10" fill="#e9ecf1" stroke="#9aa3af"/><line x1="0" y1="-7" x2="${(Math.sin(a * Math.PI / 180) * 9).toFixed(2)}" y2="${(-7 - Math.cos(a * Math.PI / 180) * 9).toFixed(2)}" stroke="#333" stroke-width="2.4" stroke-linecap="round"/>` +
    `<line x1="-22" y1="6" x2="-22" y2="${s === 1 ? 0 : 14}" stroke="#b8bec8" stroke-width="2"/><line x1="0" y1="6" x2="0" y2="${s === 1 ? 0 : 14}" stroke="#b8bec8" stroke-width="2"/><line x1="22" y1="6" x2="22" y2="${s === 1 ? 0 : 14}" stroke="#b8bec8" stroke-width="2"/></g>`;
}

function buildBoard() {
  const svg = $('#board');
  const W = C.X0 + (C.COLS - 1) * C.P + 30;
  svg.setAttribute('viewBox', `0 0 ${W} 440`);
  let h = `<defs><filter id="glow" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="5"/></filter></defs>`;
  const x0 = C.X0 - 22, x1 = C.X0 + (C.COLS - 1) * C.P + 22;
  h += `<rect x="${x0}" y="18" width="${x1 - x0}" height="410" rx="10" fill="#e9e6dd" stroke="#bdb8aa"/>`;
  h += `<rect x="${x0}" y="219" width="${x1 - x0}" height="12" fill="#d6d2c6"/>`;
  for (const [r, col, sign] of [['tp', '#d93a3a', '+'], ['tn', '#2f6fd6', '−'], ['bp', '#d93a3a', '+'], ['bn', '#2f6fd6', '−']]) {
    const y = C.ROWY[r] + (r.endsWith('p') ? -11 : 11);
    h += `<line x1="${x0 + 14}" x2="${x1 - 14}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="2"/>`;
    h += `<text x="${x0 + 7}" y="${C.ROWY[r] + 4}" font-size="13" font-weight="800" fill="${col}" text-anchor="middle">${sign}</text>`;
    h += `<text x="${x1 - 7}" y="${C.ROWY[r] + 4}" font-size="13" font-weight="800" fill="${col}" text-anchor="middle">${sign}</text>`;
  }
  for (const r of C.TERM) { const y = C.ROWY[r] + 4; h += `<text x="${x0 + 9}" y="${y}" class="lbl">${r}</text><text x="${x1 - 9}" y="${y}" class="lbl">${r}</text>`; }
  for (let c = 0; c < C.COLS; c++) { const x = C.X0 + c * C.P; if ((c + 1) % 5 === 0 || c === 0) { h += `<text x="${x}" y="92" class="lbl">${c + 1}</text><text x="${x}" y="362" class="lbl">${c + 1}</text>`; } }
  for (const hole of C.allHoles()) { const p = C.holePos(hole); h += `<rect x="${p.x - 3.5}" y="${p.y - 3.5}" width="7" height="7" rx="1.5" class="hole"/>`; }
  // battery
  h += `<g id="battery"><rect x="14" y="30" width="56" height="96" rx="7" fill="#1f2937" stroke="#0b1220"/><rect x="14" y="30" width="56" height="34" rx="7" fill="#ff7a33"/>` +
    `<rect x="26" y="20" width="10" height="11" rx="2" fill="#c0c6cf"/><rect x="48" y="20" width="10" height="11" rx="2" fill="#c0c6cf"/>` +
    `<text x="31" y="17" font-size="12" font-weight="800" fill="#e8463c" text-anchor="middle">+</text><text x="53" y="17" font-size="13" font-weight="800" fill="#6aa0ff" text-anchor="middle">−</text>` +
    `<text x="42" y="98" font-size="20" font-weight="800" fill="#fff" text-anchor="middle">9V</text></g>`;
  h += `<path d="M31 20 C31 0, 70 ${C.ROWY.tp}, ${x0 + 1} ${C.ROWY.tp}" stroke="#e8463c" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  h += `<path d="M53 20 C53 6, 76 ${C.ROWY.tn}, ${x0 + 1} ${C.ROWY.tn}" stroke="#2b2f36" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  h += `<g id="parts"></g><g id="overlay"></g>`;
  svg.innerHTML = h;
}

function wirePath(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(26, len * 0.18);
  const mx = (a.x + b.x) / 2 + (-dy / len) * bow * (dx >= 0 ? 1 : -1), my = (a.y + b.y) / 2 - Math.abs(dx / len) * bow - (Math.abs(dx) < 1 ? 0 : 0);
  return `M${a.x} ${a.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
}

function renderParts() {
  const g = $('#parts'); if (!g) return;
  const sim = S.sim, res = S.res;
  let h = '';
  const parts = [...board().parts].sort((a, b) => (b.type === 'wire') - (a.type === 'wire'));
  for (const p of parts) {
    const st = res && res.parts[p.id];
    const P = p.pins.map(C.holePos);
    const sel = S.sel === p.id ? ' sel' : '';
    const clickable = sim && (p.type === 'button' || p.type === 'switch') ? ' act' : '';
    h += `<g class="part${sel}${clickable}" data-id="${p.id}"><title>${esc(pn(p.type))}${p.type === 'resistor' ? ' ' + fmtR(p.props.R) + 'Ω' : ''}</title>`;
    if (p.type === 'wire') {
      const d = wirePath(P[0], P[1]), col = WIRE_COLORS[p.props.color || 'red'];
      h += `<path d="${d}" class="hit" />`;
      if (sel) h += `<path d="${d}" stroke="#ffd166" stroke-width="10" fill="none" stroke-linecap="round" opacity=".6"/>`;
      h += `<path d="${d}" stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      h += `<path d="${d}" stroke="rgba(255,255,255,.35)" stroke-width="1.5" fill="none" stroke-linecap="round" transform="translate(-1,-1)"/>`;
      if (sim && st && Math.abs(st.I) > 0.0005) {
        const dur = Math.max(0.25, Math.min(3, 0.02 / Math.abs(st.I)));
        h += `<path d="${d}" class="flow" style="animation-duration:${dur.toFixed(2)}s;animation-direction:${st.I > 0 ? 'normal' : 'reverse'}"/>`;
      }
    } else if (p.type === 'pot') {
      const a = P[0], c = P[2];
      h += `<g transform="translate(${(a.x + c.x) / 2},${a.y - 6})">${sel ? '<rect x="-31" y="-26" width="62" height="38" rx="6" fill="none" stroke="#ffd166" stroke-width="3"/>' : ''}${potBody(p.props)}</g>`;
    } else {
      const a = P[0], b = P[1];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      let ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      h += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="hit"/>`;
      h += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#b8bec8" stroke-width="2.4"/>`;
      const meter = p.type === 'ammeter' || p.type === 'voltmeter';
      const upright = ['ammeter', 'voltmeter', 'button', 'motor', 'bulb', 'led', 'buzzer', 'switch', 'ldr'].includes(p.type);
      const rot = upright ? '' : `rotate(${ang})`;
      h += `<g transform="translate(${mx},${my}) ${rot}">${sel ? `<circle r="${meter ? 30 : 20}" fill="none" stroke="#ffd166" stroke-width="3" stroke-dasharray="4 3"/>` : ''}${body(p.type, p.props, st, sim)}</g>`;
      if (['led', 'buzzer', 'ammeter', 'voltmeter'].includes(p.type)) h += `<text x="${a.x - 7}" y="${a.y - 6}" class="plus">+</text>`;
      if (p.type === 'resistor') h += `<text x="${mx}" y="${my - 11}" class="rv">${fmtR(p.props.R)}Ω</text>`;
    }
    for (const q of P) h += `<circle cx="${q.x}" cy="${q.y}" r="2.6" fill="#5c6370"/>`;
    h += `</g>`;
  }
  g.innerHTML = h;
}

/* ---------------- simulation ---------------- */
function simulate() {
  if (!S.sim) { S.res = null; buzz(0); return; }
  const c = board();
  let r = C.solve(c, { light: S.light });
  let burnt = false;
  for (const p of c.parts) if (p.type === 'led' && r.parts[p.id] && r.parts[p.id].burn && !p.props.burned) { p.props.burned = true; burnt = true; }
  if (burnt) { r = C.solve(c, { light: S.light }); beep(180, 0.35, 0.08, 'sawtooth'); toast(t('burned'), 'bad'); }
  S.res = r;
  let lvl = 0;
  for (const p of c.parts) if (p.type === 'buzzer' && r.parts[p.id].sounding) lvl = Math.max(lvl, r.parts[p.id].I / 0.03);
  buzz(lvl);
  if (r.short) status(t('short'), 'bad');
  else if (c.parts.some(p => p.props.burned)) status(t('burned'), 'bad');
  else if (!r.flowing && c.parts.length) status(t('noPower'), 'warn');
  else status(t('simOn'), 'ok');
  // lesson check
  if (S.mode === 'learn') {
    const les = C.LESSONS[S.lesson];
    if (!S.celebrated && les.check(c, (cc, o) => C.solve(cc, Object.assign({ light: S.light }, o)), r)) {
      S.celebrated = true;
      if (!S.done.includes(les.id)) S.done.push(les.id);
      persist();
      setTimeout(celebrate, 450);
    }
  }
}

/* ---------------- render UI ---------------- */
function renderPalette() {
  const un = unlockedTypes();
  let h = '';
  for (const [cat, types] of CATS) {
    h += `<div class="cat">${esc(L().cats[cat])}</div><div class="grid">`;
    for (const ty of types) {
      const lk = !un.has(ty);
      h += `<button class="pal${S.tool === ty ? ' on' : ''}${lk ? ' locked' : ''}" data-type="${ty}" title="${esc(pn(ty))}">` +
        `${lk ? '<span class="lk">🔒</span>' : ''}<span class="info" data-info="${ty}">i</span>${icon(ty)}<span class="pl">${esc(pn(ty))}</span></button>`;
    }
    h += `</div>`;
  }
  $('#palette').innerHTML = h;
}

function renderProps() {
  const el = $('#props');
  const p = board().parts.find(x => x.id === S.sel);
  if (!p) { el.innerHTML = `<h3>${esc(t('props'))}</h3><p class="muted">${esc(t('noSelection'))}</p>`; return; }
  const st = S.res && S.res.parts[p.id];
  let h = `<h3>${icon(p.type)} ${esc(pn(p.type))}</h3><p class="muted small">${esc(L().info[p.type])}</p>`;
  if (p.type === 'resistor') h += `<label>${esc(t('value'))}<select data-prop="R">${R_VALUES.map(v => `<option value="${v}"${v === p.props.R ? ' selected' : ''}>${fmtR(v)} Ω</option>`).join('')}</select></label>`;
  if (p.type === 'led') h += `<label>${esc(t('color'))}<div class="swatches">${Object.keys(LED_COLORS).map(k => `<button data-color="${k}" title="${esc(L().colors[k])}" class="sw${p.props.color === k ? ' on' : ''}" style="background:${LED_COLORS[k]}"></button>`).join('')}</div></label>` + (p.props.burned ? `<p class="bad small">💥 ${esc(t('burnedLabel'))}</p>` : '');
  if (p.type === 'wire') h += `<label>${esc(t('color'))}<div class="swatches">${Object.keys(WIRE_COLORS).map(k => `<button data-color="${k}" title="${esc(L().colors[k])}" class="sw${(p.props.color || 'red') === k ? ' on' : ''}" style="background:${WIRE_COLORS[k]}"></button>`).join('')}</div></label>`;
  if (p.type === 'pot') h += `<label>${esc(t('position'))} <b id="potv">${Math.round((p.props.pos ?? 0.5) * 100)}%</b><input type="range" min="0" max="100" value="${Math.round((p.props.pos ?? 0.5) * 100)}" data-prop="pos"></label>`;
  if (p.type === 'switch') h += `<label>${esc(t('state'))}<button class="btn small tog" data-toggle="on">${p.props.on ? '🟢 ' + esc(t('on')) : '⚪ ' + esc(t('off'))}</button></label>`;
  if (st && S.sim) {
    const I = p.type === 'pot' ? Math.max(Math.abs(st.Iaw || 0), Math.abs(st.Iwb || 0)) : Math.abs(st.I || 0);
    h += `<div class="meas"><span>${esc(t('current'))}: <b>${(I * 1000).toFixed(1)} mA</b></span>` + (p.type !== 'pot' ? `<span>${esc(t('voltage'))}: <b>${Math.abs(st.V || 0).toFixed(2)} V</b></span>` : '') + `</div>`;
  }
  h += `<button class="btn danger small" id="delSel">🗑 ${esc(t('del'))}</button>`;
  el.innerHTML = h;
}

function renderLesson() {
  const el = $('#lesson'), ban = $('#banner');
  if (S.mode !== 'learn') {
    el.innerHTML = `<h3>💡 ${esc(t('help'))}</h3><ul class="help">${t('helpItems').map(x => `<li>${x}</li>`).join('')}</ul>`;
    ban.innerHTML = `<span class="bt">🎮 ${esc(t('free'))}</span><span class="bs">${esc(t('subtitle'))}</span>`;
    return;
  }
  const i = S.lesson, les = L().lessons[i], done = S.done.includes(C.LESSONS[i].id);
  ban.innerHTML = `<span class="bt">🎓 ${esc(t('level'))} ${i + 1}: ${esc(les.t)} ${done ? '<span class="donechip">✓ ' + esc(t('done')) + '</span>' : ''}</span>` +
    `<button class="btn small ghost" id="openLessons">📚 ${esc(t('lessons'))} (${S.done.length}/${C.LESSONS.length})</button>`;
  let h = `<h3 class="lt">🎓 ${esc(les.t)}</h3><p>${esc(les.d)}</p><ol class="steps">`;
  les.s.forEach((s, k) => h += `<li><span class="stepn">${esc(t('step'))} ${k + 1}</span><span>${s}</span></li>`);
  h += `</ol><p class="foot">${t('lessonFooter')}</p>`;
  const nu = C.LESSONS[i].unlock;
  if (nu.length) h += `<div class="newparts">${nu.map(x => `<span>${icon(x)}${esc(pn(x))}</span>`).join('')}</div>`;
  h += `<div class="row"><button class="btn small ghost" id="solution">💡 ${esc(t('showSolution'))}</button><button class="btn small ghost" id="restart">↺ ${esc(t('resetLesson'))}</button></div>`;
  el.innerHTML = h;
}

function renderToolbar() {
  $('#simBtn').innerHTML = S.sim ? '■ ' + esc(t('stop')) : '▶ ' + esc(t('simulate'));
  $('#simBtn').classList.toggle('running', S.sim);
  $('#selBtn').classList.toggle('on', S.tool === 'select');
  $('#modeFree').classList.toggle('on', S.mode === 'free');
  $('#modeLearn').classList.toggle('on', S.mode === 'learn');
  $('#undoBtn').disabled = !hist[S.mode].u.length;
  $('#redoBtn').disabled = !hist[S.mode].r.length;
  $('#soundBtn').innerHTML = (S.sound ? '🔊 ' : '🔇 ') + esc(t('sound'));
  const hasLdr = board().parts.some(p => p.type === 'ldr');
  $('#lightBox').hidden = !hasLdr;
  $('#lightVal').textContent = Math.round(S.light * 100) + '%';
  $('#lightRange').value = Math.round(S.light * 100);
}

function renderTexts() {
  document.documentElement.lang = L().html;
  document.title = t('title');
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  document.querySelectorAll('[data-tt]').forEach(el => el.title = t(el.dataset.tt));
  $('#lang').value = S.lang;
}
function renderAll() { renderTexts(); renderPalette(); renderProps(); renderLesson(); renderToolbar(); renderParts(); }
function changed(opts = {}) { if (S.sim) simulate(); renderParts(); renderProps(); renderToolbar(); if (opts.palette) renderPalette(); persist(); }

/* ---------------- placement ---------------- */
function occupied() { const m = {}; for (const p of board().parts) for (const h of p.pins) m[h] = p.id; return m; }
function nearestHole(x, y) {
  let best = null, bd = 12;
  for (const h of C.allHoles()) { const p = C.holePos(h); const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = h; } }
  return best;
}
function svgPoint(ev) {
  const svg = $('#board'), pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function hint() {
  if (S.tool === 'select') return;
  if (S.tool === 'pot') status(t('pickPot'));
  else status(S.pending ? t('pickSecond') : t('pickFirst', { part: '<b>' + esc(pn(S.tool)) + '</b>' }));
}
function addPart(type, pins, props = {}) {
  snapshot();
  const p = { id: 'p' + (S.nextId++), type, pins, props };
  if (type === 'resistor') p.props.R = props.R || 330;
  if (type === 'led') p.props.color = props.color || 'red';
  if (type === 'pot') p.props.pos = props.pos ?? 0.5;
  if (type === 'wire' && !props.color) {
    const nets = pins.map(C.holeNet);
    p.props.color = nets.includes('tn') || nets.includes('bn') ? 'black' : nets.includes('tp') || nets.includes('bp') ? 'red' : ['blue', 'green', 'yellow', 'orange'][S.nextId % 4];
  }
  board().parts.push(p);
  beep(660, 0.05, 0.04);
  return p;
}
function clickHole(h) {
  const occ = occupied();
  if (S.tool === 'pot') {
    const [r, c] = h.split(':');
    if (!C.TERM.includes(r) || +c + 2 >= C.COLS) { toast(t('potBad'), 'warn'); return; }
    const pins = [0, 1, 2].map(k => r + ':' + (+c + k));
    if (pins.some(x => occ[x])) { toast(t('occupied'), 'warn'); return; }
    addPart('pot', pins); changed(); return;
  }
  if (occ[h]) { toast(t('occupied'), 'warn'); return; }
  if (!S.pending) { S.pending = h; beep(520, 0.04, 0.03); drawOverlay(); hint(); return; }
  if (S.pending === h) { toast(t('sameHole'), 'warn'); return; }
  addPart(S.tool, [S.pending, h]);
  S.pending = null; drawOverlay(); hint(); changed();
}
function drawOverlay() {
  const g = $('#overlay'); if (!g) return;
  let h = '';
  if (S.hover && S.tool !== 'select') {
    const p = C.holePos(S.hover);
    if (S.tool === 'pot') { const [r, c] = S.hover.split(':'); for (let k = 0; k < 3; k++) { const q = C.holePos(r + ':' + Math.min(C.COLS - 1, +c + k)); h += `<circle cx="${q.x}" cy="${q.y}" r="7" class="hov"/>`; } }
    else h += `<circle cx="${p.x}" cy="${p.y}" r="7" class="hov"/>`;
    // highlight connected holes of this net
    const net = C.holeNet(S.hover);
    if (net.length > 2) for (const x of C.allHoles()) if (C.holeNet(x) === net && x !== S.hover) { const q = C.holePos(x); h += `<circle cx="${q.x}" cy="${q.y}" r="5" class="hov2"/>`; }
  }
  if (S.pending) {
    const a = C.holePos(S.pending);
    h += `<circle cx="${a.x}" cy="${a.y}" r="7" class="pend"/>`;
    if (S.hover) { const b = C.holePos(S.hover); h += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="ghost"/>`; }
  }
  g.innerHTML = h;
}

function setTool(tool) {
  S.tool = tool; S.pending = null;
  if (tool !== 'select') S.sel = null;
  renderPalette(); renderToolbar(); renderProps(); drawOverlay(); renderParts();
  if (tool === 'select') status(S.sim ? t('simOn') : ''); else hint();
}
function deleteSel() {
  const b = board(); const i = b.parts.findIndex(p => p.id === S.sel); if (i < 0) return;
  snapshot(); b.parts.splice(i, 1); S.sel = null; beep(300, 0.06, 0.04); changed();
}

/* ---------------- modals ---------------- */
function modal(html, cls = '') {
  const m = $('#modal'); m.innerHTML = `<div class="mbox ${cls}"><button class="x" data-close>✕</button>${html}</div>`; m.hidden = false;
}
const closeModal = () => { $('#modal').hidden = true; $('#modal').innerHTML = ''; };

function celebrate() {
  const i = S.lesson, les = L().lessons[i], next = i + 1 < C.LESSONS.length ? C.LESSONS[i + 1] : null;
  [523, 659, 784, 1047].forEach((f, k) => beep(f, 0.18, 0.06, 'triangle', k * 0.12));
  confetti();
  let h = `<div class="cel">🎉</div><h2>${esc(t('lessonDone'))}</h2><p class="big">${esc(t('level'))} ${i + 1}: ${esc(les.t)}</p>`;
  if (next && next.unlock.length) h += `<p>${esc(t('unlockedParts'))}</p><div class="newparts">${next.unlock.map(x => `<span>${icon(x)}${esc(pn(x))}</span>`).join('')}</div>`;
  if (!next) h += `<p class="big">${esc(t('allDone'))}</p>`;
  h += `<div class="row center">` + (next ? `<button class="btn primary" id="goNext">${esc(t('nextLesson'))} →</button>` : '') + `<button class="btn ghost" data-close>${esc(t('stay'))}</button></div>`;
  modal(h, 'center');
}
function confetti() {
  const box = $('#confetti'); box.innerHTML = '';
  const cols = ['#ff7a33', '#2dd4bf', '#ffd166', '#ef476f', '#7aa2ff', '#4ade80'];
  for (let k = 0; k < 90; k++) {
    const s = document.createElement('i');
    s.style.left = Math.random() * 100 + 'vw'; s.style.background = cols[k % cols.length];
    s.style.animationDelay = Math.random() * 0.6 + 's'; s.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(s);
  }
  setTimeout(() => (box.innerHTML = ''), 3600);
}
function lessonsModal() {
  const mx = maxLesson();
  let h = `<h2>📚 ${esc(t('lessons'))}</h2><div class="llist">`;
  C.LESSONS.forEach((les, i) => {
    const done = S.done.includes(les.id), open = i <= mx || done;
    h += `<button class="lrow${i === S.lesson ? ' cur' : ''}" ${open ? `data-lesson="${i}"` : 'disabled'}><span class="ln">${i + 1}</span><span class="lname">${esc(L().lessons[i].t)}</span><span class="ls">${done ? '✅' : open ? '▶' : '🔒'}</span></button>`;
  });
  modal(h + '</div>');
}
function startLesson(i, preset = true) {
  S.lesson = i; S.celebrated = false; S.sel = null; S.pending = null;
  const les = C.LESSONS[i];
  S.boards.learn = { parts: [] }; hist.learn = { u: [], r: [] };
  if (preset && les.preset) les.preset.forEach(p => addPart(p.type, [...p.pins], { ...p.props }));
  hist.learn = { u: [], r: [] };
  setSim(false); S.tool = 'select';
  renderAll(); persist(); closeModal();
}
function showSolution() {
  const les = C.LESSONS[S.lesson];
  snapshot();
  board().parts = [];
  const h = hist[S.mode].u.slice();
  les.solution.forEach(p => addPart(p.type, [...p.pins], { ...p.props }));
  hist[S.mode].u = h;
  S.sel = null; changed(); toast(t('solutionLoaded'), 'ok');
}
function savedList() { return load('rk_saved', []); }
function circuitsModal() {
  const list = savedList();
  const code = btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, parts: board().parts.map(({ type, pins, props }) => ({ type, pins, props })) }))));
  let h = `<h2>💾 ${esc(t('myCircuits'))}</h2>
    <div class="row"><input id="cname" placeholder="${esc(t('name'))}" value="${esc(t('defaultName'))} ${list.length + 1}"><button class="btn primary small" id="doSave">💾 ${esc(t('save'))}</button></div>
    <div class="clist">${list.length ? list.map((c, i) => `<div class="crow"><span>${esc(c.name)}<small>${new Date(c.date).toLocaleDateString(L().html)} · ${c.parts.length}</small></span><button class="btn small" data-loadc="${i}">${esc(t('load'))}</button><button class="btn small danger" data-delc="${i}">🗑</button></div>`).join('') : `<p class="muted">${esc(t('empty'))}</p>`}</div>
    <label>${esc(t('exportCode'))}<textarea id="ecode" readonly rows="3">${code}</textarea></label><button class="btn small" id="copyCode">📋 ${esc(t('copy'))}</button>
    <label>${esc(t('importLabel'))}<textarea id="icode" rows="3"></textarea></label><button class="btn small" id="doImport">⬆ ${esc(t('importBtn'))}</button>`;
  modal(h);
}
function loadParts(parts) {
  snapshot();
  const h = hist[S.mode].u.slice();
  board().parts = [];
  for (const p of parts) {
    if (!C.PINS[p.type] || !Array.isArray(p.pins) || p.pins.length !== C.PINS[p.type]) continue;
    if (!p.pins.every(x => typeof x === 'string' && C.holePos(x).y !== undefined && !isNaN(C.holePos(x).x))) continue;
    addPart(p.type, [...p.pins], { ...(p.props || {}) });
  }
  hist[S.mode].u = h;
  S.sel = null; changed({ palette: true });
}

function setSim(on) {
  S.sim = on;
  if (on) { audio(); for (const p of board().parts) if (p.type === 'button') p.props.pressed = false; }
  simulate();
  if (!on) { status(''); buzz(0); }
  renderParts(); renderProps(); renderToolbar();
}

/* ---------------- events ---------------- */
function bind() {
  $('#lang').innerHTML = Object.keys(I18N).map(k => `<option value="${k}">${I18N[k].flag} ${I18N[k].name}</option>`).join('');
  $('#lang').onchange = e => { S.lang = e.target.value; persist(); renderAll(); if (S.sim) simulate(); };
  $('#simBtn').onclick = () => { setSim(!S.sim); beep(S.sim ? 880 : 440, 0.07, 0.04); };
  $('#selBtn').onclick = () => setTool('select');
  $('#undoBtn').onclick = undo; $('#redoBtn').onclick = redo;
  $('#soundBtn').onclick = () => { S.sound = !S.sound; if (!S.sound) buzz(0); else simulate(); persist(); renderToolbar(); };
  $('#helpBtn').onclick = () => modal(`<h2>❓ ${esc(t('help'))}</h2><ul class="help">${t('helpItems').map(x => `<li>${x}</li>`).join('')}</ul>`);
  $('#saveBtn').onclick = circuitsModal;
  $('#clearBtn').onclick = () => modal(`<h2>🗑 ${esc(t('clear'))}</h2><p>${esc(t('confirmClear'))}</p><div class="row center"><button class="btn danger" id="doClear">${esc(t('yes'))}</button><button class="btn ghost" data-close>${esc(t('no'))}</button></div>`, 'center');
  $('#modeFree').onclick = () => { if (S.mode === 'free') return; S.mode = 'free'; S.sel = null; S.pending = null; setSim(false); S.tool = 'select'; renderAll(); persist(); };
  $('#modeLearn').onclick = () => { if (S.mode === 'learn') return; S.mode = 'learn'; S.sel = null; S.pending = null; setSim(false); S.tool = 'select'; S.celebrated = S.done.includes(C.LESSONS[S.lesson].id); renderAll(); persist(); };
  $('#lightRange').oninput = e => { S.light = e.target.value / 100; $('#lightVal').textContent = e.target.value + '%'; if (S.sim) { simulate(); renderParts(); renderProps(); } persist(); };

  $('#palette').addEventListener('click', e => {
    const inf = e.target.closest('[data-info]');
    if (inf) { e.stopPropagation(); const ty = inf.dataset.info; modal(`<h2>${icon(ty)} ${esc(pn(ty))}</h2><p>${esc(L().info[ty])}</p>`); return; }
    const b = e.target.closest('[data-type]'); if (!b) return;
    if (b.classList.contains('locked')) { toast(t('locked'), 'warn'); return; }
    setTool(S.tool === b.dataset.type ? 'select' : b.dataset.type);
  });
  $('#props').addEventListener('change', e => {
    const p = board().parts.find(x => x.id === S.sel); if (!p) return;
    if (e.target.dataset.prop === 'R') { snapshot(); p.props.R = +e.target.value; changed(); }
    if (e.target.dataset.prop === 'pos') { snapshot(); p.props.pos = e.target.value / 100; changed(); }
  });
  $('#props').addEventListener('input', e => {
    const p = board().parts.find(x => x.id === S.sel); if (!p || e.target.dataset.prop !== 'pos') return;
    p.props.pos = e.target.value / 100; $('#potv').textContent = e.target.value + '%';
    if (S.sim) simulate(); renderParts();
  });
  $('#props').addEventListener('click', e => {
    const p = board().parts.find(x => x.id === S.sel); if (!p) return;
    if (e.target.closest('#delSel')) return deleteSel();
    const c = e.target.closest('[data-color]');
    if (c) { snapshot(); p.props.color = c.dataset.color; if (p.type === 'led') p.props.burned = false; changed(); }
    if (e.target.closest('[data-toggle]')) { snapshot(); p.props.on = !p.props.on; beep(p.props.on ? 900 : 600, 0.04, 0.04); changed(); }
  });
  $('#lesson').addEventListener('click', e => {
    if (e.target.closest('#solution')) showSolution();
    if (e.target.closest('#restart')) startLesson(S.lesson);
  });
  $('#banner').addEventListener('click', e => { if (e.target.closest('#openLessons')) lessonsModal(); });
  $('#modal').addEventListener('click', e => {
    if (e.target === $('#modal') || e.target.closest('[data-close]')) return closeModal();
    const l = e.target.closest('[data-lesson]'); if (l) return startLesson(+l.dataset.lesson);
    if (e.target.closest('#goNext')) return startLesson(S.lesson + 1);
    if (e.target.closest('#doClear')) { snapshot(); board().parts = []; S.sel = null; closeModal(); changed(); return; }
    if (e.target.closest('#doSave')) { const list = savedList(); list.unshift({ name: $('#cname').value.trim() || t('defaultName'), date: Date.now(), parts: board().parts.map(({ type, pins, props }) => ({ type, pins, props })) }); store('rk_saved', list.slice(0, 40)); toast(t('saved'), 'ok'); circuitsModal(); return; }
    const lc = e.target.closest('[data-loadc]'); if (lc) { loadParts(savedList()[+lc.dataset.loadc].parts); closeModal(); toast(t('loaded'), 'ok'); return; }
    const dc = e.target.closest('[data-delc]'); if (dc) { const list = savedList(); list.splice(+dc.dataset.delc, 1); store('rk_saved', list); circuitsModal(); return; }
    if (e.target.closest('#copyCode')) { const ta = $('#ecode'); ta.select(); try { navigator.clipboard.writeText(ta.value).then(() => toast(t('copied'), 'ok'), () => { document.execCommand('copy'); toast(t('copied'), 'ok'); }); } catch (err) { document.execCommand('copy'); toast(t('copied'), 'ok'); } return; }
    if (e.target.closest('#doImport')) {
      try { const d = JSON.parse(decodeURIComponent(escape(atob($('#icode').value.trim())))); if (!Array.isArray(d.parts)) throw 0; loadParts(d.parts); closeModal(); toast(t('loaded'), 'ok'); }
      catch (err) { toast(t('importBad'), 'bad'); }
    }
  });

  const svg = $('#board');
  let pressedBtn = null;
  svg.addEventListener('pointermove', e => {
    if (S.tool === 'select') { if (S.hover) { S.hover = null; drawOverlay(); } return; }
    const p = svgPoint(e); const h = nearestHole(p.x, p.y);
    if (h !== S.hover) { S.hover = h; drawOverlay(); }
  });
  svg.addEventListener('pointerleave', () => { S.hover = null; drawOverlay(); });
  svg.addEventListener('pointerdown', e => {
    audio();
    const g = e.target.closest('.part');
    const part = g && board().parts.find(x => x.id === g.dataset.id);
    if (S.sim && part && (part.type === 'button' || part.type === 'switch')) {
      e.preventDefault();
      if (part.type === 'button') { part.props.pressed = true; pressedBtn = part; beep(900, 0.03, 0.03); try { svg.setPointerCapture(e.pointerId); } catch (er) {} }
      else { part.props.on = !part.props.on; beep(part.props.on ? 900 : 600, 0.04, 0.04); }
      if (S.sel !== part.id && S.tool === 'select') S.sel = part.id;
      changed(); return;
    }
    if (S.tool !== 'select') {
      const p = svgPoint(e); const h = nearestHole(p.x, p.y);
      if (h) { e.preventDefault(); S.hover = h; clickHole(h); }
      return;
    }
    S.sel = part ? part.id : null;
    renderParts(); renderProps();
  });
  const release = () => { if (pressedBtn) { pressedBtn.props.pressed = false; pressedBtn = null; changed(); } };
  svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);
  window.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === 'Escape') { if (!$('#modal').hidden) closeModal(); else if (S.pending) { S.pending = null; drawOverlay(); hint(); } else setTool('select'); }
    if ((e.key === 'Delete' || e.key === 'Backspace') && S.sel) { e.preventDefault(); deleteSel(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
  });
}

/* ---------------- init ---------------- */
if (!I18N[S.lang]) S.lang = 'en';
S.lesson = Math.min(S.lesson, C.LESSONS.length - 1);
for (const m of ['free', 'learn']) { const b = S.boards[m]; if (!b || !Array.isArray(b.parts)) S.boards[m] = { parts: [] }; }
for (const m of ['free', 'learn']) for (const p of S.boards[m].parts) { const n = +String(p.id).slice(1); if (n >= S.nextId) S.nextId = n + 1; }
S.celebrated = S.done.includes(C.LESSONS[S.lesson].id);
buildBoard(); bind(); renderAll();
if (S.mode === 'learn' && !S.boards.learn.parts.length && C.LESSONS[S.lesson].preset) startLesson(S.lesson);
})();
