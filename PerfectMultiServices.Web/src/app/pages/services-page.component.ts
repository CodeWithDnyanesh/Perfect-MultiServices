import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { ServiceCatalog } from '../services/service-catalog.service';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { ServiceCardComponent } from '../shared/service-card.component';
import { CtaBandComponent, StepsComponent } from '../shared/sections.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective, ServiceCardComponent, StepsComponent, CtaBandComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('servicesEyebrowNew')" [title]="i18n.t('servicesPageTitle')"
        [text]="i18n.t('servicesTextNew')" [crumbs]="[{ label: i18n.t('navServicesMenu') }]" />

      <section class="section" aria-label="{{ i18n.t('navServicesMenu') }}">
        <div class="container grid">
          @for (service of catalog.all(); track service.slug) {
            <app-service-card [service]="service" appReveal />
          }
        </div>
      </section>

      <section class="section section-white" aria-labelledby="steps-title">
        <div class="container">
          <header class="section-head section-head-center" appReveal>
            <p class="eyebrow">{{ i18n.t('stepsEyebrow') }}</p>
            <h2 id="steps-title">{{ i18n.t('stepsTitle') }}</h2>
          </header>
          <app-steps />
        </div>
      </section>

      <app-cta-band />
    </main>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 22px; }
    .section:first-of-type { padding-top: clamp(40px, 5vw, 64px); }
  `]
})
export class ServicesPageComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
}
