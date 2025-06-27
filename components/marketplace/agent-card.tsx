"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, MoreVertical, Download, Eye, Bot, Zap, Clock, Users, Award, TrendingUp, ChevronRight, Sparkles } from "lucide-react"
import type { Agent } from "@/lib/marketplace-data"

interface AgentCardProps {
  agent: Agent
  viewMode: "grid" | "list"
  onView: () => void
}

export default function AgentCard({ agent, viewMode, onView }: AgentCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getPriceDisplay = () => {
    switch (agent.pricing.type) {
      case "free":
        return "Free"
      case "subscription":
        return `$${agent.pricing.amount}/mo`
      case "pay-per-use":
        return `$${agent.pricing.amount}/query`
      case "perpetual":
        return `$${agent.pricing.amount}`
      default:
        return "Free"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Productivity: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/40",
      "Content Generation": "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/40",
      "Customer Support": "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border-green-500/40",
      Finance: "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/40",
      IoT: "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border-red-500/40",
      Analytics: "bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-300 border-indigo-500/40",
    }
    return colors[category as keyof typeof colors] || "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/40"
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      Productivity: Bot,
      "Content Generation": Sparkles,
      "Customer Support": Users,
      Finance: TrendingUp,
      IoT: Zap,
      Analytics: Award,
    }
    return icons[category as keyof typeof icons] || Bot
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  if (viewMode === "list") {
    return (
      <Card 
        className="group bg-gradient-to-r from-white/5 to-white/10 border-white/10 hover:border-[#7f5af0]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7f5af0]/10 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            {/* Enhanced Avatar */}
            <div className="relative">
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 bg-gradient-to-br shadow-lg"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, hsl(${(agent.id * 137.5) % 360}, 70%, 50%), hsl(${(agent.id * 137.5 + 30) % 360}, 70%, 60%))` 
                }}
            >
              {agent.name.charAt(0)}
              </div>
              {agent.featured && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#facc15] to-[#f59e0b] rounded-full flex items-center justify-center">
                  <Award className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Title and Creator */}
                  <div>
                    <h3 className="text-xl font-bold text-[#e6ebf4] truncate group-hover:text-[#7f5af0] transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[#9ca3af] text-sm">by {agent.creator}</p>
                  </div>

                  {/* Description */}
                  <p className="text-[#b8c5d1] line-clamp-2 leading-relaxed">{agent.description}</p>

                  {/* Stats and Meta */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#9ca3af] font-medium">
                        {agent.rating} ({agent.reviewCount.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[#9ca3af]">
                      <Download className="h-4 w-4 text-[#10b981]" />
                      <span>{agent.downloads.toLocaleString()} downloads</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[#9ca3af]">
                      <Clock className="h-4 w-4" />
                      <span>{formatTimeAgo(agent.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(agent.category)} variant="outline">
                      {(() => {
                        const IconComponent = getCategoryIcon(agent.category);
                        return <IconComponent className="h-3 w-3 mr-1" />;
                      })()}
                      {agent.category}
                    </Badge>
                    {agent.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-white/10 text-[#9ca3af] hover:bg-white/20 transition-colors text-xs px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                    {agent.tags.length > 2 && (
                      <Badge className="bg-white/5 text-[#9ca3af] text-xs px-2 py-1">
                        +{agent.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 ml-6">
                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#e6ebf4] mb-1">{getPriceDisplay()}</div>
                    {agent.pricing.type !== "free" && (
                      <div className="text-xs text-[#9ca3af] capitalize">{agent.pricing.model}</div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onView}
                      className="border-white/20 text-[#e6ebf4] hover:bg-[#7f5af0]/10 hover:border-[#7f5af0]/50 hover:text-[#7f5af0] transition-all group"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      {agent.pricing.type === "free" ? "Add to Sidebar" : "Deploy Agent"}
                    </Button>
                  </div>

                  {/* Wishlist */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 text-[#9ca3af] hover:text-red-400 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-400" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="group bg-gradient-to-br from-white/5 via-white/10 to-white/5 border-white/10 hover:border-[#7f5af0]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7f5af0]/20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
          <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 bg-gradient-to-br shadow-lg"
              style={{ 
                backgroundImage: `linear-gradient(135deg, hsl(${(agent.id * 137.5) % 360}, 70%, 50%), hsl(${(agent.id * 137.5 + 30) % 360}, 70%, 60%))` 
              }}
          >
            {agent.name.charAt(0)}
            </div>
            {agent.featured && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#facc15] to-[#f59e0b] rounded-full flex items-center justify-center animate-pulse">
                <Award className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 h-9 w-9 text-[#9ca3af] hover:text-red-400 hover:bg-red-400/10 transition-colors rounded-lg"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-400" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 h-9 w-9 text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 transition-colors rounded-lg"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title & Creator */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#e6ebf4] line-clamp-1 mb-2 group-hover:text-[#7f5af0] transition-colors">
            {agent.name}
          </h3>
          <p className="text-sm text-[#9ca3af]">by <span className="text-[#b8c5d1] font-medium">{agent.creator}</span></p>
        </div>

        {/* Description */}
        <p className="text-sm text-[#b8c5d1] line-clamp-3 mb-4 flex-1 leading-relaxed">{agent.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getCategoryColor(agent.category)} variant="outline">
            {(() => {
              const IconComponent = getCategoryIcon(agent.category);
              return <IconComponent className="h-3 w-3 mr-1" />;
            })()}
            {agent.category}
          </Badge>
          {agent.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} className="bg-white/10 text-[#9ca3af] hover:bg-white/20 transition-colors text-xs">
              {tag}
            </Badge>
          ))}
          {agent.tags.length > 1 && (
            <Badge className="bg-white/5 text-[#9ca3af] text-xs">
              +{agent.tags.length - 1}
            </Badge>
          )}
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
              />
            ))}
          </div>
            <span className="text-[#9ca3af] font-medium">{agent.rating}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-[#9ca3af]">
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3 text-[#10b981]" />
              <span>{agent.downloads > 1000 ? `${(agent.downloads / 1000).toFixed(1)}k` : agent.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{agent.reviewCount}</span>
            </div>
          </div>
        </div>

        {/* Updated time */}
        <div className="flex items-center text-xs text-[#9ca3af] mb-4">
          <Clock className="h-3 w-3 mr-1" />
          <span>Updated {formatTimeAgo(agent.updatedAt)}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="text-lg font-bold text-[#e6ebf4]">{getPriceDisplay()}</div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="border-white/20 text-[#e6ebf4] hover:bg-[#7f5af0]/10 hover:border-[#7f5af0]/50 hover:text-[#7f5af0] transition-all group"
            >
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {agent.pricing.type === "free" ? "Add" : "Deploy"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
