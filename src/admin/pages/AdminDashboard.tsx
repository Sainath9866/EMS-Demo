import { Users, UserCheck, Percent, Bell, Megaphone, ShieldAlert, ChevronRight } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Employees', value: 482, color: 'from-blue-500 to-indigo-500', icon: Users },
    { label: 'Active Employees', value: 451, color: 'from-green-500 to-emerald-500', icon: UserCheck },
    { label: 'Attendance %', value: '92%', color: 'from-purple-500 to-fuchsia-500', icon: Percent },
    { label: 'Pending Approvals', value: 14, color: 'from-amber-500 to-orange-500', icon: Bell },
  ]

  const quickLinks = [
    { label: 'Register Biometric', color: 'bg-blue-50 text-blue-700', href: '/admin/biometric' },
    { label: 'Post Announcement', color: 'bg-emerald-50 text-emerald-700', href: '/admin/announcements' },
    { label: 'View Requests', color: 'bg-violet-50 text-violet-700', href: '/admin/requests' },
  ]

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon
          return (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approvals & Requests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Items</h3>
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">View all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl p-4 bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-700">08</div>
              <div className="text-sm text-blue-700">Leave Approvals</div>
            </div>
            <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-700">05</div>
              <div className="text-sm text-emerald-700">Requests</div>
            </div>
            <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
              <div className="text-3xl font-bold text-amber-700">03</div>
              <div className="text-sm text-amber-700">Payslip Issues</div>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><ShieldAlert className="h-5 w-5 text-red-500 mr-2"/>Security Alerts</h3>
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">View</a>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2"/>
              <div>
                <p className="text-sm font-medium text-gray-900">Login attempt outside geofence</p>
                <p className="text-xs text-gray-500">EMP-1021 • 12:22 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"/>
              <div>
                <p className="text-sm font-medium text-gray-900">Repeated late check-ins detected</p>
                <p className="text-xs text-gray-500">Sales Team • Weekly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><Megaphone className="h-5 w-5 text-violet-600 mr-2"/>Latest Announcements</h3>
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">Manage</a>
          </div>
          <div className="divide-y divide-gray-100">
            {[1,2,3].map(i => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Quarterly Townhall scheduled</p>
                  <p className="text-xs text-gray-500">All Departments • 2d ago</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400"/>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-3">
            {quickLinks.map((q) => (
              <a key={q.label} href={q.href} className={`block rounded-xl px-4 py-3 border cursor-pointer ${q.color}`}>
                {q.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


