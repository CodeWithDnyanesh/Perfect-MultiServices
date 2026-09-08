import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent {
  steps = [
    { number: '01', icon: '💬', title: 'Tell us what you need', text: 'Share your property type, service requirement, preferred timing, and any special instructions.' },
    { number: '02', icon: '📋', title: 'Receive a clear plan', text: 'We review the request and recommend the right scope, schedule, and service approach.' },
    { number: '03', icon: '🤝', title: 'Meet your service team', text: 'Our trained professionals arrive prepared and complete the work with care and respect.' },
    { number: '04', icon: '✨', title: 'Enjoy the result', text: 'We follow up, welcome your feedback, and help plan the next visit when needed.' }
  ];

  constructor(public router: Router, public i18n: LanguageService) {}

  requestQuote(): void {
    this.router.navigate(['/contact']);
  }
}
