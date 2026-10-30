import { Component, DestroyRef, ElementRef, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Language, LanguageService } from '../../services/language.service';
import { ServiceCatalog } from '../../services/service-catalog.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly i18n = inject(LanguageService);
  readonly catalog = inject(ServiceCatalog);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly linksBefore = [
    { url: '/', label: 'navHome', exact: true },
    { url: '/about', label: 'navAbout', exact: false }
  ];
  readonly linksAfter = [
    { url: '/industries', label: 'navIndustries', exact: false },
    { url: '/why-choose-us', label: 'navWhy', exact: false },
    { url: '/contact', label: 'navContact', exact: false }
  ];

  isMenuOpen = false;
  isServicesOpen = false;
  isMobileServicesOpen = false;
  isScrolled = false;

  constructor() {
    // Close menus whenever a new page opens.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.closeAll());
  }

  get onServicesPage(): boolean {
    return this.router.url.startsWith('/services');
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 12;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isServicesOpen && !this.host.nativeElement.querySelector('.has-dropdown')?.contains(event.target as Node)) {
      this.isServicesOpen = false;
    }
  }

  toggleServices(): void {
    this.isServicesOpen = !this.isServicesOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }

  private closeAll(): void {
    this.isMenuOpen = false;
    this.isServicesOpen = false;
    this.isMobileServicesOpen = false;
  }
}
