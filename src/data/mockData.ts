export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  joinDate: string;
}

export interface AttendanceData {
  shiftInfo: string;
  onTimeArrival: number;
  avgHoursPerDay: number;
  leavesCount: number;
  totalDays: number;
  presentDays: number;
}

export interface LeaveBalance {
  totalLeaves: number;
  usedLeaves: number;
  remainingLeaves: number;
  sickLeaves: number;
  casualLeaves: number;
  earnedLeaves: number;
}

export interface PaySlip {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
  downloadUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  author: string;
}

export interface Activity {
  id: string;
  type: 'leave_approval' | 'leave_rejection' | 'payslip_generated' | 'announcement';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status: 'completed' | 'pending' | 'rejected';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'event' | 'meeting';
  color: string;
}

export const mockEmployee: Employee = {
  id: '1',
  name: 'Jackie Chan',
  role: 'Senior Software Engineer',
  department: 'Engineering',
  email: 'jackie.chan@company.com',
  avatar: '/jackie.png',
  joinDate: '2022-01-15'
};

export const mockAttendanceData: AttendanceData = {
  shiftInfo: 'Day Shift (9:00 AM - 6:00 PM)',
  onTimeArrival: 95,
  avgHoursPerDay: 8.5,
  leavesCount: 3,
  totalDays: 22,
  presentDays: 19
};

export const mockLeaveBalance: LeaveBalance = {
  totalLeaves: 24,
  usedLeaves: 8,
  remainingLeaves: 16,
  sickLeaves: 5,
  casualLeaves: 12,
  earnedLeaves: 7
};

export const mockPaySlips: PaySlip[] = [
  {
    id: '1',
    month: 'December',
    year: 2024,
    basicSalary: 80000,
    allowances: 15000,
    deductions: 8000,
    netSalary: 87000,
    status: 'paid',
    downloadUrl: '#'
  },
  {
    id: '2',
    month: 'November',
    year: 2024,
    basicSalary: 80000,
    allowances: 15000,
    deductions: 8000,
    netSalary: 87000,
    status: 'paid',
    downloadUrl: '#'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Holiday Schedule for December 2024',
    content: 'Please note the holiday schedule for December. Office will be closed on 25th and 26th December.',
    date: '2024-12-01',
    priority: 'high',
    author: 'HR Department'
  },
  {
    id: '2',
    title: 'New Employee Onboarding Process',
    content: 'We have updated our employee onboarding process. Please review the new guidelines.',
    date: '2024-11-28',
    priority: 'medium',
    author: 'HR Department'
  },
  {
    id: '3',
    title: 'Team Building Event',
    content: 'Join us for the annual team building event on December 15th at the company retreat center.',
    date: '2024-11-25',
    priority: 'low',
    author: 'Events Team'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'leave_approval',
    title: 'Leave Approved',
    description: 'Your sick leave request for Dec 10-12 has been approved',
    timestamp: '2024-12-05T10:30:00Z',
    user: 'Sarah Johnson',
    status: 'completed'
  },
  {
    id: '2',
    type: 'payslip_generated',
    title: 'Payslip Generated',
    description: 'Your December 2024 payslip is now available for download',
    timestamp: '2024-12-01T09:00:00Z',
    user: 'System',
    status: 'completed'
  },
  {
    id: '3',
    type: 'leave_approval',
    title: 'Leave Approved',
    description: 'Your casual leave request for Nov 28-29 has been approved',
    timestamp: '2024-11-27T14:15:00Z',
    user: 'Mike Wilson',
    status: 'completed'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Christmas Day',
    date: '2024-12-25',
    type: 'holiday',
    color: '#ef4444'
  },
  {
    id: '2',
    title: 'Boxing Day',
    date: '2024-12-26',
    type: 'holiday',
    color: '#ef4444'
  },
  {
    id: '3',
    title: 'Team Meeting',
    date: '2024-12-15',
    type: 'meeting',
    color: '#2563eb'
  },
  {
    id: '4',
    title: 'Company Event',
    date: '2024-12-20',
    type: 'event',
    color: '#10b981'
  }
];

export const mockFAQ = [
  {
    id: '1',
    question: 'How do I apply for leave?',
    answer: 'You can apply for leave through the Leave Management section. Click on "Apply Leave" and fill out the form with your leave details.'
  },
  {
    id: '2',
    question: 'When will I receive my payslip?',
    answer: 'Payslips are generated on the 1st of every month and are available for download from your dashboard.'
  },
  {
    id: '3',
    question: 'How can I check my attendance?',
    answer: 'You can view your attendance details in the Attendance section, which shows your shift information, arrival percentage, and daily hours.'
  },
  {
    id: '4',
    question: 'What should I do if I have a technical issue?',
    answer: 'You can create a support ticket through the chatbot or contact the IT department directly.'
  }
];
