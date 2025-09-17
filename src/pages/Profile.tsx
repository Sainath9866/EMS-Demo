import { User, Mail, Phone, MapPin, Calendar as CalendarIcon, Building, Edit } from 'lucide-react'
import { mockEmployee } from '../data/mockData'

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
        <button className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-darkBlue transition-colors flex items-center">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
            <div className="text-center">
              <img
                src={mockEmployee.avatar}
                alt={mockEmployee.name}
                className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-neutral-900">{mockEmployee.name}</h2>
              <p className="text-neutral-600">{mockEmployee.role}</p>
              <p className="text-sm text-neutral-500">{mockEmployee.department}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="text-neutral-900">{mockEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="text-neutral-900">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Address</p>
                    <p className="text-neutral-900">123 Main St, City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Date of Birth</p>
                    <p className="text-neutral-900">January 15, 1990</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Work Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Department</p>
              <p className="text-neutral-900">{mockEmployee.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Position</p>
              <p className="text-neutral-900">{mockEmployee.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Join Date</p>
              <p className="text-neutral-900">{new Date(mockEmployee.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Employee ID</p>
              <p className="text-neutral-900">EMP001</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Manager</p>
              <p className="text-neutral-900">Sarah Johnson</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500">Work Experience</p>
              <p className="text-neutral-900">2 years 11 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills and Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary-blue/10 text-primary-blue text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Certifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-900">AWS Certified Developer</span>
              <span className="text-xs text-neutral-500">2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-900">React Professional</span>
              <span className="text-xs text-neutral-500">2023</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-900">Project Management</span>
              <span className="text-xs text-neutral-500">2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
