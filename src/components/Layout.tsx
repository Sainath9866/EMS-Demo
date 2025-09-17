import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Chatbot from './Chatbot'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
