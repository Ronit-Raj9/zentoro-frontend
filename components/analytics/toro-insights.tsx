"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle,
  Clock,
  MessageSquare,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  Award,
  RefreshCw
} from "lucide-react"

interface Insight {
  id: string
  type: "success" | "warning" | "recommendation" | "pattern" | "celebration"
  title: string
  message: string
  confidence: number
  actionable: boolean
  action?: {
    label: string
    handler: () => void
  }
  timestamp: string
  category: string
}

interface ToroInsightsProps {
  fullScreen?: boolean
}

export default function ToroInsights({ fullScreen = false }: ToroInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock insights data - in real app, this would come from AI analysis
  const mockInsights: Insight[] = [
    {
      id: "1",
      type: "celebration",
      title: "Excellent Progress This Week! 🎉",
      message: "You've completed 47 tasks this week, which is 23% above your usual pace. The completion of the User Authentication goal was particularly well-executed, finishing 2 days ahead of schedule.",
      confidence: 95,
      actionable: false,
      timestamp: "2 minutes ago",
      category: "Performance"
    },
    {
      id: "2",
      type: "pattern",
      title: "Peak Productivity Pattern Detected",
      message: "I've noticed you're most productive on Tuesday and Thursday mornings between 9 AM and 12 PM. Your task completion rate is 40% higher during these periods. Consider scheduling your most important work during these windows.",
      confidence: 88,
      actionable: true,
      action: {
        label: "Schedule Focus Time",
        handler: () => console.log("Schedule focus time")
      },
      timestamp: "15 minutes ago",
      category: "Productivity"
    },
    {
      id: "3",
      type: "warning",
      title: "Marketing Tasks Showing Bottleneck",
      message: "Tasks related to 'Marketing Outreach' have been stalled for 3 days. This could impact your Beta Testing milestone timeline. The average completion time for marketing tasks has increased by 65% this month.",
      confidence: 82,
      actionable: true,
      action: {
        label: "Review Marketing Plan",
        handler: () => console.log("Review marketing plan")
      },
      timestamp: "1 hour ago",
      category: "Risk Management"
    },
    {
      id: "4",
      type: "recommendation",
      title: "Next Strategic Focus Recommendation",
      message: "Based on your progress, I recommend prioritizing the 'User Feedback System' goal next. It has the highest impact on your Beta Testing milestone and aligns with your current velocity of 2.3 goals per week.",
      confidence: 91,
      actionable: true,
      action: {
        label: "Create Action Plan",
        handler: () => console.log("Create action plan")
      },
      timestamp: "2 hours ago",
      category: "Strategy"
    },
    {
      id: "5",
      type: "success",
      title: "Milestone Velocity Improvement",
      message: "Your milestone completion velocity has improved by 15% over the last month. The 'MVP Launch' was completed with 92% efficiency. This trajectory puts you on track to complete your Q1 goals 1 week early.",
      confidence: 94,
      actionable: false,
      timestamp: "1 day ago",
      category: "Performance"
    }
  ]

  useEffect(() => {
    // Simulate loading insights
    setIsGenerating(true)
    const timer = setTimeout(() => {
      setInsights(mockInsights)
      setIsGenerating(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-blue-400" />
      case "pattern":
        return <TrendingUp className="h-5 w-5 text-purple-400" />
      case "celebration":
        return <Award className="h-5 w-5 text-yellow-400" />
      default:
        return <Sparkles className="h-5 w-5 text-gray-400" />
    }
  }

  const getInsightColors = (type: string) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-400"
        }
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400"
        }
      case "recommendation":
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          text: "text-blue-400"
        }
      case "pattern":
        return {
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          text: "text-purple-400"
        }
      case "celebration":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400"
        }
      default:
        return {
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          text: "text-gray-400"
        }
    }
  }

  const generateNewInsights = () => {
    setIsGenerating(true)
    // Simulate AI generating new insights
    setTimeout(() => {
      setInsights([...mockInsights])
      setIsGenerating(false)
    }, 3000)
  }

  const filteredInsights = selectedCategory === "all" 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory)

  const categories = ["all", ...Array.from(new Set(insights.map(i => i.category)))]

  return (
    <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 ${fullScreen ? 'h-full' : 'h-full'} flex flex-col`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
        <CardTitle className="text-white flex items-center">
          <Brain className="h-6 w-6 mr-3 text-[#f97316]" />
          Toro's Insights
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-[#f97316]/20 text-[#f97316] border-[#f97316]/30 flex items-center space-x-1">
            <Sparkles className="h-3 w-3" />
            <span>AI-Powered</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewInsights}
            disabled={isGenerating}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`text-xs transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#f97316] to-[#facc15] text-white"
                  : "border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Toro Avatar and Status */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#f97316]/10 to-[#facc15]/10 rounded-xl border border-[#f97316]/30">
          <div className="w-12 h-12 bg-gradient-to-r from-[#f97316] to-[#facc15] rounded-full flex items-center justify-center shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">Toro's Analysis</h3>
            <p className="text-gray-300 text-sm">
              {isGenerating ? "Analyzing your progress..." : `${filteredInsights.length} insights ready`}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            <span className="text-xs text-gray-400">
              {isGenerating ? "Thinking" : "Ready"}
            </span>
          </div>
        </div>

        {/* Insights List */}
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
          {isGenerating ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                      <div className="h-3 bg-white/20 rounded w-full"></div>
                      <div className="h-3 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredInsights.map((insight) => {
              const colors = getInsightColors(insight.type)
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${colors.bg} ${colors.border}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {insight.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{insight.timestamp}</span>
                        </div>
                        {insight.actionable && insight.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={insight.action.handler}
                            className={`text-xs hover:scale-105 transition-all ${colors.border} ${colors.text} hover:bg-white/10`}
                          >
                            {insight.action.label}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Quick Action Suggestions */}
        {!isGenerating && filteredInsights.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-[#7f5af0]/10 to-[#10b981]/10 rounded-xl border border-[#7f5af0]/30">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-[#7f5af0]" />
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-white/20 text-gray-300 hover:bg-white/10 hover:text-white justify-start"
              >
                <Calendar className="h-3 w-3 mr-2" />
                Schedule Focus
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-white/20 text-gray-300 hover:bg-white/10 hover:text-white justify-start"
              >
                <Target className="h-3 w-3 mr-2" />
                Set Goals
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 