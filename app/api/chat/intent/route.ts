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
        content: `You are an intent detection expert. Analyze the user's query and determine if it requires external research, data retrieval, or deep analysis to answer comprehensively. Simple greetings, conversational phrases, or basic questions should not be marked for research. Complex topics, requests for data, or questions about current events or technical subjects require research. Respond with only "YES" or "NO". Do not provide any other text or explanation.`
      },
      {
        role: 'user',
        content: query
      }
    ]

    const response = await groq.createChatCompletion(messages, {
      model: "llama3-8b-8192", // Use a faster model for intent detection
      temperature: 0,
      max_tokens: 5,
    })

    const decision = response.choices[0]?.message?.content?.trim().toUpperCase()
    const requiresResearch = decision === 'YES'

    return NextResponse.json({ requiresResearch })

  } catch (error) {
    console.error('Intent detection error:', error)
    // Default to not requiring research in case of an error
    return NextResponse.json({ requiresResearch: false })
  }
} 