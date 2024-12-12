<template>
  <NLayout style="height: 100%">
    <NLayout style="padding: 10px; height: 100px">
      <NLayoutHeader style="height: 100%">
        <slot name="header" />
      </NLayoutHeader>
    </NLayout>
    <NLayout has-sider style="height: calc(100% - 100px)">
      <NLayoutSider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
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
import { defineComponent, ref } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
} from "naive-ui";

export default defineComponent({
  setup() {
    const collapsed = ref(false);

    return { collapsed };
  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
  },
});
</script>
