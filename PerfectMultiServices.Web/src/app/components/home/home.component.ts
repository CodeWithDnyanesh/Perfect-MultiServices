import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ServiceCatalog } from '../../services/service-catalog.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { ServiceCardComponent } from '../../shared/service-card.component';
import { CtaBandComponent, ReasonsComponent, StepsComponent } from '../../shared/sections.component';
import { ABOUT_BENEFITS, COMPANY_CONTACT, SITE_INDUSTRIES } from '../../content/site-content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IconComponent, RevealDirective, ServiceCardComponent, StepsComponent, ReasonsComponent, CtaBandComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);

  readonly industries = SITE_INDUSTRIES;
  readonly benefits = ABOUT_BENEFITS;
  readonly contact = COMPANY_CONTACT;
  readonly testimonialSlots = [1, 2, 3];

  // Poster carousel (text for each slide comes from `${key}Tag|Title|Text|Points`).
  readonly carouselSlides = [
    { key: 'promoDaily', image: 'assets/promos/daily-housekeeping.jpg' },
    { key: 'promoKitchen', image: 'assets/promos/kitchen-cleaning.jpg' },
    { key: 'promoHome', image: 'assets/promos/home-care.jpg' },
    { key: 'promoSolar', image: 'assets/promos/solar-panel-cleaning.jpg' },
    { key: 'promoSofa', image: 'assets/promos/sofa-carpet-cleaning.jpg' }
  ];
  activeSlide = 0;
  carouselPaused = false;
  readonly autoplay = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  private swipeStartX: number | null = null;

  points(key: string): string[] {
    return this.i18n.t(key).split('|');
  }

  pauseCarousel(paused: boolean): void {
    this.carouselPaused = paused;
  }

  onSwipeStart(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  onSwipeEnd(event: PointerEvent): void {
    if (this.swipeStartX === null) return;
    const distance = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(distance) > 50) {
      distance < 0 ? this.nextSlide() : this.previousSlide();
    }
  }

  nextSlide(): void {
    this.activeSlide = (this.activeSlide + 1) % this.carouselSlides.length;
  }

  previousSlide(): void {
    this.activeSlide = (this.activeSlide - 1 + this.carouselSlides.length) % this.carouselSlides.length;
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
  }
}
