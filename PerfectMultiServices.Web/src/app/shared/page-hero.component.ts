import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { IconComponent } from './icon.component';

export interface Crumb { label: string; url?: string; }

/** Title band at the top of every inner page, with breadcrumb and optional actions. */
@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <svg class="curves" viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1040 0C1120 120 1240 190 1440 210V0Z" />
        <path d="M0 330C300 290 640 360 1000 340C1200 330 1330 300 1440 280V360H0Z" />
      </svg>
      <div class="container layout" [class.split]="split()">
        <div class="copy">
        <nav class="crumbs" [attr.aria-label]="i18n.t('breadcrumbLabel')">
          <ol>
            <li><a routerLink="/">{{ i18n.t('breadcrumbHome') }}</a></li>
            @for (crumb of crumbs(); track crumb.label) {
              <li>
                <app-icon name="arrowRight" />
                @if (crumb.url) { <a [routerLink]="crumb.url">{{ crumb.label }}</a> }
                @else { <span aria-current="page">{{ crumb.label }}</span> }
              </li>
            }
          </ol>
        </nav>
        @if (eyebrow()) { <p class="eyebrow">{{ eyebrow() }}</p> }
        <h1>{{ title() }}</h1>
        @if (text()) { <p class="hero-text">{{ text() }}</p> }
        <ng-content />
        </div>
        <ng-content select="[heroAside]" />
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .page-hero { position: relative; overflow: hidden; padding: clamp(40px, 6vw, 72px) 0 clamp(56px, 7vw, 88px); background: #fff; isolation: isolate; }
    .curves { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; }
    .curves path:first-child { fill: #fff2e6; }
    .curves path:last-child { fill: var(--c-bg); }
    .layout.split { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); align-items: center; gap: clamp(32px, 5vw, 64px); }
    @media (max-width: 900px) { .layout.split { grid-template-columns: minmax(0, 1fr); } }
    .crumbs ol { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 0 0 26px; padding: 0; list-style: none; font-size: .86rem; font-weight: 600; }
    .crumbs li { display: inline-flex; align-items: center; gap: 6px; color: var(--c-grey); }
    .crumbs app-icon { font-size: .9em; color: #c4bdb2; }
    .crumbs a { color: var(--c-grey); text-decoration: none; }
    .crumbs a:hover { color: var(--c-orange-dark); }
    .crumbs [aria-current] { color: var(--c-ink); }
    h1 { max-width: 860px; margin: 0; color: var(--c-ink); font-size: clamp(2.2rem, 4.6vw, 3.6rem); font-weight: 800; line-height: 1.08; letter-spacing: -.035em; }
    .hero-text { max-width: 680px; margin: 18px 0 0; color: var(--c-text); font-size: clamp(1rem, 1.3vw, 1.12rem); line-height: 1.75; }
  `]
})
export class PageHeroComponent {
  readonly i18n = inject(LanguageService);
  readonly title = input.required<string>();
  readonly text = input<string>('');
  readonly eyebrow = input<string>('');
  readonly crumbs = input<Crumb[]>([]);
  /** Two columns, with content marked [heroAside] on the right. */
  readonly split = input(false);
}
