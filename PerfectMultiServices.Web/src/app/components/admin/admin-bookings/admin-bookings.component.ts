import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  amount: number;
  assignedStaff?: string;
  notes?: string;
}

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchQuery = '';
  selectedStatus = 'all';
  selectedDateFilter = 'all';
  isModalOpen = false;
  selectedBooking: Booking | null = null;

  statuses = ['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
  dateFilters = ['all', 'today', 'week', 'month'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.apiService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.filterBookings();
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  filterBookings(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      const matchesSearch = booking.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           booking.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           booking.service.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || booking.status === this.selectedStatus;
      const matchesDate = this.selectedDateFilter === 'all' || this.checkDateFilter(booking.date);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  checkDateFilter(bookingDate: string): boolean {
    const today = new Date();
    const booking = new Date(bookingDate);
    
    switch (this.selectedDateFilter) {
      case 'today':
        return booking.toDateString() === today.toDateString();
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return booking >= weekAgo && booking <= today;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return booking >= monthAgo && booking <= today;
      default:
        return true;
    }
  }

  openBookingDetails(booking: Booking): void {
    this.selectedBooking = booking;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedBooking = null;
  }

  updateBookingStatus(status: string): void {
    if (this.selectedBooking) {
      this.selectedBooking.status = status as any;
      this.closeModal();
      this.filterBookings();
    }
  }

  assignStaff(staffName: string): void {
    if (this.selectedBooking) {
      this.selectedBooking.assignedStaff = staffName;
      this.closeModal();
      this.filterBookings();
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }

  getBookingsCount(): number {
    return this.bookings.length;
  }

  getPendingCount(): number {
    return this.bookings.filter(b => b.status === 'pending').length;
  }

  getConfirmedCount(): number {
    return this.bookings.filter(b => b.status === 'confirmed').length;
  }

  getCompletedCount(): number {
    return this.bookings.filter(b => b.status === 'completed').length;
  }
}