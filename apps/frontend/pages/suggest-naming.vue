<template>
  <div class="suggest-naming">
    <div ref="suggeestedNamingsContainer" class="suggest-naming__answers">
      <template
        v-for="(naming, index) in suggestedNamings"
        :key="`${index}-${naming.originalDescription}`"
      >
        <UiNaiveCard
          :title="`Purpose: ${naming.originalPurpose} Description: ${naming.originalDescription}`"
          :content="naming.suggestedNamings"
          :footer-content="formatDate(naming.date)"
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

import { defineComponent } from 'vue'
import { useSuggestedNamingStore } from '~/store/suggestedNaming'
import { storeToRefs } from 'pinia'
import { NamingPurpose } from '~/types/naming'
import { ElementType } from '@daily-helper/ui/lib/components/form/NaiveForm.vue'

const formConfig: FormConfig = {
  rules: {
    sentence: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Popis je povinny!',
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
      span: '14 s:24 m:16 l:16 xl:16',
      id: 'description',
      label: 'Popis',
      path: 'description',
    },
    {
      elementType: ElementType.Select,
      span: '14 s:24 m:4 l:4 xl:4',
      id: 'purpose',
      label: 'Účel',
      path: 'purpose',
      options: [
        { label: 'Function', value: 'function' },
        { label: 'Variable', value: 'variable' },
      ],
    },
    {
      elementType: ElementType.Button,
      id: 'submit',
      buttonContent: 'Odeslat',
      span: '24 s:24 m:4 l:4 xl:4',
    },
  ],
}

export default defineComponent({
  setup() {
    const suggestedNamingStore = useSuggestedNamingStore()
    const { suggestedNamings } = storeToRefs(suggestedNamingStore)
    const suggeestedNamingsContainer = ref<HTMLDivElement | null>(null)
    const { suggestNaming, loading } = useGemini()
    const formModel = ref({
      description: '',
      purpose: NamingPurpose.function,
    })

    const scrollMeesagesContainerToTheBottom = (
      scrollBehavior: ScrollBehavior = 'smooth'
    ) =>
      suggeestedNamingsContainer.value &&
      suggeestedNamingsContainer.value.scroll({
        top: suggeestedNamingsContainer.value.scrollHeight,
        behavior: scrollBehavior,
      })

    const resetFormModel = () =>
      (formModel.value = { description: '', purpose: NamingPurpose.function })

    const onSubmit = async () => {
      try {
        const result = await suggestNaming({
          description: formModel.value.description,
          purpose: formModel.value.purpose,
        })
        suggestedNamingStore.addToSuggestedNamings({
          originalDescription: formModel.value.description,
          originalPurpose: formModel.value.purpose,
          suggestedNamings: result,
          date: new Date(),
        })
        setTimeout(scrollMeesagesContainerToTheBottom, 100)
        resetFormModel()
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      scrollMeesagesContainerToTheBottom('instant')
      suggestedNamingStore.initSuggestedNamings()
    })

    return {
      suggestedNamings,
      suggeestedNamingsContainer,
      formConfig,
      formModel,
      loading,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.suggest-naming {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
  &__answers {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
