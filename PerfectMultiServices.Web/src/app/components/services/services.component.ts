import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  serviceGroups = [
    {
      icon: '🏠',
      title: 'residential',
      description: 'Comfortable, hygienic homes maintained by trained professionals and clear checklists.',
      services: ['Home housekeeping', 'Deep cleaning', 'Kitchen and bathroom care', 'Sanitization']
    },
    {
      icon: '🏢',
      title: 'commercial',
      description: 'Reliable cleaning programs for offices, commercial properties, and shared facilities.',
      services: ['Office cleaning', 'Glass and partition care', 'Restroom maintenance', 'Waste management']
    },
    {
      icon: '🛠️',
      title: 'maintenanceSupport',
      description: 'Practical property support that keeps your workplace or facility operating smoothly.',
      services: ['Routine maintenance', 'Facility support', 'Inspection coordination', 'Custom service plans']
    },
    {
      icon: '🛡️',
      title: 'pestControl',
      description: 'Responsible pest management designed to protect people, property, and everyday operations.',
      services: ['Cockroach and ant control', 'Rodent control', 'Termite prevention', 'Follow-up inspections']
    }
  ];

  constructor(public router: Router, public i18n: LanguageService) {}

  requestQuote(): void {
    this.router.navigate(['/contact']);
  }
}
