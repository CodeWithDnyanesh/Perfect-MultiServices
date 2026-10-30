import { Injectable, computed, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { SITE_SERVICES, ServiceSlug, SiteService } from '../content/site-content';
import { ServiceContent, ServiceContentSet } from '../content/services/service-content';
import { SERVICES_EN } from '../content/services/services.en';
import { SERVICES_MR } from '../content/services/services.mr';
import { SERVICES_HI } from '../content/services/services.hi';

const CONTENT: Record<'en' | 'mr' | 'hi', ServiceContentSet> = { en: SERVICES_EN, mr: SERVICES_MR, hi: SERVICES_HI };

export interface CatalogEntry extends SiteService {
  content: ServiceContent;
  url: string;
}

/** The 10 services with their content in the visitor's current language. */
@Injectable({ providedIn: 'root' })
export class ServiceCatalog {
  private readonly i18n = inject(LanguageService);

  readonly all = computed<CatalogEntry[]>(() => {
    const content = CONTENT[this.i18n.language()];
    return SITE_SERVICES.map(service => ({ ...service, content: content[service.slug], url: `/services/${service.slug}` }));
  });

  get(slug: string): CatalogEntry | undefined {
    return this.all().find(entry => entry.slug === slug);
  }

  /** English name, used for enquiries sent to the team and for page titles. */
  englishName(slug: string): string {
    return SERVICES_EN[slug as ServiceSlug]?.name ?? slug;
  }

  englishSummary(slug: string): string {
    return SERVICES_EN[slug as ServiceSlug]?.summary ?? '';
  }
}
