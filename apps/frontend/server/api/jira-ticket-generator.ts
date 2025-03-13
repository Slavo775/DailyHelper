import { askGemini as askGeminiHandler } from '@daily-helper/gemini-handler'

const validateTicketDescription = (ticketDescription: string | undefined) => {
  if (!ticketDescription)
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticket description is required',
    })

  if (ticketDescription.length < 5)
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticket description is too short',
    })

  return ticketDescription
}

export default defineEventHandler(async (event) => {
  const { ticketDescription } = getQuery<{ ticketDescription: string }>(event)
  const preTicketText = 'Please create a Jira ticket about this'
  const postTicketText =
    'provide me this information in JSON format with type {title: string, description: string, akceptanceCriteria: string}'

  const config = useRuntimeConfig()
  const geminiKey = config.private.geminiApiKey

  const validatedQuestion = validateTicketDescription(ticketDescription)

  const result = await askGeminiHandler(
    `${preTicketText} "${validatedQuestion}" ${postTicketText}.`,
    geminiKey
  )

  if (!result)
    throw createError({
      statusCode: 400,
      statusMessage: 'Somethings went wrong with gemini',
    })

  return { result: result.response.text() }
})
