import { create } from 'zustand';

interface RentModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useRentModal = create<RentModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
