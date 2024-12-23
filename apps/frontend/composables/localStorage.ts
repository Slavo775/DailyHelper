// /Users/slavomirsedlak/MyProjects/DailyHelper/DailyHelper/apps/frontend/composables/localStorage.ts

export function useLocalStorage() {
  const isSSR = typeof window === 'undefined'

  function getItem(key: string): string | null {
    if (isSSR) return null
    return localStorage.getItem(key)
  }

  function setItem(key: string, value: string): void {
    if (isSSR) return
    localStorage.setItem(key, value)
  }

  function removeItem(key: string): void {
    if (isSSR) return
    localStorage.removeItem(key)
  }

  function clear(): void {
    if (isSSR) return
    localStorage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}
