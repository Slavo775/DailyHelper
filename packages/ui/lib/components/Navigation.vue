<template>
    <NMenu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
    />
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { NMenu, NLayoutSider, NLayout } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

export type MenuOptions = MenuOption[]

export default defineComponent({
    props: {
        menuOptions: {
            type: Array as PropType<MenuOption[]>,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    setup() {},
    components: { NMenu, NLayoutSider, NLayout },
})
</script>
