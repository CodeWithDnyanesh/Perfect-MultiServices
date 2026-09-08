import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public router: Router, public i18n: LanguageService) {}
  companyStats = [
    { number: '10+', label: 'Years Experience' },
    { number: '500+', label: 'Happy Clients' },
    { number: '50+', label: 'Professional Staff' },
    { number: '24/7', label: 'Support Available' }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We deliver the highest quality housekeeping and maintenance services to ensure complete customer satisfaction.'
    },
    {
      icon: '⏰',
      title: 'Punctuality',
      description: 'We value your time and always arrive on schedule for all appointments and service commitments.'
    },
    {
      icon: '🤝',
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We listen, understand, and deliver personalized solutions.'
    },
    {
      icon: '🛡️',
      title: 'Reliability',
      description: 'You can count on us for consistent, dependable service that meets your exact requirements every time.'
    }
  ];

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}