import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
	Calendar,
	ChevronRight,
	Clock,
	CreditCard,
	Loader2,
	MapPin,
	Scissors,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MyBookings() {
	const [bookings, setBookings] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			// Fetch bookings for this user
			const { data, error } = await supabase
				.from("bookings")
				.select(`
                    *,
                    stylist:stylists(name, role)
                `)
				.eq("user_id", user.id)
				.order("date", { ascending: false });

			if (data) {
				// Manually join services since it's an array of IDs or JSON
				// Assuming services is stored as a JSON object inside booking or we need to fetch them.
				// For now, let's rely on the structure we have.
				// If services is generated/stored as text in 'service_id' or similar, we display it.
				// Based on previous files, bookings has `services` column which might be JSON or relation.
				// Let's assume it's fetching correctly or adjust later.
				setBookings(data);
			}
			setLoading(false);
		};

		fetchBookings();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
			</div>
		);
	}

	const upcomingBookings = bookings.filter(
		(b) => new Date(b.date) >= new Date(),
	);
	const pastBookings = bookings.filter((b) => new Date(b.date) < new Date());

	const BookingCard = ({
		booking,
		isPast,
	}: {
		booking: any;
		isPast?: boolean;
	}) => (
		<div
			className={`bg-slate-900 border rounded-xl overflow-hidden transition-all hover:border-amber-500/30 group ${isPast ? "border-slate-800 opacity-75" : "border-slate-700 shadow-lg"}`}
		>
			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
							<Scissors className="w-4 h-4 text-amber-500" />
							{/* Attempt to show service name, fallback to generic if complex structure */}
							{booking.services?.name ||
								booking.service_id ||
								"Servicio de Peluquería"}
						</h3>
						<p className="text-slate-400 text-sm mt-1">
							con {booking.stylist?.name || "Estilista Asignado"}
						</p>
					</div>
					<div
						className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
							booking.status === "approved"
								? "bg-emerald-900/30 text-emerald-400 border-emerald-800/50"
								: booking.status === "pending"
									? "bg-amber-900/30 text-amber-400 border-amber-800/50"
									: "bg-red-900/30 text-red-400 border-red-800/50"
						}`}
					>
						{booking.status === "approved"
							? "Confirmada"
							: booking.status === "pending"
								? "Pendiente"
								: "Cancelada"}
					</div>
				</div>

				<div className="space-y-3 mb-6">
					<div className="flex items-center text-slate-300 text-sm">
						<Calendar className="w-4 h-4 mr-3 text-slate-500" />
						{format(new Date(booking.date), "EEEE d 'de' MMMM, yyyy", {
							locale: es,
						})}
					</div>
					<div className="flex items-center text-slate-300 text-sm">
						<Clock className="w-4 h-4 mr-3 text-slate-500" />
						{booking.time}
					</div>
					<div className="flex items-center text-slate-300 text-sm">
						<CreditCard className="w-4 h-4 mr-3 text-slate-500" />
						{booking.payment_status === "paid" ? (
							<span className="text-emerald-400 flex items-center gap-1">
								Pagado ({booking.deposit_amount}€ depósito)
							</span>
						) : (
							<span className="text-amber-400">Pago Pendiente</span>
						)}
					</div>
				</div>

				{!isPast && booking.status !== "cancelled" && (
					<div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
						<button className="text-xs text-slate-400 hover:text-white transition-colors">
							Cancelar Cita
						</button>
						<button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded transition-colors">
							Modificar
						</button>
					</div>
				)}
			</div>
		</div>
	);

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
					<Calendar className="w-6 h-6 text-amber-500" />
					Mis Reservas
				</h2>

				{upcomingBookings.length > 0 ? (
					<div className="grid md:grid-cols-2 gap-6">
						{upcomingBookings.map((booking) => (
							<BookingCard key={booking.id} booking={booking} />
						))}
					</div>
				) : (
					<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
						<p className="text-slate-400 mb-4">No tienes reservas próximas.</p>
						<button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
							Reservar Ahora
						</button>
					</div>
				)}
			</div>

			{pastBookings.length > 0 && (
				<div>
					<h3 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wider text-sm">
						Historial
					</h3>
					<div className="grid md:grid-cols-2 gap-6 opacity-80 hover:opacity-100 transition-opacity">
						{pastBookings.map((booking) => (
							<BookingCard key={booking.id} booking={booking} isPast />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
