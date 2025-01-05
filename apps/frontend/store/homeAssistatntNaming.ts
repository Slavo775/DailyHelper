import type { HomeAssistantDataType } from '~/composables/homeAssistantNaming'

type HomeAssistantNaming = {
  type: HomeAssistantDataType
  homeAssistantName: string
  date: Date
}

export const useHomeAssistatntNamingStore = defineStore(
  'homeAssistantStore',
  () => {
    const { getItem, setItem } = useLocalStorage()
    const homeAssistantNamings = ref<HomeAssistantNaming[]>([])

    const initHomeAssistantNamings = () => {
      homeAssistantNamings.value = JSON.parse(
        getItem('homeAssistantNamings') || '[]'
      )
    }

    const addToHomeAssistantNamings = (
      homeAssistantNaming: HomeAssistantNaming
    ) => {
      homeAssistantNamings.value = [
        ...homeAssistantNamings.value,
        homeAssistantNaming,
      ]
      setItem(
        'homeAssistantNamings',
        JSON.stringify(homeAssistantNamings.value)
      )
    }

    return {
      homeAssistantNamings,
      initHomeAssistantNamings,
      addToHomeAssistantNamings,
    }
  }
)
