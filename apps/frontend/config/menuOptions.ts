import {
  Autocorrect20Filled,
  Home12Regular,
  TicketDiagonal24Regular,
} from '@vicons/fluent'
import { GTranslateRound, LightbulbOutlined } from '@vicons/material'
import { SmartHome } from '@vicons/tabler'
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
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: 'suggest-naming' } },
        { default: () => 'Suggested Naming' }
      ),
    key: 'suggested-naming',
    icon: renderIcon(LightbulbOutlined),
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: 'home-assistant-naming' } },
        { default: () => 'HA Naming' }
      ),
    key: 'home-assistant-naming',
    icon: renderIcon(SmartHome),
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: { name: 'jira-ticket-generator' } },
        { default: () => 'Jira ticket generator' }
      ),
    key: 'jira-ticket-generator',
    icon: renderIcon(TicketDiagonal24Regular),
  },
]
