import { NextRequest, NextResponse } from 'next/server'
import GroqAPI, { type GroqMessage } from '@/lib/groq-api'
import { config } from '@/lib/config'

const groq = new GroqAPI(config.groq.apiKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query string is required' },
        { status: 400 }
      )
    }

    const messages: GroqMessage[] = [
      {
        role: 'system',
        content: `You are an intent classifier for Toro, the AI co-founder assistant. Your job is to decide if a founder's question needs deep research or can be answered directly.

REQUIRE RESEARCH (respond "YES") for:

🎯 **Strategic questions:**
- Market analysis, competition, industry trends
- Business models, monetization, pricing strategies
- Go-to-market, customer acquisition, growth strategies
- Product-market fit, user research, validation

💰 **Business decisions:**
- Fundraising, investor relations, pitch decks
- Financial modeling, unit economics, valuation
- Partnership strategies, distribution channels

🔧 **Implementation guidance:**
- Technology stack choices, architecture decisions
- Scaling strategies, operational frameworks
- Team building, hiring, organizational design
- Legal structures, compliance, regulations

📊 **Analysis requests:**
- "How to", "best practices", "compare", "analyze"
- "Research", "trends", "benchmarks", "strategies"
- Market sizing, competitive analysis

NO RESEARCH (respond "NO") for:
- Simple greetings: "hi", "hello", "hey"
- Basic questions about Zentoro features
- Casual conversation, small talk
- Quick clarifications or confirmations
- Personal check-ins: "how are you"
- Simple definitions

Respond with ONLY "YES" or "NO".

Examples:
- "How are you?" → NO
- "What's the best growth strategy?" → YES
- "Hi Toro" → NO
- "How to validate my startup idea?" → YES`
      },
      {
        role: 'user',
        content: query
      }
    ]

    const response = await groq.createChatCompletion(messages, {
      model: "llama3-8b-8192", // Use faster model for classification
      temperature: 0, // Maximum consistency
      max_tokens: 5,
    })

    const decision = response.choices[0]?.message?.content?.trim().toUpperCase()
    const requiresResearch = decision === 'YES'

    return NextResponse.json({ requiresResearch })

  } catch (error) {
    console.error('Intent detection error:', error)
    // Default to simple response on error to ensure responsiveness
    return NextResponse.json({ requiresResearch: false })
  }
} 