"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar, 
  Clock, 
  Zap, 
  Brain, 
  Sparkles,
  Star,
  Award,
  Activity,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Play,
  Pause,
  MessageSquare,
  CheckCircle,
  Circle,
  Users,
  DollarSign,
  Lightbulb
} from "lucide-react"
import KnowledgeGraph from "./knowledge-graph"
import ToroInsights from "./toro-insights"
import KPICards from "./kpi-cards"

export default function AnalyticsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")
  const [activeView, setActiveView] = useState("overview")

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318]">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#facc15] via-[#f59e0b] to-[#f97316] rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/25 animate-pulse">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Loading Mission Control</h2>
            <p className="text-gray-400">Toro is analyzing your progress...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] overflow-hidden">
      {/* Enhanced Header */}
      <div className="relative p-8 border-b border-white/10 flex-shrink-0 bg-gradient-to-br from-[#facc15]/5 via-transparent to-[#f97316]/5">
        <div className="relative z-10">
          {/* Title Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#facc15] to-[#f97316] rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#e6ebf4] to-[#c5ccd6] bg-clip-text text-transparent mb-2">
                  Founder's Mission Control
                </h1>
                <p className="text-[#9ca3af] text-lg leading-relaxed max-w-2xl">
                  Your AI-powered analytics dashboard with insights from Toro
                </p>
                
                {/* Quick Stats */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Activity className="h-4 w-4 text-[#facc15]" />
                    <span className="text-[#9ca3af]">Live tracking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Brain className="h-4 w-4 text-[#f97316]" />
                    <span className="text-[#9ca3af]">AI insights</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Sparkles className="h-4 w-4 text-[#facc15] animate-pulse" />
                    <span className="text-[#9ca3af]">Real-time analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                {["day", "week", "month", "quarter"].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className={`rounded-lg transition-all ${
                      selectedTimeRange === range 
                        ? "bg-gradient-to-r from-[#facc15] to-[#f97316] text-white shadow-md" 
                        : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                className="border-[#facc15]/30 text-[#facc15] hover:bg-[#facc15]/10 hover:border-[#facc15]/50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex space-x-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "knowledge", label: "Knowledge Graph", icon: Target },
              { id: "insights", label: "Toro's Insights", icon: Brain },
              { id: "performance", label: "Performance", icon: TrendingUp },
            ].map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeView === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-[#facc15] to-[#f97316] text-white shadow-lg transform scale-105"
                      : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10"
                  }`}
                >
                  <TabIcon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#facc15]'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === "overview" && (
          <div className="h-full p-8 overflow-y-auto">
            <div className="grid grid-cols-12 gap-8 h-full">
              {/* KPI Cards - Top Section */}
              <div className="col-span-12">
                <KPICards timeRange={selectedTimeRange} />
              </div>

              {/* Knowledge Graph - Left Side */}
              <div className="col-span-8 h-[600px]">
                <KnowledgeGraph />
              </div>

              {/* Toro's Insights - Right Side */}
              <div className="col-span-4 h-[600px]">
                <ToroInsights />
              </div>
            </div>
          </div>
        )}

        {activeView === "knowledge" && (
          <div className="h-full p-8">
            <KnowledgeGraph fullScreen />
          </div>
        )}

        {activeView === "insights" && (
          <div className="h-full p-8">
            <ToroInsights fullScreen />
          </div>
        )}

        {activeView === "performance" && (
          <div className="h-full p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-[#facc15]" />
                    Performance Deep Dive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#9ca3af]">
                    Detailed performance analytics coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 