/**
 * PlayLK — Interactive 3D sports hub + infinite court-selection grid.
 *
 * Flow:
 * 1. 3D Sport Hub: four low-poly sport models with particle auras. Hover summons the
 *    sport's gear; click plays a strike + approach animation into the court grid.
 * 2. Court Grid: an infinite 2D wall of square court tiles (drag, wheel or trackpad to pan).
 *    Hovering a tile fades its info overlay. Clicking a tile flies it to the top-right
 *    inspector (dimensions, rotatable court diagram, description, terms, Book Now) while
 *    the remaining courts re-flow into a 2-wide infinite grid on the left.
 * 3. Session & map page, then checkout & confirmation.
 *
 * Keyboard: arrow keys move between tiles, Enter/Space selects, Escape steps back.
 */

/* ============================================================================
   2. SPORTS & COURTS DATA CATALOG (4 Courts per Sport for 2-Column Grid)
   ============================================================================ */
const SPORTS_CATALOG = [
  {
    id: 'futsal',
    name: 'Football / Futsal',
    shortName: 'Football',
    accentHex: '#1a73e8',
    accentColor: 0x1a73e8,
    equipmentAddon: 'Match Ball + 10 Team Bibs',
    stageX: -5.4
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    shortName: 'Pickleball',
    accentHex: '#1e8e3e',
    accentColor: 0x1e8e3e,
    equipmentAddon: '4 Carbon Paddles + X-40 Balls',
    stageX: -1.8
  },
  {
    id: 'tennis',
    name: 'Tennis',
    shortName: 'Tennis',
    accentHex: '#f9ab00',
    accentColor: 0xf9ab00,
    equipmentAddon: '2 Pro Racquets + Pressurized Balls',
    stageX: 1.8
  },
  {
    id: 'badminton',
    name: 'Badminton',
    shortName: 'Badminton',
    accentHex: '#9334e6',
    accentColor: 0x9334e6,
    equipmentAddon: '2 Yonex Racquets + Feather Tube',
    stageX: 5.4
  }
];

const COURTS_CATALOG = [
  // ─── FOOTBALL / FUTSAL (4 Courts) ───
  {
    id: 'ft-colombo-arena',
    sportId: 'futsal',
    name: 'CR7 Colombo Futsal Arena',
    area: 'Colombo 05',
    address: '142 Havelock Road, Colombo 05',
    distance: '1.1 km away',
    rating: 4.9,
    reviews: 248,
    pricePerHour: 6500,
    environment: 'Indoor AC',
    surface: 'FIFA Pro 50mm Turf',
    surfaceColor: 0x16803c,
    dimensions: '40m × 20m',
    dimensionsSpec: {
      length: '40.0 m',
      width: '20.0 m',
      height: '12.5 m',
      netLabel: 'Goal Height',
      netHeight: '2.00 m'
    },
    lighting: '650 Lux LED',
    bays: ['Pitch A (Main)', 'Pitch B (Pro)'],
    coords: [6.8865, 79.8652],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80',
    description: 'Premier climate-controlled 5-a-side futsal arena featuring FIFA Quality Pro monofilament shock-pad turf, digital scoreboards, and pro locker rooms.',
    amenities: ['FIFA Pro Turf', 'Air Conditioned', 'Showers & Lockers', 'Free Parking'],
    bookingTerms: [
      'Free cancellation up to 12 hours before kick-off',
      'Turf shoes or flat-sole indoor boots only (no metal studs)',
      'Max 12 players permitted per 1-hour slot',
      'Complimentary match ball & team bibs included'
    ]
  },
  {
    id: 'ft-port-city',
    sportId: 'futsal',
    name: 'Marina Bay Turf Club',
    area: 'Colombo 01',
    address: 'Port City Promenade, Colombo 01',
    distance: '2.4 km away',
    rating: 4.8,
    reviews: 176,
    pricePerHour: 5800,
    environment: 'Outdoor Floodlit',
    surface: 'Dutch Hybrid AstroTurf',
    surfaceColor: 0x15803d,
    dimensions: '38m × 19m',
    dimensionsSpec: {
      length: '38.0 m',
      width: '19.0 m',
      height: 'Open Sky',
      netLabel: 'Goal Height',
      netHeight: '2.00 m'
    },
    lighting: '500 Lux Stadium',
    bays: ['North Pitch 1', 'South Pitch 2'],
    coords: [6.9344, 79.8382],
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80',
    description: 'Open-air waterfront football pitches with ocean breeze, spectator bleachers, and high-output night stadium floodlights.',
    amenities: ['Ocean Breeze', 'Night Floodlights', 'Spectator Stand', 'Refreshments'],
    bookingTerms: [
      '100% weather-reschedule guarantee for heavy rain',
      'Arrive 10 minutes prior to slot for bay check-in',
      'AG/TF boots recommended for hybrid turf',
      'Floodlights automatically included for evening slots'
    ]
  },
  {
    id: 'ft-rajagiriya',
    sportId: 'futsal',
    name: 'KickOff Dome Rajagiriya',
    area: 'Rajagiriya',
    address: '88 Parliament Road, Rajagiriya',
    distance: '3.7 km away',
    rating: 4.7,
    reviews: 134,
    pricePerHour: 5000,
    environment: 'Covered Canopy',
    surface: '3G Rubber-Infill Turf',
    surfaceColor: 0x1e7e34,
    dimensions: '36m × 18m',
    dimensionsSpec: {
      length: '36.0 m',
      width: '18.0 m',
      height: '10.8 m',
      netLabel: 'Goal Height',
      netHeight: '2.00 m'
    },
    lighting: '450 Lux High-Bay',
    bays: ['Dome Pitch 1', 'Dome Pitch 2'],
    coords: [6.9094, 79.8965],
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=80',
    description: 'All-weather high-roof futsal dome designed for fast-paced 5v5 league nights, corporate tournaments, and group bookings.',
    amenities: ['All-Weather Roof', 'Digital Timer', 'Ample Parking', 'Changing Rooms'],
    bookingTerms: [
      'Free reschedule up to 6 hours before booking time',
      'Non-marking trainers or turf cleats required',
      'On-site parking for up to 20 vehicles',
      'Filtered drinking water station provided courtside'
    ]
  },
  {
    id: 'ft-dehiwala-pro',
    sportId: 'futsal',
    name: 'GoalLine Pro Arena',
    area: 'Colombo 06',
    address: '52 W.A. Silva Mawatha, Colombo 06',
    distance: '3.9 km away',
    rating: 4.8,
    reviews: 159,
    pricePerHour: 5400,
    environment: 'Indoor Arena',
    surface: 'LigaTurf Cross Pro',
    surfaceColor: 0x0f766e,
    dimensions: '40m × 20m',
    dimensionsSpec: {
      length: '40.0 m',
      width: '20.0 m',
      height: '11.5 m',
      netLabel: 'Goal Height',
      netHeight: '2.00 m'
    },
    lighting: '600 Lux LED',
    bays: ['Arena Pitch 1', 'Arena Pitch 2'],
    coords: [6.8781, 79.8612],
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80',
    description: 'Championship-sized indoor futsal pitch with German LigaTurf shock-absorbing sub-base and live match replay cameras.',
    amenities: ['Match Replay Cam', 'Pro Locker Rooms', 'Sports Cafe', 'Valet Parking'],
    bookingTerms: [
      'Instant digital gate pass sent upon confirmation',
      'Clean turf or indoor futsal shoes mandatory',
      'Full refund if cancelled 24 hours in advance',
      'Referee booking available on request at reception'
    ]
  },

  // ─── PICKLEBALL (4 Courts) ───
  {
    id: 'pb-dink-club',
    sportId: 'pickleball',
    name: 'The Dink Social Pickleball Club',
    area: 'Colombo 07',
    address: '28 Maitland Crescent, Colombo 07',
    distance: '0.9 km away',
    rating: 4.9,
    reviews: 192,
    pricePerHour: 4200,
    environment: 'Indoor AC',
    surface: 'USAPA 8-Layer Cushion',
    surfaceColor: 0x1a73e8,
    dimensions: '13.41m × 6.10m',
    dimensionsSpec: {
      length: '13.41 m',
      width: '6.10 m',
      height: '9.5 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '600 Lux Indirect',
    bays: ['Show Court 1', 'Court 2'],
    coords: [6.9046, 79.8669],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80',
    description: 'Colombo’s dedicated indoor pickleball club with tournament-grade cushioned acrylic courts, wide run-off zones, and pro paddle shop.',
    amenities: ['USAPA Certified', 'Full Air Con', 'Pro Paddle Shop', 'Coffee Bar'],
    bookingTerms: [
      'Non-marking court shoes strictly required',
      'Up to 4 players per court (6 max for rotation)',
      'Free cancellation up to 8 hours before session',
      'Franklin X-40 tournament balls provided free'
    ]
  },
  {
    id: 'pb-kitchen-rally',
    sportId: 'pickleball',
    name: 'Kitchen Line Rooftop Courts',
    area: 'Colombo 03',
    address: '410 Galle Road, Kollupitiya, Colombo 03',
    distance: '1.8 km away',
    rating: 4.8,
    reviews: 145,
    pricePerHour: 3600,
    environment: 'Rooftop Breeze',
    surface: 'Laykold Gel Hardcourt',
    surfaceColor: 0x2563eb,
    dimensions: '13.41m × 6.10m',
    dimensionsSpec: {
      length: '13.41 m',
      width: '6.10 m',
      height: 'Open Sky',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '500 Lux LED',
    bays: ['Sky Court A', 'Sky Court B'],
    coords: [6.9061, 79.8530],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80',
    description: 'Skyline rooftop pickleball venue overlooking the Indian Ocean with high-contrast Laykold gel courts and acoustic windscreens.',
    amenities: ['Skyline View', 'Pro Net Systems', 'Paddle Rental', 'Juice Bar'],
    bookingTerms: [
      'Weather protection credit if rain interrupts play',
      'Check in at 8th-floor rooftop reception desk',
      'Carbon paddles available for hire at LKR 800',
      'Complimentary chilled towels for all players'
    ]
  },
  {
    id: 'pb-nawala-hub',
    sportId: 'pickleball',
    name: 'SpinShot Pickleball Pavilion',
    area: 'Nawala',
    address: '64 Koswatte Road, Nawala',
    distance: '3.2 km away',
    rating: 4.7,
    reviews: 98,
    pricePerHour: 3200,
    environment: 'Covered Pavilion',
    surface: 'Textured Acrylic Coat',
    surfaceColor: 0x0284c7,
    dimensions: '13.41m × 6.10m',
    dimensionsSpec: {
      length: '13.41 m',
      width: '6.10 m',
      height: '8.8 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '480 Lux Anti-Glare',
    bays: ['Pavilion Court 1', 'Pavilion Court 2'],
    coords: [6.8902, 79.8878],
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=80',
    description: 'Lush garden-side covered pickleball courts featuring acoustic baffles, permanent pro nets, and beginner-friendly clinics.',
    amenities: ['Covered Roof', 'Ball Machine', 'Free Parking', 'Showers'],
    bookingTerms: [
      'Flexible rescheduling up to 4 hours prior',
      'Clean non-marking athletic footwear required',
      'Ball machine rental available upon check-in',
      'Private parking lot right beside court entrance'
    ]
  },
  {
    id: 'pb-bay-club',
    sportId: 'pickleball',
    name: 'Voli Bay Pickleball Lounge',
    area: 'Colombo 02',
    address: '18 Union Place, Colombo 02',
    distance: '1.5 km away',
    rating: 4.9,
    reviews: 167,
    pricePerHour: 4000,
    environment: 'Indoor AC',
    surface: 'ProCushion Tournament',
    surfaceColor: 0x0d9488,
    dimensions: '13.41m × 6.10m',
    dimensionsSpec: {
      length: '13.41 m',
      width: '6.10 m',
      height: '10.2 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '650 Lux Studio LED',
    bays: ['Lounge Court 1', 'Lounge Court 2'],
    coords: [6.9186, 79.8560],
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=80',
    description: 'Boutique indoor air-conditioned pickleball lounge with tournament spacing, digital score tablets, and recovery smoothie bar.',
    amenities: ['Digital Scoreboard', 'Air Conditioned', 'Smoothie Bar', 'Locker Rooms'],
    bookingTerms: [
      'Instant QR check-in at court gate',
      'Free cancellation up to 12 hours before play',
      'Non-marking court shoes mandatory',
      'Locker & shower access included with booking'
    ]
  },

  // ─── TENNIS (4 Courts) ───
  {
    id: 'tn-queens-lawn',
    sportId: 'tennis',
    name: 'Queen’s Club Championship Tennis',
    area: 'Colombo 07',
    address: '15 Bauddhaloka Mawatha, Colombo 07',
    distance: '1.3 km away',
    rating: 4.9,
    reviews: 310,
    pricePerHour: 4800,
    environment: 'Outdoor & Covered',
    surface: 'ITF DecoTurf Hardcourt',
    surfaceColor: 0x1e5aa8,
    dimensions: '23.77m × 10.97m',
    dimensionsSpec: {
      length: '23.77 m',
      width: '10.97 m',
      height: '14.0 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '750 Lux ATP-Spec',
    bays: ['Centre Court', 'Grandstand 2'],
    coords: [6.9012, 79.8615],
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=80',
    description: 'Historic Colombo tennis venue upgraded with Grand Slam DecoTurf hardcourt surfacing, digital line review, and clubhouse dining.',
    amenities: ['ITF Pro Surface', 'Clubhouse Dining', 'Stringing Service', 'Pro Coaching'],
    bookingTerms: [
      'Standard tennis attire and non-marking tennis shoes required',
      'Singles or doubles (up to 4 players) included in rate',
      'Free cancellation up to 12 hours before slot',
      'Ball kids & hitting partner available on prior request'
    ]
  },
  {
    id: 'tn-clay-masters',
    sportId: 'tennis',
    name: 'Roland Red Clay Tennis Academy',
    area: 'Colombo 05',
    address: '92 Jawatte Road, Colombo 05',
    distance: '2.1 km away',
    rating: 4.8,
    reviews: 164,
    pricePerHour: 4000,
    environment: 'Outdoor Floodlit',
    surface: 'European Red Clay',
    surfaceColor: 0xb45309,
    dimensions: '23.77m × 10.97m',
    dimensionsSpec: {
      length: '23.77 m',
      width: '10.97 m',
      height: 'Open Sky',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '600 Lux LED Towers',
    bays: ['Clay Court 1', 'Clay Court 2'],
    coords: [6.8938, 79.8631],
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=80',
    description: 'Authentic European crushed-brick red clay courts offering joint-friendly sliding rallies and automated underground hydration.',
    amenities: ['Red Clay Surface', 'Night Play', 'Player Lounge', 'Parking'],
    bookingTerms: [
      'Clay-court herringbone or flat-tread tennis shoes required',
      'Courts are brushed and watered between every hour slot',
      '100% rain credit if outdoor play is halted',
      'Chilled electrolyte water provided courtside'
    ]
  },
  {
    id: 'tn-waters-edge',
    sportId: 'tennis',
    name: 'Lakeside Indoor Tennis Dome',
    area: 'Battaramulla',
    address: '310 Ethul Kotte Road, Battaramulla',
    distance: '4.5 km away',
    rating: 4.7,
    reviews: 119,
    pricePerHour: 4500,
    environment: 'Indoor AC',
    surface: 'Plexipave Cushion',
    surfaceColor: 0x1d4ed8,
    dimensions: '23.77m × 10.97m',
    dimensionsSpec: {
      length: '23.77 m',
      width: '10.97 m',
      height: '12.5 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '650 Lux Skylight+LED',
    bays: ['Indoor Court A', 'Indoor Court B'],
    coords: [6.9019, 79.9082],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80',
    description: 'All-weather air-conditioned indoor tennis facility so your match is never interrupted by tropical rain or midday heat.',
    amenities: ['100% Rainproof AC', 'Plexipave Court', 'Lockers & Showers', 'Pro Shop'],
    bookingTerms: [
      'Guaranteed all-weather play inside climate-controlled dome',
      'Non-marking hardcourt tennis shoes mandatory',
      'Free reschedule up to 6 hours before match time',
      'New pressurized Wilson US Open balls available at desk'
    ]
  },
  {
    id: 'tn-harbour-club',
    sportId: 'tennis',
    name: 'Oceanfront Grand Slam Club',
    area: 'Colombo 03',
    address: '68 Marine Drive, Colombo 03',
    distance: '1.9 km away',
    rating: 4.8,
    reviews: 142,
    pricePerHour: 4400,
    environment: 'Covered Sea-View',
    surface: 'Rebound Ace Pro',
    surfaceColor: 0x0f766e,
    dimensions: '23.77m × 10.97m',
    dimensionsSpec: {
      length: '23.77 m',
      width: '10.97 m',
      height: '11.8 m',
      netLabel: 'Net Height',
      netHeight: '0.914 m'
    },
    lighting: '700 Lux Tournament',
    bays: ['Ocean Court 1', 'Ocean Court 2'],
    coords: [6.9041, 79.8492],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80',
    description: 'Covered Rebound Ace cushioned courts along Marine Drive combining Australian Open bounce response with sea-breeze ventilation.',
    amenities: ['Rebound Ace Cushion', 'Canopy Roof', 'Shower Suites', 'Free Parking'],
    bookingTerms: [
      'Cushioned Rebound Ace surface requires non-marking soles',
      'Free cancellation up to 8 hours prior to booking',
      'Floodlights included for all evening reservations',
      'Racquet restringing bar open daily 7 AM – 10 PM'
    ]
  },

  // ─── BADMINTON (4 Courts) ───
  {
    id: 'bd-smash-arena',
    sportId: 'badminton',
    name: 'Yonex Smash Pro Badminton Hall',
    area: 'Colombo 04',
    address: '55 Duplication Road, Bambalapitiya, Colombo 04',
    distance: '1.4 km away',
    rating: 4.9,
    reviews: 284,
    pricePerHour: 3400,
    environment: 'Indoor Draft-Free',
    surface: 'BWF 7mm PVC Sprung Mat',
    surfaceColor: 0x0f766e,
    dimensions: '13.40m × 6.10m',
    dimensionsSpec: {
      length: '13.40 m',
      width: '6.10 m',
      height: '12.0 m',
      netLabel: 'Net Height',
      netHeight: '1.55 m'
    },
    lighting: '700 Lux Side-Anti-Glare',
    bays: ['Mat Court 1', 'Mat Court 2'],
    coords: [6.8925, 79.8562],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80',
    description: 'Draft-free championship badminton hall with BWF-certified 7mm shock-absorbing mats over sprung teak wooden subfloors.',
    amenities: ['BWF Grade-1 Mats', 'Zero-Draft AC', '12m Ceiling', 'Restringing Bar'],
    bookingTerms: [
      'Gum-sole or BWF non-marking badminton shoes strictly enforced',
      'Zero-draft ducted AC ensures true shuttlecock flight',
      'Max 6 players per court booking',
      'Free cancellation up to 6 hours before session'
    ]
  },
  {
    id: 'bd-shuttle-central',
    sportId: 'badminton',
    name: 'FeatherFlight Indoor Arena',
    area: 'Nugegoda',
    address: '118 High Level Road, Nugegoda',
    distance: '3.6 km away',
    rating: 4.8,
    reviews: 205,
    pricePerHour: 2800,
    environment: 'Indoor Hall',
    surface: 'Li-Ning Pro Cushion Mat',
    surfaceColor: 0x15803d,
    dimensions: '13.40m × 6.10m',
    dimensionsSpec: {
      length: '13.40 m',
      width: '6.10 m',
      height: '10.5 m',
      netLabel: 'Net Height',
      netHeight: '1.55 m'
    },
    lighting: '600 Lux Side-Row LEDs',
    bays: ['Court 1', 'Court 2'],
    coords: [6.8728, 79.8886],
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=900&q=80',
    description: 'High-ceiling badminton complex with anti-slip Li-Ning synthetic mats, side-mounted BWF lighting, and warm-up stretching zones.',
    amenities: ['Pro Cushion Mats', 'Shuttle Dispensers', 'Changing Rooms', 'Free Parking'],
    bookingTerms: [
      'Barefoot play or marking running shoes not permitted',
      'Feather & nylon shuttlecocks available at vending kiosk',
      'Reschedule anytime up to 4 hours before slot',
      'Dedicated warm-up lane open 15 minutes before slot'
    ]
  },
  {
    id: 'bd-royal-shuttle',
    sportId: 'badminton',
    name: 'Cinnamon Gardens Badminton Club',
    area: 'Colombo 07',
    address: '74 Reid Avenue, Colombo 07',
    distance: '1.0 km away',
    rating: 4.9,
    reviews: 229,
    pricePerHour: 3800,
    environment: 'Indoor AC VIP',
    surface: 'Olympic Taraflex Floor',
    surfaceColor: 0x6d28d9,
    dimensions: '13.40m × 6.10m',
    dimensionsSpec: {
      length: '13.40 m',
      width: '6.10 m',
      height: '12.5 m',
      netLabel: 'Net Height',
      netHeight: '1.55 m'
    },
    lighting: '750 Lux Non-Dazzle',
    bays: ['VIP Court 1', 'VIP Court 2'],
    coords: [6.9022, 79.8634],
    image: 'https://images.unsplash.com/photo-1613918431703-aa50889e3be9?auto=format&fit=crop&w=900&q=80',
    description: 'Exclusive air-conditioned badminton venue with Olympic Taraflex flooring, non-dazzle broadcast arrays, and private lounge seating.',
    amenities: ['Olympic Taraflex', 'Private Lounge', 'Towel Service', 'Valet'],
    bookingTerms: [
      'Non-marking indoor court shoes mandatory for all guests',
      'Complimentary towel & locker key issued at check-in',
      'Free cancellation up to 12 hours prior',
      'Yonex Aerosensa feather tubes available at pro counter'
    ]
  },
  {
    id: 'bd-metro-hall',
    sportId: 'badminton',
    name: 'AeroDrop Badminton Center',
    area: 'Colombo 05',
    address: '204 Thimbirigasyaya Road, Colombo 05',
    distance: '2.0 km away',
    rating: 4.8,
    reviews: 178,
    pricePerHour: 3100,
    environment: 'Indoor Pro Hall',
    surface: 'Victor 6.5mm Elite Mat',
    surfaceColor: 0x1d4ed8,
    dimensions: '13.40m × 6.10m',
    dimensionsSpec: {
      length: '13.40 m',
      width: '6.10 m',
      height: '11.2 m',
      netLabel: 'Net Height',
      netHeight: '1.55 m'
    },
    lighting: '650 Lux BWF Side-LED',
    bays: ['Victor Court 1', 'Victor Court 2'],
    coords: [6.8908, 79.8664],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80',
    description: 'Tournament-ready Victor Elite synthetic courts with shock-cushion wood subfloors and zero-glare side lighting.',
    amenities: ['Victor Elite Mats', 'Pro Grip Bar', 'Showers', 'Parking'],
    bookingTerms: [
      'Clean non-marking badminton shoes required before stepping on mat',
      'Instant digital booking confirmation & gate PIN',
      'Free reschedule up to 6 hours before play',
      'Racquet rental available at LKR 800 per pair'
    ]
  }
];

const TIME_SLOTS_OPTIONS = [
  { id: '07:00', label: '07:00 AM' },
  { id: '09:00', label: '09:00 AM' },
  { id: '16:00', label: '04:00 PM' },
  { id: '17:00', label: '05:00 PM' },
  { id: '18:00', label: '06:00 PM' },
  { id: '20:00', label: '08:00 PM' }
];

/* ============================================================================
   3. APPLICATION STATE
   ============================================================================ */
const appState = {
  currentView: 'hub', // 'hub' | 'courtScene' | 'expandedCourt' | 'checkout'
  isTransitioning: false,
  selectedSportId: null,
  selectedCourtId: null,
  booking: {
    dayOffset: 0,
    dayLabel: 'Today',
    bayName: '',
    timeSlot: '18:00',
    timeSlotLabel: '06:00 PM',
    equipmentAddon: false,
    paymentMethod: 'Google Pay / Card'
  },
  leafletMap: null,
  leafletMarker: null
};

/* ============================================================================
   4. EASING FUNCTIONS FOR 3D ACTION & TRANSITION ANIMATIONS
   ============================================================================ */
const Easing = {
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  },
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  easeInBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  }
};

/* ============================================================================
   5. THREE.JS SCENE & PARTICLE SYSTEM MANAGER
   ============================================================================ */
const scene3D = {
  ready: false,
  canvas: null,
  renderer: null,
  scene: null,
  camera: null,
  raycaster: null,
  pointerNDC: null,
  pointerWorld: null,
  clock: null,
  particleTexture: null,

  // Scene Roots
  hubGroup: null,
  shockwaveGroup: null,

  // Particle Systems
  ambientParticles: null,
  burstSystem: null,

  // 4 Sport interactive entries
  sportEntries: [],
  hoveredEntry: null,

  // Active Click Approach Animation State (~1.35 seconds)
  activeClickAnim: null,

  // Camera target interpolation
  cameraState: {
    currentPos: null,
    targetPos: null,
    currentLookAt: null,
    targetLookAt: null
  }
};

/**
 * Create a soft radial glow texture for Three.js particle systems.
 */
function createParticleGlowTexture() {
  if (typeof document === 'undefined' || !document.createElement) return null;
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  if (!canvas.getContext) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Build the global Ambient 3D Floating Particle Field.
 */
function initAmbientParticleField() {
  const count = 340;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  const palette = [
    new THREE.Color(0x1a73e8),
    new THREE.Color(0x1e8e3e),
    new THREE.Color(0xf9ab00),
    new THREE.Color(0x9334e6),
    new THREE.Color(0x38bdf8)
  ];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 26;
    const y = -2.2 + Math.random() * 8.5;
    const z = (Math.random() - 0.5) * 14;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;

    const c = palette[i % palette.length];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.24,
    map: scene3D.particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.NormalBlending
  });

  const points = new THREE.Points(geometry, material);
  scene3D.scene.add(points);

  scene3D.ambientParticles = {
    points,
    geometry,
    positions,
    basePositions,
    phases,
    count
  };
}

/**
 * Build the Dynamic 3D Burst & Comet Trail Particle Emitter Pool.
 */
function initBurstParticleSystem() {
  const maxCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(maxCount * 3);
  const colors = new Float32Array(maxCount * 3);

  for (let i = 0; i < maxCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = -999;
    positions[i * 3 + 2] = 0;
    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.34,
    map: scene3D.particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  scene3D.scene.add(points);

  scene3D.burstSystem = {
    points,
    geometry,
    positions,
    colors,
    velocities: Array.from({ length: maxCount }, () => new THREE.Vector3()),
    ages: new Float32Array(maxCount),
    lifetimes: new Float32Array(maxCount),
    activeFlags: new Uint8Array(maxCount),
    cursor: 0,
    maxCount
  };
}

function emitParticleBurst(worldOrigin, colorHex, count = 40, speedMin = 1.8, speedMax = 6.5, lifetime = 0.85) {
  const sys = scene3D.burstSystem;
  if (!sys) return;

  const baseColor = new THREE.Color(colorHex);
  const whiteColor = new THREE.Color(0xffffff);

  for (let n = 0; n < count; n++) {
    const idx = sys.cursor;
    sys.cursor = (sys.cursor + 1) % sys.maxCount;

    sys.activeFlags[idx] = 1;
    sys.ages[idx] = 0;
    sys.lifetimes[idx] = lifetime * (0.65 + Math.random() * 0.55);

    sys.positions[idx * 3] = worldOrigin.x + (Math.random() - 0.5) * 0.35;
    sys.positions[idx * 3 + 1] = worldOrigin.y + (Math.random() - 0.5) * 0.35;
    sys.positions[idx * 3 + 2] = worldOrigin.z + (Math.random() - 0.5) * 0.35;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = speedMin + Math.random() * (speedMax - speedMin);
    sys.velocities[idx].set(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.sin(phi) * Math.sin(theta) * speed + 1.2,
      Math.cos(phi) * speed
    );

    const mixRatio = Math.random() * 0.45;
    const c = baseColor.clone().lerp(whiteColor, mixRatio);
    sys.colors[idx * 3] = c.r;
    sys.colors[idx * 3 + 1] = c.g;
    sys.colors[idx * 3 + 2] = c.b;
  }

  sys.geometry.attributes.position.needsUpdate = true;
  sys.geometry.attributes.color.needsUpdate = true;
}

function createSportVortexParticles(accentColorHex) {
  const count = 72;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const angles = new Float32Array(count);
  const radii = new Float32Array(count);
  const heights = new Float32Array(count);
  const speeds = new Float32Array(count);

  const baseColor = new THREE.Color(accentColorHex);
  const highlightColor = new THREE.Color(0xffffff);

  for (let i = 0; i < count; i++) {
    angles[i] = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    radii[i] = 1.15 + Math.random() * 0.65;
    heights[i] = -1.35 + Math.random() * 2.7;
    speeds[i] = 0.8 + Math.random() * 1.4;

    positions[i * 3] = Math.cos(angles[i]) * radii[i];
    positions[i * 3 + 1] = heights[i];
    positions[i * 3 + 2] = Math.sin(angles[i]) * radii[i];

    const c = baseColor.clone().lerp(highlightColor, (i % 4) * 0.12);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.19,
    map: scene3D.particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  return {
    points,
    geometry,
    material,
    positions,
    angles,
    radii,
    heights,
    speeds,
    count
  };
}

function updateCameraDistance() {
  if (!scene3D.camera) return 11.8;
  const aspect = window.innerWidth / window.innerHeight;
  const desiredSpanX = 15.6;
  const fovRad = (scene3D.camera.fov * Math.PI) / 180;
  const requiredZ = desiredSpanX / (2 * Math.tan(fovRad / 2) * Math.max(0.6, aspect));
  return Math.max(11.8, Math.min(22.0, requiredZ));
}

function init3DExperience() {
  const canvas = document.getElementById('scene3DCanvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.error('Three.js or #scene3DCanvas not found.');
    return false;
  }
  scene3D.canvas = canvas;
  scene3D.pointerNDC = new THREE.Vector2(-99, -99);
  scene3D.pointerWorld = new THREE.Vector3(0, 0, 0);
  scene3D.clock = new THREE.Clock();
  scene3D.particleTexture = createParticleGlowTexture();

  const initialHubZ = 11.8;
  scene3D.cameraState.currentPos = new THREE.Vector3(0, 1.4, initialHubZ);
  scene3D.cameraState.targetPos = new THREE.Vector3(0, 1.4, initialHubZ);
  scene3D.cameraState.currentLookAt = new THREE.Vector3(0, 0.0, 0);
  scene3D.cameraState.targetLookAt = new THREE.Vector3(0, 0.0, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });
  } catch (err) {
    try {
      renderer = new THREE.WebGLRenderer({ canvas });
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return false;
    }
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (THREE.sRGBEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  scene3D.renderer = renderer;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f7fb);
  scene.fog = new THREE.FogExp2(0xf4f7fb, 0.02);
  scene3D.scene = scene;

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    120
  );
  camera.position.copy(scene3D.cameraState.currentPos);
  camera.lookAt(scene3D.cameraState.currentLookAt);
  scene3D.camera = camera;

  const responsiveZ = updateCameraDistance();
  scene3D.cameraState.currentPos.z = responsiveZ;
  scene3D.cameraState.targetPos.z = responsiveZ;
  camera.position.z = responsiveZ;

  scene3D.raycaster = new THREE.Raycaster();

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.82);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xe8f0fe, 0xd2e3fc, 0.45);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.92);
  dirLight.position.set(8, 16, 12);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 45;
  const d = 12;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.bias = -0.0005;
  scene.add(dirLight);

  const rimLight = new THREE.DirectionalLight(0xa8c7fa, 0.45);
  rimLight.position.set(-10, 6, -8);
  scene.add(rimLight);

  // Subtle floor grid
  const floorGeo = new THREE.PlaneGeometry(80, 80);
  const floorMat = new THREE.ShadowMaterial({ opacity: 0.11 });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -1.65;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  const gridHelper = new THREE.GridHelper(54, 36, 0xcad6e8, 0xe1e8f2);
  gridHelper.position.y = -1.66;
  scene.add(gridHelper);

  scene3D.hubGroup = new THREE.Group();
  scene.add(scene3D.hubGroup);

  scene3D.shockwaveGroup = new THREE.Group();
  scene.add(scene3D.shockwaveGroup);

  initAmbientParticleField();
  initBurstParticleSystem();
  buildSportHubModels();

  // Bind Pointer / Raycast & Resize Events
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('pointermove', onCanvasPointerMove);
  window.addEventListener('pointerdown', onCanvasPointerDown);

  scene3D.ready = true;
  requestAnimationFrame(animate3DLoop);
  return true;
}

/* ============================================================================
   6. PROCEDURAL LOW-POLY 3D SPORT MODELS & HOVER SECONDARY MODELS
   ============================================================================ */

function enableShadows(object3D) {
  object3D.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

function setGroupOpacity(group, alpha) {
  group.traverse((child) => {
    if (child.isMesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        if (!m.userData) m.userData = {};
        if (m.userData.baseOpacity === undefined) {
          m.userData.baseOpacity = m.opacity !== undefined ? m.opacity : 1;
        }
        m.transparent = true;
        m.opacity = m.userData.baseOpacity * alpha;
      });
    }
  });
}

function createFootballPrimaryModel() {
  const group = new THREE.Group();

  const coreGeo = new THREE.IcosahedronGeometry(0.92, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.32,
    metalness: 0.08,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVerts = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
  ];

  const patchGeo = new THREE.CylinderGeometry(0.28, 0.31, 0.06, 5);
  const patchMat = new THREE.MeshStandardMaterial({
    color: 0x171b24,
    roughness: 0.4,
    metalness: 0.15,
    flatShading: true
  });

  rawVerts.forEach(([vx, vy, vz]) => {
    const dir = new THREE.Vector3(vx, vy, vz).normalize();
    const patch = new THREE.Mesh(patchGeo, patchMat.clone());
    patch.position.copy(dir.clone().multiplyScalar(0.905));
    patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(patch);
  });

  const seamGeo = new THREE.TorusGeometry(0.915, 0.015, 8, 32);
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x1a73e8, roughness: 0.3 });
  const seam = new THREE.Mesh(seamGeo, seamMat);
  seam.rotation.x = Math.PI / 3;
  group.add(seam);

  enableShadows(group);
  return group;
}

function createFootballLegSecondaryModel() {
  const pivotGroup = new THREE.Group();

  const calfGeo = new THREE.CylinderGeometry(0.22, 0.16, 1.25, 10);
  const sockMat = new THREE.MeshStandardMaterial({
    color: 0x1a73e8,
    roughness: 0.45,
    flatShading: true
  });
  const calfMesh = new THREE.Mesh(calfGeo, sockMat);
  calfMesh.position.set(0, -0.55, 0);
  pivotGroup.add(calfMesh);

  const stripeGeo = new THREE.CylinderGeometry(0.215, 0.21, 0.08, 10);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const stripe1 = new THREE.Mesh(stripeGeo, whiteMat.clone());
  stripe1.position.set(0, -0.18, 0);
  const stripe2 = new THREE.Mesh(stripeGeo, whiteMat.clone());
  stripe2.position.set(0, -0.32, 0);
  pivotGroup.add(stripe1, stripe2);

  const ankleGeo = new THREE.SphereGeometry(0.18, 10, 10);
  const bootMainMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.3,
    metalness: 0.2,
    flatShading: true
  });
  const ankleMesh = new THREE.Mesh(ankleGeo, bootMainMat.clone());
  ankleMesh.position.set(0, -1.18, 0);
  pivotGroup.add(ankleMesh);

  const bootGroup = new THREE.Group();
  bootGroup.position.set(0, -1.26, 0);

  const upperBootGeo = new THREE.BoxGeometry(0.78, 0.26, 0.34);
  const upperBoot = new THREE.Mesh(upperBootGeo, bootMainMat.clone());
  upperBoot.position.set(0.22, 0, 0);
  bootGroup.add(upperBoot);

  const toeGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.32, 10);
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.25,
    metalness: 0.3,
    flatShading: true
  });
  const toeMesh = new THREE.Mesh(toeGeo, accentMat);
  toeMesh.rotation.z = Math.PI / 2;
  toeMesh.position.set(0.62, -0.02, 0);
  bootGroup.add(toeMesh);

  const soleGeo = new THREE.BoxGeometry(0.86, 0.06, 0.36);
  const soleMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3 });
  const soleMesh = new THREE.Mesh(soleGeo, soleMat);
  soleMesh.position.set(0.24, -0.15, 0);
  bootGroup.add(soleMesh);

  const studGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.09, 6);
  const studPositions = [
    [-0.08, -0.21, -0.1], [-0.08, -0.21, 0.1],
    [0.32, -0.21, -0.1], [0.32, -0.21, 0.1],
    [0.54, -0.21, -0.08], [0.54, -0.21, 0.08]
  ];
  studPositions.forEach(([sx, sy, sz]) => {
    const stud = new THREE.Mesh(studGeo, whiteMat.clone());
    stud.position.set(sx, sy, sz);
    bootGroup.add(stud);
  });

  pivotGroup.add(bootGroup);
  enableShadows(pivotGroup);
  return pivotGroup;
}

function createPickleballPrimaryModel() {
  const group = new THREE.Group();

  const shellGeo = new THREE.IcosahedronGeometry(0.86, 2);
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xc6ff00,
    roughness: 0.35,
    metalness: 0.05,
    flatShading: true
  });
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  group.add(shellMesh);

  const holeCount = 26;
  const holeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.08, 8);
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x2e4c00,
    roughness: 0.7
  });
  const rimGeo = new THREE.TorusGeometry(0.13, 0.02, 6, 12);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x9eea00,
    roughness: 0.3
  });

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < holeCount; i++) {
    const y = 1 - (i / (holeCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const dir = new THREE.Vector3(x, y, z).normalize();
    const hole = new THREE.Mesh(holeGeo, holeMat.clone());
    hole.position.copy(dir.clone().multiplyScalar(0.835));
    hole.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(hole);

    const rim = new THREE.Mesh(rimGeo, rimMat.clone());
    rim.position.copy(dir.clone().multiplyScalar(0.855));
    rim.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
    group.add(rim);
  }

  enableShadows(group);
  return group;
}

function createPickleballPaddleSecondaryModel() {
  const pivotGroup = new THREE.Group();

  const handleGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.68, 10);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6
  });
  const handleMesh = new THREE.Mesh(handleGeo, handleMat);
  handleMesh.position.set(0, 0.32, 0);
  pivotGroup.add(handleMesh);

  const capGeo = new THREE.CylinderGeometry(0.105, 0.095, 0.08, 10);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x1e8e3e, roughness: 0.3 });
  const capMesh = new THREE.Mesh(capGeo, capMat);
  capMesh.position.set(0, -0.02, 0);
  pivotGroup.add(capMesh);

  const faceGroup = new THREE.Group();
  faceGroup.position.set(0, 1.18, 0);

  const coreFaceGeo = new THREE.BoxGeometry(0.95, 1.18, 0.09);
  const coreFaceMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.35,
    metalness: 0.15
  });
  const coreFace = new THREE.Mesh(coreFaceGeo, coreFaceMat);
  faceGroup.add(coreFace);

  const edgeTopGeo = new THREE.BoxGeometry(1.01, 0.08, 0.12);
  const edgeSideGeo = new THREE.BoxGeometry(0.08, 1.22, 0.12);
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x1e8e3e,
    roughness: 0.25,
    metalness: 0.2
  });

  const topEdge = new THREE.Mesh(edgeTopGeo, edgeMat.clone());
  topEdge.position.y = 0.59;
  const botEdge = new THREE.Mesh(edgeTopGeo, edgeMat.clone());
  botEdge.position.y = -0.59;
  const leftEdge = new THREE.Mesh(edgeSideGeo, edgeMat.clone());
  leftEdge.position.x = -0.48;
  const rightEdge = new THREE.Mesh(edgeSideGeo, edgeMat.clone());
  rightEdge.position.x = 0.48;
  faceGroup.add(topEdge, botEdge, leftEdge, rightEdge);

  const zoneGeo = new THREE.BoxGeometry(0.55, 0.55, 0.102);
  const zoneMat = new THREE.MeshStandardMaterial({
    color: 0x34a853,
    roughness: 0.3
  });
  const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
  faceGroup.add(zoneMesh);

  pivotGroup.add(faceGroup);
  enableShadows(pivotGroup);
  return pivotGroup;
}

function createTennisBallPrimaryModel() {
  const group = new THREE.Group();

  const ballGeo = new THREE.IcosahedronGeometry(0.84, 3);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xd4e107,
    roughness: 0.65,
    metalness: 0.02,
    flatShading: true
  });
  const ballMesh = new THREE.Mesh(ballGeo, ballMat);
  group.add(ballMesh);

  const seamPoints = [];
  const steps = 96;
  const radius = 0.845;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = Math.cos(t) + 0.38 * Math.cos(3 * t);
    const y = Math.sin(t) - 0.38 * Math.sin(3 * t);
    const z = 1.18 * Math.sin(2 * t);
    const pt = new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius);
    seamPoints.push(pt);
  }
  const seamCurve = new THREE.CatmullRomCurve3(seamPoints, true);
  const seamGeo = new THREE.TubeGeometry(seamCurve, 96, 0.042, 8, true);
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35
  });
  const seamMesh = new THREE.Mesh(seamGeo, seamMat);
  group.add(seamMesh);

  enableShadows(group);
  return group;
}

function createTennisRacketSecondaryModel() {
  const pivotGroup = new THREE.Group();

  const handleGeo = new THREE.CylinderGeometry(0.075, 0.085, 0.72, 8);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.55
  });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(0, 0.36, 0);
  pivotGroup.add(handle);

  const throatMat = new THREE.MeshStandardMaterial({
    color: 0xf9ab00,
    roughness: 0.28,
    metalness: 0.25
  });
  const strutGeo = new THREE.CylinderGeometry(0.04, 0.045, 0.52, 8);
  const leftStrut = new THREE.Mesh(strutGeo, throatMat.clone());
  leftStrut.position.set(-0.14, 0.9, 0);
  leftStrut.rotation.z = 0.32;

  const rightStrut = new THREE.Mesh(strutGeo, throatMat.clone());
  rightStrut.position.set(0.14, 0.9, 0);
  rightStrut.rotation.z = -0.32;
  pivotGroup.add(leftStrut, rightStrut);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.65, 0);
  headGroup.scale.set(0.86, 1.12, 1);

  const hoopGeo = new THREE.TorusGeometry(0.56, 0.055, 10, 32);
  const hoopMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.3
  });
  const hoopMesh = new THREE.Mesh(hoopGeo, hoopMat);
  headGroup.add(hoopMesh);

  const accentArcGeo = new THREE.TorusGeometry(0.56, 0.06, 10, 16, Math.PI * 0.55);
  const accentArcLeft = new THREE.Mesh(accentArcGeo, throatMat.clone());
  accentArcLeft.rotation.z = Math.PI * 0.72;
  const accentArcRight = new THREE.Mesh(accentArcGeo, throatMat.clone());
  accentArcRight.rotation.z = -Math.PI * 0.28;
  headGroup.add(accentArcLeft, accentArcRight);

  const stringMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.2,
    opacity: 0.85,
    transparent: true
  });
  for (let i = -3; i <= 3; i++) {
    const offset = i * 0.12;
    const len = Math.sqrt(Math.max(0.05, 0.54 * 0.54 - offset * offset)) * 1.95;

    const vGeo = new THREE.CylinderGeometry(0.008, 0.008, len, 4);
    const vMesh = new THREE.Mesh(vGeo, stringMat.clone());
    vMesh.position.x = offset;
    headGroup.add(vMesh);

    const hGeo = new THREE.CylinderGeometry(0.008, 0.008, len, 4);
    const hMesh = new THREE.Mesh(hGeo, stringMat.clone());
    hMesh.rotation.z = Math.PI / 2;
    hMesh.position.y = offset;
    headGroup.add(hMesh);
  }

  pivotGroup.add(headGroup);
  enableShadows(pivotGroup);
  return pivotGroup;
}

function createShuttlecockPrimaryModel() {
  const group = new THREE.Group();

  const shuttleInner = new THREE.Group();
  shuttleInner.rotation.z = 0.22;
  shuttleInner.position.y = -0.15;

  const corkGeo = new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const corkMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.35
  });
  const corkMesh = new THREE.Mesh(corkGeo, corkMat);
  corkMesh.position.y = -0.35;
  shuttleInner.add(corkMesh);

  const bandGeo = new THREE.CylinderGeometry(0.33, 0.32, 0.12, 16);
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x9334e6,
    roughness: 0.3
  });
  const bandMesh = new THREE.Mesh(bandGeo, bandMat);
  bandMesh.position.y = -0.31;
  shuttleInner.add(bandMesh);

  const featherCount = 16;
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    side: THREE.DoubleSide,
    flatShading: true
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.4
  });

  for (let i = 0; i < featherCount; i++) {
    const angle = (i / featherCount) * Math.PI * 2;
    const featherPivot = new THREE.Group();
    featherPivot.rotation.y = angle;
    featherPivot.position.y = -0.26;

    const featherHolder = new THREE.Group();
    featherHolder.position.x = 0.29;
    featherHolder.rotation.z = -0.36;

    const stemGeo = new THREE.CylinderGeometry(0.014, 0.018, 0.95, 6);
    const stem = new THREE.Mesh(stemGeo, stemMat.clone());
    stem.position.y = 0.47;
    featherHolder.add(stem);

    const vaneGeo = new THREE.BoxGeometry(0.02, 0.62, 0.21);
    const vane = new THREE.Mesh(vaneGeo, featherMat.clone());
    vane.position.y = 0.65;
    vane.rotation.y = 0.18;
    featherHolder.add(vane);

    featherPivot.add(featherHolder);
    shuttleInner.add(featherPivot);
  }

  const ring1Geo = new THREE.TorusGeometry(0.45, 0.018, 8, 24);
  const ring1 = new THREE.Mesh(ring1Geo, stemMat.clone());
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 0.08;
  shuttleInner.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(0.58, 0.016, 8, 24);
  const ring2 = new THREE.Mesh(ring2Geo, bandMat.clone());
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = 0.36;
  shuttleInner.add(ring2);

  group.add(shuttleInner);
  enableShadows(group);
  return group;
}

function createBadmintonRacketSecondaryModel() {
  const pivotGroup = new THREE.Group();

  const handleGeo = new THREE.CylinderGeometry(0.055, 0.062, 0.62, 8);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5
  });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(0, 0.31, 0);
  pivotGroup.add(handle);

  const shaftGeo = new THREE.CylinderGeometry(0.022, 0.025, 0.72, 8);
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0x9334e6,
    roughness: 0.25,
    metalness: 0.4
  });
  const shaft = new THREE.Mesh(shaftGeo, shaftMat.clone());
  shaft.position.set(0, 0.96, 0);
  pivotGroup.add(shaft);

  const tJointGeo = new THREE.BoxGeometry(0.12, 0.08, 0.05);
  const tJoint = new THREE.Mesh(tJointGeo, shaftMat.clone());
  tJoint.position.set(0, 1.32, 0);
  pivotGroup.add(tJoint);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.84, 0);
  headGroup.scale.set(0.84, 1.08, 1);

  const frameGeo = new THREE.TorusGeometry(0.48, 0.036, 10, 32);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.25,
    metalness: 0.35
  });
  const frameMesh = new THREE.Mesh(frameGeo, frameMat);
  headGroup.add(frameMesh);

  const topArcGeo = new THREE.TorusGeometry(0.48, 0.04, 10, 20, Math.PI * 0.75);
  const topArc = new THREE.Mesh(topArcGeo, shaftMat.clone());
  topArc.rotation.z = Math.PI * 0.125;
  headGroup.add(topArc);

  const stringMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    transparent: true,
    opacity: 0.82
  });
  for (let i = -3; i <= 3; i++) {
    const offset = i * 0.105;
    const len = Math.sqrt(Math.max(0.04, 0.46 * 0.46 - offset * offset)) * 1.95;

    const vStr = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, len, 4), stringMat.clone());
    vStr.position.x = offset;
    headGroup.add(vStr);

    const hStr = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, len, 4), stringMat.clone());
    hStr.rotation.z = Math.PI / 2;
    hStr.position.y = offset;
    headGroup.add(hStr);
  }

  pivotGroup.add(headGroup);
  enableShadows(pivotGroup);
  return pivotGroup;
}

/* ============================================================================
   7. BUILD THE 4 SPORT HUB STATIONS + VORTEX PARTICLE AURAS
   ============================================================================ */
function buildSportHubModels() {
  scene3D.sportEntries = [];

  SPORTS_CATALOG.forEach((sport, idx) => {
    const rootGroup = new THREE.Group();
    rootGroup.position.set(sport.stageX, 0.05, 0);
    scene3D.hubGroup.add(rootGroup);

    const pedGeo = new THREE.CylinderGeometry(1.38, 1.5, 0.14, 32);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05
    });
    const pedestalMesh = new THREE.Mesh(pedGeo, pedMat);
    pedestalMesh.position.y = -1.48;
    pedestalMesh.receiveShadow = true;
    pedestalMesh.castShadow = true;
    rootGroup.add(pedestalMesh);

    const ringGeo = new THREE.TorusGeometry(1.38, 0.035, 12, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: sport.accentColor,
      roughness: 0.3,
      emissive: sport.accentColor,
      emissiveIntensity: 0.18
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.4;
    rootGroup.add(ringMesh);

    const auraParticles = createSportVortexParticles(sport.accentColor);
    rootGroup.add(auraParticles.points);

    let primaryGroup;
    let secondaryGroup;
    const secondaryRestPos = new THREE.Vector3();
    const secondaryRestRot = new THREE.Euler();

    if (sport.id === 'futsal') {
      primaryGroup = createFootballPrimaryModel();
      secondaryGroup = createFootballLegSecondaryModel();
      secondaryRestPos.set(-1.35, 1.25, -0.25);
      secondaryRestRot.set(0.08, 0.22, -0.35);
    } else if (sport.id === 'pickleball') {
      primaryGroup = createPickleballPrimaryModel();
      secondaryGroup = createPickleballPaddleSecondaryModel();
      secondaryRestPos.set(1.22, -0.78, -0.2);
      secondaryRestRot.set(0.15, -0.35, -0.38);
    } else if (sport.id === 'tennis') {
      primaryGroup = createTennisBallPrimaryModel();
      secondaryGroup = createTennisRacketSecondaryModel();
      secondaryRestPos.set(1.28, -0.98, -0.22);
      secondaryRestRot.set(0.14, -0.32, -0.36);
    } else {
      primaryGroup = createShuttlecockPrimaryModel();
      secondaryGroup = createBadmintonRacketSecondaryModel();
      secondaryRestPos.set(1.25, -1.05, -0.22);
      secondaryRestRot.set(0.12, -0.3, -0.38);
    }

    primaryGroup.position.set(0, 0, 0);
    rootGroup.add(primaryGroup);

    secondaryGroup.position.copy(secondaryRestPos);
    secondaryGroup.rotation.copy(secondaryRestRot);
    secondaryGroup.scale.setScalar(0.001);
    setGroupOpacity(secondaryGroup, 0);
    secondaryGroup.visible = false;
    rootGroup.add(secondaryGroup);

    const hitGeo = new THREE.SphereGeometry(1.9, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({
      visible: false
    });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.set(0, -0.1, 0);
    hitMesh.userData.sportIndex = idx;
    rootGroup.add(hitMesh);

    rootGroup.userData.sportIndex = idx;
    primaryGroup.userData.sportIndex = idx;
    pedestalMesh.userData.sportIndex = idx;
    ringMesh.userData.sportIndex = idx;
    rootGroup.traverse((child) => {
      child.userData.sportIndex = idx;
    });

    scene3D.sportEntries.push({
      sport,
      index: idx,
      rootGroup,
      primaryGroup,
      secondaryGroup,
      auraParticles,
      hitMesh,
      pedestalMesh,
      ringMesh,
      hoverProgress: 0,
      restPos: rootGroup.position.clone(),
      secondaryRestPos,
      secondaryRestRot
    });
  });
}

/* ============================================================================
   8. HUB INTERACTION, CLICK ANIMATION & RENDER LOOP
   ============================================================================ */

function onWindowResize() {
  if (!scene3D.renderer || !scene3D.camera) return;
  scene3D.camera.aspect = window.innerWidth / window.innerHeight;
  scene3D.camera.updateProjectionMatrix();
  scene3D.renderer.setSize(window.innerWidth, window.innerHeight);

  if (appState.currentView === 'hub' && !scene3D.activeClickAnim) {
    scene3D.cameraState.targetPos.z = updateCameraDistance();
  }
}

function getIntersectedSportEntry(clientX, clientY) {
  if (!scene3D.canvas || !scene3D.camera || !scene3D.hubGroup) return null;
  const rect = scene3D.canvas.getBoundingClientRect();
  const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
  const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
  scene3D.pointerNDC.set(ndcX, ndcY);

  scene3D.raycaster.setFromCamera(scene3D.pointerNDC, scene3D.camera);

  const hitMeshes = scene3D.sportEntries.map((e) => e.hitMesh);
  let intersects = scene3D.raycaster.intersectObjects(hitMeshes, false);

  if (intersects.length === 0) {
    intersects = scene3D.raycaster.intersectObjects(scene3D.hubGroup.children, true);
  }

  for (let i = 0; i < intersects.length; i++) {
    let obj = intersects[i].object;
    while (obj && obj !== scene3D.hubGroup) {
      if (obj.userData && obj.userData.sportIndex !== undefined) {
        return scene3D.sportEntries[obj.userData.sportIndex];
      }
      obj = obj.parent;
    }
  }
  return null;
}

/**
 * Tracks the pointer for particle repulsion everywhere, and handles sport hover on the hub.
 */
function onCanvasPointerMove(event) {
  if (!scene3D.canvas || !scene3D.pointerNDC) return;
  const rect = scene3D.canvas.getBoundingClientRect();
  scene3D.pointerNDC.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  scene3D.pointerNDC.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  scene3D.pointerWorld.set(scene3D.pointerNDC.x * 8.5, scene3D.pointerNDC.y * 4.5, 0);

  if (appState.currentView !== 'hub' || appState.isTransitioning || scene3D.activeClickAnim) return;

  const entry = getIntersectedSportEntry(event.clientX, event.clientY);
  if (entry) {
    if (scene3D.hoveredEntry !== entry) {
      scene3D.hoveredEntry = entry;
      scene3D.canvas.style.cursor = 'pointer';
      const summonOrigin = entry.rootGroup.position.clone().add(entry.secondaryRestPos);
      emitParticleBurst(summonOrigin, entry.sport.accentColor, 28, 1.2, 3.8, 0.65);
    }
  } else if (scene3D.hoveredEntry !== null) {
    scene3D.hoveredEntry = null;
    scene3D.canvas.style.cursor = 'default';
  }
}

function onCanvasPointerDown(event) {
  if (appState.currentView !== 'hub' || appState.isTransitioning || scene3D.activeClickAnim) return;
  const entry = getIntersectedSportEntry(event.clientX, event.clientY);
  if (entry) {
    triggerSportClickAnimation(entry);
  }
}


function spawnImpactShockwave(worldPos, colorHex) {
  const ringGeo = new THREE.RingGeometry(0.25, 0.42, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });
  const mesh = new THREE.Mesh(ringGeo, ringMat);
  mesh.position.copy(worldPos);
  mesh.lookAt(scene3D.camera.position);
  mesh.userData = { birthTime: scene3D.clock.getElapsedTime() };
  scene3D.shockwaveGroup.add(mesh);
}

function triggerSportClickAnimation(entry) {
  scene3D.canvas.style.cursor = 'default';

  entry.secondaryGroup.visible = true;
  entry.hoverProgress = 1;
  entry.secondaryGroup.scale.setScalar(1);
  setGroupOpacity(entry.secondaryGroup, 1);

  const camWorldTarget = new THREE.Vector3(0, 1.35, 9.2);
  const localTarget = camWorldTarget.clone().sub(entry.rootGroup.position);

  scene3D.activeClickAnim = {
    entry,
    startTime: scene3D.clock.getElapsedTime(),
    strikeDuration: 0.25,
    totalDuration: 1.38,
    localTarget,
    shockwaveSpawned: false,
    transitionTriggered: false
  };
}

function updateParticleSystems(elapsed, deltaDt) {
  const amb = scene3D.ambientParticles;
  if (amb) {
    const posArr = amb.positions;
    const baseArr = amb.basePositions;
    const phases = amb.phases;
    const pw = scene3D.pointerWorld;

    for (let i = 0; i < amb.count; i++) {
      const i3 = i * 3;
      const ph = phases[i];

      let x = baseArr[i3] + Math.sin(elapsed * 0.65 + ph) * 0.45;
      let y = baseArr[i3 + 1] + Math.cos(elapsed * 0.8 + ph * 1.3) * 0.38;
      const z = baseArr[i3 + 2] + Math.sin(elapsed * 0.5 + ph * 0.7) * 0.35;

      const dx = x - pw.x;
      const dy = y - pw.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 6.5 && distSq > 0.001) {
        const force = (1 - distSq / 6.5) * 0.55;
        x += (dx / Math.sqrt(distSq)) * force;
        y += (dy / Math.sqrt(distSq)) * force;
      }

      posArr[i3] = x;
      posArr[i3 + 1] = y;
      posArr[i3 + 2] = z;
    }
    amb.geometry.attributes.position.needsUpdate = true;
  }

  const sys = scene3D.burstSystem;
  if (sys) {
    let anyActive = false;
    for (let i = 0; i < sys.maxCount; i++) {
      if (!sys.activeFlags[i]) continue;
      anyActive = true;

      sys.ages[i] += deltaDt;
      if (sys.ages[i] >= sys.lifetimes[i]) {
        sys.activeFlags[i] = 0;
        sys.positions[i * 3 + 1] = -999;
        continue;
      }

      const v = sys.velocities[i];
      v.multiplyScalar(0.96);
      v.y -= 2.4 * deltaDt;

      sys.positions[i * 3] += v.x * deltaDt;
      sys.positions[i * 3 + 1] += v.y * deltaDt;
      sys.positions[i * 3 + 2] += v.z * deltaDt;
    }
    if (anyActive) {
      sys.geometry.attributes.position.needsUpdate = true;
    }
  }
}

let lastFrameTime = 0;

function animate3DLoop() {
  requestAnimationFrame(animate3DLoop);

  const elapsed = scene3D.clock.getElapsedTime();
  const deltaDt = Math.min(0.05, Math.max(0.001, elapsed - lastFrameTime));
  lastFrameTime = elapsed;

  updateParticleSystems(elapsed, deltaDt);

  // 1. Update active impact shockwaves
  for (let i = scene3D.shockwaveGroup.children.length - 1; i >= 0; i--) {
    const sw = scene3D.shockwaveGroup.children[i];
    const age = elapsed - sw.userData.birthTime;
    if (age > 0.55) {
      scene3D.shockwaveGroup.remove(sw);
    } else {
      const p = age / 0.55;
      const scale = 1 + Easing.easeOutCubic(p) * 5.2;
      sw.scale.setScalar(scale);
      sw.material.opacity = (1 - p) * 0.85;
    }
  }

  // 2. Smoothly interpolate camera position & lookAt
  scene3D.cameraState.currentPos.lerp(scene3D.cameraState.targetPos, 0.09);
  scene3D.cameraState.currentLookAt.lerp(scene3D.cameraState.targetLookAt, 0.09);
  scene3D.camera.position.copy(scene3D.cameraState.currentPos);
  scene3D.camera.lookAt(scene3D.cameraState.currentLookAt);

  // 3. Hub View: Update 4 Sport Models, Hover Secondary Models & Click Approach Animation
  if (scene3D.hubGroup.visible) {
    const clickAnim = scene3D.activeClickAnim;

    scene3D.sportEntries.forEach((entry, idx) => {
      const isClickedEntry = clickAnim && clickAnim.entry === entry;
      const isHovered = !clickAnim && scene3D.hoveredEntry === entry;

      const aura = entry.auraParticles;
      if (aura) {
        const spinMult = isHovered ? 3.2 : 1.0;
        const radiusMult = isHovered ? 1.18 : 0.95;
        for (let p = 0; p < aura.count; p++) {
          aura.angles[p] += aura.speeds[p] * deltaDt * spinMult;
          if (isHovered) {
            aura.heights[p] += deltaDt * 1.8;
            if (aura.heights[p] > 1.65) aura.heights[p] = -1.35;
          }
          const r = aura.radii[p] * radiusMult;
          aura.positions[p * 3] = Math.cos(aura.angles[p]) * r;
          aura.positions[p * 3 + 1] =
            aura.heights[p] + Math.sin(elapsed * 2.2 + p) * 0.08;
          aura.positions[p * 3 + 2] = Math.sin(aura.angles[p]) * r;
        }
        aura.geometry.attributes.position.needsUpdate = true;
        aura.material.size = THREE.MathUtils.lerp(aura.material.size, isHovered ? 0.3 : 0.18, 0.12);
        aura.material.opacity = THREE.MathUtils.lerp(aura.material.opacity, isHovered ? 0.95 : 0.48, 0.12);
      }

      if (!isClickedEntry) {
        const bobOffset = Math.sin(elapsed * 2.1 + idx * 1.3) * 0.14;
        entry.primaryGroup.position.set(0, bobOffset, 0);
        entry.primaryGroup.rotation.y = elapsed * 0.55 + idx * 0.6;
        entry.primaryGroup.rotation.x = Math.sin(elapsed * 1.2 + idx) * 0.12;

        const targetPrimaryScale = isHovered ? 1.12 : (clickAnim ? 0.82 : 1.0);
        const currentScale = entry.primaryGroup.scale.x;
        entry.primaryGroup.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetPrimaryScale, 0.12));

        entry.ringMesh.scale.setScalar(THREE.MathUtils.lerp(entry.ringMesh.scale.x, isHovered ? 1.12 : 1.0, 0.12));

        const targetHover = isHovered ? 1 : 0;
        entry.hoverProgress = THREE.MathUtils.lerp(entry.hoverProgress, targetHover, 0.14);

        if (entry.hoverProgress > 0.01) {
          entry.secondaryGroup.visible = true;
          const easedHover = Easing.easeOutBack(Math.min(1, entry.hoverProgress));
          entry.secondaryGroup.scale.setScalar(Math.max(0.001, easedHover));
          setGroupOpacity(entry.secondaryGroup, Math.min(1, entry.hoverProgress * 1.15));

          const readySway = Math.sin(elapsed * 3.6) * 0.08;
          entry.secondaryGroup.position.set(
            entry.secondaryRestPos.x,
            entry.secondaryRestPos.y + readySway * 0.5,
            entry.secondaryRestPos.z
          );
          entry.secondaryGroup.rotation.set(
            entry.secondaryRestRot.x,
            entry.secondaryRestRot.y,
            entry.secondaryRestRot.z + readySway
          );
        } else {
          entry.secondaryGroup.visible = false;
          entry.secondaryGroup.scale.setScalar(0.001);
          setGroupOpacity(entry.secondaryGroup, 0);
        }
      }
    });

    if (clickAnim) {
      const { entry, startTime, strikeDuration, totalDuration, localTarget } = clickAnim;
      const dt = elapsed - startTime;

      const strikeT = Math.min(1, dt / strikeDuration);
      const strikeEase = Easing.easeInBack(strikeT);

      if (entry.sport.id === 'futsal') {
        entry.secondaryGroup.position.x = THREE.MathUtils.lerp(entry.secondaryRestPos.x, -0.35, strikeEase);
        entry.secondaryGroup.position.z = THREE.MathUtils.lerp(entry.secondaryRestPos.z, 0.2, strikeEase);
        entry.secondaryGroup.rotation.z = THREE.MathUtils.lerp(entry.secondaryRestRot.z, 0.72, strikeEase);
      } else {
        entry.secondaryGroup.position.x = THREE.MathUtils.lerp(entry.secondaryRestPos.x, 0.28, strikeEase);
        entry.secondaryGroup.position.z = THREE.MathUtils.lerp(entry.secondaryRestPos.z, 0.25, strikeEase);
        entry.secondaryGroup.rotation.z = THREE.MathUtils.lerp(entry.secondaryRestRot.z, 0.48, strikeEase);
        entry.secondaryGroup.rotation.y = THREE.MathUtils.lerp(entry.secondaryRestRot.y, 0.35, strikeEase);
      }

      if (dt >= strikeDuration * 0.85) {
        if (!clickAnim.shockwaveSpawned) {
          clickAnim.shockwaveSpawned = true;
          const impactWorldPos = entry.rootGroup.position.clone();
          spawnImpactShockwave(impactWorldPos, entry.sport.accentColor);
          emitParticleBurst(impactWorldPos, entry.sport.accentColor, 95, 2.8, 9.5, 1.05);
        }

        const flightElapsed = dt - strikeDuration * 0.85;
        const flightDuration = totalDuration - strikeDuration * 0.85;
        const flightT = Math.min(1, flightElapsed / flightDuration);

        const posEase = Easing.easeInOutCubic(flightT);
        const scaleEase = Easing.easeInExpo(flightT);

        entry.primaryGroup.position.x = THREE.MathUtils.lerp(0, localTarget.x, posEase);
        entry.primaryGroup.position.y =
          THREE.MathUtils.lerp(0, localTarget.y, posEase) + Math.sin(flightT * Math.PI) * 1.15;
        entry.primaryGroup.position.z = THREE.MathUtils.lerp(0, localTarget.z, posEase);

        const approachScale = 1.12 + scaleEase * 12.4;
        entry.primaryGroup.scale.setScalar(approachScale);

        entry.primaryGroup.rotation.x += 0.16;
        entry.primaryGroup.rotation.y += 0.22;

        const currentWorldBallPos = entry.rootGroup.position.clone().add(entry.primaryGroup.position);
        emitParticleBurst(currentWorldBallPos, entry.sport.accentColor, 5, 0.6, 2.6, 0.48);

        const fadeOut = Math.max(0, 1 - flightT * 2.2);
        setGroupOpacity(entry.secondaryGroup, fadeOut);

        if (flightT >= 0.78 && !clickAnim.transitionTriggered) {
          clickAnim.transitionTriggered = true;
          const overlay = document.getElementById('pageTransitionOverlay');
          if (overlay) overlay.classList.add('active');
        }

        if (flightT >= 1) {
          const selectedSportId = entry.sport.id;
          scene3D.activeClickAnim = null;
          resetHubModelsToRest();
          enterCourtScenePage(selectedSportId);
        }
      }
    }
  }

  scene3D.renderer.render(scene3D.scene, scene3D.camera);
}

function resetHubModelsToRest() {
  scene3D.sportEntries.forEach((entry) => {
    entry.primaryGroup.position.set(0, 0, 0);
    entry.primaryGroup.scale.setScalar(1);
    entry.hoverProgress = 0;
    entry.secondaryGroup.visible = false;
    entry.secondaryGroup.scale.setScalar(0.001);
    entry.secondaryGroup.position.copy(entry.secondaryRestPos);
    entry.secondaryGroup.rotation.copy(entry.secondaryRestRot);
    setGroupOpacity(entry.secondaryGroup, 0);
  });
}

/* ============================================================================
   9. SHARED UI HELPERS
   ============================================================================ */
const ADDON_FEE_LKR = 800;
const SERVICE_FEE_LKR = 250;
const VIEW_IDS = ['view3DSports', 'viewCourtScene', 'viewExpandedCourt', 'viewCheckout'];

const byId = (id) => document.getElementById(id);

function setText(id, text) {
  const el = byId(id);
  if (el) el.textContent = text;
}

function formatLKR(amount) {
  return `LKR ${Math.round(amount).toLocaleString('en-US')}`;
}

function getSport(sportId) {
  return SPORTS_CATALOG.find((s) => s.id === sportId) || SPORTS_CATALOG[0];
}

function getCourt(courtId) {
  return COURTS_CATALOG.find((c) => c.id === courtId) || null;
}

function hexColor(num) {
  return `#${num.toString(16).padStart(6, '0')}`;
}

/**
 * Show one view and fully disable the others (hidden + inert), so invisible
 * pages can never intercept clicks, hover or keyboard focus.
 */
function showActiveViewSection(sectionId) {
  VIEW_IDS.forEach((id) => {
    const el = byId(id);
    if (!el) return;
    const isActive = id === sectionId;
    el.classList.toggle('active', isActive);
    el.setAttribute('aria-hidden', String(!isActive));
    el.inert = !isActive;
  });
}

function setTransitionOverlay(visible) {
  const overlay = byId('pageTransitionOverlay');
  if (overlay) overlay.classList.toggle('active', visible);
}

/* ============================================================================
   10. PAGE TRANSITIONS
   ============================================================================ */

/**
 * Enter the court-selection page for a sport (initial full-screen infinite grid).
 */
function enterCourtScenePage(sportId) {
  const sportObj = getSport(sportId);
  appState.selectedSportId = sportObj.id;
  appState.selectedCourtId = null;
  appState.currentView = 'courtScene';

  if (scene3D.ready) {
    scene3D.hubGroup.visible = false;
    scene3D.hoveredEntry = null;
    scene3D.canvas.style.cursor = 'default';
    scene3D.cameraState.targetPos.set(0, 2.2, 12.0);
    scene3D.cameraState.targetLookAt.set(0, 0, 0);
    emitParticleBurst(new THREE.Vector3(0, 1.5, 0), sportObj.accentColor, 65, 1.5, 5.5, 1.0);
  }

  setLayoutSelected(false);
  showActiveViewSection('viewCourtScene');
  renderCourtGrid(sportObj, null);

  setTimeout(() => {
    setTransitionOverlay(false);
    appState.isTransitioning = false;
  }, 180);
}

function returnTo3DSportsHub() {
  if (appState.currentView === 'hub' || appState.isTransitioning) return;
  appState.isTransitioning = true;
  setTransitionOverlay(true);

  setTimeout(() => {
    appState.currentView = 'hub';
    appState.selectedSportId = null;
    appState.selectedCourtId = null;
    setLayoutSelected(false);
    stopGridMomentum();

    if (scene3D.ready) {
      scene3D.hubGroup.visible = true;
      resetHubModelsToRest();
      scene3D.cameraState.targetPos.set(0, 1.4, updateCameraDistance());
      scene3D.cameraState.targetLookAt.set(0, 0, 0);
    }

    showActiveViewSection('view3DSports');

    setTimeout(() => {
      setTransitionOverlay(false);
      appState.isTransitioning = false;
    }, 180);
  }, 240);
}

/* ============================================================================
   11. INFINITE 2D COURT GRID (square tiles, horizontal + vertical wrap, drag-to-pan)
   ============================================================================ */
const courtGrid = {
  el: null,
  totalCols: 0,
  blockW: 0,
  blockH: 0,
  wrapX: false,
  sportId: null,
  excludedCourtId: null,
  suppressClick: false,
  pan: {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    velX: 0,
    velY: 0,
    raf: null
  }
};

/**
 * Expand a sport's courts into 2 tiles per venue (main + secondary bay) so each
 * repeating block of the infinite grid feels varied. Every tile maps to a real court.
 */
function buildGridTileItems(courts) {
  const mainTiles = courts.map((c) => ({
    court: c,
    title: c.name,
    price: c.pricePerHour
  }));
  const bayTiles = courts.map((c, i) => ({
    court: c,
    title: `${c.name} — ${c.bays[1] || c.bays[0]}`,
    price: c.pricePerHour + (i % 2 === 0 ? 400 : -200)
  }));
  return [...mainTiles, ...bayTiles];
}

function createCourtTile(item) {
  const { court, title, price } = item;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'court-image-card';
  btn.dataset.courtId = court.id;
  btn.style.setProperty('--tile-accent', hexColor(court.surfaceColor));
  btn.setAttribute('aria-label', `${title}, ${court.surface}, ${formatLKR(price)} per hour`);
  btn.innerHTML = `
    <img src="${court.image}" alt="" class="court-card-photo" draggable="false" />
    <span class="court-card-overlay" aria-hidden="true">
      <span class="overlay-top-row">
        <span class="overlay-surface-pill">${court.surface}</span>
        <span class="overlay-rating-pill">★ ${court.rating.toFixed(1)}</span>
      </span>
      <span class="overlay-bottom-info">
        <span class="overlay-title-group">
          <strong class="overlay-court-name">${title}</strong>
          <span class="overlay-court-sub">📍 ${court.area} · ${court.environment}</span>
        </span>
        <span class="overlay-price-badge">${formatLKR(price)} / hr</span>
      </span>
    </span>
  `;
  return btn;
}

function readTileSizePx(gridEl) {
  if (typeof window === 'undefined' || !window.getComputedStyle) return 296;
  const cs = window.getComputedStyle(gridEl);
  const raw = cs ? cs.getPropertyValue('--tile-size') : '';
  const tile = parseFloat(raw) || 280;
  const gapRaw = cs ? cs.getPropertyValue('--tile-gap') : '';
  const gap = parseFloat(gapRaw) || 18;
  return tile + gap;
}

/**
 * Render the infinite grid.
 * - Initial state: a 2D wall of square tiles that wraps both horizontally and vertically.
 * - Selected state: the remaining courts in a 2-wide square grid that wraps vertically.
 */
function renderCourtGrid(sportObj, excludedCourtId) {
  const gridEl = courtGrid.el;
  if (!gridEl) return;

  courtGrid.sportId = sportObj.id;
  courtGrid.excludedCourtId = excludedCourtId;
  stopGridMomentum();

  const courts = COURTS_CATALOG.filter(
    (c) => c.sportId === sportObj.id && c.id !== excludedCourtId
  );
  const items = buildGridTileItems(courts);
  const isSelectedMode = Boolean(excludedCourtId);

  const cell = readTileSizePx(gridEl);
  const baseCols = isSelectedMode ? 2 : 4;
  const baseRows = isSelectedMode ? Math.ceil(items.length / baseCols) : 3;
  const blockWEstimate = baseCols * cell;
  const blockHEstimate = baseRows * cell;

  // Enough repeated blocks that the wrap thresholds (0.5–1.5 blocks) are always reachable.
  const repeatX = isSelectedMode ? 1 : Math.ceil(gridEl.clientWidth / blockWEstimate) + 3;
  const repeatY = Math.max(4, Math.ceil(gridEl.clientHeight / blockHEstimate) + 3);

  const totalCols = baseCols * repeatX;
  const totalRows = baseRows * repeatY;
  courtGrid.totalCols = totalCols;
  courtGrid.wrapX = !isSelectedMode;
  gridEl.style.setProperty('--grid-cols', String(totalCols));
  gridEl.classList.toggle('is-compact', isSelectedMode);

  const fragment = document.createDocumentFragment();
  for (let row = 0; row < totalRows; row++) {
    const baseRow = row % baseRows;
    for (let col = 0; col < totalCols; col++) {
      const baseCol = col % baseCols;
      // Shift each row so neighbouring tiles differ while the block stays periodic.
      const index = (baseRow * baseCols + baseCol + baseRow) % items.length;
      fragment.appendChild(createCourtTile(items[index]));
    }
  }
  gridEl.replaceChildren(fragment);

  // Measure the exact block size from real tile offsets, then start in the second block.
  requestAnimationFrame(() => {
    const tiles = gridEl.children;
    const first = tiles[0];
    if (!first) return;
    const nextBlockCol = tiles[baseCols];
    const nextBlockRow = tiles[baseRows * totalCols];
    courtGrid.blockW = courtGrid.wrapX && nextBlockCol ? nextBlockCol.offsetLeft - first.offsetLeft : 0;
    courtGrid.blockH = nextBlockRow ? nextBlockRow.offsetTop - first.offsetTop : 0;
    gridEl.scrollLeft = courtGrid.blockW;
    gridEl.scrollTop = courtGrid.blockH;
  });
}

function onCourtGridScroll() {
  const gridEl = courtGrid.el;
  const { blockW, blockH } = courtGrid;

  if (blockH > 0) {
    if (gridEl.scrollTop < blockH * 0.5) gridEl.scrollTop += blockH;
    else if (gridEl.scrollTop > blockH * 1.5) gridEl.scrollTop -= blockH;
  }
  if (courtGrid.wrapX && blockW > 0) {
    if (gridEl.scrollLeft < blockW * 0.5) gridEl.scrollLeft += blockW;
    else if (gridEl.scrollLeft > blockW * 1.5) gridEl.scrollLeft -= blockW;
  }
}

function stopGridMomentum() {
  const pan = courtGrid.pan;
  if (pan.raf) {
    cancelAnimationFrame(pan.raf);
    pan.raf = null;
  }
}

function runGridMomentum() {
  const pan = courtGrid.pan;
  if (pan.active || (Math.abs(pan.velX) < 0.3 && Math.abs(pan.velY) < 0.3)) {
    pan.raf = null;
    return;
  }
  courtGrid.el.scrollLeft -= pan.velX;
  courtGrid.el.scrollTop -= pan.velY;
  pan.velX *= 0.93;
  pan.velY *= 0.93;
  pan.raf = requestAnimationFrame(runGridMomentum);
}

/**
 * Mouse press-and-move panning with inertia. Touch and trackpads use native scrolling.
 */
function initCourtGridInteractions() {
  const gridEl = byId('courtsGrid');
  if (!gridEl) return;
  courtGrid.el = gridEl;
  const pan = courtGrid.pan;

  gridEl.addEventListener('scroll', onCourtGridScroll, { passive: true });
  gridEl.addEventListener('wheel', stopGridMomentum, { passive: true });
  gridEl.addEventListener('dragstart', (e) => e.preventDefault());

  // Hide broken images gracefully (tile falls back to its accent gradient).
  gridEl.addEventListener(
    'error',
    (e) => {
      if (e.target.tagName === 'IMG') e.target.classList.add('is-broken');
    },
    true
  );

  gridEl.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    stopGridMomentum();
    courtGrid.suppressClick = false;
    Object.assign(pan, {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      prevX: e.clientX,
      prevY: e.clientY,
      velX: 0,
      velY: 0
    });
  });

  window.addEventListener('pointermove', (e) => {
    if (!pan.active) return;
    const stepX = e.clientX - pan.prevX;
    const stepY = e.clientY - pan.prevY;
    pan.prevX = e.clientX;
    pan.prevY = e.clientY;

    if (!pan.moved && Math.hypot(e.clientX - pan.startX, e.clientY - pan.startY) > 5) {
      pan.moved = true;
      gridEl.classList.add('is-dragging');
    }
    if (pan.moved) {
      gridEl.scrollLeft -= stepX;
      gridEl.scrollTop -= stepY;
      pan.velX = pan.velX * 0.2 + stepX * 0.8;
      pan.velY = pan.velY * 0.2 + stepY * 0.8;
    }
  });

  const endPan = () => {
    if (!pan.active) return;
    pan.active = false;
    gridEl.classList.remove('is-dragging');
    if (pan.moved) {
      courtGrid.suppressClick = true;
      setTimeout(() => {
        courtGrid.suppressClick = false;
      }, 80);
      pan.raf = requestAnimationFrame(runGridMomentum);
    }
  };
  window.addEventListener('pointerup', endPan);
  window.addEventListener('pointercancel', endPan);

  // Delegated tile click.
  gridEl.addEventListener('click', (e) => {
    const tile = e.target.closest('.court-image-card');
    if (!tile) return;
    if (courtGrid.suppressClick) {
      courtGrid.suppressClick = false;
      return;
    }
    handleCourtCardSelect(tile.dataset.courtId, tile);
  });

  // Delegated arrow-key navigation across the 2D grid.
  gridEl.addEventListener('keydown', (e) => {
    const tile = e.target.closest('.court-image-card');
    if (!tile) return;
    const offsets = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: courtGrid.totalCols,
      ArrowUp: -courtGrid.totalCols
    };
    const offset = offsets[e.key];
    if (offset === undefined) return;
    const tiles = gridEl.children;
    const index = Array.prototype.indexOf.call(tiles, tile);
    const next = tiles[index + offset];
    if (next) {
      e.preventDefault();
      next.focus({ preventScroll: false });
    }
  });
}

/* ============================================================================
   12. COURT SELECTION & TOP-RIGHT INSPECTOR
   ============================================================================ */
const isoDiagram = {
  rotX: 52,
  rotZ: -28,
  dragging: false,
  prevX: 0,
  prevY: 0
};

function applyIsoRotation() {
  const plane = byId('isoCourtPlane');
  if (plane) plane.style.transform = `rotateX(${isoDiagram.rotX}deg) rotateZ(${isoDiagram.rotZ}deg)`;
}

function resetIsoRotation() {
  isoDiagram.rotX = 52;
  isoDiagram.rotZ = -28;
  applyIsoRotation();
}

function initIsoDiagramDrag() {
  const viewport = byId('topRight3DViewport');
  if (!viewport) return;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button')) return;
    isoDiagram.dragging = true;
    isoDiagram.prevX = e.clientX;
    isoDiagram.prevY = e.clientY;
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isoDiagram.dragging) return;
    isoDiagram.rotZ += (e.clientX - isoDiagram.prevX) * 0.45;
    isoDiagram.rotX = Math.max(20, Math.min(72, isoDiagram.rotX - (e.clientY - isoDiagram.prevY) * 0.35));
    isoDiagram.prevX = e.clientX;
    isoDiagram.prevY = e.clientY;
    applyIsoRotation();
  });

  const stop = () => {
    isoDiagram.dragging = false;
  };
  viewport.addEventListener('pointerup', stop);
  viewport.addEventListener('pointercancel', stop);
}

function setLayoutSelected(isSelected) {
  const layoutEl = byId('courtSelectionLayout');
  if (!layoutEl) return;
  layoutEl.classList.toggle('is-initial', !isSelected);
  layoutEl.classList.toggle('has-selection', isSelected);
  const inspector = byId('courtRightInspector');
  if (inspector) inspector.inert = !isSelected;
}

/**
 * Fly a snapshot of the clicked tile into the top-right inspector card.
 */
function animateCardToTopRightCorner(sourceEl, imageUrl) {
  const targetEl = byId('topRight3DViewport');
  if (!sourceEl || !targetEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = sourceEl.getBoundingClientRect();
  const end = targetEl.getBoundingClientRect();
  if (!start.width || !end.width) return;

  const clone = document.createElement('div');
  clone.className = 'flying-court-card-clone';
  Object.assign(clone.style, {
    left: `${start.left}px`,
    top: `${start.top}px`,
    width: `${start.width}px`,
    height: `${start.height}px`
  });
  clone.innerHTML = `<img src="${imageUrl}" alt="" />`;
  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: `${end.left}px`,
      top: `${end.top}px`,
      width: `${end.width}px`,
      height: `${end.height}px`,
      opacity: '0'
    });
  });
  setTimeout(() => clone.remove(), 480);
}

function handleCourtCardSelect(courtId, tileEl) {
  const court = getCourt(courtId);
  if (!court) return;
  const sportObj = getSport(court.sportId);

  // Capture the tile position before the layout changes.
  const sourceRect = tileEl ? tileEl.getBoundingClientRect() : null;
  const ghost = sourceRect ? { getBoundingClientRect: () => sourceRect } : null;

  appState.selectedCourtId = court.id;
  populateRightCourtInspector(court, sportObj);
  setLayoutSelected(true);
  renderCourtGrid(sportObj, court.id);
  animateCardToTopRightCorner(ghost, court.image);

  const title = byId('selectedCourtTitle');
  if (title) title.focus({ preventScroll: true });
}

function resetToInitialCourtGrid() {
  if (!appState.selectedSportId) return;
  appState.selectedCourtId = null;
  setLayoutSelected(false);
  renderCourtGrid(getSport(appState.selectedSportId), null);
}

function populateRightCourtInspector(court, sportObj) {
  const photo = byId('trSelectedCourtPhoto');
  if (photo) {
    photo.classList.remove('is-broken');
    photo.onerror = () => photo.classList.add('is-broken');
    photo.src = court.image;
  }

  const plane = byId('isoCourtPlane');
  if (plane) plane.style.setProperty('--iso-surface', hexColor(court.surfaceColor));
  resetIsoRotation();

  const dims = court.dimensionsSpec;
  setText('tr3DSportBadge', `${sportObj.shortName} · ${court.surface}`);
  setText('dimLengthVal', dims.length);
  setText('dimWidthVal', dims.width);
  setText('dimHeightVal', dims.height);
  setText('dimNetLabel', dims.netLabel);
  setText('dimNetVal', dims.netHeight);
  setText('isoDimLengthTag', `L ${dims.length}`);
  setText('isoDimWidthTag', `W ${dims.width}`);
  setText('isoDimNetTag', `${dims.netLabel} ${dims.netHeight}`);

  setText('selectedCourtTitle', court.name);
  setText(
    'selectedCourtLocation',
    `📍 ${court.address} (${court.distance}) · ★ ${court.rating.toFixed(1)} (${court.reviews} reviews)`
  );
  setText('selectedCourtPrice', formatLKR(court.pricePerHour));
  setText('selectedCourtDescription', court.description);
  setText('bookNowBtnPrice', `${formatLKR(court.pricePerHour)} / hr →`);

  const specsGrid = byId('selectedCourtSpecsGrid');
  if (specsGrid) {
    specsGrid.innerHTML = [
      ['Surface Type', court.surface],
      ['Environment', court.environment],
      ['Lighting', court.lighting]
    ]
      .map(([label, value]) => `<div class="spec-mini-card"><span>${label}</span><strong>${value}</strong></div>`)
      .join('');
  }

  const amenitiesEl = byId('selectedCourtAmenities');
  if (amenitiesEl) {
    amenitiesEl.innerHTML = court.amenities.map((a) => `<span class="amenity-tag">✓ ${a}</span>`).join('');
  }

  const termsEl = byId('selectedCourtBookingTerms');
  if (termsEl) {
    termsEl.innerHTML = court.bookingTerms.map((t) => `<li>${t}</li>`).join('');
  }

  const panel = byId('courtExpandedInfoPanel');
  if (panel) panel.scrollTop = 0;
}

/* ============================================================================
   13. SESSION & MAP BOOKING PAGE (opened by "Book Now")
   ============================================================================ */
function getSelectedCourt() {
  return getCourt(appState.selectedCourtId);
}

function openExpandedCourtView() {
  const court = getSelectedCourt();
  if (!court) return;
  const sportObj = getSport(court.sportId);

  appState.currentView = 'expandedCourt';
  const defaultSlot = TIME_SLOTS_OPTIONS[4];
  Object.assign(appState.booking, {
    dayOffset: 0,
    dayLabel: 'Today',
    bayName: court.bays[0],
    timeSlot: defaultSlot.id,
    timeSlotLabel: defaultSlot.label,
    equipmentAddon: false
  });

  setText('expandedCourtTitle', court.name);
  setText('expandedCourtRating', `★ ${court.rating.toFixed(1)}`);
  setText('expandedCourtEnv', court.environment);
  setText('expandedCourtLocation', `${court.address} · ${court.distance}`);
  setText('expandedCourtPrice', `${formatLKR(court.pricePerHour)} / hr`);
  setText('mapCardLabel', `${court.name} (${court.area})`);
  setText('addonEquipmentTitle', sportObj.equipmentAddon);

  const dirLink = byId('expandedDirectionsLink');
  if (dirLink) {
    dirLink.href = `https://www.google.com/maps/search/?api=1&query=${court.coords[0]},${court.coords[1]}`;
  }

  renderExpandedSessionOptions(court);
  updateExpandedPriceSummary(court);
  showActiveViewSection('viewExpandedCourt');
  requestAnimationFrame(() => renderCourtLeafletMap(court));
}

function renderChipGroup(containerId, options, isActive, onSelect) {
  const container = byId(containerId);
  if (!container) return;
  container.replaceChildren(
    ...options.map((opt) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      const active = isActive(opt);
      chip.className = `option-chip${active ? ' active' : ''}`;
      chip.setAttribute('aria-pressed', String(active));
      chip.textContent = opt.label;
      chip.addEventListener('click', () => onSelect(opt));
      return chip;
    })
  );
}

function getBookingDayOptions() {
  const inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  return [
    { offset: 0, label: 'Today' },
    { offset: 1, label: 'Tomorrow' },
    {
      offset: 2,
      label: inTwoDays.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  ];
}

function renderExpandedSessionOptions(court) {
  const booking = appState.booking;
  const rerender = () => {
    renderExpandedSessionOptions(court);
    updateExpandedPriceSummary(court);
  };

  renderChipGroup(
    'dayOptionsRow',
    getBookingDayOptions(),
    (d) => d.offset === booking.dayOffset,
    (d) => {
      booking.dayOffset = d.offset;
      booking.dayLabel = d.label;
      rerender();
    }
  );

  renderChipGroup(
    'courtBayOptions',
    court.bays.map((bay) => ({ label: bay })),
    (b) => b.label === booking.bayName,
    (b) => {
      booking.bayName = b.label;
      rerender();
    }
  );

  renderChipGroup(
    'timeSlotsGrid',
    TIME_SLOTS_OPTIONS,
    (s) => s.id === booking.timeSlot,
    (s) => {
      booking.timeSlot = s.id;
      booking.timeSlotLabel = s.label;
      rerender();
    }
  );

  const addonCard = byId('addonToggleCard');
  if (addonCard) addonCard.setAttribute('aria-checked', String(booking.equipmentAddon));
}

function getBookingSubtotal(court) {
  return court.pricePerHour + (appState.booking.equipmentAddon ? ADDON_FEE_LKR : 0);
}

function updateExpandedPriceSummary(court) {
  setText('summaryRateLabel', `${appState.booking.dayLabel} · ${appState.booking.timeSlotLabel}`);
  setText('summaryTotalAmount', formatLKR(getBookingSubtotal(court)));
}

function toggleEquipmentAddon() {
  const court = getSelectedCourt();
  if (!court) return;
  appState.booking.equipmentAddon = !appState.booking.equipmentAddon;
  const addonCard = byId('addonToggleCard');
  if (addonCard) addonCard.setAttribute('aria-checked', String(appState.booking.equipmentAddon));
  updateExpandedPriceSummary(court);
}

function renderCourtLeafletMap(court) {
  const mapEl = byId('courtLeafletMap');
  if (!mapEl || typeof L === 'undefined') return;

  if (!appState.leafletMap) {
    appState.leafletMap = L.map(mapEl, { zoomControl: true, attributionControl: false }).setView(court.coords, 15);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(appState.leafletMap);
    appState.leafletMarker = L.marker(court.coords).addTo(appState.leafletMap);
  } else {
    appState.leafletMap.invalidateSize();
    appState.leafletMap.setView(court.coords, 15, { animate: true });
    appState.leafletMarker.setLatLng(court.coords);
  }

  appState.leafletMarker.bindPopup(`<strong>${court.name}</strong><br>${court.address}`).openPopup();
}

/* ============================================================================
   14. CHECKOUT & CONFIRMATION
   ============================================================================ */
function recapRowsHtml(rows) {
  return rows.map(([label, value]) => `<div class="recap-row"><span>${label}</span><strong>${value}</strong></div>`).join('');
}

function openCheckoutView() {
  const court = getSelectedCourt();
  if (!court) return;
  appState.currentView = 'checkout';

  byId('checkoutFormState')?.classList.remove('hidden');
  byId('checkoutSuccessState')?.classList.add('hidden');

  const booking = appState.booking;
  const grandTotal = getBookingSubtotal(court) + SERVICE_FEE_LKR;
  setText('checkoutPayBtnAmount', formatLKR(grandTotal));

  const recapEl = byId('checkoutOrderRecap');
  if (recapEl) {
    recapEl.innerHTML =
      recapRowsHtml([
        ['Venue', court.name],
        ['Surface', court.surface],
        ['Dimensions', court.dimensions],
        ['Date', booking.dayLabel],
        ['Time', booking.timeSlotLabel],
        ['Bay', booking.bayName],
        ['Rate', formatLKR(court.pricePerHour)],
        ['Gear', booking.equipmentAddon ? formatLKR(ADDON_FEE_LKR) : '—'],
        ['Service Fee', formatLKR(SERVICE_FEE_LKR)]
      ]) +
      `<div class="recap-row recap-total"><span>Total</span><strong>${formatLKR(grandTotal)}</strong></div>`;
  }

  renderPaymentMethodOptions();
  showActiveViewSection('viewCheckout');
}

function renderPaymentMethodOptions() {
  const container = byId('paymentMethodOptions');
  if (!container) return;

  const methods = [
    { title: 'Google Pay / Card', sub: 'Instant' },
    { title: 'LankaQR', sub: 'QR' },
    { title: 'Pay at Venue', sub: 'On arrival' }
  ];

  container.replaceChildren(
    ...methods.map((m) => {
      const isSelected = appState.booking.paymentMethod === m.title;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `pay-option-card${isSelected ? ' active' : ''}`;
      card.setAttribute('aria-pressed', String(isSelected));
      card.innerHTML = `<strong>${m.title}</strong><span>${m.sub}</span>`;
      card.addEventListener('click', () => {
        appState.booking.paymentMethod = m.title;
        renderPaymentMethodOptions();
      });
      return card;
    })
  );
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const court = getSelectedCourt();
  if (!court) return;

  const booking = appState.booking;
  const playerName = byId('playerName').value.trim();
  const playerPhone = byId('playerPhone').value.trim();
  const grandTotal = getBookingSubtotal(court) + SERVICE_FEE_LKR;
  const bookingRef = `PLK-${Math.floor(100000 + Math.random() * 900000)}`;

  byId('checkoutFormState')?.classList.add('hidden');
  byId('checkoutSuccessState')?.classList.remove('hidden');

  const receiptEl = byId('bookingReceiptTicket');
  if (receiptEl) {
    receiptEl.innerHTML = recapRowsHtml([
      ['Ref', bookingRef],
      ['Venue', `${court.name} (${booking.bayName})`],
      ['Session', `${booking.dayLabel} · ${booking.timeSlotLabel}`],
      ['Payment', booking.paymentMethod],
      ['Player', `${playerName} (${playerPhone})`],
      ['Total', formatLKR(grandTotal)]
    ]);
  }
  const checkoutForm = byId('checkoutForm');
  if (checkoutForm && typeof checkoutForm.reset === 'function') {
    checkoutForm.reset();
  }
}

/* ============================================================================
   15. HUB FALLBACK (when WebGL is unavailable)
   ============================================================================ */
function renderHubFallback() {
  const hub = byId('view3DSports');
  if (!hub) return;
  const wrap = document.createElement('div');
  wrap.className = 'hub-fallback';
  SPORTS_CATALOG.forEach((sport) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hub-fallback-btn';
    btn.style.setProperty('--accent', sport.accentHex);
    btn.textContent = sport.shortName;
    btn.addEventListener('click', () => enterCourtScenePage(sport.id));
    wrap.appendChild(btn);
  });
  hub.appendChild(wrap);
}

/* ============================================================================
   16. APP INITIALISATION
   ============================================================================ */
function handleGlobalBack() {
  switch (appState.currentView) {
    case 'checkout':
      appState.currentView = 'expandedCourt';
      showActiveViewSection('viewExpandedCourt');
      break;
    case 'expandedCourt':
      appState.currentView = 'courtScene';
      showActiveViewSection('viewCourtScene');
      break;
    case 'courtScene':
      if (appState.selectedCourtId) resetToInitialCourtGrid();
      else returnTo3DSportsHub();
      break;
    default:
      break;
  }
}

function bindClick(id, handler) {
  const el = byId(id);
  if (el) el.addEventListener('click', handler);
}

function initPlayLKApp() {
  showActiveViewSection('view3DSports');
  setLayoutSelected(false);

  const has3D = init3DExperience();
  if (!has3D) renderHubFallback();

  initCourtGridInteractions();
  initIsoDiagramDrag();

  // Home dots: step back one level (selected court → full grid → 3D hub).
  bindClick('brandResetTrigger', () => {
    if (appState.currentView === 'courtScene' && appState.selectedCourtId) resetToInitialCourtGrid();
    else returnTo3DSportsHub();
  });

  bindClick('closeInspectorBtn', resetToInitialCourtGrid);
  bindClick('bookNowBtn', openExpandedCourtView);
  bindClick('backToCourtsTrigger', handleGlobalBack);
  bindClick('goToCheckoutTrigger', openCheckoutView);
  bindClick('backToExpandedTrigger', handleGlobalBack);
  bindClick('returnTo3DSportsTrigger', returnTo3DSportsHub);
  bindClick('addonToggleCard', toggleEquipmentAddon);

  const addonCard = byId('addonToggleCard');
  if (addonCard) {
    addonCard.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleEquipmentAddon();
      }
    });
  }

  const checkoutForm = byId('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') handleGlobalBack();
  });

  // Rebuild the grid on resize so block sizes and repeat counts stay correct.
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (appState.currentView === 'courtScene' && courtGrid.sportId) {
        renderCourtGrid(getSport(courtGrid.sportId), courtGrid.excludedCourtId);
      }
    }, 160);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayLKApp);
} else {
  initPlayLKApp();
}
