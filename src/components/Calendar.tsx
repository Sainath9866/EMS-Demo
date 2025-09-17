import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent } from '../data/mockData'

interface CalendarProps {
  events: CalendarEvent[]
}

export default function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }
  
  const getEventsForDate = (day: number) => {
    if (!day) return []
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }
  
  const days = getDaysInMonth(currentDate)
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-neutral-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <div className="flex space-x-1">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded hover:bg-neutral-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 rounded hover:bg-neutral-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : []
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear()
            
            return (
              <div
                key={index}
                className={`h-8 flex items-center justify-center text-sm rounded ${
                  day ? 'hover:bg-neutral-100 cursor-pointer' : ''
                } ${
                  isToday ? 'bg-primary-blue text-white font-semibold' : ''
                }`}
              >
                {day}
                {dayEvents.length > 0 && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-secondary-orange rounded-full"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Events Legend */}
      {events.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-neutral-700">Upcoming Events</h5>
          <div className="space-y-1">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="flex items-center space-x-2 text-xs">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <span className="text-neutral-600">{event.title}</span>
                <span className="text-neutral-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
