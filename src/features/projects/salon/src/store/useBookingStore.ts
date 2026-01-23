import { create } from 'zustand'

interface BookingState {
    step: number
    selectedCategory: string | null
    serviceId: string | null
    staffId: string | null
    date: Date | null

    setStep: (step: number) => void
    setCategory: (category: string) => void
    setService: (serviceId: string) => void
    setStaff: (staffId: string) => void
    setDate: (date: Date) => void
    reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
    step: 1,
    selectedCategory: null,
    serviceId: null,
    staffId: null,
    date: null,

    setStep: (step) => set({ step }),
    setCategory: (category) => set({ selectedCategory: category, step: 2 }), // Auto advance
    setService: (serviceId) => set({ serviceId, step: 3 }),
    setStaff: (staffId) => set({ staffId, step: 4 }),
    setDate: (date) => set({ date }),
    reset: () => set({ step: 1, selectedCategory: null, serviceId: null, staffId: null, date: null })
}))
