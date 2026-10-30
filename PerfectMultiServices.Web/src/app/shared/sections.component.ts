import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SITE_REASONS, SITE_STEPS } from '../content/site-content';
import { IconComponent } from './icon.component';
import { RevealDirective } from './reveal.directive';

/** "How it works": four steps, horizontal on desktop and vertical on phones. */
@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="steps">
      @for (step of steps; track step.key; let i = $index) {
        <li class="step" appReveal>
          <span class="step-icon"><app-icon [name]="step.icon" /><b>{{ i + 1 }}</b></span>
          <h3>{{ i18n.t(step.key + 'Title') }}</h3>
          <p>{{ i18n.t(step.key + 'Text') }}</p>
        </li>
      }
    </ol>
  `,
  styles: [`
    :host { display: block; }
    .steps { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; margin: 0; padding: 0; list-style: none; }
    .steps::before { content: ''; position: absolute; top: 36px; left: 12.5%; right: 12.5%; border-top: 2px dashed rgba(255, 121, 0, .45); }
    .step { position: relative; padding: 0 8px; text-align: center; }
    .step-icon {
      position: relative; display: inline-grid; place-items: center; width: 72px; height: 72px; margin-bottom: 20px;
      border: 2px solid var(--c-orange); border-radius: 50%; background: #fff; color: var(--c-orange); font-size: 1.8rem;
      box-shadow: 0 0 0 8px var(--c-bg);
    }
    .step-icon b { position: absolute; top: -6px; right: -6px; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: var(--c-ink); color: #fff; font-size: .8rem; }
    h3 { margin: 0 0 8px; color: var(--c-ink); font-size: 1.08rem; font-weight: 800; }
    p { max-width: 260px; margin: 0 auto; color: var(--c-text); font-size: .92rem; line-height: 1.6; }
    @media (max-width: 900px) {
      .steps { grid-template-columns: minmax(0, 1fr); gap: 0; }
      .steps::before { top: 36px; bottom: 36px; left: 36px; right: auto; border-top: 0; border-left: 2px dashed rgba(255, 121, 0, .45); }
      .step { display: grid; grid-template-columns: 72px minmax(0, 1fr); column-gap: 20px; padding: 0 0 28px; text-align: left; }
      .step-icon { grid-row: span 2; margin: 0; }
      h3 { align-self: end; margin: 6px 0 4px; }
      p { max-width: none; margin: 0; }
    }
  `]
})
export class StepsComponent {
  readonly i18n = inject(LanguageService);
  readonly steps = SITE_STEPS;
}

/** The six "Why choose us" cards. */
@Component({
  selector: 'app-reasons',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (reason of reasons; track reason.key; let i = $index) {
        <article class="card" appReveal>
          <span class="num">0{{ i + 1 }}</span>
          <span class="icon"><app-icon [name]="reason.icon" /></span>
          <h3>{{ i18n.t(reason.key + 'Title') }}</h3>
          <p>{{ i18n.t(reason.key + 'Text') }}</p>
        </article>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
    .card { position: relative; padding: 30px 26px 28px; border: 1px solid var(--c-line); border-radius: 22px; background: #fff; box-shadow: var(--shadow-sm); transition: transform .3s ease, box-shadow .3s ease; }
    .card::after { content: ''; position: absolute; left: 26px; right: 26px; top: 0; height: 3px; border-radius: 0 0 3px 3px; background: var(--c-orange); transform: scaleX(.25); transform-origin: left; transition: transform .35s ease; }
    .card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .card:hover::after { transform: scaleX(1); }
    .num { position: absolute; top: 24px; right: 26px; color: #e3ded6; font-size: 1.6rem; font-weight: 800; }
    .icon { display: inline-grid; place-items: center; width: 56px; height: 56px; margin-bottom: 22px; border-radius: 16px; background: var(--c-orange); color: #fff; font-size: 1.6rem; box-shadow: 0 10px 20px rgba(255, 121, 0, .25); }
    h3 { margin: 0 0 10px; color: var(--c-ink); font-size: 1.12rem; font-weight: 800; }
    p { margin: 0; color: var(--c-text); font-size: .93rem; line-height: 1.65; }
    @media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) { .grid { grid-template-columns: minmax(0, 1fr); } }
    @media (prefers-reduced-motion: reduce) { .card, .card::after { transition: none; } }
  `]
})
export class ReasonsComponent {
  readonly i18n = inject(LanguageService);
  readonly reasons = SITE_REASONS;
}

/** Orange call-to-action band that leads to the quote and contact pages. */
@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-tight">
      <div class="container">
        <div class="cta" appReveal>
          <svg class="curves" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M600 0v300H340C430 240 470 140 600 0Z" />
            <path d="M600 90v210H460C520 230 560 170 600 90Z" />
          </svg>
          <div class="copy">
            <h2>{{ title() || i18n.t('ctaTitle') }}</h2>
            <p>{{ text() || i18n.t('ctaText') }}</p>
          </div>
          <div class="actions">
            <a class="btn btn-light" [routerLink]="'/get-a-quote'" [queryParams]="service() ? { service: service() } : {}">{{ i18n.t('ctaQuote') }}</a>
            <a class="btn btn-ghost-light" routerLink="/contact">{{ i18n.t('ctaContact') }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .cta {
      position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px 40px;
      overflow: hidden; padding: clamp(32px, 5vw, 60px); border-radius: 30px; background: var(--c-orange); color: #fff; isolation: isolate;
      box-shadow: 0 24px 50px rgba(255, 121, 0, .28);
    }
    .curves { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; }
    .curves path:first-child { fill: rgba(255, 255, 255, .1); }
    .curves path:last-child { fill: rgba(255, 255, 255, .14); }
    .copy { max-width: 640px; }
    h2 { margin: 0; color: #fff; font-size: clamp(1.8rem, 3.2vw, 2.6rem); font-weight: 800; line-height: 1.15; letter-spacing: -.02em; }
    p { margin: 12px 0 0; color: rgba(255, 255, 255, .92); font-size: 1.08rem; line-height: 1.6; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; }
    @media (max-width: 600px) { .actions .btn { flex: 1 1 100%; } }
  `]
})
export class CtaBandComponent {
  readonly i18n = inject(LanguageService);
  readonly title = input('');
  readonly text = input('');
  /** Preselects this service on the quote page. */
  readonly service = input('');
}
