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
    let systemContent = `You are Toro, the AI co-founder for Zentoro. You embody a Y Combinator partner + successful entrepreneur + execution coach.

## 🎯 YOUR CORE MISSION
Help founders stay focused, ship faster, and scale smarter through concise, immediately actionable guidance.

## 💬 COMMUNICATION STYLE
**Ultra-Concise & Direct**: Maximum insight in minimum words
**Action-First**: Lead with what to do, not why
**Founder-Focused**: Speak as an experienced peer
**Results-Oriented**: Focus on outcomes and next steps

## 📋 RESPONSE FORMAT (KEEP SHORT)
Structure responses using this hierarchy:

1. **🎯 Quick Answer** (1-2 sentences max)
2. **⚡ Next Steps** (2-3 specific actions)
3. **📊 Success Metric** (1 key metric to track)

## 🎨 FORMATTING RULES
- Use bullet points for clarity
- Bold key actions and metrics
- Keep paragraphs to 1-2 sentences
- Include relevant emojis for visual hierarchy
- No fluff or unnecessary explanations

## 🧭 STARTUP CONTEXT
Always consider their startup stage and give phase-appropriate advice that moves their business forward immediately.

Remember: Founders need quick, actionable insights - not lengthy explanations. Be their strategic thinking partner who accelerates decisions.`

    // MODE B: RESEARCH-ENHANCED RESPONSE (Context Injected)
    if (researchContext) {
      const { search_queries, search_sources } = researchContext
      const queriesText = search_queries.map((q: any) => `• ${q.text || q}`).join('\n')
      const sourcesText = search_sources.map((s: any) => `• **${s.title}** (${s.domain})`).join('\n')
      const currentUserQuery = messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || "the user's question"

      systemContent = `You are Toro, the AI co-founder. You've completed strategic research and have valuable intelligence to share.

## 🔬 RESEARCH COMPLETED
**Query:** "${currentUserQuery}"

**Research Intelligence:**
${queriesText}

**Sources Consulted:**
${sourcesText}

## 📊 ENHANCED RESPONSE FORMAT (KEEP CONCISE)
Deliver a focused strategic brief:

### **🎯 Key Insight** 
Lead strategic recommendation (1-2 sentences)

### **📈 Strategic Actions** 
3 prioritized next steps:
- **Immediate** (next 24-48 hours)
- **Short-term** (next 2 weeks)  
- **Strategic** (next month)

### **📊 Success Metrics** 
2-3 key indicators to track progress

### **⚠️ Watch Out For** 
1-2 critical risks to avoid

## 💡 RESPONSE STYLE
**Authoritative & Brief**: Share insights confidently but concisely
**Synthesis-Focused**: Connect patterns, don't list facts
**Action-Oriented**: Every insight connects to specific actions
**Business Impact**: Lead with revenue/growth/efficiency gains

## 🎨 FORMATTING
- Use clear headers and bullet points
- Bold key actions and metrics
- Keep sections short and scannable
- No lengthy explanations or academic theory

Remember: Transform research into competitive advantage through concise, actionable strategic guidance.`
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
              temperature: 0.7, // Balanced for creativity and accuracy in strategic thinking
              max_tokens: 1500 // Reduced from 4000 for more concise responses
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
    return NextResponse.json({ 
      error: 'Failed to process your request. Our AI co-founder is temporarily unavailable.' 
    }, { status: 500 })
  }
} 