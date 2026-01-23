// Temporary mock data service to replace Server Actions during migration
import { addDays, setHours, setMinutes } from 'date-fns';

export interface Booking {
    id: string;
    date: string; // ISO string
    endTime: string; // ISO string
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
    user: { name: string; email: string };
    staff: { name: string; id: string };
    service: { name: string; id: string; price: number; duration: number };
}

const today = new Date();
const tomorrow = addDays(today, 1);

// Mock Data Store
let MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        date: setMinutes(setHours(tomorrow, 10), 0).toISOString(),
        endTime: setMinutes(setHours(tomorrow, 10), 30).toISOString(),
        status: 'CONFIRMED',
        user: { name: 'Juan Pérez', email: 'juan@example.com' },
        staff: { name: 'Alice Vogue', id: 's1' },
        service: { name: 'Corte Caballero', id: 'srv1', price: 25, duration: 30 }
    },
    {
        id: '2',
        date: setMinutes(setHours(tomorrow, 11), 0).toISOString(),
        endTime: setMinutes(setHours(tomorrow, 12), 0).toISOString(),
        status: 'PENDING',
        user: { name: 'María García', email: 'maria@example.com' },
        staff: { name: 'Marco Style', id: 's2' },
        service: { name: 'Tinte Completo', id: 'srv2', price: 60, duration: 60 }
    },
    {
        id: '3',
        date: setMinutes(setHours(addDays(today, 5), 16), 0).toISOString(),
        endTime: setMinutes(setHours(addDays(today, 5), 16), 45).toISOString(),
        status: 'CONFIRMED',
        user: { name: 'Carlos Ruíz', email: 'carlos@example.com' },
        staff: { name: 'Alice Vogue', id: 's1' },
        service: { name: 'Afeitado Clásico', id: 'srv3', price: 20, duration: 45 }
    }
];

export const BookingService = {
    getAdminBookings: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...MOCK_BOOKINGS];
    },

    deleteBooking: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        MOCK_BOOKINGS = MOCK_BOOKINGS.filter(b => b.id !== id);
        return { success: true };
    },

    updateBookingStatus: async (id: string, status: any): Promise<{ success: boolean; error?: string }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const idx = MOCK_BOOKINGS.findIndex(b => b.id === id);
        if (idx !== -1) {
            MOCK_BOOKINGS[idx] = { ...MOCK_BOOKINGS[idx], status };
            return { success: true };
        }
        return { success: false, error: 'Not found' };
    },

    updateBookingDetails: async (id: string, data: any): Promise<{ success: boolean; error?: string }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const idx = MOCK_BOOKINGS.findIndex(b => b.id === id);
        if (idx !== -1) {
            // Mock update logic
            const old = MOCK_BOOKINGS[idx];
            MOCK_BOOKINGS[idx] = {
                ...old,
                date: data.date.toISOString(),
                // simplified mock update
            };
            return { success: true };
        }
        return { success: false, error: 'Booking not found' };
    },

    getFormData: async () => {
        return {
            staff: [
                { id: 's1', name: 'Alice Vogue' },
                { id: 's2', name: 'Marco Style' }
            ],
            services: [
                { id: 'srv1', name: 'Corte Caballero', price: 25, duration: 30 },
                { id: 'srv2', name: 'Tinte Completo', price: 60, duration: 60 },
                { id: 'srv3', name: 'Afeitado Clásico', price: 20, duration: 45 }
            ]
        }
    }
};
