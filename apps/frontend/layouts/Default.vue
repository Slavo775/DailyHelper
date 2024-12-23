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
import type { MenuOptions } from '@daily-helper/ui/lib/components/NaiveNavigation.vue'
import { RouterLink } from 'vue-router'
import { Autocorrect20Filled, Home12Regular } from '@vicons/fluent'
import type { RenderIcon } from '@daily-helper/ui/types'

const getMenuOptions = (renderIcon: RenderIcon): MenuOptions => [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/',
        },
        { default: () => 'Home' }
      ),
    key: 'index',
    icon: renderIcon(Home12Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'sentence-corrector',
          },
        },
        { default: () => 'Sentence Corrector' }
      ),
    key: 'sentence-corrector',
    icon: renderIcon(Autocorrect20Filled),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'sentence-corrector',
          },
        },
        { default: () => 'Sentence Corrector' }
      ),
    key: 'sentence-corrector-1',
    icon: renderIcon(Autocorrect20Filled),
  },
]

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
