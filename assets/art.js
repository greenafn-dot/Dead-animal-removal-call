/* art.js — parametric SVG illustrations.
   Every mammal is drawn from one anatomy model, so species differ by real
   proportions (leg length, snout, ear shape, tail) rather than by clip art.
   Birds, bats, snakes and turtles get their own small renderers. */

const GROUND = 108;
const VB = '0 0 200 120';

const esc = (n) => Math.round(n * 10) / 10;

function svgWrap(inner, name) {
  return `<svg viewBox="${VB}" role="img" aria-label="Illustration of a ${name}" preserveAspectRatio="xMidYMid meet">
    <ellipse cx="100" cy="${GROUND + 4}" rx="74" ry="5.5" fill="currentColor" opacity=".10"/>
    ${inner}
  </svg>`;
}

/* ---------- shared parts ---------- */

function leg(x, top, len, w, fill, forward = 0) {
  const bottom = GROUND;
  const knee = top + len * 0.55;
  return `<path d="M${esc(x)} ${esc(top)} Q${esc(x + forward)} ${esc(knee)} ${esc(x + forward * 1.4)} ${esc(bottom - w * 0.4)}"
    fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
}

function ear(kind, hx, hy, hw, hh, coat, dark) {
  const bx = hx + hw * 0.12, by = hy - hh * 0.33;
  const off = kind === 'round' ? 'translate(5 2)' : 'translate(7 4)';
  const far = (inner) => ({ far: `<g transform="${off}" opacity=".42">${inner}</g>`, near: '' });
  const pair = (inner) => ({ far: `<g transform="${off}" opacity=".42">${inner}</g>`, near: inner });
  switch (kind) {
    case 'round': {
      const one = (ox) => `<circle cx="${esc(bx + ox)}" cy="${esc(by)}" r="${esc(hh * 0.27)}" fill="${coat}"/>
        <circle cx="${esc(bx + ox)}" cy="${esc(by + 1)}" r="${esc(hh * 0.10)}" fill="${dark}" opacity=".5"/>`;
      return pair(one(0));
    }
    case 'pointed': {
      const one = () => `<path d="M${esc(bx - hw * 0.22)} ${esc(by + hh * 0.30)} L${esc(bx - hw * 0.04)} ${esc(by - hh * 0.72)} L${esc(bx + hw * 0.28)} ${esc(by + hh * 0.24)} Z" fill="${coat}"/>
        <path d="M${esc(bx - hw * 0.08)} ${esc(by + hh * 0.18)} L${esc(bx - hw * 0.03)} ${esc(by - hh * 0.42)} L${esc(bx + hw * 0.14)} ${esc(by + hh * 0.14)} Z" fill="${dark}" opacity=".5"/>`;
      return pair(one());
    }
    case 'floppy': {
      const one = () => `<path d="M${esc(bx - hw * 0.18)} ${esc(by + hh * 0.18)}
          Q${esc(bx + hw * 0.30)} ${esc(by - hh * 0.28)} ${esc(bx + hw * 0.34)} ${esc(by + hh * 0.60)}
          Q${esc(bx + hw * 0.16)} ${esc(by + hh * 1.05)} ${esc(bx - hw * 0.12)} ${esc(by + hh * 0.62)} Z"
          fill="${dark}" opacity=".92"/>`;
      return pair(one());
    }
    case 'tall': {
      const one = (ox, rot) => `<ellipse cx="${esc(bx + ox)}" cy="${esc(by - hh * 0.92)}" rx="${esc(hh * 0.24)}" ry="${esc(hh * 1.05)}"
          fill="${coat}" transform="rotate(${rot} ${esc(bx + ox)} ${esc(by - hh * 0.92)})"/>
        <ellipse cx="${esc(bx + ox)}" cy="${esc(by - hh * 0.86)}" rx="${esc(hh * 0.11)}" ry="${esc(hh * 0.78)}"
          fill="${dark}" opacity=".4" transform="rotate(${rot} ${esc(bx + ox)} ${esc(by - hh * 0.92)})"/>`;
      return { far: `<g transform="translate(7 4)" opacity=".5">${one(4, 14)}</g>`, near: one(-1, 4) };
    }
    case 'huge': {
      const one = () => `<ellipse cx="${esc(bx)}" cy="${esc(by - hh * 0.34)}" rx="${esc(hh * 0.28)}" ry="${esc(hh * 0.66)}"
        fill="${coat}" transform="rotate(-10 ${esc(bx)} ${esc(by)})"/>`;
      return pair(one());
    }
    case 'tiny':
      return { far: '', near: `<circle cx="${esc(bx)}" cy="${esc(by + hh * 0.12)}" r="${esc(hh * 0.20)}" fill="${dark}"/>` };
    default:
      return { far: '', near: '' };
  }
}

function tail(spec, x, y, coat, dark) {
  const t = spec.type, len = spec.len || 40, w = spec.w || 8;
  switch (t) {
    case 'ringed': {
      const d = `M${esc(x)} ${esc(y)} Q${esc(x + len * 0.7)} ${esc(y - 6)} ${esc(x + len)} ${esc(y + len * 0.30)}`;
      return `<path d="${d}" fill="none" stroke="${coat}" stroke-width="${w}" stroke-linecap="round"/>
              <path d="${d}" fill="none" stroke="${dark}" stroke-width="${w}" stroke-dasharray="7 7" stroke-dashoffset="4"/>`;
    }
    case 'brush': {
      const d = `M${esc(x)} ${esc(y)} Q${esc(x + len * 0.75)} ${esc(y + 4)} ${esc(x + len)} ${esc(y + len * 0.45)}`;
      return `<path d="${d}" fill="none" stroke="${coat}" stroke-width="${w}" stroke-linecap="round"/>
              ${spec.tip ? `<circle cx="${esc(x + len)}" cy="${esc(y + len * 0.45)}" r="${esc(w * 0.52)}" fill="${spec.tip}"/>` : ''}`;
    }
    case 'bushyUp': {
      const d = `M${esc(x)} ${esc(y)} C${esc(x + len * 0.55)} ${esc(y - 4)} ${esc(x + len * 0.72)} ${esc(y - len * 0.85)} ${esc(x + len * 0.18)} ${esc(y - len * 1.05)}`;
      return `<path d="${d}" fill="none" stroke="${coat}" stroke-width="${w}" stroke-linecap="round"/>
              <path d="${d}" fill="none" stroke="${dark}" stroke-width="${esc(w * 0.34)}" stroke-linecap="round" opacity=".35"/>`;
    }
    case 'plume': {
      const d = `M${esc(x)} ${esc(y)} C${esc(x + len * 0.6)} ${esc(y)} ${esc(x + len * 0.8)} ${esc(y - len * 0.8)} ${esc(x + len * 0.15)} ${esc(y - len * 1.0)}`;
      return `<path d="${d}" fill="none" stroke="${spec.color || coat}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    case 'thin': {
      const d = `M${esc(x)} ${esc(y)} Q${esc(x + len * 0.8)} ${esc(y - 10)} ${esc(x + len)} ${esc(y + len * 0.42)}`;
      return `<path d="${d}" fill="none" stroke="${spec.color || dark}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    case 'taper': {
      const d = `M${esc(x)} ${esc(y)} Q${esc(x + len * 0.6)} ${esc(y + 6)} ${esc(x + len)} ${esc(y + len * 0.5)}`;
      return `<path d="${d}" fill="none" stroke="${coat}" stroke-width="${w}" stroke-linecap="round"/>
              <path d="${d}" fill="none" stroke="${dark}" stroke-width="${esc(w * 0.45)}" stroke-linecap="round" opacity=".45"/>`;
    }
    case 'stub':
      return `<circle cx="${esc(x + 4)}" cy="${esc(y - 2)}" r="${esc(w)}" fill="${spec.color || coat}"/>`;
    default:
      return '';
  }
}

/* ---------- the mammal model ---------- */

function mammal(s) {
  const bw = s.bodyW, bh = s.bodyH, legLen = s.legLen;
  const coat = s.coat, dark = s.dark, belly = s.belly || coat;
  const cx = s.cx || 104;
  const cy = GROUND - legLen - bh / 2;
  const shoulderX = cx - bw * 0.34;
  const rumpX = cx + bw * 0.40;
  const hw = s.headW, hh = s.headH;
  const hx = shoulderX - (s.neckDx ?? 20);
  const hy = cy - (s.neckDy ?? 12);
  const legTop = cy + bh * 0.22;
  const legW = s.legW || 7;
  const legColor = s.legColor || coat;
  const sl = s.snout ?? 9, st = s.snoutW ?? 8, sd = s.snoutDrop ?? 4;

  const farLeg = `<g opacity=".62">
      ${leg(shoulderX + 5, legTop, legLen, legW, legColor, -3)}
      ${leg(rumpX - 7, legTop, legLen, legW, legColor, 3)}
    </g>`;
  const nearLeg = `${leg(shoulderX - 2, legTop, legLen, legW, legColor, -2)}
      ${leg(rumpX, legTop, legLen, legW, legColor, 4)}`;

  const body = `<ellipse cx="${esc(cx)}" cy="${esc(cy)}" rx="${esc(bw / 2)}" ry="${esc(bh / 2)}" fill="${coat}"/>
    <ellipse cx="${esc(cx)}" cy="${esc(cy + bh * 0.22)}" rx="${esc(bw * 0.42)}" ry="${esc(bh * 0.28)}" fill="${belly}" opacity=".75"/>`;

  const neck = `<path d="M${esc(shoulderX + 4)} ${esc(cy - bh * 0.18)} L${esc(hx + hw * 0.18)} ${esc(hy + hh * 0.10)}"
      fill="none" stroke="${coat}" stroke-width="${esc(s.neckW || bh * 0.62)}" stroke-linecap="round"/>`;

  const head = `<ellipse cx="${esc(hx)}" cy="${esc(hy)}" rx="${esc(hw / 2)}" ry="${esc(hh / 2)}" fill="${coat}"/>`;

  const snout = sl > 0 ? `<path d="M${esc(hx - hw * 0.05)} ${esc(hy - hh * 0.20)}
      Q${esc(hx - hw * 0.5 - sl)} ${esc(hy + sd - st / 2)} ${esc(hx - hw * 0.5 - sl)} ${esc(hy + sd)}
      Q${esc(hx - hw * 0.5 - sl)} ${esc(hy + sd + st / 2)} ${esc(hx - hw * 0.05)} ${esc(hy + hh * 0.36)} Z"
      fill="${s.snoutColor || coat}"/>
      <circle cx="${esc(hx - hw * 0.5 - sl + 1)}" cy="${esc(hy + sd - 1)}" r="2" fill="${dark}"/>` : '';

  const eye = `<circle cx="${esc(hx - hw * 0.16)}" cy="${esc(hy - hh * 0.08)}" r="2.4" fill="#14181f"/>
    <circle cx="${esc(hx - hw * 0.16 + 0.8)}" cy="${esc(hy - hh * 0.08 - 0.8)}" r=".8" fill="#fff" opacity=".85"/>`;

  /* species markings */
  let marks = '';
  if (s.mark === 'mask') {
    marks += `<path d="M${esc(hx - hw * 0.46)} ${esc(hy - hh * 0.20)} Q${esc(hx)} ${esc(hy - hh * 0.34)} ${esc(hx + hw * 0.44)} ${esc(hy - hh * 0.16)}
        L${esc(hx + hw * 0.42)} ${esc(hy + hh * 0.18)} Q${esc(hx)} ${esc(hy + hh * 0.06)} ${esc(hx - hw * 0.44)} ${esc(hy + hh * 0.16)} Z" fill="#2b3038"/>
      <path d="M${esc(hx - hw * 0.5)} ${esc(hy - hh * 0.34)} Q${esc(hx - hw * 0.1)} ${esc(hy - hh * 0.46)} ${esc(hx + hw * 0.2)} ${esc(hy - hh * 0.40)}" fill="none" stroke="#f4f2ee" stroke-width="3" stroke-linecap="round"/>`;
  }
  if (s.mark === 'stripe') {
    marks += `<path d="M${esc(shoulderX + 2)} ${esc(cy - bh * 0.46)} Q${esc(cx)} ${esc(cy - bh * 0.60)} ${esc(rumpX - 4)} ${esc(cy - bh * 0.46)}"
        fill="none" stroke="#f6f4f0" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M${esc(shoulderX + 2)} ${esc(cy - bh * 0.30)} Q${esc(cx)} ${esc(cy - bh * 0.40)} ${esc(rumpX - 4)} ${esc(cy - bh * 0.28)}"
        fill="none" stroke="#f6f4f0" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M${esc(hx - hw * 0.02)} ${esc(hy - hh * 0.40)} L${esc(hx - hw * 0.22)} ${esc(hy + hh * 0.30)}"
        fill="none" stroke="#f6f4f0" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  if (s.mark === 'bands') {
    for (let i = 0; i < 6; i++) {
      const x = cx - bw * 0.26 + i * (bw * 0.10);
      marks += `<path d="M${esc(x)} ${esc(cy - bh * 0.46)} Q${esc(x + 3)} ${esc(cy)} ${esc(x)} ${esc(cy + bh * 0.42)}"
        fill="none" stroke="${dark}" stroke-width="2.2" opacity=".7"/>`;
    }
  }
  if (s.mark === 'spots') {
    marks += `<g fill="#fdfaf3" opacity=".8">
      <circle cx="${esc(cx - 12)}" cy="${esc(cy - bh * 0.16)}" r="2.6"/>
      <circle cx="${esc(cx + 2)}" cy="${esc(cy - bh * 0.28)}" r="2.4"/>
      <circle cx="${esc(cx + 15)}" cy="${esc(cy - bh * 0.12)}" r="2.6"/></g>`;
  }
  if (s.mark === 'tabby') {
    for (let i = 0; i < 4; i++) {
      const x = cx - bw * 0.24 + i * (bw * 0.16);
      marks += `<path d="M${esc(x)} ${esc(cy - bh * 0.46)} Q${esc(x + 5)} ${esc(cy - bh * 0.28)} ${esc(x + 1)} ${esc(cy - bh * 0.02)}"
        fill="none" stroke="${dark}" stroke-width="2.4" stroke-linecap="round" opacity=".42"/>`;
    }
  }
  if (s.mark === 'palemuzzle') {
    marks += `<ellipse cx="${esc(hx - hw * 0.34)}" cy="${esc(hy + hh * 0.22)}" rx="${esc(hw * 0.30)}" ry="${esc(hh * 0.26)}" fill="#f2efe8" opacity=".85"/>`;
  }

  const antlers = s.antlers ? `<g fill="none" stroke="#9c7c50" stroke-width="3.2" stroke-linecap="round">
      <path d="M${esc(hx + hw * 0.10)} ${esc(hy - hh * 0.44)} C${esc(hx + hw * 0.42)} ${esc(hy - hh * 1.3)} ${esc(hx + hw * 0.20)} ${esc(hy - hh * 1.9)} ${esc(hx - hw * 0.18)} ${esc(hy - hh * 2.3)}"/>
      <path d="M${esc(hx + hw * 0.26)} ${esc(hy - hh * 0.98)} L${esc(hx - hw * 0.26)} ${esc(hy - hh * 1.20)}"/>
      <path d="M${esc(hx + hw * 0.20)} ${esc(hy - hh * 1.30)} L${esc(hx - hw * 0.30)} ${esc(hy - hh * 1.48)}"/>
      </g>` : '';

  const ears = ear(s.ear, hx, hy, hw, hh, s.earColor || coat, dark);

  return svgWrap(`
    ${farLeg}
    ${tail(s.tail || { type: 'none' }, rumpX + bw * 0.06, cy - bh * 0.12, s.tail?.coat || coat, dark)}
    ${body}
    ${neck}
    ${antlers}
    ${ears.far}
    ${head}
    ${snout}
    ${marks}
    ${ears.near}
    ${eye}
    ${nearLeg}
  `, s.name);
}

/* ---------- non-mammal renderers ---------- */

function bird(s) {
  const cx = 100, cy = 74, bw = s.bodyW || 58, bh = s.bodyH || 40;
  const hx = cx - bw * 0.46, hy = cy - bh * 0.72;
  return svgWrap(`
    <path d="M${esc(cx + bw * 0.34)} ${esc(cy - 4)} L${esc(cx + bw * 0.92)} ${esc(cy + 4)} L${esc(cx + bw * 0.90)} ${esc(cy + 14)} L${esc(cx + bw * 0.30)} ${esc(cy + 8)} Z" fill="${s.dark}"/>
    <path d="M${esc(cx - 6)} ${esc(GROUND - 26)} L${esc(cx - 8)} ${esc(GROUND)} M${esc(cx + 8)} ${esc(GROUND - 26)} L${esc(cx + 11)} ${esc(GROUND)}"
      stroke="${s.leg || '#c8737f'}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="${esc(cx)}" cy="${esc(cy)}" rx="${esc(bw / 2)}" ry="${esc(bh / 2)}" fill="${s.coat}"/>
    <path d="M${esc(cx - bw * 0.30)} ${esc(cy - bh * 0.12)} Q${esc(cx + bw * 0.10)} ${esc(cy - bh * 0.46)} ${esc(cx + bw * 0.40)} ${esc(cy + bh * 0.10)}
      Q${esc(cx + bw * 0.02)} ${esc(cy + bh * 0.30)} ${esc(cx - bw * 0.30)} ${esc(cy - bh * 0.12)} Z" fill="${s.dark}" opacity=".55"/>
    <path d="M${esc(cx - bw * 0.40)} ${esc(cy - bh * 0.30)} Q${esc(hx + 6)} ${esc(hy + 10)} ${esc(hx + 2)} ${esc(hy + 4)}"
      stroke="${s.coat}" stroke-width="15" stroke-linecap="round" fill="none"/>
    ${s.iridescent ? `<path d="M${esc(cx - bw * 0.40)} ${esc(cy - bh * 0.26)} Q${esc(hx + 8)} ${esc(hy + 12)} ${esc(hx + 3)} ${esc(hy + 7)}"
      stroke="#4c7f6d" stroke-width="8" stroke-linecap="round" fill="none" opacity=".75"/>` : ''}
    <circle cx="${esc(hx)}" cy="${esc(hy)}" r="${esc(s.headR || 11)}" fill="${s.coat}"/>
    <path d="M${esc(hx - (s.headR || 11) * 0.7)} ${esc(hy)} L${esc(hx - (s.headR || 11) - (s.beak || 10))} ${esc(hy + (s.beakDrop || 3))} L${esc(hx - (s.headR || 11) * 0.7)} ${esc(hy + 5)} Z" fill="${s.beakColor || '#3d4048'}"/>
    <circle cx="${esc(hx - 3)}" cy="${esc(hy - 2)}" r="2.3" fill="#14181f"/>
    <circle cx="${esc(hx - 2.4)}" cy="${esc(hy - 2.8)}" r=".8" fill="#fff" opacity=".85"/>
  `, s.name);
}

function bat(s) {
  const cx = 100, cy = 62;
  const wing = (dir) => `<path d="M${esc(cx + dir * 6)} ${esc(cy - 8)}
      Q${esc(cx + dir * 46)} ${esc(cy - 34)} ${esc(cx + dir * 76)} ${esc(cy - 6)}
      Q${esc(cx + dir * 58)} ${esc(cy + 2)} ${esc(cx + dir * 52)} ${esc(cy + 14)}
      Q${esc(cx + dir * 38)} ${esc(cy + 2)} ${esc(cx + dir * 30)} ${esc(cy + 18)}
      Q${esc(cx + dir * 18)} ${esc(cy + 6)} ${esc(cx + dir * 6)} ${esc(cy + 16)} Z"
      fill="${s.dark}" opacity=".92"/>
    <path d="M${esc(cx + dir * 8)} ${esc(cy - 6)} L${esc(cx + dir * 70)} ${esc(cy - 6)}
      M${esc(cx + dir * 8)} ${esc(cy - 4)} L${esc(cx + dir * 48)} ${esc(cy + 12)}
      M${esc(cx + dir * 8)} ${esc(cy - 2)} L${esc(cx + dir * 28)} ${esc(cy + 16)}"
      stroke="${s.coat}" stroke-width="1.6" opacity=".45" fill="none"/>`;
  return svgWrap(`
    ${wing(-1)}${wing(1)}
    <ellipse cx="${esc(cx)}" cy="${esc(cy + 4)}" rx="9" ry="17" fill="${s.coat}"/>
    <ellipse cx="${esc(cx - 7)}" cy="${esc(cy - 22)}" rx="5" ry="9" fill="${s.coat}" transform="rotate(-18 ${esc(cx - 7)} ${esc(cy - 22)})"/>
    <ellipse cx="${esc(cx + 7)}" cy="${esc(cy - 22)}" rx="5" ry="9" fill="${s.coat}" transform="rotate(18 ${esc(cx + 7)} ${esc(cy - 22)})"/>
    <circle cx="${esc(cx)}" cy="${esc(cy - 14)}" r="11" fill="${s.coat}"/>
    <ellipse cx="${esc(cx)}" cy="${esc(cy - 8)}" rx="6" ry="5" fill="${s.dark}" opacity=".5"/>
    <circle cx="${esc(cx - 4)}" cy="${esc(cy - 16)}" r="2" fill="#14181f"/>
    <circle cx="${esc(cx + 4)}" cy="${esc(cy - 16)}" r="2" fill="#14181f"/>
  `, s.name);
}

function snake(s) {
  const d = `M28 ${GROUND - 8} C60 ${GROUND - 40} 84 ${GROUND + 6} 112 ${GROUND - 24} C130 ${GROUND - 42} 148 ${GROUND - 10} 170 ${GROUND - 22}`;
  return svgWrap(`
    <path d="${d}" fill="none" stroke="${s.coat}" stroke-width="14" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${s.dark}" stroke-width="14" stroke-dasharray="9 13" opacity=".8"/>
    <path d="${d}" fill="none" stroke="#ffffff" stroke-width="3" opacity=".16"/>
    <ellipse cx="24" cy="${GROUND - 10}" rx="13" ry="8.5" fill="${s.coat}" transform="rotate(-16 24 ${GROUND - 10})"/>
    <circle cx="19" cy="${GROUND - 13}" r="2.1" fill="#14181f"/>
    <path d="M12 ${GROUND - 9} l-9 -3 M12 ${GROUND - 9} l-9 2" stroke="#c0392b" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  `, s.name);
}

function turtle(s) {
  const cx = 100, cy = 76;
  return svgWrap(`
    <path d="M${esc(cx - 40)} ${esc(cy + 12)} l-8 14 M${esc(cx - 18)} ${esc(cy + 18)} l-5 12
             M${esc(cx + 22)} ${esc(cy + 18)} l6 12 M${esc(cx + 40)} ${esc(cy + 10)} l9 13"
      stroke="${s.dark}" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M${esc(cx + 44)} ${esc(cy + 2)} q14 4 20 12" stroke="${s.dark}" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M${esc(cx - 44)} ${esc(cy - 2)} q-16 -2 -22 8 q10 10 22 6" fill="${s.dark}"/>
    <circle cx="${esc(cx - 58)}" cy="${esc(cy + 1)}" r="2.2" fill="#14181f"/>
    <path d="M${esc(cx - 50)} ${esc(cy + 6)} a50 34 0 0 1 100 0 Z" fill="${s.coat}"/>
    <g fill="none" stroke="${s.dark}" stroke-width="2" opacity=".65">
      <path d="M${esc(cx - 50)} ${esc(cy + 6)} a50 34 0 0 1 100 0"/>
      <path d="M${esc(cx - 26)} ${esc(cy + 4)} q4 -22 0 -26 M${esc(cx)} ${esc(cy + 5)} l0 -30 M${esc(cx + 26)} ${esc(cy + 4)} q-4 -22 0 -26"/>
      <path d="M${esc(cx - 40)} ${esc(cy - 10)} q40 -14 80 0"/>
    </g>
  `, s.name);
}

const RENDERERS = { mammal, bird, bat, snake, turtle };

function renderAnimal(a) {
  const fn = RENDERERS[a.art.kind] || mammal;
  return fn({ ...a.art, name: a.name });
}
