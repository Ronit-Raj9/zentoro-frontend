"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Circle,
  Star,
  Clock,
  Plus,
  Calendar,
  Brain,
  Filter,
  MoreHorizontal,
  Timer,
  Lightbulb,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "High" | "Medium" | "Low"
  dueTime?: string
  tags: string[]
  context?: string
  isFocus?: boolean
  isMissed?: boolean
  estimatedTime?: string
  source?: "chat" | "manual" | "ai-suggestion"
}

interface Suggestion {
  id: string
  title: string
  reason: string
  goalAlignment?: string
  source: string
}

export default function ProductivityPanelContent() {
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "missed">("today")
  const [newTaskInput, setNewTaskInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const taskIdCounter = useRef(100) // Start with 100 to avoid conflicts with initial tasks

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Write LinkedIn post about startup loneliness",
      completed: false,
      priority: "High",
      dueTime: "2:00 PM",
      tags: ["content", "personal-brand"],
      context: "Suggested after you mentioned feeling isolated as a solo founder",
      isFocus: true,
      estimatedTime: "30 min",
      source: "chat",
    },
    {
      id: "2",
      title: "Review pitch deck slides 1-5",
      completed: false,
      priority: "High",
      dueTime: "4:00 PM",
      tags: ["fundraising", "presentation"],
      context: "Investor meeting tomorrow",
      estimatedTime: "45 min",
      source: "manual",
    },
    {
      id: "3",
      title: "Update team on weekly progress",
      completed: false,
      priority: "Medium",
      dueTime: "5:30 PM",
      tags: ["team", "communication"],
      estimatedTime: "15 min",
      source: "ai-suggestion",
    },
    {
      id: "4",
      title: "Finalize product roadmap Q2",
      completed: false,
      priority: "Medium",
      tags: ["product", "planning"],
      isMissed: true,
      estimatedTime: "2 hours",
      source: "manual",
    },
  ])

  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Draft follow-up email for yesterday's pitch",
      reason: "You mentioned the meeting went well",
      goalAlignment: "Supports your June 20th funding goal",
      source: "Recent conversations",
    },
    {
      id: "2",
      title: "Schedule user interviews for next week",
      reason: "You're approaching 100 users milestone",
      goalAlignment: "Supports product validation goal",
      source: "Milestone tracking",
    },
  ])

  const focusTask = tasks.find((task) => task.isFocus && !task.completed)
  const todayTasks = tasks.filter((task) => !task.isMissed && !task.isFocus)
  const missedTasks = tasks.filter((task) => task.isMissed)

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (!newTaskInput.trim()) return

    taskIdCounter.current += 1
    const newTask: Task = {
      id: `task-${taskIdCounter.current}`,
      title: newTaskInput,
      completed: false,
      priority: "Medium",
      tags: [],
      source: "manual",
    }

    setTasks((prev) => [...prev, newTask])
    setNewTaskInput("")
  }

  const acceptSuggestion = (suggestion: Suggestion) => {
    taskIdCounter.current += 1
    const newTask: Task = {
      id: `task-${taskIdCounter.current}`,
      title: suggestion.title,
      completed: false,
      priority: "Medium",
      tags: ["ai-suggested"],
      context: suggestion.reason,
      source: "ai-suggestion",
    }

    setTasks((prev) => [...prev, newTask])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case "chat":
        return <MessageSquare className="h-3 w-3" />
      case "ai-suggestion":
        return <Brain className="h-3 w-3" />
      default:
        return <Circle className="h-3 w-3" />
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '16px 16px'
      }} />
      
      {/* Enhanced Stats Header - Responsive */}
      <div className="relative p-3 sm:p-4 lg:p-6 border-b border-white/5 backdrop-blur-sm bg-white/[0.02] flex-shrink-0">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-[#9ca3af] font-medium text-xs sm:text-sm">2 High Priority</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-sm sm:text-lg">🔥</span>
              <span className="text-[#facc15] font-semibold text-xs sm:text-sm">3 Day Streak</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 transition-all duration-200 h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        {/* Progress indicators - Responsive Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#10b981]">4</div>
            <div className="text-xs text-[#9ca3af]">Today</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#facc15]">1</div>
            <div className="text-xs text-[#9ca3af]">Tomorrow</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#ef4444]">1</div>
            <div className="text-xs text-[#9ca3af]">Missed</div>
          </div>
        </div>
      </div>

      {/* Enhanced Focus Task - Responsive */}
      {focusTask && (
        <div className="relative p-3 sm:p-4 lg:p-6 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#facc15] to-[#f59e0b] rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="text-sm sm:text-base font-bold text-[#e6ebf4] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Today's Focus
            </span>
          </div>

          <Card className="bg-gradient-to-r from-[#7f5af0]/10 via-[#8b5cf6]/10 to-[#10b981]/10 border-[#7f5af0]/20 backdrop-blur-sm shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <CardContent className="p-3 sm:p-4 lg:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTask(focusTask.id)}
                    className="p-0 h-auto hover:bg-transparent flex-shrink-0"
                  >
                    {focusTask.completed ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#10b981]" />
                    ) : (
                      <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-[#9ca3af] hover:text-[#7f5af0] transition-colors" />
                    )}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-[#e6ebf4] text-sm sm:text-base break-words ${focusTask.completed ? "line-through opacity-60" : ""}`}>
                      {focusTask.title}
                    </h3>
                    {focusTask.context && (
                      <p className="text-xs sm:text-sm text-[#9ca3af] mt-1 italic break-words">{focusTask.context}</p>
                    )}
                  </div>
                </div>
                <Badge className={`ml-2 flex-shrink-0 text-xs ${getPriorityColor(focusTask.priority)} border font-medium`}>
                  {focusTask.priority}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap gap-1">
                  {focusTask.dueTime && (
                    <span className="flex items-center space-x-1 text-[#9ca3af]">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{focusTask.dueTime}</span>
                    </span>
                  )}
                  {focusTask.estimatedTime && (
                    <span className="flex items-center space-x-1 text-[#9ca3af]">
                      <Timer className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{focusTask.estimatedTime}</span>
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8"
                >
                  Start Focus Session
                </Button>
              </div>

              {focusTask.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                  {focusTask.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-white/5 border-white/20 text-[#9ca3af] hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Task Tabs - Responsive */}
      <div className="relative px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-white/5 backdrop-blur-sm bg-white/[0.02] flex-shrink-0">
        <div className="flex space-x-1 bg-white/[0.03] rounded-lg sm:rounded-xl p-1 border border-white/10">
          {[
            { id: "today", label: "Today", count: todayTasks.length, color: "text-[#10b981]" },
            { id: "tomorrow", label: "Tomorrow", count: 0, color: "text-[#facc15]" },
            { id: "missed", label: "Missed", count: missedTasks.length, color: "text-[#ef4444]" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3 ${
                activeTab === tab.id 
                  ? "bg-white/10 text-[#e6ebf4] shadow-lg" 
                  : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
              }`}
            >
              <span className="font-medium truncate">{tab.label}</span>
              {tab.count > 0 && (
                <Badge 
                  variant="secondary" 
                  className={`ml-1 sm:ml-2 text-xs ${tab.color} bg-current/20 border-current/30 h-4 px-1`}
                >
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Task List - Improved Scrolling */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 min-h-0">
        {activeTab === "today" &&
          todayTasks.map((task, index) => (
            <Card 
              key={task.id} 
              className="bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTask(task.id)}
                    className="p-0 h-auto hover:bg-transparent mt-1 flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#10b981]" />
                    ) : (
                      <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-[#9ca3af] hover:text-[#7f5af0] transition-colors" />
                    )}
                  </Button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                      <h3 className={`font-semibold text-[#e6ebf4] text-sm sm:text-base break-words flex-1 ${task.completed ? "line-through opacity-60" : ""}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 sm:mt-0 sm:ml-3 flex-shrink-0">
                        <Badge className={`text-xs ${getPriorityColor(task.priority)} border font-medium`}>
                          {task.priority}
                        </Badge>
                        {getSourceIcon(task.source)}
                      </div>
                    </div>

                    {task.context && (
                      <p className="text-xs sm:text-sm text-[#9ca3af] mb-2 sm:mb-3 italic break-words">{task.context}</p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap gap-1">
                        {task.dueTime && (
                          <span className="flex items-center space-x-1 text-[#9ca3af]">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{task.dueTime}</span>
                          </span>
                        )}
                        {task.estimatedTime && (
                          <span className="flex items-center space-x-1 text-[#9ca3af]">
                            <Timer className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{task.estimatedTime}</span>
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 transition-colors h-6 w-6 p-0 sm:h-7 sm:w-7">
                        <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                        {task.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs bg-white/5 border-white/20 text-[#9ca3af] hover:bg-white/10 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {activeTab === "missed" &&
          missedTasks.map((task, index) => (
            <Card 
              key={task.id} 
              className="bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="font-semibold text-[#e6ebf4] text-sm sm:text-base break-words flex-1">
                        {task.title}
                      </h3>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)} border font-medium mt-1 sm:mt-0 sm:ml-3 flex-shrink-0`}>
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap gap-1">
                        {task.estimatedTime && (
                          <span className="flex items-center space-x-1 text-[#9ca3af]">
                            <Timer className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{task.estimatedTime}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, isMissed: false } : t))}
                          className="bg-[#7f5af0]/20 hover:bg-[#7f5af0] text-[#7f5af0] hover:text-white border border-[#7f5af0]/30 hover:border-[#7f5af0] transition-all duration-200 text-xs h-6 sm:h-7 px-2 sm:px-3"
                        >
                          Reschedule
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleTask(task.id)}
                          className="bg-[#10b981]/20 hover:bg-[#10b981] text-[#10b981] hover:text-white border border-[#10b981]/30 hover:border-[#10b981] transition-all duration-200 text-xs h-6 sm:h-7 px-2 sm:px-3"
                        >
                          Complete
                        </Button>
                      </div>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                        {task.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs bg-white/5 border-white/20 text-[#9ca3af] hover:bg-white/10 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {activeTab === "tomorrow" && (
          <div className="text-center py-8 sm:py-12">
            <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-[#9ca3af] mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-[#e6ebf4] mb-2">No tasks for tomorrow yet</h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] mb-4 sm:mb-6">Plan ahead and add some tasks for tomorrow</p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Tomorrow's Task
            </Button>
          </div>
        )}
      </div>

      {/* AI Suggestions Section - Responsive */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="border-t border-white/5 p-3 sm:p-4 lg:p-6 bg-white/[0.02] backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-sm sm:text-base font-bold text-[#e6ebf4] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Toro Suggestions
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(false)}
              className="text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/10 transition-colors h-6 w-6 sm:h-7 sm:w-7 p-0"
            >
              ×
            </Button>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="bg-gradient-to-r from-[#10b981]/10 via-[#059669]/10 to-[#047857]/10 border-[#10b981]/20 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-green-500/10 transition-all duration-300"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-[#e6ebf4] text-sm sm:text-base break-words flex-1">
                      {suggestion.title}
                    </h4>
                    <Button
                      size="sm"
                      onClick={() => acceptSuggestion(suggestion)}
                      className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#10b981]/90 hover:to-[#059669]/90 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-200 text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3 mt-2 sm:mt-0 sm:ml-3 flex-shrink-0"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mb-2 break-words">{suggestion.reason}</p>
                  {suggestion.goalAlignment && (
                    <p className="text-xs text-[#10b981] font-medium break-words">{suggestion.goalAlignment}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Add Task Input - Responsive */}
      <div className="border-t border-white/5 p-3 sm:p-4 lg:p-6 bg-white/[0.02] backdrop-blur-sm flex-shrink-0">
        <div className="flex space-x-2 sm:space-x-3">
          <Input
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Ask Toro anything... Write a post about startup challenges"
            className="flex-1 bg-white/[0.03] border-white/10 text-[#e6ebf4] placeholder-[#9ca3af] focus:border-[#7f5af0]/50 focus:ring-[#7f5af0]/20 backdrop-blur-sm text-xs sm:text-sm h-8 sm:h-9"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button
            onClick={addTask}
            size="sm"
            className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:scale-105 flex-shrink-0 h-8 sm:h-9 w-8 sm:w-9 p-0"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
