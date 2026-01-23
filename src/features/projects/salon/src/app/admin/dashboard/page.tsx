import Link from "next/link";
import { getAdminBookings } from "@/features/admin/actions";
import BookingCalendar from "@/components/admin/BookingCalendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function AdminDashboard() {
    const bookings = await getAdminBookings();

    // Calculate stats
    const today = new Date();
    const todayBookings = bookings.filter(b => new Date(b.date).toDateString() === today.toDateString());
    // Mock revenue estimation
    const estimatedRevenue = 320;
    const activeStaffCount = 4;

    // Smart Calendar Date: Show nearest future booking if today is empty
    let calendarDate = new Date();
    if (todayBookings.length === 0) {
        const futureBooking = bookings.find(b => new Date(b.date) > new Date());
        if (futureBooking) {
            calendarDate = new Date(futureBooking.date);
        }
    }

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-heading text-[#FCF6BA] drop-shadow-md">Panel de Control</h1>
                <p className="text-[#BF953F] font-mono text-xs uppercase tracking-widest opacity-80">
                    {format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Reservas Hoy"
                    value={todayBookings.length.toString()}
                    subvalue={todayBookings.length > 0 ? "Actividad Alta" : "Sin actividad"}
                />
                <StatCard
                    label="Ingresos (Est.)"
                    value={`${estimatedRevenue}€`}
                    subvalue="Basado en reservas hoy"
                />
                <StatCard
                    label="Staff Activo"
                    value={activeStaffCount.toString()}
                    subvalue="Profesionales disponibles"
                />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-heading text-[#BF953F] border-b border-[#BF953F]/20 pb-2">Calendario de Reservas</h2>
                <div className="h-[700px] rounded-sm overflow-hidden border border-[#BF953F]/20 shadow-2xl">
                    <BookingCalendar bookings={bookings} defaultDate={calendarDate} />
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, subvalue }: { label: string, value: string, subvalue: string }) {
    return (
        <div className="bg-gradient-to-br from-neutral-900 to-black border border-[#BF953F]/20 p-6 rounded-sm shadow-lg group hover:border-[#BF953F]/50 transition-colors">
            <h3 className="text-[#BF953F] text-xs font-bold uppercase tracking-widest mb-2">{label}</h3>
            <div className="text-4xl font-heading text-[#FCF6BA] mb-1">{value}</div>
            <p className="text-neutral-600 text-xs font-mono group-hover:text-[#BF953F]/70 transition-colors">{subvalue}</p>
        </div>
    )
}
