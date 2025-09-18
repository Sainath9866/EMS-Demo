import { Routes, Route } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import Employees from './pages/Employees'
import BiometricRegistration from './pages/BiometricRegistration'

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/biometric" element={<BiometricRegistration />} />
      </Routes>
    </AdminLayout>
  )
}




