import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SITE_SERVICES } from './content/site-content';
import { SERVICES_EN } from './content/services/services.en';

const SITE = 'Perfect Multi Services';

const serviceDetail = () => import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent);

/** One route per service, so every service has its own URL, title and description. */
const serviceRoutes: Routes = SITE_SERVICES.map(({ slug }) => ({
  path: `services/${slug}`,
  loadComponent: serviceDetail,
  title: `${SERVICES_EN[slug].name} | ${SITE}`,
  data: { slug, description: SERVICES_EN[slug].summary }
}));

/** Links from the previous version of the site. */
const LEGACY_SERVICE_URLS: Record<string, string> = {
  'home-housekeeping': 'housekeeping-cleaning',
  'housekeeping-services': 'housekeeping-cleaning',
  'deep-cleaning': 'housekeeping-cleaning',
  'office-cleaning': 'office-deep-cleaning',
  'office-maintenance': 'facility-management',
  'maintenance-services': 'facility-management',
  'industrial-cleaning': 'facility-management',
  'solar-panel-cleaning': 'solar-panel-cleaning'
};

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    title: `${SITE} Pvt. Ltd. | Facility Management, Cleaning & Maintenance in Sangli`,
    data: { description: 'One call, all services. Housekeeping, office deep cleaning, sofa & carpet cleaning, solar panel cleaning, facility management, security, electrical, plumbing and AC maintenance in Sangli, Maharashtra.' }
  },
  {
    path: 'about', loadComponent: () => import('./pages/about-page.component').then(m => m.AboutPageComponent),
    title: `About Us | ${SITE}`,
    data: { description: 'Perfect Multi Services Pvt. Ltd. delivers reliable cleaning, maintenance and facility management for residential, commercial and industrial spaces in Sangli.' }
  },
  {
    path: 'services', loadComponent: () => import('./pages/services-page.component').then(m => m.ServicesPageComponent),
    title: `Our Services | ${SITE}`,
    data: { description: 'Housekeeping, sofa & carpet cleaning, solar panel cleaning, facility management, security, gardening, electrical, plumbing, HVAC and office deep cleaning.' }
  },
  ...serviceRoutes,
  {
    path: 'industries', loadComponent: () => import('./pages/industries-page.component').then(m => m.IndustriesPageComponent),
    title: `Industries We Serve | ${SITE}`,
    data: { description: 'Cleaning, maintenance and facility services for offices, residential buildings, hotels, hospitals, malls, industrial facilities and educational institutions.' }
  },
  {
    path: 'why-choose-us', loadComponent: () => import('./pages/why-page.component').then(m => m.WhyPageComponent),
    title: `Why Choose Us | ${SITE}`,
    data: { description: 'Flexible scheduling, detail-led quality, skilled professionals and complete service solutions, all through one call.' }
  },
  {
    path: 'contact', loadComponent: () => import('./pages/contact-page.component').then(m => m.ContactPageComponent),
    title: `Contact Us | ${SITE}`,
    data: { description: 'Call, WhatsApp or email Perfect Multi Services in Sangli, or send us an enquiry online.' }
  },
  {
    path: 'get-a-quote', loadComponent: () => import('./pages/quote-page.component').then(m => m.QuotePageComponent),
    title: `Get a Free Quote | ${SITE}`,
    data: { description: 'Request a free, no-obligation quote for cleaning, maintenance or facility management services.' }
  },

  // Old addresses
  { path: 'how-it-works', redirectTo: 'why-choose-us', pathMatch: 'full' },
  { path: 'service/:name', redirectTo: ({ params }) => {
    const slug = LEGACY_SERVICE_URLS[params['name']];
    return slug ? `/services/${slug}` : '/services';
  } },

  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    title: `Admin | ${SITE}`,
    data: { noindex: true },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'services', loadComponent: () => import('./components/admin/admin-services/admin-services.component').then(m => m.AdminServicesComponent) },
      { path: 'bookings', loadComponent: () => import('./components/admin/admin-bookings/admin-bookings.component').then(m => m.AdminBookingsComponent) },
      { path: 'customers', loadComponent: () => import('./components/admin/admin-customers/admin-customers.component').then(m => m.AdminCustomersComponent) },
      { path: 'staff', loadComponent: () => import('./components/admin/admin-placeholder/admin-placeholder.component').then(m => m.AdminPlaceholderComponent) },
      { path: 'payments', loadComponent: () => import('./components/admin/admin-placeholder/admin-placeholder.component').then(m => m.AdminPlaceholderComponent) },
      { path: 'reports', loadComponent: () => import('./components/admin/admin-placeholder/admin-placeholder.component').then(m => m.AdminPlaceholderComponent) },
      { path: 'settings', loadComponent: () => import('./components/admin/admin-placeholder/admin-placeholder.component').then(m => m.AdminPlaceholderComponent) }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
