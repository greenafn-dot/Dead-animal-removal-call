/* routing.js — decides which agency handles a given carcass.
   The answer depends on two things: what the animal is (disease and
   protected-species rules) and whose land it is lying on (jurisdiction).
   Animal rules win over location rules, because a rabies exposure is
   urgent regardless of which side of a kerb it happened on.

   `line` names the primary contact to resolve against the selected
   jurisdiction; `also` names secondary contacts worth showing. */

const LOCATIONS = [
  { id: 'street', label: 'City street or sidewalk', hint: 'A public road inside a town or city' },
  { id: 'highway', label: 'Highway or motorway', hint: 'A state, provincial or trunk route, or its shoulder' },
  { id: 'yard', label: 'Private property', hint: 'Your yard, driveway, or a building you own' },
  { id: 'park', label: 'Park, trail or waterway', hint: 'Public green space or open water' }
];

function routeFor(animal, locationId) {
  /* 1. Animal-driven rules that override jurisdiction. */
  if (animal.report === 'bat') {
    return {
      agency: 'Public health',
      urgency: 'urgent',
      why: 'Bats are the leading source of rabies in human cases. Health departments test the animal, so the carcass must be preserved rather than binned.',
      line: 'bat', also: ['wildlife'],
      say: [
        'That you have found a dead bat and exactly where it is',
        'Whether any person or pet may have touched it',
        'Whether it was in a room where somebody was sleeping, or with a young child',
        'That you have not disposed of it and can keep it for testing'
      ]
    };
  }

  if (animal.report === 'health') {
    return {
      agency: 'Public health or vector control',
      urgency: locationId === 'yard' ? 'normal' : 'prompt',
      why: 'Rodents and birds are tracked for disease. Several dead animals in one place is a surveillance signal, not just a cleanup job.',
      line: 'health', also: ['wildlife'],
      say: [
        'How many animals you can see — the count is the important part',
        'The species, if you are confident',
        'Whether there is standing water or an obvious food source nearby',
        'Whether children or pets have access to the spot'
      ]
    };
  }

  if (animal.report === 'pet') {
    return {
      agency: 'Animal control or the municipal shelter',
      urgency: 'prompt',
      why: 'They scan for a microchip and contact the owner. A quick call is often the only way a family ever finds out what happened.',
      line: 'pet', also: [],
      say: [
        'The exact street location',
        'Breed, colour, and size',
        'Whether it is wearing a collar, tag or harness',
        'Ask them to scan for a microchip'
      ]
    };
  }

  /* 2. Location-driven rules for wildlife and general carcasses. */
  if (locationId === 'highway') {
    return {
      agency: 'The roads authority for that highway',
      urgency: animal.size === 'large' ? 'urgent' : 'normal',
      why: 'Highways are not maintained by the city. The state, provincial or national roads authority runs the crews that can work live traffic lanes safely.',
      line: 'highway', also: animal.size === 'large' ? ['wildlife'] : [],
      say: [
        'The route number and nearest mile marker, exit or junction',
        'Which direction of travel, and which lane or shoulder',
        'The approximate size of the animal',
        'Whether it is currently blocking a lane of traffic'
      ]
    };
  }

  if (locationId === 'yard') {
    return {
      agency: 'Your local authority — but expect to be told it is yours',
      urgency: 'normal',
      why: 'Most jurisdictions only collect from public land. Many still offer a paid pickup, and the rules change if it is a rabies vector species.',
      line: 'city', also: animal.risk.level === 'high' ? ['wildlife'] : [],
      say: [
        'The species, and that it is on private property',
        'Ask whether they collect from private land, and whether there is a fee',
        animal.risk.level === 'high'
          ? 'That it is a rabies vector species — ask whether that changes the answer'
          : 'Whether they can advise on safe disposal',
        'Ask what container or bagging they require if you must do it yourself'
      ]
    };
  }

  if (locationId === 'park') {
    return {
      agency: 'The parks authority or the wildlife agency',
      urgency: 'normal',
      why: 'Wildlife on public green space is usually the land manager’s, escalated to the wildlife agency when the species is protected or the death looks like disease.',
      line: 'wildlife', also: ['city'],
      say: [
        'The species and rough size',
        'The nearest path, gate or landmark',
        'Whether it looks diseased, or whether there is more than one',
        'Whether it is near water or a play area'
      ]
    };
  }

  if (animal.size === 'large' || animal.report === 'wildlife') {
    return {
      agency: animal.size === 'large'
        ? 'Your local authority, with the wildlife agency as backup'
        : 'Animal control or public works',
      urgency: animal.size === 'large' ? 'prompt' : 'normal',
      why: animal.size === 'large'
        ? 'Large carcasses need equipment, and often a wildlife officer where the animal is a protected or game species.'
        : 'Wildlife on public land is normally a municipal pickup, escalated to the wildlife agency if the species is protected.',
      line: 'city', also: ['wildlife'],
      say: [
        'The species and rough size',
        'The nearest street address or landmark',
        'Whether it is a traffic or pedestrian hazard where it lies',
        'How long it looks to have been there'
      ]
    };
  }

  return {
    agency: 'Public works or sanitation',
    urgency: 'normal',
    why: 'Small animals on public land are a routine street-cleaning job in most places.',
    line: 'city', also: [],
    say: [
      'The species and the nearest street address',
      'Whether it is on the road, the verge or the footpath',
      'Whether it is near a storm drain or a school route',
      'A reference number for your report, so you can chase it'
    ]
  };
}

const EMERGENCY_RULE = {
  title: 'Call the emergency number instead when',
  points: [
    'The carcass is blocking a live traffic lane and cars are swerving',
    'The animal is not dead — it is injured and moving',
    'Someone has been bitten or scratched, or has handled a bat',
    'A large animal is down on a highway at night'
  ]
};
