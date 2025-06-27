"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, User, Sparkles, RefreshCw, Search, Globe, BookOpen, FileText, Link, Zap, Send, Upload, Image, Plus, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// --- TYPES ---
interface Message {
  id: string
  sender: "user" | "agent"
  text: string
  timestamp: string
  avatarUrl: string
  contextSourceCount?: number
  isStreaming?: boolean
}

interface SearchNode {
  id: string
  title: string
  url?: string
  domain: string
  status: "searching" | "reading" | "completed"
  icon_emoji?: string
}

interface SearchQuery {
  text: string
  status: "active" | "completed"
}

interface ResearchPlan {
  search_queries: { text: string }[]
  search_sources: { title: string; domain: string; icon_emoji: string }[]
}

// --- SUB-COMPONENTS ---

function ContextSources({ count }: { count: number }) {
  return (
    <div className="mt-4 p-3 border border-yellow-400/20 bg-black/20 rounded-lg backdrop-blur-sm">
      <div className="flex items-center space-x-2 text-sm text-yellow-400">
        <Sparkles className="h-4 w-4" />
        <span>Enhanced with {count} context sources</span>
      </div>
    </div>
  )
}

function SearchQueryTags({ queries }: { queries: SearchQuery[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {queries.map((query, index) => (
        <div
          key={index}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs border ${
            query.status === "active"
              ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
              : "bg-green-500/20 border-green-500/40 text-green-300"
          }`}
        >
          <Search className="h-3 w-3" />
          <span>{query.text}</span>
        </div>
      ))}
    </div>
  )
}

function SourceCard({ source }: { source: SearchNode }) {
  const getStatusColor = () => {
    switch (source.status) {
      case "searching": return "bg-blue-500/10 border-blue-500/30"
      case "reading": return "bg-yellow-500/10 border-yellow-500/30"
      case "completed": return "bg-green-500/10 border-green-500/30"
    }
  }

  const getStatusIcon = () => {
    switch (source.status) {
      case "searching": return <Search className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
      case "reading": return <BookOpen className="h-3.5 w-3.5 text-yellow-400 animate-bounce" />
      case "completed": return <Zap className="h-3.5 w-3.5 text-green-400" />
    }
  }

  return (
    <div className={`p-2.5 rounded-lg border transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-start space-x-2.5">
        <div className="flex-shrink-0 pt-0.5">{getStatusIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-2">
            <span className="text-base">{source.icon_emoji || '🌐'}</span>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white truncate mb-0.5">{source.title}</h4>
              <p className="text-xs text-gray-400 truncate">{source.domain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserMessageBubble({ message }: { message: Message }) {
  return (
    <div className="flex flex-col items-end space-y-2 animate-fadeInUp">
      <div className="flex items-center space-x-2 text-xs text-zinc-400">
        <span>{message.timestamp}</span>
        <span>You</span>
      </div>
      <div className="max-w-xs md:max-w-md lg:max-w-lg">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-2xl rounded-bl-2xl shadow-lg">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  )
}

function AgentMessageCard({ message }: { message: Message }) {
  return (
    <div className="flex space-x-3 animate-fadeInUp">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-[#7f5af0] to-[#6366f1] rounded-full flex items-center justify-center shadow-md">
          <Bot className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <span>Toro</span>
          <span>{message.timestamp}</span>
        </div>
        <div className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl max-w-2xl">
          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{message.text}</p>
          {message.contextSourceCount && <ContextSources count={message.contextSourceCount} />}
        </div>
      </div>
    </div>
  )
}

function ChatMessage({ message }: { message: Message }) {
  if (message.sender === "user") return <div className="flex justify-end"><UserMessageBubble message={message} /></div>
  return <AgentMessageCard message={message} />
}

function ChatActionBar({ onActionClick }: { onActionClick: (action: string) => void }) {
  const actions = [
    { id: "write-post", label: "Write Post", icon: Upload },
    { id: "generate-image", label: "Generate Image", icon: Image },
    { id: "add-task", label: "Add Task", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];
  return (
    <div className="flex flex-wrap justify-center gap-3 p-6 border-t border-white/10">
      {actions.map(action => (
        <Button key={action.id} onClick={() => onActionClick(action.id)} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
          <action.icon className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}

function ChatInput({ onSendMessage, isLoading }: { onSendMessage: (message: string) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  return (
    <div className="p-6 border-t border-white/10 bg-[#111318]">
      <form onSubmit={handleSubmit} className="flex space-x-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress}
            placeholder={isLoading ? "Toro is thinking..." : "Ask Toro anything..."}
            disabled={isLoading}
            className="w-full bg-zinc-800/50 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50" />
        </div>
        <Button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white p-4 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
          {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function ChatTerminal() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchNodes, setSearchNodes] = useState<SearchNode[]>([])
  const [searchQueries, setSearchQueries] = useState<SearchQuery[]>([])
  const [generatingStep, setGeneratingStep] = useState("")
  const [hasStartedChatting, setHasStartedChatting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageIdCounter = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isGenerating])

  const addMessage = (sender: 'user' | 'agent', text: string, props: Partial<Message> = {}) => {
    messageIdCounter.current += 1;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMessage: Message = {
      id: `msg-${messageIdCounter.current}`,
      sender, text, timestamp,
      avatarUrl: "",
      ...props
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, text: string) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, text: msg.text + text } : msg));
  };
  
  const finalizeMessage = (id: string, finalProps: Partial<Message>) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, ...finalProps, isStreaming: false } : msg));
  };

  const visualizeSearchProcess = async (plan: ResearchPlan) => {
    setIsGenerating(true)
    setGeneratingStep("Searching")
    
    setSearchQueries(plan.search_queries.map(q => ({ text: q.text, status: "active" })))
    const nodes = plan.search_sources.map((s, i) => ({ ...s, id: `node-${i}`, status: 'searching' as const }))
    setSearchNodes(nodes)

    await new Promise(r => setTimeout(r, 600))
    setSearchQueries(prev => prev.map(q => ({ ...q, status: "completed" })))
    setGeneratingStep(`Reading sources • ${nodes.length}`)

    for (let i = 0; i < nodes.length; i++) {
      await new Promise(r => setTimeout(r, 400))
      setSearchNodes(prev => prev.map((node, index) => index === i ? { ...node, status: "reading" } : (index < i ? { ...node, status: "completed" } : node)))
    }
    
    await new Promise(r => setTimeout(r, 300))
    setSearchNodes(prev => prev.map(node => ({ ...node, status: "completed" })))
    
    setGeneratingStep("Writing response...")
    await new Promise(r => setTimeout(r, 500))
  }
  
  const handleFinalResponseStream = async (userMessage: string, researchContext?: ResearchPlan) => {
    const agentMessageId = addMessage("agent", "", { isStreaming: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { sender: 'user', content: userMessage }],
          researchContext
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get streaming response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') break;
            try {
              const json = JSON.parse(data);
              if (json.content) {
                updateMessage(agentMessageId, json.content);
              }
            } catch (e) {
              console.error('Failed to parse stream data:', e);
            }
          }
        }
      }
      finalizeMessage(agentMessageId, { contextSourceCount: researchContext?.search_sources.length });
    } catch (error) {
      console.error("Streaming failed:", error);
      finalizeMessage(agentMessageId, { text: "Sorry, I encountered an error." });
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!hasStartedChatting) setHasStartedChatting(true);
    setIsLoading(true);
    addMessage("user", message);

    try {
      const intentResponse = await fetch('/api/chat/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });
      const { requiresResearch } = await intentResponse.json();

      if (requiresResearch) {
        const planResponse = await fetch('/api/chat/generate-research-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: message }),
        });
        const researchPlan = await planResponse.json();
        
        await visualizeSearchProcess(researchPlan);
        setIsGenerating(false);
        setSearchNodes([]);
        setSearchQueries([]);
        
        await handleFinalResponseStream(message, researchPlan);

      } else {
        await handleFinalResponseStream(message);
      }
    } catch (error) {
      console.error("Failed to process message:", error);
      addMessage("agent", "I'm sorry, I ran into an issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      "write-post": "Help me write a LinkedIn post about modern frontend development.",
      "generate-image": "Generate an image of a futuristic startup office.",
      "add-task": "Remind me to follow up with investors tomorrow.",
      "analytics": "Show me analytics on web development trends."
    };
    handleSendMessage(actionMessages[action] || action);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#111318] relative overflow-hidden font-inter">
      {/* Welcome or Chat Area */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30 scrollbar-thumb-rounded-full">
          <div className="py-8 px-6 min-h-full">
            {!hasStartedChatting ? (
               <div className="flex-1 flex flex-col items-center justify-center h-full">
                 <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-8">
                   <div className="w-20 h-20 bg-gradient-to-r from-[#7f5af0] via-[#9333ea] to-[#6366f1] rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25 ring-4 ring-purple-500/20">
                     <RefreshCw className="h-10 w-10 text-white" />
                   </div>
                   <div className="space-y-3">
                     <h1 className="text-3xl font-bold text-white">Good to See You!</h1>
                     <p className="text-xl text-gray-300">How can I be an assistant?</p>
                   </div>
                 </div>
               </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
                {isGenerating && (
                  <div className="flex space-x-3 animate-fadeInUp">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#7f5af0] to-[#6366f1] rounded-full flex items-center justify-center shadow-md"><Bot className="h-4 w-4 text-white" /></div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2 text-xs text-zinc-400"><span>Toro</span><span>Generating...</span></div>
                      <div className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl max-w-3xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-zinc-300 font-medium">{generatingStep}</span>
                        </div>
                        {searchQueries.length > 0 && <div className="mb-4"><SearchQueryTags queries={searchQueries} /></div>}
                        {searchNodes.length > 0 && <div className="space-y-2">{searchNodes.map(node => <SourceCard key={node.id} source={node} />)}</div>}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Bar & Chat Input */}
      {!hasStartedChatting && <ChatActionBar onActionClick={handleSendMessage} />}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
