import create from 'zustand';

const usePromptStore = create((set) => ({
    prompts: [],
    addPrompt: (prompt) => set((state) => ({ prompts: [...state.prompts, prompt] })),
    clearPrompts: () => set({ prompts: [] }),
  }));
  const useCreditStore = create((set) => ({
    user_id: [],
    addPrompt: (prompt) => set((state) => ({ prompts: [...state.prompts, prompt] })),
    clearPrompts: () => set({ prompts: [] }),
  }));
export default {usePromptStore,useCreditStore};