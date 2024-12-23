import { defineStore } from 'pinia'

type CorrectedSentence = {
  originalSentence: string
  correctedSentence: string
  date: Date
}

export const useCorrectSentenceStore = defineStore('correctSentence', () => {
  const { getItem, setItem } = useLocalStorage()
  const correctedSentences = ref<CorrectedSentence[]>([])

  const initCorrectedSentences = () => {
    correctedSentences.value = JSON.parse(getItem('correctedSentences') || '[]')
  }

  const addToCorrectedSentences = (correctedSentence: CorrectedSentence) => {
    correctedSentences.value = [...correctedSentences.value, correctedSentence]
    setItem('correctedSentences', JSON.stringify(correctedSentences.value))
  }

  return {
    correctedSentences,
    addToCorrectedSentences,
    initCorrectedSentences,
  }
})
