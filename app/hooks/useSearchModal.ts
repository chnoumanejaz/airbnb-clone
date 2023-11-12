import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useSearchModal = create<SearchModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
