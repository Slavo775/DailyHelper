<template>
  <NForm
    ref="formElement"
    :rules="formOptions.rules"
    :size="formOptions.size ?? 'medium'"
    :model="formModelLocal"
    :disabled="disabled"
    @keydown.enter.prevent="onFormSubmit"
  >
    <NGrid
      :span="formOptions.gridOptions?.span ?? 24"
      :x-gap="formOptions.gridOptions?.xGap ?? 20"
      :y-gap="formOptions.gridOptions?.yGap ?? 20"
      item-responsive
      responsive="screen"
    >
      <template
        v-for="(element, index) in formOptions.elements"
        :key="`form-${index}-${element.elementType}`"
      >
        <NFormItemGi v-bind="resolveVBind(element)">
          <NInput
            v-if="element.elementType === 'textInput'"
            v-model:value="formModelLocal[(element as TextInputElement)?.path as string]"
          />
          <NSelect
            v-else-if="element.elementType === 'select'"
            v-model:value="formModelLocal[(element as SelectElement)?.path as string]"
            :options="(element as SelectElement).options"
          />
          <NaiveButton
            v-else
            :type="(element as ButtonElement).type"
            @click="onFormSubmit"
          >
            {{ (element as ButtonElement).buttonContent || 'Click me!' }}
          </NaiveButton>
        </NFormItemGi>
      </template>
    </NGrid>
  </NForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Component, PropType } from 'vue'
import { NForm, NGrid, NFormItemGi, NInput, NSelect } from 'naive-ui'
import type { FormRules, FormValidationError } from 'naive-ui'
import NaiveButton from './NaiveButton.vue'
import { useVModel } from '@vueuse/core'

export enum ElementType {
  TextInput = 'textInput',
  Button = 'button',
  Select = 'select',
}
type TextInputElement = {
  elementType: ElementType.TextInput
  span: number | string
  id: string
  label: string
  path: string
}
type ButtonElement = {
  elementType: ElementType.Button
  span?: number | string
  id: string
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  buttonContent: Component | string
}

type SelectElement = {
  elementType: ElementType.Select
  span?: number | string
  id: string
  label: string
  path: string
  options: { label: string; value: string; disabled?: boolean }[]
}

type Element = TextInputElement | SelectElement | ButtonElement

export type FormConfig = {
  rules: FormRules
  size?: 'small' | 'medium' | 'large'
  gridOptions: {
    span: number | string
    xGap?: number | string
    yGap?: number | string
  }
  elements: Element[]
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
    disabled: {
      type: Boolean,
      default: false,
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

    const resolveVBind = (element: Element) => {
      if (!element) return
      switch (element.elementType) {
        case ElementType.TextInput:
          return {
            span: (element as TextInputElement).span,
            label: (element as TextInputElement).label,
            path: (element as TextInputElement).path,
          }
        case ElementType.Select:
          return {
            span: (element as SelectElement).span,
            label: (element as SelectElement).label,
            path: (element as SelectElement).path,
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

    const onFormSubmit = () =>
      formElement.value?.validate(
        (errors: Array<FormValidationError> | undefined) =>
          !errors ? emit('submit') : emit('submit-error', errors)
      )

    return {
      formElement,
      resolveVBind,
      formModelLocal,
      onFormSubmit,
    }
  },
  components: {
    NForm,
    NGrid,
    NaiveButton,
    NFormItemGi,
    NInput,
    NSelect,
  },
})
</script>

<style scoped></style>
