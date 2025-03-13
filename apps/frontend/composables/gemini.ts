import { ref } from 'vue'
import { apiRoutes } from '~/config/apiRoutes'
import type { SuggestNamingApiQuery } from '~/types/naming'

export function useGemini() {
  const loading = ref<boolean>(false)

  const correctSentence = async (question: string) => {
    try {
      loading.value = true

      const response = await $fetch<{ result: string }>(
        apiRoutes.sentenceCorrector,
        {
          method: 'get',
          query: { question },
        }
      )

      return response.result
    } finally {
      loading.value = false
    }
  }

  const translateSentence = async (question: string) => {
    try {
      loading.value = true

      const response = await $fetch<{ result: string }>(
        apiRoutes.sentenceTranslator,
        {
          method: 'get',
          query: { question },
        }
      )

      return response.result
    } finally {
      loading.value = false
    }
  }

  const suggestNaming = async (data: SuggestNamingApiQuery) => {
    try {
      loading.value = true

      const response = await $fetch<{ result: string }>(
        apiRoutes.suggestNaming,
        {
          method: 'get',
          query: data,
        }
      )

      return response.result
    } finally {
      loading.value = false
    }
  }

  const generateJiraTicket = async (ticketDescription: string) => {
    try {
      loading.value = true

      const response = await $fetch<{ result: string }>(
        apiRoutes.jiraTicketGenerator,
        {
          method: 'get',
          query: { ticketDescription },
        }
      )

      return response.result
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    correctSentence,
    translateSentence,
    suggestNaming,
    generateJiraTicket,
  }
}
