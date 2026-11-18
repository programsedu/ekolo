/* Core: breadboard geometry, circuit solver, lessons. No DOM. */
const CORE = (() => {
  const COLS = 30, P = 22, X0 = 120;
  const TERM = 'abcdefghij';
  const ROWY = { tp: 40, tn: 62, a: 110, b: 132, c: 154, d: 176, e: 198, f: 250, g: 272, h: 294, i: 316, j: 338, bp: 386, bn: 408 };
  const ROWS = Object.keys(ROWY);
  const PINS = { wire: 2, resistor: 2, led: 2, diode: 2, bulb: 2, buzzer: 2, motor: 2, button: 2, switch: 2, pot: 3, ldr: 2, ammeter: 2, voltmeter: 2 };
  const LEDVF = { red: 1.8, yellow: 2.0, green: 2.1, blue: 3.0, white: 3.0 };
  const BAT_V = 9, BAT_R = 0.5, POT_R = 10000;

  const holePos = h => { const [r, c] = h.split(':'); return { x: X0 + (+c) * P, y: ROWY[r] }; };
  const holeNet = h => { const [r, c] = h.split(':'); return r.length === 2 ? r : ('abcde'.includes(r) ? 'U' : 'L') + c; };
  const allHoles = () => { const a = []; for (const r of ROWS) for (let c = 0; c < COLS; c++) a.push(r + ':' + c); return a; };
  const ldrR = light => Math.pow(10, Math.log10(50000) + (Math.log10(150) - Math.log10(50000)) * light);

  function gauss(M, b) {
    const n = b.length;
    for (let k = 0; k < n; k++) {
      let p = k, mx = Math.abs(M[k][k]);
      for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > mx) { mx = Math.abs(M[i][k]); p = i; }
      if (mx < 1e-18) continue;
      if (p !== k) { [M[k], M[p]] = [M[p], M[k]]; [b[k], b[p]] = [b[p], b[k]]; }
      for (let i = k + 1; i < n; i++) {
        const f = M[i][k] / M[k][k]; if (!f) continue;
        for (let j = k; j < n; j++) M[i][j] -= f * M[k][j];
        b[i] -= f * b[k];
      }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let s = b[i]; for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
      x[i] = Math.abs(M[i][i]) < 1e-18 ? 0 : s / M[i][i];
    }
    return x;
  }

  /* opt: {light, button:bool|undefined, switch:bool|undefined, pot:number|undefined} */
  function solve(circ, opt = {}) {
    const parts = circ.parts || [];
    const light = opt.light ?? circ.light ?? 0.7;
    const nets = new Set(['tp', 'tn']);
    for (const p of parts) for (const h of p.pins) nets.add(holeNet(h));
    const idx = {}; let n = 0;
    for (const k of nets) if (k !== 'tn') idx[k] = n++;
    const ix = k => (k === 'tn' ? -1 : idx[k]);
    // element: {a,b,G,E,pid,sub,diode?:{Vf,Ron},on}
    const els = [];
    const add = (a, b, G, E, pid, sub) => { const e = { a: ix(a), b: ix(b), G, E: E || 0, pid, sub }; els.push(e); return e; };
    add('tp', 'tn', 1 / BAT_R, BAT_V, '_bat');
    const diodes = [];
    const addD = (a, b, Vf, Ron, pid) => { const e = add(a, b, 1e-9, 0, pid); e.diode = { Vf, Ron }; e.on = false; diodes.push(e); };
    for (const p of parts) {
      const N = p.pins.map(holeNet), pr = p.props || {};
      switch (p.type) {
        case 'wire': add(N[0], N[1], 1000, 0, p.id); break;
        case 'resistor': add(N[0], N[1], 1 / (pr.R || 330), 0, p.id); break;
        case 'led': if (!pr.burned) addD(N[0], N[1], LEDVF[pr.color || 'red'], 15, p.id); break;
        case 'diode': addD(N[0], N[1], 0.7, 1, p.id); break;
        case 'buzzer': addD(N[0], N[1], 1.5, 250, p.id); break;
        case 'bulb': add(N[0], N[1], 1 / 60, 0, p.id); break;
        case 'motor': add(N[0], N[1], 1 / 25, 0, p.id); break;
        case 'ldr': add(N[0], N[1], 1 / ldrR(light), 0, p.id); break;
        case 'ammeter': add(N[0], N[1], 20, 0, p.id); break;
        case 'voltmeter': add(N[0], N[1], 1e-7, 0, p.id); break;
        case 'button': { const on = opt.button ?? !!pr.pressed; if (on) add(N[0], N[1], 50, 0, p.id); break; }
        case 'switch': { const on = opt.switch ?? !!pr.on; if (on) add(N[0], N[1], 50, 0, p.id); break; }
        case 'pot': {
          const pos = opt.pot ?? (pr.pos ?? 0.5);
          add(N[0], N[1], 1 / Math.max(pos * POT_R, 1), 0, p.id, 'aw');
          add(N[1], N[2], 1 / Math.max((1 - pos) * POT_R, 1), 0, p.id, 'wb');
          break;
        }
      }
    }
    let V = [];
    const run = () => {
      const M = Array.from({ length: n }, () => new Array(n).fill(0)), rhs = new Array(n).fill(0);
      for (let i = 0; i < n; i++) M[i][i] += 1e-9;
      for (const e of els) {
        let G = e.G, E = e.E;
        if (e.diode) { if (e.on) { G = 1 / e.diode.Ron; E = e.diode.Vf; } else { G = 1e-9; E = 0; } }
        const { a, b } = e;
        if (a >= 0) { M[a][a] += G; rhs[a] += G * E; }
        if (b >= 0) { M[b][b] += G; rhs[b] -= G * E; }
        if (a >= 0 && b >= 0) { M[a][b] -= G; M[b][a] -= G; }
      }
      V = gauss(M, rhs);
    };
    const vv = i => (i < 0 ? 0 : V[i]);
    for (let it = 0; it < 400; it++) {
      run();
      let worst = null, wv = 1e-7;
      for (const d of diodes) {
        const Vd = vv(d.a) - vv(d.b);
        let viol = 0;
        if (d.on) { const I = (Vd - d.diode.Vf) / d.diode.Ron; if (I < 0) viol = -I * d.diode.Ron; }
        else if (Vd > d.diode.Vf) viol = Vd - d.diode.Vf;
        if (viol > wv) { wv = viol; worst = d; }
      }
      if (!worst) break;
      worst.on = !worst.on;
    }
    const cur = e => {
      let G = e.G, E = e.E;
      if (e.diode) { if (e.on) { G = 1 / e.diode.Ron; E = e.diode.Vf; } else { G = 1e-9; E = 0; } }
      return G * (vv(e.a) - vv(e.b) - E);
    };
    const res = { parts: {}, batI: 0, short: false, netV: {}, pinNet: {}, netPins: {} };
    const uf = {}; const fd = x => { if (uf[x] === undefined) uf[x] = x; while (uf[x] !== x) { uf[x] = uf[uf[x]]; x = uf[x]; } return x; };
    for (const p of parts) if (p.type === 'wire') { const a = fd(holeNet(p.pins[0])), b = fd(holeNet(p.pins[1])); if (a !== b) uf[a] = b; }
    for (const k of nets) res.netV[k] = vv(ix(k));
    for (const e of els) {
      if (e.pid === '_bat') { res.batI = -cur(e); continue; }
      const I = cur(e);
      const r = res.parts[e.pid] || (res.parts[e.pid] = { I: 0 });
      if (e.sub === 'aw') r.Iaw = I; else if (e.sub === 'wb') r.Iwb = I; else r.I = I;
    }
    res.short = res.batI > 1.5;
    for (const p of parts) {
      const r = res.parts[p.id] || (res.parts[p.id] = { I: 0 });
      const N = p.pins.map(holeNet);
      const G = N.map(fd);
      res.pinNet[p.id] = G;
      if (p.type !== 'wire' && p.type !== 'voltmeter') for (const k of G) res.netPins[k] = (res.netPins[k] || 0) + 1;
      r.V = res.netV[N[0]] - res.netV[N[1]];
      const I = r.I || 0, pr = p.props || {};
      switch (p.type) {
        case 'led':
          if (pr.burned) { r.lit = false; r.bright = 0; break; }
          r.lit = I > 0.0015; r.bright = Math.min(1, Math.max(0, I / 0.02)); r.burn = I > 0.06; break;
        case 'bulb': r.bright = Math.min(1.2, Math.abs(I) / 0.15); r.lit = r.bright > 0.15; break;
        case 'motor': r.speed = I / 0.36; r.spinning = Math.abs(I) > 0.05; break;
        case 'buzzer': r.sounding = I > 0.003; break;
        case 'diode': r.conducting = I > 0.001; break;
        case 'ammeter': r.reading = I * 1000; break;
        case 'voltmeter': r.reading = r.V; break;
      }
    }
    res.flowing = res.batI > 1e-5;
    return res;
  }

  /* ---------- lesson helpers ---------- */
  const has = (c, t) => c.parts.some(p => p.type === t);
  const ofType = (c, t) => c.parts.filter(p => p.type === t);
  const ok = r => !r.short && !Object.values(r.parts).some(x => x.burn);
  const litLeds = (c, r) => ofType(c, 'led').filter(p => r.parts[p.id] && r.parts[p.id].lit);
  const ledI = (c, r) => ofType(c, 'led').reduce((s, p) => s + Math.max(0, (r.parts[p.id] || {}).I || 0), 0);

  const H = (r, c) => r + ':' + c;
  const W = (a, b) => ({ type: 'wire', pins: [a, b], props: {} });
  const Rr = (a, b, R = 330) => ({ type: 'resistor', pins: [a, b], props: { R } });
  const L = (a, b, color = 'red') => ({ type: 'led', pins: [a, b], props: { color } });
  const X = (type, a, b, props = {}) => ({ type, pins: [a, b], props });
  const basic = [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')];

  const LESSONS = [
    { id: 'led', unlock: ['wire', 'resistor', 'led'],
      check: (c, s, r) => ok(r) && has(c, 'resistor') && litLeds(c, r).length >= 1,
      solution: basic },
    { id: 'button', unlock: ['button'],
      check: (c, s, r) => { if (!has(c, 'button')) return false; const on = s(c, { button: true }), off = s(c, { button: false }); return ok(on) && litLeds(c, on).length >= 1 && litLeds(c, off).length === 0 && litLeds(c, r).length >= 1; },
      solution: [X('button', 'tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')] },
    { id: 'switch', unlock: ['switch'],
      check: (c, s, r) => { if (!has(c, 'switch')) return false; const on = s(c, { switch: true }), off = s(c, { switch: false }); return ok(on) && litLeds(c, on).length >= 1 && litLeds(c, off).length === 0 && litLeds(c, r).length >= 1; },
      solution: [X('switch', 'tp:2', 'a:2', { on: true }), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')] },
    { id: 'parallel', unlock: [],
      check: (c, s, r) => { if (!ok(r)) return false; const lit = litLeds(c, r); for (let i = 0; i < lit.length; i++) for (let j = i + 1; j < lit.length; j++) if (r.pinNet[lit[i].id][1] === r.pinNet[lit[j].id][1] && r.pinNet[lit[i].id][0] !== r.pinNet[lit[j].id][1]) return true; return false; },
      solution: [...basic, W('tp:14', 'a:14'), Rr('b:14', 'b:19'), L('c:19', 'c:22', 'green'), W('a:22', 'tn:22')] },
    { id: 'series', unlock: [],
      check: (c, s, r) => { if (!ok(r)) return false; const lit = litLeds(c, r); for (const A of lit) for (const B of lit) if (A !== B) { const k = r.pinNet[A.id][1]; if (k === r.pinNet[B.id][0] && r.netPins[k] === 2) return true; } return false; },
      solution: [W('tp:2', 'a:2'), Rr('b:2', 'b:7', 220), L('c:7', 'c:10'), L('d:10', 'd:13', 'yellow'), W('a:13', 'tn:13')] },
    { id: 'bulb', unlock: ['bulb'],
      check: (c, s, r) => ok(r) && ofType(c, 'bulb').some(p => r.parts[p.id].lit),
      solution: [W('tp:3', 'a:3'), X('bulb', 'b:3', 'b:8'), W('a:8', 'tn:8')] },
    { id: 'buzzer', unlock: ['buzzer'],
      check: (c, s, r) => ok(r) && ofType(c, 'buzzer').some(p => r.parts[p.id].sounding),
      solution: [W('tp:3', 'a:3'), X('buzzer', 'b:3', 'b:8'), W('a:8', 'tn:8')] },
    { id: 'motor', unlock: ['motor'],
      check: (c, s, r) => ok(r) && ofType(c, 'motor').some(p => r.parts[p.id].spinning),
      solution: [W('tp:3', 'a:3'), X('motor', 'b:3', 'b:8'), W('a:8', 'tn:8')] },
    { id: 'pot', unlock: ['pot'],
      check: (c, s, r) => { if (!has(c, 'pot')) return false; const A = s(c, { pot: 0.15 }), B = s(c, { pot: 0.85 }); if (!ok(A) || !ok(B)) return false; const ia = ledI(c, A), ib = ledI(c, B); return (litLeds(c, A).length || litLeds(c, B).length) && Math.abs(ia - ib) > 0.3 * Math.max(ia, ib); },
      solution: [{ type: 'pot', pins: ['a:2', 'a:3', 'a:4'], props: { pos: 0.1 } }, W('tp:2', 'b:2'), Rr('c:3', 'c:8'), L('d:8', 'd:11'), W('a:11', 'tn:11')] },
    { id: 'ldr', unlock: ['ldr'],
      check: (c, s, r) => { if (!has(c, 'ldr')) return false; const A = s(c, { light: 0.1 }), B = s(c, { light: 0.95 }); if (!ok(A) || !ok(B)) return false; const ia = ledI(c, A), ib = ledI(c, B); return (litLeds(c, A).length || litLeds(c, B).length) && Math.abs(ia - ib) > 0.3 * Math.max(ia, ib); },
      solution: [W('tp:2', 'a:2'), X('ldr', 'b:2', 'b:6'), Rr('c:6', 'c:10', 220), L('d:10', 'd:13'), W('a:13', 'tn:13')] },
    { id: 'diode', unlock: ['diode'],
      check: (c, s, r) => ok(r) && ofType(c, 'diode').some(p => r.parts[p.id].conducting) && litLeds(c, r).length >= 1,
      solution: [W('tp:2', 'a:2'), X('diode', 'b:2', 'b:6'), Rr('c:6', 'c:10'), L('d:10', 'd:13', 'green'), W('a:13', 'tn:13')] },
    { id: 'ammeter', unlock: ['ammeter'],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && ofType(c, 'ammeter').some(p => Math.abs(r.parts[p.id].reading) > 1),
      solution: [W('tp:2', 'a:2'), X('ammeter', 'b:2', 'b:6'), Rr('c:6', 'c:10'), L('d:10', 'd:13'), W('a:13', 'tn:13')] },
    { id: 'voltmeter', unlock: ['voltmeter'],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && ofType(c, 'voltmeter').some(p => Math.abs(r.parts[p.id].reading) > 1),
      solution: [...basic, X('voltmeter', 'e:7', 'e:10')] },
    { id: 'repair', unlock: [],
      preset: [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:10', 'c:7', 'blue'), W('a:10', 'tn:10')],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1,
      solution: [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10', 'blue'), W('a:10', 'tn:10')] },
    { id: 'finale', unlock: [],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && ofType(c, 'motor').some(p => r.parts[p.id].spinning) && ofType(c, 'buzzer').some(p => r.parts[p.id].sounding),
      solution: [W('tp:2', 'a:2'), X('motor', 'b:2', 'b:6'), W('a:6', 'tn:6'), W('tp:9', 'a:9'), Rr('b:9', 'b:13'), L('c:13', 'c:16'), W('a:16', 'tn:16'), W('tp:19', 'a:19'), X('buzzer', 'b:19', 'b:24'), W('a:24', 'tn:24')] },
  ];

  const ALL_TYPES = Object.keys(PINS);
  return { COLS, P, X0, ROWY, ROWS, TERM, PINS, LEDVF, holePos, holeNet, allHoles, ldrR, solve, LESSONS, ALL_TYPES, H };
})();
if (typeof module !== 'undefined') module.exports = CORE;
