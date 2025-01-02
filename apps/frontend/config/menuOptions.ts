import { Autocorrect20Filled, Home12Regular } from '@vicons/fluent'
import { GTranslateRound } from '@vicons/material'
import { RouterLink } from 'vue-router'
import type { RenderIcon } from '@daily-helper/ui/types'
import type { MenuOptions } from '@daily-helper/ui/lib/components/NaiveNavigation.vue'

export const getMenuOptions = (renderIcon: RenderIcon): MenuOptions => [
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
            name: 'sentence-translator',
          },
        },
        { default: () => 'Sentence Translator' }
      ),
    key: 'sentence-translator',
    icon: renderIcon(GTranslateRound),
  },
]
