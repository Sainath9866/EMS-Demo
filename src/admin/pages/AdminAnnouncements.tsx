import { useState } from 'react'
import { Megaphone, Edit, Trash2, Eye } from 'lucide-react'

interface Ann { id: string; title: string; body: string; views: number }

const seed: Ann[] = [
  { id: 'a1', title: 'Quarterly Townhall', body: 'Join the Q3 townhall on Friday 4 PM.', views: 312 },
  { id: 'a2', title: 'New HR Policy Update', body: 'Leave policy updated for 2025.', views: 198 },
]

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Ann[]>(seed)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ title: '', body: '' })
  const [editing, setEditing] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      setItems(prev => prev.map(x => x.id === editing ? { ...x, title: form.title, body: form.body } : x))
    } else {
      setItems(prev => [{ id: Date.now().toString(), title: form.title, body: form.body, views: 0 }, ...prev])
    }
    console.log('Announcement saved:', form)
    setForm({ title: '', body: '' })
    setEditing(null)
    setShow(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center"><Megaphone className="h-5 w-5 text-violet-600 mr-2"/>Announcements</h1>
        <button onClick={() => { setShow(true); setEditing(null); setForm({ title: '', body: '' }) }} className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 cursor-pointer">Post Announcement</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow divide-y divide-gray-100">
        {items.map(a => (
          <div key={a.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">{a.title}</div>
              <div className="text-xs text-gray-500 line-clamp-1 max-w-xl">{a.body}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 inline-flex items-center"><Eye className="h-4 w-4 mr-1"/>{a.views}</span>
              <button onClick={() => { setEditing(a.id); setForm({ title: a.title, body: a.body }); setShow(true) }} className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"><Edit className="h-4 w-4"/></button>
              <button onClick={() => setItems(prev => prev.filter(x => x.id !== a.id))} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"><Trash2 className="h-4 w-4"/></button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShow(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 font-semibold text-gray-900">Post Announcement</div>
            <form className="p-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent" required/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Body</label>
                <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent h-32" required/>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShow(false)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


