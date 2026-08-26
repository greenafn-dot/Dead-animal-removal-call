/* routing.js — decides which agency handles a given carcass.
   The answer depends on two things: what the animal is (disease and
   protected-species rules) and whose land it is lying on (jurisdiction).
   Animal rules win over location rules, because a rabies exposure is
   urgent regardless of which side of a kerb it happened on. */

const LOCATIONS = [
  { id: 'street', label: 'City street or sidewalk', hint: 'A public road inside a town or city' },
  { id: 'highway', label: 'Highway or freeway', hint: 'A state route, interstate, or its shoulder' },
  { id: 'yard', label: 'Private property', hint: 'Your yard, driveway, or a building you own' },
  { id: 'park', label: 'Park, trail or waterway', hint: 'Public green space or open water' }
];

function routeFor(animal, locationId) {
  /* 1. Animal-driven rules that override jurisdiction. */
  if (animal.report === 'bat') {
    return {
      agency: 'Your local public health department',
      urgency: 'urgent',
      why: 'Bats are the leading source of rabies in human cases. Health departments test the animal, so the carcass must be preserved rather than binned.',
      line: 'health',
      say: [
        'That you have found a dead bat and where it is',
        'Whether any person or pet may have touched it',
        'Whether it was in a room where somebody was sleeping',
        'That you have not disposed of it and can keep it for testing'
      ]
    };
  }

  if (animal.report === 'health') {
    return {
      agency: 'Public health or vector control, via your city line',
      urgency: locationId === 'yard' ? 'normal' : 'prompt',
      why: 'Rodents and birds are tracked for disease. Several dead animals in one place is a surveillance signal, not just a cleanup job.',
      line: 'city',
      say: [
        'How many animals you can see',
        'The species, if you are confident',
        'Whether there is standing water or an obvious food source nearby',
        'Whether children or pets have access to the spot'
      ]
    };
  }

  if (animal.report === 'pet') {
    return {
      agency: 'Animal control or the municipal animal shelter',
      urgency: 'prompt',
      why: 'They scan for a microchip and contact the owner. A quick call is often the only way a family ever finds out what happened.',
      line: 'city',
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
      agency: 'The state transportation department (highway maintenance)',
      urgency: animal.size === 'large' ? 'urgent' : 'normal',
      why: 'Highways are not maintained by the city. The state DOT runs the crews that work live traffic lanes safely.',
      line: 'highway',
      say: [
        'The route number and nearest mile marker or exit',
        'Which direction of travel, and which lane or shoulder',
        'The approximate size of the animal',
        'Whether it is currently blocking a lane of traffic'
      ]
    };
  }

  if (locationId === 'yard') {
    return {
      agency: 'Your city or county — but expect to be told it is yours',
      urgency: 'normal',
      why: 'Most jurisdictions only collect from public land. Many still offer a paid pickup, and the rules change if it is a rabies vector species.',
      line: 'city',
      say: [
        'The species, and that it is on private property',
        'Ask whether they collect from private land, and whether there is a fee',
        animal.risk.level === 'high' ? 'That it is a rabies vector species — ask if that changes the answer' : 'Whether they can advise on safe disposal',
        'Ask what container or bagging they require if you must do it yourself'
      ]
    };
  }

  if (animal.size === 'large' || animal.report === 'wildlife') {
    return {
      agency: locationId === 'park'
        ? 'The parks authority, or the state wildlife agency'
        : 'Animal control or public works, via your city line',
      urgency: animal.size === 'large' ? 'prompt' : 'normal',
      why: animal.size === 'large'
        ? 'Large carcasses need equipment and often a wildlife officer, especially where the animal is a protected or game species.'
        : 'Wildlife on public land is normally a municipal pickup, escalated to the state agency if the species is protected.',
      line: 'city',
      say: [
        'The species and rough size',
        'The nearest street address or landmark',
        'Whether it is a traffic or pedestrian hazard where it lies',
        'How long it looks to have been there'
      ]
    };
  }

  return {
    agency: 'Public works or sanitation, via your city line',
    urgency: 'normal',
    why: 'Small animals on public land are a routine street-cleaning job in most cities.',
    line: 'city',
    say: [
      'The species and the nearest street address',
      'Whether it is on the road, the verge or the footpath',
      'Whether it is near a storm drain or a school route',
      'A callback number if they offer to confirm collection'
    ]
  };
}

const EMERGENCY_RULE = {
  title: 'When to call 911 instead',
  points: [
    'The carcass is blocking a live traffic lane and cars are swerving',
    'The animal is not dead — it is injured and moving',
    'Someone has been bitten, scratched, or has handled a bat',
    'A large animal is down on a highway at night'
  ]
};
