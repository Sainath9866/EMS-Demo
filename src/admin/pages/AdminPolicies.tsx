import { useState } from 'react'
import { FileText, UploadCloud, Trash2 } from 'lucide-react'

interface Policy { id: string; title: string; version: string; published: string }

const seed: Policy[] = [
  { id: 'POL-01', title: 'Employee Handbook', version: 'v2.3', published: '2025-01-15' },
  { id: 'POL-02', title: 'Leave Policy', version: 'v1.8', published: '2025-03-01' },
]

export default function AdminPolicies(){
  const [rows, setRows] = useState<Policy[]>(seed)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">HR Policies</h1>
        <button onClick={()=>{console.log('upload clicked')}} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 inline-flex items-center cursor-pointer"><UploadCloud className="h-4 w-4 mr-1"/>Upload</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Published</th>
              <th className="px-6 py-3"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{r.id}</td>
                <td className="px-6 py-3 text-sm text-gray-800 inline-flex items-center"><FileText className="h-4 w-4 mr-2 text-gray-500"/>{r.title}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.version}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.published}</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={()=>setRows(prev=>prev.filter(x=>x.id!==r.id))} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


