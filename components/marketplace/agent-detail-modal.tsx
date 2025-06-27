"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  X,
  Star,
  Download,
  Heart,
  Share,
  ExternalLink,
  Check,
  MessageSquare,
  Calendar,
  User,
  Shield,
  Zap,
  Play,
  Settings,
  Bot,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Activity,
  Globe,
  Code,
  Database,
} from "lucide-react"
import type { Agent } from "@/lib/marketplace-data"

interface AgentDetailModalProps {
  agent: Agent
  isOpen: boolean
  onClose: () => void
}

export default function AgentDetailModal({ agent, isOpen, onClose }: AgentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "pricing" | "reviews" | "changelog">("overview")
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!isOpen) return null

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

  const mockFeatures = [
    { name: "Advanced Natural Language Processing", description: "State-of-the-art NLP capabilities for human-like interactions", available: true },
    { name: "Real-time Response Generation", description: "Instant responses with low latency processing", available: true },
    { name: "Multi-language Support", description: "Supports 50+ languages for global deployment", available: true },
    { name: "Custom Workflow Integration", description: "Seamlessly integrates with your existing tools", available: true },
    { name: "Enterprise-grade Security", description: "SOC 2 compliant with end-to-end encryption", available: true },
    { name: "24/7 Availability", description: "Always online, never sleeps", available: true },
    { name: "Memory & Context Retention", description: "Remembers conversation history and context", available: agent.pricing.type !== "free" },
    { name: "Priority Support", description: "Dedicated support channel with faster response times", available: agent.pricing.type !== "free" },
  ]

  const mockReviews = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent productivity boost!",
      content: "This agent has completely transformed how I manage my daily tasks. The AI suggestions are spot-on and save me hours every week.",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "MR",
      rating: 4,
      date: "2024-01-10",
      title: "Great value for money",
      content: "Really impressed with the quality of outputs. Minor issues with complex queries but overall very satisfied with the performance.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      user: "Emma Thompson",
      avatar: "ET",
      rating: 5,
      date: "2024-01-08",
      title: "Game changer for content creation",
      content: "The content generation capabilities are incredible. Has helped me scale my content production 3x while maintaining quality.",
      helpful: 15,
      verified: false,
    },
  ]

  const mockChangelog = [
    {
      version: "v2.1.0",
      date: "2024-01-20",
      type: "major",
      changes: [
        "Added support for GPT-4 Turbo integration",
        "Improved response accuracy by 15%",
        "New batch processing feature for bulk operations",
        "Enhanced memory management and context retention",
        "Bug fixes and performance improvements",
      ],
    },
    {
      version: "v2.0.0",
      date: "2024-01-01",
      type: "major",
      changes: [
        "Complete UI redesign with modern interface",
        "Added Claude 3.5 Sonnet support",
        "New workflow templates library",
        "Enhanced security features and compliance",
        "Improved API rate limiting and error handling",
      ],
    },
    {
      version: "v1.9.2",
      date: "2023-12-15",
      type: "patch",
      changes: [
        "Fixed memory leak in conversation handling",
        "Improved response time by 20%",
        "Updated documentation and examples",
      ],
    },
  ]

  const IconComponent = getCategoryIcon(agent.category)

  return (
    <>
      {/* Enhanced Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-12 bg-gradient-to-br from-[#0d0e11] via-[#1a1d23] to-[#0d0e11] rounded-2xl shadow-2xl z-50 flex flex-col border border-white/20 overflow-hidden">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-[#7f5af0]/10 via-transparent to-[#10b981]/10 border-b border-white/10">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
          </div>

          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl bg-gradient-to-br"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, hsl(${(agent.id * 137.5) % 360}, 70%, 50%), hsl(${(agent.id * 137.5 + 30) % 360}, 70%, 60%))` 
                    }}
                  >
                    {agent.name.charAt(0)}
                  </div>
                  {agent.featured && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#facc15] to-[#f59e0b] rounded-full flex items-center justify-center animate-pulse">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e6ebf4] to-[#c5ccd6] bg-clip-text text-transparent mb-2">
                    {agent.name}
                  </h2>
                  <p className="text-[#9ca3af] text-lg mb-3">by <span className="text-[#b8c5d1] font-medium">{agent.creator}</span></p>
                  
                  {/* Enhanced Stats */}
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#e6ebf4] font-bold text-lg">
                        {agent.rating}
                      </span>
                      <span className="text-[#9ca3af]">
                        ({agent.reviewCount.toLocaleString()} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#9ca3af]">
                      <Download className="h-5 w-5 text-[#10b981]" />
                      <span className="font-medium">{agent.downloads.toLocaleString()} downloads</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#9ca3af]">
                      <Clock className="h-5 w-5" />
                      <span>Updated {new Date(agent.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-xl transition-all ${
                    isWishlisted 
                      ? "text-red-400 bg-red-400/10 border border-red-400/30" 
                      : "text-[#9ca3af] hover:text-red-400 hover:bg-red-400/10"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 rounded-xl"
                >
                  <Share className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-3 text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Enhanced Tabs */}
            <div className="flex border-b border-white/10 px-8 bg-white/2">
              {[
                { id: "overview", label: "Overview", icon: Activity },
                { id: "features", label: "Features", icon: Zap },
                { id: "pricing", label: "Pricing", icon: TrendingUp },
                { id: "reviews", label: "Reviews", icon: MessageSquare },
                { id: "changelog", label: "Changelog", icon: Clock },
              ].map((tab) => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? "border-[#7f5af0] text-[#7f5af0] bg-[#7f5af0]/5"
                        : "border-transparent text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === "overview" && (
                <div className="space-y-8 max-w-4xl">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-[#e6ebf4] mb-4 flex items-center">
                      <MessageSquare className="h-6 w-6 mr-3 text-[#7f5af0]" />
                      Description
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <p className="text-[#b8c5d1] leading-relaxed text-lg mb-4">{agent.description}</p>
                      <p className="text-[#9ca3af] leading-relaxed">
                        This advanced AI agent leverages cutting-edge natural language processing to deliver exceptional
                        results across various use cases. Built with enterprise-grade security and scalability in mind, it 
                        integrates seamlessly with your existing workflow tools and platforms.
                      </p>
                    </div>
                  </div>

                  {/* Category and Tags */}
                  <div>
                    <h3 className="text-xl font-bold text-[#e6ebf4] mb-4 flex items-center">
                      <Bot className="h-6 w-6 mr-3 text-[#10b981]" />
                      Category & Tags
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-gradient-to-r from-[#7f5af0]/20 to-[#10b981]/20 text-[#7f5af0] border border-[#7f5af0]/30 px-4 py-2 text-sm">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {agent.category}
                        </Badge>
                        {agent.tags.map((tag) => (
                          <Badge key={tag} className="bg-white/10 text-[#9ca3af] hover:bg-white/20 transition-colors px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility */}
                  <div>
                    <h3 className="text-xl font-bold text-[#e6ebf4] mb-4 flex items-center">
                      <Globe className="h-6 w-6 mr-3 text-[#facc15]" />
                      Compatibility & Integrations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-semibold text-[#e6ebf4] mb-3 flex items-center">
                          <Code className="h-5 w-5 mr-2 text-[#7f5af0]" />
                          Supported LLMs
                        </h4>
                        <div className="space-y-2">
                          {["OpenAI GPT-4", "Claude 3.5 Sonnet", "Google Gemini Pro", "Local Models"].map((llm) => (
                            <div key={llm} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-[#10b981]" />
                              <span className="text-[#b8c5d1]">{llm}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-semibold text-[#e6ebf4] mb-3 flex items-center">
                          <Database className="h-5 w-5 mr-2 text-[#10b981]" />
                          Platform Integrations
                        </h4>
                        <div className="space-y-2">
                          {["Slack", "Discord", "Zapier", "Google Workspace", "Microsoft Teams", "Notion"].map((integration) => (
                            <div key={integration} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-[#10b981]" />
                              <span className="text-[#b8c5d1]">{integration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demo Button */}
                  <div className="bg-gradient-to-r from-[#7f5af0]/10 to-[#10b981]/10 rounded-xl p-6 border border-[#7f5af0]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-[#e6ebf4] mb-2">Try it out!</h4>
                        <p className="text-[#9ca3af]">Experience the agent in action with our interactive demo</p>
                      </div>
                      <Button 
                        onClick={() => setShowDemo(true)}
                        className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white px-6 py-3"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Launch Demo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-6 max-w-4xl">
                  <h3 className="text-2xl font-bold text-[#e6ebf4] mb-6 flex items-center">
                    <Zap className="h-7 w-7 mr-3 text-[#facc15]" />
                    Features & Capabilities
                  </h3>
                  <div className="grid gap-4">
                    {mockFeatures.map((feature, index) => (
                      <div key={index} className={`p-6 rounded-xl border transition-all ${
                        feature.available 
                          ? "bg-white/5 border-white/10 hover:bg-white/10" 
                          : "bg-white/2 border-white/5 opacity-60"
                      }`}>
                        <div className="flex items-start space-x-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.available 
                              ? "bg-[#10b981] text-white" 
                              : "bg-gray-600 text-gray-400"
                          }`}>
                            {feature.available ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-lg font-semibold mb-2 ${
                              feature.available ? "text-[#e6ebf4]" : "text-[#9ca3af]"
                            }`}>
                              {feature.name}
                              {!feature.available && (
                                <Badge className="ml-2 bg-[#facc15]/20 text-[#facc15] text-xs">
                                  Pro Only
                                </Badge>
                              )}
                            </h4>
                            <p className="text-[#9ca3af] leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add other tab content here... */}
              {activeTab === "pricing" && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-2xl font-bold text-[#e6ebf4] mb-6">Pricing Information</h3>
                  <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-[#e6ebf4] mb-2">{getPriceDisplay()}</div>
                      {agent.pricing.type !== "free" && (
                        <div className="text-[#9ca3af] capitalize">{agent.pricing.model} billing</div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <Button className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white px-8 py-3 text-lg">
                          {agent.pricing.type === "free" ? "Add to Sidebar" : "Deploy Agent"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 max-w-4xl">
                  <h3 className="text-2xl font-bold text-[#e6ebf4] mb-6">User Reviews</h3>
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#7f5af0] to-[#10b981] rounded-full flex items-center justify-center text-white font-bold">
                            {review.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-lg font-semibold text-[#e6ebf4] flex items-center">
                                  {review.user}
                                  {review.verified && (
                                    <Badge className="ml-2 bg-[#10b981]/20 text-[#10b981] text-xs">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-[#9ca3af]">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <h5 className="text-[#e6ebf4] font-medium mb-2">{review.title}</h5>
                            <p className="text-[#b8c5d1] leading-relaxed mb-3">{review.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-[#9ca3af]">
                              <button className="flex items-center space-x-1 hover:text-[#e6ebf4] transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                <span>Reply</span>
                              </button>
                              <span>•</span>
                              <span>{review.helpful} found this helpful</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "changelog" && (
                <div className="space-y-6 max-w-4xl">
                  <h3 className="text-2xl font-bold text-[#e6ebf4] mb-6">Version History</h3>
                  <div className="space-y-6">
                    {mockChangelog.map((version, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Badge className={`${
                              version.type === "major" 
                                ? "bg-[#10b981]/20 text-[#10b981]" 
                                : "bg-[#facc15]/20 text-[#facc15]"
                            }`}>
                              {version.version}
                            </Badge>
                            <span className="text-[#9ca3af]">{new Date(version.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {version.changes.map((change, changeIndex) => (
                            <div key={changeIndex} className="flex items-start space-x-2">
                              <ChevronRight className="h-4 w-4 text-[#7f5af0] mt-0.5 flex-shrink-0" />
                              <span className="text-[#b8c5d1]">{change}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-white/10 bg-white/2 p-6 space-y-6">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-[#7f5af0]/10 to-[#10b981]/10 rounded-xl p-6 border border-[#7f5af0]/20">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[#e6ebf4] mb-1">{getPriceDisplay()}</div>
                {agent.pricing.type !== "free" && (
                  <div className="text-sm text-[#9ca3af] capitalize">{agent.pricing.model}</div>
                )}
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/90 hover:to-[#10b981]/90 text-white py-3">
                  {agent.pricing.type === "free" ? "Add to Sidebar" : "Deploy Agent"}
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-[#e6ebf4] hover:bg-white/10">
                  <Play className="h-4 w-4 mr-2" />
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#e6ebf4]">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-[#9ca3af]">Downloads</span>
                  <span className="text-[#e6ebf4] font-medium">{agent.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-[#9ca3af]">Rating</span>
                  <span className="text-[#e6ebf4] font-medium">{agent.rating}/5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-[#9ca3af]">Reviews</span>
                  <span className="text-[#e6ebf4] font-medium">{agent.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-[#9ca3af]">Last Updated</span>
                  <span className="text-[#e6ebf4] font-medium">{new Date(agent.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-lg font-semibold text-[#e6ebf4] mb-3">Need Help?</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-[#9ca3af] hover:text-[#e6ebf4]">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-[#9ca3af] hover:text-[#e6ebf4]">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Chat Window */}
      {showDemo && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-[#0d0e11] border border-white/10 rounded-lg shadow-2xl z-60 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center">
                <MessageSquare className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-[#e6ebf4]">Demo Chat</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDemo(false)}
              className="p-1 text-[#9ca3af] hover:text-[#e6ebf4]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-[#e6ebf4]">👋 Hi! I'm the {agent.name} demo. Ask me anything!</p>
              </div>
              <div className="bg-[#7f5af0]/20 rounded-lg p-3 ml-8">
                <p className="text-sm text-[#e6ebf4]">What can you help me with?</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-[#e6ebf4]">
                  I can help you with {agent.category.toLowerCase()} tasks. Try asking me to generate content, analyze
                  data, or automate workflows!
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-[#e6ebf4] placeholder:text-[#9ca3af] focus:border-[#7f5af0] focus:outline-none"
              />
              <Button size="sm" className="bg-[#7f5af0] hover:bg-[#7f5af0]/80 text-white">
                Send
              </Button>
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">Demo limited to 5 queries</p>
          </div>
        </div>
      )}
    </>
  )
}
