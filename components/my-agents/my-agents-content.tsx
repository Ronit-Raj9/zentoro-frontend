"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  User, 
  Plus, 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Power, 
  PowerOff,
  Settings,
  Download,
  Share,
  Activity,
  Clock,
  Star,
  Eye,
  Bot,
  Zap,
  Brain,
  Sparkles,
  TrendingUp,
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  Wrench,
  AlertCircle,
  CheckCircle,
  Pause,
  Play,
  RefreshCw,
  ExternalLink,
  Copy,
  Heart,
  ChevronDown,
  Grid,
  List,
  SortAsc,
  SortDesc
} from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  type: "created" | "purchased"
  status: "active" | "inactive" | "training" | "error"
  category: string
  avatar: string
  usage: {
    totalConversations: number
    lastUsed: string
    averageRating: number
    totalRatings: number
  }
  performance: {
    responseTime: number
    accuracy: number
    uptime: number
  }
  created: string
  version: string
  isPublic: boolean
  tags: string[]
}

export default function MyAgentsContent() {
  const [activeTab, setActiveTab] = useState("created")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for agents
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "agent-1",
      name: "Content Writer Pro",
      description: "Advanced AI writer specialized in creating engaging blog posts, articles, and marketing content with SEO optimization.",
      type: "created",
      status: "active",
      category: "Content Creation",
      avatar: "✍️",
      usage: {
        totalConversations: 1247,
        lastUsed: "2 hours ago",
        averageRating: 4.8,
        totalRatings: 156
      },
      performance: {
        responseTime: 1.2,
        accuracy: 94,
        uptime: 99.8
      },
      created: "2024-01-15",
      version: "2.1.0",
      isPublic: true,
      tags: ["writing", "seo", "marketing", "blog"]
    },
    {
      id: "agent-2",
      name: "Code Assistant",
      description: "Intelligent coding companion that helps with debugging, code reviews, and implementing best practices across multiple languages.",
      type: "created",
      status: "active",
      category: "Development",
      avatar: "💻",
      usage: {
        totalConversations: 2156,
        lastUsed: "1 hour ago",
        averageRating: 4.9,
        totalRatings: 89
      },
      performance: {
        responseTime: 0.8,
        accuracy: 97,
        uptime: 99.9
      },
      created: "2024-01-10",
      version: "1.8.2",
      isPublic: true,
      tags: ["coding", "debugging", "javascript", "python"]
    },
    {
      id: "agent-3",
      name: "Research Analyst",
      description: "Comprehensive research agent that gathers, analyzes, and synthesizes information from multiple sources for detailed reports.",
      type: "created",
      status: "training",
      category: "Research",
      avatar: "🔍",
      usage: {
        totalConversations: 543,
        lastUsed: "1 day ago",
        averageRating: 4.6,
        totalRatings: 34
      },
      performance: {
        responseTime: 2.1,
        accuracy: 91,
        uptime: 98.5
      },
      created: "2024-02-01",
      version: "1.0.1",
      isPublic: false,
      tags: ["research", "analysis", "reports", "data"]
    },
    {
      id: "agent-4",
      name: "Customer Support Hero",
      description: "Friendly and efficient customer service agent trained on your company's knowledge base and policies.",
      type: "purchased",
      status: "active",
      category: "Customer Service",
      avatar: "🎯",
      usage: {
        totalConversations: 3421,
        lastUsed: "30 minutes ago",
        averageRating: 4.7,
        totalRatings: 203
      },
      performance: {
        responseTime: 0.5,
        accuracy: 96,
        uptime: 99.7
      },
      created: "2024-01-20",
      version: "3.2.1",
      isPublic: false,
      tags: ["support", "customer-service", "help-desk"]
    },
    {
      id: "agent-5",
      name: "Social Media Manager",
      description: "Creative social media specialist that crafts engaging posts, schedules content, and analyzes performance metrics.",
      type: "purchased",
      status: "inactive",
      category: "Marketing",
      avatar: "📱",
      usage: {
        totalConversations: 187,
        lastUsed: "3 days ago",
        averageRating: 4.4,
        totalRatings: 67
      },
      performance: {
        responseTime: 1.8,
        accuracy: 89,
        uptime: 97.2
      },
      created: "2024-02-10",
      version: "2.0.3",
      isPublic: false,
      tags: ["social-media", "content", "analytics"]
    },
    {
      id: "agent-6",
      name: "Data Scientist Assistant",
      description: "Advanced analytics agent for data processing, visualization, and machine learning model recommendations.",
      type: "purchased",
      status: "error",
      category: "Analytics",
      avatar: "📊",
      usage: {
        totalConversations: 89,
        lastUsed: "1 week ago",
        averageRating: 4.2,
        totalRatings: 15
      },
      performance: {
        responseTime: 3.2,
        accuracy: 87,
        uptime: 94.1
      },
      created: "2024-02-15",
      version: "1.5.0",
      isPublic: false,
      tags: ["data-science", "analytics", "ml", "visualization"]
    }
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort agents
  const filteredAgents = agents
    .filter(agent => {
      const matchesTab = activeTab === "all" || agent.type === activeTab
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = filterCategory === "all" || agent.category === filterCategory
      return matchesTab && matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let aValue: any, bValue: any
      switch (sortBy) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "created":
          aValue = new Date(a.created)
          bValue = new Date(b.created)
          break
        case "usage":
          aValue = a.usage.totalConversations
          bValue = b.usage.totalConversations
          break
        case "rating":
          aValue = a.usage.averageRating
          bValue = b.usage.averageRating
          break
        default:
          return 0
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const createdAgents = agents.filter(agent => agent.type === "created")
  const purchasedAgents = agents.filter(agent => agent.type === "purchased")
  const activeAgents = agents.filter(agent => agent.status === "active")

  const totalConversations = agents.reduce((sum, agent) => sum + agent.usage.totalConversations, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "inactive": return "bg-white/10 text-[#9ca3af] border-white/20"
      case "training": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-white/10 text-[#9ca3af] border-white/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-3 w-3" />
      case "inactive": return <Pause className="h-3 w-3" />
      case "training": return <RefreshCw className="h-3 w-3 animate-spin" />
      case "error": return <AlertCircle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          status: agent.status === "active" ? "inactive" : "active" as any
        }
      }
      return agent
    }))
  }

  const deleteAgent = (agentId: string) => {
    if (confirm("Are you sure you want to delete this agent? This action cannot be undone.")) {
      setAgents(prev => prev.filter(agent => agent.id !== agentId))
    }
  }

  const duplicateAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (agent) {
      const newAgent: Agent = {
        ...agent,
        id: `agent-${Date.now()}`,
        name: `${agent.name} (Copy)`,
        created: new Date().toISOString().split('T')[0],
        usage: {
          totalConversations: 0,
          lastUsed: "Never",
          averageRating: 0,
          totalRatings: 0
        },
        version: agent.version
      }
      setAgents(prev => [...prev, newAgent])
    }
  }

  const categories = ["all", ...Array.from(new Set(agents.map(agent => agent.category)))]

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0d0e11]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#e6ebf4]">Loading Your Agents</h3>
            <p className="text-[#9ca3af]">Fetching your AI assistants...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#0d0e11] overflow-hidden">
      {/* Enhanced Header */}
      <div className="p-8 border-b border-white/10 flex-shrink-0 bg-[#0d0e11]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#e6ebf4] mb-2">My Agents</h1>
              <p className="text-[#9ca3af] text-lg">Manage and monitor your AI assistant collection</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => window.location.href = "/agent-builder"}
              className="bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] hover:from-[#6b46c1] hover:to-[#059669] text-white shadow-lg border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Agent
            </Button>
            <Button 
              onClick={() => window.location.href = "/marketplace"}
              variant="outline" 
              className="border-white/20 text-[#e6ebf4] hover:bg-white/5 hover:border-white/30"
            >
              <Package className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Button>
          </div>
        </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-[#9ca3af]">Total Agents</p>
                   <p className="text-2xl font-bold text-[#e6ebf4]">{agents.length}</p>
                 </div>
                 <Bot className="h-8 w-8 text-[#7f5af0]" />
               </div>
             </CardContent>
           </Card>
           <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-[#9ca3af]">Active Agents</p>
                   <p className="text-2xl font-bold text-[#e6ebf4]">{activeAgents.length}</p>
                 </div>
                 <Activity className="h-8 w-8 text-[#2cb67d]" />
               </div>
             </CardContent>
           </Card>
           <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-[#9ca3af]">Total Conversations</p>
                   <p className="text-2xl font-bold text-[#e6ebf4]">{totalConversations.toLocaleString()}</p>
                 </div>
                 <MessageSquare className="h-8 w-8 text-[#7f5af0]" />
               </div>
             </CardContent>
           </Card>
         </div>

        {/* Enhanced Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 bg-white/5 rounded-lg p-1 border border-white/10">
            {[
              { id: "all", label: "All Agents", count: agents.length },
              { id: "created", label: "Created", count: createdAgents.length },
              { id: "purchased", label: "Purchased", count: purchasedAgents.length }
            ].map((tab) => (
          <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-white shadow-lg"
                : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
            }`}
          >
                <span className="font-medium">{tab.label}</span>
                <Badge variant="outline" className={`text-xs ${
                  activeTab === tab.id 
                    ? "bg-white/20 border-white/30 text-white" 
                    : "bg-white/10 border-white/20 text-[#9ca3af]"
                }`}>
                  {tab.count}
                </Badge>
          </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-white/20 text-[#e6ebf4] hover:bg-white/5"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1 border border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`p-2 text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5 ${viewMode === "grid" ? "bg-white/10 text-[#e6ebf4]" : ""}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`p-2 text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5 ${viewMode === "list" ? "bg-white/10 text-[#e6ebf4]" : ""}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6 bg-[#0d0e11]">
          {/* Search and Filter Bar */}
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                <Input
                  placeholder="Search agents by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-[#e6ebf4] placeholder-[#9ca3af] focus:border-[#7f5af0] focus:ring-[#7f5af0]"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-[#e6ebf4] focus:border-[#7f5af0] focus:ring-[#7f5af0]"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== "all").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-[#e6ebf4] focus:border-[#7f5af0] focus:ring-[#7f5af0]"
              >
                <option value="name">Sort by Name</option>
                <option value="created">Sort by Date</option>
                <option value="usage">Sort by Usage</option>
                <option value="rating">Sort by Rating</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="border-white/20 text-[#e6ebf4] hover:bg-white/5"
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Agents Grid */}
          <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        {agent.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-[#e6ebf4] group-hover:text-white transition-colors">{agent.name}</h3>
                          {agent.type === "created" && (
                            <Badge variant="outline" className="bg-[#7f5af0]/20 text-[#7f5af0] border-[#7f5af0]/30 text-xs">
                              Public
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                            {getStatusIcon(agent.status)}
                            <span className="ml-1 capitalize">{agent.status}</span>
                          </span>
                          <Badge variant="outline" className="text-xs border-white/20 text-[#9ca3af]">
                            {agent.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Conversations</span>
                      <span className="font-medium text-[#e6ebf4]">{agent.usage.totalConversations.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-[#e6ebf4]">{agent.usage.averageRating}</span>
                        <span className="text-[#9ca3af]">({agent.usage.totalRatings})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Last Used</span>
                      <span className="font-medium text-[#e6ebf4]">{agent.usage.lastUsed}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">Version</span>
                      <span className="font-medium text-[#e6ebf4]">{agent.version}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4 border-t border-white/10 mt-4">
                    {agent.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAgentStatus(agent.id)}
                        className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAgentStatus(agent.id)}
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Activate
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-[#9ca3af] hover:bg-white/5 hover:text-[#e6ebf4]"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Settings
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => duplicateAgent(agent.id)}
                      className="border-white/20 text-[#9ca3af] hover:bg-white/5 hover:text-[#e6ebf4]"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteAgent(agent.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
            </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
