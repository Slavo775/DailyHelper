import { defineStore } from 'pinia'

type TranslatedSentence = {
  originalSentence: string
  correctedSentence: string | Record<string, string>
  date: Date
}

export const useTranslateSentenceStore = defineStore(
  'translateSentence',
  () => {
    const { getItem, setItem } = useLocalStorage()
    const translatedSentences = ref<TranslatedSentence[]>([])

    const initTranslatedSentences = () => {
      translatedSentences.value = JSON.parse(
        getItem('translatedSentences') || '[]'
      )
    }

    const addToTranslatedSentences = (
      translatedSentence: TranslatedSentence
    ) => {
      translatedSentences.value = [
        ...translatedSentences.value,
        translatedSentence,
      ]
      setItem('translatedSentences', JSON.stringify(translatedSentences.value))
    }

    return {
      translatedSentences,
      addToTranslatedSentences,
      initTranslatedSentences,
    }
  }
)
