// Configuration for environment variables and API settings
export const config = {
  groq: {
    apiKey: process.env.GROQ_API_KEY || "",
    baseUrl: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    defaultTemperature: 0.7,
    defaultMaxTokens: 1500,
  },
  app: {
    name: 'Zentoro',
    description: 'AI-powered execution engine for founders',
  }
}

export default config 