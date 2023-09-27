import create from 'zustand';

const useFlowStore = create((set) => ({
  elements: [],
  setElements: (elements) => set({ elements }),
}));

export default useFlowStore;
