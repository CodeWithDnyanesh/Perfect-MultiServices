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

      @for (group of catalog.groups(); track group.id; let first = $first) {
        <section class="section" [class.section-white]="!first" [attr.aria-labelledby]="'group-' + group.id">
          <div class="container">
            <header class="group-head" appReveal>
              <h2 [id]="'group-' + group.id">{{ i18n.t(group.label) }}</h2>
              <span>{{ group.services.length }}</span>
            </header>
            <div class="grid">
              @for (service of group.services; track service.slug) {
                <app-service-card [service]="service" appReveal />
              }
            </div>
          </div>
        </section>
      }

      <section class="section" aria-labelledby="steps-title">
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
    .group-head { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
    .group-head span { display: grid; place-items: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 999px; background: var(--c-orange); color: #fff; font-weight: 800; }
  `]
})
export class ServicesPageComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
}
