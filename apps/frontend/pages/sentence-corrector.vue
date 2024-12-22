<template>
  <div style="white-space: pre-line">{{ answer }}</div>
  <UiForm
    :formOptions="formConfig"
    v-model:formModel="formModel"
    @submit="onSubmit"
  />
</template>

<script lang="ts">
import type { FormConfig } from '@daily-helper/ui/lib/components/form/Form.vue'

export default defineComponent({
  setup() {
    const answer = ref<string>('')
    const { $askGemini } = useNuxtApp()
    const formModel = ref({
      sentence: 'Test',
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
      },

      elements: {
        textInput: {
          span: 23,
          id: 'sentence',
          label: 'Upravovana veta',
          path: 'sentence',
        },
        button: {
          id: 'submit',
          buttonContent: 'Odeslat',
          span: 1,
        },
      },
    }

    const onSubmit = async () => {
      const askForCorrect = `"${formModel.value.sentence}" correct this sentence please`
      const result = await $askGemini(askForCorrect)
      if (!result) return
      console.log(result?.response.candidates?.[0].content.parts[0].text)
      answer.value =
        result?.response.candidates?.[0].content.parts[0].text ?? ''
      // answer.value = result
    }

    return { formConfig, onSubmit, formModel, answer }
  },
})
</script>

<style lang="scss"></style>
