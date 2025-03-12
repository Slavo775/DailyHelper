<template>
  <div class="text-json-renderer">
    <template v-for="(text, index) in json" :key="index">
      <div class="text-json-renderer__text">
        <span class="text-json-renderer__text__index"
          ><strong>{{ index }}</strong
          >:</span
        >
        <span>{{ text }}</span>
        <NaiveButton
          class="text-json-renderer__text__copy-button"
          @click="copyToClipboard(text.toString())"
          strong
          secondary
          circle
          ><NIcon><ContentCopyFilled /></NIcon
        ></NaiveButton>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ContentCopyFilled } from '@vicons/material'
import NaiveButton from './form/NaiveButton.vue'
import { NIcon } from 'naive-ui'

export default defineComponent({
  props: {
    json: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },
  setup() {
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text)
    }

    return { copyToClipboard }
  },
  components: {
    NaiveButton,
    NIcon,
    ContentCopyFilled,
  },
})
</script>

<style lang="scss">
.text-json-renderer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  &__text {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    gap: 10px;
    &:hover {
      background-color: rgba(236, 236, 236, 0.1);
    }
    &__index {
      text-transform: capitalize;
    }
    &__copy-button {
      justify-self: flex-end;
      margin-left: auto;
    }
  }
}
</style>
