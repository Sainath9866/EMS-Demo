import { useState } from 'react'
import { Send, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react'

export default function Requests() {
  const [showNewRequest, setShowNewRequest] = useState(false)

  const requests = [
    {
      id: '1',
      type: 'Leave Request',
      title: 'Sick Leave Application',
      description: 'Request for 3 days sick leave due to fever',
      status: 'approved',
      submittedDate: '2024-12-08',
      processedDate: '2024-12-09',
      processedBy: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'Document Request',
      title: 'Experience Certificate',
      description: 'Need experience certificate for visa application',
      status: 'pending',
      submittedDate: '2024-12-05',
      processedDate: '',
      processedBy: ''
    },
    {
      id: '3',
      type: 'Financial Request',
      title: 'Advance Salary',
      description: 'Request for advance salary of ₹25,000',
      status: 'rejected',
      submittedDate: '2024-11-28',
      processedDate: '2024-11-30',
      processedBy: 'Mike Wilson'
    },
    {
      id: '4',
      type: 'IT Support',
      title: 'Laptop Issue',
      description: 'Laptop not starting, need technical support',
      status: 'in_progress',
      submittedDate: '2024-12-03',
      processedDate: '',
      processedBy: 'IT Department'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-secondary-green" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-secondary-red" />
      case 'pending':
        return <Clock className="h-4 w-4 text-secondary-orange" />
      case 'in_progress':
        return <AlertCircle className="h-4 w-4 text-primary-blue" />
      default:
        return <Clock className="h-4 w-4 text-neutral-400" />
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
      case 'in_progress':
        return 'bg-primary-blue/10 text-primary-blue'
      default:
        return 'bg-neutral-100 text-neutral-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Requests</h1>
        <button
          onClick={() => setShowNewRequest(true)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </button>
      </div>

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Requests</p>
              <p className="text-2xl font-bold text-neutral-900">{requests.length}</p>
            </div>
            <Send className="h-8 w-8 text-neutral-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending</p>
              <p className="text-2xl font-bold text-secondary-orange">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-secondary-orange" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Approved</p>
              <p className="text-2xl font-bold text-secondary-green">
                {requests.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-secondary-green" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">In Progress</p>
              <p className="text-2xl font-bold text-primary-blue">
                {requests.filter(r => r.status === 'in_progress').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-primary-blue" />
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-md border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">My Requests</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-neutral-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-neutral-900">{request.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">{request.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-neutral-500">
                    <span>Type: {request.type}</span>
                    <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                    {request.processedDate && (
                      <span>Processed: {new Date(request.processedDate).toLocaleDateString()}</span>
                    )}
                    {request.processedBy && (
                      <span>By: {request.processedBy}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Request Modal Placeholder */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">New Request</h2>
              <p className="text-neutral-600 mb-4">
                This feature would allow you to submit new requests. For now, you can use the chatbot or contact HR directly.
              </p>
              <button
                onClick={() => setShowNewRequest(false)}
                className="w-full bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 