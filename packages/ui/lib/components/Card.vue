<template>
  <NCard
    :title="title"
    contentClass="card__content"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <slot>
      <VueMarkdown :source="content" />
    </slot>
    <template #footer>
      <slot name="footer">
        {{ footerContent }}
      </slot>
    </template>
  </NCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NCard } from 'naive-ui'
import VueMarkdown from 'vue-markdown-render'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    headerExtra: {
      type: String,
      default: '',
    },
    footerContent: {
      type: String,
      default: '',
    },
  },

  components: {
    NCard,
    VueMarkdown,
  },
})
</script>

<style lang="scss">
.card {
  &__content {
    & > div {
      & > p,
      & > ul {
        margin: 0;
        line-height: 1;
      }
    }
  }
}
</style>
