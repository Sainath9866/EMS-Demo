import { useState } from 'react'
import { 
  Clock, 
  Calendar as CalendarIcon, 
  FileText, 
  Download, 
  Plus,
  AlertCircle,
  X
} from 'lucide-react'
import { 
  mockPaySlips, 
  mockAnnouncements, 
  mockActivities
} from '../data/mockData'
import LeaveApplicationModal from '../components/LeaveApplicationModal'
import Schedule from '../components/Schedule'

export default function Dashboard() {
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showFinancialModal, setShowFinancialModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)

  const handleDownloadPayslip = (payslipId: string) => {
    console.log('Downloading payslip:', payslipId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content - Full Width */}
      <div className="space-y-8">
          {/* Top Row - Time to Work, Attendance, Leave Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Time to Work Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Time to Work</h2>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Punched-In</p>
                    <p className="text-sm font-semibold text-gray-900">10:43 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Punched-Out</p>
                    <p className="text-sm font-semibold text-gray-900">07:32 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">08hr : 05Min</p>
                </div>
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <Clock className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Attendance</h2>
                <div className="text-right">
                  <div className="text-xs text-gray-500">This Week</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="90, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">90%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">On time arrival</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="86, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">8.6</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Avg hrs/day</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-red-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="10, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">1</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Leaves</p>
                </div>
              </div>
              <div className="mt-3 flex border-solid border-gray-500 items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">38hr : 24Min</p>
                </div>
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <Clock className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Leave Balance Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Leave Balance</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-12 h-16 bg-yellow-100 rounded-t-lg mx-auto mb-2 flex items-end justify-center">
                    <div className="w-full bg-yellow-400 rounded-t-lg" style={{height: '70%'}}></div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">07</div>
                  <div className="text-xs text-gray-600">Casual</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-16 bg-red-100 rounded-t-lg mx-auto mb-2 flex items-end justify-center">
                    <div className="w-full bg-red-400 rounded-t-lg" style={{height: '80%'}}></div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">10</div>
                  <div className="text-xs text-gray-600">Sick</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-16 bg-blue-100 rounded-t-lg mx-auto mb-2 flex items-end justify-center">
                    <div className="w-full bg-blue-500 rounded-t-lg" style={{height: '90%'}}></div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">15</div>
                  <div className="text-xs text-gray-600">Annual</div>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setShowLeaveModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl group animate-fade-in-up cursor-pointer"
              style={{animationDelay: '0.4s'}}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Apply Leave</h3>
              <p className="text-blue-100 text-sm">Submit a leave request</p>
            </button>

            <button 
              onClick={() => setShowFinancialModal(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl group animate-fade-in-up cursor-pointer"
              style={{animationDelay: '0.5s'}}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Request</h3>
              <p className="text-red-100 text-sm">Submit a financial request</p>
            </button>

            <button 
              onClick={() => setShowDocumentModal(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl group animate-fade-in-up cursor-pointer"
              style={{animationDelay: '0.6s'}}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Document Request</h3>
              <p className="text-yellow-100 text-sm">Submit a document request</p>
            </button>
          </div>


          {/* Schedule Section */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.65s'}}>
            <Schedule />
          </div>

          {/* Bottom Row - Pay Slips, Announcements, Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pay Slips Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Pay slips</h3>
              <div className="space-y-4">
                {mockPaySlips.map((payslip) => (
                  <div key={payslip.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{payslip.month}, {payslip.year}</p>
                      <p className="text-sm text-gray-500">₹{payslip.netSalary.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <AlertCircle className="h-4 w-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDownloadPayslip(payslip.id)}
                        className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Announcements</h3>
              <div className="space-y-4">
                {mockAnnouncements.slice(0, 1).map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">Meeting</span>
                      <span className="text-sm text-gray-500">14 Aug</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>04:00 PM</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>Sales floor</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{announcement.content}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                        ))}
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Calendar</h3>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">August 2025</h4>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[24, 25, 26, 27, 28, 29, 30].map((date) => (
                  <div key={date} className={`text-center py-2 rounded-lg cursor-pointer ${
                    date === 25 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}>
                    {date}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex space-x-1 mb-4">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full cursor-pointer">Birthdays</button>
                  <button className="px-3 py-1 text-gray-500 text-sm rounded-full hover:bg-gray-100 cursor-pointer">Anniversaries</button>
                  <button className="px-3 py-1 text-gray-500 text-sm rounded-full hover:bg-gray-100 cursor-pointer">New joinees</button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Asad Ur Rahman Tam...</p>
                      <p className="text-xs text-gray-500">Relationship Manager</p>
                    </div>
                    <span className="text-xs text-gray-500">12/08/25</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Mohamed Jemshith</p>
                      <p className="text-xs text-gray-500">Relationship Manager</p>
                    </div>
                    <span className="text-xs text-gray-500">12/08/25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {mockActivities.slice(0, 2).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' : 
                      activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <LeaveApplicationModal onClose={() => setShowLeaveModal(false)} />
      )}

      {/* Financial Request Modal */}
      {showFinancialModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Financial Request</h2>
                <button
                  onClick={() => setShowFinancialModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors cursor-pointer">
                    <option>Advance Salary</option>
                    <option>Reimbursement</option>
                    <option>Loan Request</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <textarea
                    placeholder="Describe the reason for your request"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none cursor-pointer"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowFinancialModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Document Request Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Document Request</h2>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors cursor-pointer">
                    <option>Experience Certificate</option>
                    <option>Salary Certificate</option>
                    <option>NOC (No Objection Certificate)</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <textarea
                    placeholder="Describe the purpose for requesting this document"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors">
                    <option>Normal (3-5 business days)</option>
                    <option>Urgent (1-2 business days)</option>
                    <option>Emergency (Same day)</option>
                  </select>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDocumentModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
                  >
                    Request Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
