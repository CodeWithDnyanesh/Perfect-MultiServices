import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { ServiceCatalog } from '../services/service-catalog.service';
import { IconComponent } from '../shared/icon.component';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent, ReasonsComponent } from '../shared/sections.component';
import { ABOUT_BENEFITS } from '../content/site-content';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, IconComponent, PageHeroComponent, RevealDirective, ReasonsComponent, CtaBandComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('navAbout')" [title]="i18n.t('aboutHeroTitle')" [text]="i18n.t('aboutHeroText')"
        [crumbs]="[{ label: i18n.t('navAbout') }]" />

      <section class="section" aria-labelledby="story-title">
        <div class="container story">
          <div class="story-visual" appReveal>
            <img src="assets/site/about-multi-services.jpg" width="596" height="768" loading="lazy" [alt]="i18n.t('aboutImageAlt')" />
            <div class="stamp"><strong>One Call</strong><span>All Services</span></div>
          </div>
          <div appReveal>
            <p class="eyebrow">{{ i18n.t('aboutEyebrowNew') }}</p>
            <h2 id="story-title">{{ i18n.t('aboutTitleNew') }}</h2>
            <p class="lead">{{ i18n.t('aboutTextNew') }}</p>
            <p class="lead">{{ i18n.t('aboutStoryExtra') }}</p>
            <div class="pillars">
              @for (p of pillars; track p.key) {
                <div class="pillar">
                  <span class="badge-icon"><app-icon [name]="p.icon" /></span>
                  <div>
                    <h3>{{ i18n.t(p.key + 'Title') }}</h3>
                    <p>{{ i18n.t(p.key + 'Text') }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <section class="section section-white" aria-labelledby="values-title">
        <div class="container">
          <header class="section-head" appReveal>
            <p class="eyebrow">{{ i18n.t('aboutValuesEyebrow') }}</p>
            <h2 id="values-title">{{ i18n.t('aboutValuesTitle') }}</h2>
          </header>
          <div class="values">
            @for (b of benefits; track b.key) {
              <div class="value" appReveal>
                <span class="value-icon"><app-icon [name]="b.icon" /></span>
                <h3>{{ i18n.t(b.key + 'Title') }}</h3>
                <p>{{ i18n.t(b.key + 'Text') }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="what-title">
        <div class="container">
          <header class="section-head section-head-row" appReveal>
            <div>
              <p class="eyebrow">{{ i18n.t('aboutServicesTitle') }}</p>
              <h2 id="what-title">{{ i18n.t('servicesTitleNew') }}</h2>
            </div>
            <a class="link-arrow" routerLink="/services">{{ i18n.t('navAllServices') }} <app-icon name="arrowRight" /></a>
          </header>
          <ul class="service-links" appReveal>
            @for (s of catalog.all(); track s.slug) {
              <li><a [routerLink]="s.url"><span class="badge-icon"><app-icon [name]="s.icon" /></span> {{ s.content.name }} <app-icon name="arrowRight" class="arrow" /></a></li>
            }
          </ul>
        </div>
      </section>

      <section class="section section-white" aria-labelledby="why-title">
        <div class="container">
          <header class="section-head section-head-row" appReveal>
            <div>
              <p class="eyebrow">{{ i18n.t('whyEyebrow') }}</p>
              <h2 id="why-title">{{ i18n.t('whyTitle') }}</h2>
            </div>
            <a class="link-arrow" routerLink="/why-choose-us">{{ i18n.t('whyLink') }} <app-icon name="arrowRight" /></a>
          </header>
          <app-reasons />
        </div>
      </section>

      <app-cta-band />
    </main>
  `,
  styles: [`
    .story { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); align-items: center; gap: clamp(36px, 6vw, 88px); }
    .story-visual { position: relative; padding: 0 24px 24px 0; }
    .story-visual::before { content: ''; position: absolute; inset: 40px 0 0 40px; border: 1px solid rgba(255, 121, 0, .2); border-radius: 28px; background: var(--c-orange-soft); }
    .story-visual img { position: relative; z-index: 1; display: block; width: 100%; height: auto; border-radius: 28px; box-shadow: var(--shadow-lg); }
    .stamp { position: absolute; right: 0; bottom: 0; z-index: 2; display: grid; place-items: center; width: 128px; height: 128px; border: 6px solid #fff; border-radius: 50%; background: var(--c-orange); color: #fff; text-align: center; box-shadow: var(--shadow-lg); }
    .stamp strong { align-self: end; font-size: 1.12rem; line-height: 1; }
    .stamp span { align-self: start; margin-top: 4px; font-size: .78rem; font-weight: 600; }
    h2 { margin-bottom: 18px !important; }
    .lead { margin: 0 0 14px; }
    .pillars { display: grid; gap: 14px; margin-top: 26px; }
    .pillar { display: flex; gap: 14px; padding: 18px; border: 1px solid var(--c-line); border-radius: 16px; background: #fff; }
    .pillar h3 { margin-bottom: 4px !important; }
    .pillar p { margin: 0; color: var(--c-text); font-size: .92rem; line-height: 1.6; }
    .values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
    .value { padding: 28px 24px; border: 1px solid var(--c-line); border-radius: 22px; background: var(--c-bg); }
    .value-icon { display: inline-grid; place-items: center; width: 56px; height: 56px; margin-bottom: 18px; border-radius: 16px; background: var(--c-orange); color: #fff; font-size: 1.6rem; }
    .value h3 { margin-bottom: 8px !important; }
    .value p { margin: 0; color: var(--c-text); font-size: .92rem; line-height: 1.6; }
    .service-links { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
    .service-links a { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1px solid var(--c-line); border-radius: 16px; background: #fff; color: var(--c-ink); font-weight: 700; text-decoration: none; transition: border-color .2s, transform .2s; }
    .service-links a:hover { border-color: rgba(255, 121, 0, .45); transform: translateY(-2px); }
    .service-links .arrow { margin-left: auto; color: var(--c-orange); }
    @media (max-width: 900px) {
      .story { grid-template-columns: minmax(0, 1fr); }
      .story-visual { max-width: 440px; }
      .values { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 560px) { .values { grid-template-columns: minmax(0, 1fr); } }
  `]
})
export class AboutPageComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
  readonly benefits = ABOUT_BENEFITS;
  readonly pillars = [
    { key: 'mission', icon: 'award' },
    { key: 'vision', icon: 'search' },
    { key: 'aboutApproach', icon: 'layers' }
  ];
}
