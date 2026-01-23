import { useEffect, useState } from 'react';
import BookingActions from '@/components/admin/BookingActions';
import { BookingService, Booking } from '@/services/mockData';
import { format } from 'date-fns';

export default function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        BookingService.getAdminBookings().then(setBookings);
    }, []);

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-heading text-[#d4af37]">Reservas</h1>
                <div className="text-neutral-400 font-mono text-sm">
                    Total: {bookings.length}
                </div>
            </header>

            <div className="relative overflow-x-auto rounded-sm border border-[#BF953F]/20 shadow-2xl">
                <table className="w-full text-sm text-left text-neutral-400">
                    <thead className="bg-[#BF953F]/10 uppercase tracking-wider text-xs font-bold text-[#FCF6BA]">
                        <tr>
                            <th className="p-4">Ref</th>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Servicio</th>
                            <th className="p-4">Staff</th>
                            <th className="p-4">Fecha</th>
                            <th className="p-4">Hora</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-xs">{booking.id.substring(0, 8).toUpperCase()}</td>
                                <td className="p-4 font-bold text-white">{booking.user?.name || 'Invitado'}</td>
                                <td className="p-4">{booking.service?.name}</td>
                                <td className="p-4">{booking.staff?.name}</td>
                                <td className="p-4">{format(new Date(booking.date), 'd MMM yyyy')}</td>
                                <td className="p-4 font-mono">{format(new Date(booking.date), 'HH:mm')} - {format(new Date(booking.endTime), 'HH:mm')}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-xs text-[10px] font-bold uppercase tracking-widest ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                                            booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <BookingActions booking={booking} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
