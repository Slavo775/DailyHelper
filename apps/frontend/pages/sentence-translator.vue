<template>
  <div class="sentence-corrector">
    <div
      ref="messagesContainer"
      class="sentence-corrector__messages"
      style="white-space: pre-line"
    >
      <template
        v-for="(sentence, index) in translatedSentences"
        :key="`${sentence}-${index}`"
      >
        <UiNaiveCard
          :title="sentence.originalSentence"
          :content="sentence.correctedSentence"
          :footer-content="formatDate(sentence.date)"
        />
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
import type { FormConfig } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'
import { useTranslateSentenceStore } from '~/store/translateSentence'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const { translateSentence, loading } = useGemini()
    const translateSentenceStore = useTranslateSentenceStore()
    const { translatedSentences } = storeToRefs(translateSentenceStore)
    const messagesContainer = ref<HTMLDivElement | null>(null)

    const formModel = ref({
      sentence: '',
    })
    const formConfig: FormConfig = {
      rules: {
        sentence: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Upravovana veta je povinna',
        },
      },
      gridOptions: {
        span: 24,
        xGap: 20,
        yGap: 0,
      },

      elements: {
        textInput: {
          span: '14 s:24 m:20 l:20 xl:20',
          id: 'sentence',
          label: 'Prekladana veta',
          path: 'sentence',
        },
        button: {
          id: 'submit',
          buttonContent: 'Odeslat',
          span: '24 s:24 m:4 l:4 xl:4',
        },
      },
    }

    const scrollMeesagesContainerToTheBottom = () =>
      messagesContainer.value &&
      messagesContainer.value.scroll({
        top: messagesContainer.value.scrollHeight,
        behavior: 'smooth',
      })

    const resetFormModel = () => {
      formModel.value = { sentence: '' }
    }

    onMounted(async () => {
      await translateSentenceStore.initTranslatedSentences()
      scrollMeesagesContainerToTheBottom()
    })

    const onSubmit = async () => {
      try {
        const result = await translateSentence(formModel.value.sentence)
        translateSentenceStore.addToTranslatedSentences({
          originalSentence: formModel.value.sentence,
          correctedSentence: result,
          date: new Date(),
        })
        setTimeout(scrollMeesagesContainerToTheBottom, 100)
        resetFormModel()
      } catch (e) {
        console.log(e)
      }
    }

    return {
      formConfig,
      onSubmit,
      formModel,
      loading,
      translatedSentences,
      formatDate,
      messagesContainer,
    }
  },
})
</script>

<style lang="scss">
.sentence-corrector {
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
