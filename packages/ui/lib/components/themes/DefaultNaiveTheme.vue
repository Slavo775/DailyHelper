<template>
  <NConfigProvider :theme-overrides="themeOverrides" :theme="darkTheme">
    <slot />
  </NConfigProvider>
</template>

<script lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { defineComponent } from "vue";
import { darkTheme } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {};

export default defineComponent({
  setup() {
    return { themeOverrides, darkTheme };
  },
  components: { NConfigProvider },
});
</script>
