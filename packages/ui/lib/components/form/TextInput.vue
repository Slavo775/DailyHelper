<template>
  <NInput v-model:value="inputValueLocal[path]" />
</template>

<script lang="ts">
import { NFormItemGi, NInput } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  components: {
    NInput,
    NFormItemGi,
  },
})
</script>
