import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ChangeDetectorRef, inject } from '@angular/core';
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
  // Zoneless app: HTTP callbacks do not trigger rendering on their own.
  private readonly cdr = inject(ChangeDetectorRef);
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
      image: 'assets/promos/solar-panel-cleaning-photo.jpg',
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
      image: 'assets/promos/sofa-carpet-cleaning-photo.jpg',
      features: [
        { icon: '🧽', key: 'sofaDeep' },
        { icon: '🎯', key: 'sofaStain' },
        { icon: '🦠', key: 'sofaGerm' },
        { icon: '🌿', key: 'sofaOdour' },
        { icon: '💨', key: 'sofaDry' }
      ]
    }
  ];
  experienceCards = [
    {
      image: 'assets/promos/flexible-scheduling.jpg',
      title: 'Flexible scheduling',
      text: 'Book a cleaning slot at your convenience. We work around your time, so your space is always clean and ready.',
      points: ['Choose your preferred time', 'Quick & easy booking', 'Cleaning at your convenience'],
      action: 'Plan your visit',
      link: '/contact'
    },
    {
      image: 'assets/promos/detail-led-quality.jpg',
      title: 'Detail-led quality',
      text: 'We focus on every detail, from visible dirt to hidden spots, so your space looks, feels and stays cleaner for longer.',
      points: ['Deep cleaning', 'Attention to detail', 'Consistent high quality'],
      action: 'Our quality promise',
      link: '/about'
    },
    {
      image: 'assets/promos/people-you-can-trust.jpg',
      title: 'People you can trust',
      text: 'Reliable, verified and professional service to keep your home and workplace safe, clean and worry-free.',
      points: ['Verified professionals', 'Safe & reliable', 'Respectful & friendly'],
      action: 'Talk to our team',
      link: '/contact'
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
    contactEmail: 'perfectmultiservicess@gmail.com',
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
        this.cdr.markForCheck();
        this.services = services;
        this.companyInfo = companyInfo;
        this.loading = false;
      },
      error: (err) => {
        // The page ships with built-in services and company details, so an
        // unreachable API (e.g. while the server is waking up) keeps showing
        // those instead of replacing the whole page with an error.
        this.cdr.markForCheck();
        this.loading = false;
        console.warn('Homepage API unavailable; showing built-in content.', err);
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