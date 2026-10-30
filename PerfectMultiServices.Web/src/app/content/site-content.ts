// Structure of the website. Visible text lives in the translation files
// (`<key>Title`, `<key>Text`) and, for services, in content/services/*.
// Add a photo by setting `image` to a file under public/assets.

export const SERVICE_SLUGS = [
  'housekeeping-cleaning',
  'sofa-carpet-cleaning',
  'solar-panel-cleaning',
  'facility-management',
  'security-services',
  'gardening-landscaping',
  'electrical-maintenance',
  'plumbing-services',
  'hvac-ac-maintenance',
  'office-deep-cleaning'
] as const;
export type ServiceSlug = typeof SERVICE_SLUGS[number];

export interface SiteService {
  slug: ServiceSlug;
  icon: string;
  image?: string;
  related: ServiceSlug[];
}

export const SITE_SERVICES: SiteService[] = [
  { slug: 'housekeeping-cleaning', icon: 'sparkles', related: ['office-deep-cleaning', 'sofa-carpet-cleaning', 'facility-management'] },
  { slug: 'sofa-carpet-cleaning', icon: 'sofa', image: 'assets/promos/sofa-carpet-cleaning-photo.jpg', related: ['housekeeping-cleaning', 'office-deep-cleaning', 'hvac-ac-maintenance'] },
  { slug: 'solar-panel-cleaning', icon: 'sun', image: 'assets/promos/solar-panel-cleaning-photo.jpg', related: ['electrical-maintenance', 'facility-management', 'housekeeping-cleaning'] },
  { slug: 'facility-management', icon: 'building', related: ['housekeeping-cleaning', 'security-services', 'electrical-maintenance'] },
  { slug: 'security-services', icon: 'shield', related: ['facility-management', 'housekeeping-cleaning', 'gardening-landscaping'] },
  { slug: 'gardening-landscaping', icon: 'leaf', related: ['facility-management', 'housekeeping-cleaning', 'plumbing-services'] },
  { slug: 'electrical-maintenance', icon: 'bolt', related: ['hvac-ac-maintenance', 'plumbing-services', 'solar-panel-cleaning'] },
  { slug: 'plumbing-services', icon: 'droplet', related: ['electrical-maintenance', 'facility-management', 'housekeeping-cleaning'] },
  { slug: 'hvac-ac-maintenance', icon: 'wind', related: ['electrical-maintenance', 'office-deep-cleaning', 'facility-management'] },
  { slug: 'office-deep-cleaning', icon: 'briefcase', related: ['housekeeping-cleaning', 'sofa-carpet-cleaning', 'hvac-ac-maintenance'] }
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
  { id: 'corporate-offices', key: 'indOffices', icon: 'briefcase', services: ['office-deep-cleaning', 'facility-management', 'hvac-ac-maintenance', 'security-services'] },
  { id: 'residential-buildings', key: 'indResidential', icon: 'home', services: ['housekeeping-cleaning', 'sofa-carpet-cleaning', 'security-services', 'gardening-landscaping'] },
  { id: 'hotels-hospitality', key: 'indHotels', icon: 'hotel', services: ['housekeeping-cleaning', 'sofa-carpet-cleaning', 'hvac-ac-maintenance', 'gardening-landscaping'] },
  { id: 'hospitals-healthcare', key: 'indHospitals', icon: 'hospital', services: ['housekeeping-cleaning', 'facility-management', 'plumbing-services', 'electrical-maintenance'] },
  { id: 'shopping-malls', key: 'indMalls', icon: 'bag', services: ['facility-management', 'security-services', 'housekeeping-cleaning', 'hvac-ac-maintenance'] },
  { id: 'industrial-facilities', key: 'indIndustrial', icon: 'factory', services: ['facility-management', 'solar-panel-cleaning', 'electrical-maintenance', 'security-services'] },
  { id: 'educational-institutions', key: 'indEducation', icon: 'school', services: ['housekeeping-cleaning', 'gardening-landscaping', 'security-services', 'plumbing-services'] }
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
