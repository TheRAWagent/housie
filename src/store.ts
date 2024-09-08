import { create } from "zustand";

interface HousieStore {
    tickets: number[][];
    confirmedNumbers: number[];
    addConfirmedNumber: (number: number) => void;
    addTicket: (ticket: number[]) => void;
    updateTicket: (index: number, ticket: number[]) => void;
    removeTicket: (index: number) => void;
}

export const useHousieStore = create<HousieStore>((set) => ({
    tickets: [] as number[][],
    confirmedNumbers: [] as number[],
    addConfirmedNumber: (number: number) => set((state) => ({ confirmedNumbers: [...state.confirmedNumbers, number] })),
    addTicket: (ticket: number[]) => set((state) => ({ tickets: [...state.tickets, ticket] })),
    updateTicket: (index: number, ticket: number[]) => set((state) => ({ tickets: state.tickets.map((t, i) => i === index ? ticket : t) })),
    removeTicket: (index: number) => set((state) => ({ tickets: state.tickets.filter((_, i) => i !== index) }))
    }));