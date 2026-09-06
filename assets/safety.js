/* safety.js — handling guidance drawn from published animal-control and
   public-health advice: CDC rabies guidance, NYSDOT's carcass handling
   procedure, Colorado CDPHE carcass disposal guidance, and USDA APHIS
   wildlife carcass disposal. The consistent instruction across all of them
   is the same: treat every carcass as infected and do not use bare hands. */

const HANDLING = {
  title: 'If you have to be near it at all',
  points: [
    'Treat every carcass as infected. Agencies assume this by default, and so should you.',
    'Never bare hands. Rubber or nitrile gloves, and public-health guidance recommends double-gloving.',
    'Do not lift it by hand — use a long-handled tool, a shovel, and long sleeves.',
    'Confirm it is dead by prodding with a long-handled tool first, from a distance.',
    'Keep pets away entirely. They investigate carcasses, and that is how disease moves to your household.',
    'Wash your hands thoroughly with soap and water afterwards, even if you wore gloves.',
    'Disinfect any tool that touched it: one part bleach to nine parts water.'
  ]
};

const DO_NOT_TOUCH = {
  title: 'Do not touch it at all if',
  points: [
    'It is a bat — no exceptions, see below.',
    'It is a rabies vector species: raccoon, skunk, fox, coyote.',
    'It looks diseased — patchy fur, visible tumours, unusual discharge.',
    'There are several dead animals in one place. That is a disease or poisoning signal and the agency needs to see it undisturbed.',
    'It is on a live roadway. Nothing here is worth stepping into traffic for.'
  ]
};

/* The bat protocol is separated out because it is the one case where the
   wrong move — binning it — destroys the evidence a rabies decision needs. */
const BAT_PROTOCOL = {
  title: 'Bats: the rabies protocol',
  points: [
    'Do not touch it, and do not hit or crush it. Damage to the head makes rabies testing impossible, and testing is what decides whether anyone needs treatment.',
    'A bat found in a room where somebody was asleep, or with an unattended child, counts as a possible exposure even with no visible bite — bat bites can be too small to see or feel.',
    'Do not throw it away. Public health may need to test it.',
    'If any person or pet may have had contact, call your health department and seek medical advice the same day. Rabies is preventable before symptoms start and effectively untreatable after.'
  ]
};

const DISPOSAL = {
  title: 'If the agency tells you to handle it yourself',
  points: [
    'Ask them first. Requirements differ, and for a rabies vector species the answer may be no.',
    'Small animals — birds, rodents, rabbits — are usually double-bagged in sturdy plastic and put in household waste, but only where your waste collector allows it.',
    'Never put a bat, or any animal a person or pet may have touched, in the bin before public health has answered.',
    'Do not burn or bury it without checking local rules first.'
  ]
};

/* Extra cautions keyed to the animal's own risk profile. */
const RABIES_VECTORS = ['raccoon', 'skunk', 'fox', 'coyote', 'bat'];

function cautionsFor(animal, countryId) {
  const out = [];
  if (animal.id === 'bat') out.push(BAT_PROTOCOL);
  else if (RABIES_VECTORS.indexOf(animal.id) !== -1) {
    out.push({
      title: 'This is a rabies vector species',
      points: [
        'Report it rather than remove it. Animal control guidance treats these species as rabies suspects by default.',
        'Do not touch it even with gloves, and do not let a pet near it — a pet that contacts a rabid carcass may need a booster or quarantine.',
        'If any person or pet has already had contact, say so on the call and speak to a doctor or vet the same day.',
        'If it is on your property and you are told to dispose of it yourself, ask specifically whether that still applies to a rabies vector species.'
      ]
    });
  }
  if (animal.id === 'crow' || animal.id === 'pigeon') {
    out.push({
      title: 'Dead birds are watched for disease',
      points: [
        'Several dead birds in one place is a reportable event, not just a mess — say how many you can see.',
        'Keep cats and dogs well away from bird carcasses; avian influenza has moved to mammals through them.',
        countryId === 'us'
          ? 'In the US, unusual bird die-offs go to APHIS on 1-866-536-7593 as well as your local line.'
          : countryId === 'uk'
            ? 'In the UK, report dead wild birds to Defra on 03459 33 55 77.'
            : countryId === 'au'
              ? 'In Australia, report to the Emergency Animal Disease Hotline on 1800 675 888.'
              : 'Report unusual bird die-offs to your national animal health line as well as your local one.'
      ]
    });
  }
  if (animal.id === 'snake') {
    out.push({
      title: 'A dead snake can still bite',
      points: [
        'The bite reflex outlives the animal and can persist for up to an hour. Never handle the head.',
        'Photograph it from a safe distance rather than moving it — identification matters if anyone was bitten.'
      ]
    });
  }
  if (countryId === 'au' && ['deer', 'dog', 'cat'].indexOf(animal.id) === -1) {
    out.push({
      title: 'In Australia, check for a joey',
      points: [
        'If the animal is a marsupial, a joey may still be alive in the pouch or nearby after the mother has died.',
        'Do not open the pouch yourself unless you have been talked through it — call the wildlife rescue line first and follow what they tell you.',
        'Only approach if it is safe to leave the roadway.'
      ]
    });
  }
  return out;
}
