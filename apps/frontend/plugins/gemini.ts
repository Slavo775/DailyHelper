import { askGemini } from "@daily-helper/gemini-handler";

export default defineNuxtPlugin((nuxtApp) => ({
  provide: {
    askGemini: (question: string) => {
      const config = useRuntimeConfig();
      return (
        config.public.geminiApiKey &&
        askGemini(question, config.public.geminiApiKey)
      );
    },
  },
}));
