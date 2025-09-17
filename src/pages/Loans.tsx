import { CreditCard, DollarSign, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'

export default function Loans() {
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
        <div className="text-sm text-neutral-500">
          Manage your loan applications and payments
        </div>
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

      {/* Apply for Loan */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Apply for New Loan</h2>
        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="h-5 w-5 text-primary-blue" />
            <p className="text-sm text-neutral-600">
              To apply for a new loan, please contact the HR department or submit a request through the Requests section.
            </p>
          </div>
          <button className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors">
            Submit Loan Request
          </button>
        </div>
      </div>
    </div>
  )
}
