import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
  contactEmail: string;
  phone: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

export interface Booking {
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

export interface DashboardStats {
  totalCustomers: number;
  todayBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  pendingPayments: number;
  activeStaff: number;
  complaints: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  totalBookings: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  lastBookingDate?: string;
  averageRating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  getCompanyInfo(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${this.apiUrl}/company`);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/admin/dashboard/stats`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  submitContact(request: ContactRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, request);
  }
}