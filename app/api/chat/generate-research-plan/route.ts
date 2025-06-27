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
        content: `You are a world-class research assistant. Based on the user's query, generate a step-by-step research plan. Your output must be ONLY a single, valid JSON object with the following structure: { "search_queries": ["query 1", "query 2", "query 3"], "search_sources": [{ "title": "Source Title", "domain": "example.com", "icon_emoji": "📚" }] }.
- "search_queries" must be an array of 3-5 distinct, relevant search engine query strings.
- "search_sources" must be an array of exactly 5 realistic, synthetic source objects.
- Each source object must have a "title", a "domain", and a relevant "icon_emoji" (e.g., '📚', '📰', '💼', '💻', '📈').
- Do not include any text, markdown, or explanation outside of the JSON object.`
      },
      {
        role: 'user',
        content: query
      }
    ]

    const response = await groq.createChatCompletion(messages, {
      model: config.groq.defaultModel,
      temperature: 0.5,
      max_tokens: 1024,
      response_format: { type: 'json_object' }
    })

    const planString = response.choices[0]?.message?.content
    if (!planString) {
      throw new Error("Failed to generate research plan.")
    }

    const plan = JSON.parse(planString)
    return NextResponse.json(plan)

  } catch (error) {
    console.error('Research plan generation error:', error)
    return NextResponse.json({ error: 'Failed to generate research plan' }, { status: 500 })
  }
} 