import { defineStore } from 'pinia'

type Namings = {
  originalDescription: string
  originalPurpose: string
  suggestedNamings: string
  date: Date
}

export const useSuggestedNamingStore = defineStore('suggestedNamings', () => {
  const { getItem, setItem } = useLocalStorage()
  const suggestedNamings = ref<Namings[]>([])

  const initSuggestedNamings = () => {
    suggestedNamings.value = JSON.parse(getItem('suggestedNamings') || '[]')
  }

  const addToSuggestedNamings = (correctedSentence: Namings) => {
    suggestedNamings.value = [...suggestedNamings.value, correctedSentence]
    setItem('suggestedNamings', JSON.stringify(suggestedNamings.value))
  }

  return {
    suggestedNamings,
    addToSuggestedNamings,
    initSuggestedNamings,
  }
})
