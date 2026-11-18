/* Core: breadboard geometry, circuit solver, lessons. No DOM. */
const CORE = (() => {
  const COLS = 30, P = 22, X0 = 120;
  const TERM = 'abcdefghij';
  const ROWY = { tp: 40, tn: 62, a: 110, b: 132, c: 154, d: 176, e: 198, f: 250, g: 272, h: 294, i: 316, j: 338, bp: 386, bn: 408 };
  const ROWS = Object.keys(ROWY);
  const PINS = {
    wire: 2, battery: 2, lemon: 2, potato: 2,
    resistor: 2, pot: 3, capacitor: 2, diode: 2,
    led: 2, rgb: 4, bulb: 2, buzzer: 2, motor: 2, valve: 2,
    button: 2, switch: 2, spdt: 3, npn: 3, relay: 4,
    ldr: 2, ntc: 2, tilt: 2, touch: 2, reed: 2, gas: 2,
    accel: 3, gyro: 3, irrx: 3,
    ammeter: 2, voltmeter: 2, multimeter: 2,
  };
  /* parts whose pins sit in neighbouring holes of one row */
  const ROWPART = { pot: 1, rgb: 1, spdt: 1, npn: 1, relay: 1, accel: 1, gyro: 1, irrx: 1 };
  const PINLBL = { pot: ['1', 'W', '2'], rgb: ['R', '−', 'G', 'B'], spdt: ['A', 'C', 'B'], npn: ['E', 'B', 'C'], relay: ['~', '~', 'C', 'NO'], accel: ['+', 'S', '−'], gyro: ['+', 'S', '−'], irrx: ['+', 'S', '−'] };
  const LEDVF = { red: 1.8, yellow: 2.0, green: 2.1, blue: 3.0, white: 3.0 };
  const RGBVF = [1.9, 2.8, 2.9];
  const BAT_V = 9, BAT_R = 0.5, POT_R = 10000, BETA = 100, RBE = 50;
  const SRC = { battery: [9, 0.5], lemon: [0.95, 300], potato: [0.85, 600] };
  const LIT = 0.0005;

  const holePos = h => { const [r, c] = h.split(':'); return { x: X0 + (+c) * P, y: ROWY[r] }; };
  const holeNet = h => { const [r, c] = h.split(':'); return r.length === 2 ? r : ('abcde'.includes(r) ? 'U' : 'L') + c; };
  const allHoles = () => { const a = []; for (const r of ROWS) for (let c = 0; c < COLS; c++) a.push(r + ':' + c); return a; };
  const ldrR = light => Math.pow(10, Math.log10(50000) + (Math.log10(150) - Math.log10(50000)) * light);
  const ntcR = T => 10000 * Math.exp(3950 * (1 / (T + 273.15) - 1 / 298.15));
  const gasR = g => Math.pow(10, Math.log10(60000) + (Math.log10(800) - Math.log10(60000)) * g);

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

  /* opt: light 0..1, temp °C, tilt 0..90, rot 0..1, gas 0..1, magnet bool, ir bool,
     button/switch/touch/spdt/pot overrides, dt (s) + capV {id: V} for capacitor transients */
  function solve(circ, opt = {}) {
    const parts = circ.parts || [];
    const env = {
      light: opt.light ?? circ.light ?? 0.7, temp: opt.temp ?? 22, tilt: opt.tilt ?? 0, rot: opt.rot ?? 0,
      gas: opt.gas ?? 0, magnet: !!opt.magnet, ir: !!opt.ir,
    };
    const nets = new Set(['tp', 'tn']);
    for (const p of parts) for (const h of p.pins) nets.add(holeNet(h));
    const idx = {}; let n = 0;
    for (const k of nets) if (k !== 'tn') idx[k] = n++;
    const ix = k => (k === 'tn' ? -1 : idx[k]);
    const lin = [], devs = [], outs = [];
    const add = (a, b, G, E, pid, sub) => { const e = { a: ix(a), b: ix(b), G, E: E || 0, pid, sub }; lin.push(e); return e; };
    const addD = (a, b, Vf, Ron, pid, sub) => devs.push({ k: 'd', a: ix(a), b: ix(b), Vf, Ron, on: false, pid, sub });
    add('tp', 'tn', 1 / BAT_R, BAT_V, '_bat');
    for (const p of parts) {
      const N = p.pins.map(holeNet), pr = p.props || {};
      const closed = (cond, G = 50) => { if (cond) add(N[0], N[1], G, 0, p.id); };
      switch (p.type) {
        case 'wire': add(N[0], N[1], 1000, 0, p.id); break;
        case 'battery': case 'lemon': case 'potato': { const [V, R] = SRC[p.type]; add(N[0], N[1], 1 / R, V, p.id); break; }
        case 'resistor': add(N[0], N[1], 1 / (pr.R || 330), 0, p.id); break;
        case 'capacitor': {
          const C = (pr.C || 1000) * 1e-6;
          if (opt.dt) add(N[0], N[1], C / opt.dt, (opt.capV && opt.capV[p.id]) || 0, p.id);
          else add(N[0], N[1], 1e-9, 0, p.id);
          break;
        }
        case 'led': if (!pr.burned) addD(N[0], N[1], LEDVF[pr.color || 'red'], 15, p.id); break;
        case 'rgb': if (!pr.burned) { addD(N[0], N[1], RGBVF[0], 15, p.id, 0); addD(N[2], N[1], RGBVF[1], 15, p.id, 1); addD(N[3], N[1], RGBVF[2], 15, p.id, 2); } break;
        case 'diode': addD(N[0], N[1], 0.7, 1, p.id); break;
        case 'buzzer': addD(N[0], N[1], 1.5, 250, p.id); break;
        case 'bulb': add(N[0], N[1], 1 / 60, 0, p.id); break;
        case 'motor': add(N[0], N[1], 1 / 25, 0, p.id); break;
        case 'valve': add(N[0], N[1], 1 / 40, 0, p.id); break;
        case 'ldr': add(N[0], N[1], 1 / ldrR(env.light), 0, p.id); break;
        case 'ntc': add(N[0], N[1], 1 / ntcR(env.temp), 0, p.id); break;
        case 'gas': add(N[0], N[1], 1 / gasR(env.gas), 0, p.id); break;
        case 'tilt': closed(env.tilt >= 45); break;
        case 'reed': closed(env.magnet); break;
        case 'touch': closed(opt.touch ?? !!pr.pressed, 1 / 100); break;
        case 'ammeter': add(N[0], N[1], 20, 0, p.id); break;
        case 'voltmeter': add(N[0], N[1], 1e-7, 0, p.id); break;
        case 'multimeter': add(N[0], N[1], (pr.mode || 'V') === 'A' ? 20 : 1e-7, 0, p.id); break;
        case 'button': closed(opt.button ?? !!pr.pressed); break;
        case 'switch': closed(opt.switch ?? !!pr.on); break;
        case 'spdt': { const pos = opt.spdt ?? (pr.pos ? 1 : 0); add(N[1], pos ? N[2] : N[0], 50, 0, p.id); break; }
        case 'pot': {
          const pos = opt.pot ?? (pr.pos ?? 0.5);
          add(N[0], N[1], 1 / Math.max(pos * POT_R, 1), 0, p.id, 'aw');
          add(N[1], N[2], 1 / Math.max((1 - pos) * POT_R, 1), 0, p.id, 'wb');
          break;
        }
        case 'npn': devs.push({ k: 'q', e: ix(N[0]), b: ix(N[1]), c: ix(N[2]), mode: 'off', pid: p.id }); break;
        case 'relay': {
          const coil = add(N[0], N[1], 1 / 150, 0, p.id, 'coil');
          devs.push({ k: 'k', a: ix(N[2]), b: ix(N[3]), coil, closed: false, pid: p.id });
          break;
        }
        case 'accel': case 'gyro': case 'irrx': {
          const f = p.type === 'accel' ? env.tilt / 90 : p.type === 'gyro' ? env.rot : env.ir ? 1 : 0;
          add(N[0], N[2], 1 / 2000, 0, p.id, 'supply');
          outs.push({ o: ix(N[1]), p: ix(N[0]), m: ix(N[2]), f, G: 1 / 100, pid: p.id });
          break;
        }
      }
    }
    let V = [];
    const vv = i => (i < 0 ? 0 : V[i]);
    const run = () => {
      const M = Array.from({ length: n }, () => new Array(n).fill(0)), rhs = new Array(n).fill(0);
      for (let i = 0; i < n; i++) M[i][i] += 1e-9;
      const ge = (a, b, G, E) => {
        if (a >= 0) { M[a][a] += G; rhs[a] += G * E; }
        if (b >= 0) { M[b][b] += G; rhs[b] -= G * E; }
        if (a >= 0 && b >= 0) { M[a][b] -= G; M[b][a] -= G; }
      };
      const m = (r, c, v) => { if (r >= 0 && c >= 0) M[r][c] += v; };
      for (const e of lin) ge(e.a, e.b, e.G, e.E);
      for (const o of outs) { // current o->m = G*(Vo - Vm - f*(Vp - Vm))
        m(o.o, o.o, o.G); m(o.o, o.p, -o.G * o.f); m(o.o, o.m, -o.G * (1 - o.f));
        m(o.m, o.o, -o.G); m(o.m, o.p, o.G * o.f); m(o.m, o.m, o.G * (1 - o.f));
      }
      for (const d of devs) {
        if (d.k === 'd') { if (d.on) ge(d.a, d.b, 1 / d.Ron, d.Vf); }
        else if (d.k === 'k') { if (d.closed) ge(d.a, d.b, 50, 0); }
        else if (d.k === 'q' && d.mode !== 'off') {
          ge(d.b, d.e, 1 / RBE, 0.65);
          if (d.mode === 'act') { // current c->e = gm*(Vb - Ve - 0.65)
            const gm = BETA / RBE;
            m(d.c, d.b, gm); m(d.c, d.e, -gm); if (d.c >= 0) rhs[d.c] += gm * 0.65;
            m(d.e, d.b, -gm); m(d.e, d.e, gm); if (d.e >= 0) rhs[d.e] -= gm * 0.65;
          } else ge(d.c, d.e, 0.5, 0.1);
        }
      }
      V = gauss(M, rhs);
    };
    const qI = d => {
      const Vbe = vv(d.b) - vv(d.e), Vce = vv(d.c) - vv(d.e);
      const Ib = d.mode === 'off' ? 0 : (Vbe - 0.65) / RBE;
      const Ic = d.mode === 'act' ? BETA * Ib : d.mode === 'sat' ? 0.5 * (Vce - 0.1) : 0;
      return { Ib, Ic, Vbe, Vce };
    };
    const linI = e => e.G * (vv(e.a) - vv(e.b) - e.E);
    for (let it = 0; it < 500; it++) {
      run();
      let worst = null, wv = 1e-7, next = null;
      const cand = (d, v, nx) => { if (v > wv) { wv = v; worst = d; next = nx; } };
      for (const d of devs) {
        if (d.k === 'd') {
          const Vd = vv(d.a) - vv(d.b);
          if (d.on) { const I = (Vd - d.Vf) / d.Ron; if (I < 0) cand(d, -I * d.Ron, false); }
          else if (Vd > d.Vf) cand(d, Vd - d.Vf, true);
        } else if (d.k === 'k') {
          const Ic = Math.abs(linI(d.coil));
          if (!d.closed && Ic > 0.035) cand(d, (Ic - 0.035) * 100, true);
          if (d.closed && Ic < 0.025) cand(d, (0.025 - Ic) * 100, false);
        } else if (d.k === 'q') {
          const { Ib, Ic, Vbe, Vce } = qI(d);
          if (d.mode === 'off') { if (Vbe > 0.65) cand(d, Vbe - 0.65, Vce > 0.1 ? 'act' : 'sat'); }
          else if (Ib < 0) cand(d, -Ib * RBE, 'off');
          else if (d.mode === 'act' && Vce < 0.1) cand(d, 0.1 - Vce, 'sat');
          else if (d.mode === 'sat' && Ic > BETA * Ib) cand(d, (Ic - BETA * Ib) * 2, 'act');
        }
      }
      if (!worst) break;
      if (worst.k === 'd') worst.on = next; else if (worst.k === 'k') worst.closed = next; else worst.mode = next;
    }
    const res = { parts: {}, batI: 0, short: false, netV: {}, pinNet: {}, netPins: {}, env };
    for (const k of nets) res.netV[k] = vv(ix(k));
    const R = id => res.parts[id] || (res.parts[id] = { I: 0 });
    for (const e of lin) {
      if (e.pid === '_bat') { res.batI = -linI(e); continue; }
      const I = linI(e), r = R(e.pid);
      if (e.sub === 'aw') r.Iaw = I; else if (e.sub === 'wb') r.Iwb = I; else if (e.sub === 'coil') r.Icoil = I; else if (e.sub === 'supply') r.Isup = I; else r.I = I;
    }
    for (const d of devs) {
      const r = R(d.pid);
      if (d.k === 'd') { const I = d.on ? (vv(d.a) - vv(d.b) - d.Vf) / d.Ron : 0; if (d.sub === undefined) r.I = I; else (r.ch || (r.ch = [0, 0, 0]))[d.sub] = I; }
      else if (d.k === 'k') { r.closed = d.closed; r.I = d.closed ? 50 * (vv(d.a) - vv(d.b)) : 0; }
      else { const q = qI(d); r.mode = d.mode; r.Ib = q.Ib; r.Ic = q.Ic; r.I = q.Ic; }
    }
    for (const o of outs) { const r = R(o.pid); r.out = vv(o.o) - vv(o.m); r.f = o.f; }
    for (const p of parts) {
      const r = R(p.id);
      const N = p.pins.map(holeNet);
      r.V = res.netV[N[0]] - res.netV[N[1]];
      const I = r.I || 0, pr = p.props || {};
      switch (p.type) {
        case 'led':
          if (pr.burned) { r.lit = false; r.bright = 0; break; }
          r.lit = I > LIT; r.bright = Math.min(1, Math.sqrt(Math.max(0, I) / 0.02)); r.burn = I > 0.06; break;
        case 'rgb': {
          const ch = r.ch || [0, 0, 0];
          if (pr.burned) { r.lit = false; r.rgb = [0, 0, 0]; break; }
          r.rgb = ch.map(x => Math.min(1, Math.sqrt(Math.max(0, x) / 0.015)));
          r.nlit = ch.filter(x => x > LIT).length; r.lit = r.nlit > 0; r.burn = ch.some(x => x > 0.06); break;
        }
        case 'bulb': r.bright = Math.min(1.2, Math.abs(I) / 0.15); r.lit = r.bright > 0.15; break;
        case 'motor': r.speed = I / 0.36; r.spinning = Math.abs(I) > 0.05; break;
        case 'valve': r.open = Math.abs(I) > 0.1; break;
        case 'buzzer': r.sounding = I > 0.003; break;
        case 'diode': r.conducting = I > 0.001; break;
        case 'ammeter': r.reading = I * 1000; break;
        case 'voltmeter': r.reading = r.V; break;
        case 'multimeter': r.reading = (pr.mode || 'V') === 'A' ? I * 1000 : r.V; break;
      }
    }
    // groups of nets joined by wires (for topology checks)
    const uf = {}; const fd = x => { if (uf[x] === undefined) uf[x] = x; while (uf[x] !== x) { uf[x] = uf[uf[x]]; x = uf[x]; } return x; };
    for (const p of parts) if (p.type === 'wire') { const a = fd(holeNet(p.pins[0])), b = fd(holeNet(p.pins[1])); if (a !== b) uf[a] = b; }
    for (const p of parts) {
      const G = p.pins.map(h => fd(holeNet(h)));
      res.pinNet[p.id] = G;
      if (p.type !== 'wire' && p.type !== 'voltmeter' && p.type !== 'multimeter') for (const k of G) res.netPins[k] = (res.netPins[k] || 0) + 1;
    }
    res.short = res.batI > 1.5 || parts.some(p => p.type === 'battery' && Math.abs(res.parts[p.id].I) > 1.5);
    res.flowing = res.batI > 1e-5 || parts.some(p => SRC[p.type] && Math.abs(res.parts[p.id].I) > 1e-5);
    return res;
  }

  /* run a transient for `secs`, updating capV in place */
  function transient(circ, opt, capV, secs, dt = 1 / 30) {
    let r = null;
    const caps = circ.parts.filter(p => p.type === 'capacitor');
    for (let t = 0; t < secs - 1e-9; t += dt) {
      r = solve(circ, Object.assign({}, opt, { dt, capV }));
      for (const p of caps) capV[p.id] = r.parts[p.id].V;
    }
    return r || solve(circ, Object.assign({}, opt, { dt, capV }));
  }

  /* ---------- lesson helpers ---------- */
  const has = (c, t) => c.parts.some(p => p.type === t);
  const ofType = (c, t) => c.parts.filter(p => p.type === t);
  const ok = r => !r.short && !Object.values(r.parts).some(x => x.burn);
  const litLeds = (c, r) => c.parts.filter(p => (p.type === 'led' || p.type === 'rgb') && r.parts[p.id] && r.parts[p.id].lit);
  const ledI = (c, r) => ofType(c, 'led').reduce((s, p) => s + Math.max(0, (r.parts[p.id] || {}).I || 0), 0);
  const active = (c, r) => c.parts.filter(p => { const x = r.parts[p.id] || {}; return ((p.type === 'led' || p.type === 'rgb' || p.type === 'bulb') && x.lit) || x.spinning || x.sounding || x.open; }).length;
  const SENSOR_ENV = { ntc: [{ temp: -10 }, { temp: 60 }], tilt: [{ tilt: 0 }, { tilt: 90 }], reed: [{ magnet: false }, { magnet: true }], gas: [{ gas: 0 }, { gas: 1 }], touch: [{ touch: false }, { touch: true }], accel: [{ tilt: 0 }, { tilt: 90 }], gyro: [{ rot: 0 }, { rot: 1 }], irrx: [{ ir: false }, { ir: true }] };

  const W = (a, b) => ({ type: 'wire', pins: [a, b], props: {} });
  const Rr = (a, b, R = 330) => ({ type: 'resistor', pins: [a, b], props: { R } });
  const L = (a, b, color = 'red') => ({ type: 'led', pins: [a, b], props: { color } });
  const X = (type, a, b, props = {}) => ({ type, pins: [a, b], props });
  const RP = (type, row, c0, props = {}) => ({ type, pins: Array.from({ length: PINS[type] }, (_, k) => row + ':' + (c0 + k)), props });
  const basic = [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')];
  const twoState = (c, s, A, B, pred) => { const a = s(c, A), b = s(c, B); return ok(a) && pred(a, true) && pred(b, false); };
  const gnd2 = W('tn:28', 'bn:28');

  const LESSONS = [
    { id: 'led', unlock: ['wire', 'resistor', 'led'],
      check: (c, s, r) => ok(r) && has(c, 'resistor') && litLeds(c, r).length >= 1,
      solution: basic },
    { id: 'button', unlock: ['button'],
      check: (c, s, r) => has(c, 'button') && twoState(c, s, { button: true }, { button: false }, (x, on) => on ? litLeds(c, x).length >= 1 : litLeds(c, x).length === 0) && litLeds(c, r).length >= 1,
      solution: [X('button', 'tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')] },
    { id: 'switch', unlock: ['switch', 'spdt'],
      check: (c, s, r) => has(c, 'switch') && twoState(c, s, { switch: true }, { switch: false }, (x, on) => on ? litLeds(c, x).length >= 1 : litLeds(c, x).length === 0) && litLeds(c, r).length >= 1,
      solution: [X('switch', 'tp:2', 'a:2', { on: true }), Rr('b:2', 'b:7'), L('c:7', 'c:10'), W('a:10', 'tn:10')] },
    { id: 'parallel', unlock: [],
      check: (c, s, r) => { if (!ok(r)) return false; const lit = litLeds(c, r).filter(p => p.type === 'led'); for (let i = 0; i < lit.length; i++) for (let j = i + 1; j < lit.length; j++) if (r.pinNet[lit[i].id][1] === r.pinNet[lit[j].id][1] && r.pinNet[lit[i].id][0] !== r.pinNet[lit[j].id][1]) return true; return false; },
      solution: [...basic, W('tp:14', 'a:14'), Rr('b:14', 'b:19'), L('c:19', 'c:22', 'green'), W('a:22', 'tn:22')] },
    { id: 'series', unlock: [],
      check: (c, s, r) => { if (!ok(r)) return false; const lit = litLeds(c, r).filter(p => p.type === 'led'); for (const A of lit) for (const B of lit) if (A !== B) { const k = r.pinNet[A.id][1]; if (k === r.pinNet[B.id][0] && r.netPins[k] === 2) return true; } return false; },
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
      solution: [RP('pot', 'a', 2, { pos: 0.1 }), W('tp:2', 'b:2'), Rr('c:3', 'c:8'), L('d:8', 'd:11'), W('a:11', 'tn:11')] },
    { id: 'ldr', unlock: ['ldr'],
      check: (c, s, r) => { if (!has(c, 'ldr')) return false; const A = s(c, { light: 0.1 }), B = s(c, { light: 0.95 }); if (!ok(A) || !ok(B)) return false; const ia = ledI(c, A), ib = ledI(c, B); return (litLeds(c, A).length || litLeds(c, B).length) && Math.abs(ia - ib) > 0.3 * Math.max(ia, ib); },
      solution: [W('tp:2', 'a:2'), X('ldr', 'b:2', 'b:6'), Rr('c:6', 'c:10', 220), L('d:10', 'd:13'), W('a:13', 'tn:13')] },
    { id: 'diode', unlock: ['diode'],
      check: (c, s, r) => ok(r) && ofType(c, 'diode').some(p => r.parts[p.id].conducting) && litLeds(c, r).length >= 1,
      solution: [W('tp:2', 'a:2'), X('diode', 'b:2', 'b:6'), Rr('c:6', 'c:10'), L('d:10', 'd:13', 'green'), W('a:13', 'tn:13')] },
    { id: 'ammeter', unlock: ['ammeter', 'multimeter'],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && c.parts.some(p => (p.type === 'ammeter' || (p.type === 'multimeter' && p.props.mode === 'A')) && Math.abs(r.parts[p.id].reading) > 0.5),
      solution: [W('tp:2', 'a:2'), X('ammeter', 'b:2', 'b:6'), Rr('c:6', 'c:10'), L('d:10', 'd:13'), W('a:13', 'tn:13')] },
    { id: 'voltmeter', unlock: ['voltmeter'],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && c.parts.some(p => (p.type === 'voltmeter' || (p.type === 'multimeter' && (p.props.mode || 'V') === 'V')) && Math.abs(r.parts[p.id].reading) > 1),
      solution: [...basic, X('voltmeter', 'e:7', 'e:10')] },
    { id: 'repair', unlock: [],
      preset: [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:10', 'c:7', 'blue'), W('a:10', 'tn:10')],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1,
      solution: [W('tp:2', 'a:2'), Rr('b:2', 'b:7'), L('c:7', 'c:10', 'blue'), W('a:10', 'tn:10')] },
    { id: 'finale', unlock: [],
      check: (c, s, r) => ok(r) && litLeds(c, r).length >= 1 && ofType(c, 'motor').some(p => r.parts[p.id].spinning) && ofType(c, 'buzzer').some(p => r.parts[p.id].sounding),
      solution: [W('tp:2', 'a:2'), X('motor', 'b:2', 'b:6'), W('a:6', 'tn:6'), W('tp:9', 'a:9'), Rr('b:9', 'b:13'), L('c:13', 'c:16'), W('a:16', 'tn:16'), W('tp:19', 'a:19'), X('buzzer', 'b:19', 'b:24'), W('a:24', 'tn:24')] },
    /* ---- 16+ ---- */
    { id: 'fruit', unlock: ['lemon', 'potato', 'battery'],
      check: (c, s, r) => ok(r) && (has(c, 'lemon') || has(c, 'potato')) && Math.abs(r.batI) < 1e-4 && litLeds(c, r).length >= 1,
      solution: [X('lemon', 'f:2', 'f:5'), X('lemon', 'g:5', 'g:8'), X('lemon', 'h:8', 'h:11'), L('i:2', 'i:14'), W('j:14', 'j:11')] },
    { id: 'capacitor', unlock: ['capacitor'],
      check: (c, s, r) => {
        if (!has(c, 'capacitor') || !has(c, 'button')) return false;
        const capV = {}, base = { light: r.env.light };
        const a = transient(c, Object.assign({ button: true }, base), capV, 3); if (!ok(a) || !litLeds(c, a).length) return false;
        const b = transient(c, Object.assign({ button: false }, base), capV, 0.3); if (!litLeds(c, b).length) return false;
        const z = transient(c, Object.assign({ button: false }, base), capV, 12); return litLeds(c, z).length === 0;
      },
      solution: [X('button', 'tp:2', 'a:2'), X('capacitor', 'b:2', 'tn:4', { C: 2200 }), Rr('c:2', 'c:7'), L('d:7', 'd:10'), W('a:10', 'tn:10')] },
    { id: 'transistor', unlock: ['npn'],
      check: (c, s, r) => has(c, 'npn') && has(c, 'button') && twoState(c, s, { button: true }, { button: false }, (x, on) => {
        const q = ofType(c, 'npn').some(p => Math.abs(x.parts[p.id].Ic || 0) > 0.005);
        return on ? q && active(c, x) >= 1 : !q && active(c, x) === 0;
      }),
      solution: [RP('npn', 'f', 10), X('button', 'tp:5', 'a:5'), Rr('b:5', 'b:11', 10000), W('c:11', 'g:11'), W('tp:16', 'a:16'), X('bulb', 'b:16', 'b:20'), W('c:20', 'h:12'), W('j:10', 'bn:10'), gnd2] },
    { id: 'nightlight', unlock: [],
      check: (c, s, r) => has(c, 'npn') && has(c, 'ldr') && twoState(c, s, { light: 0.05 }, { light: 0.95 }, (x, dark) => dark ? litLeds(c, x).length >= 1 : litLeds(c, x).length === 0),
      solution: [W('tp:4', 'a:4'), Rr('b:4', 'b:8', 10000), X('ldr', 'c:8', 'tn:8'), Rr('d:8', 'f:11', 1000), RP('npn', 'g', 10), W('h:10', 'bn:10'), gnd2, W('tp:16', 'a:16'), Rr('b:16', 'b:20'), L('c:20', 'f:20'), W('g:20', 'i:12')] },
    { id: 'relay', unlock: ['relay'],
      check: (c, s, r) => has(c, 'relay') && has(c, 'button') && twoState(c, s, { button: true }, { button: false }, (x, on) => {
        const k = ofType(c, 'relay').some(p => x.parts[p.id].closed);
        return on ? k && active(c, x) >= 1 : !k && active(c, x) === 0;
      }),
      solution: [X('button', 'tp:4', 'a:4'), RP('relay', 'f', 4), W('e:4', 'g:4'), W('h:5', 'bn:5'), gnd2, W('tp:12', 'a:12'), W('b:12', 'h:6'), X('motor', 'i:7', 'i:12'), W('j:12', 'bn:12')] },
    { id: 'rgb', unlock: ['rgb'],
      check: (c, s, r) => ok(r) && ofType(c, 'rgb').some(p => r.parts[p.id].nlit >= 2),
      solution: [RP('rgb', 'f', 10), W('tp:4', 'a:4'), Rr('b:4', 'g:10'), W('tp:6', 'a:6'), Rr('b:6', 'g:12', 220), W('tp:14', 'a:14'), Rr('b:14', 'g:13', 220), W('h:11', 'bn:11'), gnd2] },
    { id: 'sensors', unlock: ['ntc', 'tilt', 'touch', 'reed', 'gas', 'valve', 'accel', 'gyro', 'irrx'],
      check: (c, s, r) => {
        for (const ty in SENSOR_ENV) if (has(c, ty)) { const [A, B] = SENSOR_ENV[ty]; const a = s(c, A), b = s(c, B); if (ok(a) && ok(b) && active(c, a) !== active(c, b)) return true; }
        return false;
      },
      solution: [W('tp:2', 'a:2'), X('reed', 'b:2', 'b:6'), Rr('c:6', 'c:10'), L('d:10', 'd:13', 'green'), W('a:13', 'tn:13')] },
  ];

  const ALL_TYPES = Object.keys(PINS);
  return { COLS, P, X0, ROWY, ROWS, TERM, PINS, ROWPART, PINLBL, LEDVF, holePos, holeNet, allHoles, ldrR, ntcR, solve, transient, LESSONS, ALL_TYPES, SENSOR_ENV };
})();
if (typeof module !== 'undefined') module.exports = CORE;
