type JiraTicket = {
  ticketDescription: string
  jiraTicket: string | Record<string, string>
  date: Date
}

const jiraTicketsKey = 'jiraTickets'

export const useJiraTicketGeneratorStore = defineStore(
  'jiraTicketGenerator',
  () => {
    const { getItem, setItem } = useLocalStorage()
    const jiraTickets = ref<JiraTicket[]>([])

    const initJiraTickets = () => {
      jiraTickets.value = JSON.parse(getItem(jiraTicketsKey) || '[]')
    }

    const addToJiraTickets = (jiraTicket: JiraTicket) => {
      jiraTickets.value = [...jiraTickets.value, jiraTicket]
      setItem(jiraTicketsKey, JSON.stringify(jiraTickets.value))
    }
    return { jiraTickets, initJiraTickets, addToJiraTickets }
  }
)
