<template>
  <NMenu
    :active-key="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";
import { NMenu, NLayoutSider, NLayout } from "naive-ui";
import type { MenuOption } from "naive-ui";

export type MenuOptions = MenuOption[];

export default defineComponent({
  props: {
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
  },
  setup() {
    const activeKey = ref("");
    const collapsed = ref(false);

    return { activeKey, collapsed };
  },
  components: { NMenu, NLayoutSider, NLayout },
});
</script>
