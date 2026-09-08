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
  private carouselTimer?: ReturnType<typeof setInterval>;
  carouselSlides = [
    {
      eyebrow: 'Signature service',
      title: 'A fresher home, without the weekend workload.',
      description: 'Our trained housekeeping teams bring hotel-level care to your everyday spaces.',
      icon: '🏠',
      action: 'Book housekeeping'
    },
    {
      eyebrow: 'Business ready',
      title: 'A workplace that works better.',
      description: 'Keep offices, facilities, and shared spaces safe, polished, and ready for business.',
      icon: '🏢',
      action: 'Explore office care'
    },
    {
      eyebrow: 'Complete protection',
      title: 'Prevent problems before they grow.',
      description: 'Reliable pest control and maintenance support designed around your property.',
      icon: '🛡️',
      action: 'Request a consultation'
    }
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
    phone: '+91 XXXXXXXXXX'
  };
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private host: ElementRef<HTMLElement>, public router: Router, public i18n: LanguageService) {}

  ngOnInit(): void {
    this.loadData();
    this.carouselTimer = setInterval(() => this.nextSlide(), 6000);
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

    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
      observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
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