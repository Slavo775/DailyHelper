<template>
  <UiLayoutsDefaultLayout v-model:collapsed="menuCollapsed">
    <template #header>
      <div class="layout-default__logo">
        <NuxtLink to="/">
          <img src="/imgs/logo.png" width="327" height="80" />
        </NuxtLink>
      </div>
    </template>
    <template #content>
      <slot />
    </template>
    <template #sider>
      <UiNaiveNavigation
        :menu-options="menuOptions"
        :collapsed="menuCollapsed"
      />
    </template>
  </UiLayoutsDefaultLayout>
</template>

<script lang="ts">
import { getMenuOptions } from '~/config/menuOptions'

export default defineComponent({
  setup() {
    const { $renderIcon } = useNuxtApp()
    const menuOptions = getMenuOptions($renderIcon)

    const menuCollapsed = ref(false)

    return { menuOptions, menuCollapsed }
  },
})
</script>

<style lang="scss">
.layout-default {
  display: flex;
  align-items: center;
  &__logo {
    display: flex;

    width: 327px;
    height: 80px;

    @include respond-to('sm') {
      width: 200px;
      height: 49px;
      & img {
        width: 200px;
        height: 49px;
      }
    }
  }
}
</style>
