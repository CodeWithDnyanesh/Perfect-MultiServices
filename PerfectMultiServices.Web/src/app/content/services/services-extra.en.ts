import { ServiceContent } from './service-content';
import { ExtraSlug } from './extra-slugs';

export const SERVICES_EN_EXTRA: Record<ExtraSlug, ServiceContent> = {
  'deep-cleaning': {
    name: 'Deep Cleaning',
    tagline: 'A thorough top-to-bottom clean for homes and properties.',
    summary: 'Intensive cleaning of every room, corner and surface for homes, flats and bungalows: ideal before festivals, after renovation or when moving in or out.',
    highlights: ['Every room, top to bottom', 'Move-in / move-out cleaning', 'Post-renovation cleaning'],
    overview: [
      'Regular cleaning keeps a home tidy, but dust, grease and grime slowly build up in places that are hard to reach. A deep clean takes care of all of it at once.',
      'Our team cleans room by room following a checklist: ceilings, fans and walls, windows and grills, cupboards, kitchen, bathrooms and floors, so your home feels fresh again.'
    ],
    included: [
      'Ceiling, fan and wall dusting',
      'Window, grill and door cleaning',
      'Cupboard and furniture cleaning (outside and inside on request)',
      'Kitchen degreasing',
      'Bathroom descaling and sanitisation',
      'Floor scrubbing and finishing'
    ],
    benefits: [
      { title: 'Complete freshness', text: 'Every corner cleaned in a single visit.' },
      { title: 'Healthier home', text: 'Removes built-up dust, grease and germs.' },
      { title: 'Saves your time', text: 'A trained team finishes the job efficiently.' },
      { title: 'Perfect timing', text: 'Ideal before festivals, events or moving in.' }
    ],
    process: [
      { title: 'Inspection', text: 'We check the size and condition of the property.' },
      { title: 'Scope & schedule', text: 'Rooms, tasks and timing are agreed with you.' },
      { title: 'Deep cleaning', text: 'The team cleans room by room with a checklist.' },
      { title: 'Walk-through', text: 'We check the result with you before leaving.' }
    ],
    idealFor: ['Flats & apartments', 'Bungalows', 'New homes before moving in', 'Homes after renovation', 'Rented properties'],
    faqs: [
      { q: 'How long does a deep clean take?', a: 'It depends on the size and condition of the property. We confirm the time needed after an inspection or once you share the details.' },
      { q: 'Do I need to be at home?', a: 'We recommend someone is present at the start and end, so the scope and the final result can be checked together.' },
      { q: 'Do you clean after renovation work?', a: 'Yes. Post-renovation cleaning removes cement marks, paint spots and construction dust.' }
    ]
  },

  'kitchen-bathroom-cleaning': {
    name: 'Kitchen & Bathroom Cleaning',
    tagline: 'Grease-free kitchens and sparkling, hygienic bathrooms.',
    summary: 'Focused cleaning of kitchens and bathrooms: degreasing, descaling, stain removal and sanitisation of the areas that need it most.',
    highlights: ['Kitchen degreasing', 'Bathroom descaling', 'Hygienic sanitisation'],
    overview: [
      'Kitchens collect oil and food stains, and bathrooms build up hard-water marks, scale and germs. These are the areas that need the most careful cleaning.',
      'Our team uses suitable cleaning products and tools to remove grease, scale and stains from tiles, platforms, fittings and fixtures, leaving both rooms clean and hygienic.'
    ],
    included: [
      'Kitchen platform, tiles and sink cleaning',
      'Chimney and hob exterior degreasing',
      'Cabinet exterior cleaning',
      'Toilet, wash-basin and shower cleaning',
      'Hard-water stain and scale removal',
      'Floor and drain-point cleaning'
    ],
    benefits: [
      { title: 'Better hygiene', text: 'Sanitised surfaces where food is prepared and in bathrooms.' },
      { title: 'Stains removed', text: 'Oil, grime and hard-water marks lifted.' },
      { title: 'Fresh smell', text: 'Odours from drains and corners reduced.' },
      { title: 'Fittings protected', text: 'Correct products keep taps and tiles in good condition.' }
    ],
    process: [
      { title: 'Check', text: 'We look at surfaces, stains and fittings.' },
      { title: 'Treatment', text: 'Degreasers and descalers are applied where needed.' },
      { title: 'Scrubbing', text: 'Tiles, fittings and floors are cleaned thoroughly.' },
      { title: 'Sanitising', text: 'Surfaces are rinsed, dried and sanitised.' }
    ],
    idealFor: ['Homes', 'Offices & pantries', 'Restaurants & canteens', 'Hostels', 'Clinics'],
    faqs: [
      { q: 'Can old hard-water stains be removed?', a: 'Most stains lighten considerably or come off completely. Very old stains may not disappear fully, and we tell you before starting.' },
      { q: 'Do you clean kitchen chimneys?', a: 'We clean the outside of chimneys and hobs. For internal chimney servicing, ask us when you request a quote.' },
      { q: 'Can I book only the bathrooms?', a: 'Yes. You can book kitchen cleaning, bathroom cleaning or both.' }
    ]
  },

  'glass-cleaning': {
    name: 'Glass Cleaning',
    tagline: 'Clear, streak-free glass for homes, offices and shopfronts.',
    summary: 'Cleaning of windows, glass doors, partitions and facades to remove dust, water spots and fingerprints for a clear, streak-free finish.',
    highlights: ['Streak-free finish', 'Windows, partitions & doors', 'Safe methods for high glass'],
    overview: [
      'Dusty, spotted glass makes any space look dull, and offices and shops are judged on first impressions. Clean glass lets in more light and looks professional.',
      'We clean glass windows, doors, partitions, cabins and shopfronts using squeegees, suitable cleaning solutions and safe access methods, inside and outside where reachable.'
    ],
    included: [
      'Window glass (inside and outside where accessible)',
      'Glass doors and partitions',
      'Office cabins and conference rooms',
      'Shopfronts and showroom glass',
      'Frame, track and sill cleaning',
      'Mirror cleaning'
    ],
    benefits: [
      { title: 'More natural light', text: 'Clean glass brightens rooms.' },
      { title: 'Professional look', text: 'Spotless glass impresses customers and visitors.' },
      { title: 'No streaks', text: 'Squeegee technique for a clear finish.' },
      { title: 'Safe work', text: 'Proper equipment for high and hard-to-reach glass.' }
    ],
    process: [
      { title: 'Survey', text: 'We check the glass area, height and access.' },
      { title: 'Preparation', text: 'Dust and loose dirt are removed first.' },
      { title: 'Cleaning', text: 'Glass is washed and squeegeed streak-free.' },
      { title: 'Detailing', text: 'Frames, edges and tracks are wiped clean.' }
    ],
    idealFor: ['Offices', 'Shops & showrooms', 'Homes & bungalows', 'Hotels & restaurants', 'Banks'],
    faqs: [
      { q: 'Do you clean outside glass on upper floors?', a: 'We clean outside glass where it can be reached safely. For high facades, we assess access and safety before confirming.' },
      { q: 'Can glass cleaning be scheduled regularly?', a: 'Yes. Offices and shops often book weekly or monthly glass cleaning.' },
      { q: 'Will cleaning leave marks?', a: 'We use squeegees and suitable solutions to avoid streaks and water marks.' }
    ]
  },

  'water-tank-cleaning': {
    name: 'Water Tank Cleaning',
    tagline: 'Clean, safe water storage for your home or building.',
    summary: 'Cleaning of overhead and underground water tanks to remove sludge, sediment and algae, followed by disinfection.',
    highlights: ['Sludge & sediment removal', 'Disinfection after cleaning', 'Overhead & underground tanks'],
    overview: [
      'Water tanks slowly collect mud, sediment and algae, even when the water looks clear. Over time this affects water quality and can block pipes and taps.',
      'Our team drains the tank, removes sludge, scrubs the walls and floor, and disinfects the tank before it is refilled.'
    ],
    included: [
      'Draining of remaining water',
      'Sludge and sediment removal',
      'Scrubbing of walls, floor and lid',
      'Algae and stain removal',
      'Disinfection of the tank',
      'Rinsing before refilling'
    ],
    benefits: [
      { title: 'Cleaner water', text: 'Removes dirt and algae from stored water.' },
      { title: 'Healthier family', text: 'Reduces the risk of water-borne contamination.' },
      { title: 'Fewer blockages', text: 'Less sediment reaching pipes and taps.' },
      { title: 'Regular schedule', text: 'Periodic cleaning plans for societies and buildings.' }
    ],
    process: [
      { title: 'Inspection', text: 'We check tank type, size and access.' },
      { title: 'Draining', text: 'The tank is emptied and sludge is removed.' },
      { title: 'Scrubbing', text: 'Walls and floor are cleaned thoroughly.' },
      { title: 'Disinfection', text: 'The tank is disinfected and rinsed.' }
    ],
    idealFor: ['Homes & bungalows', 'Housing societies', 'Hotels & restaurants', 'Hospitals', 'Schools & offices'],
    faqs: [
      { q: 'How often should a water tank be cleaned?', a: 'Many buildings clean their tanks every few months, depending on water quality and tank condition. We can suggest a schedule after inspecting it.' },
      { q: 'Will we be without water for long?', a: 'The tank is unavailable while it is cleaned. We plan the timing with you to keep the disruption short.' },
      { q: 'Do you clean underground tanks?', a: 'Yes. We clean both overhead and underground tanks, subject to safe access.' }
    ]
  },

  'drainage-cleaning': {
    name: 'Drainage Choke-up Cleaning',
    tagline: 'Blocked drains cleared, flow restored.',
    summary: 'Clearing of choked drains, chambers and pipelines in homes, societies and commercial buildings, with cleaning to prevent repeat blockages.',
    highlights: ['Choked drains cleared', 'Chamber cleaning', 'Prevention advice'],
    overview: [
      'Choked drains cause overflowing water, bad smells and damage to floors and walls. They need quick, proper attention.',
      'Our team locates the blockage, clears it with suitable tools, cleans the chamber and line, and tests that water flows freely again.'
    ],
    included: [
      'Kitchen and bathroom drain clearing',
      'Drainage chamber cleaning',
      'Pipeline blockage removal',
      'Removal of silt and waste',
      'Flow testing after clearing',
      'Advice to avoid repeat choke-ups'
    ],
    benefits: [
      { title: 'Water flows again', text: 'Blockages cleared properly, not just pushed further.' },
      { title: 'No bad smells', text: 'Cleaned chambers reduce odours.' },
      { title: 'Prevents damage', text: 'Stops overflow from damaging floors and walls.' },
      { title: 'Cleaner premises', text: 'Waste removed and area cleaned after work.' }
    ],
    process: [
      { title: 'Locate', text: 'We find where the blockage is.' },
      { title: 'Clear', text: 'The choke-up is removed with suitable tools.' },
      { title: 'Clean', text: 'Chambers and lines are cleaned of silt.' },
      { title: 'Test', text: 'Water flow is checked before we leave.' }
    ],
    idealFor: ['Homes', 'Housing societies', 'Hotels & restaurants', 'Commercial buildings', 'Hospitals'],
    faqs: [
      { q: 'Do you handle urgent drain blockages?', a: 'Call or WhatsApp us. We attend as quickly as our team\'s availability allows.' },
      { q: 'Can you clean society drainage lines regularly?', a: 'Yes. Periodic cleaning of chambers and lines helps prevent blockages.' },
      { q: 'What causes repeat choke-ups?', a: 'Common causes are grease, food waste, hair and silt. We share simple tips to reduce them.' }
    ]
  },

  'pest-control': {
    name: 'Pest Control',
    tagline: 'Protect your home and workplace from pests.',
    summary: 'Treatment for cockroaches, ants, bed bugs, mosquitoes, termites and other common pests in homes, offices and commercial premises.',
    highlights: ['Common pest treatment', 'Homes & businesses', 'Follow-up support'],
    overview: [
      'Pests spread germs, damage food and property, and are unpleasant for families, staff and customers. Early treatment stops small problems from growing.',
      'We inspect your premises, identify the pests and the areas they come from, and apply suitable treatment, with advice on keeping them away afterwards.'
    ],
    included: [
      'Cockroach and ant treatment',
      'Bed bug treatment',
      'Mosquito and fly control',
      'Termite treatment',
      'Rodent control',
      'Follow-up visits where needed'
    ],
    benefits: [
      { title: 'Healthier spaces', text: 'Fewer pests spreading germs.' },
      { title: 'Property protected', text: 'Prevents damage to food, wood and furniture.' },
      { title: 'Targeted treatment', text: 'Treatment chosen for the pest and the area.' },
      { title: 'Prevention tips', text: 'Advice to stop pests coming back.' }
    ],
    process: [
      { title: 'Inspection', text: 'We identify the pests and the affected areas.' },
      { title: 'Plan', text: 'Treatment and precautions are explained to you.' },
      { title: 'Treatment', text: 'Suitable treatment is applied carefully.' },
      { title: 'Follow-up', text: 'We check results and advise on prevention.' }
    ],
    idealFor: ['Homes & flats', 'Offices', 'Restaurants & hotels', 'Warehouses', 'Schools & hostels'],
    faqs: [
      { q: 'Do we need to leave the premises during treatment?', a: 'It depends on the treatment. We tell you in advance about any precautions, such as covering food or keeping rooms closed for a time.' },
      { q: 'Is one treatment enough?', a: 'Some pests need a follow-up visit to break their breeding cycle. We advise what your situation needs.' },
      { q: 'Do you offer regular pest control plans?', a: 'Yes. Offices, restaurants and societies often choose scheduled treatments.' }
    ]
  },

  'civil-technical-work': {
    name: 'Civil & Technical Work',
    tagline: 'Repairs and small works handled by skilled technicians.',
    summary: 'Masonry, tiling, waterproofing, carpentry and other repair work for homes, offices and buildings, with one team managing the job.',
    highlights: ['Repairs & small works', 'Skilled technicians', 'One point of contact'],
    overview: [
      'Cracked plaster, loose tiles, leaking terraces and broken doors need skilled hands, and arranging separate workers for each job takes time.',
      'Our team handles repair and small civil and technical work, coordinates the materials and labour needed, and leaves the area clean when the job is done.'
    ],
    included: [
      'Masonry and plaster repairs',
      'Tile fixing and replacement',
      'Waterproofing and seepage repair',
      'Carpentry and door or window repairs',
      'Fixing of fittings and fixtures',
      'Small renovation support'
    ],
    benefits: [
      { title: 'Skilled work', text: 'Experienced technicians for each type of job.' },
      { title: 'Less coordination', text: 'One team arranges labour and materials.' },
      { title: 'Clear estimate', text: 'Work and materials explained before starting.' },
      { title: 'Clean finish', text: 'The area is cleaned after the work.' }
    ],
    process: [
      { title: 'Site visit', text: 'We inspect the work required.' },
      { title: 'Estimate', text: 'Scope, materials and timeline are shared.' },
      { title: 'Execution', text: 'Skilled technicians carry out the work.' },
      { title: 'Handover', text: 'We check the work with you and clean up.' }
    ],
    idealFor: ['Homes & flats', 'Housing societies', 'Offices & shops', 'Commercial buildings', 'Industrial units'],
    faqs: [
      { q: 'Do you take up full renovation projects?', a: 'We mainly handle repairs and small works. Tell us about larger projects and we will let you know what we can take on.' },
      { q: 'Do you provide materials?', a: 'We can arrange materials and include them in the estimate, or use materials you provide.' },
      { q: 'Can you fix terrace leakage?', a: 'Yes. We inspect the source of the seepage and suggest a suitable waterproofing repair.' }
    ]
  },

  'finishing-services': {
    name: 'Finishing Services',
    tagline: 'The final touches that make a space look complete.',
    summary: 'Painting, polishing and finishing work for homes, offices and new or renovated properties, including post-construction cleaning.',
    highlights: ['Painting & touch-ups', 'Floor & wood polishing', 'Post-construction cleaning'],
    overview: [
      'After construction or renovation, or simply over time, a property needs finishing work to look its best: fresh paint, polished floors and a thorough clean.',
      'Our team handles painting, polishing and finishing work, and can clean the space afterwards so it is ready to use straight away.'
    ],
    included: [
      'Interior wall painting and touch-ups',
      'Floor polishing',
      'Wood and furniture polishing',
      'Grill and gate painting',
      'Post-construction cleaning',
      'Handover-ready finishing'
    ],
    benefits: [
      { title: 'Like-new look', text: 'Fresh paint and polish transform a space.' },
      { title: 'Ready to use', text: 'Finishing and cleaning in one service.' },
      { title: 'Neat work', text: 'Furniture and floors protected during work.' },
      { title: 'Flexible scope', text: 'From a single room to a full property.' }
    ],
    process: [
      { title: 'Survey', text: 'We assess surfaces and the finish you want.' },
      { title: 'Plan', text: 'Scope, materials and timing are agreed.' },
      { title: 'Finishing work', text: 'Painting and polishing are carried out.' },
      { title: 'Clean-up', text: 'The area is cleaned and handed over.' }
    ],
    idealFor: ['New homes', 'Renovated properties', 'Offices', 'Shops & showrooms', 'Rented properties'],
    faqs: [
      { q: 'Do you provide paint and polishing materials?', a: 'We can arrange materials and include them in the quote, or use the brands you prefer.' },
      { q: 'Can you clean after painting?', a: 'Yes. Post-construction cleaning removes paint spots, dust and debris.' },
      { q: 'Do you handle single rooms?', a: 'Yes. The scope can be one room, one floor or a full property.' }
    ]
  },

  'staffing-care-services': {
    name: 'Staffing & Care Services',
    tagline: 'Trained, verified staff for your home or business.',
    summary: 'Supply of trained housekeeping, office support and care staff for homes, offices, societies and institutions.',
    highlights: ['Verified, trained staff', 'Short & long-term placement', 'Replacement support'],
    overview: [
      'Finding reliable staff and replacing them when they are absent takes time. Many homes and businesses need dependable people without managing recruitment themselves.',
      'We provide background-verified, trained staff for housekeeping, office support and care roles, and arrange a replacement if someone is unavailable.'
    ],
    included: [
      'Housekeeping staff',
      'Office assistants and pantry staff',
      'Front-desk and support staff',
      'Caretakers and helpers',
      'Replacement during absence'
    ],
    benefits: [
      { title: 'Verified people', text: 'Background checks before placement.' },
      { title: 'Less hiring effort', text: 'We handle sourcing and training.' },
      { title: 'Continuity', text: 'Replacement support when staff are absent.' },
      { title: 'Flexible terms', text: 'Short-term or long-term staffing.' }
    ],
    process: [
      { title: 'Requirement', text: 'You share the role, timing and duties.' },
      { title: 'Selection', text: 'We shortlist suitable, verified staff.' },
      { title: 'Placement', text: 'Staff are briefed and start work.' },
      { title: 'Support', text: 'We stay in touch and handle replacements.' }
    ],
    idealFor: ['Homes', 'Offices', 'Housing societies', 'Hospitals & clinics', 'Schools & institutions'],
    faqs: [
      { q: 'Are the staff verified?', a: 'Yes. We complete background verification before placement.' },
      { q: 'What if the staff member is absent?', a: 'Contact us and we will try to arrange a replacement as quickly as possible.' },
      { q: 'Can we hire staff for a short period?', a: 'Yes. We offer short-term as well as long-term placement.' }
    ]
  }
};
