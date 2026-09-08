import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardStats } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // Statistics
  stats: DashboardStats = {
    totalCustomers: 0,
    todayBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    activeStaff: 28,
    complaints: 8
  };

  // Recent bookings
  recentBookings = [
    {
      id: 'BK-2024-001',
      customer: 'Rahul Sharma',
      service: 'Housekeeping Services',
      date: '2024-09-06',
      status: 'confirmed',
      amount: 1500
    },
    {
      id: 'BK-2024-002',
      customer: 'Priya Patel',
      service: 'Deep Cleaning',
      date: '2024-09-06',
      status: 'pending',
      amount: 3500
    },
    {
      id: 'BK-2024-003',
      customer: 'Amit Kumar',
      service: 'Pest Control',
      date: '2024-09-05',
      status: 'completed',
      amount: 2000
    },
    {
      id: 'BK-2024-004',
      customer: 'Sneha Reddy',
      service: 'Office Maintenance',
      date: '2024-09-05',
      status: 'in-progress',
      amount: 5000
    },
    {
      id: 'BK-2024-005',
      customer: 'Vijay Singh',
      service: 'Industrial Cleaning',
      date: '2024-09-04',
      status: 'cancelled',
      amount: 8000
    }
  ];

  // Revenue data (mock)
  revenueData = [
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 145000 },
    { month: 'Mar', revenue: 165000 },
    { month: 'Apr', revenue: 140000 },
    { month: 'May', revenue: 180000 },
    { month: 'Jun', revenue: 195000 },
    { month: 'Jul', revenue: 175000 },
    { month: 'Aug', revenue: 200000 }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.apiService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = { ...this.stats, ...stats };
      },
      error: (err) => {
        console.error('Error loading dashboard stats:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'status-confirmed',
      'pending': 'status-pending',
      'completed': 'status-completed',
      'in-progress': 'status-in-progress',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }
}