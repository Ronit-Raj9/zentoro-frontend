"use client"

import { useState, useRef, useEffect } from "react"
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
  MoreHorizontal,
  Timer,
  Lightbulb,
  AlertTriangle,
  MessageSquare,
  Play,
  Pause,
  Target,
  FileText,
  Bookmark,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Edit3,
  Link2,
  Zap,
  BarChart3,
  Settings,
  Filter,
  Search,
  ArrowRight,
  PenTool,
  Mail,
  Image,
  Layout,
  Users,
  GitBranch,
  Sparkles,
  Eye,
  Archive,
  Linkedin
} from "lucide-react"

// Enhanced interfaces for the new features
interface Task {
  id: string
  title: string
  completed: boolean
  priority: "High" | "Medium" | "Low"
  dueTime?: string
  dueDate?: string
  tags: string[]
  context?: string
  isFocus?: boolean
  isMissed?: boolean
  estimatedTime?: string
  source?: "chat" | "manual" | "ai-suggestion"
  linkedDocuments?: string[]
  linkedChats?: string[]
  goalId?: string
  focusSessionTime?: number
  subtasks?: string[]
  notes?: string
}

interface Suggestion {
  id: string
  title: string
  reason: string
  goalAlignment?: string
  source: string
  priority: "High" | "Medium" | "Low"
  type: "task" | "note" | "meeting" | "research"
}

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  deadline?: string
  priority: "High" | "Medium" | "Low"
  linkedTasks: string[]
}

interface Note {
  id: string
  title: string
  content: string
  linkedTasks: string[]
  linkedChats: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface FocusSession {
  id: string
  taskId: string
  startTime: number
  duration: number
  isActive: boolean
  isPaused: boolean
  type: "pomodoro" | "deep-work" | "quick"
}

interface QuickDraft {
  id: string
  type: "linkedin" | "email" | "doc"
  title: string
  content: string
  tags: string[]
  createdAt: string
}

export default function ProductivityPanelContent() {
  // Enhanced state management
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "missed" | "completed">("today")
  const [activeView, setActiveView] = useState<"tasks" | "calendar" | "notes" | "goals" | "analytics">("tasks")
  const [newTaskInput, setNewTaskInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [focusSession, setFocusSession] = useState<FocusSession | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [showAISuggestions, setShowAISuggestions] = useState(true)
  const [showQuickDrafts, setShowQuickDrafts] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  
  const taskIdCounter = useRef(100)
  const sessionTimer = useRef<NodeJS.Timeout | null>(null)

  // Enhanced task data with all features
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Write LinkedIn post about startup loneliness",
      completed: false,
      priority: "High",
      dueTime: "2:00 PM",
      dueDate: "2024-01-20",
      tags: ["content", "personal-brand", "marketing"],
      context: "Suggested after you mentioned feeling isolated as a solo founder",
      isFocus: true,
      estimatedTime: "30 min",
      source: "chat",
      linkedDocuments: ["LinkedIn Content Strategy.md"],
      linkedChats: ["chat-001"],
      goalId: "goal-1",
      subtasks: ["Research trending topics", "Write draft", "Add visuals", "Schedule post"],
      notes: "Focus on authentic storytelling and vulnerability"
    },
    {
      id: "2",
      title: "Review pitch deck slides 1-5",
      completed: false,
      priority: "High",
      dueTime: "4:00 PM",
      dueDate: "2024-01-20",
      tags: ["fundraising", "presentation", "investor"],
      context: "Investor meeting tomorrow",
      estimatedTime: "45 min",
      source: "manual",
      linkedDocuments: ["Pitch Deck v3.pptx", "Investor Notes.md"],
      goalId: "goal-2",
      subtasks: ["Review slide design", "Update metrics", "Practice pitch", "Prepare Q&A"]
    },
    {
      id: "3",
      title: "Update team on weekly progress",
      completed: false,
      priority: "Medium",
      dueTime: "5:30 PM",
      dueDate: "2024-01-20",
      tags: ["team", "communication", "management"],
      estimatedTime: "15 min",
      source: "ai-suggestion",
      goalId: "goal-3",
      subtasks: ["Collect metrics", "Write update", "Send to team"]
    },
    {
      id: "4",
      title: "Finalize product roadmap Q2",
      completed: false,
      priority: "Medium",
      tags: ["product", "planning", "strategy"],
      isMissed: true,
      estimatedTime: "2 hours",
      source: "manual",
      dueDate: "2024-01-19",
      goalId: "goal-1",
      subtasks: ["Gather feedback", "Prioritize features", "Create timeline", "Share with stakeholders"]
    }
  ])

  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Draft follow-up email for yesterday's pitch",
      reason: "You mentioned the meeting went well",
      goalAlignment: "Supports your June 20th funding goal",
      source: "Recent conversations",
      priority: "High",
      type: "task"
    },
    {
      id: "2",
      title: "Schedule user interviews for next week",
      reason: "You're approaching 100 users milestone",
      goalAlignment: "Supports product validation goal",
      source: "Milestone tracking",
      priority: "Medium",
      type: "meeting"
    },
    {
      id: "3",
      title: "Document competitor analysis findings",
      reason: "You researched 5 competitors this week",
      goalAlignment: "Supports market positioning strategy",
      source: "AI analysis",
      priority: "Medium",
      type: "note"
    }
  ])

  const [goals] = useState<Goal[]>([
    {
      id: "goal-1",
      title: "Launch MVP",
      description: "Complete and launch the minimum viable product",
      progress: 75,
      deadline: "2024-03-15",
      priority: "High",
      linkedTasks: ["1", "4"]
    },
    {
      id: "goal-2", 
      title: "Raise Seed Round",
      description: "Secure $500K seed funding",
      progress: 40,
      deadline: "2024-06-20",
      priority: "High",
      linkedTasks: ["2"]
    },
    {
      id: "goal-3",
      title: "Build Team",
      description: "Hire 3 key team members",
      progress: 20,
      deadline: "2024-04-30",
      priority: "Medium",
      linkedTasks: ["3"]
    }
  ])

  const [quickDrafts] = useState<QuickDraft[]>([
    {
      id: "draft-1",
      type: "linkedin",
      title: "Startup Journey Reflection",
      content: "Been thinking about the emotional rollercoaster of building a startup...",
      tags: ["personal", "startup", "journey"],
      createdAt: "2024-01-20T10:30:00Z"
    },
    {
      id: "draft-2", 
      type: "email",
      title: "Investor Follow-up",
      content: "Thank you for taking the time to meet with us yesterday...",
      tags: ["investor", "follow-up"],
      createdAt: "2024-01-20T09:15:00Z"
    }
  ])

  // Enhanced helper functions
  const focusTask = tasks.find((task) => task.isFocus && !task.completed)
  const allTodayTasks = tasks.filter((task) => !task.isMissed && !task.isFocus && task.dueDate === "2024-01-20")
  const allTomorrowTasks = tasks.filter((task) => task.dueDate === "2024-01-21")
  const allMissedTasks = tasks.filter((task) => task.isMissed)
  const allCompletedTasks = tasks.filter((task) => task.completed)

  // Apply search filtering
  const todayTasks = filterTasksBySearch(allTodayTasks)
  const tomorrowTasks = filterTasksBySearch(allTomorrowTasks)
  const missedTasks = filterTasksBySearch(allMissedTasks)
  const completedTasks = filterTasksBySearch(allCompletedTasks)
  const filteredSuggestions = filterSuggestionsBySearch(suggestions)
  const filteredQuickDrafts = filterDraftsBySearch(quickDrafts)

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

  const getGoalProgress = (goalId?: string) => {
    if (!goalId) return null
    const goal = goals.find(g => g.id === goalId)
    return goal ? goal.progress : null
  }

  // Search filtering functions
  function filterTasksBySearch(tasksToFilter: Task[]) {
    if (!searchQuery.trim()) return tasksToFilter
    
    const query = searchQuery.toLowerCase()
    return tasksToFilter.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.tags.some(tag => tag.toLowerCase().includes(query)) ||
      task.context?.toLowerCase().includes(query) ||
      task.notes?.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    )
  }

  function filterSuggestionsBySearch(suggestionsToFilter: Suggestion[]) {
    if (!searchQuery.trim()) return suggestionsToFilter
    
    const query = searchQuery.toLowerCase()
    return suggestionsToFilter.filter(suggestion =>
      suggestion.title.toLowerCase().includes(query) ||
      suggestion.reason.toLowerCase().includes(query) ||
      suggestion.goalAlignment?.toLowerCase().includes(query) ||
      suggestion.type.toLowerCase().includes(query) ||
      suggestion.priority.toLowerCase().includes(query)
    )
  }

  function filterDraftsBySearch(draftsToFilter: QuickDraft[]) {
    if (!searchQuery.trim()) return draftsToFilter
    
    const query = searchQuery.toLowerCase()
    return draftsToFilter.filter(draft =>
      draft.title.toLowerCase().includes(query) ||
      draft.content.toLowerCase().includes(query) ||
      draft.tags.some(tag => tag.toLowerCase().includes(query)) ||
      draft.type.toLowerCase().includes(query)
    )
  }

  // Focus session management
  const startFocusSession = (taskId: string, type: "pomodoro" | "deep-work" | "quick" = "pomodoro") => {
    const duration = type === "pomodoro" ? 25 * 60 : type === "deep-work" ? 90 * 60 : 15 * 60
    
    const newSession: FocusSession = {
      id: `session-${Date.now()}`,
      taskId,
      startTime: Date.now(),
      duration,
      isActive: true,
      isPaused: false,
      type
    }
    
    setFocusSession(newSession)
    
    // Start timer
    sessionTimer.current = setInterval(() => {
      setFocusSession(prev => {
        if (!prev || prev.isPaused) return prev
        
        const elapsed = Date.now() - prev.startTime
        if (elapsed >= prev.duration * 1000) {
          // Session completed
          if (sessionTimer.current) {
            clearInterval(sessionTimer.current)
          }
          return { ...prev, isActive: false }
        }
        return prev
      })
    }, 1000)
  }

  const pauseFocusSession = () => {
    setFocusSession(prev => prev ? { ...prev, isPaused: !prev.isPaused } : null)
  }

  const stopFocusSession = () => {
    if (sessionTimer.current) {
      clearInterval(sessionTimer.current)
    }
    setFocusSession(null)
  }

  // Enhanced task management
  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
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
      dueDate: "2024-01-20",
      subtasks: []
    }

    setTasks(prev => [...prev, newTask])
    setNewTaskInput("")
  }

  const acceptSuggestion = (suggestion: Suggestion) => {
    taskIdCounter.current += 1
    const newTask: Task = {
      id: `task-${taskIdCounter.current}`,
      title: suggestion.title,
      completed: false,
      priority: suggestion.priority,
      tags: ["ai-suggested"],
      context: suggestion.reason,
      source: "ai-suggestion",
      dueDate: "2024-01-20",
      subtasks: []
    }

    setTasks(prev => [...prev, newTask])
  }

  // Week navigation for calendar
  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeekStart(newDate)
  }

  const getWeekDays = () => {
    const days = []
    const start = new Date(currentWeekStart)
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    
    return days
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (sessionTimer.current) {
        clearInterval(sessionTimer.current)
      }
    }
  }, [])

  // Render main navigation
  const renderMainNavigation = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center space-x-1">
          {[
            { id: "tasks", icon: CheckCircle2, label: "Tasks" },
            { id: "calendar", icon: Calendar, label: "Calendar" },
            { id: "notes", icon: FileText, label: "Notes" },
            { id: "goals", icon: Target, label: "Goals" },
            { id: "analytics", icon: BarChart3, label: "Analytics" }
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView(item.id as any)}
              className={`h-8 px-2 text-xs ${
                activeView === item.id 
                  ? "bg-[#7f5af0] text-white shadow-lg" 
                  : "text-[#9ca3af] hover:text-[#e6ebf4] hover:bg-white/5"
              }`}
            >
              <item.icon className="h-3 w-3 mr-1" />
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className={`h-8 w-8 p-0 transition-all duration-200 ${
              showSearch || searchQuery 
                ? "text-[#7f5af0] bg-[#7f5af0]/10" 
                : "text-[#9ca3af] hover:text-[#e6ebf4]"
            }`}
          >
            <Search className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-[#9ca3af] hover:text-[#e6ebf4]"
          >
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-1 pb-2">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, suggestions, drafts..."
              className="flex-1 bg-white/[0.03] border-white/10 text-[#e6ebf4] placeholder-[#9ca3af] focus:border-[#7f5af0]/50 focus:ring-[#7f5af0]/20 backdrop-blur-sm text-xs h-8 pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-[#9ca3af]" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1 h-6 w-6 p-0 text-[#9ca3af] hover:text-[#e6ebf4]"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-xs text-[#9ca3af] flex items-center justify-between">
              <span>
                Found: {todayTasks.length + tomorrowTasks.length + missedTasks.length + completedTasks.length} tasks, 
                {filteredSuggestions.length} suggestions, {filteredQuickDrafts.length} drafts
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setShowSearch(false)
                }}
                className="h-5 px-2 text-xs text-[#9ca3af] hover:text-[#e6ebf4]"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Quick Toggle Bar for Tasks View - Only show if at least one section is hidden */}
      {activeView === "tasks" && (!showAISuggestions || !showQuickDrafts) && (
        <div className="flex items-center justify-between px-1 py-2 bg-white/[0.02] rounded-lg border border-white/5">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-[#9ca3af]">Panel Controls:</span>
            {!showAISuggestions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAISuggestions(true)}
                className="h-6 px-2 text-xs transition-all duration-200 text-[#9ca3af] hover:text-[#10b981] hover:bg-[#10b981]/10"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Show AI Suggestions
              </Button>
            )}
            {!showQuickDrafts && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuickDrafts(true)}
                className="h-6 px-2 text-xs transition-all duration-200 text-[#9ca3af] hover:text-[#7f5af0] hover:bg-[#7f5af0]/10"
              >
                <PenTool className="h-3 w-3 mr-1" />
                Show Quick Drafts
              </Button>
            )}
          </div>
          <div className="text-xs text-[#9ca3af]">
            {(showAISuggestions ? filteredSuggestions.length : 0) + (showQuickDrafts ? filteredQuickDrafts.length : 0)} items visible
          </div>
        </div>
      )}
    </div>
  )

  // Render enhanced focus task
  function renderEnhancedFocusTask() {
    const focusTask = tasks.find(t => t.isFocus)
    if (!focusTask) return null

    return (
      <div className="relative px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-white/5 bg-gradient-to-r from-[#7f5af0]/10 to-[#8b5cf6]/10 backdrop-blur-sm">
        <Card className="bg-gradient-to-r from-[#7f5af0]/20 via-[#8b5cf6]/20 to-[#7f5af0]/20 border-[#7f5af0]/30 backdrop-blur-sm shadow-lg">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-[#e6ebf4] break-words">
                  {focusTask.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#c3b3f0] break-words">Focus Task of the Day</p>
              </div>
              <Badge className={`text-xs ${getPriorityColor(focusTask.priority)} border font-medium flex-shrink-0`}>
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
                onClick={() => startFocusSession(focusTask.id)}
                className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8"
              >
                Start Focus Session
              </Button>
            </div>

            {focusTask.tags && focusTask.tags.length > 0 && (
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
    )
  }

  // Render enhanced AI suggestions
  function renderEnhancedSuggestions() {
    if (!showAISuggestions) return null;
    
    return (
      <div className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#e6ebf4]">AI Suggestions</h3>
            {filteredSuggestions.length > 0 && (
              <Badge variant="secondary" className="text-xs bg-[#10b981]/20 border-[#10b981]/30 text-[#10b981] h-4 px-1">
                {filteredSuggestions.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAISuggestions(false)}
              className="h-6 sm:h-7 px-2 sm:px-3 text-xs text-[#9ca3af] hover:text-[#e6ebf4]"
            >
              <Archive className="h-3 w-3" />
              Hide
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 sm:h-7 px-2 sm:px-3 text-xs text-[#9ca3af] hover:text-[#e6ebf4]"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {filteredSuggestions.length > 0 && (
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
            <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {filteredSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-r from-[#10b981]/10 via-[#059669]/10 to-[#047857]/10 border-[#10b981]/20 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-green-500/10 transition-all duration-300"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-[#e6ebf4] text-sm sm:text-base break-words">
                            {suggestion.title}
                          </h4>
                          <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-[#9ca3af] mb-2 break-words">{suggestion.reason}</p>
                        {suggestion.goalAlignment && (
                          <p className="text-xs text-[#10b981] font-medium break-words flex items-center">
                            <Target className="h-3 w-3 mr-1" />
                            {suggestion.goalAlignment}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => acceptSuggestion(suggestion)}
                        className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#10b981]/90 hover:to-[#059669]/90 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-200 text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3 mt-2 sm:mt-0 sm:ml-3 flex-shrink-0"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {showAISuggestions && filteredSuggestions.length === 0 && (
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 text-center py-8">
            {searchQuery ? (
              <>
                <Search className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
                <p className="text-sm text-[#9ca3af]">No AI suggestions match "{searchQuery}"</p>
              </>
            ) : (
              <>
                <Sparkles className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
                <p className="text-sm text-[#9ca3af]">No AI suggestions available right now</p>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  // Render task card
  const renderTaskCard = (task: Task, index: number) => (
    <Card 
      key={task.id} 
      className={`transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md animate-fadeIn ${
        task.isMissed 
          ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          {task.isMissed ? (
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mt-1 flex-shrink-0" />
          ) : (
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
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
              <h3 className={`font-semibold text-sm sm:text-base break-words flex-1 ${
                task.completed ? "line-through opacity-60 text-[#9ca3af]" : "text-[#e6ebf4]"
              }`}>
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
              
              <div className="flex items-center space-x-2">
                {task.goalId && getGoalProgress(task.goalId) && (
                  <div className="flex items-center space-x-1 text-[#7f5af0]">
                    <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs">{getGoalProgress(task.goalId)}%</span>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startFocusSession(task.id)}
                  className="h-6 sm:h-7 px-2 sm:px-3 text-xs text-[#9ca3af] hover:text-[#10b981] hover:bg-[#10b981]/10 transition-colors"
                >
                  <Timer className="h-3 w-3 mr-1" />
                  Focus
                </Button>
              </div>
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                {task.tags.map((tag, index) => (
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

            {(task.notes || task.linkedDocuments?.length || task.linkedChats?.length) && (
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/5">
                {task.notes && (
                  <p className="text-xs text-[#9ca3af] mb-2 break-words italic">
                    📝 {task.notes}
                  </p>
                )}
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
                  {task.linkedDocuments?.length && (
                    <span className="flex items-center space-x-1 text-[#9ca3af]">
                      <FileText className="h-3 w-3" />
                      <span>{task.linkedDocuments.length} docs</span>
                    </span>
                  )}
                  {task.linkedChats?.length && (
                    <span className="flex items-center space-x-1 text-[#9ca3af]">
                      <MessageSquare className="h-3 w-3" />
                      <span>{task.linkedChats.length} chats</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Render enhanced stats header
  function renderStatsHeader() {
    return (
      <div className="relative p-3 sm:p-4 lg:p-6 border-b border-white/5 backdrop-blur-sm bg-white/[0.02] flex-shrink-0">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-[#9ca3af] font-medium text-xs sm:text-sm">
                {tasks.filter(t => t.priority === "High" && !t.completed).length} High Priority
              </span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-sm sm:text-lg">🔥</span>
              <span className="text-[#facc15] font-semibold text-xs sm:text-sm">3 Day Streak</span>
            </div>
          </div>
          
          {focusSession && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Focus Active</span>
            </div>
          )}
        </div>
        
        {/* Enhanced progress indicators */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#10b981]">
              {todayTasks.length}
              {searchQuery && allTodayTasks.length !== todayTasks.length && (
                <span className="text-xs text-[#9ca3af] ml-1">/{allTodayTasks.length}</span>
              )}
            </div>
            <div className="text-xs text-[#9ca3af]">Today</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#facc15]">
              {tomorrowTasks.length}
              {searchQuery && allTomorrowTasks.length !== tomorrowTasks.length && (
                <span className="text-xs text-[#9ca3af] ml-1">/{allTomorrowTasks.length}</span>
              )}
            </div>
            <div className="text-xs text-[#9ca3af]">Tomorrow</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#ef4444]">
              {missedTasks.length}
              {searchQuery && allMissedTasks.length !== missedTasks.length && (
                <span className="text-xs text-[#9ca3af] ml-1">/{allMissedTasks.length}</span>
              )}
            </div>
            <div className="text-xs text-[#9ca3af]">Missed</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.03] rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="text-base sm:text-lg font-bold text-[#8b5cf6]">
              {completedTasks.length}
              {searchQuery && allCompletedTasks.length !== completedTasks.length && (
                <span className="text-xs text-[#9ca3af] ml-1">/{allCompletedTasks.length}</span>
              )}
            </div>
            <div className="text-xs text-[#9ca3af]">Done</div>
          </div>
        </div>
      </div>
    )
  }

  // Render focus session timer
  function renderFocusSession() {
    if (!focusSession) return null

    const elapsed = Date.now() - focusSession.startTime
    const remaining = Math.max(0, focusSession.duration * 1000 - elapsed)
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    const progress = ((focusSession.duration * 1000 - remaining) / (focusSession.duration * 1000)) * 100

    return (
      <div className="relative p-3 sm:p-4 lg:p-6 border-b border-white/5 bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center">
              <Timer className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#e6ebf4]">Focus Session</h3>
              <p className="text-xs text-[#9ca3af]">{focusSession.type} - {tasks.find(t => t.id === focusSession.taskId)?.title}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={stopFocusSession}
            className="h-6 w-6 p-0 text-[#9ca3af] hover:text-red-400"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-[#10b981]">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={pauseFocusSession}
              className="border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/20"
            >
              {focusSession.isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#10b981] to-[#059669] h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  // Render calendar view
  function renderCalendarView() {
    return (
      <div className="space-y-4">
        {/* Week navigation */}
        <div className="flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("prev")}
            className="h-8 w-8 p-0 text-[#9ca3af] hover:text-[#e6ebf4]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm font-medium text-[#e6ebf4]">
            {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("next")}
            className="h-8 w-8 p-0 text-[#9ca3af] hover:text-[#e6ebf4]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 px-4">
          {getWeekDays().map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString()
            const dayTasks = tasks.filter(task => task.dueDate === day.toISOString().split('T')[0])
            
            return (
              <div
                key={index}
                className={`p-2 rounded-lg border text-center ${
                  isToday 
                    ? "bg-[#7f5af0]/20 border-[#7f5af0]/30" 
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                <div className="text-xs text-[#9ca3af] mb-1">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm font-medium ${isToday ? "text-[#7f5af0]" : "text-[#e6ebf4]"}`}>
                  {day.getDate()}
                </div>
                {dayTasks.length > 0 && (
                  <div className="flex justify-center mt-1">
                    <div className="w-1 h-1 bg-[#10b981] rounded-full" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Today's schedule */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#e6ebf4]">Today's Schedule</h3>
            {searchQuery && (
              <div className="text-xs text-[#9ca3af]">
                {todayTasks.length} of {allTodayTasks.length} tasks
              </div>
            )}
          </div>
          <div className="space-y-2">
            {todayTasks.length === 0 && searchQuery ? (
              <div className="text-center py-4">
                <Search className="h-8 w-8 text-[#9ca3af] mx-auto mb-2" />
                <p className="text-sm text-[#9ca3af]">No tasks found for "{searchQuery}"</p>
              </div>
            ) : todayTasks.length === 0 ? (
              <div className="text-center py-4">
                <Calendar className="h-8 w-8 text-[#9ca3af] mx-auto mb-2" />
                <p className="text-sm text-[#9ca3af]">No tasks scheduled for today</p>
              </div>
            ) : (
              todayTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-2 bg-white/[0.03] rounded-lg border border-white/10">
                  <div className="text-xs text-[#9ca3af] w-16">
                    {task.dueTime || "All day"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#e6ebf4]">{task.title}</div>
                    <div className="text-xs text-[#9ca3af]">{task.estimatedTime}</div>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render goals view
  function renderGoalsView() {
    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#e6ebf4]">Goals & Milestones</h3>
          <Button
            size="sm"
            className="h-7 px-2 text-xs bg-[#7f5af0] hover:bg-[#7f5af0]/90"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Goal
          </Button>
        </div>

        {goals.map(goal => {
          const linkedTasksCount = goal.linkedTasks.length
          const completedTasksCount = goal.linkedTasks.filter(taskId => 
            tasks.find(t => t.id === taskId)?.completed
          ).length
          
          return (
            <Card key={goal.id} className="bg-white/[0.03] border-white/10 hover:bg-white/[0.05] transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#e6ebf4] mb-1">{goal.title}</h4>
                    <p className="text-xs text-[#9ca3af] mb-2">{goal.description}</p>
                    {goal.deadline && (
                      <div className="flex items-center space-x-1 text-xs text-[#9ca3af]">
                        <Calendar className="h-3 w-3" />
                        <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <Badge className={`${getPriorityColor(goal.priority)} text-xs`}>
                    {goal.priority}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">Progress</span>
                    <span className="text-[#e6ebf4] font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#9ca3af]">
                    <span>{completedTasksCount}/{linkedTasksCount} tasks completed</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 px-2 text-xs hover:text-[#7f5af0]"
                    >
                      View Tasks
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  // Render quick drafts
  function renderQuickDrafts() {
    if (!showQuickDrafts) return null;
    
    return (
      <div className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 pb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm sm:text-base font-semibold text-[#e6ebf4]">Quick Drafts</h3>
            {filteredQuickDrafts.length > 0 && (
              <Badge variant="secondary" className="text-xs bg-[#7f5af0]/20 border-[#7f5af0]/30 text-[#7f5af0] h-4 px-1">
                {filteredQuickDrafts.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowQuickDrafts(false)}
              className="h-6 sm:h-7 px-2 sm:px-3 text-xs text-[#9ca3af] hover:text-[#e6ebf4]"
            >
              <Archive className="h-3 w-3" />
              Hide
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              New Draft
            </Button>
          </div>
        </div>

        {filteredQuickDrafts.length > 0 && (
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
            <div className="space-y-2 sm:space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {filteredQuickDrafts.slice(0, 3).map(draft => (
                <Card
                  key={draft.id}
                  className="bg-gradient-to-r from-[#7f5af0]/5 via-[#8b5cf6]/5 to-[#7f5af0]/5 border-[#7f5af0]/20 backdrop-blur-sm cursor-pointer hover:bg-[#7f5af0]/10 transition-all duration-200"
                >
                  <CardContent className="p-2 sm:p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex items-center space-x-1">
                            {draft.type === "linkedin" && <Linkedin className="h-3 w-3 text-[#0077b5]" />}
                            {draft.type === "email" && <Mail className="h-3 w-3 text-[#9ca3af]" />}
                            {draft.type === "doc" && <FileText className="h-3 w-3 text-[#9ca3af]" />}
                            <span className="text-xs font-medium text-[#e6ebf4] capitalize truncate">
                              {draft.type}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-xs sm:text-sm font-medium text-[#e6ebf4] mb-1 truncate">
                          {draft.title}
                        </h4>
                        <p className="text-xs text-[#9ca3af] line-clamp-2 break-words">
                          {draft.content}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-wrap gap-1">
                            {draft.tags.slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-[#7f5af0]/10 border-[#7f5af0]/30 text-[#7f5af0] h-4 px-1"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-[#9ca3af]">
                            {new Date(draft.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredQuickDrafts.length === 0 && (
          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 text-center py-8">
            {searchQuery ? (
              <>
                <Search className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
                <p className="text-sm text-[#9ca3af]">No quick drafts match "{searchQuery}"</p>
              </>
            ) : (
              <>
                <PenTool className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
                <p className="text-sm text-[#9ca3af]">No quick drafts yet</p>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  // Render tasks view
  function renderTasksView() {
    const getTasksByTab = () => {
      switch (activeTab) {
        case "today":
          return todayTasks
        case "tomorrow":
          return tomorrowTasks
        case "missed":
          return missedTasks
        case "completed":
          return completedTasks
        default:
          return todayTasks
      }
    }

    const currentTasks = getTasksByTab()

    return (
      <div className="flex flex-col h-full">
        {/* Enhanced Task Tabs */}
        <div className="relative px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-white/5 backdrop-blur-sm bg-white/[0.02] flex-shrink-0">
          <div className="flex space-x-1 bg-white/[0.03] rounded-lg sm:rounded-xl p-1 border border-white/10">
            {[
              { id: "today", label: "Today", count: todayTasks.length, originalCount: allTodayTasks.length, color: "text-[#10b981]" },
              { id: "tomorrow", label: "Tomorrow", count: tomorrowTasks.length, originalCount: allTomorrowTasks.length, color: "text-[#facc15]" },
              { id: "missed", label: "Missed", count: missedTasks.length, originalCount: allMissedTasks.length, color: "text-[#ef4444]" },
              { id: "completed", label: "Done", count: completedTasks.length, originalCount: allCompletedTasks.length, color: "text-[#8b5cf6]" },
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
                    {searchQuery && tab.originalCount !== tab.count && (
                      <span className="opacity-60">/{tab.originalCount}</span>
                    )}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          {/* Search Results Indicator */}
          {searchQuery && (
            <div className="mt-2 text-xs text-[#9ca3af] flex items-center justify-between bg-[#7f5af0]/5 border border-[#7f5af0]/20 rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2">
                <Search className="h-3 w-3 text-[#7f5af0]" />
                <span>Searching for: <span className="text-[#e6ebf4] font-medium">"{searchQuery}"</span></span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-5 px-2 text-xs text-[#9ca3af] hover:text-[#e6ebf4]"
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
          {currentTasks.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              {searchQuery ? (
                <>
                  <Search className="h-12 w-12 sm:h-16 sm:w-16 text-[#9ca3af] mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#e6ebf4] mb-2">
                    No tasks found for "{searchQuery}"
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mb-4 sm:mb-6">
                    Try a different search term or clear the search to see all tasks
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-[#9ca3af] mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#e6ebf4] mb-2">
                    No tasks for {activeTab === "completed" ? "completed" : activeTab} yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mb-4 sm:mb-6">
                    {activeTab === "today" ? "Add some tasks to get started" : 
                     activeTab === "tomorrow" ? "Plan ahead and add some tasks for tomorrow" :
                     activeTab === "missed" ? "Great! No missed tasks" :
                     "Complete some tasks to see them here"}
                  </p>
                  {activeTab !== "completed" && activeTab !== "missed" && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#7f5af0] to-[#8b5cf6] hover:from-[#7f5af0]/90 hover:to-[#8b5cf6]/90 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-xs sm:text-sm h-7 sm:h-8"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Add {activeTab === "tomorrow" ? "Tomorrow's" : ""} Task
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            currentTasks.map((task, index) => renderTaskCard(task, index))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0b0f] via-[#0d0e11] to-[#111318] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '16px 16px'
      }} />
      
      {/* Enhanced Stats Header */}
      {renderStatsHeader()}

      {/* Focus Session Timer */}
      {renderFocusSession()}

      {/* Enhanced Focus Task */}
      {activeView === "tasks" && renderEnhancedFocusTask()}

      {/* Main Navigation */}
      <div className="relative px-3 sm:px-4 lg:px-6 py-3 border-b border-white/5 backdrop-blur-sm bg-white/[0.02] flex-shrink-0">
        {renderMainNavigation()}
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dynamic Content Based on Active View */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {activeView === "tasks" && renderTasksView()}
          {activeView === "calendar" && renderCalendarView()}
          {activeView === "goals" && renderGoalsView()}
          {activeView === "notes" && (
            <div className="p-4 text-center">
              <FileText className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#e6ebf4] mb-2">Notes & Documents</h3>
              <p className="text-sm text-[#9ca3af] mb-6">Lightweight Notion-style notes coming soon</p>
            </div>
          )}
          {activeView === "analytics" && (
            <div className="p-4 text-center">
              <BarChart3 className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#e6ebf4] mb-2">Analytics & Insights</h3>
              <p className="text-sm text-[#9ca3af] mb-6">Productivity insights and weekly reviews coming soon</p>
            </div>
          )}
          
          {/* AI Suggestions and Quick Drafts in scrollable area - only for tasks view */}
          {activeView === "tasks" && (
            <div className="flex-shrink-0">
              {renderEnhancedSuggestions()}
              {renderQuickDrafts()}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Add Task Input - Always Visible at Bottom */}
      <div className="border-t border-white/5 p-3 sm:p-4 lg:p-6 bg-white/[0.02] backdrop-blur-sm flex-shrink-0">
        <div className="flex space-x-2 sm:space-x-3">
          <Input
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Ask Toro anything... 'Draft investor update by Friday 2PM #fundraising'"
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
