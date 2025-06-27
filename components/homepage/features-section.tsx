"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Bot, BarChart3, Zap, MessageSquare, Target } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      id: "focus",
      icon: Brain,
      title: "🧠 Focus Page",
      description: "A smart battlefield to plan your day, tasks, and founder flow",
      details:
        "AI-powered task prioritization, smart scheduling, and context-aware reminders that adapt to your startup phase.",
      gradient: "from-[#7f5af0] to-[#a855f7]",
    },
    {
      id: "agents",
      icon: Bot,
      title: "🤖 Agent Marketplace",
      description: "Use AI agents to write posts, generate images, analyze goals — all from chat",
      details:
        "Deploy specialized agents for content creation, market analysis, competitor research, and strategic planning.",
      gradient: "from-[#10b981] to-[#059669]",
    },
    {
      id: "rituals",
      icon: BarChart3,
      title: "📊 Founder Rituals",
      description: "Stay accountable with weekly reflections, habit tracking, and performance review",
      details:
        "Build sustainable founder habits with guided reflections, progress tracking, and accountability systems.",
      gradient: "from-[#facc15] to-[#f59e0b]",
    },
    {
      id: "intelligence",
      icon: Zap,
      title: "🧬 Toro Intelligence",
      description: "AI with memory — knows your tone, remembers your progress, nudges you",
      details:
        "Your personal AI that learns your communication style, tracks your goals, and provides contextual insights.",
      gradient: "from-[#ef4444] to-[#dc2626]",
    },
    {
      id: "chat",
      icon: MessageSquare,
      title: "💬 Smart Terminal",
      description: "Command your startup from a single chat interface",
      details: "Natural language commands to create tasks, schedule meetings, analyze data, and execute strategies.",
      gradient: "from-[#8b5cf6] to-[#7c3aed]",
    },
    {
      id: "execution",
      icon: Target,
      title: "🎯 Execution Engine",
      description: "Turn ideas into action with intelligent workflow automation",
      details: "Automated workflows that connect your thoughts to tasks, tasks to outcomes, and outcomes to growth.",
      gradient: "from-[#06b6d4] to-[#0891b2]",
    },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7f5af0]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] bg-clip-text text-transparent">Execute</span>
          </h2>
          <p className="text-xl text-[#9ca3af] max-w-3xl mx-auto">
            Zentoro combines AI intelligence with founder-focused tools to create the ultimate execution environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={feature.id}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-[#e6ebf4]">{feature.title}</h3>

                  <p className="text-[#9ca3af] mb-4 leading-relaxed">{feature.description}</p>

                  <p className="text-sm text-[#9ca3af]/80 leading-relaxed">{feature.details}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
