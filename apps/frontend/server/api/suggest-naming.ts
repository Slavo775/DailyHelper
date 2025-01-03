import { askGemini as askGeminiHandler } from '@daily-helper/gemini-handler'
import type { SuggestNamingApiQuery } from '~/types/naming'

const validateQuestion = ({ description, purpose }: SuggestNamingApiQuery) => {
  if (!description)
    throw createError({
      statusCode: 400,
      statusMessage: 'Question is required',
    })

  if (description.length < 5)
    throw createError({
      statusCode: 400,
      statusMessage: 'Question is too short',
    })

  if (!purpose)
    throw createError({
      statusCode: 400,
      statusMessage: 'Purpose is required',
    })

  return { description, purpose }
}

const createPromptForGemini = ({
  description,
  purpose,
}: SuggestNamingApiQuery) => {
  return `Give me naming for ${purpose} which is suposed to ${description} please.`
}

export default defineEventHandler(async (event) => {
  const { description, purpose } = getQuery<SuggestNamingApiQuery>(event)

  const config = useRuntimeConfig()
  const geminiKey = config.private.geminiApiKey

  const result = await askGeminiHandler(
    createPromptForGemini(validateQuestion({ description, purpose })),
    geminiKey
  )

  if (!result)
    throw createError({
      statusCode: 400,
      statusMessage: 'Somethings went wrong with gemini',
    })

  return { result: result.response.text() }
})
