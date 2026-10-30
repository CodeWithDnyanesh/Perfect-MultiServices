import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCatalog } from '../../services/service-catalog.service';
import { IconComponent } from '../../shared/icon.component';
import { PageHeroComponent } from '../../shared/page-hero.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { ServiceCardComponent } from '../../shared/service-card.component';
import { CtaBandComponent } from '../../shared/sections.component';
import { COMPANY_CONTACT } from '../../content/site-content';

/** Detail page for one service. The slug comes from the route's data. */
@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, IconComponent, PageHeroComponent, RevealDirective, ServiceCardComponent, CtaBandComponent],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent {
  readonly i18n = inject(LanguageService);
  private readonly catalog = inject(ServiceCatalog);
  readonly contact = COMPANY_CONTACT;

  readonly slug = input.required<string>();

  readonly service = computed(() => this.catalog.get(this.slug())!);
  readonly related = computed(() => this.service().related.map(slug => this.catalog.get(slug)!));
  readonly others = computed(() => this.catalog.all().filter(s => s.slug !== this.slug()));
  readonly crumbs = computed(() => [
    { label: this.i18n.t('navServicesMenu'), url: '/services' },
    { label: this.service().content.name }
  ]);
}
