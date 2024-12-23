<template>
  <NInput v-model:value="inputValueLocal" />
</template>

<script lang="ts">
import { useVModel } from '@vueuse/core'
import { NInput } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: { 'updae:value': (value: string) => typeof value === 'string' },
  setup(props, { emit }) {
    const inputValueLocal = useVModel(props, 'value', emit)

    return { inputValueLocal }
  },
  components: {
    NInput,
  },
})
</script>
