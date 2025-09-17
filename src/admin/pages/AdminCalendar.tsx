import { useState } from 'react'
import { CalendarDays, Plus, Trash2, Edit } from 'lucide-react'

interface Event { id: string; date: string; title: string; type: 'holiday' | 'shift' | 'training' | 'event' }

const seed: Event[] = [
  { id: 'e1', date: '2025-08-25', title: 'Independence Day (Obs.)', type: 'holiday' },
  { id: 'e2', date: '2025-08-28', title: 'Sales Training', type: 'training' }
]

export default function AdminCalendar() {
  const [items, setItems] = useState<Event[]>(seed)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState<Event>({ id: '', date: '', title: '', type: 'event' })
  const [editing, setEditing] = useState<string | null>(null)

  const upsert = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      setItems(prev => prev.map(x => x.id === editing ? { ...form, id: editing } : x))
    } else {
      setItems(prev => [{ ...form, id: Date.now().toString() }, ...prev])
    }
    console.log('Event saved:', form)
    setShow(false)
    setEditing(null)
    setForm({ id: '', date: '', title: '', type: 'event' })
  }

  const types = [
    { key: 'holiday', color: 'bg-red-50 text-red-700 border border-red-100' },
    { key: 'shift', color: 'bg-blue-50 text-blue-700 border border-blue-100' },
    { key: 'training', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100' },
    { key: 'event', color: 'bg-violet-50 text-violet-700 border border-violet-100' },
  ] as const

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center"><CalendarDays className="h-5 w-5 text-blue-600 mr-2"/>Calendar & Events</h1>
        <button onClick={() => { setShow(true); setEditing(null); setForm({ id: '', date: '', title: '', type: 'event' }) }} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center cursor-pointer"><Plus className="h-4 w-4 mr-1"/>Add Event</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow divide-y divide-gray-100">
        {items.map(ev => (
          <div key={ev.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">{ev.title}</div>
              <div className="text-xs text-gray-500">{ev.date} • {ev.type}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${types.find(t=>t.key===ev.type)?.color}`}>{ev.type}</span>
              <button onClick={() => { setEditing(ev.id); setForm(ev) ; setShow(true) }} className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"><Edit className="h-4 w-4"/></button>
              <button onClick={() => setItems(prev => prev.filter(x => x.id !== ev.id))} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"><Trash2 className="h-4 w-4"/></button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShow(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 font-semibold text-gray-900">Add / Edit Event</div>
            <form className="p-6 space-y-4" onSubmit={upsert}>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {types.map(t => (<option key={t.key} value={t.key}>{t.key}</option>))}
                </select>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShow(false)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


