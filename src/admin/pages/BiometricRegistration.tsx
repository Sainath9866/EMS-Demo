import { useState } from 'react'
import { Fingerprint, UserCheck, Clock } from 'lucide-react'

interface Row { id: string; name: string; department: string; registered: boolean }

const initial: Row[] = [
  { id: 'EMP-1001', name: 'Jackie Chan', department: 'Engineering', registered: false },
  { id: 'EMP-1003', name: 'Mike Wilson', department: 'HR', registered: false },
  { id: 'EMP-1010', name: 'Priya N', department: 'Finance', registered: true },
]

export default function BiometricRegistration() {
  const [rows, setRows] = useState<Row[]>(initial)
  const [log, setLog] = useState<Array<{employee: string; admin: string; time: string}>>([
    { employee: 'Priya N', admin: 'Admin', time: '2025-08-12 10:15' }
  ])

  const register = (id: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, registered: true } : r))
    const emp = rows.find(r => r.id === id)
    if (emp) {
      const entry = { employee: emp.name, admin: 'Admin', time: new Date().toISOString().slice(0,16).replace('T',' ') }
      setLog(prev => [entry, ...prev])
      console.log('Biometric registered:', entry)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Biometric Registration</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><Fingerprint className="h-5 w-5 text-violet-600 mr-2"/>Employees Pending Registration</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {rows.map(r => (
              <div key={r.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.id} • {r.department}</div>
                </div>
                <button
                  disabled={r.registered}
                  onClick={() => register(r.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium cursor-pointer ${r.registered ? 'bg-gray-100 text-gray-500' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                >
                  {r.registered ? 'Registered' : 'Register Biometric'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Log */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><UserCheck className="h-5 w-5 text-emerald-600 mr-2"/>Registration Log</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {log.map((l, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{l.employee}</div>
                  <div className="text-xs text-gray-500">By {l.admin}</div>
                </div>
                <div className="flex items-center text-xs text-gray-500"><Clock className="h-4 w-4 mr-1"/>{l.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


