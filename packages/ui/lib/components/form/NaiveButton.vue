<template>
  <NButton round :type="type" @click="handleClick">
    <slot />
  </NButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { NButton } from 'naive-ui'
import { Type } from 'naive-ui/es/button/src/interface'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<Type>,
      default: 'primary',
    },
  },
  emits: ['click'],
  setup(_, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    return { handleClick }
  },
  components: {
    NButton,
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
