import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService, Service, CompanyInfo } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  activeSlide = 0;
  carouselPaused = false;
  readonly autoplay = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  private swipeStartX: number | null = null;
  private observer?: IntersectionObserver;
  // Text for each slide comes from the language service: `${key}Tag`, `${key}Title`, `${key}Text`, `${key}Points`.
  carouselSlides = [
    { key: 'promoDaily', image: 'assets/promos/daily-housekeeping.jpg' },
    { key: 'promoKitchen', image: 'assets/promos/kitchen-cleaning.jpg' },
    { key: 'promoHome', image: 'assets/promos/home-care.jpg' },
    { key: 'promoSolar', image: 'assets/promos/solar-panel-cleaning.jpg' },
    { key: 'promoSofa', image: 'assets/promos/sofa-carpet-cleaning.jpg' }
  ];
  specialisedServices = [
    {
      key: 'solar',
      image: 'assets/promos/solar-panel-cleaning.jpg',
      features: [
        { icon: '☀️', key: 'solarEfficiency' },
        { icon: '⏳', key: 'solarLife' },
        { icon: '🛡️', key: 'solarSafe' },
        { icon: '₹', key: 'solarCost' },
        { icon: '🏘️', key: 'solarSites' }
      ]
    },
    {
      key: 'sofa',
      image: 'assets/promos/sofa-carpet-cleaning.jpg',
      features: [
        { icon: '🧽', key: 'sofaDeep' },
        { icon: '🎯', key: 'sofaStain' },
        { icon: '🦠', key: 'sofaGerm' },
        { icon: '🌿', key: 'sofaOdour' },
        { icon: '💨', key: 'sofaDry' }
      ]
    }
  ];
  assurances = ['assureTrained', 'assureEquipment', 'assureSafe', 'assureSatisfaction', 'assureCommercial'];
  phoneNumbers = [
    { label: '84606 57606', href: 'tel:+918460657606' },
    { label: '99221 01262', href: 'tel:+919922101262' },
    { label: '72648 84322', href: 'tel:+917264884322' }
  ];
  services: Service[] = [
    { id: 1, name: 'Home Housekeeping', description: 'Complete home cleaning service', category: 'Housekeeping', icon: 'home' },
    { id: 2, name: 'Office Cleaning', description: 'Professional office cleaning', category: 'Cleaning', icon: 'building' },
    { id: 3, name: 'Deep Cleaning', description: 'Thorough deep cleaning service', category: 'Cleaning', icon: 'tools' },
    { id: 4, name: 'Pest Control', description: 'Complete pest elimination', category: 'Pest Control', icon: '⭐' }
  ];
  companyInfo: CompanyInfo = {
    name: 'Perfect Multi Services Pvt. Ltd.',
    tagline: 'One Company. Multiple Solutions.',
    description: 'Professional housekeeping and maintenance services for homes, offices, and industrial facilities.',
    location: 'Sangli, Maharashtra',
    contactEmail: 'info@perfectmultiservices.com',
    phone: '+91 84606 57606'
  };
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private host: ElementRef<HTMLElement>, public router: Router, public i18n: LanguageService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
        element.classList.add('scroll-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
    this.observer = observer;

    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
      observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

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
    if (this.swipeStartX === null) {
      return;
    }
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

  loadData(): void {
    this.error = null;
    forkJoin({
      services: this.apiService.getServices(),
      companyInfo: this.apiService.getCompanyInfo()
    }).subscribe({
      next: ({ services, companyInfo }) => {
        this.services = services;
        this.companyInfo = companyInfo;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load homepage data';
        this.loading = false;
        console.error('Error loading homepage data:', err);
      }
    });
  }

  getServiceIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'home': '🏠',
      'tools': '🔧',
      'factory': '🏭',
      'building': '🏢'
    };
    return iconMap[iconName] || '⭐';
  }

  navigateToService(serviceName: string): void {
    const formattedName = serviceName.toLowerCase().replace(/ /g, '-');
    this.router.navigate(['/service', formattedName]);
  }
}