import {create} from 'zustand';

const matchStore = create((set) => ({
  matches: [],
  currentMatch: null,
  currentIndex: null,

  // Set the matches in the store only if the new matches are different
  setMatches: (newMatches) => set((state) => {
    console.log('setmatches')
    // Check if the new data is actually different from the current state
    if (JSON.stringify(state.matches) !== JSON.stringify(newMatches)) {
      return { matches: newMatches };  // Update only if different
    }
    return {};  // No change if matches are the same
  }),

  setActiveMatch: (match, index) => set({ currentMatch: match, currentIndex: index }),
  reset: () => set({ currentMatch: null, currentIndex: null }),
}));

export default matchStore;
