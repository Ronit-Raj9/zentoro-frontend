"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Zap, 
  Calendar,
  ArrowUp, 
  ArrowDown,
  Activity,
  Star,
  Award,
  Users,
  DollarSign,
  Brain
} from "lucide-react"

interface KPICardsProps {
  timeRange: string
}

export default function KPICards({ timeRange }: KPICardsProps) {
  // Mock data - in real app, this would come from your analytics API
  const kpiData = {
    productivity: {
      focusHours: 32,
      change: +15,
      tasksCompleted: 47,
      goalCompletionRate: 78
    },
    progress: {
      velocity: 2.3,
      change: +8,
      milestonesThisMonth: 3,
      nextMilestoneProgress: 75
    },
    accountability: {
      habitStreak: 12,
      change: +2,
      reflectionConsistency: 85,
      weeklyGoalsMet: 4
    },
    growth: {
      userEngagement: 94,
      change: +12,
      revenueGrowth: 23,
      teamProductivity: 89
    }
  }

  const kpiCards = [
    {
      id: "productivity",
      title: "Productivity",
      icon: Zap,
      color: "from-[#7f5af0] to-[#8b5cf6]",
      accentColor: "text-[#7f5af0]",
      bgColor: "bg-[#7f5af0]/10",
      borderColor: "border-[#7f5af0]/30",
      metrics: [
        {
          label: "Focus Hours",
          value: kpiData.productivity.focusHours,
          unit: "hrs",
          change: kpiData.productivity.change,
          subtext: `this ${timeRange}`
        },
        {
          label: "Tasks Completed",
          value: kpiData.productivity.tasksCompleted,
          unit: "",
          subtext: "high priority"
        },
        {
          label: "Goal Completion",
          value: kpiData.productivity.goalCompletionRate,
          unit: "%",
          subtext: "success rate"
        }
      ]
    },
    {
      id: "progress",
      title: "Progress Velocity",
      icon: TrendingUp,
      color: "from-[#10b981] to-[#059669]",
      accentColor: "text-[#10b981]",
      bgColor: "bg-[#10b981]/10",
      borderColor: "border-[#10b981]/30",
      metrics: [
        {
          label: "Velocity",
          value: kpiData.progress.velocity,
          unit: "x",
          change: kpiData.progress.change,
          subtext: "goals/week"
        },
        {
          label: "Milestones",
          value: kpiData.progress.milestonesThisMonth,
          unit: "",
          subtext: "this month"
        },
        {
          label: "Next Milestone",
          value: kpiData.progress.nextMilestoneProgress,
          unit: "%",
          subtext: "Beta Launch"
        }
      ]
    },
    {
      id: "accountability",
      title: "Accountability",
      icon: Award,
      color: "from-[#facc15] to-[#f59e0b]",
      accentColor: "text-[#facc15]",
      bgColor: "bg-[#facc15]/10",
      borderColor: "border-[#facc15]/30",
      metrics: [
        {
          label: "Habit Streak",
          value: kpiData.accountability.habitStreak,
          unit: "days",
          change: kpiData.accountability.change,
          subtext: "daily rituals"
        },
        {
          label: "Reflection Rate",
          value: kpiData.accountability.reflectionConsistency,
          unit: "%",
          subtext: "consistency"
        },
        {
          label: "Weekly Goals",
          value: kpiData.accountability.weeklyGoalsMet,
          unit: "/5",
          subtext: "achieved"
        }
      ]
    },
    {
      id: "growth",
      title: "Growth Metrics",
      icon: Activity,
      color: "from-[#f97316] to-[#ea580c]",
      accentColor: "text-[#f97316]",
      bgColor: "bg-[#f97316]/10",
      borderColor: "border-[#f97316]/30",
      metrics: [
        {
          label: "User Engagement",
          value: kpiData.growth.userEngagement,
          unit: "%",
          change: kpiData.growth.change,
          subtext: "weekly active"
        },
        {
          label: "Revenue Growth",
          value: kpiData.growth.revenueGrowth,
          unit: "%",
          subtext: "month over month"
        },
        {
          label: "Team Efficiency",
          value: kpiData.growth.teamProductivity,
          unit: "%",
          subtext: "productivity index"
        }
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiCards.map((card) => {
        const IconComponent = card.icon
        return (
          <Card 
            key={card.id} 
            className={`bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group ${card.borderColor}`}
          >
            <CardContent className="p-6">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-6 w-6 ${card.accentColor}`} />
                </div>
                <Badge 
                  variant="outline" 
                  className={`${card.borderColor} ${card.accentColor} bg-transparent text-xs`}
                >
                  {timeRange}
                </Badge>
              </div>

              {/* Card Title */}
              <h3 className="text-white font-semibold text-lg mb-4 group-hover:text-gray-100 transition-colors">
                {card.title}
              </h3>

              {/* Metrics */}
              <div className="space-y-3">
                {card.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">
                          {metric.value}
                          <span className="text-sm font-normal text-gray-400 ml-1">
                            {metric.unit}
                          </span>
                        </span>
                        {metric.change && (
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                            metric.change > 0 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-red-500/20 text-red-400"
                          }`}>
                            {metric.change > 0 ? (
                              <ArrowUp className="h-3 w-3" />
                            ) : (
                              <ArrowDown className="h-3 w-3" />
                            )}
                            <span>{Math.abs(metric.change)}%</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{metric.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar for Primary Metric */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${card.color} transition-all duration-1000`}
                    style={{ 
                      width: `${Math.min(100, (card.metrics[0].value / (card.id === 'progress' ? 3 : 100)) * 100)}%` 
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Target progress
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 