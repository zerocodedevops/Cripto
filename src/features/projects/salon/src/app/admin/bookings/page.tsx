import { getAdminBookings } from "@salon/features/admin/actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import BookingActions from "@salon/components/admin/BookingActions";

export default async function AdminBookingsPage() {
    const bookings = await getAdminBookings();

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-heading text-gold-500">Reservas</h1>
                <div className="text-neutral-400 font-mono text-sm">
                    Total: {bookings.length}
                </div>
            </header>

            <div className="bg-neutral-800 border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-400">
                        <thead className="bg-white/5 uppercase tracking-wider text-xs font-bold text-neutral-200">
                            <tr>
                                <th className="p-4">Ref</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Servicio</th>
                                <th className="p-4">Staff</th>
                                <th className="p-4">Fecha</th>
                                <th className="p-4">Hora</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4">Creado</th>
                                <th className="p-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/5 transition-colors text-neutral-300">
                                    <td className="p-4 font-mono text-xs">{booking.id.slice(0, 8).toUpperCase()}</td>
                                    <td className="p-4 font-medium text-white">{booking.user.name || booking.user.email}</td>
                                    <td className="p-4">{booking.service.name}</td>
                                    <td className="p-4">{booking.staff.name}</td>
                                    <td className="p-4">
                                        {format(new Date(booking.date), 'dd MMM yyyy', { locale: es })}
                                    </td>
                                    <td className="p-4 font-mono">
                                        {format(new Date(booking.date), 'HH:mm')} - {format(new Date(booking.endTime), 'HH:mm')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide
                                            ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                                                booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs text-neutral-500">
                                        {format(new Date(booking.createdAt), 'dd/MM/yy HH:mm')}
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
        </div>
    );
}
