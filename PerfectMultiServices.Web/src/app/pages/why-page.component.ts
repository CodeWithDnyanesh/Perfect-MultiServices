import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { IconComponent } from '../shared/icon.component';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent, ReasonsComponent, StepsComponent } from '../shared/sections.component';

@Component({
  selector: 'app-why-page',
  standalone: true,
  imports: [IconComponent, PageHeroComponent, RevealDirective, ReasonsComponent, StepsComponent, CtaBandComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('whyEyebrow')" [title]="i18n.t('whyTitle')" [text]="i18n.t('whyText')"
        [crumbs]="[{ label: i18n.t('navWhy') }]" />

      <section class="section first">
        <div class="container"><app-reasons /></div>
      </section>

      <section class="section section-white" aria-labelledby="promise-title">
        <div class="container promise">
          <div appReveal>
            <p class="eyebrow">{{ i18n.t('servicePromise') }}</p>
            <h2 id="promise-title">{{ i18n.t('heroTrust') }}</h2>
            <p class="lead">{{ i18n.t('whyPromiseText') }}</p>
          </div>
          <ul class="check-list promise-list" appReveal>
            @for (item of promises; track item) {
              <li><app-icon name="check" /> {{ i18n.t(item) }}</li>
            }
          </ul>
        </div>
      </section>

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
    .first { padding-top: clamp(40px, 5vw, 64px); }
    .promise { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: clamp(32px, 5vw, 72px); }
    .promise h2 { margin-bottom: 16px !important; }
    .promise-list li { padding: 16px 18px; border: 1px solid var(--c-line); border-radius: 14px; background: var(--c-bg); font-weight: 700; }
    @media (max-width: 860px) { .promise { grid-template-columns: minmax(0, 1fr); } }
  `]
})
export class WhyPageComponent {
  readonly i18n = inject(LanguageService);
  readonly promises = ['assureTrained', 'assureEquipment', 'assureSafe', 'assureSatisfaction', 'assureCommercial'];
}
