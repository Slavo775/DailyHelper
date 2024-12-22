<template>
  <NForm
    ref="formElement"
    :rules="formOptions.rules"
    :size="formOptions.size"
    :model="formModelLocal"
  >
    <NGrid
      :span="formOptions.gridOptions?.span ?? 24"
      :x-gap="formOptions.gridOptions?.xGap ?? 20"
    >
      <template v-for="(element, index) in formOptions.elements">
        <NFormItemGi v-bind="resolveVBind(index)">
          <NInput
            v-if="index.toString() !== 'button'"
            :is="resolveInputElement(index)"
            v-model:value="formModelLocal[element.path]"
          />
          <Button v-else :type="element.type" @click="onFormSubmit">
            {{ element.buttonText || element.buttonContent || 'Click me!' }}
          </Button>
        </NFormItemGi>
      </template>
    </NGrid>
  </NForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Component, PropType } from 'vue'
import { NForm, NGrid, NFormItemGi, NInput } from 'naive-ui'
import type { FormRules, FormValidationError } from 'naive-ui'
import TextInput from './TextInput.vue'
import Button from './Button.vue'
import { useVModel } from '@vueuse/core'

export enum ElementType {
  TextInput = 'textInput',
  Button = 'button',
}
type TextInputElement = {
  span: number
  id: string
  label: string
  path: string
}
type ButtonElement = {
  span?: number
  id: string
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  buttonContent: Component | string
}

type TextInputRecord = Record<ElementType.TextInput, TextInputElement>
type ButtonRecord = Record<ElementType.Button, ButtonElement>

export type FormConfig = {
  rules: FormRules
  gridOptions: {
    span: number
    xGap: number
  }
  elements: Partial<TextInputRecord & ButtonRecord>
  formElementOptions?: {
    labelPlacement?: 'top' | 'left'
    size?: 'small' | 'medium' | 'large'
  }
}

export default defineComponent({
  props: {
    formOptions: {
      type: Object as PropType<FormConfig>,
      required: true,
    },
    formModel: {
      type: Object as PropType<Record<string, string | null>>,
      required: true,
    },
  },
  emits: {
    submit: null,
    'upddate:modelValue': (formValue: Record<string, string | null>) =>
      typeof formValue === 'object',
    'submit-error': (errors: Array<FormValidationError>) =>
      Array.isArray(errors),
  },
  setup(props, { emit }) {
    const formElement = ref<HTMLFormElement | null>(null)
    const resolveInputElement = (elementType: ElementType) => {
      switch (elementType) {
        case 'textInput':
          return TextInput
        case 'button':
          return Button
        default:
          return 'textInput'
      }
    }

    const resolveVBind = (elementType: ElementType) => {
      const element = props.formOptions.elements[elementType]
      if (!element) return
      switch (elementType) {
        case ElementType.TextInput:
          return {
            span: (element as TextInputElement).span,
            label: (element as TextInputElement).label,
            path: (element as TextInputElement).path,
          }
        case ElementType.Button:
          return {
            span: (element as ButtonElement).span,
          }
        default:
          return {}
      }
    }

    const formModelLocal = useVModel(props, 'formModel', emit)

    const onFormSubmit = (e: Event) => {
      formElement.value?.validate(
        (errors: Array<FormValidationError> | undefined) => {
          console.log(errors)
          !errors ? emit('submit') : emit('submit-error', errors)
        }
      )
    }
    return {
      formElement,
      resolveInputElement,
      resolveVBind,
      formModelLocal,
      onFormSubmit,
    }
  },
  components: { NForm, NGrid, TextInput, Button, NFormItemGi, NInput },
})
</script>

<style scoped></style>
