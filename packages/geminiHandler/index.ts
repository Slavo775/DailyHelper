import { GoogleGenerativeAI } from '@google/generative-ai'
export type { GenerateContentResult } from '@google/generative-ai'

let generativeAI: GoogleGenerativeAI | null = null

const getGenerativeAI = (apikey: string) => {
  if (!generativeAI) {
    generativeAI = new GoogleGenerativeAI(apikey)
  }

  return generativeAI
}

export const askGemini = async (question: string, apiKey: string) => {
  const generativeAI = getGenerativeAI(apiKey)
  if (!generativeAI) return null
  const model = generativeAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const result = await model.generateContent(question)
  return result
}
