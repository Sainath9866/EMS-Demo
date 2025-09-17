import { useState } from 'react'
import { MessageCircle, X, Send, Plus } from 'lucide-react'
import { mockFAQ } from '../data/mockData'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. Our support team will get back to you within 24 hours.",
        isUser: false
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleCreateTicket = () => {
    console.log('Creating support ticket...')
    const ticketMessage = {
      id: Date.now().toString(),
      text: "Support ticket created successfully. Ticket ID: #12345",
      isUser: false
    }
    setMessages(prev => [...prev, ticketMessage])
  }

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-blue text-white p-4 rounded-full shadow-lg hover:bg-primary-darkBlue transition-colors z-40 cursor-pointer"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed top-4 right-4 h-[calc(100vh-2rem)] w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center bg-blue-500 justify-between p-4 border-b border-neutral-200 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-white">HR Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600">Hi! How can I help you today?</p>
                  <div className="space-y-1">
                    {mockFAQ.slice(0, 3).map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => setInputText(faq.question)}
                        className="block w-full text-left text-sm text-primary-blue hover:underline cursor-pointer"
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary-blue text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-neutral-200 space-y-2">
              <button
                onClick={handleCreateTicket}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-green text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create Ticket</span>
              </button>
              
              {/* Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-darkBlue transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
        </div>
      )}
    </>
  )
}
