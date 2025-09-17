import { useState } from 'react'
import { Search, Menu, Bell } from 'lucide-react'
import { mockEmployee } from '../data/mockData'
import ProfileModal from './ProfileModal'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 h-16 flex items-center justify-between px-6">
        {/* Left side - Menu button and Search */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Search box */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search something here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-80 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img
              src={mockEmployee.avatar}
              alt={mockEmployee.name}
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">{mockEmployee.name}</p>
              <p className="text-xs text-gray-500">{mockEmployee.role}</p>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          employee={mockEmployee}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  )
}
