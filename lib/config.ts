// Configuration for environment variables and API settings
export const config = {
  groq: {
    apiKey: process.env.GROQ_API_KEY || "",
    baseUrl: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama3-8b-8192',
    defaultTemperature: 0.7,
    defaultMaxTokens: 2000,
  },
  app: {
    name: 'Zentoro',
    description: 'AI-powered execution engine for founders',
  }
}

export default config 