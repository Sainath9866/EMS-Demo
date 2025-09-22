import { CreditCard, DollarSign, Calendar as CalendarIcon, Plus } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useState } from 'react'

export default function Loans() {
  const { loanRequests, addLoanRequest, addNotification } = useData()
  const [showLoanModal, setShowLoanModal] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    reason: ''
  })

  // Filter loan requests for current user (demo: using 'Jackie Chan' as current user)
  const currentUser = 'Jackie Chan'
  const userLoanRequests = loanRequests.filter(req => req.employee === currentUser)

  const loanHistory = [
    {
      id: '1',
      type: 'Personal Loan',
      amount: 50000,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      monthlyEMI: 4500,
      remainingAmount: 27000,
      interestRate: 12
    },
    {
      id: '2',
      type: 'Emergency Loan',
      amount: 25000,
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      monthlyEMI: 2200,
      remainingAmount: 0,
      interestRate: 10
    }
  ]

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.type && formData.amount) {
      addLoanRequest({
        employee: currentUser,
        type: formData.type,
        amount: parseInt(formData.amount),
        status: 'pending'
      })
      
      // Show success notification
      addNotification('success', 'Loan Request Submitted', 'Your loan request has been submitted and is pending approval.')
      
      setFormData({ type: '', amount: '', reason: '' })
      setShowLoanModal(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary-orange/10 text-secondary-orange'
      case 'completed':
        return 'bg-secondary-green/10 text-secondary-green'
      case 'pending':
        return 'bg-primary-blue/10 text-primary-blue'
      default:
        return 'bg-neutral-100 text-neutral-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Loans</h1>
        <button
          onClick={() => setShowLoanModal(true)}
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply for Loan
        </button>
      </div>

      {/* Loan Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Loans</p>
              <p className="text-2xl font-bold text-secondary-orange">1</p>
            </div>
            <CreditCard className="h-8 w-8 text-secondary-orange" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-neutral-900">₹27,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-neutral-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Monthly EMI</p>
              <p className="text-2xl font-bold text-primary-blue">₹4,500</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-primary-blue" />
          </div>
        </div>
      </div>

      {/* Pending Loan Requests */}
      {userLoanRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">Pending Loan Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {userLoanRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {request.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      ₹{request.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {new Date(request.appliedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loan Applications */}
      <div className="bg-white rounded-xl shadow-md border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Loan History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Loan Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Monthly EMI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Remaining Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {loanHistory.map((loan) => (
                <tr key={loan.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {loan.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ₹{loan.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {loan.interestRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ₹{loan.monthlyEMI.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ₹{loan.remainingAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {new Date(loan.startDate).toLocaleDateString()} - {new Date(loan.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowLoanModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Apply for Loan</h3>
              <button onClick={() => setShowLoanModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">✕</button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleLoanSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Loan Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select loan type</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Emergency Loan">Emergency Loan</option>
                  <option value="Advance Salary">Advance Salary</option>
                  <option value="Home Loan">Home Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  placeholder="Reason for loan request"
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowLoanModal(false)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
