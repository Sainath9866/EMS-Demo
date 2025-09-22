import React, { createContext, useContext, useState, type ReactNode } from 'react'

// Types
export interface Employee {
  id: string
  name: string
  department: string
  role: string
  status: 'active' | 'inactive'
  avatar: string
  biometric?: boolean
}

export interface Announcement {
  id: string
  title: string
  body: string
  views: number
  date: string
  author: string
  priority: 'high' | 'medium' | 'low'
}

export interface LeaveRequest {
  id: string
  employee: string
  type: string
  dates: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
  approvedBy?: string
}

export interface LoanRequest {
  id: string
  employee: string
  type: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
  approvedBy?: string
}

interface DataContextType {
  // Employees
  employees: Employee[]
  addEmployee: (employee: Omit<Employee, 'id'>) => void
  updateEmployee: (id: string, updates: Partial<Employee>) => void
  deleteEmployee: (id: string) => void

  // Announcements
  announcements: Announcement[]
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'views' | 'date'>) => void
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void
  deleteAnnouncement: (id: string) => void

  // Leave Requests
  leaveRequests: LeaveRequest[]
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'appliedDate'>) => void
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void
  deleteLeaveRequest: (id: string) => void

  // Loan Requests
  loanRequests: LoanRequest[]
  addLoanRequest: (request: Omit<LoanRequest, 'id' | 'appliedDate'>) => void
  updateLoanRequest: (id: string, updates: Partial<LoanRequest>) => void
  deleteLoanRequest: (id: string) => void

  // Notifications
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial data
const initialEmployees: Employee[] = [
  { id: 'EMP-1001', name: 'Jackie Chan', department: 'Engineering', role: 'Senior Engineer', status: 'active', avatar: '/jackie.png', biometric: false },
  { id: 'EMP-1002', name: 'Sarah Johnson', department: 'Sales', role: 'Manager', status: 'active', avatar: 'https://i.pravatar.cc/64?img=5', biometric: true },
  { id: 'EMP-1003', name: 'Mike Wilson', department: 'HR', role: 'Associate', status: 'inactive', avatar: 'https://i.pravatar.cc/64?img=15', biometric: false },
]

const initialAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Quarterly Townhall', body: 'Join the Q3 townhall on Friday 4 PM.', views: 312, date: '2024-12-01', author: 'HR Department', priority: 'high' },
  { id: 'a2', title: 'New HR Policy Update', body: 'Leave policy updated for 2025.', views: 198, date: '2024-11-28', author: 'HR Department', priority: 'medium' },
]

const initialLeaveRequests: LeaveRequest[] = [
  { id: 'L-101', employee: 'Sarah Johnson', type: 'Sick', dates: '2025-09-18 → 2025-09-20', reason: 'Flu', status: 'pending', appliedDate: '2024-12-08' },
  { id: 'L-102', employee: 'Mike Wilson', type: 'Casual', dates: '2025-09-22', reason: 'Personal errand', status: 'pending', appliedDate: '2024-12-05' },
  { id: 'L-103', employee: 'Jackie Chan', type: 'Sick', dates: '2024-12-10 → 2024-12-12', reason: 'Fever and cold symptoms', status: 'approved', appliedDate: '2024-12-08', approvedBy: 'Sarah Johnson' },
  { id: 'L-104', employee: 'Jackie Chan', type: 'Casual', dates: '2024-11-28 → 2024-11-29', reason: 'Personal work', status: 'approved', appliedDate: '2024-11-25', approvedBy: 'Mike Wilson' },
  { id: 'L-105', employee: 'Jackie Chan', type: 'Earned', dates: '2024-12-20 → 2024-12-25', reason: 'Family vacation', status: 'pending', appliedDate: '2024-12-05' },
]

const initialLoanRequests: LoanRequest[] = [
  { id: 'FN-501', employee: 'Sarah Johnson', type: 'Advance Salary', amount: 35000, status: 'pending', appliedDate: '2024-12-08' },
  { id: 'FN-502', employee: 'Mike Wilson', type: 'Loan', amount: 120000, status: 'pending', appliedDate: '2024-12-05' },
  { id: 'FN-503', employee: 'Jackie Chan', type: 'Personal Loan', amount: 50000, status: 'approved', appliedDate: '2024-01-15', approvedBy: 'Admin' },
]

// Helper functions for localStorage
const getFromStorage = (key: string, defaultValue: any): any => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = (key: string, value: any): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => 
    getFromStorage('ems_employees', initialEmployees)
  )
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => 
    getFromStorage('ems_announcements', initialAnnouncements)
  )
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => 
    getFromStorage('ems_leave_requests', initialLeaveRequests)
  )
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(() => 
    getFromStorage('ems_loan_requests', initialLoanRequests)
  )

  // Employee functions
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: `EMP-${Date.now()}`,
    }
    setEmployees(prev => {
      const updated = [newEmployee, ...prev]
      saveToStorage('ems_employees', updated)
      return updated
    })
  }

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => {
      const updated = prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
      saveToStorage('ems_employees', updated)
      return updated
    })
  }

  const deleteEmployee = (id: string) => {
    setEmployees(prev => {
      const updated = prev.filter(emp => emp.id !== id)
      saveToStorage('ems_employees', updated)
      return updated
    })
  }

  // Announcement functions
  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'views' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      views: 0,
      date: new Date().toISOString().split('T')[0],
    }
    setAnnouncements(prev => {
      const updated = [newAnnouncement, ...prev]
      saveToStorage('ems_announcements', updated)
      return updated
    })
  }

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => {
      const updated = prev.map(ann => ann.id === id ? { ...ann, ...updates } : ann)
      saveToStorage('ems_announcements', updated)
      return updated
    })
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => {
      const updated = prev.filter(ann => ann.id !== id)
      saveToStorage('ems_announcements', updated)
      return updated
    })
  }

  // Leave Request functions
  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedDate'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: `L-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
    }
    setLeaveRequests(prev => {
      const updated = [newRequest, ...prev]
      saveToStorage('ems_leave_requests', updated)
      return updated
    })
  }

  const updateLeaveRequest = (id: string, updates: Partial<LeaveRequest>) => {
    setLeaveRequests(prev => {
      const updated = prev.map(req => req.id === id ? { ...req, ...updates } : req)
      saveToStorage('ems_leave_requests', updated)
      return updated
    })
  }

  const deleteLeaveRequest = (id: string) => {
    setLeaveRequests(prev => {
      const updated = prev.filter(req => req.id !== id)
      saveToStorage('ems_leave_requests', updated)
      return updated
    })
  }

  // Loan Request functions
  const addLoanRequest = (request: Omit<LoanRequest, 'id' | 'appliedDate'>) => {
    const newRequest: LoanRequest = {
      ...request,
      id: `FN-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
    }
    setLoanRequests(prev => {
      const updated = [newRequest, ...prev]
      saveToStorage('ems_loan_requests', updated)
      return updated
    })
  }

  const updateLoanRequest = (id: string, updates: Partial<LoanRequest>) => {
    setLoanRequests(prev => {
      const updated = prev.map(req => req.id === id ? { ...req, ...updates } : req)
      saveToStorage('ems_loan_requests', updated)
      return updated
    })
  }

  const deleteLoanRequest = (id: string) => {
    setLoanRequests(prev => {
      const updated = prev.filter(req => req.id !== id)
      saveToStorage('ems_loan_requests', updated)
      return updated
    })
  }

  // Notification function (simple implementation)
  const addNotification = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    // Create a simple notification event that can be listened to
    const event = new CustomEvent('ems-notification', {
      detail: { type, title, message, id: Date.now().toString() }
    })
    window.dispatchEvent(event)
  }

  const value: DataContextType = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    leaveRequests,
    addLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest,
    loanRequests,
    addLoanRequest,
    updateLoanRequest,
    deleteLoanRequest,
    addNotification,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
