// Placeholder data standing in for what will eventually come from Supabase.
// Same shape we designed for the real `properties` / `projects` tables.
//
// `logged_date` powers the History timeline. For completed projects it's a real
// date drawn from completed_date. For everything else (no real timestamp exists
// yet) it's an ESTIMATED placeholder standing in for "when this was added" —
// call it out if you want these replaced with real dates later.
//
// `checklist` is a curated "typical tasks for this kind of project" template —
// standing in for what live AI + web research would generate once we have a
// backend to call it from. No live AI call happens today.
//
// `target_date` (only on active-status projects) is an ESTIMATED placeholder —
// there's no real target-date field or user input for this yet. Powers the
// Upcoming/mini-calendar widget on Home.
//
// The "Sliding Driveway Gate" project (id 2) also carries fully fleshed-out
// example data for every project-detail tab — quotes, wishlist, documents,
// payments, timeline, notes, and photos — so the tabbed detail view has
// something to show the first time you open it. All of it is INVENTED
// illustrative content, not a real quote history, and the photo entries
// point at inline SVG placeholders rather than real photos. Replace or
// clear it whenever real data (or a real photo) is available.

const PLACEHOLDER_INSPO_PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
      '<rect width="400" height="300" fill="#dbe8dc"/>' +
      '<text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#2f4a34" text-anchor="middle" dy=".3em">Inspo placeholder</text>' +
      '</svg>',
  )

const PLACEHOLDER_BEFORE_PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
      '<rect width="400" height="300" fill="#efe1c9"/>' +
      '<text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#7a5f2d" text-anchor="middle" dy=".3em">Before placeholder</text>' +
      '</svg>',
  )

const PLACEHOLDER_AFTER_PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
      '<rect width="400" height="300" fill="#dbe8dc"/>' +
      '<text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#2f4a34" text-anchor="middle" dy=".3em">After placeholder</text>' +
      '</svg>',
  )

export const properties = [
  {
    id: 1,
    name: 'San Jose House',
    type: 'home',
    address: '100 Candy Lane Drive, San Jose, CA 95123',
  },
  {
    id: 2,
    name: '2006 4Runner',
    type: 'vehicle',
    address: null,
  },
]

export const mockProjects = [
  {
    id: 1,
    property_id: 1,
    title: 'Driveway Concrete',
    category: 'Exterior',
    status: 'completed',
    budget_estimated: 5701,
    budget_actual: 5701,
    contractor: 'MVP General Contractor',
    next_action: null,
    completed_date: 'Sep 2026',
    logged_date: '2026-09-05',
  },
  {
    id: 2,
    property_id: 1,
    title: 'Sliding Driveway Gate',
    category: 'Exterior',
    status: 'scheduled',
    budget_estimated: 3850,
    budget_actual: null,
    contractor: 'Golden Gate Gates',
    target_date: '2026-10-15',
    next_action: 'Confirm installation date with Golden Gate Gates',
    logged_date: '2026-08-15',
    notes:
      'HOA requires the gate to sit at least 5ft back from the sidewalk. ' +
      'Pedestrian gate needs separate hinge hardware — confirm with installer before install day.',
    checklist: [
      { id: '2-1', text: 'Measure driveway opening and confirm gate width', done: true },
      { id: '2-2', text: 'Get quotes from gate contractors', done: true },
      { id: '2-3', text: 'Choose gate style and material', done: true },
      { id: '2-4', text: 'Confirm pedestrian gate placement and safety sightlines', done: false },
      { id: '2-5', text: 'Check HOA / permit requirements', done: true },
      { id: '2-6', text: 'Schedule installation date', done: true },
      { id: '2-7', text: 'Install gate posts and hardware', done: false },
      { id: '2-8', text: 'Install automatic opener and safety sensors', done: false },
      { id: '2-9', text: 'Final walkthrough and test', done: false },
    ],
    quotes: [
      {
        id: '2-quote-1',
        contractor: 'Bay Area Fence Co.',
        amount: 3200,
        date: '2026-08-20',
        notes: 'Includes pedestrian gate and powder-coated finish.',
        status: 'pending',
        fileUrl: null,
        fileIsImage: false,
      },
      {
        id: '2-quote-2',
        contractor: 'Golden Gate Gates',
        amount: 3850,
        date: '2026-08-22',
        notes: 'Higher-end opener with a 2-year motor warranty.',
        status: 'accepted',
        fileUrl: null,
        fileIsImage: false,
      },
      {
        id: '2-quote-3',
        contractor: 'West Coast Gate & Fence',
        amount: 2950,
        date: '2026-08-25',
        notes: 'Lowest bid, but only a 90-day warranty on parts.',
        status: 'declined',
        fileUrl: null,
        fileIsImage: false,
      },
    ],
    wishlist: [
      {
        id: '2-wish-1',
        item: 'Solar-powered keypad entry',
        price: 180,
        link: '',
        priority: 'medium',
        status: 'considering',
      },
      {
        id: '2-wish-2',
        item: 'Wrought iron pedestrian gate to match',
        price: 450,
        link: '',
        priority: 'high',
        status: 'considering',
      },
      {
        id: '2-wish-3',
        item: 'Smart video intercom add-on',
        price: 220,
        link: '',
        priority: 'low',
        status: 'rejected',
      },
    ],
    documents: [
      {
        id: '2-doc-1',
        name: 'Golden Gate Gates — signed estimate',
        type: 'contract',
        date: '2026-08-22',
        expirationDate: null,
        fileUrl: null,
      },
      {
        id: '2-doc-2',
        name: 'HOA gate design approval',
        type: 'permit',
        date: '2026-09-01',
        expirationDate: null,
        fileUrl: null,
      },
      {
        id: '2-doc-3',
        name: 'Opener motor warranty card',
        type: 'warranty',
        date: '2026-08-22',
        expirationDate: '2028-08-22',
        fileUrl: null,
      },
    ],
    payments: [
      {
        id: '2-payment-1',
        amount: 1000,
        paidTo: 'Golden Gate Gates',
        date: '2026-09-02',
        status: 'paid',
      },
      {
        id: '2-payment-2',
        amount: 2850,
        paidTo: 'Golden Gate Gates',
        date: null,
        status: 'pending',
      },
    ],
    milestones: [
      {
        id: '2-milestone-1',
        name: 'HOA design approval',
        targetDate: '2026-09-01',
        actualDate: '2026-09-01',
        status: 'done',
      },
      {
        id: '2-milestone-2',
        name: 'Deposit paid to Golden Gate Gates',
        targetDate: '2026-09-02',
        actualDate: '2026-09-02',
        status: 'done',
      },
      {
        id: '2-milestone-3',
        name: 'Installation day',
        targetDate: '2026-10-15',
        actualDate: null,
        status: 'upcoming',
      },
    ],
    inspoPhotos: [
      {
        id: '2-inspo-1',
        url: PLACEHOLDER_INSPO_PHOTO,
        caption: 'Placeholder — swap in a real inspo photo (black powder-coated sliding gate style)',
      },
    ],
    beforeAfterPhotos: [
      {
        id: '2-ba-1',
        url: PLACEHOLDER_BEFORE_PHOTO,
        caption: 'Placeholder — swap in your real before photo',
        tag: 'before',
      },
      {
        id: '2-ba-2',
        url: PLACEHOLDER_AFTER_PHOTO,
        caption: 'Placeholder — swap in your real after photo',
        tag: 'after',
        pairedBeforeId: '2-ba-1',
      },
    ],
  },
  {
    id: 3,
    property_id: 1,
    title: 'Curb Appeal Refresh',
    category: 'Exterior',
    status: 'planning',
    budget_estimated: null,
    budget_actual: null,
    contractor: null,
    next_action: 'Narrow down design direction before choosing materials',
    logged_date: '2026-07-20',
    checklist: [
      { id: '3-1', text: 'Take before photos of front yard', done: true },
      { id: '3-2', text: 'Research design inspiration and materials', done: true },
      { id: '3-3', text: 'Narrow down design direction', done: false },
      { id: '3-4', text: 'Get quotes from landscaping / design contractors', done: false },
      { id: '3-5', text: 'Set a budget range', done: false },
      { id: '3-6', text: 'Choose plants and materials', done: false },
      { id: '3-7', text: 'Schedule work', done: false },
    ],
  },
  {
    id: 4,
    property_id: 1,
    title: 'Backyard Lighting',
    category: 'Exterior',
    status: 'idea',
    budget_estimated: null,
    budget_actual: null,
    contractor: null,
    next_action: null,
    logged_date: '2026-06-10',
    checklist: [
      { id: '4-1', text: 'Decide on lighting style (string, path, uplighting)', done: false },
      { id: '4-2', text: 'Map out placement in backyard', done: false },
      { id: '4-3', text: 'Check electrical access / need for an electrician', done: false },
      { id: '4-4', text: 'Get quotes if hardwired', done: false },
      { id: '4-5', text: 'Set a budget', done: false },
      { id: '4-6', text: 'Purchase materials', done: false },
      { id: '4-7', text: 'Install lighting', done: false },
    ],
  },
  {
    id: 5,
    property_id: 1,
    title: 'Backyard Fence & Landscaping',
    category: 'Exterior',
    status: 'completed',
    budget_estimated: 284,
    budget_actual: 284,
    contractor: 'Frank Castanedo',
    next_action: null,
    completed_date: 'Oct 2021',
    logged_date: '2021-10-15',
  },
  {
    id: 6,
    property_id: 1,
    title: 'Furnace & Drainage',
    category: 'Systems',
    status: 'completed',
    budget_estimated: 2597,
    budget_actual: 2597,
    contractor: 'Frank Castanedo',
    next_action: null,
    completed_date: 'Oct 2021',
    logged_date: '2021-10-22',
  },
  {
    id: 7,
    property_id: 1,
    title: 'Interior Renovation',
    category: 'Interior',
    status: 'completed',
    budget_estimated: 5216,
    budget_actual: 5216,
    contractor: 'Warren',
    next_action: null,
    completed_date: 'Oct 2022',
    logged_date: '2022-10-10',
  },
  {
    id: 10,
    property_id: 1,
    title: 'Roof Replacement',
    category: 'Exterior',
    status: 'completed',
    budget_estimated: 4248,
    budget_actual: 4248,
    contractor: 'Wing’s Roofing',
    next_action: null,
    completed_date: 'Sep 2026',
    logged_date: '2026-09-08',
  },
  {
    id: 11,
    property_id: 1,
    title: 'Front & Side Fence + Porch Gate',
    category: 'Exterior',
    status: 'completed',
    budget_estimated: 1440,
    budget_actual: 1440,
    contractor: 'Leonides Santiago Pablo',
    next_action: null,
    completed_date: 'Jun 2024',
    logged_date: '2024-06-02',
  },
  {
    id: 8,
    property_id: 2,
    title: 'Brake Pad Replacement',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 58,
    budget_actual: 53,
    contractor: 'Midas',
    next_action: null,
    completed_date: 'Feb 2026',
    logged_date: '2026-02-14',
  },
  {
    id: 12,
    property_id: 2,
    title: 'Timing Belt & Water Pump Service',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 144,
    budget_actual: 144,
    contractor: 'Trail Toyota Service',
    next_action: null,
    completed_date: 'Jan 2025',
    logged_date: '2025-01-18',
  },
  {
    id: 13,
    property_id: 2,
    title: 'New All-Terrain Tires',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 216,
    budget_actual: 216,
    contractor: 'Big O Tires',
    next_action: null,
    completed_date: 'Jun 2025',
    logged_date: '2025-06-05',
  },
  {
    id: 16,
    property_id: 2,
    title: 'Radiator & Coolant Flush',
    category: 'Systems',
    status: 'completed',
    budget_estimated: 27,
    budget_actual: 27,
    contractor: 'Trail Toyota Service',
    next_action: null,
    completed_date: 'Aug 2024',
    logged_date: '2024-08-12',
  },
  {
    id: 17,
    property_id: 2,
    title: 'Spark Plugs & Ignition Coils Replacement',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 63,
    budget_actual: 63,
    contractor: 'Trail Toyota Service',
    next_action: null,
    completed_date: 'Nov 2024',
    logged_date: '2024-11-08',
  },
  {
    id: 18,
    property_id: 2,
    title: 'Battery Replacement',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 40,
    budget_actual: 40,
    contractor: 'AutoZone',
    next_action: null,
    completed_date: 'Dec 2025',
    logged_date: '2025-12-03',
  },
  {
    id: 19,
    property_id: 2,
    title: '200K Mile Major Service',
    category: 'Maintenance',
    status: 'completed',
    budget_estimated: 72,
    budget_actual: 72,
    contractor: 'Trail Toyota Service',
    next_action: null,
    completed_date: 'Mar 2026',
    logged_date: '2026-03-14',
  },
  {
    id: 20,
    property_id: 2,
    title: 'Replace Tires',
    category: 'Maintenance',
    status: 'in_progress',
    budget_estimated: 162,
    budget_actual: null,
    contractor: null,
    target_date: '2026-09-20',
    next_action: 'Schedule installation and alignment',
    logged_date: '2026-09-10',
    checklist: [
      { id: '20-1', text: 'Measure current tread wear and confirm replacement is needed', done: true },
      { id: '20-2', text: 'Research all-terrain tire options for lift height', done: true },
      { id: '20-3', text: 'Get quotes from tire shops', done: true },
      { id: '20-4', text: 'Order tires', done: false },
      { id: '20-5', text: 'Schedule installation and alignment', done: false },
      { id: '20-6', text: 'Install new tires', done: false },
      { id: '20-7', text: 'Dispose of old tires', done: false },
    ],
  },
  {
    id: 14,
    property_id: 2,
    title: 'Suspension Lift Kit',
    category: 'Upgrades',
    status: 'quoting',
    budget_estimated: 450,
    budget_actual: null,
    contractor: null,
    target_date: '2026-11-01',
    next_action: 'Compare lift kit quotes and finalize ride height',
    logged_date: '2026-08-20',
    checklist: [
      { id: '14-1', text: 'Research lift kit options (2–3" vs 3"+)', done: true },
      { id: '14-2', text: 'Get quotes from 4x4 shops', done: true },
      { id: '14-3', text: 'Decide on brand and kit', done: false },
      { id: '14-4', text: 'Check tire clearance requirements', done: false },
      { id: '14-5', text: 'Schedule installation', done: false },
      { id: '14-6', text: 'Post-install alignment', done: false },
    ],
  },
  {
    id: 15,
    property_id: 2,
    title: 'Roof Rack Installation',
    category: 'Upgrades',
    status: 'idea',
    budget_estimated: null,
    budget_actual: null,
    contractor: null,
    next_action: null,
    logged_date: '2026-09-01',
    checklist: [
      { id: '15-1', text: 'Decide on roof rack style', done: false },
      { id: '15-2', text: 'Check crossbar / roof rail compatibility', done: false },
      { id: '15-3', text: 'Get quotes', done: false },
      { id: '15-4', text: 'Purchase and install', done: false },
    ],
  },
  {
    id: 9,
    property_id: 2,
    title: 'Ceramic Coating',
    category: 'Detailing',
    status: 'idea',
    budget_estimated: null,
    budget_actual: null,
    contractor: null,
    next_action: null,
    logged_date: '2026-05-01',
    checklist: [
      { id: '9-1', text: 'Research ceramic coating brands / installers', done: false },
      { id: '9-2', text: 'Get quotes from detailers', done: false },
      { id: '9-3', text: 'Decide DIY vs. professional install', done: false },
      { id: '9-4', text: 'Schedule appointment', done: false },
      { id: '9-5', text: 'Prep car (wash, decontaminate, paint correction)', done: false },
      { id: '9-6', text: 'Apply coating', done: false },
      { id: '9-7', text: 'Follow post-application care instructions', done: false },
    ],
  },
]
