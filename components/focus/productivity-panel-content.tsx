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
        return "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 border border-red-500/20 backdrop-blur-sm"
      case "Medium":
        return "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-sm"
      case "Low":
        return "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm"
      default:
        return "bg-gradient-to-r from-slate-500/10 to-gray-500/10 text-slate-400 border border-slate-500/20 backdrop-blur-sm"
    }
  }

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case "chat":
        return <MessageSquare className="h-3 w-3 text-violet-400" />
      case "ai-suggestion":
        return <Brain className="h-3 w-3 text-indigo-400" />
      default:
        return <Circle className="h-3 w-3 text-slate-400" />
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
    <div className="space-y-4">
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
              className={`h-9 px-4 text-sm font-medium transition-all duration-300 ${
                activeView === item.id 
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border-0" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-700/50"
              }`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className={`h-9 w-9 p-0 transition-all duration-300 border ${
              showSearch || searchQuery 
                ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" 
                : "text-slate-400 hover:text-white border-slate-700/50 hover:bg-slate-800/50"
            }`}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-1 pb-3">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, suggestions, drafts..."
              className="flex-1 bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-indigo-500/50 focus:ring-indigo-500/20 backdrop-blur-sm text-sm h-10 pl-10 rounded-xl"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1 h-8 w-8 p-0 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-3 text-sm text-slate-400 flex items-center justify-between bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-2">
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
                className="h-6 px-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Quick Toggle Bar for Tasks View - Only show if at least one section is hidden */}
      {activeView === "tasks" && (!showAISuggestions || !showQuickDrafts) && (
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400 font-medium">Panel Controls:</span>
            {!showAISuggestions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAISuggestions(true)}
                className="h-8 px-4 text-sm transition-all duration-300 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-slate-700/50 hover:border-emerald-500/30"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Show AI Suggestions
              </Button>
            )}
            {!showQuickDrafts && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuickDrafts(true)}
                className="h-8 px-4 text-sm transition-all duration-300 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 border border-slate-700/50 hover:border-violet-500/30"
              >
                <PenTool className="h-4 w-4 mr-2" />
                Show Quick Drafts
              </Button>
            )}
          </div>
          <div className="text-sm text-slate-400">
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
      <div className="relative px-6 py-4 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 backdrop-blur-sm">
        <Card className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 border border-indigo-500/20 backdrop-blur-sm shadow-xl shadow-indigo-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white break-words">
                  {focusTask.title}
                </h3>
                <p className="text-sm text-indigo-200 break-words">Focus Task of the Day</p>
              </div>
              <Badge className={`text-sm font-medium ${getPriorityColor(focusTask.priority)} flex-shrink-0`}>
                {focusTask.priority}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-6 flex-wrap gap-2">
                {focusTask.dueTime && (
                  <span className="flex items-center space-x-2 text-slate-300">
                    <Clock className="h-4 w-4" />
                    <span>{focusTask.dueTime}</span>
                  </span>
                )}
                {focusTask.estimatedTime && (
                  <span className="flex items-center space-x-2 text-slate-300">
                    <Timer className="h-4 w-4" />
                    <span>{focusTask.estimatedTime}</span>
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => startFocusSession(focusTask.id)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 text-sm h-10 px-6 rounded-xl font-medium"
              >
                Start Focus Session
              </Button>
            </div>

            {focusTask.tags && focusTask.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {focusTask.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-slate-800/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 transition-colors px-3 py-1"
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
      <div className="border-t border-slate-700/50 bg-gradient-to-b from-emerald-600/5 to-teal-600/5 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Suggestions</h3>
            {filteredSuggestions.length > 0 && (
              <Badge variant="secondary" className="text-sm bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-3 py-1">
                {filteredSuggestions.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAISuggestions(false)}
              className="h-9 px-4 text-sm text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <Archive className="h-4 w-4 mr-2" />
              Hide
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredSuggestions.length > 0 && (
          <div className="px-6 pb-6">
            <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
              {filteredSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 border border-emerald-500/20 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-white text-base break-words">
                            {suggestion.title}
                          </h4>
                          <Badge className={`text-sm font-medium ${getPriorityColor(suggestion.priority)}`}>
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-300 mb-3 break-words leading-relaxed">{suggestion.reason}</p>
                        {suggestion.goalAlignment && (
                          <p className="text-sm text-emerald-400 font-medium break-words flex items-center">
                            <Target className="h-4 w-4 mr-2" />
                            {suggestion.goalAlignment}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => acceptSuggestion(suggestion)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 text-sm h-9 px-5 mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 rounded-xl font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredSuggestions.length === 0 && (
          <div className="px-6 pb-6 text-center py-12">
            {searchQuery ? (
              <>
                <Search className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-sm text-slate-400">No AI suggestions match "{searchQuery}"</p>
              </>
            ) : (
              <>
                <Sparkles className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-sm text-slate-400">No AI suggestions available right now</p>
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
      className={`transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl animate-fadeIn group ${
        task.isMissed 
          ? "bg-gradient-to-r from-red-600/5 to-pink-600/5 border border-red-500/20 hover:border-red-500/30 hover:shadow-red-500/10"
          : "bg-gradient-to-r from-slate-800/20 to-slate-700/20 border border-slate-700/30 hover:border-slate-600/40 hover:shadow-slate-500/5"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start space-x-4">
          {task.isMissed ? (
            <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTask(task.id)}
              className="p-0 h-auto hover:bg-transparent mt-1 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 transition-colors" />
              ) : (
                <Circle className="h-5 w-5 text-slate-400 hover:text-indigo-400 transition-colors" />
              )}
            </Button>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className={`font-bold text-base break-words flex-1 transition-colors ${
                task.completed ? "line-through opacity-60 text-slate-400" : "text-white group-hover:text-indigo-100"
              }`}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-3 mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                <Badge className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                {getSourceIcon(task.source)}
              </div>
            </div>

            {task.context && (
              <p className="text-sm text-slate-300 mb-3 italic break-words leading-relaxed bg-slate-800/20 border border-slate-700/30 rounded-lg p-3">
                {task.context}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-6 flex-wrap gap-2">
                {task.dueTime && (
                  <span className="flex items-center space-x-2 text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{task.dueTime}</span>
                  </span>
                )}
                {task.estimatedTime && (
                  <span className="flex items-center space-x-2 text-slate-400">
                    <Timer className="h-4 w-4" />
                    <span>{task.estimatedTime}</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {task.goalId && getGoalProgress(task.goalId) && (
                  <div className="flex items-center space-x-2 text-indigo-400">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">{getGoalProgress(task.goalId)}%</span>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startFocusSession(task.id)}
                  className="h-8 px-4 text-sm text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 rounded-lg font-medium"
                >
                  <Timer className="h-4 w-4 mr-2" />
                  Focus
                </Button>
              </div>
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {task.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-slate-800/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 transition-colors px-3 py-1 rounded-lg"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {(task.notes || task.linkedDocuments?.length || task.linkedChats?.length) && (
              <div className="mt-4 pt-4 border-t border-slate-700/30">
                {task.notes && (
                  <p className="text-sm text-slate-300 mb-3 break-words italic bg-indigo-600/5 border border-indigo-500/20 rounded-lg p-3">
                    📝 {task.notes}
                  </p>
                )}
                <div className="flex items-center space-x-6 text-sm">
                  {task.linkedDocuments?.length && (
                    <span className="flex items-center space-x-2 text-slate-400">
                      <FileText className="h-4 w-4" />
                      <span>{task.linkedDocuments.length} docs</span>
                    </span>
                  )}
                  {task.linkedChats?.length && (
                    <span className="flex items-center space-x-2 text-slate-400">
                      <MessageSquare className="h-4 w-4" />
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
      <div className="relative p-6 border-b border-slate-700/50 backdrop-blur-sm bg-gradient-to-r from-slate-900/50 to-slate-800/50 flex-shrink-0">
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/25" />
              <span className="text-slate-300 font-medium">
                {tasks.filter(t => t.priority === "High" && !t.completed).length} High Priority
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <span className="text-amber-400 font-bold">3 Day Streak</span>
            </div>
          </div>
          
          {focusSession && (
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/25" />
              <span className="text-emerald-400 font-medium">Focus Active</span>
            </div>
          )}
        </div>
        
        {/* Enhanced progress indicators */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm shadow-lg">
            <div className="text-2xl font-bold text-emerald-400 mb-1">
              {todayTasks.length}
              {searchQuery && allTodayTasks.length !== todayTasks.length && (
                <span className="text-sm text-slate-400 ml-2">/{allTodayTasks.length}</span>
              )}
            </div>
            <div className="text-sm text-slate-400 font-medium">Today</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-2xl border border-amber-500/20 backdrop-blur-sm shadow-lg">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {tomorrowTasks.length}
              {searchQuery && allTomorrowTasks.length !== tomorrowTasks.length && (
                <span className="text-sm text-slate-400 ml-2">/{allTomorrowTasks.length}</span>
              )}
            </div>
            <div className="text-sm text-slate-400 font-medium">Tomorrow</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-2xl border border-red-500/20 backdrop-blur-sm shadow-lg">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {missedTasks.length}
              {searchQuery && allMissedTasks.length !== missedTasks.length && (
                <span className="text-sm text-slate-400 ml-2">/{allMissedTasks.length}</span>
              )}
            </div>
            <div className="text-sm text-slate-400 font-medium">Missed</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-violet-600/10 to-purple-600/10 rounded-2xl border border-violet-500/20 backdrop-blur-sm shadow-lg">
            <div className="text-2xl font-bold text-violet-400 mb-1">
              {completedTasks.length}
              {searchQuery && allCompletedTasks.length !== completedTasks.length && (
                <span className="text-sm text-slate-400 ml-2">/{allCompletedTasks.length}</span>
              )}
            </div>
            <div className="text-sm text-slate-400 font-medium">Done</div>
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
      <div className="relative p-6 border-b border-slate-700/50 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Timer className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Focus Session</h3>
              <p className="text-sm text-emerald-200">{focusSession.type} - {tasks.find(t => t.id === focusSession.taskId)?.title}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={stopFocusSession}
            className="h-10 w-10 p-0 text-slate-400 hover:text-red-400 border border-slate-700/50 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 rounded-xl"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold text-emerald-400 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={pauseFocusSession}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 h-10 px-6 rounded-xl font-medium"
            >
              {focusSession.isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
              {focusSession.isPaused ? "Resume" : "Pause"}
            </Button>
          </div>
        </div>

        <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000 shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  // Render calendar view
  function renderCalendarView() {
    return (
      <div className="space-y-6 p-6">
        {/* Week navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("prev")}
            className="h-10 w-10 p-0 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 rounded-xl transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-lg font-bold text-white">
            {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("next")}
            className="h-10 w-10 p-0 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 rounded-xl transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-3">
          {getWeekDays().map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString()
            const dayTasks = tasks.filter(task => task.dueDate === day.toISOString().split('T')[0])
            
            return (
              <div
                key={index}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                  isToday 
                    ? "bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/30 shadow-lg" 
                    : "bg-gradient-to-br from-slate-800/20 to-slate-700/20 border-slate-700/30 hover:border-slate-600/40"
                }`}
              >
                <div className="text-sm text-slate-400 mb-2 font-medium">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? "text-indigo-400" : "text-white"}`}>
                  {day.getDate()}
                </div>
                {dayTasks.length > 0 && (
                  <div className="flex justify-center mt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/25" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Today's schedule */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Today's Schedule</h3>
            {searchQuery && (
              <div className="text-sm text-slate-400">
                {todayTasks.length} of {allTodayTasks.length} tasks
              </div>
            )}
          </div>
          <div className="space-y-3">
            {todayTasks.length === 0 && searchQuery ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No tasks found for "{searchQuery}"</p>
              </div>
            ) : todayTasks.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No tasks scheduled for today</p>
              </div>
            ) : (
              todayTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-800/20 to-slate-700/20 border border-slate-700/30 rounded-2xl hover:border-slate-600/40 transition-all duration-300">
                  <div className="text-sm text-slate-400 w-20 font-medium">
                    {task.dueTime || "All day"}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-white">{task.title}</div>
                    <div className="text-sm text-slate-400">{task.estimatedTime}</div>
                  </div>
                  <Badge className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
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
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Goals & Milestones</h3>
          <Button
            size="sm"
            className="h-9 px-5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 rounded-xl font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {goals.map(goal => {
          const linkedTasksCount = goal.linkedTasks.length
          const completedTasksCount = goal.linkedTasks.filter(taskId => 
            tasks.find(t => t.id === taskId)?.completed
          ).length
          
          return (
            <Card key={goal.id} className="bg-gradient-to-r from-slate-800/20 to-slate-700/20 border border-slate-700/30 hover:border-slate-600/40 hover:shadow-lg hover:shadow-slate-500/5 transition-all duration-300 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-2 text-lg">{goal.title}</h4>
                    <p className="text-sm text-slate-300 mb-3 leading-relaxed">{goal.description}</p>
                    {goal.deadline && (
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <Badge className={`${getPriorityColor(goal.priority)} text-sm font-medium`}>
                    {goal.priority}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Progress</span>
                    <span className="text-white font-bold text-lg">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{completedTasksCount}/{linkedTasksCount} tasks completed</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-4 text-sm hover:text-indigo-400 border border-slate-700/50 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300 rounded-lg font-medium"
                    >
                      View Tasks
                      <ArrowRight className="h-4 w-4 ml-2" />
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
      <div className="border-t border-slate-700/50 bg-gradient-to-b from-violet-600/5 to-purple-600/5 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Quick Drafts</h3>
            {filteredQuickDrafts.length > 0 && (
              <Badge variant="secondary" className="text-sm bg-violet-500/10 border-violet-500/30 text-violet-400 px-3 py-1">
                {filteredQuickDrafts.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowQuickDrafts(false)}
              className="h-9 px-4 text-sm text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <Archive className="h-4 w-4 mr-2" />
              Hide
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 text-sm h-9 px-5 rounded-xl font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Draft
            </Button>
          </div>
        </div>

        {filteredQuickDrafts.length > 0 && (
          <div className="px-6 pb-6">
            <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
              {filteredQuickDrafts.slice(0, 3).map(draft => (
                <Card
                  key={draft.id}
                  className="bg-gradient-to-r from-violet-600/5 via-purple-600/5 to-pink-600/5 border border-violet-500/20 backdrop-blur-sm cursor-pointer hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            {draft.type === "linkedin" && <Linkedin className="h-4 w-4 text-blue-400" />}
                            {draft.type === "email" && <Mail className="h-4 w-4 text-slate-400" />}
                            {draft.type === "doc" && <FileText className="h-4 w-4 text-slate-400" />}
                            <span className="text-sm font-bold text-white capitalize truncate">
                              {draft.type}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2 truncate">
                          {draft.title}
                        </h4>
                        <p className="text-sm text-slate-300 line-clamp-2 break-words leading-relaxed">
                          {draft.content}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-wrap gap-2">
                            {draft.tags.slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-violet-500/10 border-violet-500/30 text-violet-400 px-3 py-1 rounded-lg"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-sm text-slate-400 font-medium">
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
          <div className="px-6 pb-6 text-center py-12">
            {searchQuery ? (
              <>
                <Search className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-sm text-slate-400">No quick drafts match "{searchQuery}"</p>
              </>
            ) : (
              <>
                <PenTool className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-sm text-slate-400">No quick drafts yet</p>
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
        <div className="relative px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm bg-gradient-to-r from-slate-900/50 to-slate-800/50 flex-shrink-0">
          <div className="flex space-x-2 bg-slate-800/30 rounded-2xl p-2 border border-slate-700/50">
            {[
              { id: "today", label: "Today", count: todayTasks.length, originalCount: allTodayTasks.length, color: "text-emerald-400" },
              { id: "tomorrow", label: "Tomorrow", count: tomorrowTasks.length, originalCount: allTomorrowTasks.length, color: "text-amber-400" },
              { id: "missed", label: "Missed", count: missedTasks.length, originalCount: allMissedTasks.length, color: "text-red-400" },
              { id: "completed", label: "Done", count: completedTasks.length, originalCount: allCompletedTasks.length, color: "text-violet-400" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 transition-all duration-300 text-sm font-medium h-10 px-4 rounded-xl ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25" 
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span className="font-bold truncate">{tab.label}</span>
                {tab.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-3 text-xs ${tab.color} bg-current/20 border-current/30 px-2 py-1 rounded-lg font-bold`}
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
            <div className="mt-4 text-sm text-slate-400 flex items-center justify-between bg-indigo-600/5 border border-indigo-500/20 rounded-xl px-4 py-3">
              <div className="flex items-center space-x-3">
                <Search className="h-4 w-4 text-indigo-400" />
                <span>Searching for: <span className="text-white font-bold">"{searchQuery}"</span></span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-7 px-3 text-xs text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 rounded-lg"
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="flex-1 p-6 space-y-4">
          {currentTasks.length === 0 ? (
            <div className="text-center py-16">
              {searchQuery ? (
                <>
                  <Search className="h-20 w-20 text-slate-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    No tasks found for "{searchQuery}"
                  </h3>
                  <p className="text-sm text-slate-400 mb-8">
                    Try a different search term or clear the search to see all tasks
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 text-sm h-10 px-6 rounded-xl font-medium"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <Calendar className="h-20 w-20 text-slate-500 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    No tasks for {activeTab === "completed" ? "completed" : activeTab} yet
                  </h3>
                  <p className="text-sm text-slate-400 mb-8">
                    {activeTab === "today" ? "Add some tasks to get started" : 
                     activeTab === "tomorrow" ? "Plan ahead and add some tasks for tomorrow" :
                     activeTab === "missed" ? "Great! No missed tasks" :
                     "Complete some tasks to see them here"}
                  </p>
                  {activeTab !== "completed" && activeTab !== "missed" && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 text-sm h-10 px-6 rounded-xl font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
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
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Modern background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`,
      }} />
      
      {/* Enhanced Stats Header */}
      {renderStatsHeader()}

      {/* Focus Session Timer */}
      {renderFocusSession()}

      {/* Enhanced Focus Task */}
      {activeView === "tasks" && renderEnhancedFocusTask()}

      {/* Main Navigation */}
      <div className="relative px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm bg-gradient-to-r from-slate-900/50 to-slate-800/50 flex-shrink-0">
        {renderMainNavigation()}
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dynamic Content Based on Active View */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600">
          {activeView === "tasks" && renderTasksView()}
          {activeView === "calendar" && renderCalendarView()}
          {activeView === "goals" && renderGoalsView()}
          {activeView === "notes" && (
            <div className="p-8 text-center">
              <FileText className="h-20 w-20 text-slate-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Notes & Documents</h3>
              <p className="text-sm text-slate-400 mb-8">Lightweight Notion-style notes coming soon</p>
            </div>
          )}
          {activeView === "analytics" && (
            <div className="p-8 text-center">
              <BarChart3 className="h-20 w-20 text-slate-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Analytics & Insights</h3>
              <p className="text-sm text-slate-400 mb-8">Productivity insights and weekly reviews coming soon</p>
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
      <div className="border-t border-slate-700/50 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex space-x-4">
          <Input
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Ask Toro anything... 'Draft investor update by Friday 2PM #fundraising'"
            className="flex-1 bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-indigo-500/50 focus:ring-indigo-500/20 backdrop-blur-sm text-sm h-12 px-4 rounded-2xl font-medium"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button
            onClick={addTask}
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex-shrink-0 h-12 w-12 p-0 rounded-2xl"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
