import { Download, AlertTriangle } from 'lucide-react'

export default function AdminAttendance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow">
          <p className="text-sm text-gray-500">Company Attendance</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-1">92%</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow">
          <p className="text-sm text-gray-500">Late Threshold</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">10 min</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow">
          <p className="text-sm text-gray-500">Office Radius</p>
          <p className="text-3xl font-extrabold text-violet-600 mt-1">150 m</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Export Attendance</h3>
          <div className="space-x-2">
            <button onClick={() => console.log('export csv')} className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm cursor-pointer">CSV</button>
            <button onClick={() => console.log('export pdf')} className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm inline-flex items-center cursor-pointer"><Download className="h-4 w-4 mr-1"/> PDF</button>
          </div>
        </div>
        <div className="px-6 pb-6 text-sm text-gray-600">Download demo reports for stakeholders. No backend.</div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><AlertTriangle className="h-5 w-5 text-amber-500 mr-2"/>Anomaly Alerts</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
          <li>Repeated late check-ins - Sales Team</li>
          <li>Frequent geo-fence denials - EMP-1017</li>
        </ul>
      </div>
    </div>
  )
}









