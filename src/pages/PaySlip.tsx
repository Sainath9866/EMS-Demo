import { FileText, Download, Calendar as CalendarIcon, DollarSign } from 'lucide-react'
import { mockPaySlips } from '../data/mockData'

export default function PaySlip() {
  const handleDownload = (payslipId: string) => {
    console.log('Downloading payslip:', payslipId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Pay Slips</h1>
        <div className="text-sm text-neutral-500">
          View and download your salary statements
        </div>
      </div>

      {/* Pay Slip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPaySlips.map((payslip) => (
          <div key={payslip.id} className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary-blue" />
                <h3 className="text-lg font-semibold text-neutral-900">
                  {payslip.month} {payslip.year}
                </h3>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                payslip.status === 'paid' 
                  ? 'bg-secondary-green/10 text-secondary-green' 
                  : 'bg-secondary-orange/10 text-secondary-orange'
              }`}>
                {payslip.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-900">
                  ₹{payslip.netSalary.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600">Net Salary</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Basic Salary</span>
                  <span>₹{payslip.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Allowances</span>
                  <span className="text-secondary-green">+₹{payslip.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Deductions</span>
                  <span className="text-secondary-red">-₹{payslip.deductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(payslip.id)}
              className="w-full bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        ))}
      </div>

      {/* Salary Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Salary Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">
              ₹{mockPaySlips[0]?.basicSalary.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Basic Salary</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-green">
              ₹{mockPaySlips[0]?.allowances.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Allowances</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-red">
              ₹{mockPaySlips[0]?.deductions.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Deductions</div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Tax Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Income Tax</h3>
              <p className="text-2xl font-bold text-neutral-900">₹5,200</p>
              <p className="text-sm text-neutral-600">Monthly deduction</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Provident Fund</h3>
              <p className="text-2xl font-bold text-neutral-900">₹2,400</p>
              <p className="text-sm text-neutral-600">Employee contribution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
