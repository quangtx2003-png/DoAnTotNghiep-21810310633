// @/components/chat/ChatBot.tsx
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, MessageCircle, Bot, User, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Product } from '@/types/product'
import axiosInstance from '@/lib/axios/instance'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  product?: Product
}

interface ChatResponse {
  type: 'CHAT' | 'NO_RESULT' | 'PRODUCT'
  message: string
  data?: Product
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content:
        'Xin chào! Tôi là trợ lý AI, có thể giúp bạn tìm kiếm sản phẩm phù hợp. Bạn đang tìm kiếm gì?',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [inputMessage])

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage || isLoading) return

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmedMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Gọi API mới
      const response = await axiosInstance.post<ChatResponse>('/ai/search', {
        message: trimmedMessage,
      })

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.data.message,
        timestamp: new Date(),
      }

      // Nếu có sản phẩm, thêm vào tin nhắn
      if (response.data.type === 'PRODUCT' && response.data.data) {
        aiMessage.product = response.data.data
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại sau!',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`)
    setIsOpen(false)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        content:
          'Xin chào! Tôi là trợ lý AI, có thể giúp bạn tìm kiếm sản phẩm phù hợp. Bạn đang tìm kiếm gì?',
        timestamp: new Date(),
      },
    ])
  }

  const suggestQueries = [
    'Tôi cần tìm điện thoại dưới 10 triệu',
    'Laptop gaming giá tốt',
    'Tai nghe không dây chống ồn',
    'Đồng hồ thông minh cho nữ',
    'Máy ảnh mirrorless cho người mới',
  ]

  const handleSuggestionClick = (query: string) => {
    setInputMessage(query)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          <motion.span
            className="absolute -top-1 -right-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles size={12} className="text-yellow-300" />
          </motion.span>
        </div>
        <span className="sr-only">AI Assistant</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Shopping Assistant</h3>
                    <p className="text-xs opacity-90">Powered by Gemini AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    title="Clear conversation"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}
                  >
                    {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    {message.product && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                        onClick={() => handleProductClick(message.product!.id)}
                      >
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <img
                              src={message.product.thumbnail || '/api/placeholder/80/80'}
                              alt={message.product.name}
                              className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = '/api/placeholder/80/80'
                              }}
                            />
                            {message.product.minPrice !== message.product.originalMinPrice && (
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                Sale
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 truncate">
                              {message.product.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {message.product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-primary font-bold text-sm">
                                  {message.product.minPrice?.toLocaleString('vi-VN')} ₫
                                </p>
                                {message.product.originalMinPrice &&
                                  message.product.originalMinPrice > message.product.minPrice && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                      {message.product.originalMinPrice.toLocaleString('vi-VN')} ₫
                                    </p>
                                  )}
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      i <
                                      Math.floor(
                                        (message && message.product && message.product.avgRating) ||
                                          0
                                      )
                                        ? 'bg-yellow-400'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  ({message.product.avgRating?.toFixed(1) || 0})
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                          👆 Click để xem chi tiết sản phẩm
                        </p>
                      </motion.div>
                    )}
                    <p className="text-xs opacity-75 mt-2 text-right">
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pt-2 pb-1 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  Gợi ý tìm kiếm:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(query)}
                      className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập câu hỏi về sản phẩm..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Nhấn Enter để gửi • Shift + Enter để xuống dòng
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
