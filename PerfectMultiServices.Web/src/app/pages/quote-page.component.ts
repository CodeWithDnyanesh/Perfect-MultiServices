import { Component, inject, input } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { IconComponent } from '../shared/icon.component';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { EnquiryFormComponent } from '../shared/enquiry-form.component';
import { COMPANY_CONTACT } from '../content/site-content';

@Component({
  selector: 'app-quote-page',
  standalone: true,
  imports: [IconComponent, PageHeroComponent, RevealDirective, EnquiryFormComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('navQuoteShort')" [title]="i18n.t('navQuote')" [text]="i18n.t('quoteText')"
        [crumbs]="[{ label: i18n.t('navQuoteShort') }]" />

      <section class="section first">
        <div class="container grid">
          <div class="form-card" appReveal>
            <app-enquiry-form [detailed]="true" [preset]="service() ?? ''" />
          </div>

          <aside class="side" appReveal>
            <div class="next">
              <h2>{{ i18n.t('quoteNextTitle') }}</h2>
              <ol>
                @for (step of nextSteps; track step; let i = $index) {
                  <li><span>{{ i + 1 }}</span> {{ i18n.t(step) }}</li>
                }
              </ol>
            </div>
            <div class="talk">
              <h2>{{ i18n.t('quotePreferTalk') }}</h2>
              @for (phone of contact.phones; track phone.href) {
                <a class="talk-link" [href]="phone.href"><app-icon name="phone" /> {{ phone.label }}</a>
              }
              <a class="btn btn-whatsapp btn-block" [href]="contact.whatsapp" target="_blank" rel="noopener">
                <app-icon name="whatsapp" /> {{ i18n.t('whatsappCta') }}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .first { padding-top: clamp(40px, 5vw, 64px); }
    .grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); align-items: start; gap: clamp(24px, 4vw, 48px); }
    .form-card { padding: clamp(24px, 3.5vw, 40px); border: 1px solid var(--c-line); border-radius: 26px; background: #fff; box-shadow: var(--shadow-lg); }
    .side { position: sticky; top: calc(var(--header-h) + 20px); display: grid; gap: 18px; }
    .next, .talk { padding: 26px; border-radius: 22px; }
    .next { background: var(--c-ink); color: #fff; }
    .talk { border: 1px solid var(--c-line); background: #fff; }
    h2 { margin-bottom: 16px !important; font-size: 1.25rem !important; }
    .next h2 { color: #fff !important; }
    ol { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }
    li { display: flex; gap: 12px; color: #d6d3cd; line-height: 1.55; }
    li span { display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--c-orange); color: #fff; font-size: .85rem; font-weight: 800; }
    .talk-link { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: var(--c-ink); font-weight: 700; text-decoration: none; }
    .talk-link app-icon { color: var(--c-orange); }
    .talk-link:hover { color: var(--c-orange-dark); }
    .talk .btn { margin-top: 8px; }
    @media (max-width: 960px) { .grid { grid-template-columns: minmax(0, 1fr); } .side { position: static; } }
  `]
})
export class QuotePageComponent {
  readonly i18n = inject(LanguageService);
  readonly contact = COMPANY_CONTACT;
  /** ?service=<slug> preselects a service. */
  readonly service = input<string>();
  readonly nextSteps = ['quoteNext1', 'quoteNext2', 'quoteNext3'];
}
