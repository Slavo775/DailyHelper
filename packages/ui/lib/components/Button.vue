<template>
  <NButton>
    <slot></slot>
  </NButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NButton } from "naive-ui";

export default defineComponent({
  components: { NButton },
});
</script>

<style scoped></style>
