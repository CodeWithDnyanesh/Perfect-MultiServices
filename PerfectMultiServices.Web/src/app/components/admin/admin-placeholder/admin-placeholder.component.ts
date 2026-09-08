import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-placeholder.component.html',
  styleUrls: ['./admin-placeholder.component.css']
})
export class AdminPlaceholderComponent implements OnInit {
  pageKey = 'staff';
  pageTitle = 'Staff';
  summaryStats: { label: string; value: string; tone: string }[] = [];
  overview: string[] = [];
  activity: { title: string; detail: string; time: string }[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const segment = this.route.snapshot.url[0]?.path ?? 'staff';
    this.pageKey = segment;
    this.configForPage(segment);
  }

  private configForPage(page: string): void {
    const configs: Record<string, { title: string; stats: { label: string; value: string; tone: string }[]; overview: string[]; activity: { title: string; detail: string; time: string }[] }> = {
      staff: {
        title: 'Staff Management',
        stats: [
          { label: 'Total Staff', value: '28', tone: 'primary' },
          { label: 'Available Today', value: '21', tone: 'success' },
          { label: 'On Leave', value: '3', tone: 'warning' },
          { label: 'Open Shifts', value: '5', tone: 'info' }
        ],
        overview: [
          'Track attendance, shifts, and daily assignments.',
          'Assign cleaners, technicians, and supervisors to jobs.',
          'Monitor staff utilization and upcoming leave schedules.'
        ],
        activity: [
          { title: 'Shift Coverage', detail: 'All residential jobs are fully staffed for today.', time: '2 hours ago' },
          { title: 'Leave Approval', detail: 'Two cleaning staff requested leave this weekend.', time: '5 hours ago' },
          { title: 'Training', detail: 'Safety checklist refresh assigned to new team members.', time: 'Yesterday' }
        ]
      },
      payments: {
        title: 'Payment Center',
        stats: [
          { label: 'Collected', value: '₹4.8L', tone: 'success' },
          { label: 'Pending', value: '₹35K', tone: 'warning' },
          { label: 'Refunds', value: '₹8K', tone: 'danger' },
          { label: 'Subscriptions', value: '142', tone: 'primary' }
        ],
        overview: [
          'Review pending payments and invoice status.',
          'Track cash, UPI, and card settlements across jobs.',
          'Monitor overdue balances and customer payment history.'
        ],
        activity: [
          { title: 'Invoice Settled', detail: 'Office Cleaning invoice paid by Priya Patel.', time: '35 min ago' },
          { title: 'Pending Collection', detail: 'Two residential bookings are waiting for final payment.', time: '1 hour ago' },
          { title: 'Refund Review', detail: 'Customer refund request awaiting approval.', time: 'Today' }
        ]
      },
      reports: {
        title: 'Reports & Insights',
        stats: [
          { label: 'Revenue', value: '₹4.85L', tone: 'primary' },
          { label: 'Jobs Done', value: '1,185', tone: 'success' },
          { label: 'Complaints', value: '8', tone: 'danger' },
          { label: 'Retention', value: '92%', tone: 'info' }
        ],
        overview: [
          'Review business performance by service, region, and staff.',
          'Track weekly revenue, satisfaction, and repeat booking trends.',
          'Export monthly summaries and identify growth opportunities.'
        ],
        activity: [
          { title: 'Monthly Report', detail: 'September performance has exceeded targets by 12%.', time: 'Today' },
          { title: 'Customer Sentiment', detail: 'Customer satisfaction remains above 4.6/5.', time: 'Yesterday' },
          { title: 'Service Mix', detail: 'Housekeeping and deep cleaning remain top revenue drivers.', time: '2 days ago' }
        ]
      },
      settings: {
        title: 'Business Settings',
        stats: [
          { label: 'Roles', value: '12', tone: 'primary' },
          { label: 'Policies', value: '09', tone: 'success' },
          { label: 'Alerts', value: '04', tone: 'warning' },
          { label: 'Integrations', value: '03', tone: 'info' }
        ],
        overview: [
          'Manage company policies, service pricing, and communication settings.',
          'Update operational working hours, notifications, and team access.',
          'Configure automation for scheduling, reminders, and follow-ups.'
        ],
        activity: [
          { title: 'New Auto Reminder', detail: 'Customer reminder flow updated for confirmation texts.', time: '2 hours ago' },
          { title: 'Pricing Review', detail: 'Seasonal adjustments are pending approval.', time: 'Today' },
          { title: 'Access Control', detail: 'Two new admin users were added to the system.', time: 'Yesterday' }
        ]
      }
    };

    const config = configs[page] ?? configs['staff'];
    this.pageTitle = config.title;
    this.summaryStats = config.stats;
    this.overview = config.overview;
    this.activity = config.activity;
  }
}
