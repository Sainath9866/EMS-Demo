import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Fingerprint, CalendarDays, FileText, Landmark, Megaphone, BookText, Shield, ListFilter, Bell } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const location = useLocation()

  const items = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Employees', href: '/admin/employees', icon: Users },
    { name: 'Biometric Registration', href: '/admin/biometric', icon: Fingerprint },
    { name: 'Attendance', href: '/admin/attendance', icon: CalendarDays },
    { name: 'Leaves', href: '/admin/leaves', icon: FileText },
    { name: 'Loans', href: '/admin/loans', icon: Landmark },
    { name: 'Docs Requests', href: '/admin/docs', icon: FileText },
    { name: 'Pay Slips', href: '/admin/payslips', icon: FileText },
    { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { name: 'Calendar & Events', href: '/admin/calendar', icon: CalendarDays },
    { name: 'HR Policies', href: '/admin/policies', icon: BookText },
    { name: 'Requests & Ticketing', href: '/admin/requests', icon: ListFilter },
    { name: 'Audit Logs', href: '/admin/audit', icon: Bell },
    { name: 'Security & Compliance', href: '/admin/security', icon: Shield },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 lg:hidden z-40" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center">A</div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">ADMIN</div>
              <div className="text-[11px] text-gray-500 -mt-0.5">Control Center</div>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {items.map(item => {
            const active = location.pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${active ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}


