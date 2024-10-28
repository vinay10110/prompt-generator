import create from 'zustand';

const useStore = create((set) => ({
    cache: {}, 

    
    setCache: (key, value) => set((state) => ({
        cache: {
            ...state.cache,
            [key]: value,
        },
    })),

   
    getCache: (key) => (state) => state.cache[key],

    
    clearCache: () => set({ cache: {} }),
}));

export default useStore;