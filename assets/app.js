/* app.js — grid, search, jurisdiction resolution, and the detail sheet.
   Vanilla, no build step. */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const state = { q: '', size: 'all', openId: null, location: 'street', country: 'us', region: null };

/* Single-file builds set this to false: there is no images/ directory to
   fall back from, so the photo overlay is omitted rather than 404ing. */
const PHOTOS = window.DAR_PHOTOS !== false;
const photoTag = (id, lazy) => PHOTOS
  ? `<img class="photo" src="images/${id}.jpg" alt=""${lazy ? ' loading="lazy"' : ''}
       onerror="this.remove()" onload="this.classList.add('is-on')">`
  : '';

/* ---------- persistence ---------- */

const NUM_KEY = 'dar.numbers.v1';
const JUR_KEY = 'dar.jurisdiction.v1';

let numbers = {};
try { numbers = JSON.parse(localStorage.getItem(NUM_KEY) || '{}'); } catch (_) { numbers = {}; }
try {
  const saved = JSON.parse(localStorage.getItem(JUR_KEY) || 'null');
  if (saved && JURISDICTIONS[saved.country]) {
    state.country = saved.country;
    if (getRegion(saved.country, saved.region)) state.region = saved.region;
  }
} catch (_) { /* ignore */ }

const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* private mode */ }
};

/* ---------- contact resolution ----------
   A number the user saved always wins; then the region; then the country. */

const OVERRIDE_KEY = { city: 'city', pet: 'animal', health: 'health', bat: 'health', highway: 'highway', wildlife: 'wildlife' };

function resolveLine(line) {
  const override = numbers[OVERRIDE_KEY[line]];
  if (override) return { name: 'Your saved number', phone: override, saved: true };
  return contactFor(state.country, state.region, line);
}

const telHref = (n) => 'tel:' + String(n).replace(/[^0-9+*#]/g, '');
const country = () => JURISDICTIONS[state.country];

function emergencyNumber() { return country().emergency.phone; }

/* ---------- jurisdiction UI ---------- */

function renderJurisdiction() {
  const c = country();

  $('#country').innerHTML = Object.entries(JURISDICTIONS)
    .map(([id, j]) => `<option value="${id}" ${id === state.country ? 'selected' : ''}>${j.name}</option>`).join('');

  $('#region-label').textContent = c.regionLabel;
  $('#region').innerHTML = `<option value="">Select your ${c.regionLabel.toLowerCase()}…</option>` +
    c.regions.map((r) => `<option value="${r.code}" ${r.code === state.region ? 'selected' : ''}>${r.name}</option>`).join('');

  const region = getRegion(state.country, state.region);
  const emergency = emergencyNumber();
  $('#juris-note').innerHTML = region
    ? `Emergency number here is <a href="${telHref(emergency)}">${emergency}</a>. Numbers for ${region.name} were compiled from official sources in ${COMPILED} — <a href="${region.url}" target="_blank" rel="noopener">check the agency page</a> if one looks wrong.`
    : `Emergency number here is <a href="${telHref(emergency)}">${emergency}</a>. Pick your ${c.regionLabel.toLowerCase()} to get the agency numbers for where you are.`;

  $('#emergency-link').textContent = emergency;
  $('#emergency-link').href = telHref(emergency);

  const nat = c.national || [];
  $('#numbers-hint').innerHTML = nat.length
    ? 'National lines for ' + c.name + ': ' + nat.map((n) =>
        n.phone ? `<strong>${n.name}</strong> <a href="${telHref(n.phone)}">${n.phone}</a>`
                : `<strong>${n.name}</strong> <a href="${n.web}" target="_blank" rel="noopener">online</a>`).join(' · ')
    : '';
}

/* ---------- cards ---------- */

function cardHTML(a) {
  return `<button class="card" data-id="${a.id}" aria-label="${a.name} — open reporting steps">
    <span class="art">
      ${renderAnimal(a)}
      ${photoTag(a.id, true)}
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

/* ---------- guidance blocks ---------- */

const blockHTML = (b) => `<section class="block">
    <h3>${b.title}</h3>
    <ul>${b.points.map((p) => `<li>${p}</li>`).join('')}</ul>
  </section>`;

function renderGuidance() {
  $('#guidance-grid').innerHTML = [HANDLING, DO_NOT_TOUCH, BAT_PROTOCOL, DISPOSAL].map(blockHTML).join('');
}

/* ---------- detail sheet ---------- */

function contactHTML(contact, primary) {
  if (!contact) return '';
  const label = contact.phone ? `Call ${contact.phone}` : 'Open the official page';
  const href = contact.phone ? telHref(contact.phone) : (contact.web || '#');
  const attrs = contact.phone ? '' : ' target="_blank" rel="noopener"';
  if (!primary) {
    return `<li><strong>${contact.name}</strong>
      ${contact.phone ? `<a href="${href}">${contact.phone}</a>` : `<a href="${href}"${attrs}>official page</a>`}
      ${contact.note ? `<em>${contact.note}</em>` : ''}</li>`;
  }
  return `<h4>${contact.name}</h4>
    <a class="dial" href="${href}"${attrs}>${label}</a>
    ${contact.note ? `<p class="dial-note">${contact.note}</p>` : ''}
    ${contact.saved ? '<p class="dial-note">Using the number you saved on this page.</p>' : ''}`;
}

function sheetHTML(a) {
  const route = routeFor(a, state.location);
  const primary = resolveLine(route.line);
  const secondary = (route.also || []).map(resolveLine).filter(Boolean);
  const region = getRegion(state.country, state.region);
  const cautions = cautionsFor(a, state.country);
  const emergency = emergencyNumber();

  return `
  <button class="close" data-close aria-label="Close">&times;</button>

  <div class="sheet-top">
    <span class="art art-lg">
      ${renderAnimal(a)}
      ${photoTag(a.id, false)}
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
        ${primary ? contactHTML(primary, true) : `<h4>${route.agency}</h4>
          <p class="dial-note">No number on file for this jurisdiction — pick your region above, or save your own below.</p>`}
        <p class="why">${route.why}</p>
        ${secondary.length ? `<ul class="also"><li class="also-head">Also worth calling</li>${secondary.map((c) => contactHTML(c, false)).join('')}</ul>` : ''}
        ${region ? `<p class="dial-note"><a href="${region.url}" target="_blank" rel="noopener">Official page for ${region.name}</a></p>` : ''}
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
      <a class="dial dial-emergency" href="${telHref(emergency)}">Call ${emergency}</a>
    </section>
  </div>

  <div class="cautions">
    ${[HANDLING, ...cautions].map(blockHTML).join('')}
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

function refreshSheet() { if (state.openId) openSheet(state.openId); }

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

$('#country').addEventListener('change', (e) => {
  state.country = e.target.value;
  state.region = null;
  save(JUR_KEY, { country: state.country, region: state.region });
  renderJurisdiction();
  renderGuidance();
  refreshSheet();
});

$('#region').addEventListener('change', (e) => {
  state.region = e.target.value || null;
  save(JUR_KEY, { country: state.country, region: state.region });
  renderJurisdiction();
  refreshSheet();
});

$$('[data-num]').forEach((input) => {
  const key = input.dataset.num;
  if (numbers[key]) input.value = numbers[key];
  input.addEventListener('input', () => {
    const v = input.value.trim();
    if (v) numbers[key] = v; else delete numbers[key];
    save(NUM_KEY, numbers);
    refreshSheet();
  });
});

renderJurisdiction();
renderGuidance();
renderGrid();
