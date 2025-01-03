import { askGemini as askGeminiHandler } from '@daily-helper/gemini-handler'

const validateQuestion = (question: string | undefined) => {
  if (!question)
    throw createError({
      statusCode: 400,
      statusMessage: 'Question is required',
    })

  if (question.length < 5)
    throw createError({
      statusCode: 400,
      statusMessage: 'Question is too short',
    })

  return question
}

export default defineEventHandler(async (event) => {
  const { question } = getQuery<{ question: string }>(event)
  const postQuestionText = 'preloz tuto vetu do anglictiny prosim'

  const config = useRuntimeConfig()
  const geminiKey = config.private.geminiApiKey

  const validatedQuestion = validateQuestion(question)

  const result = await askGeminiHandler(
    `"${validatedQuestion}" ${postQuestionText}.`,
    geminiKey
  )

  if (!result)
    throw createError({
      statusCode: 400,
      statusMessage: 'Somethings went wrong with gemini',
    })

  return { result: result.response.text() }
})
