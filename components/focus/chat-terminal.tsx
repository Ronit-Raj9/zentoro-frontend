"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, User, Sparkles, RefreshCw } from "lucide-react"
import ActionBar from "./action-bar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "agent"
  content: string
  timestamp: string
  agent?: string
  suggestions?: string[]
  contextSources?: number
}

export default function ChatTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: "Good to See You!\nHow Can I be an Assistant?",
      timestamp: "11:17 PM",
      agent: "Toro",
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const [containerWidth, setContainerWidth] = useState(800)
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageIdCounter = useRef(0)

  // Monitor container width changes
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    messageIdCounter.current += 1
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    const newMessage: Message = {
      id: `msg-${messageIdCounter.current}`,
      type: "user",
      content: message,
      timestamp,
    }

    setMessages((prev) => [...prev, newMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      messageIdCounter.current += 1
      const aiResponse: Message = {
        id: `msg-${messageIdCounter.current}`,
        type: "agent",
        content: "I understand you want to work on that. Let me help you break it down into actionable steps.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        agent: "Toro",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleActionClick = (action: string) => {
    let actionMessage = ""
    switch (action) {
      case "write-post":
        actionMessage = "Help me write a LinkedIn post"
        break
      case "generate-image":
        actionMessage = "Generate an image for my project"
        break
      case "add-task":
        actionMessage = "Add a new task to my list"
        break
      case "analytics":
        actionMessage = "Show me my productivity analytics"
        break
      default:
        actionMessage = action
    }
    handleSendMessage(actionMessage)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(`Write a post about ${suggestion.replace(/[🧠🚀💰👥]/gu, "").trim()}`)
  }

  // Determine layout based on container width
  const isNarrow = containerWidth < 600
  const isVeryNarrow = containerWidth < 450

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] min-w-0 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Centered Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        
        {/* Main Chat Area */}
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          
          {/* Bot Avatar and Welcome Message */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7f5af0] via-[#9333ea] to-[#6366f1] rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 ring-2 ring-purple-500/20">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Good to See You!</h1>
              <p className="text-lg text-gray-300">How Can I be an Assistant?</p>
              <p className="text-sm text-gray-400">I'm available 24/7 for you as me anything.</p>
            </div>
          </div>

          {/* Feature Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/[0.03] border-white/20 text-gray-300 hover:bg-[#7f5af0]/20 hover:border-[#7f5af0]/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
              onClick={() => handleSendMessage("Any advice for me?")}
            >
              Any advice for me?
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/[0.03] border-white/20 text-gray-300 hover:bg-[#7f5af0]/20 hover:border-[#7f5af0]/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
              onClick={() => handleSendMessage("Send popular video idea")}
            >
              Send popular video idea
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/[0.03] border-white/20 text-gray-300 hover:bg-[#7f5af0]/20 hover:border-[#7f5af0]/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
              onClick={() => handleSendMessage("UI lessons from Vercel")}
            >
              UI lessons from Vercel
            </Button>
          </div>

          {/* Messages Area - Only show when there are messages beyond the initial one */}
          {messages.length > 1 && (
            <div className="w-full max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
              {messages.slice(1).map((message, index) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : ""}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === "agent" ? (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#7f5af0] to-[#6366f1] rounded-full flex items-center justify-center shadow-md shadow-purple-500/25">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center shadow-md shadow-indigo-500/25">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-300">
                          {message.type === "agent" ? message.agent || "Assistant" : "You"}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>

                      <div
                        className={`p-3 rounded-lg backdrop-blur-sm border ${
                          message.type === "user" 
                            ? "bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] text-white border-[#7f5af0]/30 shadow-lg shadow-purple-500/25 ml-8" 
                            : "bg-white/[0.05] text-gray-200 border-white/10 ml-8 hover:bg-white/[0.08] transition-colors duration-200"
                        }`}
                      >
                        {message.content}
                        {message.contextSources && (
                          <div className="text-gray-400 mt-2 text-xs flex items-center">
                            <Sparkles className="h-3 w-3 mr-1 text-[#facc15]" />
                            Enhanced with {message.contextSources} context sources
                          </div>
                        )}
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="ml-8 mt-2 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-white/[0.03] border-white/20 text-gray-300 hover:bg-[#7f5af0]/20 hover:border-[#7f5af0]/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 ml-8">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#7f5af0] to-[#6366f1] rounded-full flex items-center justify-center shadow-md shadow-purple-500/25">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white/[0.05] backdrop-blur-sm p-3 rounded-lg border border-white/10">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#7f5af0] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex-shrink-0 relative border-t border-white/10">
        <ActionBar
          onActionClick={handleActionClick}
          onSendMessage={handleSendMessage}
          containerWidth={containerWidth}
        />
      </div>
    </div>
  )
}
