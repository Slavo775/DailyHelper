<template>
  <div class="jira-ticket-generator">
    <div
      ref="messagesContainer"
      class="jira-ticket-generator__messages"
      style="white-space: pre-line"
    >
      <template
        v-for="(jiraTicket, index) in processedJiraTickets"
        :key="`${jiraTicket}-${index}`"
      >
        <template v-if="typeof jiraTicket.jiraTicket === 'string'">
          <UiNaiveCard
            :title="jiraTicket.ticketDescription"
            :content="jiraTicket.jiraTicket"
            :footer-content="formatDate(jiraTicket.date)"
          />
        </template>
        <template v-else>
          <UiNaiveCard
            :title="jiraTicket.ticketDescription"
            :footer-content="formatDate(jiraTicket.date)"
          >
            <UiTextJsonRenderer :json="jiraTicket.jiraTicket" />
          </UiNaiveCard>
        </template>
      </template>
    </div>
    <UiFormNaiveForm
      v-model:form-model="formModel"
      :form-options="formConfig"
      :disabled="loading"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useJiraTicketGeneratorStore } from '~/store/jiraTicketGenerator'
import { storeToRefs } from 'pinia'
import type { FormConfig } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'
import { ElementType } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'

export default defineComponent({
  setup() {
    const { generateJiraTicket, loading } = useGemini()
    const jiraTicketsStore = useJiraTicketGeneratorStore()
    const { jiraTickets } = storeToRefs(jiraTicketsStore)
    const messagesContainer = ref<HTMLDivElement | null>(null)

    const formModel = ref({ jiraTicketDescription: '' })
    const formConfig: FormConfig = {
      rules: {
        jiraTicketDescription: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Jira ticket description is required',
        },
      },
      gridOptions: {
        span: 24,
        xGap: 20,
        yGap: 0,
      },
      elements: [
        {
          elementType: ElementType.TextInput,
          span: '14 s:24 m:20 l:20 xl:20',
          id: 'jiraTicketDescription',
          label: 'Jira ticket description',
          path: 'jiraTicketDescription',
        },
        {
          elementType: ElementType.Button,
          id: 'submit',
          buttonContent: 'Submit',
          span: '24 s:24 m:4 l:4 xl:4',
        },
      ],
    }
    const scrollMeesagesContainerToTheBottom = (
      scrollBehavior: ScrollBehavior = 'smooth'
    ) =>
      messagesContainer.value &&
      messagesContainer.value.scroll({
        top: messagesContainer.value.scrollHeight,
        behavior: scrollBehavior,
      })

    const resetFormModel = () => {
      formModel.value = { jiraTicketDescription: '' }
    }

    onMounted(async () => {
      await jiraTicketsStore.initJiraTickets()
      scrollMeesagesContainerToTheBottom('instant')
    })

    const onSubmit = async () => {
      try {
        console.log(formModel.value)
        const result = await generateJiraTicket(
          formModel.value.jiraTicketDescription
        )
        jiraTicketsStore.addToJiraTickets({
          ticketDescription: formModel.value.jiraTicketDescription,
          jiraTicket: extractJsonFromString(result),
          date: new Date(),
        })
        resetFormModel()
      } catch (e) {
        console.log(e)
      }
    }

    const resolveJson = (json: string | Record<string, string>) => {
      try {
        return typeof json === 'object' ? json : JSON.parse(json)
      } catch {
        return json
      }
    }

    const processedJiraTickets = computed(() =>
      jiraTickets.value.map((jiraTicket) => ({
        ...jiraTicket,
        jiraTicket: resolveJson(jiraTicket.jiraTicket),
      }))
    )

    return {
      formConfig,
      formModel,
      onSubmit,
      loading,
      formatDate,
      messagesContainer,
      processedJiraTickets,
    }
  },
})
</script>

<style lang="scss">
.jira-ticket-generator {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
  &__messages {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
