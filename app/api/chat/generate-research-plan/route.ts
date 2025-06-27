import { NextRequest, NextResponse } from 'next/server'
import GroqAPI, { type GroqMessage } from '@/lib/groq-api'
import { config } from '@/lib/config'

const groq = new GroqAPI(config.groq.apiKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query string is required' }, { status: 400 })
    }

    const messages: GroqMessage[] = [
      {
        role: 'system',
        content: `You are Toro's research strategist - combining Y Combinator partner insights + McKinsey analytical rigor + startup founder wisdom.

MISSION: Generate focused research plan for strategic startup guidance.

OUTPUT FORMAT (STRICT):
{
  "search_queries": [
    {"text": "specific, actionable query 1"},
    {"text": "strategic market query 2"},
    {"text": "implementation query 3"}
  ],
  "search_sources": [
    {"title": "Premium startup/VC insight", "domain": "authoritative-domain.com", "icon_emoji": "🚀"},
    {"title": "Strategic implementation guide", "domain": "expert-platform.com", "icon_emoji": "🔧"},
    {"title": "Market intelligence report", "domain": "industry-source.com", "icon_emoji": "📊"}
  ]
}

QUALITY STANDARDS:
🎯 **Search Queries**: Specific, decision-driving, startup-focused
📚 **Sources**: Authoritative domains, practical insights, current relevance

PREMIUM DOMAINS:
- VCs: ycombinator.com, a16z.com, sequoiacap.com, firstround.com
- Strategy: mckinsey.com, bcg.com, hbr.org, stripe.com
- Tech/Product: github.com, notion.com, figma.com, linear.app
- Growth: hubspot.com, intercom.com, mixpanel.com
- News: techcrunch.com, theinformation.com, venturebeat.com

🎨 **Icons**: 🚀 VC/Startup | 🔧 Technical | 📊 Data/Reports | 💡 Strategy | 📈 Growth

Focus: Startup-relevant, actionable intelligence that accelerates founder decisions.`
      },
      {
        role: 'user',
        content: query
      }
    ]

    const response = await groq.createChatCompletion(messages, {
      model: config.groq.defaultModel,
      temperature: 0.2, // Lower temperature for more consistent, structured output
      max_tokens: 1000, // Reduced from 2000 for more concise plans
      response_format: { type: 'json_object' }
    })

    const planString = response.choices[0]?.message?.content
    if (!planString) {
      throw new Error("Failed to generate research plan.")
    }

    let plan
    try {
      plan = JSON.parse(planString)
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      throw new Error("Invalid JSON in research plan response")
    }
    
    // Validate the structure with detailed checks
    if (!plan.search_queries || !Array.isArray(plan.search_queries) || plan.search_queries.length === 0) {
      throw new Error("Invalid or missing search_queries array")
    }
    
    if (!plan.search_sources || !Array.isArray(plan.search_sources) || plan.search_sources.length !== 3) {
      throw new Error("Invalid search_sources array - must contain exactly 3 sources")
    }

    // Validate each source has required fields
    for (const source of plan.search_sources) {
      if (!source.title || !source.domain || !source.icon_emoji) {
        throw new Error("Each source must have title, domain, and icon_emoji")
      }
    }

    return NextResponse.json(plan)

  } catch (error) {
    console.error('Research plan generation error:', error)
    
    // Enhanced fallback plan with startup-specific intelligence
    const fallbackPlan = {
      search_queries: [
        { text: "startup execution frameworks Y Combinator best practices 2024" },
        { text: "founder productivity systems and workflow optimization" },
        { text: "early-stage startup growth strategies and metrics" }
      ],
      search_sources: [
        { title: "Y Combinator Startup Execution Guide", domain: "ycombinator.com", icon_emoji: "🚀" },
        { title: "First Round Review: Founder Productivity", domain: "firstround.com", icon_emoji: "⚡" },
        { title: "Startup Growth Metrics Report", domain: "techcrunch.com", icon_emoji: "📈" }
      ]
    }
    
    return NextResponse.json(fallbackPlan)
  }
} 