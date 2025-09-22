import { useState } from 'react'
import { Calendar as CalendarIcon, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { mockLeaveBalance } from '../data/mockData'
import { useData } from '../contexts/DataContext'
import LeaveApplicationModal from '../components/LeaveApplicationModal'

export default function Leaves() {
  const { leaveRequests } = useData()
  const [showLeaveModal, setShowLeaveModal] = useState(false)

  // Filter leave applications for current user (demo: using 'Jackie Chan' as current user)
  const currentUser = 'Jackie Chan'
  const userLeaveApplications = leaveRequests.filter(req => req.employee === currentUser)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-secondary-green" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-secondary-red" />
      case 'pending':
        return <Clock className="h-4 w-4 text-secondary-orange" />
      default:
        return <AlertCircle className="h-4 w-4 text-neutral-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-secondary-green/10 text-secondary-green'
      case 'rejected':
        return 'bg-secondary-red/10 text-secondary-red'
      case 'pending':
        return 'bg-secondary-orange/10 text-secondary-orange'
      default:
        return 'bg-neutral-100 text-neutral-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Leave Management</h1>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Leaves</p>
              <p className="text-2xl font-bold text-neutral-900">{mockLeaveBalance.totalLeaves}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-neutral-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Used Leaves</p>
              <p className="text-2xl font-bold text-secondary-orange">{mockLeaveBalance.usedLeaves}</p>
            </div>
            <Clock className="h-8 w-8 text-secondary-orange" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Remaining</p>
              <p className="text-2xl font-bold text-secondary-green">{mockLeaveBalance.remainingLeaves}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-secondary-green" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending</p>
              <p className="text-2xl font-bold text-primary-blue">1</p>
            </div>
            <AlertCircle className="h-8 w-8 text-primary-blue" />
          </div>
        </div>
      </div>

      {/* Leave Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Leave Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{mockLeaveBalance.sickLeaves}</div>
            <div className="text-sm text-neutral-600">Sick Leaves</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{mockLeaveBalance.casualLeaves}</div>
            <div className="text-sm text-neutral-600">Casual Leaves</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{mockLeaveBalance.earnedLeaves}</div>
            <div className="text-sm text-neutral-600">Earned Leaves</div>
          </div>
        </div>
      </div>

      {/* Leave Applications */}
      <div className="bg-white rounded-xl shadow-md border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Leave Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Approved By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {userLeaveApplications.map((application) => (
                <tr key={application.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {application.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {application.dates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {application.dates.includes('→') ? 
                      Math.ceil((new Date(application.dates.split(' → ')[1]).getTime() - new Date(application.dates.split(' → ')[0]).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1} days
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 max-w-xs truncate">
                    {application.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {application.approvedBy || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <LeaveApplicationModal onClose={() => setShowLeaveModal(false)} />
      )}
    </div>
  )
}
