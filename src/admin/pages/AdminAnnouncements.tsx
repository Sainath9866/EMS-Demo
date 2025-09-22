import { useState } from 'react'
import { Megaphone, Edit, Trash2, Eye } from 'lucide-react'
import { useData } from '../../contexts/DataContext'

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData()
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', priority: 'medium' as 'high' | 'medium' | 'low' })
  const [editing, setEditing] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateAnnouncement(editing, { title: form.title, body: form.body, priority: form.priority })
    } else {
      addAnnouncement({ 
        title: form.title, 
        body: form.body, 
        priority: form.priority,
        author: 'Admin'
      })
    }
    console.log('Announcement saved:', form)
    setForm({ title: '', body: '', priority: 'medium' })
    setEditing(null)
    setShow(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center"><Megaphone className="h-5 w-5 text-violet-600 mr-2"/>Announcements</h1>
        <button onClick={() => { setShow(true); setEditing(null); setForm({ title: '', body: '', priority: 'medium' }) }} className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 cursor-pointer">Post Announcement</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow divide-y divide-gray-100">
        {announcements.map(a => (
          <div key={a.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">{a.title}</div>
              <div className="text-xs text-gray-500 line-clamp-1 max-w-xl">{a.body}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 inline-flex items-center"><Eye className="h-4 w-4 mr-1"/>{a.views}</span>
              <button onClick={() => { setEditing(a.id); setForm({ title: a.title, body: a.body, priority: a.priority }); setShow(true) }} className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"><Edit className="h-4 w-4"/></button>
              <button onClick={() => deleteAnnouncement(a.id)} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"><Trash2 className="h-4 w-4"/></button>
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
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as 'high' | 'medium' | 'low' })} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
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


