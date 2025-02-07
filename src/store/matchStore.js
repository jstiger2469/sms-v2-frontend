import { create } from 'zustand';

const matchStore = create((set) => ({
  matches: [],
  setMatches: (newMatches) => {
    set((state) => {
      console.log('Previous Zustand matches:', state.matches);
      console.log('New matches to be set:', newMatches);

      if (JSON.stringify(state.matches) !== JSON.stringify(newMatches)) {
        console.log('Updating Zustand store with new matches.');
        return { matches: newMatches };
      }

      console.log('No changes to Zustand store.');
      return state;
    });
  },
}));

export default matchStore;
