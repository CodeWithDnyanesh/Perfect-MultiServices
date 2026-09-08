import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminServicesComponent } from './components/admin/admin-services/admin-services.component';
import { AdminBookingsComponent } from './components/admin/admin-bookings/admin-bookings.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminPlaceholderComponent } from './components/admin/admin-placeholder/admin-placeholder.component';
import { ServicesComponent } from './components/services/services.component';
import { ProcessComponent } from './components/process/process.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'how-it-works', component: ProcessComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'service/:name', component: ServiceDetailComponent },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'bookings', component: AdminBookingsComponent },
      { path: 'customers', component: AdminCustomersComponent },
      { path: 'staff', component: AdminPlaceholderComponent },
      { path: 'payments', component: AdminPlaceholderComponent },
      { path: 'reports', component: AdminPlaceholderComponent },
      { path: 'settings', component: AdminPlaceholderComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
