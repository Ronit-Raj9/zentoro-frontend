import { NextRequest, NextResponse } from 'next/server'
import GroqAPI, { type GroqMessage } from '@/lib/groq-api'
import { config } from '@/lib/config'

// Initialize Groq API with the API key from config
const groq = new GroqAPI(config.groq.apiKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, researchContext, stream = true } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    let systemContent = `You are Toro, an AI assistant for ${config.app.name} - an ${config.app.description}. You are knowledgeable, helpful, and focused on helping entrepreneurs and founders with their business challenges, productivity, and growth strategies. Key traits: Professional yet friendly tone, expertise in business and tech, provide actionable advice, keep responses concise but comprehensive.`

    if (researchContext) {
      const { search_queries, search_sources } = researchContext
      const queriesText = search_queries.map((q: any) => `- ${q.text || q}`).join('\n')
      const sourcesText = search_sources.map((s: any) => `- ${s.title} (${s.domain})`).join('\n')

      systemContent = `You are Toro, a highly intelligent AI research assistant for ${config.app.name}. You have just completed a thorough research process for the user's query.
      
      RESEARCH CONTEXT:
      - User's Query: "${messages[messages.length - 1].content}"
      - Search Queries You Used:
      ${queriesText}
      - Sources You Consulted:
      ${sourcesText}
      
      Now, synthesize this information to provide a comprehensive, well-structured, and helpful response to the user's original query. Respond in clear, easy-to-read markdown. Do not mention your research process in the final response.`
    }

    const systemMessage: GroqMessage = {
      role: "system",
      content: systemContent,
    }

    const groqMessages: GroqMessage[] = [
      systemMessage,
      ...messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text || msg.content || ''
      }))
    ]

    if (stream) {
      // Create a readable stream for streaming responses
      const encoder = new TextEncoder()
      
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of groq.createChatCompletionStream(groqMessages, {
              model: config.groq.defaultModel,
              temperature: config.groq.defaultTemperature,
              max_tokens: config.groq.defaultMaxTokens
            })) {
              const data = encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
              controller.enqueue(data)
            }
            
            // Send completion signal
            const doneData = encoder.encode(`data: [DONE]\n\n`)
            controller.enqueue(doneData)
            controller.close()
          } catch (error) {
            console.error('Streaming error:', error)
            const errorData = encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`)
            controller.enqueue(errorData)
            controller.close()
          }
        }
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    } else {
      // Non-streaming response
      const response = await groq.createChatCompletion(groqMessages, {
        model: config.groq.defaultModel,
        temperature: config.groq.defaultTemperature,
        max_tokens: config.groq.defaultMaxTokens
      })

      const assistantMessage = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

      return NextResponse.json({
        message: assistantMessage,
        usage: response.usage
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
} 