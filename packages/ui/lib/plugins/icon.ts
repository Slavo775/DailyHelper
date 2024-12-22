import { Component, h } from "vue";
import { NIcon } from "naive-ui";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      renderIcon: (icon: Component) => () =>
        h(NIcon, null, { default: () => h(icon) }),
    },
  };
});
