<template>
  <NLayout style="height: 100%">
    <NLayout style="padding: 10px; height: 100px">
      <NLayoutHeader
        style="
          height: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        "
      >
        <slot name="header" />
      </NLayoutHeader>
    </NLayout>
    <NLayout has-sider style="height: calc(100% - 100px)">
      <NLayoutSider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsedLocal"
        show-trigger
        @collapse="collapsedLocal = true"
        @expand="collapsedLocal = false"
      >
        <slot name="sider" />
      </NLayoutSider>
      <NLayoutContent content-style="padding: 24px;">
        <slot name="content" />
      </NLayoutContent>
    </NLayout>
    <NLayoutFooter content-style="padding: 24px;">
      <slot name="footer" />
    </NLayoutFooter>
  </NLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
} from 'naive-ui'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: { 'update:collapsed': (value: boolean) => typeof value === 'boolean' },
  setup(props, { emit }) {
    const collapsedLocal = useVModel(props, 'collapsed', emit)

    return { collapsedLocal }
  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
  },
})
</script>
