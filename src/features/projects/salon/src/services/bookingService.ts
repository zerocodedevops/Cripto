import { supabase } from '@/lib/supabase';

export const BookingService = {
    deleteBooking: async (id: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Error deleting booking:', error);
            return { success: false, error: error.message };
        }
    },

    updateBookingStatus: async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Error updating status:', error);
            return { success: false, error: error.message };
        }
    },

    updateBookingDetails: async (id: string, data: { date: Date, time: string, staffId?: string, serviceId?: string }) => {
        try {
            // FIX: Use local date components to avoid toISOString() converting to UTC
            const year = data.date.getFullYear();
            const month = String(data.date.getMonth() + 1).padStart(2, '0');
            const day = String(data.date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const payload: any = {
                date: formattedDate,
                time: data.time
            };

            if (data.staffId) payload.stylist_id = data.staffId;
            // Note: services are array in DB, simpler edit currently assumes single service update logic needs check
            // For now let's just update date/time/staff which are 1:1
            // payload.service_ids = [data.serviceId]; // Be careful overwriting multiple services

            const { error } = await supabase
                .from('bookings')
                .update(payload)
                .eq('id', id);

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Error updating booking:', error);
            return { success: false, error: error.message };
        }
    },

    getFormData: async () => {
        const { data: staff } = await supabase.from('stylists').select('id, name, available');
        const { data: services } = await supabase.from('services').select('id, title, duration, price');

        return {
            staff: staff || [],
            services: services?.map(s => ({ ...s, name: s.title })) || []
        };
    }
};
