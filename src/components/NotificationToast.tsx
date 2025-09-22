import React, { useEffect } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useNotifications, type Notification } from '../contexts/NotificationContext'

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { removeNotification } = useNotifications()

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className={`p-4 rounded-lg border shadow-lg ${getBgColor()} animate-slide-in-right`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const NotificationToast: React.FC = () => {
  const { notifications, addNotification } = useNotifications()

  useEffect(() => {
    const handleNotification = (event: CustomEvent) => {
      const { type, title, message } = event.detail
      addNotification({ type, title, message })
    }

    window.addEventListener('ems-notification', handleNotification as EventListener)
    return () => {
      window.removeEventListener('ems-notification', handleNotification as EventListener)
    }
  }, [addNotification])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationToast
