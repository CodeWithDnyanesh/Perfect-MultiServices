import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Customer } from '../../../services/api.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchQuery = '';
  selectedStatus = 'all';
  isModalOpen = false;
  selectedCustomer: Customer | null = null;

  statuses = ['all', 'active', 'inactive', 'blocked'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filterCustomers();
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      }
    });
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           customer.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           customer.phone.includes(this.searchQuery) ||
                           customer.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || customer.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  openCustomerDetails(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;
  }

  updateCustomerStatus(status: string): void {
    if (this.selectedCustomer) {
      this.selectedCustomer.status = status as any;
      this.closeModal();
      this.filterCustomers();
    }
  }

  blockCustomer(): void {
    if (this.selectedCustomer && confirm('Are you sure you want to block this customer?')) {
      this.selectedCustomer.status = 'blocked';
      this.closeModal();
      this.filterCustomers();
    }
  }

  unblockCustomer(): void {
    if (this.selectedCustomer) {
      this.selectedCustomer.status = 'active';
      this.closeModal();
      this.filterCustomers();
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'status-active',
      'inactive': 'status-inactive',
      'blocked': 'status-blocked'
    };
    return statusMap[status] || 'status-inactive';
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '') + '☆'.repeat(emptyStars);
  }

  getTotalCustomers(): number {
    return this.customers.length;
  }

  getActiveCustomers(): number {
    return this.customers.filter(c => c.status === 'active').length;
  }

  getBlockedCustomers(): number {
    return this.customers.filter(c => c.status === 'blocked').length;
  }

  getTotalRevenue(): number {
    return this.customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  }
}