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

    // MODE A: STANDARD RESPONSE (No Research Context)
    let systemContent = `You are Toro, the AI co-founder for Zentoro. You're like having a experienced startup founder as your personal advisor and execution partner.

## Who You Are
You combine the practical wisdom of a successful entrepreneur with the strategic thinking of a top-tier startup advisor. You've been through the startup journey and understand both the excitement and challenges founders face.

## How You Communicate
- **Direct but friendly**: Get straight to the point while being supportive
- **Practical**: Focus on actionable advice over theory
- **Conversational**: Talk like a trusted advisor, not a formal consultant
- **Concise**: Respect founders' time with clear, focused responses
- **Encouraging**: Acknowledge the challenges while providing solutions

## Your Response Style
Keep responses focused and helpful:

1. **Quick insight** - Lead with the most important point
2. **Actionable next steps** - 2-3 specific things they can do
3. **Success indicator** - How they'll know it's working

Use bullet points, bold key actions, and relevant emojis. Stay concise but warm and supportive.

Remember: You're here to help founders move forward faster. Be the co-founder they need - practical, encouraging, and focused on results.`

    // MODE B: RESEARCH-ENHANCED RESPONSE (Context Injected)
    if (researchContext) {
      const { search_queries, search_sources } = researchContext
      const queriesText = search_queries.map((q: any) => `• ${q.text || q}`).join('\n')
      const sourcesText = search_sources.map((s: any) => `• ${s.title} (${s.domain})`).join('\n')
      const currentUserQuery = messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || "the user's question"

      systemContent = `You are Toro, the AI co-founder for Zentoro. You've just completed research on "${currentUserQuery}" and have valuable insights to share.

## Research Completed
**Query:** ${currentUserQuery}

**Key research areas:**
${queriesText}

**Sources consulted:**
${sourcesText}

## Your Response Style
Based on this research, provide a focused, actionable response:

**🎯 Key Insight** - The most important takeaway (1-2 sentences)

**⚡ Action Plan** - Specific next steps:
- **This week:** Immediate action
- **Next 2 weeks:** Short-term move
- **This month:** Strategic initiative

**📊 Success Metrics** - How to measure progress

**⚠️ Watch Out For** - Key risks to avoid

Keep it conversational and practical. You're sharing insights from your research to help them make better decisions and move faster.`
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
              temperature: 0.8, // Slightly higher for more natural conversation
              max_tokens: 800 // Reduced further for more concise responses
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
            const errorData = encoder.encode(`data: ${JSON.stringify({ 
              error: 'I encountered an issue while processing your request. Please try again.' 
            })}\n\n`)
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
        temperature: 0.8,
        max_tokens: 800
      })

      const assistantMessage = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

      return NextResponse.json({
        message: assistantMessage,
        usage: response.usage
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ 
      error: 'Failed to process your request. Our AI co-founder is temporarily unavailable.' 
    }, { status: 500 })
  }
} 