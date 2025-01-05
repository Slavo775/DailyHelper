<template>
  <NSelect v-model:value="valueLocal" placeholder="Select" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { useVModel } from '@vueuse/core'

export type SelectOptionUi = SelectOption

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
  },
  emits: { 'update:value': (value: string) => typeof value === 'string' },
  setup(props, { emit }) {
    const valueLocal = useVModel(props, 'value', emit)

    return { valueLocal }
  },
  components: {
    NSelect,
  },
})
</script>
