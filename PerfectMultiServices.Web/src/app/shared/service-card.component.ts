import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { CatalogEntry } from '../services/service-catalog.service';
import { IconComponent } from './icon.component';

/** Image card for one service. The whole card links to its detail page. */
@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="card" [routerLink]="service().url">
      <div class="media" [class.media-placeholder]="!service().image">
        @if (service().image) {
          <img [src]="service().image" alt="" loading="lazy" width="1000" height="1000" />
        } @else {
          <app-icon [name]="service().icon" />
        }
      </div>
      <div class="body">
        <span class="badge-icon"><app-icon [name]="service().icon" /></span>
        <h3>{{ service().content.name }}</h3>
        <p>{{ service().content.summary }}</p>
        @if (highlights()) {
          <ul>
            @for (point of service().content.highlights; track point) {
              <li><app-icon name="check" /> {{ point }}</li>
            }
          </ul>
        }
        <span class="link-arrow">{{ i18n.t('learnMore') }} <app-icon name="arrowRight" /></span>
      </div>
    </a>
  `,
  styles: [`
    :host { display: block; }
    .card {
      display: flex; flex-direction: column; height: 100%; overflow: hidden; border: 1px solid var(--c-line); border-radius: 22px;
      background: #fff; color: inherit; text-decoration: none; box-shadow: var(--shadow-sm);
      transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
    }
    .card:hover { transform: translateY(-6px); border-color: rgba(255, 121, 0, .35); box-shadow: var(--shadow-lg); }
    .card:hover .media img { transform: scale(1.05); }
    .card:hover .link-arrow app-icon { transform: translateX(4px); }
    .card:focus-visible { outline: 3px solid rgba(255, 121, 0, .4); outline-offset: 3px; }
    .media { aspect-ratio: 16 / 10; }
    .body { position: relative; display: flex; flex: 1; flex-direction: column; gap: 10px; padding: 34px 22px 24px; }
    .badge-icon { position: absolute; top: -22px; left: 22px; background: #fff; box-shadow: var(--shadow-sm); }
    h3 { margin: 0; color: var(--c-ink); font-size: 1.12rem; font-weight: 800; line-height: 1.35; letter-spacing: -.01em; }
    p { margin: 0; color: var(--c-text); font-size: .92rem; line-height: 1.6; }
    ul { display: grid; gap: 6px; margin: 4px 0 6px; padding: 0; list-style: none; }
    li { display: flex; align-items: center; gap: 8px; font-size: .86rem; font-weight: 600; }
    li app-icon { color: var(--c-orange); font-size: 1rem; }
    .link-arrow { margin-top: auto; padding-top: 6px; }
    @media (prefers-reduced-motion: reduce) { .card, .media img { transition: none; } }
  `]
})
export class ServiceCardComponent {
  readonly i18n = inject(LanguageService);
  readonly service = input.required<CatalogEntry>();
  readonly highlights = input(true);
}
