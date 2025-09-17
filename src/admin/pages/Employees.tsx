import { useState } from 'react'
import { Plus, Edit, Eye, Power, Fingerprint } from 'lucide-react'

interface Emp {
  id: string
  name: string
  department: string
  role: string
  status: 'active' | 'inactive'
  avatar: string
  biometric?: boolean
}

const initialEmployees: Emp[] = [
  { id: 'EMP-1001', name: 'Jackie Chan', department: 'Engineering', role: 'Senior Engineer', status: 'active', avatar: '/jackie.png', biometric: false },
  { id: 'EMP-1002', name: 'Sarah Johnson', department: 'Sales', role: 'Manager', status: 'active', avatar: 'https://i.pravatar.cc/64?img=5', biometric: true },
  { id: 'EMP-1003', name: 'Mike Wilson', department: 'HR', role: 'Associate', status: 'inactive', avatar: 'https://i.pravatar.cc/64?img=15', biometric: false },
]

export default function Employees() {
  const [employees, setEmployees] = useState<Emp[]>(initialEmployees)
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer">
          <Plus className="h-4 w-4"/>
          <span>Add New Employee</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="flex items-center space-x-3">
                    <img src={emp.avatar} alt={emp.name} className="h-9 w-9 rounded-full object-cover"/>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">{emp.id}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{emp.department}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{emp.role}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${emp.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{emp.status}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"><Eye className="h-4 w-4"/></button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer"><Edit className="h-4 w-4"/></button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 cursor-pointer"><Power className="h-4 w-4"/></button>
                    <button className={`px-2.5 py-1.5 rounded-lg ${emp.biometric ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'} hover:opacity-90 cursor-pointer`}><Fingerprint className="h-4 w-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">✕</button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('add employee'); setShowAdd(false) }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Employee name"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Employee ID</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="EMP-XXXX"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Department"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Role"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Profile Picture</label>
                  <input type="file" className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


