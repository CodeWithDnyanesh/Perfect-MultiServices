// Structure of the website. Visible text lives in the translation files
// (`<key>Title`, `<key>Text`) and, for services, in content/services/*.
// Add a photo by setting `image` to a file under public/assets.

export const SERVICE_SLUGS = [
  // Housekeeping services
  'housekeeping-cleaning',
  'office-deep-cleaning',
  'deep-cleaning',
  'kitchen-bathroom-cleaning',
  'sofa-carpet-cleaning',
  'glass-cleaning',
  'solar-panel-cleaning',
  'water-tank-cleaning',
  'drainage-cleaning',
  'pest-control',
  // General services
  'facility-management',
  'electrical-maintenance',
  'plumbing-services',
  'hvac-ac-maintenance',
  'civil-technical-work',
  'finishing-services',
  'gardening-landscaping',
  'staffing-care-services'
] as const;
export type ServiceSlug = typeof SERVICE_SLUGS[number];

/** The two groups printed on the company's business card. */
export type ServiceGroup = 'housekeeping' | 'general';
export const SERVICE_GROUPS: ServiceGroup[] = ['housekeeping', 'general'];

export interface SiteService {
  slug: ServiceSlug;
  group: ServiceGroup;
  icon: string;
  image?: string;
  /** Extra photos shown on the service's own page. */
  gallery?: string[];
  related: ServiceSlug[];
}

export const SITE_SERVICES: SiteService[] = [
  { slug: 'housekeeping-cleaning', group: 'housekeeping', icon: 'sparkles', image: 'assets/services/housekeeping-cleaning-1.jpg', gallery: ['assets/services/housekeeping-cleaning-1.jpg', 'assets/services/housekeeping-cleaning-2.jpg'], related: ['deep-cleaning', 'kitchen-bathroom-cleaning', 'facility-management'] },
  { slug: 'office-deep-cleaning', group: 'housekeeping', icon: 'briefcase', image: 'assets/services/office-deep-cleaning-1.jpg', gallery: ['assets/services/office-deep-cleaning-wide.jpg', 'assets/services/office-deep-cleaning-1.jpg', 'assets/services/office-deep-cleaning-2.jpg'], related: ['housekeeping-cleaning', 'glass-cleaning', 'sofa-carpet-cleaning'] },
  { slug: 'deep-cleaning', group: 'housekeeping', icon: 'sparkles', image: 'assets/services/deep-cleaning.jpg', related: ['kitchen-bathroom-cleaning', 'sofa-carpet-cleaning', 'pest-control'] },
  { slug: 'kitchen-bathroom-cleaning', group: 'housekeeping', icon: 'kitchen', image: 'assets/services/kitchen-bathroom-cleaning.jpg', related: ['deep-cleaning', 'drainage-cleaning', 'housekeeping-cleaning'] },
  { slug: 'sofa-carpet-cleaning', group: 'housekeeping', icon: 'sofa', image: 'assets/promos/sofa-carpet-cleaning-photo.jpg', related: ['deep-cleaning', 'housekeeping-cleaning', 'office-deep-cleaning'] },
  { slug: 'glass-cleaning', group: 'housekeeping', icon: 'glass', image: 'assets/services/glass-cleaning.jpg', related: ['office-deep-cleaning', 'housekeeping-cleaning', 'solar-panel-cleaning'] },
  { slug: 'solar-panel-cleaning', group: 'housekeeping', icon: 'sun', image: 'assets/promos/solar-panel-cleaning-photo.jpg', related: ['electrical-maintenance', 'water-tank-cleaning', 'facility-management'] },
  { slug: 'water-tank-cleaning', group: 'housekeeping', icon: 'tank', image: 'assets/services/water-tank-cleaning.jpg', related: ['plumbing-services', 'drainage-cleaning', 'pest-control'] },
  { slug: 'drainage-cleaning', group: 'housekeeping', icon: 'drain', image: 'assets/services/drainage-cleaning.jpg', related: ['plumbing-services', 'water-tank-cleaning', 'kitchen-bathroom-cleaning'] },
  { slug: 'pest-control', group: 'housekeeping', icon: 'bug', image: 'assets/services/pest-control.jpg', related: ['deep-cleaning', 'kitchen-bathroom-cleaning', 'water-tank-cleaning'] },
  { slug: 'facility-management', group: 'general', icon: 'building', image: 'assets/services/facility-management.jpg', related: ['housekeeping-cleaning', 'pest-control', 'staffing-care-services'] },
  { slug: 'electrical-maintenance', group: 'general', icon: 'bolt', image: 'assets/services/electrical-maintenance.jpg', related: ['hvac-ac-maintenance', 'plumbing-services', 'civil-technical-work'] },
  { slug: 'plumbing-services', group: 'general', icon: 'droplet', image: 'assets/services/plumbing-services-1.jpg', related: ['drainage-cleaning', 'water-tank-cleaning', 'electrical-maintenance'] },
  { slug: 'hvac-ac-maintenance', group: 'general', icon: 'wind', image: 'assets/services/hvac-ac-maintenance.jpg', related: ['electrical-maintenance', 'office-deep-cleaning', 'facility-management'] },
  { slug: 'civil-technical-work', group: 'general', icon: 'hammer', image: 'assets/services/civil-technical-work.jpg', related: ['finishing-services', 'plumbing-services', 'electrical-maintenance'] },
  { slug: 'finishing-services', group: 'general', icon: 'paint', image: 'assets/services/finishing-services.jpg', related: ['civil-technical-work', 'deep-cleaning', 'glass-cleaning'] },
  { slug: 'gardening-landscaping', group: 'general', icon: 'leaf', image: 'assets/services/gardening-landscaping.jpg', related: ['facility-management', 'pest-control', 'housekeeping-cleaning'] },
  { slug: 'staffing-care-services', group: 'general', icon: 'staff', image: 'assets/services/staffing-care-services.jpg', related: ['facility-management', 'pest-control', 'housekeeping-cleaning'] }
];

export function siteService(slug: string): SiteService | undefined {
  return SITE_SERVICES.find(service => service.slug === slug);
}

export interface SiteItem {
  key: string;
  icon: string;
  image?: string;
}

export interface SiteIndustry extends SiteItem {
  id: string;
  services: ServiceSlug[];
}

export const SITE_INDUSTRIES: SiteIndustry[] = [
  { id: 'corporate-offices', key: 'indOffices', icon: 'briefcase', image: 'assets/industries/corporate-offices.jpg', services: ['office-deep-cleaning', 'facility-management', 'hvac-ac-maintenance', 'staffing-care-services'] },
  { id: 'residential-buildings', key: 'indResidential', icon: 'home', image: 'assets/industries/residential-buildings.jpg', services: ['housekeeping-cleaning', 'sofa-carpet-cleaning', 'staffing-care-services', 'gardening-landscaping'] },
  { id: 'hotels-hospitality', key: 'indHotels', icon: 'hotel', image: 'assets/industries/hotels-hospitality.jpg', services: ['housekeeping-cleaning', 'sofa-carpet-cleaning', 'hvac-ac-maintenance', 'gardening-landscaping'] },
  { id: 'hospitals-healthcare', key: 'indHospitals', icon: 'hospital', image: 'assets/industries/hospitals-healthcare.jpg', services: ['housekeeping-cleaning', 'facility-management', 'plumbing-services', 'electrical-maintenance'] },
  { id: 'shopping-malls', key: 'indMalls', icon: 'bag', image: 'assets/industries/shopping-malls.jpg', services: ['facility-management', 'staffing-care-services', 'housekeeping-cleaning', 'hvac-ac-maintenance'] },
  { id: 'industrial-facilities', key: 'indIndustrial', icon: 'factory', image: 'assets/industries/industrial-facilities.jpg', services: ['facility-management', 'solar-panel-cleaning', 'electrical-maintenance', 'staffing-care-services'] },
  { id: 'educational-institutions', key: 'indEducation', icon: 'school', image: 'assets/industries/educational-institutions.jpg', services: ['housekeeping-cleaning', 'gardening-landscaping', 'staffing-care-services', 'plumbing-services'] }
];

export const SITE_REASONS: SiteItem[] = [
  { key: 'whyScheduling', icon: 'calendar' },
  { key: 'whyQuality', icon: 'search' },
  { key: 'whySkilled', icon: 'users' },
  { key: 'whyReliable', icon: 'shield' },
  { key: 'whyCustomer', icon: 'headset' },
  { key: 'whyComplete', icon: 'layers' }
];

export const SITE_STEPS: SiteItem[] = [
  { key: 'stepContact', icon: 'phone' },
  { key: 'stepDiscuss', icon: 'chat' },
  { key: 'stepQuote', icon: 'document' },
  { key: 'stepSchedule', icon: 'calendar' }
];

export const ABOUT_BENEFITS: SiteItem[] = [
  { key: 'benefitQuality', icon: 'award' },
  { key: 'benefitSkilled', icon: 'users' },
  { key: 'benefitSatisfaction', icon: 'star' },
  { key: 'benefitSupport', icon: 'headset' }
];

export const OFFICE_ADDRESS_EN = 'Flat no. 1, Nitiraj Apartment, near Rajmati Girls High School, Neminathnagar, Vishrambag, Sangli 416415';

export const COMPANY_CONTACT = {
  email: 'perfectmultiservicess@gmail.com',
  phones: [
    { label: '+91 84606 57606', href: 'tel:+918460657606' },
    { label: '+91 99221 01262', href: 'tel:+919922101262' },
    { label: '+91 72648 84322', href: 'tel:+917264884322' }
  ],
  whatsapp: 'https://wa.me/918460657606',
  map: 'https://www.google.com/maps/search/?api=1&query=16.848827,74.591290'
};
