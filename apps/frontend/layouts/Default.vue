<template>
  <UiLayoutsDefaultLayout>
    <template #header>
      <div class="layout-default__logo">
        <img src="/imgs/logo.png" width="327" height="80" />
      </div>
    </template>
    <template #content>
      <slot />
    </template>
    <template #sider>
      <UiNavigation :menu-options="menuOptions" />
    </template>
  </UiLayoutsDefaultLayout>
</template>

<script lang="ts">
import type { MenuOptions } from "@daily-helper/ui/lib/components/Navigation.vue";
import logo from "";

const menuOptions: MenuOptions = [
  {
    label: "Hear the Wind Sing",
    key: "hear-the-wind-sing",
    href: "https://en.wikipedia.org/wiki/Hear_the_Wind_Sing",
  },
];

export default defineComponent({
  setup() {
    return { menuOptions };
  },
});
</script>

<style lang="scss">
.layout-default {
  &__logo {
    display: flex;
  }
}
</style>
