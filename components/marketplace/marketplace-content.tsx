"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Search, Filter, Grid3X3, List, ChevronDown, Star, TrendingUp, Sparkles, Zap, Brain, Rocket, Users, Target, Bot, Award, Clock, Download, Flame, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AgentCard from "@/components/marketplace/agent-card"
import AgentDetailModal from "@/components/marketplace/agent-detail-modal"
import FilterSidebar from "@/components/marketplace/filter-sidebar"
import FilterDrawer from "@/components/marketplace/filter-drawer"
import { mockAgents, type Agent, type AgentFilters } from "@/lib/marketplace-data"

interface MarketplaceContentProps {
  activeSubsection: string
  onSubsectionChange: (subsection: string) => void
}

export default function MarketplaceContent({ activeSubsection, onSubsectionChange }: MarketplaceContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortMode, setSortMode] = useState<"popular" | "newest" | "rating">("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<AgentFilters>({
    categories: [],
    price: [],
    monetization: [],
    rating: 0,
    compatibility: [],
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get subsection-specific agents
  const getSubsectionAgents = (subsection: string) => {
    switch (subsection) {
      case "featured":
        return mockAgents.filter((agent) => agent.featured)
      case "top-rated":
        return mockAgents.filter((agent) => agent.rating >= 4.5).sort((a, b) => b.rating - a.rating)
      case "new-agents":
        return mockAgents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8)
      case "all-agents":
      default:
        return mockAgents
    }
  }

  // Filter and sort agents based on active subsection
  const filteredAgents = useMemo(() => {
    const baseAgents = getSubsectionAgents(activeSubsection)

    const filtered = baseAgents.filter((agent) => {
      // Search filter
      if (
        searchQuery &&
        !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !agent.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(agent.category)) {
        return false
      }

      // Price filter
      if (filters.price.length > 0) {
        const isFree = agent.pricing.type === "free"
        const isPaid = agent.pricing.type !== "free"
        if (filters.price.includes("free") && !isFree) return false
        if (filters.price.includes("paid") && !isPaid) return false
        if (filters.price.length === 1 && filters.price[0] === "free" && !isFree) return false
        if (filters.price.length === 1 && filters.price[0] === "paid" && !isPaid) return false
      }

      // Monetization filter
      if (filters.monetization.length > 0 && !filters.monetization.includes(agent.pricing.model)) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && agent.rating < filters.rating) {
        return false
      }

      return true
    })

    // Sort (unless it's a pre-sorted subsection)
    if (activeSubsection !== "top-rated" && activeSubsection !== "new-agents") {
      switch (sortMode) {
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "popular":
        default:
          filtered.sort((a, b) => b.downloads - a.downloads)
          break
      }
    }

    return filtered
  }, [searchQuery, filters, sortMode, activeSubsection])

  const handleFilterChange = (newFilters: Partial<AgentFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      price: [],
      monetization: [],
      rating: 0,
      compatibility: [],
    })
    setSearchQuery("")
  }

  const activeFilterCount = Object.values(filters).flat().filter(Boolean).length + (searchQuery ? 1 : 0)

  const getSubsectionTitle = () => {
    switch (activeSubsection) {
      case "featured":
        return "Featured Agents"
      case "top-rated":
        return "Top Rated Agents"
      case "new-agents":
        return "New Agents"
      case "all-agents":
        return "All Agents"
      default:
        return "AI Agent Marketplace"
    }
  }

  const getSubsectionDescription = () => {
    switch (activeSubsection) {
      case "featured":
        return "Hand-picked agents that showcase the best of AI capabilities"
      case "top-rated":
        return "Highest rated agents by our community of founders and creators"
      case "new-agents":
        return "Latest AI agents added to help boost your productivity"
      case "all-agents":
        return "Browse our complete collection of AI-powered productivity agents"
      default:
        return "Discover and deploy AI agents for your startup workflow"
    }
  }

  const getSubsectionIcon = () => {
    switch (activeSubsection) {
      case "featured":
        return <Award className="h-7 w-7 text-[#facc15]" />
      case "top-rated":
        return <TrendingUp className="h-7 w-7 text-[#10b981]" />
      case "new-agents":
        return <Sparkles className="h-7 w-7 text-[#7f5af0]" />
      case "all-agents":
        return <Grid3X3 className="h-7 w-7 text-[#9ca3af]" />
      default:
        return null
    }
  }

  // Get stats for the current subsection
  const getSubsectionStats = () => {
    const agents = getSubsectionAgents(activeSubsection)
    const totalDownloads = agents.reduce((sum, agent) => sum + agent.downloads, 0)
    const avgRating = agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length
    
    return {
      count: agents.length,
      totalDownloads,
      avgRating: Math.round(avgRating * 10) / 10
    }
  }

  const stats = getSubsectionStats()

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0d0e11] via-[#0f1015] to-[#0d0e11]">
      {/* Enhanced Header */}
      <div className="relative p-8 border-b border-white/10 flex-shrink-0 bg-gradient-to-br from-[#7f5af0]/5 via-transparent to-[#10b981]/5">
        <div className="relative z-10">
          {/* Title Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7f5af0] to-[#10b981] rounded-2xl shadow-lg">
                {getSubsectionIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#e6ebf4] to-[#c5ccd6] bg-clip-text text-transparent mb-2">
                  {getSubsectionTitle()}
                </h1>
                <p className="text-[#9ca3af] text-lg leading-relaxed max-w-2xl">
                  {getSubsectionDescription()}
                </p>
                
                {/* Stats */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Bot className="h-4 w-4 text-[#7f5af0]" />
                    <span className="text-[#9ca3af]">{stats.count} agents</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Download className="h-4 w-4 text-[#10b981]" />
                    <span className="text-[#9ca3af]">{stats.totalDownloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-[#facc15] fill-current" />
                    <span className="text-[#9ca3af]">{stats.avgRating} avg rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-[#7f5af0]/30 text-[#7f5af0] hover:bg-[#7f5af0]/10 hover:border-[#7f5af0]/50"
              >
                <Heart className="h-4 w-4 mr-2" />
                My Wishlist
              </Button>
              <Button className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white shadow-lg">
                <Rocket className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation Tabs */}
          <div className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            {[
              { id: "featured", label: "Featured", icon: Award, color: "text-[#facc15]" },
              { id: "top-rated", label: "Top Rated", icon: TrendingUp, color: "text-[#10b981]" },
              { id: "new-agents", label: "New", icon: Sparkles, color: "text-[#7f5af0]" },
              { id: "all-agents", label: "All Agents", icon: Grid3X3, color: "text-[#9ca3af]" },
            ].map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeSubsection === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onSubsectionChange(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-[#7f5af0] to-[#10b981] text-white shadow-lg transform scale-105"
                      : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10"
                  }`}
                >
                  <TabIcon className={`h-5 w-5 ${isActive ? 'text-white' : tab.color}`} />
                  <span>{tab.label}</span>
                  {tab.id === "featured" && (
                    <Badge className="bg-[#facc15]/20 text-[#facc15] text-xs px-2 py-0.5">
                      <Flame className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>

          {/* Enhanced Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Advanced Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agents by name, description, or capability..."
                  className="pl-12 pr-4 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-[#e6ebf4] placeholder:text-[#9ca3af] focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/20 rounded-xl text-lg"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#e6ebf4] h-8 w-8 p-0"
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as any)}
                  className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-[#e6ebf4] px-4 py-3 pr-10 rounded-xl focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/20 min-w-[140px]"
                  disabled={activeSubsection === "top-rated" || activeSubsection === "new-agents"}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9ca3af] pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "grid" ? "bg-gradient-to-r from-[#7f5af0] to-[#10b981] text-white shadow-md" : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "list" ? "bg-gradient-to-r from-[#7f5af0] to-[#10b981] text-white shadow-md" : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 text-[#e6ebf4] hover:bg-white/10 px-4 py-3 rounded-xl relative backdrop-blur-sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-gradient-to-r from-[#7f5af0] to-[#10b981] text-white text-xs min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-3 mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="flex items-center text-sm text-[#9ca3af] mr-2">
                <Target className="h-4 w-4 mr-2" />
                Active filters:
              </div>
              {searchQuery && (
                <Badge className="bg-gradient-to-r from-[#7f5af0]/20 to-[#10b981]/20 text-[#7f5af0] border border-[#7f5af0]/30 px-3 py-1">
                  <Search className="h-3 w-3 mr-1" />
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-[#7f5af0]/80 font-bold">
                    ×
                  </button>
                </Badge>
              )}
              {filters.categories.map((cat) => (
                <Badge key={cat} className="bg-gradient-to-r from-[#10b981]/20 to-[#7f5af0]/20 text-[#10b981] border border-[#10b981]/30 px-3 py-1">
                  <Bot className="h-3 w-3 mr-1" />
                  {cat}
                  <button
                    onClick={() => handleFilterChange({ categories: filters.categories.filter((c) => c !== cat) })}
                    className="ml-2 hover:text-[#10b981]/80 font-bold"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-[#9ca3af] hover:text-[#e6ebf4] h-8 px-3 text-sm rounded-lg"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content Region */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filter Sidebar (Desktop) */}
        {showFilters && (
          <div className="hidden lg:block w-72 flex-shrink-0 border-r border-white/10 bg-gradient-to-b from-white/2 to-transparent">
            <FilterSidebar filters={filters} onFiltersChange={handleFilterChange} onClearFilters={clearFilters} />
          </div>
        )}

        {/* Results Region */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                {isLoading ? (
                  <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
                ) : (
                  <>
                    <div className="text-[#e6ebf4] font-medium">
                      <span className="text-2xl font-bold text-[#7f5af0]">{filteredAgents.length}</span> agents found
                    </div>
                    {filteredAgents.length > 0 && (
                      <div className="text-[#9ca3af] text-sm">
                        • Showing {viewMode === "grid" ? "grid" : "list"} view
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {!isLoading && filteredAgents.length > 0 && (
                <div className="text-sm text-[#9ca3af]">
                  Updated <Clock className="h-4 w-4 inline mx-1" /> just now
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 animate-pulse overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl" />
                          <div className="flex-1 space-y-2">
                            <div className="h-5 bg-white/10 rounded w-3/4" />
                            <div className="h-4 bg-white/10 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-white/10 rounded" />
                          <div className="h-4 bg-white/10 rounded w-5/6" />
                          <div className="h-4 bg-white/10 rounded w-4/6" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="h-6 bg-white/10 rounded w-20" />
                          <div className="h-10 bg-white/10 rounded w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Results Grid/List */}
            {!isLoading && filteredAgents.length > 0 && (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} viewMode={viewMode} onView={() => setSelectedAgent(agent)} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredAgents.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-[#7f5af0]/20 to-[#10b981]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Search className="h-16 w-16 text-[#9ca3af]" />
                </div>
                <h3 className="text-2xl font-bold text-[#e6ebf4] mb-4">No agents found</h3>
                <p className="text-[#9ca3af] mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Try adjusting your search terms or filters to discover the perfect AI agent for your workflow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={clearFilters} className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white px-8 py-3">
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                  <Button variant="outline" className="border-white/20 text-[#e6ebf4] hover:bg-white/10 px-8 py-3">
                    <Bot className="h-4 w-4 mr-2" />
                    Browse all agents
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Drawer (Mobile) */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} isOpen={!!selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  )
} 