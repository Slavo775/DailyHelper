import { ref } from 'vue'
import { apiRoutes } from '~/config/apiRoutes'

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

  return {
    loading,
    correctSentence,
    translateSentence,
  }
}
