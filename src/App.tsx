import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Leaves from './pages/Leaves'
import Loans from './pages/Loans'
import PaySlip from './pages/PaySlip'
import Requests from './pages/Requests'
import Announcements from './pages/Announcements'
import HRPolicies from './pages/HRPolicies'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
