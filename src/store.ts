import { create } from "zustand";

interface HousieStore {
  tickets: number[][][];
  confirmedNumbers: number[];
  addConfirmedNumber: (number: number) => void;
  addTicket: (ticket: number[][]) => void;
}

export const useHousieStore = create<HousieStore>((set) => ({
  tickets: [] as number[][][],
  confirmedNumbers: [] as number[],
  addConfirmedNumber: (number: number) =>
    set((state) => ({ confirmedNumbers: [...state.confirmedNumbers, number] })),
  addTicket: (ticket: number[][]) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),
}));
