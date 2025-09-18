import { useState } from 'react'
import { FileText, Download, Shield, X } from 'lucide-react'

interface Slip { id: string; employee: string; month: string; amount: number; secured: boolean }

const seed: Slip[] = [
  { id: 'P-901', employee: 'Jackie Chan', month: 'Aug 2025', amount: 87000, secured: true },
  { id: 'P-902', employee: 'Sarah Johnson', month: 'Aug 2025', amount: 65000, secured: false },
]

export default function AdminPayslips(){
  const [rows, setRows] = useState<Slip[]>(seed)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ employee: '', month: '', amount: 0 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pay Slip Management</h1>
        <button onClick={()=>setShow(true)} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Generate Payslip</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Month</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Secured</th>
              <th className="px-6 py-3"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-800">{r.id}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.employee}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{r.month}</td>
                <td className="px-6 py-3 text-sm text-gray-800">₹{r.amount.toLocaleString()}</td>
                <td className="px-6 py-3">{r.secured ? <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700"><Shield className="h-3 w-3 mr-1"/>Secured</span> : <span className="text-xs text-gray-600">No</span>}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={()=>console.log('download', r.id)} className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"><Download className="h-4 w-4"/></button>
                    <button onClick={()=>setRows(prev=>prev.map(x=>x.id===r.id?{...x,secured:!x.secured}:x))} className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"><Shield className="h-4 w-4"/></button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"><FileText className="h-4 w-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={()=>setShow(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 font-semibold text-gray-900 flex items-center justify-between">Generate Payslip<button onClick={()=>setShow(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer"><X className="h-5 w-5"/></button></div>
            <form className="p-6 space-y-4" onSubmit={(e)=>{e.preventDefault(); setRows(prev=>[{ id: 'P-'+Date.now(), employee: form.employee, month: form.month, amount: form.amount, secured: false }, ...prev]); console.log('payslip created', form); setShow(false)}}>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Employee</label>
                <input value={form.employee} onChange={e=>setForm({...form,employee:e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Month</label>
                  <input value={form.month} onChange={e=>setForm({...form,month:e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Aug 2025" required/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
                  <input type="number" value={form.amount} onChange={e=>setForm({...form,amount:Number(e.target.value)})} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={()=>setShow(false)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}





