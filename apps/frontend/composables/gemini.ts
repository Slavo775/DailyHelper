import { ref } from 'vue'
import type { GenerateContentResult } from '@daily-helper/gemini-handler'

export function useGemini() {
  const loading = ref<boolean>(false)

  const correctSentence = async (question: string) => {
    try {
      loading.value = true

      const response = await $fetch<{ result: string }>(
        '/api/sentence-corrector',
        {
          method: 'get',
          query: { question },
        }
      )

      return response.result
    } catch (e) {
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    correctSentence,
  }
}
