"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, User, Sparkles, RefreshCw, Search, Globe, BookOpen, FileText, Link, Zap } from "lucide-react"
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

interface SearchNode {
  id: string
  title: string
  url: string
  status: "searching" | "reading" | "completed"
  icon: typeof Search | typeof Globe | typeof BookOpen | typeof FileText
}

export default function ChatTerminal() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchNodes, setSearchNodes] = useState<SearchNode[]>([])
  const [generatingStep, setGeneratingStep] = useState("")
  const [containerWidth, setContainerWidth] = useState(800)
  const [hasStartedChatting, setHasStartedChatting] = useState(false)
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
  }, [messages, isGenerating])

  // Simulate search and generation process
  const simulateGeneration = async () => {
    setIsGenerating(true)
    setGeneratingStep("Searching for information...")
    
    // Create dummy search nodes
    const dummyNodes: SearchNode[] = [
      { id: "1", title: "Modern Frontend Architectures - React & Next.js", url: "react.dev", status: "searching", icon: Globe },
      { id: "2", title: "JAMstack Best Practices 2024", url: "jamstack.org", status: "searching", icon: FileText },
      { id: "3", title: "Serverless Architecture Patterns", url: "aws.amazon.com", status: "searching", icon: BookOpen },
      { id: "4", title: "Edge Computing in Web Development", url: "vercel.com", status: "searching", icon: Link },
    ]
    
    setSearchNodes(dummyNodes)

    // Simulate search progression
    for (let i = 0; i < dummyNodes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSearchNodes(prev => prev.map((node, index) => {
        if (index === i) {
          return { ...node, status: "reading" }
        } else if (index < i) {
          return { ...node, status: "completed" }
        }
        return node
      }))
      
      if (i === 0) setGeneratingStep("Reading sources...")
      if (i === 2) setGeneratingStep("Analyzing information...")
    }

    // Mark all as completed
    await new Promise(resolve => setTimeout(resolve, 500))
    setSearchNodes(prev => prev.map(node => ({ ...node, status: "completed" })))
    setGeneratingStep("Writing response...")
    
    // Final delay before showing response
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsGenerating(false)
    setSearchNodes([])
    setGeneratingStep("")
  }

  const handleSendMessage = async (message: string) => {
    // Mark that chatting has started
    if (!hasStartedChatting) {
      setHasStartedChatting(true)
    }

    messageIdCounter.current += 1
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    const newMessage: Message = {
      id: `msg-${messageIdCounter.current}`,
      type: "user",
      content: message,
      timestamp,
    }

    setMessages((prev) => [...prev, newMessage])
    
    // Start generation simulation
    await simulateGeneration()

    // Add AI response
    messageIdCounter.current += 1
    const aiResponse: Message = {
      id: `msg-${messageIdCounter.current}`,
      type: "agent",
      content: "Based on current trends in frontend development, I'd recommend focusing on modern architectures like JAMstack and serverless patterns. These approaches offer better performance, scalability, and developer experience. Key areas to explore include React Server Components, Edge Computing, and headless CMS integration for optimal results.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      agent: "Toro",
      contextSources: 4,
    }
    setMessages((prev) => [...prev, aiResponse])
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

  const getNodeStatusColor = (status: SearchNode['status']) => {
    switch (status) {
      case "searching": return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "reading": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "completed": return "text-green-400 bg-green-500/20 border-green-500/30"
    }
  }

  const getNodeIcon = (status: SearchNode['status']) => {
    switch (status) {
      case "searching": return <Search className="h-3 w-3 animate-pulse" />
      case "reading": return <BookOpen className="h-3 w-3 animate-bounce" />
      case "completed": return <Zap className="h-3 w-3" />
    }
  }

  // Determine layout based on container width
  const isNarrow = containerWidth < 600
  const isVeryNarrow = containerWidth < 450

  return (
    <div 
      ref={containerRef} 
      className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Welcome Screen - Only show when not chatting */}
      {!hasStartedChatting && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-0">
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
          </div>
        </div>
      )}

      {/* Chat Area - Only show when chatting has started */}
      {hasStartedChatting && (
        <>
          {/* Messages Container - Absolutely constrained scrollable area */}
          <div className="flex-1 min-h-0 relative">
            <div 
              className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30 scrollbar-thumb-rounded-full"
              style={{ height: '100%' }}
            >
              <div className="p-4 pb-6 min-h-full">
                <div className="max-w-4xl mx-auto space-y-6">
                  {messages.map((message, index) => (
                    <div key={message.id} className="space-y-3">
                      {/* Message */}
                      <div className="flex justify-center">
                        <div className="w-full max-w-3xl">
                          <div className="flex items-center justify-center space-x-2 mb-3">
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
                              {message.type === "agent" ? message.agent || "Toro" : "You"}
                            </span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>

                          <div
                            className={`p-4 rounded-2xl backdrop-blur-sm border text-center ${
                              message.type === "user" 
                                ? "bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] text-white border-[#7f5af0]/30 shadow-lg shadow-purple-500/25" 
                                : "bg-white/[0.05] text-gray-200 border-white/10 hover:bg-white/[0.08] transition-colors duration-200"
                            }`}
                          >
                            <div className="text-left">
                              {message.content}
                              {message.contextSources && (
                                <div className="text-gray-400 mt-3 text-sm flex items-center justify-center p-3 bg-black/20 rounded-lg border border-white/10">
                                  <Sparkles className="h-4 w-4 mr-2 text-[#facc15]" />
                                  <span>Enhanced with {message.contextSources} context sources</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Suggestions */}
                          {message.suggestions && (
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
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

                  {/* Generation State */}
                  {isGenerating && (
                    <div className="space-y-4">
                      {/* Generating Header */}
                      <div className="flex justify-center">
                        <div className="w-full max-w-3xl">
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#7f5af0] to-[#6366f1] rounded-full flex items-center justify-center shadow-md shadow-purple-500/25">
                              <Bot className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-300">Toro</span>
                            <span className="text-xs text-gray-500">Generating...</span>
                          </div>

                          {/* Progress Indicator */}
                          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                              <div className="w-4 h-4 bg-[#7f5af0] rounded-full animate-pulse"></div>
                              <span className="text-sm text-gray-300 font-medium">{generatingStep}</span>
                            </div>

                            {/* Search Nodes */}
                            {searchNodes.length > 0 && (
                              <div className="space-y-2">
                                <div className="text-xs text-gray-400 text-center mb-3">Reading sources • {searchNodes.filter(n => n.status === "completed").length}</div>
                                <div className="space-y-2">
                                  {searchNodes.map((node) => (
                                    <div
                                      key={node.id}
                                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${getNodeStatusColor(node.status)}`}
                                    >
                                      <div className="flex-shrink-0">
                                        {getNodeIcon(node.status)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">
                                          {node.title}
                                        </div>
                                        <div className="text-xs opacity-70 truncate">
                                          {node.url}
                                        </div>
                                      </div>
                                      <div className="flex-shrink-0">
                                        <node.icon className="h-4 w-4 opacity-60" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Bar - Fixed at bottom with absolute positioning */}
      <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] relative z-10">
        <ActionBar
          onActionClick={handleActionClick}
          onSendMessage={handleSendMessage}
          containerWidth={containerWidth}
        />
      </div>
    </div>
  )
}
