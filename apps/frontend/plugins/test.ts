export default defineNuxtPlugin(() => ({
  provide: {
    test: () => console.log("test"),
  },
}));
