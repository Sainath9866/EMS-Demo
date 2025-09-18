import { useState } from 'react'
import { FileText, Check, X, Stamp } from 'lucide-react'

interface Doc { id: string; employee: string; type: string; status: 'pending'|'approved'|'issued'|'rejected' }

const seed: Doc[] = [
  { id: 'D-201', employee: 'Anita Rao', type: 'Experience Certificate', status: 'pending' },
  { id: 'D-202', employee: 'John Paul', type: 'NOC', status: 'approved' },
]

export default function AdminDocs(){
  const [rows, setRows] = useState<Doc[]>(seed)
  const setStatus = (id: string, status: Doc['status']) => { setRows(prev => prev.map(r => r.id===id?{...r,status}:r)); console.log('Doc status changed', id, status) }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Documentation Requests</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
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
                <td className="px-6 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{r.status}</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={()=>setStatus(r.id,'approved')} className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"><Check className="h-4 w-4"/></button>
                    <button onClick={()=>setStatus(r.id,'issued')} className="px-2.5 py-1.5 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 cursor-pointer"><Stamp className="h-4 w-4"/></button>
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





