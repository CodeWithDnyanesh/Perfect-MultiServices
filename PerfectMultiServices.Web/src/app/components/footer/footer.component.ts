import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCatalog } from '../../services/service-catalog.service';
import { IconComponent } from '../../shared/icon.component';
import { COMPANY_CONTACT } from '../../content/site-content';

const FOOTER_SERVICES = ['housekeeping-cleaning', 'deep-cleaning', 'sofa-carpet-cleaning', 'solar-panel-cleaning', 'pest-control', 'facility-management', 'water-tank-cleaning', 'staffing-care-services'];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);

  /** A short list keeps the footer compact; the rest are on /services. */
  readonly footerServices = computed(() => this.catalog.all().filter(s => FOOTER_SERVICES.includes(s.slug)));
  readonly currentYear = new Date().getFullYear();
  readonly contact = COMPANY_CONTACT;
  readonly quickLinks = [
    { url: '/', label: 'navHome' },
    { url: '/about', label: 'navAbout' },
    { url: '/services', label: 'navServicesMenu' },
    { url: '/industries', label: 'navIndustries' },
    { url: '/why-choose-us', label: 'navWhy' },
    { url: '/contact', label: 'navContact' },
    { url: '/get-a-quote', label: 'navQuoteShort' }
  ];
}
