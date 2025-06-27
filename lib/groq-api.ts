interface GroqMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface GroqResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface GroqCompletionOptions {
  model?: string
  temperature?: number
  max_tokens?: number
  stream?: boolean
  response_format?: { type: 'json_object' | 'text' }
}

class GroqAPI {
  private apiKey: string
  private baseUrl: string = "https://api.groq.com/openai/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async createChatCompletion(
    messages: GroqMessage[],
    options: GroqCompletionOptions = {}
  ): Promise<GroqResponse> {
    const {
      model = "llama-3.3-70b-versatile",
      temperature = 0.7,
      max_tokens = 1000,
      stream = false,
      response_format
    } = options

    const requestBody: any = {
      model,
      messages,
      temperature,
      max_completion_tokens: max_tokens,
      stream,
    }

    if (response_format) {
      requestBody.response_format = response_format
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Groq API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async *createChatCompletionStream(
    messages: GroqMessage[],
    options: {
      model?: string
      temperature?: number
      max_tokens?: number
    } = {}
  ): AsyncGenerator<string> {
    const {
      model = "llama-3.3-70b-versatile",
      temperature = 0.7,
      max_tokens = 1000,
    } = options

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_completion_tokens: max_tokens,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Groq API error: ${response.status} - ${error}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("No response body reader available")

    const decoder = new TextDecoder()
    let buffer = ""

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed === "" || trimmed === "data: [DONE]") continue
          
          if (trimmed.startsWith("data: ")) {
            try {
              const jsonStr = trimmed.slice(6)
              const data = JSON.parse(jsonStr)
              const content = data.choices?.[0]?.delta?.content
              if (content) {
                yield content
              }
            } catch (e) {
              // Skip invalid JSON lines
              continue
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }
}

export default GroqAPI
export type { GroqMessage, GroqResponse } 