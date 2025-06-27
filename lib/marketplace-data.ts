export interface Agent {
  id: number
  name: string
  description: string
  creator: string
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  downloads: number
  pricing: {
    type: "free" | "subscription" | "pay-per-use" | "perpetual"
    amount: number
    model: string
  }
  createdAt: string
  updatedAt: string
  featured: boolean
  compatibility: string[]
}

export interface AgentFilters {
  categories: string[]
  price: string[]
  monetization: string[]
  rating: number
  compatibility: string[]
}

export const mockAgents: Agent[] = [
  {
    id: 1,
    name: "ContentCraft Pro",
    description:
      "Advanced AI agent for creating high-quality blog posts, social media content, and marketing copy. Leverages GPT-4 for human-like writing with brand voice consistency.",
    creator: "ContentLabs",
    category: "Content Generation",
    tags: ["writing", "marketing", "social-media", "seo"],
    rating: 4.8,
    reviewCount: 342,
    downloads: 15420,
    pricing: {
      type: "subscription",
      amount: 29,
      model: "subscription",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    featured: true,
    compatibility: ["OpenAI GPT-4", "Claude 3.5"],
  },
  {
    id: 2,
    name: "TaskMaster AI",
    description:
      "Intelligent task management and productivity optimization agent. Automatically prioritizes tasks, schedules meetings, and provides productivity insights.",
    creator: "ProductivityCorp",
    category: "Productivity",
    tags: ["task-management", "scheduling", "productivity", "automation"],
    rating: 4.6,
    reviewCount: 189,
    downloads: 8930,
    pricing: {
      type: "free",
      amount: 0,
      model: "free",
    },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Google Gemini"],
  },
  {
    id: 3,
    name: "SupportBot Elite",
    description:
      "24/7 customer support agent with advanced natural language understanding. Handles complex queries, escalates when needed, and learns from interactions.",
    creator: "SupportTech",
    category: "Customer Support",
    tags: ["customer-service", "chatbot", "support", "automation"],
    rating: 4.9,
    reviewCount: 567,
    downloads: 23100,
    pricing: {
      type: "pay-per-use",
      amount: 0.05,
      model: "pay-per-use",
    },
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
    featured: true,
    compatibility: ["OpenAI GPT-4", "Claude 3.5", "Local Models"],
  },
  {
    id: 4,
    name: "FinanceGuru",
    description:
      "Comprehensive financial analysis and reporting agent. Processes financial data, generates insights, and creates detailed reports for businesses.",
    creator: "FinTech Solutions",
    category: "Finance",
    tags: ["finance", "analysis", "reporting", "data"],
    rating: 4.7,
    reviewCount: 234,
    downloads: 12450,
    pricing: {
      type: "perpetual",
      amount: 199,
      model: "perpetual",
    },
    createdAt: "2024-01-08",
    updatedAt: "2024-01-17",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Google Gemini"],
  },
  {
    id: 5,
    name: "IoT Commander",
    description:
      "Smart home and IoT device management agent. Controls devices, monitors systems, and provides intelligent automation based on usage patterns.",
    creator: "SmartHome Inc",
    category: "IoT",
    tags: ["iot", "smart-home", "automation", "monitoring"],
    rating: 4.4,
    reviewCount: 156,
    downloads: 6780,
    pricing: {
      type: "subscription",
      amount: 19,
      model: "subscription",
    },
    createdAt: "2024-01-12",
    updatedAt: "2024-01-16",
    featured: false,
    compatibility: ["Local Models", "OpenAI GPT-4"],
  },
  {
    id: 6,
    name: "DataViz Master",
    description:
      "Advanced data visualization and analytics agent. Creates stunning charts, dashboards, and interactive reports from raw data.",
    creator: "DataCorp",
    category: "Analytics",
    tags: ["data-visualization", "analytics", "charts", "dashboards"],
    rating: 4.5,
    reviewCount: 298,
    downloads: 11200,
    pricing: {
      type: "subscription",
      amount: 39,
      model: "subscription",
    },
    createdAt: "2024-01-06",
    updatedAt: "2024-01-21",
    featured: true,
    compatibility: ["OpenAI GPT-4", "Claude 3.5", "Google Gemini"],
  },
  {
    id: 7,
    name: "CodeReview Assistant",
    description:
      "AI-powered code review and optimization agent. Analyzes code quality, suggests improvements, and identifies potential security vulnerabilities.",
    creator: "DevTools Pro",
    category: "Productivity",
    tags: ["code-review", "development", "security", "optimization"],
    rating: 4.8,
    reviewCount: 445,
    downloads: 18900,
    pricing: {
      type: "free",
      amount: 0,
      model: "free",
    },
    createdAt: "2024-01-03",
    updatedAt: "2024-01-20",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Claude 3.5"],
  },
  {
    id: 8,
    name: "EmailCraft Pro",
    description:
      "Professional email writing and management agent. Composes emails, manages responses, and maintains consistent communication tone.",
    creator: "EmailSolutions",
    category: "Content Generation",
    tags: ["email", "communication", "writing", "automation"],
    rating: 4.6,
    reviewCount: 321,
    downloads: 14560,
    pricing: {
      type: "subscription",
      amount: 15,
      model: "subscription",
    },
    createdAt: "2024-01-09",
    updatedAt: "2024-01-18",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Google Gemini"],
  },
  {
    id: 9,
    name: "TradingBot Alpha",
    description:
      "Intelligent trading analysis and strategy agent. Analyzes market trends, provides trading signals, and manages risk assessment.",
    creator: "TradeTech",
    category: "Finance",
    tags: ["trading", "market-analysis", "finance", "risk-management"],
    rating: 4.3,
    reviewCount: 178,
    downloads: 9340,
    pricing: {
      type: "pay-per-use",
      amount: 0.1,
      model: "pay-per-use",
    },
    createdAt: "2024-01-11",
    updatedAt: "2024-01-19",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Claude 3.5"],
  },
  {
    id: 10,
    name: "MeetingMaster",
    description:
      "Comprehensive meeting management agent. Schedules meetings, takes notes, generates summaries, and tracks action items automatically.",
    creator: "MeetingTech",
    category: "Productivity",
    tags: ["meetings", "scheduling", "notes", "productivity"],
    rating: 4.7,
    reviewCount: 267,
    downloads: 13780,
    pricing: {
      type: "subscription",
      amount: 25,
      model: "subscription",
    },
    createdAt: "2024-01-07",
    updatedAt: "2024-01-21",
    featured: true,
    compatibility: ["OpenAI GPT-4", "Google Gemini", "Local Models"],
  },
  {
    id: 11,
    name: "SocialMedia Genius",
    description:
      "Complete social media management agent. Creates posts, schedules content, analyzes engagement, and optimizes social media strategy.",
    creator: "SocialTech",
    category: "Content Generation",
    tags: ["social-media", "content", "marketing", "analytics"],
    rating: 4.5,
    reviewCount: 389,
    downloads: 16720,
    pricing: {
      type: "subscription",
      amount: 35,
      model: "subscription",
    },
    createdAt: "2024-01-04",
    updatedAt: "2024-01-20",
    featured: false,
    compatibility: ["OpenAI GPT-4", "Claude 3.5"],
  },
  {
    id: 12,
    name: "HelpDesk Pro",
    description:
      "Advanced help desk and ticket management agent. Automatically categorizes tickets, provides solutions, and escalates complex issues.",
    creator: "SupportSystems",
    category: "Customer Support",
    tags: ["helpdesk", "tickets", "support", "automation"],
    rating: 4.8,
    reviewCount: 456,
    downloads: 21340,
    pricing: {
      type: "perpetual",
      amount: 299,
      model: "perpetual",
    },
    createdAt: "2024-01-02",
    updatedAt: "2024-01-19",
    featured: true,
    compatibility: ["OpenAI GPT-4", "Claude 3.5", "Google Gemini"],
  },
]
