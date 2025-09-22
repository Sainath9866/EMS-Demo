import { useState } from 'react'
import { X, Calendar as CalendarIcon, FileText } from 'lucide-react'
import { useData } from '../contexts/DataContext'

interface LeaveApplicationModalProps {
  onClose: () => void
}

export default function LeaveApplicationModal({ onClose }: LeaveApplicationModalProps) {
  const { addLeaveRequest, addNotification } = useData()
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    workHandover: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format dates for display
    const dates = formData.startDate === formData.endDate 
      ? formData.startDate 
      : `${formData.startDate} → ${formData.endDate}`
    
    // Add leave request
    addLeaveRequest({
      employee: 'Jackie Chan', // Demo: using current user
      type: formData.leaveType.charAt(0).toUpperCase() + formData.leaveType.slice(1),
      dates: dates,
      reason: formData.reason,
      status: 'pending'
    })
    
    // Show success notification
    addNotification('success', 'Leave Application Submitted', 'Your leave request has been submitted and is pending approval.')
    
    console.log('Leave application submitted:', formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary-blue" />
            Apply for Leave
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Leave Type *
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent cursor-pointer"
              >
                <option value="">Select leave type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="emergency">Emergency Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Emergency Contact *
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Reason for Leave *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Please provide a detailed reason for your leave request"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Work Handover
            </label>
            <textarea
              name="workHandover"
              value={formData.workHandover}
              onChange={handleChange}
              rows={3}
              placeholder="Describe any work that needs to be handed over during your absence"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-neutral-900 mb-2">Terms & Conditions</h4>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Leave requests must be submitted at least 2 days in advance</li>
              <li>• Emergency leaves require immediate notification to your manager</li>
              <li>• All leave requests are subject to approval by your reporting manager</li>
              <li>• Medical certificates are required for sick leaves exceeding 3 days</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center cursor-pointer"
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
