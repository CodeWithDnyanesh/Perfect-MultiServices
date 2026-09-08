import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  isModalOpen = false;
  editingService: Service | null = null;

  categories = ['Housekeeping', 'Cleaning', 'Specialized Cleaning', 'Pest Control', 'General Services'];
  filterCategories = ['all', 'Housekeeping', 'Cleaning', 'Specialized Cleaning', 'Pest Control', 'General Services'];

  newService: Service = {
    id: 0,
    name: '',
    category: 'Housekeeping',
    description: '',
    price: 0,
    duration: '1 hour',
    icon: '🔧',
    active: true
  };

  constructor() {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    // Mock data - would come from API
    this.services = [
      {
        id: 1,
        name: 'Home Housekeeping',
        category: 'Housekeeping',
        description: 'Complete home cleaning service',
        price: 1500,
        duration: '2 hours',
        icon: '🏠',
        active: true
      },
      {
        id: 2,
        name: 'Office Cleaning',
        category: 'Cleaning',
        description: 'Professional office cleaning',
        price: 2500,
        duration: '3 hours',
        icon: '🏢',
        active: true
      },
      {
        id: 3,
        name: 'Deep Cleaning',
        category: 'Cleaning',
        description: 'Thorough deep cleaning service',
        price: 3500,
        duration: '4 hours',
        icon: '🧹',
        active: true
      },
      {
        id: 4,
        name: 'Pest Control',
        category: 'Pest Control',
        description: 'Complete pest elimination',
        price: 2000,
        duration: '2 hours',
        icon: '🐀',
        active: true
      },
      {
        id: 5,
        name: 'Solar Panel Cleaning',
        category: 'Specialized Cleaning',
        description: 'Professional solar panel maintenance',
        price: 4000,
        duration: '3 hours',
        icon: '☀️',
        active: false
      }
    ];
    this.filterServices();
  }

  filterServices(): void {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || service.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  openModal(service?: Service): void {
    if (service) {
      this.editingService = { ...service };
      this.newService = { ...service };
    } else {
      this.editingService = null;
      this.newService = {
        id: 0,
        name: '',
        category: 'Housekeeping',
        description: '',
        price: 0,
        duration: '1 hour',
        icon: '🔧',
        active: true
      };
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingService = null;
  }

  saveService(): void {
    if (this.editingService) {
      // Update existing service
      const index = this.services.findIndex(s => s.id === this.editingService!.id);
      if (index !== -1) {
        this.services[index] = { ...this.newService, id: this.editingService.id };
      }
    } else {
      // Add new service
      const newId = Math.max(...this.services.map(s => s.id)) + 1;
      this.services.push({ ...this.newService, id: newId });
    }
    this.closeModal();
    this.filterServices();
  }

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.services = this.services.filter(s => s.id !== id);
      this.filterServices();
    }
  }

  toggleServiceStatus(service: Service): void {
    service.active = !service.active;
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }
}