import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, CompanyInfo, ContactRequest, Service } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactRequest: ContactRequest = {
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  };

  services: string[] = [];
  companyInfo?: CompanyInfo;

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private apiService: ApiService, public i18n: LanguageService) {}

  ngOnInit(): void {
    this.apiService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services.map(service => service.name);
        if (!this.contactRequest.service && this.services.length > 0) {
          this.contactRequest.service = this.services[0];
        }
      },
      error: (error) => {
        console.error('Error loading services for contact form:', error);
        this.services = [
          'Home Housekeeping',
          'Office Cleaning',
          'Deep Cleaning',
          'Pest Control',
          'Solar Panel Cleaning'
        ];
      }
    });

    this.apiService.getCompanyInfo().subscribe({
      next: (companyInfo: CompanyInfo) => {
        this.companyInfo = companyInfo;
      },
      error: (error) => {
        console.error('Error loading company information:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.isFormInvalid()) {
      this.submitError = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    this.apiService.submitContact(this.contactRequest).subscribe({
      next: (response) => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.resetForm();
      },
      error: (error) => {
        this.submitError = 'Failed to submit contact form. Please try again.';
        this.isSubmitting = false;
        console.error('Contact form error:', error);
      }
    });
  }

  isFormInvalid(): boolean {
    return !this.contactRequest.name || 
           !this.contactRequest.email || 
           !this.contactRequest.message ||
           !this.contactRequest.service;
  }

  resetForm(): void {
    this.contactRequest = {
      name: '',
      email: '',
      phone: '',
      message: '',
      service: this.services[0] ?? ''
    };
  }
}