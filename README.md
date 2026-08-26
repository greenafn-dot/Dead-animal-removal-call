# Dead-animal-removal-call

A single-page guide for members of the public who have found a dead animal.
Identify it from illustrated field marks, say where it is lying, and the page
names the agency that handles it and what they will ask you on the call.

Open `index.html` in a browser. There is no build step, no dependencies, and
no network calls — it works offline and from a `file://` URL.

## Why identification comes first

Who collects a carcass is not one answer. It depends on two things:

- **What the animal is.** A bat is a rabies-testing case for public health. A
  cat is a microchip scan and a phone call to an owner. A crow is a West Nile
  surveillance data point. Rats are vector control.
- **Where it is lying.** Cities do not maintain highways, and most authorities
  do not collect from private land.

`assets/routing.js` encodes that as a small rule set. Animal-driven rules run
first, because a rabies exposure is urgent regardless of which side of a kerb
it happened on; location rules handle everything else.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, safety banner, saved-numbers form, FAQ |
| `assets/animals.js` | The 18 species: field marks, look-alikes, risk notes |
| `assets/routing.js` | Which agency to call, and what to have ready |
| `assets/art.js` | Parametric SVG illustrations |
| `assets/app.js` | Grid, search, filters, detail sheet |
| `assets/style.css` | Styling, light and dark |
| `images/` | Drop-in photographs (see below) |

## Illustrations, and swapping in photographs

Every animal is drawn as inline SVG. Mammals come from one shared anatomy
model in `art.js` — species differ by real proportions (leg length, snout,
ear shape, tail type) rather than by separate clip art — so adding a species
is a dozen numbers, not a new drawing. Birds, bats, snakes and turtles have
their own small renderers.

They are deliberately schematic: the goal is to show the marks named in the
card text (the ringed tail, the bare tail, the white stripe) at thumbnail
size, which a photograph of a carcass on a road does not reliably do.

To use real photographs instead, put a file in `images/` named after the
animal's `id` — `raccoon.jpg`, `crow.jpg` — and it takes over automatically.
Missing files fall back to the illustration, so a partial set is fine. See
`images/README.md`.

## Phone numbers

The page ships with `311` as the default, which reaches the city line across
most of North America. Anything more specific varies by jurisdiction, so the
page does not guess: enter your own city, animal control, public health and
state DOT numbers once in the *Save your local numbers* panel and they are
used throughout. They are kept in `localStorage`, in that browser only.

Outside North America the identification and safety guidance still applies,
but the 311 convention does not — save your local numbers.

## Adding an animal

Append an entry to `ANIMALS` in `assets/animals.js`:

```js
{
  id: 'muskrat', name: 'Muskrat', aka: 'Ondatra zibethicus', size: 'small',
  length: '16–24 in nose to tail · 2–4 lb',
  marks: ['Thin, flattened, nearly hairless tail', /* … */],
  confuse: 'Beavers — a beaver’s tail is broad and paddle-shaped.',
  risk: { level: 'medium', text: '…' },
  report: 'wildlife',                 // wildlife | city | health | pet | bat
  art: { kind: 'mammal', bodyW: 52, /* … */ }
}
```

`report` selects the routing rule. `marks[0]` is what shows on the card, so
lead with the most diagnostic one.

## Scope

This is public guidance, not veterinary or public health advice, and local
rules always take precedence. It does not dispatch anyone or file a report —
it tells a person which number to dial and what to say.
