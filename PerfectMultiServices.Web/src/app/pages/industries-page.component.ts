import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { ServiceCatalog } from '../services/service-catalog.service';
import { IconComponent } from '../shared/icon.component';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent } from '../shared/sections.component';
import { SITE_INDUSTRIES } from '../content/site-content';

@Component({
  selector: 'app-industries-page',
  standalone: true,
  imports: [RouterLink, IconComponent, PageHeroComponent, RevealDirective, CtaBandComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('industriesEyebrow')" [title]="i18n.t('industriesTitle')" [text]="i18n.t('industriesText')"
        [crumbs]="[{ label: i18n.t('navIndustries') }]" />

      <section class="section">
        <div class="container list">
          @for (industry of industries; track industry.id; let i = $index) {
            <article class="industry" [id]="industry.id" [class.flip]="i % 2 === 1">
              <div class="media" [class.media-placeholder]="!industry.image">
                @if (industry.image) {
                  <img [src]="industry.image" [alt]="i18n.t(industry.key + 'Title')" loading="lazy" />
                } @else {
                  <app-icon [name]="industry.icon" />
                }
              </div>
              <div class="body">
                <span class="badge-icon"><app-icon [name]="industry.icon" /></span>
                <h2>{{ i18n.t(industry.key + 'Title') }}</h2>
                <p class="lead">{{ i18n.t(industry.key + 'Long') }}</p>
                <h3>{{ i18n.t('industryServicesLabel') }}</h3>
                <ul class="links">
                  @for (slug of industry.services; track slug) {
                    @let s = catalog.get(slug)!;
                    <li><a [routerLink]="s.url"><app-icon [name]="s.icon" /> {{ s.content.name }}</a></li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </section>

      <app-cta-band />
    </main>
  `,
  styles: [`
    .section { padding-top: clamp(40px, 5vw, 64px); }
    .list { display: grid; gap: clamp(24px, 4vw, 40px); }
    .industry { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); overflow: hidden; border: 1px solid var(--c-line); border-radius: 26px; background: #fff; scroll-margin-top: calc(var(--header-h) + 20px); }
    .industry.flip { grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr); }
    .industry.flip .media { order: 2; }
    .media { min-height: 260px; }
    .media app-icon { font-size: 4.5rem !important; }
    .body { padding: clamp(24px, 3.5vw, 44px); }
    .body .badge-icon { margin-bottom: 16px; }
    h2 { margin-bottom: 12px !important; font-size: clamp(1.5rem, 2.4vw, 2rem) !important; }
    .lead { margin: 0 0 22px; }
    h3 { margin-bottom: 12px !important; color: var(--c-grey) !important; font-size: .8rem !important; letter-spacing: .12em !important; text-transform: uppercase; }
    .links { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .links a { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border: 1px solid var(--c-line); border-radius: 999px; background: var(--c-bg); color: var(--c-ink); font-size: .88rem; font-weight: 600; text-decoration: none; transition: border-color .2s, color .2s; }
    .links a:hover { border-color: var(--c-orange); color: var(--c-orange-dark); }
    .links app-icon { color: var(--c-orange); }
    .industry:target { border-color: var(--c-orange); box-shadow: 0 0 0 4px rgba(255, 121, 0, .14); }
    @media (max-width: 820px) {
      .industry, .industry.flip { grid-template-columns: minmax(0, 1fr); }
      .industry.flip .media { order: 0; }
      .media { min-height: 180px; }
    }
  `]
})
export class IndustriesPageComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
  readonly industries = SITE_INDUSTRIES;
}
