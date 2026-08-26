/* app.js — grid, search, and the detail sheet. Vanilla, no build step. */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const state = { q: '', size: 'all', openId: null, location: 'street' };

/* ---------- saved phone numbers ---------- */

const NUM_KEY = 'dar.numbers.v1';
let numbers = {};
try { numbers = JSON.parse(localStorage.getItem(NUM_KEY) || '{}'); } catch (_) { numbers = {}; }

function saveNumbers() {
  try { localStorage.setItem(NUM_KEY, JSON.stringify(numbers)); } catch (_) { /* private mode */ }
}

const LINE_TO_FIELD = { city: 'city', health: 'health', highway: 'highway', animal: 'animal' };

function phoneFor(line) {
  const direct = numbers[LINE_TO_FIELD[line]];
  if (direct) return { number: direct, saved: true };
  if (line === 'health' && numbers.city) return { number: numbers.city, saved: true };
  if (line === 'highway' && numbers.city) return { number: numbers.city, saved: true };
  if (numbers.city) return { number: numbers.city, saved: true };
  return { number: '311', saved: false };
}

const telHref = (n) => 'tel:' + String(n).replace(/[^0-9+*#]/g, '');

/* ---------- cards ---------- */

function cardHTML(a) {
  return `<button class="card" data-id="${a.id}" aria-label="${a.name} — open reporting steps">
    <span class="art">
      ${renderAnimal(a)}
      <img class="photo" src="images/${a.id}.jpg" alt="" loading="lazy"
           onerror="this.remove()" onload="this.classList.add('is-on')">
    </span>
    <span class="card-body">
      <span class="card-head">
        <strong>${a.name}</strong>
        <span class="size size-${a.size}">${a.size}</span>
      </span>
      <span class="aka">${a.aka}</span>
      <span class="mark">${a.marks[0]}</span>
    </span>
  </button>`;
}

function matches(a) {
  if (state.size !== 'all' && a.size !== state.size) return false;
  const q = state.q.trim().toLowerCase();
  if (!q) return true;
  const hay = [a.name, a.aka, a.size, a.length, a.confuse, ...a.marks].join(' ').toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w));
}

function renderGrid() {
  const list = ANIMALS.filter(matches);
  $('#grid').innerHTML = list.map(cardHTML).join('');
  $('#empty').hidden = list.length > 0;
  $('#count').textContent = list.length === ANIMALS.length
    ? `${ANIMALS.length} animals`
    : `${list.length} of ${ANIMALS.length} animals`;
}

/* ---------- detail sheet ---------- */

function sheetHTML(a) {
  const route = routeFor(a, state.location);
  const { number, saved } = phoneFor(route.line);

  return `
  <button class="close" data-close aria-label="Close">&times;</button>

  <div class="sheet-top">
    <span class="art art-lg">
      ${renderAnimal(a)}
      <img class="photo" src="images/${a.id}.jpg" alt="" onerror="this.remove()" onload="this.classList.add('is-on')">
    </span>
    <div>
      <h2 id="sheet-title">${a.name}</h2>
      <p class="aka">${a.aka} · ${a.length}</p>
      <p class="risk risk-${a.risk.level}">
        <strong>${a.risk.level === 'high' ? 'Handle with care' : a.risk.level === 'medium' ? 'Take precautions' : 'Lower risk'}</strong>
        ${a.risk.text}
      </p>
    </div>
  </div>

  <div class="cols">
    <section>
      <h3>Check these marks</h3>
      <ul class="marks">${a.marks.map((m) => `<li>${m}</li>`).join('')}</ul>
      <p class="confuse"><strong>Often confused with:</strong> ${a.confuse}</p>
    </section>

    <section>
      <h3>Where did you find it?</h3>
      <div class="locs" role="group" aria-label="Location">
        ${LOCATIONS.map((l) => `
          <button class="loc ${l.id === state.location ? 'is-on' : ''}" data-loc="${l.id}">
            <strong>${l.label}</strong><em>${l.hint}</em>
          </button>`).join('')}
      </div>

      <div class="plan urgency-${route.urgency}">
        <p class="tag">${route.urgency === 'urgent' ? 'Call now' : route.urgency === 'prompt' ? 'Call today' : 'Routine report'}</p>
        <h4>${route.agency}</h4>
        <p class="why">${route.why}</p>
        <a class="dial" href="${telHref(number)}">Call ${number}</a>
        <p class="dial-note">${saved
          ? 'Using the number you saved on this page.'
          : 'No local number saved yet — 311 reaches the city line in most of North America. Save yours below to replace this.'}</p>
      </div>

    </section>
  </div>

  <div class="bottom">
    <section>
      <h3>Have this ready when you call</h3>
      <ol class="say">${route.say.map((s) => `<li>${s}</li>`).join('')}</ol>
    </section>
    <section class="emergency">
      <h3>${EMERGENCY_RULE.title}</h3>
      <ul>${EMERGENCY_RULE.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      <a class="dial dial-911" href="tel:911">Call 911</a>
    </section>
  </div>`;
}

function openSheet(id) {
  const a = ANIMALS.find((x) => x.id === id);
  if (!a) return;
  state.openId = id;
  $('#sheet-inner').innerHTML = sheetHTML(a);
  const dlg = $('#sheet');
  if (!dlg.open) dlg.showModal();
  dlg.scrollTop = 0;
}

function refreshSheet() {
  if (state.openId) openSheet(state.openId);
}

/* ---------- events ---------- */

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) return openSheet(card.dataset.id);

  const loc = e.target.closest('[data-loc]');
  if (loc) { state.location = loc.dataset.loc; return refreshSheet(); }

  if (e.target.closest('[data-close]')) { $('#sheet').close(); return; }

  const chip = e.target.closest('.chip');
  if (chip) {
    state.size = chip.dataset.size;
    $$('.chip').forEach((c) => c.classList.toggle('is-on', c === chip));
    return renderGrid();
  }

  if (e.target.closest('[data-clear]')) {
    state.q = ''; $('#q').value = '';
    state.size = 'all';
    $$('.chip').forEach((c) => c.classList.toggle('is-on', c.dataset.size === 'all'));
    return renderGrid();
  }
});

$('#sheet').addEventListener('click', (e) => {
  if (e.target.id === 'sheet') $('#sheet').close();   // backdrop
});
$('#sheet').addEventListener('close', () => { state.openId = null; });

$('#q').addEventListener('input', (e) => { state.q = e.target.value; renderGrid(); });

$$('[data-num]').forEach((input) => {
  const key = input.dataset.num;
  if (numbers[key]) input.value = numbers[key];
  input.addEventListener('input', () => {
    const v = input.value.trim();
    if (v) numbers[key] = v; else delete numbers[key];
    saveNumbers();
    refreshSheet();
  });
});

renderGrid();
