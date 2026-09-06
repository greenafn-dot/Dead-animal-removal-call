/* jurisdictions.js — who to call, by country and region.
   Compiled from official government and agency sources in September 2026
   (see `url` on each region). Agencies reorganise and numbers change, so
   every entry carries its official page: the number is a starting point,
   the link is the authority. Nothing here is invented — where no statewide
   number could be verified, the country-level fallback is used instead. */

const COMPILED = 'September 2026';

/* Reusable contacts ------------------------------------------------------ */

const US_LOCAL = {
  name: 'Your city or county line',
  phone: '311',
  note: '311 reaches the municipal line in most US cities. Outside a 311 area, use your county’s non-emergency number.'
};

const UK_COUNCIL = {
  name: 'Your local council',
  phone: null,
  web: 'https://www.gov.uk/report-dead-animal',
  note: 'In the UK the local council collects dead animals from roads and public land. GOV.UK routes you to yours by postcode.'
};

/* ------------------------------------------------------------------------ */

const JURISDICTIONS = {
  us: {
    name: 'United States',
    regionLabel: 'State',
    emergency: { name: 'Emergency services', phone: '911' },
    lines: {
      city: US_LOCAL,
      pet: { ...US_LOCAL, name: 'Animal control, via your city line' },
      health: { ...US_LOCAL, name: 'Public health or vector control, via your city line' },
      bat: { ...US_LOCAL, name: 'Your local health department, via your city line', note: 'Ask for the rabies or communicable disease desk. If anyone may have touched the bat, also contact a doctor the same day.' },
      highway: {
        name: 'State highway information',
        phone: '511',
        note: '511 is the FCC-designated traveler information line. If a carcass is blocking a lane, call 911 instead — 511 is information, not dispatch.'
      }
    },
    national: [
      { name: 'USDA APHIS Wildlife Services', phone: '1-866-487-3297', note: 'Routes to your state office by area code.' },
      { name: 'APHIS sick or dead wild bird line', phone: '1-866-536-7593', note: 'For unusual bird die-offs and suspected avian influenza.' }
    ],
    regions: [
      { code: 'AL', name: 'Alabama', wildlife: { name: 'Alabama Wildlife & Freshwater Fisheries', phone: '334-242-3465' }, url: 'https://www.outdooralabama.com' },
      { code: 'AK', name: 'Alaska', wildlife: { name: 'Alaska Wildlife Troopers', phone: '800-478-3377' }, url: 'https://www.adfg.alaska.gov' },
      { code: 'AZ', name: 'Arizona', wildlife: { name: 'Arizona Game & Fish', phone: '800-352-0700' }, url: 'https://www.azgfd.com' },
      { code: 'AR', name: 'Arkansas', wildlife: { name: 'Arkansas Game & Fish Commission', phone: '800-364-4263' }, url: 'https://www.agfc.com' },
      { code: 'CA', name: 'California', wildlife: { name: 'California Dept. of Fish & Wildlife', phone: '916-445-0411' }, highway: { name: 'Caltrans service request', phone: '511', note: 'Caltrans dispatches carcass pickup by district; the online service request at csr.dot.ca.gov reaches the right yard.' }, url: 'https://wildlife.ca.gov' },
      { code: 'CO', name: 'Colorado', wildlife: { name: 'Colorado Parks & Wildlife', phone: '303-297-1192' }, url: 'https://cpw.state.co.us' },
      { code: 'CT', name: 'Connecticut', wildlife: { name: 'CT DEEP dispatch', phone: '860-424-3011' }, url: 'https://portal.ct.gov/deep' },
      { code: 'DE', name: 'Delaware', wildlife: { name: 'DNREC Fish & Wildlife', phone: '302-739-9910', note: 'Five or more sick or dead animals in one place: 302-735-3600 ext. 2.' }, url: 'https://dnrec.delaware.gov' },
      { code: 'DC', name: 'District of Columbia', wildlife: { name: 'DC Dept. of Public Works', phone: '202-737-4404' }, city: { name: 'DC 311', phone: '311', note: 'DPW collects from public space only — sidewalk, street or alley. They do not enter private property.' }, url: 'https://dpw.dc.gov/service/dead-animal-collection' },
      { code: 'FL', name: 'Florida', wildlife: { name: 'FWC Wildlife Alert', phone: '888-404-3922' }, highway: { name: 'Florida Highway Patrol', phone: '*347', note: 'Dial *FHP. Give the nearest exit or mile marker; FDOT picks up on state highways.' }, url: 'https://myfwc.com' },
      { code: 'GA', name: 'Georgia', wildlife: { name: 'Georgia DNR Wildlife Resources', phone: '706-557-3333' }, url: 'https://georgiawildlife.com' },
      { code: 'HI', name: 'Hawaii', wildlife: { name: 'DLNR DOCARE', phone: '808-643-3567' }, url: 'https://dlnr.hawaii.gov/dofaw' },
      { code: 'ID', name: 'Idaho', wildlife: { name: 'Idaho Fish & Game', phone: '208-334-3700' }, url: 'https://idfg.idaho.gov' },
      { code: 'IL', name: 'Illinois', wildlife: { name: 'Illinois DNR', phone: '217-782-6431' }, url: 'https://dnr.illinois.gov' },
      { code: 'IN', name: 'Indiana', wildlife: { name: 'Indiana DNR', phone: '317-232-4200' }, url: 'https://www.in.gov/dnr' },
      { code: 'IA', name: 'Iowa', wildlife: { name: 'Iowa DNR', phone: '515-725-8200' }, url: 'https://www.iowadnr.gov' },
      { code: 'KS', name: 'Kansas', wildlife: { name: 'Kansas Dept. of Wildlife & Parks', phone: '785-296-2281' }, url: 'https://ksoutdoors.gov' },
      { code: 'KY', name: 'Kentucky', wildlife: { name: 'Kentucky Fish & Wildlife', phone: '800-252-5378' }, highway: { name: 'Kentucky road information', phone: null, web: 'https://goky.ky.gov', note: 'Kentucky retired its 511 phone line. Use GoKY online, or 911 if it is a hazard.' }, url: 'https://fw.ky.gov' },
      { code: 'LA', name: 'Louisiana', wildlife: { name: 'LA Dept. of Wildlife & Fisheries', phone: '800-442-2511' }, url: 'https://www.wlf.louisiana.gov' },
      { code: 'ME', name: 'Maine', wildlife: { name: 'Maine Inland Fisheries & Wildlife', phone: '207-287-8000' }, url: 'https://www.maine.gov/ifw' },
      { code: 'MD', name: 'Maryland', wildlife: { name: 'Maryland DNR', phone: '410-260-8367' }, url: 'https://dnr.maryland.gov' },
      { code: 'MA', name: 'Massachusetts', wildlife: { name: 'MassWildlife', phone: '508-389-6300' }, url: 'https://www.mass.gov/masswildlife' },
      { code: 'MI', name: 'Michigan', wildlife: { name: 'Michigan DNR', phone: '517-284-9453' }, url: 'https://www.michigan.gov/dnr' },
      { code: 'MN', name: 'Minnesota', wildlife: { name: 'Minnesota DNR', phone: '888-646-6367' }, url: 'https://www.dnr.state.mn.us' },
      { code: 'MS', name: 'Mississippi', wildlife: { name: 'Mississippi Wildlife, Fisheries & Parks', phone: '601-432-2400' }, url: 'https://www.mdwfp.com' },
      { code: 'MO', name: 'Missouri', wildlife: { name: 'Missouri Dept. of Conservation', phone: '573-522-4115' }, url: 'https://mdc.mo.gov' },
      { code: 'MT', name: 'Montana', wildlife: { name: 'Montana Fish, Wildlife & Parks', phone: '406-444-2535' }, url: 'https://fwp.mt.gov' },
      { code: 'NE', name: 'Nebraska', wildlife: { name: 'Nebraska Game & Parks', phone: '402-471-0641' }, url: 'https://outdoornebraska.gov' },
      { code: 'NV', name: 'Nevada', wildlife: { name: 'Nevada Dept. of Wildlife', phone: '775-688-1500' }, url: 'https://www.ndow.org' },
      { code: 'NH', name: 'New Hampshire', wildlife: { name: 'NH Fish & Game, law enforcement', phone: '603-271-3127' }, url: 'https://www.wildlife.nh.gov' },
      { code: 'NJ', name: 'New Jersey', wildlife: { name: 'NJ DEP Hotline', phone: '877-927-6337', note: '877-WARN-DEP, for wildlife that is sick or died for no apparent reason.' }, url: 'https://dep.nj.gov/njfw' },
      { code: 'NM', name: 'New Mexico', wildlife: { name: 'NM Dept. of Game & Fish', phone: '888-248-6866' }, url: 'https://wildlife.dgf.nm.gov' },
      { code: 'NY', name: 'New York', wildlife: { name: 'NYSDEC Wildlife Health Unit', phone: '518-478-2203', note: 'After hours, Environmental Conservation Officer dispatch: 1-844-332-3267.' }, url: 'https://dec.ny.gov/nature/wildlife-health/reporting-dead-wildlife' },
      { code: 'NC', name: 'North Carolina', wildlife: { name: 'NC Wildlife Resources Commission', phone: '919-707-0040' }, url: 'https://www.ncwildlife.gov' },
      { code: 'ND', name: 'North Dakota', wildlife: { name: 'North Dakota Game & Fish', phone: '701-328-6300' }, url: 'https://gf.nd.gov' },
      { code: 'OH', name: 'Ohio', wildlife: { name: 'ODNR Division of Wildlife', phone: '800-945-3543', note: '1-800-WILDLIFE.' }, url: 'https://ohiodnr.gov' },
      { code: 'OK', name: 'Oklahoma', wildlife: { name: 'OK Dept. of Wildlife Conservation', phone: '405-521-3851' }, url: 'https://www.wildlifedepartment.com' },
      { code: 'OR', name: 'Oregon', wildlife: { name: 'Oregon Dept. of Fish & Wildlife', phone: '800-720-6339' }, url: 'https://myodfw.com' },
      { code: 'PA', name: 'Pennsylvania', wildlife: { name: 'PA Game Commission', phone: '833-742-4868', note: '1-833-PGC-WILD.' }, highway: { name: 'PennDOT', phone: '800-349-7623', note: '1-800-FIX-ROAD, for state roads.' }, url: 'https://www.pa.gov/agencies/pgc' },
      { code: 'RI', name: 'Rhode Island', wildlife: { name: 'RI DEM Fish & Wildlife', phone: '401-789-0281' }, url: 'https://dem.ri.gov' },
      { code: 'SC', name: 'South Carolina', wildlife: { name: 'South Carolina DNR', phone: '803-734-3886' }, url: 'https://www.dnr.sc.gov' },
      { code: 'SD', name: 'South Dakota', wildlife: { name: 'SD Game, Fish & Parks', phone: '605-223-7660' }, url: 'https://gfp.sd.gov' },
      { code: 'TN', name: 'Tennessee', wildlife: { name: 'Tennessee Wildlife Resources Agency', phone: '615-781-6500' }, url: 'https://www.tn.gov/twra' },
      { code: 'TX', name: 'Texas', wildlife: { name: 'Texas Parks & Wildlife', phone: '800-792-1112' }, highway: { name: 'TxDOT', phone: '800-558-9368', note: 'Texas retired its 511 phone line. TxDOT covers state highways only, not city or county roads.' }, url: 'https://tpwd.texas.gov' },
      { code: 'UT', name: 'Utah', wildlife: { name: 'Utah Division of Wildlife Resources', phone: '801-538-4700' }, url: 'https://wildlife.utah.gov' },
      { code: 'VT', name: 'Vermont', wildlife: { name: 'Vermont Fish & Wildlife', phone: '802-828-1000' }, url: 'https://vtfishandwildlife.com' },
      { code: 'VA', name: 'Virginia', wildlife: { name: 'Virginia Dept. of Wildlife Resources', phone: '804-367-1000' }, url: 'https://dwr.virginia.gov' },
      { code: 'WA', name: 'Washington', wildlife: { name: 'WDFW reporting line', phone: '877-933-9847', note: '1-877-WDFW-TIP.' }, highway: { name: 'Washington road information', phone: null, web: 'https://wsdot.com/travel/real-time/', note: 'Washington deactivated its 511 phone line in 2023. Use the WSDOT site or app, or 911 if it is a hazard.' }, url: 'https://wdfw.wa.gov' },
      { code: 'WV', name: 'West Virginia', wildlife: { name: 'West Virginia DNR', phone: '304-558-6200' }, url: 'https://wvdnr.gov' },
      { code: 'WI', name: 'Wisconsin', wildlife: { name: 'Wisconsin DNR', phone: '888-936-7463' }, url: 'https://dnr.wisconsin.gov' },
      { code: 'WY', name: 'Wyoming', wildlife: { name: 'Wyoming Game & Fish', phone: '307-777-4600' }, url: 'https://wgfd.wyo.gov' }
    ]
  },

  ca: {
    name: 'Canada',
    regionLabel: 'Province or territory',
    emergency: { name: 'Emergency services', phone: '911' },
    lines: {
      city: { name: 'Your municipality', phone: '311', note: '311 reaches the municipal line in most Canadian cities. Municipal public works collects from city streets.' },
      pet: { name: 'Municipal animal services', phone: '311' },
      health: { name: 'Public health, via your municipal line', phone: '311' },
      bat: { name: 'Your regional public health unit, via your municipal line', phone: '311', note: 'Ask for the rabies desk. If anyone may have touched the bat, contact a doctor the same day — Canada follows the same post-exposure rules.' },
      highway: { name: 'Provincial road information', phone: '511', note: '511 is the road information line in most provinces. If a carcass is blocking a lane, call 911.' }
    },
    national: [
      { name: 'Canadian Wildlife Health Cooperative', phone: null, web: 'http://www.cwhc-rcsf.ca', note: 'Coordinates wildlife disease surveillance nationally; reports go through the provincial contacts below.' }
    ],
    regions: [
      { code: 'AB', name: 'Alberta', wildlife: { name: 'Report A Poacher', phone: '800-642-3800', note: 'Also the line for wildlife concerns.' }, highway: { name: '511 Alberta', phone: '511', note: 'From outside Alberta: 1-855-391-9743. Carcasses on provincial highways are reported here.' }, url: 'https://www.alberta.ca/animal-vehicle-collision-safety-program' },
      { code: 'BC', name: 'British Columbia', wildlife: { name: 'Report All Poachers and Polluters (RAPP)', phone: '877-952-7277', note: '24/7. BC advises reporting dead deer and other wildlife to local public works, road maintenance or animal control for removal.' }, url: 'https://www2.gov.bc.ca/gov/content/environment/plants-animals-ecosystems/wildlife/wildlife-conservation/wildlife-health/what-to-do-if-you-find-sick-injured-or-dead-wildlife' },
      { code: 'MB', name: 'Manitoba', wildlife: { name: 'Turn in Poachers (TIP)', phone: '800-782-0076', note: '24 hours.' }, url: 'https://residents.gov.mb.ca' },
      { code: 'NB', name: 'New Brunswick', wildlife: { name: 'Dept. of Natural Resources and Energy Development', phone: '833-301-0334' }, url: 'https://www2.gnb.ca' },
      { code: 'NL', name: 'Newfoundland and Labrador', url: 'https://www.gov.nl.ca' },
      { code: 'NS', name: 'Nova Scotia', wildlife: { name: 'Natural Resources and Renewables', phone: '800-565-2224' }, url: 'https://novascotia.ca' },
      { code: 'NT', name: 'Northwest Territories', url: 'https://www.gov.nt.ca' },
      { code: 'NU', name: 'Nunavut', url: 'https://www.gov.nu.ca' },
      { code: 'ON', name: 'Ontario', wildlife: { name: 'MNR TIPS', phone: '877-847-7667' }, highway: { name: '511 Ontario', phone: '511', note: 'Carcasses on 400-series highways and the QEW are the Ministry of Transportation’s; city expressways are the city’s.' }, url: 'https://www.ontario.ca' },
      { code: 'PE', name: 'Prince Edward Island', url: 'https://www.princeedwardisland.ca' },
      { code: 'QC', name: 'Quebec', highway: { name: 'Québec 511', phone: '511' }, url: 'https://www.quebec.ca' },
      { code: 'SK', name: 'Saskatchewan', wildlife: { name: 'Turn in Poachers and Polluters (TIPP)', phone: '800-667-7561' }, url: 'https://www.saskatchewan.ca' },
      { code: 'YT', name: 'Yukon', url: 'https://yukon.ca' }
    ]
  },

  uk: {
    name: 'United Kingdom',
    regionLabel: 'Nation',
    emergency: { name: 'Emergency services', phone: '999' },
    lines: {
      city: UK_COUNCIL,
      pet: UK_COUNCIL,
      health: UK_COUNCIL,
      bat: { name: 'NHS 111', phone: '111', note: 'All UK bats are legally protected and must not be handled. If anyone has touched a bat or been scratched, call 111 the same day — UK bats can carry a rabies-related lyssavirus. For the carcass itself, contact your council.' },
      highway: { name: 'Police non-emergency', phone: '101', note: 'If a carcass is a hazard to road users, 101 can arrange traffic control. 999 if it is causing immediate danger.' }
    },
    national: [
      { name: 'Defra — dead wild birds (avian influenza)', phone: '03459 33 55 77', note: 'Report dead wild birds here. Do not handle them.' },
      { name: 'Report a dead animal (GOV.UK)', phone: null, web: 'https://www.gov.uk/report-dead-animal', note: 'Finds your council by postcode.' }
    ],
    regions: [
      { code: 'ENG', name: 'England', wildlife: { name: 'RSPCA', phone: '0300 1234 999', note: 'For injured wildlife and animal welfare concerns.' }, highway: { name: 'National Highways', phone: '0300 123 5000', note: 'Motorways and major A roads in England. Other roads are the local council’s.' }, url: 'https://www.gov.uk/report-dead-animal' },
      { code: 'SCT', name: 'Scotland', wildlife: { name: 'Scottish SPCA', phone: '03000 999 999' }, highway: { name: 'Traffic Scotland trunk road line', phone: '0800 028 1414' }, url: 'https://www.scottishspca.org' },
      { code: 'WLS', name: 'Wales', wildlife: { name: 'RSPCA', phone: '0300 1234 999' }, highway: { name: 'Traffic Wales', phone: '0300 123 1213', note: 'Motorways and trunk roads in Wales.' }, url: 'https://traffic.wales/report-issue' },
      { code: 'NIR', name: 'Northern Ireland', wildlife: { name: 'USPCA', phone: '028 3025 1000' }, url: 'https://www.uspca.co.uk' }
    ]
  },

  au: {
    name: 'Australia',
    regionLabel: 'State or territory',
    emergency: { name: 'Emergency services', phone: '000' },
    lines: {
      city: { name: 'Your local council', phone: null, note: 'Councils collect dead animals from council roads and public land.' },
      pet: { name: 'Your local council', phone: null },
      health: { name: 'Emergency Animal Disease Hotline', phone: '1800 675 888' },
      bat: { name: 'Wildlife Rescue Australia', phone: '1300 596 457', note: 'Australian bats can carry Australian bat lyssavirus. Only vaccinated, trained handlers may touch a bat. If anyone has been bitten or scratched, wash the wound and seek medical advice immediately — treatment is time-critical.' },
      highway: { name: 'Your state road authority', phone: null, note: 'State-classified roads belong to the state road authority; everything else is the council’s.' }
    },
    national: [
      { name: 'Emergency Animal Disease Hotline', phone: '1800 675 888', note: 'National, 24/7. Use for sick or dead wildlife that may carry disease, including suspected H5 bird flu.' },
      { name: 'Wildlife Rescue Australia', phone: '1300 596 457', note: '24-hour call centre that finds a rescuer near you.' }
    ],
    regions: [
      { code: 'NSW', name: 'New South Wales', wildlife: { name: 'WIRES', phone: '1300 094 737', note: '24/7 rescue advice.' }, highway: { name: 'Transport for NSW', phone: '131 700', note: 'For state-classified roads.' }, url: 'https://www.wires.org.au' },
      { code: 'VIC', name: 'Victoria', wildlife: { name: 'Wildlife Victoria', phone: '03 8400 7300', note: '24/7.' }, highway: { name: 'VicRoads', phone: '13 11 71' }, url: 'https://wildlifevictoria.org.au' },
      { code: 'QLD', name: 'Queensland', wildlife: { name: 'Queensland Parks and Wildlife Service', phone: '1300 130 372', note: 'RSPCA Queensland for injured animals: 1300 264 625.' }, url: 'https://www.qld.gov.au/environment/plants-animals/reporting' },
      { code: 'WA', name: 'Western Australia', wildlife: { name: 'Wildcare Helpline', phone: '08 9474 9055' }, highway: { name: 'Main Roads WA', phone: '138 138' }, url: 'https://www.mainroads.wa.gov.au' },
      { code: 'SA', name: 'South Australia', wildlife: { name: 'Fauna Rescue South Australia', phone: '08 8289 0896' }, url: 'https://faunarescue.org.au' },
      { code: 'TAS', name: 'Tasmania', wildlife: { name: 'Wildlife Management Branch', phone: '1300 827 727', note: 'Bonorong Wildlife Rescue: 0447 264 625.' }, url: 'https://nre.tas.gov.au' },
      { code: 'ACT', name: 'Australian Capital Territory', wildlife: { name: 'RSPCA ACT', phone: '02 6287 8100', note: 'ACT Wildlife: 0432 300 033.' }, url: 'https://rspca-act.org.au' },
      { code: 'NT', name: 'Northern Territory', url: 'https://nt.gov.au' }
    ]
  }
};

/* Resolution ------------------------------------------------------------- */

function getRegion(countryId, regionCode) {
  const c = JURISDICTIONS[countryId];
  if (!c) return null;
  return c.regions.find((r) => r.code === regionCode) || null;
}

/* Returns the best contact for a routing line, most specific first:
   region override → country default → null. */
function contactFor(countryId, regionCode, line) {
  const country = JURISDICTIONS[countryId];
  if (!country) return null;
  const region = getRegion(countryId, regionCode);
  if (region && region[line]) return { ...region[line], scope: 'region' };
  if (line === 'wildlife') return null;              // no national wildlife default
  const base = country.lines[line] || (line === 'bat' ? country.lines.health : null);
  return base ? { ...base, scope: 'country' } : null;
}
