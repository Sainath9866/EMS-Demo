import { X, Mail, Calendar as CalendarIcon, Building } from 'lucide-react'
import type { Employee } from '../data/mockData'

interface ProfileModalProps {
  employee: Employee
  onClose: () => void
}

export default function ProfileModal({ employee, onClose }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{employee.name}</h3>
              <p className="text-neutral-600">{employee.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-600">{employee.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-600">{employee.department}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-600">
                Joined {new Date(employee.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-darkBlue transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
