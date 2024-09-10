import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HousieStore {
  tickets: number[][][];
  confirmedNumbers: number[];
  addConfirmedNumber: (number: number) => void;
  addTicket: (ticket: number[][]) => void;
  reset: () => void;
}

export const useHousieStore = create<HousieStore>()(
  persist(
    (set) => ({
      tickets: [] as number[][][],
      confirmedNumbers: [] as number[],
      addConfirmedNumber: (number: number) =>
        set((state) => ({
          confirmedNumbers: [...state.confirmedNumbers, number],
        })),
      addTicket: (ticket: number[][]) =>
        set((state) => ({ tickets: [...state.tickets, ticket] })),
      reset: () => set({ tickets: [], confirmedNumbers: [] }),
    }),
    {
      name: "housie-store", // Specify a name for the store
      getStorage: () => localStorage, // Use localStorage as the storage mechanism
    }
  )
);
