/* animals.js — the identification data.
   `marks` are the field marks you can check from a safe distance, ordered
   most-diagnostic first. `confuse` names the look-alike people actually
   mix it up with. `report` picks the routing rule in app.js. */

const ANIMALS = [
  {
    id: 'raccoon', name: 'Raccoon', aka: 'Procyon lotor', size: 'medium',
    length: '24–38 in nose to tail · 10–20 lb',
    marks: [
      'Black bandit mask across the eyes, edged in white',
      'Bushy tail with 4–7 dark rings',
      'Grizzled salt-and-pepper grey fur, hunched back',
      'Front paws look like small bare hands'
    ],
    confuse: 'Opossums — but an opossum has a pale pointed face and a bare rat-like tail with no rings.',
    risk: { level: 'high', text: 'A rabies vector species. Never touch it, even with gloves, and keep pets well clear.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 68, bodyH: 34, legLen: 15, legW: 8, headW: 26, headH: 22, neckDx: 22, neckDy: 8, snout: 8, snoutW: 9, ear: 'round', mark: 'mask', coat: '#8d8e8a', dark: '#4a4c50', belly: '#a9a9a4', tail: { type: 'ringed', len: 42, w: 12 } }
  },
  {
    id: 'opossum', name: 'Virginia Opossum', aka: 'Possum', size: 'medium',
    length: '24–34 in nose to tail · 4–14 lb',
    marks: [
      'Long bare pink-grey tail, scaly, no fur and no rings',
      'White or pale grey pointed face with a pink nose',
      'Thin black naked ears',
      'Shaggy off-white body fur, low to the ground'
    ],
    confuse: 'Large rats and raccoons. The white face plus the bare tail settles it.',
    risk: { level: 'low', text: 'Rarely carries rabies (low body temperature). Still do not handle it — check the pouch is not moving before you assume it is a single animal.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 64, bodyH: 30, legLen: 13, legW: 7, headW: 24, headH: 19, neckDx: 21, neckDy: 6, snout: 15, snoutW: 6, snoutColor: '#f2efe9', ear: 'round', earColor: '#4a4550', coat: '#d6d2c8', dark: '#2e2a33', belly: '#efece4', tail: { type: 'thin', len: 46, w: 6, color: '#e3bfc2' } }
  },
  {
    id: 'squirrel', name: 'Grey Squirrel', aka: 'Tree squirrel', size: 'small',
    length: '16–20 in nose to tail · under 1.5 lb',
    marks: [
      'Tail as long as the body and very bushy, often curled over the back',
      'Small, no larger than a forearm',
      'Grey or reddish-brown with a pale belly',
      'Small rounded ears, large dark eye'
    ],
    confuse: 'Rats — but a rat has a bare tail and a blunter, lower body.',
    risk: { level: 'low', text: 'Low disease risk to people, but do not handle bare-handed.' },
    report: 'city',
    art: { kind: 'mammal', bodyW: 40, bodyH: 24, legLen: 10, legW: 5.5, headW: 19, headH: 17, neckDx: 15, neckDy: 8, snout: 6, snoutW: 6, ear: 'round', coat: '#93867a', dark: '#5c5248', belly: '#e6ddd0', cx: 96, tail: { type: 'bushyUp', len: 48, w: 20 } }
  },
  {
    id: 'skunk', name: 'Striped Skunk', aka: 'Mephitis mephitis', size: 'medium',
    length: '20–30 in nose to tail · 6–10 lb',
    marks: [
      'Glossy black with a white stripe splitting down the back',
      'Thin white blaze up the middle of the face',
      'Big white plume of a tail',
      'Smell is usually obvious before you see it'
    ],
    confuse: 'Nothing else, really — the stripe is unmistakable.',
    risk: { level: 'high', text: 'A rabies vector species. Do not approach; the scent glands can still release after death.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 58, bodyH: 28, legLen: 11, legW: 7, headW: 22, headH: 18, neckDx: 19, neckDy: 6, snout: 10, snoutW: 7, ear: 'round', mark: 'stripe', coat: '#26262b', dark: '#0f0f12', belly: '#26262b', tail: { type: 'plume', len: 40, w: 15, color: '#f2efe9' } }
  },
  {
    id: 'deer', name: 'White-tailed Deer', aka: 'Whitetail', size: 'large',
    length: '4–7 ft long · 100–300 lb',
    marks: [
      'Far too large to lift — the size alone identifies it',
      'Long thin legs with hard black hooves',
      'Tan or grey-brown coat, white underside to the tail',
      'Males may have antlers (autumn and winter)'
    ],
    confuse: 'Nothing on a road. If it has hooves and is dog-sized or larger, treat it as a deer.',
    risk: { level: 'medium', text: 'The carcass itself is a serious traffic hazard. Do not try to drag it yourself on a live roadway.' },
    report: 'highway',
    art: { kind: 'mammal', bodyW: 78, bodyH: 38, legLen: 28, legW: 6.5, headW: 23, headH: 16, neckDx: 28, neckDy: 21, neckW: 15, snout: 11, snoutW: 8, ear: 'huge', antlers: true, coat: '#b08a5e', dark: '#7a5a3c', belly: '#efe7d8', tail: { type: 'stub', w: 8, color: '#f4efe4' } }
  },
  {
    id: 'coyote', name: 'Coyote', aka: 'Canis latrans', size: 'large',
    length: '3.5–4.5 ft nose to tail · 20–45 lb',
    marks: [
      'Looks like a lean, leggy German shepherd but narrower in the chest',
      'Bushy tail carried low, dark tip',
      'Grizzled grey-brown coat, rusty legs and ears',
      'Tall pointed ears and a narrow pointed muzzle'
    ],
    confuse: 'A stray dog. Coyotes are slimmer, longer-legged, and never wear a collar — check for one.',
    risk: { level: 'high', text: 'A rabies vector species. Report rather than remove.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 74, bodyH: 32, legLen: 27, legW: 7, headW: 25, headH: 19, neckDx: 25, neckDy: 17, snout: 14, snoutW: 7, ear: 'pointed', mark: 'palemuzzle', coat: '#a08a6d', dark: '#66573f', belly: '#ded2bd', tail: { type: 'brush', len: 40, w: 12, tip: '#4a4034' } }
  },
  {
    id: 'fox', name: 'Red Fox', aka: 'Vulpes vulpes', size: 'medium',
    length: '3–3.5 ft nose to tail · 8–15 lb',
    marks: [
      'Rusty orange coat with a white throat and belly',
      'Big bushy tail with a bright white tip',
      'Black stockings — the lower legs are clearly darker',
      'Small, cat-sized body on a dog-shaped frame'
    ],
    confuse: 'Coyotes. A fox is roughly half the weight and the white tail tip is decisive.',
    risk: { level: 'high', text: 'A rabies vector species. Do not touch.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 62, bodyH: 26, legLen: 20, legW: 6, headW: 22, headH: 17, neckDx: 21, neckDy: 12, snout: 13, snoutW: 6, ear: 'pointed', mark: 'palemuzzle', coat: '#c96f33', dark: '#7d3f16', belly: '#f0e7d9', legColor: '#3a2e28', tail: { type: 'brush', len: 42, w: 14, tip: '#f6f3ec' } }
  },
  {
    id: 'rabbit', name: 'Cottontail Rabbit', aka: 'Eastern cottontail', size: 'small',
    length: '14–19 in · 2–4 lb',
    marks: [
      'Long upright ears, longer than the head',
      'Round puff of a white tail',
      'Brown-grey fur, no visible tail length',
      'Hind legs much larger than the front'
    ],
    confuse: 'Hares (bigger, longer ears with black tips) — the routing is the same either way.',
    risk: { level: 'medium', text: 'Can carry tularemia. Do not handle bare-handed.' },
    report: 'city',
    art: { kind: 'mammal', bodyW: 46, bodyH: 28, legLen: 11, legW: 6.5, headW: 20, headH: 17, neckDx: 16, neckDy: 9, snout: 5, snoutW: 7, ear: 'tall', coat: '#a8977f', dark: '#6d5f4c', belly: '#eee7da', cx: 100, tail: { type: 'stub', w: 8, color: '#f6f3ec' } }
  },
  {
    id: 'groundhog', name: 'Groundhog', aka: 'Woodchuck, marmot', size: 'medium',
    length: '20–27 in · 6–13 lb',
    marks: [
      'Chunky, barrel-shaped body sitting very low to the ground',
      'Short bushy tail, about a quarter of the body length',
      'Coarse grizzled brown fur',
      'Small ears set far back, dark feet'
    ],
    confuse: 'Beavers and muskrats near water — those have flat or thin scaly tails.',
    risk: { level: 'low', text: 'Low risk, but burrow rodents can carry fleas. Do not handle.' },
    report: 'city',
    art: { kind: 'mammal', bodyW: 62, bodyH: 34, legLen: 8, legW: 8, headW: 22, headH: 19, neckDx: 18, neckDy: 4, snout: 7, snoutW: 8, ear: 'round', coat: '#8a7350', dark: '#54452e', belly: '#a89272', tail: { type: 'taper', len: 22, w: 10 } }
  },
  {
    id: 'armadillo', name: 'Nine-banded Armadillo', aka: 'Armadillo', size: 'medium',
    length: '24–32 in nose to tail · 8–17 lb',
    marks: [
      'Hard bony shell in jointed bands across the back',
      'Long stiff tapering tail, also armoured',
      'Long pointed snout and tall narrow ears',
      'Almost hairless, greyish-brown'
    ],
    confuse: 'Nothing — the armour plating is unique.',
    risk: { level: 'medium', text: 'Can carry the bacterium that causes leprosy. Never handle one bare-handed.' },
    report: 'wildlife',
    art: { kind: 'mammal', bodyW: 62, bodyH: 30, legLen: 9, legW: 7, headW: 20, headH: 15, neckDx: 18, neckDy: 4, snout: 15, snoutW: 5, ear: 'huge', mark: 'bands', coat: '#9d9384', dark: '#5f574b', belly: '#b5ab9a', tail: { type: 'taper', len: 34, w: 7 } }
  },
  {
    id: 'cat', name: 'Domestic Cat', aka: 'Pet or stray cat', size: 'small',
    length: '18–24 in body · 8–12 lb',
    marks: [
      'Check for a collar, tag, or a shaved patch from a vet',
      'Even, smooth coat — often tabby striped, solid, or patched',
      'Slim tail of even thickness, furred to the tip',
      'Small triangular ears set high on a round head'
    ],
    confuse: 'Young foxes. A fox has a much bushier tail and a longer muzzle.',
    risk: { level: 'medium', text: 'Likely somebody’s pet. Do not move it far — animal control scans for a microchip and notifies the owner.' },
    report: 'pet',
    art: { kind: 'mammal', bodyW: 56, bodyH: 28, legLen: 11, legW: 6.5, headW: 22, headH: 20, neckDx: 18, neckDy: 9, neckW: 15, snout: 4, snoutW: 8, ear: 'pointed', mark: 'tabby', coat: '#9a8b7b', dark: '#574c42', belly: '#e8e0d3', cx: 100, tail: { type: 'brush', len: 38, w: 7 } }
  },
  {
    id: 'dog', name: 'Domestic Dog', aka: 'Pet or stray dog', size: 'large',
    length: 'Varies enormously by breed',
    marks: [
      'Check for a collar, tag, or harness first — this is the key detail to report',
      'Blunt or square muzzle, broad chest',
      'Claws are blunt and non-retractable',
      'Coat and size vary; breed is worth noting for the owner'
    ],
    confuse: 'Coyotes. Coyotes have a narrow chest, rusty ears, and no collar.',
    risk: { level: 'medium', text: 'Almost certainly a pet. Report it promptly — a microchip scan can reunite it with its family.' },
    report: 'pet',
    art: { kind: 'mammal', bodyW: 68, bodyH: 34, legLen: 21, legW: 8.5, headW: 25, headH: 21, neckDx: 24, neckDy: 15, snout: 10, snoutW: 10, ear: 'floppy', coat: '#c9a271', dark: '#8a6238', belly: '#eddfc6', tail: { type: 'brush', len: 34, w: 10 } }
  },
  {
    id: 'rat', name: 'Norway Rat', aka: 'Brown rat, sewer rat', size: 'small',
    length: '9–11 in body plus a 7–9 in tail',
    marks: [
      'Bare scaly tail, shorter than the body',
      'Small ears that would not reach the eye if folded forward',
      'Blunt nose, coarse brown-grey fur',
      'Heavy-bodied compared with a mouse'
    ],
    confuse: 'Young opossums and squirrels. A squirrel’s tail is bushy; an opossum has a white face.',
    risk: { level: 'high', text: 'Carries leptospirosis and other pathogens. A cluster of dead rats can signal poisoning or disease — mention the number you see.' },
    report: 'health',
    art: { kind: 'mammal', bodyW: 46, bodyH: 22, legLen: 7, legW: 5, headW: 18, headH: 15, neckDx: 15, neckDy: 3, snout: 10, snoutW: 5, ear: 'round', coat: '#8c7c6a', dark: '#544a3f', belly: '#c8bcaa', tail: { type: 'thin', len: 44, w: 4.5, color: '#c9a7a0' } }
  },
  {
    id: 'pigeon', name: 'Pigeon', aka: 'Rock dove', size: 'small',
    length: '12–14 in · under 1 lb',
    marks: [
      'Grey body with two dark bars across each wing',
      'Green-purple sheen on the neck',
      'Small head, short slim beak with a white fleshy patch at the base',
      'Pink-red legs and feet'
    ],
    confuse: 'Doves and gulls. Wing bars plus the neck sheen are the giveaway.',
    risk: { level: 'medium', text: 'Droppings and feathers can carry fungal spores. Several dead birds in one spot is worth reporting as a possible disease event.' },
    report: 'health',
    art: { kind: 'bird', bodyW: 58, bodyH: 38, headR: 11, beak: 8, coat: '#8d949e', dark: '#4e555f', leg: '#c8737f', iridescent: true, beakColor: '#454a52' }
  },
  {
    id: 'crow', name: 'Crow', aka: 'American crow', size: 'small',
    length: '16–21 in · about 1 lb',
    marks: [
      'Entirely glossy black — beak, legs and eyes included',
      'Heavy, straight, thick beak',
      'Square-ended tail',
      'Noticeably larger than a pigeon'
    ],
    confuse: 'Ravens (bigger, wedge-shaped tail, shaggy throat) and grackles (smaller, long keel tail).',
    risk: { level: 'high', text: 'Dead crows are a tracked warning sign for West Nile virus. Public health departments often want these reported specifically.' },
    report: 'health',
    art: { kind: 'bird', bodyW: 64, bodyH: 40, headR: 12, beak: 13, beakDrop: 4, coat: '#2c2e34', dark: '#15161a', leg: '#1c1d21', beakColor: '#101114' }
  },
  {
    id: 'bat', name: 'Bat', aka: 'Various species', size: 'small',
    length: '3–7 in body · 8–16 in wingspan',
    marks: [
      'Skin wings stretched between long finger bones',
      'Mouse-like furry body, tiny by comparison with the wings',
      'Large ears relative to the head',
      'Often found on the ground or a wall in daylight, which is itself abnormal'
    ],
    confuse: 'Birds. Bats have no feathers — the wing is bare membrane.',
    risk: { level: 'high', text: 'The highest-priority case here. Bats are the leading rabies source in human cases. If any person or pet may have touched it, or it was found in a room where someone was asleep, call public health immediately and ask them to keep the bat for testing — do not discard it.' },
    report: 'bat',
    art: { kind: 'bat', coat: '#7a6152', dark: '#3d3128' }
  },
  {
    id: 'snake', name: 'Snake', aka: 'Various species', size: 'small',
    length: '1–6 ft depending on species',
    marks: [
      'No legs, dry scaled skin — not slimy',
      'Note the pattern: bands, diamonds, blotches or plain',
      'A triangular head and vertical pupils suggest a venomous species',
      'A rattle at the tail tip is decisive'
    ],
    confuse: 'Legless lizards and large earthworms. A snake has no eyelids and no ear openings.',
    risk: { level: 'high', text: 'A freshly dead venomous snake can still bite by reflex for up to an hour — the bite reflex outlives the animal. Keep well back and never handle the head.' },
    report: 'wildlife',
    art: { kind: 'snake', coat: '#7b8c5a', dark: '#4a5636' }
  },
  {
    id: 'turtle', name: 'Turtle', aka: 'Terrapin, tortoise', size: 'small',
    length: '5–14 in shell',
    marks: [
      'Hard domed shell with visible plate segments (scutes)',
      'Short scaly legs, clawed feet',
      'Small head on a retractable neck',
      'Shell damage is the usual sign of a vehicle strike'
    ],
    confuse: 'Nothing. Note whether the shell is domed (land) or flat (water) when you call.',
    risk: { level: 'medium', text: 'Salmonella risk from the shell. Many turtle species are protected — the call matters even for a dead one.' },
    report: 'wildlife',
    art: { kind: 'turtle', coat: '#7d6a45', dark: '#4b3f2b' }
  }
];
