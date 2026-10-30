import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { IconComponent } from '../shared/icon.component';
import { PageHeroComponent } from '../shared/page-hero.component';
import { RevealDirective } from '../shared/reveal.directive';
import { EnquiryFormComponent } from '../shared/enquiry-form.component';
import { COMPANY_CONTACT } from '../content/site-content';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, IconComponent, PageHeroComponent, RevealDirective, EnquiryFormComponent],
  template: `
    <main class="page">
      <app-page-hero [eyebrow]="i18n.t('contactEyebrowNew')" [title]="i18n.t('contactTitleNew')" [text]="i18n.t('contactTextNew')"
        [crumbs]="[{ label: i18n.t('navContact') }]" />

      <section class="section first">
        <div class="container">
          <div class="cards">
            <div class="card" appReveal>
              <span class="badge-icon"><app-icon name="phone" /></span>
              <h2>{{ i18n.t('contactCall') }}</h2>
              @for (phone of contact.phones; track phone.href) { <a [href]="phone.href">{{ phone.label }}</a> }
            </div>
            <div class="card" appReveal>
              <span class="badge-icon wa"><app-icon name="whatsapp" /></span>
              <h2>WhatsApp</h2>
              <p>{{ i18n.t('contactWhatsappText') }}</p>
              <a [href]="contact.whatsapp" target="_blank" rel="noopener">{{ contact.phones[0].label }}</a>
            </div>
            <div class="card" appReveal>
              <span class="badge-icon"><app-icon name="mail" /></span>
              <h2>{{ i18n.t('contactWrite') }}</h2>
              <a [href]="'mailto:' + contact.email">{{ contact.email }}</a>
            </div>
            <div class="card" appReveal>
              <span class="badge-icon"><app-icon name="pin" /></span>
              <h2>{{ i18n.t('contactVisit') }}</h2>
              <p>{{ i18n.t('officeAddress') }}</p>
              <a [href]="contact.map" target="_blank" rel="noopener">{{ i18n.t('openMap') }}</a>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-card" appReveal>
              <h2>{{ i18n.t('contactFormTitle') }}</h2>
              <app-enquiry-form />
            </div>
            <aside class="side" appReveal>
              <div class="quote-card">
                <h2>{{ i18n.t('contactQuotePrompt') }}</h2>
                <p>{{ i18n.t('contactQuoteText') }}</p>
                <a class="btn btn-primary" routerLink="/get-a-quote">{{ i18n.t('navQuote') }} <app-icon name="arrowRight" /></a>
              </div>
              <a class="btn btn-whatsapp btn-block" [href]="contact.whatsapp" target="_blank" rel="noopener">
                <app-icon name="whatsapp" /> {{ i18n.t('whatsappCta') }}
              </a>
              <div class="map">
                <iframe title="Perfect Multi Services office location on Google Maps"
                  src="https://maps.google.com/maps?q=16.848827,74.591290&z=16&output=embed"
                  loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
                <a class="map-link" [href]="contact.map" target="_blank" rel="noopener"><app-icon name="pin" /> {{ i18n.t('openMap') }}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .first { padding-top: clamp(40px, 5vw, 64px); }
    .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-bottom: clamp(36px, 5vw, 56px); }
    .card { display: flex; flex-direction: column; gap: 6px; padding: 24px; border: 1px solid var(--c-line); border-radius: 20px; background: #fff; }
    .card .badge-icon { margin-bottom: 10px; }
    .card .wa { background: #e7f6ec; color: #178c46; }
    .card h2 { margin: 0 0 4px !important; font-size: 1.05rem !important; }
    .card p { margin: 0 0 4px; color: var(--c-text); font-size: .9rem; line-height: 1.6; }
    .card a { color: var(--c-ink); font-weight: 700; text-decoration: none; overflow-wrap: anywhere; }
    .card a:hover { color: var(--c-orange-dark); }
    .form-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); align-items: start; gap: clamp(24px, 4vw, 48px); }
    .form-card { padding: clamp(24px, 3.5vw, 40px); border: 1px solid var(--c-line); border-radius: 26px; background: #fff; box-shadow: var(--shadow-lg); }
    .form-card h2 { margin-bottom: 22px !important; font-size: clamp(1.4rem, 2.2vw, 1.8rem) !important; }
    .side { display: grid; gap: 16px; }
    .quote-card { padding: 28px; border-radius: 22px; background: var(--c-ink); color: #fff; }
    .quote-card h2 { margin-bottom: 10px !important; color: #fff !important; font-size: 1.35rem !important; }
    .quote-card p { margin: 0 0 20px; color: #c9c6c0; line-height: 1.6; }
    .map { overflow: hidden; border: 1px solid var(--c-line); border-radius: 22px; background: #fff; box-shadow: var(--shadow-sm); }
    .map iframe { display: block; width: 100%; height: 380px; border: 0; }
    .map-link { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; color: var(--c-orange-dark); font-weight: 700; text-decoration: none; }
    .map-link:hover { background: var(--c-orange-soft); }
    @media (max-width: 1000px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } .form-grid { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 560px) { .cards { grid-template-columns: minmax(0, 1fr); } }
  `]
})
export class ContactPageComponent {
  readonly i18n = inject(LanguageService);
  readonly contact = COMPANY_CONTACT;
}
