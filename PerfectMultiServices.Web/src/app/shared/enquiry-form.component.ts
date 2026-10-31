import { ChangeDetectorRef, Component, effect, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LanguageService } from '../services/language.service';
import { ServiceCatalog } from '../services/service-catalog.service';
import { PAGE_TRANSLATIONS } from '../i18n/page-translations';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

const PROPERTY_TYPES = ['propHome', 'propSociety', 'propOffice', 'propHotel', 'propHospital', 'propIndustrial', 'propEducation', 'propOther'];

/**
 * Enquiry form posting to /api/contact. The short version (Contact page) asks for
 * name, email, service and message; the detailed version (Get a Quote) adds
 * property type, location and preferred date, and makes the phone number required.
 */
@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="form" #f="ngForm" (ngSubmit)="submit(f)" novalidate>
      <div class="field">
        <label [for]="id('name')">{{ i18n.t('formName') }} <span aria-hidden="true">*</span></label>
        <input [id]="id('name')" name="name" type="text" autocomplete="name" required [(ngModel)]="model.name" />
      </div>
      <div class="row">
        <div class="field">
          <label [for]="id('phone')">{{ i18n.t('formPhone') }} @if (detailed()) { <span aria-hidden="true">*</span> }</label>
          <input [id]="id('phone')" name="phone" type="tel" autocomplete="tel" inputmode="tel" [required]="detailed()" [(ngModel)]="model.phone" />
        </div>
        <div class="field">
          <label [for]="id('email')">{{ i18n.t('formEmail') }} @if (!detailed()) { <span aria-hidden="true">*</span> }</label>
          <input [id]="id('email')" name="email" type="email" autocomplete="email" email [required]="!detailed()" [(ngModel)]="model.email" />
        </div>
      </div>
      <div class="field">
        <label [for]="id('service')">{{ i18n.t('formService') }} <span aria-hidden="true">*</span></label>
        <select [id]="id('service')" name="service" required [(ngModel)]="model.service">
          <option value="" disabled>{{ i18n.t('formServicePlaceholder') }}</option>
          @for (group of catalog.groups(); track group.id) {
            <optgroup [label]="i18n.t(group.label)">
              @for (service of group.services; track service.slug) {
                <option [value]="service.slug">{{ service.content.name }}</option>
              }
            </optgroup>
          }
          <option value="other">{{ i18n.t('formServiceOther') }}</option>
        </select>
      </div>
      @if (detailed()) {
        <div class="row">
          <div class="field">
            <label [for]="id('property')">{{ i18n.t('formPropertyType') }}</label>
            <select [id]="id('property')" name="property" [(ngModel)]="model.property">
              <option value="">{{ i18n.t('formPropertyPlaceholder') }}</option>
              @for (type of propertyTypes; track type) {
                <option [value]="type">{{ i18n.t(type) }}</option>
              }
            </select>
          </div>
          <div class="field">
            <label [for]="id('date')">{{ i18n.t('formDate') }}</label>
            <input [id]="id('date')" name="date" type="date" [min]="today" [(ngModel)]="model.date" />
          </div>
        </div>
        <div class="field">
          <label [for]="id('location')">{{ i18n.t('formLocation') }}</label>
          <input [id]="id('location')" name="location" type="text" autocomplete="address-level2" [(ngModel)]="model.location" />
        </div>
      }
      <div class="field">
        <label [for]="id('message')">{{ i18n.t(detailed() ? 'formQuoteMessage' : 'formMessage') }} <span aria-hidden="true">*</span></label>
        <textarea [id]="id('message')" name="message" rows="4" required [placeholder]="i18n.t('formMessagePlaceholder')" [(ngModel)]="model.message"></textarea>
      </div>

      @if (error) { <p class="note note-error" role="alert">{{ error }}</p> }
      @if (status === 'sent') { <p class="note note-success" role="status">{{ i18n.t('formSuccess') }}</p> }
      @if (status === 'failed') { <p class="note note-error" role="alert">{{ i18n.t('formError') }}</p> }

      <button type="submit" class="btn btn-primary btn-block" [disabled]="status === 'sending'">
        {{ status === 'sending' ? i18n.t('formSending') : i18n.t(detailed() ? 'formQuoteSubmit' : 'formSubmit') }}
      </button>
    </form>
  `,
  styles: [`
    :host { display: block; }
    .form { display: grid; gap: 18px; }
    .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .note { margin: 0; padding: 12px 14px; border-radius: 12px; font-size: .9rem; font-weight: 600; line-height: 1.5; }
    .note-error { background: #fdecec; color: #a12020; }
    .note-success { background: #e9f7ee; color: #17663a; }
    @media (max-width: 600px) { .row { grid-template-columns: minmax(0, 1fr); } }
  `]
})
export class EnquiryFormComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly detailed = input(false);
  /** Service slug to preselect. */
  readonly preset = input('');

  private static count = 0;
  private readonly uid = `enq${++EnquiryFormComponent.count}`;
  readonly propertyTypes = PROPERTY_TYPES;
  readonly today = new Date().toISOString().slice(0, 10);

  model = this.blank();
  status: Status = 'idle';
  error = '';

  constructor() {
    effect(() => {
      const slug = this.preset();
      if (slug && this.catalog.get(slug)) {
        this.model.service = slug;
        this.cdr.markForCheck();
      }
    });
  }

  id(field: string): string {
    return `${this.uid}-${field}`;
  }

  submit(form: NgForm): void {
    this.error = '';
    const m = this.model;
    const contactOk = this.detailed() ? !!m.phone.trim() : !!m.email.trim();
    if (!m.name.trim() || !contactOk || !m.service || !m.message.trim()) {
      this.error = this.i18n.t(this.detailed() ? 'formQuoteRequired' : 'formRequired');
      return;
    }
    if (m.email.trim() && form.controls['email']?.invalid) {
      this.error = this.i18n.t('formInvalidEmail');
      return;
    }

    this.status = 'sending';
    this.api.submitContact({
      name: m.name.trim(),
      email: m.email.trim(),
      phone: m.phone.trim(),
      service: m.service === 'other' ? 'Other / multiple services' : this.catalog.englishName(m.service),
      message: this.composeMessage()
    }).subscribe({
      next: () => {
        this.cdr.markForCheck();
        this.status = 'sent';
        form.resetForm();
        this.model = this.blank();
      },
      error: () => {
        this.cdr.markForCheck();
        this.status = 'failed';
      }
    });
  }

  /** The team reads enquiries in English, so extra quote details use English labels. */
  private composeMessage(): string {
    const m = this.model;
    if (!this.detailed()) return m.message.trim();
    const en = PAGE_TRANSLATIONS.en;
    const details = [
      m.property && `Property type: ${en[m.property]}`,
      m.location.trim() && `Location: ${m.location.trim()}`,
      m.date && `Preferred date: ${m.date}`
    ].filter(Boolean);
    return [m.message.trim(), details.length ? '\n' + details.join('\n') : ''].join('\n').trim();
  }

  private blank() {
    return { name: '', email: '', phone: '', service: this.preset?.() ?? '', property: '', location: '', date: '', message: '' };
  }
}
