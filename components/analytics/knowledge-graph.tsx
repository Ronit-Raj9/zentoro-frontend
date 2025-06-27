"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Star, 
  Circle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Play,
  Pause,
  Settings
} from "lucide-react"

interface Node {
  id: string
  type: "milestone" | "goal" | "task"
  title: string
  status: "completed" | "in-progress" | "pending" | "blocked"
  x: number
  y: number
  connections: string[]
  category: string
  description?: string
  completedDate?: string
  estimatedDuration?: string
  priority?: "high" | "medium" | "low"
}

interface KnowledgeGraphProps {
  fullScreen?: boolean
}

export default function KnowledgeGraph({ fullScreen = false }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(true)

  // Mock data for the knowledge graph
  const nodes: Node[] = [
    // Milestones (Major Stars)
    {
      id: "mvp-launch",
      type: "milestone",
      title: "MVP Launched",
      status: "completed",
      x: 400,
      y: 180,
      connections: ["user-auth", "basic-ui", "database-setup"],
      category: "Product",
      description: "Successfully launched minimum viable product",
      completedDate: "2024-01-15"
    },
    {
      id: "beta-testing",
      type: "milestone",
      title: "Beta Testing",
      status: "in-progress",
      x: 650,
      y: 300,
      connections: ["user-feedback", "bug-fixes", "performance-opt"],
      category: "Product",
      description: "Comprehensive beta testing phase",
      estimatedDuration: "3 weeks"
    },
    {
      id: "seed-funding",
      type: "milestone",
      title: "Seed Funding",
      status: "pending",
      x: 850,
      y: 120,
      connections: ["pitch-deck", "investor-meetings", "financial-projections"],
      category: "Business",
      description: "Secure seed funding round"
    },

    // Goals (Planets)
    {
      id: "user-auth",
      type: "goal",
      title: "User Authentication",
      status: "completed",
      x: 200,
      y: 120,
      connections: ["login-system", "signup-flow", "password-reset"],
      category: "Backend",
      completedDate: "2024-01-10"
    },
    {
      id: "basic-ui",
      type: "goal",
      title: "Basic UI Components",
      status: "completed",
      x: 280,
      y: 260,
      connections: ["component-library", "design-system", "responsive-layout"],
      category: "Frontend",
      completedDate: "2024-01-12"
    },
    {
      id: "database-setup",
      type: "goal",
      title: "Database Setup",
      status: "completed",
      x: 480,
      y: 100,
      connections: ["schema-design", "migrations"],
      category: "Backend",
      completedDate: "2024-01-05"
    },
    {
      id: "user-feedback",
      type: "goal",
      title: "User Feedback System",
      status: "in-progress",
      x: 520,
      y: 420,
      connections: ["feedback-form", "analytics-tracking", "user-surveys"],
      category: "Product",
      priority: "high"
    },
    {
      id: "pitch-deck",
      type: "goal",
      title: "Investor Pitch Deck",
      status: "in-progress",
      x: 750,
      y: 80,
      connections: ["market-analysis", "financial-model", "demo-video"],
      category: "Business",
      priority: "high"
    },
    {
      id: "bug-fixes",
      type: "goal",
      title: "Bug Fixes",
      status: "pending",
      x: 700,
      y: 380,
      connections: ["critical-bugs", "performance-issues"],
      category: "Product",
      priority: "high"
    },

    // Tasks (Moons)
    {
      id: "login-system",
      type: "task",
      title: "Login System",
      status: "completed",
      x: 100,
      y: 80,
      connections: [],
      category: "Backend",
      completedDate: "2024-01-08"
    },
    {
      id: "signup-flow",
      type: "task",
      title: "Signup Flow",
      status: "completed",
      x: 120,
      y: 180,
      connections: [],
      category: "Backend",
      completedDate: "2024-01-09"
    },
    {
      id: "password-reset",
      type: "task",
      title: "Password Reset",
      status: "completed",
      x: 220,
      y: 60,
      connections: [],
      category: "Backend",
      completedDate: "2024-01-11"
    },
    {
      id: "component-library",
      type: "task",
      title: "Component Library",
      status: "completed",
      x: 180,
      y: 320,
      connections: [],
      category: "Frontend",
      completedDate: "2024-01-10"
    },
    {
      id: "design-system",
      type: "task",
      title: "Design System",
      status: "completed",
      x: 300,
      y: 350,
      connections: [],
      category: "Frontend",
      completedDate: "2024-01-11"
    },
    {
      id: "schema-design",
      type: "task",
      title: "Schema Design",
      status: "completed",
      x: 450,
      y: 40,
      connections: [],
      category: "Backend",
      completedDate: "2024-01-03"
    },
    {
      id: "feedback-form",
      type: "task",
      title: "Feedback Form",
      status: "in-progress",
      x: 420,
      y: 480,
      connections: [],
      category: "Frontend",
      priority: "medium"
    },
    {
      id: "analytics-tracking",
      type: "task",
      title: "Analytics Tracking",
      status: "in-progress",
      x: 580,
      y: 480,
      connections: [],
      category: "Backend",
      priority: "medium"
    },
    {
      id: "market-analysis",
      type: "task",
      title: "Market Analysis",
      status: "completed",
      x: 680,
      y: 40,
      connections: [],
      category: "Business",
      completedDate: "2024-01-20"
    },
    {
      id: "financial-model",
      type: "task",
      title: "Financial Model",
      status: "in-progress",
      x: 820,
      y: 60,
      connections: [],
      category: "Business",
      priority: "high"
    },
    {
      id: "critical-bugs",
      type: "task",
      title: "Critical Bugs",
      status: "pending",
      x: 780,
      y: 420,
      connections: [],
      category: "Product",
      priority: "high"
    }
  ]

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 11, 15, 0.95)'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Apply zoom and offset
    ctx.save()
    ctx.translate(offset.x, offset.y)
    ctx.scale(zoom, zoom)

    // Draw connections first
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId)
        if (targetNode) {
          drawConnection(ctx, node, targetNode)
        }
      })
    })

    // Draw nodes
    nodes.forEach(node => {
      drawNode(ctx, node)
    })

    ctx.restore()
  }, [nodes, zoom, offset, selectedNode])

  const drawConnection = (ctx: CanvasRenderingContext2D, from: Node, to: Node) => {
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    
    // Connection styling based on status
    if (from.status === 'completed' && to.status === 'completed') {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)'
      ctx.lineWidth = 2
    } else if (from.status === 'in-progress' || to.status === 'in-progress') {
      ctx.strokeStyle = 'rgba(251, 204, 21, 0.6)'
      ctx.lineWidth = 2
    } else {
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)'
      ctx.lineWidth = 1
    }
    
    ctx.stroke()
  }

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node) => {
    let radius: number
    let glowColor: string
    let fillColor: string

    // Node size based on type
    switch (node.type) {
      case 'milestone':
        radius = 25
        break
      case 'goal':
        radius = 18
        break
      case 'task':
        radius = 12
        break
    }

    // Status-based styling
    switch (node.status) {
      case 'completed':
        glowColor = 'rgba(16, 185, 129, 0.8)'
        fillColor = '#10b981'
        break
      case 'in-progress':
        glowColor = 'rgba(251, 204, 21, 0.8)'
        fillColor = '#facc15'
        break
      case 'blocked':
        glowColor = 'rgba(239, 68, 68, 0.8)'
        fillColor = '#ef4444'
        break
      default:
        glowColor = 'rgba(156, 163, 175, 0.5)'
        fillColor = '#6b7280'
    }

    // Draw glow effect
    ctx.shadowColor = glowColor
    ctx.shadowBlur = node.status === 'completed' ? 20 : 10
    
    // Draw main node
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = fillColor
    ctx.fill()

    // Draw border
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Reset shadow
    ctx.shadowBlur = 0

    // Draw node icon
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${radius * 0.6}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    let symbol = ''
    switch (node.type) {
      case 'milestone':
        symbol = '★'
        break
      case 'goal':
        symbol = '●'
        break
      case 'task':
        symbol = '○'
        break
    }
    
    ctx.fillText(symbol, node.x, node.y)

    // Draw node title/label
    ctx.fillStyle = '#ffffff'
    ctx.font = `${Math.max(10, radius * 0.4)}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    
    // Position label below the node
    const labelY = node.y + radius + 8
    
    // Handle long titles by wrapping text
    const maxWidth = radius * 4 // Maximum width for text
    const words = node.title.split(' ')
    let lines: string[] = []
    let currentLine = ''
    
    // Simple text wrapping
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word
      const testWidth = ctx.measureText(testLine).width
      
      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) {
      lines.push(currentLine)
    }
    
    // Limit to 2 lines for cleaner display
    if (lines.length > 2) {
      lines = lines.slice(0, 2)
      lines[1] = lines[1].substring(0, 8) + '...'
    }
    
    // Draw text with background for better readability
    const lineHeight = 14
    const totalHeight = lines.length * lineHeight
    const bgPadding = 4
    
    // Draw background rectangle for text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(
      node.x - maxWidth/2 - bgPadding,
      labelY - bgPadding,
      maxWidth + bgPadding * 2,
      totalHeight + bgPadding * 2
    )
    
    // Draw the text lines
    ctx.fillStyle = '#ffffff'
    lines.forEach((line, index) => {
      ctx.fillText(line, node.x, labelY + index * lineHeight)
    })

    // Highlight selected node
    if (selectedNode?.id === node.id) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius + 5, 0, 2 * Math.PI)
      ctx.strokeStyle = '#7f5af0'
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Highlight the text background for selected node
      ctx.strokeStyle = '#7f5af0'
      ctx.lineWidth = 2
      ctx.strokeRect(
        node.x - maxWidth/2 - bgPadding,
        labelY - bgPadding,
        maxWidth + bgPadding * 2,
        totalHeight + bgPadding * 2
      )
    }
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - offset.x) / zoom
    const y = (event.clientY - rect.top - offset.y) / zoom

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const radius = node.type === 'milestone' ? 25 : node.type === 'goal' ? 18 : 12
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      return distance <= radius
    })

    setSelectedNode(clickedNode || null)
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2
      return Math.max(0.3, Math.min(3, newZoom))
    })
  }

  const resetView = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSelectedNode(null)
  }

  return (
    <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 ${fullScreen ? 'h-full' : 'h-full'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-white flex items-center">
          <Target className="h-6 w-6 mr-3 text-[#facc15]" />
          Knowledge Graph
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom('out')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom('in')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAnimating(!isAnimating)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className="relative h-full">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-pointer"
            style={{ minHeight: fullScreen ? '70vh' : '400px' }}
          />
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-3">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#10b981]"></div>
                <span className="text-gray-300">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#facc15]"></div>
                <span className="text-gray-300">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#6b7280]"></div>
                <span className="text-gray-300">Pending</span>
              </div>
            </div>
          </div>

          {/* Node Details Panel */}
          {selectedNode && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10 max-w-xs">
              <div className="flex items-center justify-between mb-3">
                <Badge className={`${
                  selectedNode.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  selectedNode.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}>
                  {selectedNode.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ×
                </Button>
              </div>
              <h4 className="text-white font-semibold mb-2">{selectedNode.title}</h4>
              {selectedNode.description && (
                <p className="text-gray-300 text-sm mb-3">{selectedNode.description}</p>
              )}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{selectedNode.category}</span>
                </div>
                {selectedNode.completedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completed:</span>
                    <span className="text-white">{selectedNode.completedDate}</span>
                  </div>
                )}
                {selectedNode.estimatedDuration && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{selectedNode.estimatedDuration}</span>
                  </div>
                )}
                {selectedNode.priority && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priority:</span>
                    <span className={`${
                      selectedNode.priority === 'high' ? 'text-red-400' :
                      selectedNode.priority === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {selectedNode.priority}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 