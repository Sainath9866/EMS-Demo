import { useState } from 'react'
import { Check, X, FileText } from 'lucide-react'

interface Leave { id: string; employee: string; type: string; dates: string; reason: string; status: 'pending'|'approved'|'rejected' }

const seed: Leave[] = [
  { id: 'L-101', employee: 'Sarah Johnson', type: 'Sick', dates: '2025-09-18 → 2025-09-20', reason: 'Flu', status: 'pending' },
  { id: 'L-102', employee: 'Mike Wilson', type: 'Casual', dates: '2025-09-22', reason: 'Personal errand', status: 'pending' },
]

export default function AdminLeaves(){
  const [rows, setRows] = useState<Leave[]>(seed)

  const setStatus = (id: string, status: Leave['status']) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    console.log('Leave status changed:', id, status)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{r.id}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.employee}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.type}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.dates}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{r.reason}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status==='pending'?'bg-amber-50 text-amber-700':r.status==='approved'?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-700'}`}>{r.status}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={()=>setStatus(r.id,'approved')} className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"><Check className="h-4 w-4"/></button>
                    <button onClick={()=>setStatus(r.id,'rejected')} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"><X className="h-4 w-4"/></button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"><FileText className="h-4 w-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




