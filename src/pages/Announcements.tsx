import { Megaphone, AlertCircle, Calendar as CalendarIcon, User } from 'lucide-react'
import { useData } from '../contexts/DataContext'

export default function Announcements() {
  const { announcements } = useData()
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-secondary-red/10 text-secondary-red border-secondary-red/20'
      case 'medium':
        return 'bg-secondary-orange/10 text-secondary-orange border-secondary-orange/20'
      case 'low':
        return 'bg-secondary-green/10 text-secondary-green border-secondary-green/20'
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Announcements</h1>
        <div className="text-sm text-neutral-500">
          Stay updated with company news and important information
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-blue/10 rounded-lg">
                    <Megaphone className="h-5 w-5 text-primary-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">{announcement.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{announcement.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-neutral-700 leading-relaxed">{announcement.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No More Announcements */}
      <div className="text-center py-8">
        <div className="p-4 bg-neutral-50 rounded-lg inline-block">
          <AlertCircle className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-500">No more announcements to display</p>
        </div>
      </div>
    </div>
  )
}
