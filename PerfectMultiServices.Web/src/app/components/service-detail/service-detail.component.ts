import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Service } from '../../services/api.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  // Zoneless app: HTTP callbacks do not trigger rendering on their own.
  private readonly cdr = inject(ChangeDetectorRef);
  service: Service | null = null;
  loading = true;
  error: string | null = null;

  serviceDetails: { [key: string]: any } = {
    'Home Housekeeping': {
      description: 'Our professional housekeeping services ensure your spaces are spotless, hygienic, and welcoming.',
      features: [
        'Daily, weekly, or monthly cleaning schedules',
        'Deep cleaning and sanitization',
        'Kitchen and bathroom specialized cleaning',
        'Dusting and vacuuming of all areas',
        'Window cleaning and floor polishing',
        'Laundry and ironing services'
      ],
      pricing: 'Starting from ₹1,500 per visit'
    },
    'Office Cleaning': {
      description: 'Professional office cleaning designed to create a clean, healthy, and productive workplace.',
      features: [
        'Daily office cleaning',
        'Carpet and upholstery cleaning',
        'Glass and partition cleaning',
        'Restroom maintenance',
        'Pantry and kitchen area cleaning',
        'Waste management and recycling'
      ],
      pricing: 'Starting from ₹2,500 per visit'
    },
    'Deep Cleaning': {
      description: 'Thorough deep cleaning for homes, apartments, and commercial spaces that need complete restoration.',
      features: [
        'Full room-by-room sanitization',
        'Kitchen and bathroom deep scrub',
        'Wall and ceiling dust removal',
        'Floor polishing and stain treatment',
        'Hard-to-reach cleaning',
        'Post-renovation cleanup'
      ],
      pricing: 'Starting from ₹3,500 per visit'
    },
    'Pest Control': {
      description: 'Effective pest management services to protect your property from common insects and rodents.',
      features: [
        'Cockroach and ant treatment',
        'Rodent control solutions',
        'Termite prevention support',
        'Preventive treatment plans',
        'Residential and commercial service',
        'Follow-up inspections'
      ],
      pricing: 'Starting from ₹2,000 per treatment'
    },
    'Solar Panel Cleaning': {
      description: 'Specialized solar panel cleaning to maintain peak efficiency and long-term performance.',
      features: [
        'Panel surface cleaning',
        'Dust and debris removal',
        'Efficiency inspection',
        'Roof-safe cleaning process',
        'Residential and commercial service',
        'Performance monitoring support'
      ],
      pricing: 'Starting from ₹4,000 per visit'
    }
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadService();
  }

  loadService(): void {
    const serviceName = this.route.snapshot.paramMap.get('name');
    
    if (!serviceName) {
      this.error = 'Service not found';
      this.loading = false;
      return;
    }

    this.apiService.getServices().subscribe({
      next: (services) => {
        this.cdr.markForCheck();
        this.service = services.find(s => 
          s.name.toLowerCase() === serviceName.toLowerCase().replace(/-/g, ' ')
        ) || null;
        
        if (!this.service) {
          this.error = 'Service not found';
        }
        
        this.loading = false;
      },
      error: (err) => {
        this.cdr.markForCheck();
        this.error = 'Failed to load service details';
        this.loading = false;
        console.error('Error loading service:', err);
      }
    });
  }

  getServiceDetails(): any {
    if (!this.service) return null;
    return this.serviceDetails[this.service.name] || null;
  }

  goBack(): void {
    this.router.navigate(['/']);
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

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}