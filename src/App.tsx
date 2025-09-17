import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminLayout from './admin/AdminLayout'
import Employees from './admin/pages/Employees'
import BiometricRegistration from './admin/pages/BiometricRegistration'
import AdminAttendance from './admin/pages/AdminAttendance'
import AdminAnnouncements from './admin/pages/AdminAnnouncements'
import AdminCalendar from './admin/pages/AdminCalendar'
import AdminLeaves from './admin/pages/AdminLeaves'
import AdminLoans from './admin/pages/AdminLoans'
import AdminDocs from './admin/pages/AdminDocs'
import AdminPayslips from './admin/pages/AdminPayslips'
import AdminPolicies from './admin/pages/AdminPolicies'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Leaves from './pages/Leaves'
import Loans from './pages/Loans'
import PaySlip from './pages/PaySlip'
import Requests from './pages/Requests'
import Announcements from './pages/Announcements'
import HRPolicies from './pages/HRPolicies'
import Profile from './pages/Profile'

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return isAdmin ? (
    <Routes>
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/employees" element={<AdminLayout><Employees /></AdminLayout>} />
      <Route path="/admin/biometric" element={<AdminLayout><BiometricRegistration /></AdminLayout>} />
      <Route path="/admin/attendance" element={<AdminLayout><AdminAttendance /></AdminLayout>} />
      <Route path="/admin/leaves" element={<AdminLayout><AdminLeaves /></AdminLayout>} />
      <Route path="/admin/loans" element={<AdminLayout><AdminLoans /></AdminLayout>} />
      <Route path="/admin/docs" element={<AdminLayout><AdminDocs /></AdminLayout>} />
      <Route path="/admin/payslips" element={<AdminLayout><AdminPayslips /></AdminLayout>} />
      <Route path="/admin/announcements" element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />
      <Route path="/admin/calendar" element={<AdminLayout><AdminCalendar /></AdminLayout>} />
      <Route path="/admin/policies" element={<AdminLayout><AdminPolicies /></AdminLayout>} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/payslip" element={<PaySlip />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/hr-policies" element={<HRPolicies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
