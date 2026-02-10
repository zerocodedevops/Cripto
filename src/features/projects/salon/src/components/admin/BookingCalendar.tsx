import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
	Calendar,
	dateFnsLocalizer,
	type View,
	Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const locales = {
	"en-US": enUS,
	es: es,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

interface BookingCalendarProps {
	readonly bookings?: any[];
	readonly className?: string;
	readonly onSelectBooking?: (booking: any) => void;
	readonly onRefresh?: () => void;
}

const messages = {
	date: "Fecha",
	time: "Hora",
	event: "Evento",
	allDay: "Todo el día",
	week: "Semana",
	work_week: "Semana laboral",
	day: "Día",
	month: "Mes",
	previous: "Anterior",
	next: "Siguiente",
	yesterday: "Ayer",
	tomorrow: "Mañana",
	today: "Hoy",
	agenda: "Agenda",
	noEventsInRange: "No hay citas en este rango.",
	showMore: (total: number) => `+${total} más`,
};

const CustomToolbar = (toolbar: any) => {
	const goToBack = () => {
		toolbar.onNavigate("PREV");
	};

	const goToNext = () => {
		toolbar.onNavigate("NEXT");
	};

	const goToCurrent = () => {
		toolbar.onNavigate("TODAY");
	};

	const label = () => {
		const date = toolbar.date;
		return (
			<span className="capitalize">
				{format(date, toolbar.view === "month" ? "MMMM yyyy" : "MMMM dd", {
					locale: es,
				})}
			</span>
		);
	};

	return (
		<div className="flex items-center justify-between mb-4 px-2">
			<div className="flex items-center gap-2">
				<button
					onClick={goToBack}
					className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
					type="button"
				>
					<ChevronLeft className="w-5 h-5" />
				</button>
				<button
					onClick={goToCurrent}
					className="px-3 py-1 text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-800/50 rounded-md hover:bg-amber-900/50 transition-colors"
					type="button"
				>
					Hoy
				</button>
				<button
					onClick={goToNext}
					className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
					type="button"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
				<span className="text-slate-200 font-medium ml-2 text-lg">
					{label()}
				</span>
			</div>

			<div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
				<button
					onClick={() => toolbar.onView("week")}
					className={`px-3 py-1 text-xs rounded-md transition-all ${toolbar.view === "week" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
					type="button"
				>
					Semana
				</button>
				<button
					onClick={() => toolbar.onView("day")}
					className={`px-3 py-1 text-xs rounded-md transition-all ${toolbar.view === "day" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
					type="button"
				>
					Día
				</button>
			</div>
		</div>
	);
};

// Custom Event Component - only shows title without time
const CustomEvent = ({ event }: any) => {
	return (
		<div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
			<span>{event.title}</span>
		</div>
	);
};

export default function BookingCalendar({
	bookings = [],
	className,
	onSelectBooking,
	onRefresh,
}: BookingCalendarProps) {
	const [view, setView] = useState<View>(Views.WEEK);
	const [date, setDate] = useState(new Date());

	const { views } = useMemo(
		() => ({
			views: [Views.WEEK, Views.DAY, Views.AGENDA],
		}),
		[],
	);

	// Auto-navigate to first booking if there are bookings
	useEffect(() => {
		if (bookings.length > 0 && bookings[0].date) {
			const firstBookingDate = new Date(bookings[0].date);
			// Only navigate if first booking is in a different week/month
			if (Math.abs(firstBookingDate.getTime() - date.getTime()) > 7 * 24 * 60 * 60 * 1000) {
				setDate(firstBookingDate);
			}
		}
	}, [bookings.length]);

	// Responsive: default to Day view on mobile
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setView(Views.DAY);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Real-time subscription to bookings table
	useEffect(() => {
		if (!onRefresh) return;

		const channel = supabase
			.channel('bookings-changes')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'bookings' },
				() => {
					console.log('📡 Booking change detected, refreshing...');
					onRefresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [onRefresh]);

	const events = bookings.map((b) => {
		// Construct full date string (YYYY-MM-DDTHH:mm:ss)
		// b.date is already "YYYY-MM-DD" format, b.time is "HH:mm:ss"
		const timeStr = b.time || "10:00:00";
		const dateTimeStr = `${b.date}T${timeStr}`;
		const startDate = new Date(dateTimeStr);
		const endDate = new Date(startDate.getTime() + (b.duration || 60) * 60000);

		// Safety check - log ONLY if invalid
		if (isNaN(startDate.getTime())) {
			console.error("❌ Invalid date detected:", {
				original_date: b.date,
				original_time: b.time,
				constructed: dateTimeStr,
			});
		}

		return {
			id: b.id,
			title: `${b.user_name || "Cliente"} - ${b.service_name || "Servicio"} (${b.stylist_name || "Cualquiera"})`,
			start: startDate,
			end: endDate,
			resource: b,
		};
	});

	console.log("📅 Total events generated:", events.length);
	console.log("📅 Passing events to Calendar:", events);

	return (
		<div
			className={`h-[600px] bg-slate-900 border border-slate-800 rounded-xl p-4 ${className}`}
		>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "100%" }}
				views={views}
				view={view}
				onView={setView}
				date={date}
				onNavigate={setDate}
				messages={messages}
				culture="es"
				components={{
					toolbar: CustomToolbar,
					event: CustomEvent,
				}}
				onSelectEvent={(event) => {
					console.log("Calendar Event Clicked:", event);
					onSelectBooking?.(event.resource);
				}}
				className="custom-calendar text-slate-300"
				eventPropGetter={(event) => {
					let backgroundColor = "";

					switch (event.resource.status) {
						case "confirmed":
						case "paid":
							backgroundColor = "#10b981"; // emerald-600
							break;
						case "cancelled":
							backgroundColor = "#dc2626"; // red-600
							break;
						default: // pending
							backgroundColor = "#f59e0b"; // amber-600
					}

					return {
						style: {
							backgroundColor,
							color: "white",
							border: "none",
							borderRadius: "0",
							padding: "4px 8px",
							fontSize: "13px",
							fontWeight: "500",
							opacity: event.resource.status === "cancelled" ? 0.5 : 1,
							cursor: "pointer",
							width: "100%",
							margin: 0,
						}
					};
				}}
			/>

			{/* Custom Styles Injection for overrides */}
			<style>{`
                .rbc-off-range-bg { background: transparent !important; }
                .rbc-calendar { font-family: inherit; }
                .rbc-month-view, .rbc-time-view, .rbc-agenda-view { border: none; }
                .rbc-header { border-bottom: 1px solid #1e293b; padding: 12px 0; font-weight: 500; font-size: 0.875rem; color: #94a3b8; }
                .rbc-day-bg { border-left: 1px solid #1e293b; }
                .rbc-month-row { border-top: 1px solid #1e293b; }
                .rbc-day-bg + .rbc-day-bg { border-left: 1px solid #1e293b; }
                .rbc-today { background-color: rgba(6, 182, 212, 0.05); }
                .rbc-date-cell { padding: 8px; font-size: 0.875rem; color: #cbd5e1; }
                .rbc-off-range { color: #475569; }
                .rbc-time-content { border-top: 1px solid #1e293b; }
                .rbc-time-content > * + * > * { border-left: 1px solid #1e293b; }
                .rbc-timeslot-group { border-bottom: 1px solid #1e293b; }
                .rbc-time-view-resources .rbc-time-gutter, .rbc-time-view-resources .rbc-time-header-gutter { border-right: 1px solid #1e293b; }
                .rbc-time-gutter .rbc-timeslot-group { border-bottom: 1px solid #1e293b; }
                .rbc-label { color: #94a3b8; font-size: 0.75rem; }
                /* Force events to full width */
                .rbc-event { 
                    margin: 0 !important; 
                    left: 0 !important; 
                    width: calc(100% - 2px) !important; 
                    right: 0 !important; 
                    border-right: 2px solid #0f172a !important;
                }
                .rbc-event-content { 
                    padding: 0 !important; 
                    width: 100% !important;
                }
                .rbc-event-label { display: none !important; }
                .rbc-current-time-indicator { background-color: #f59e0b; }

                /* Responsive Mobile/Tablet */
                @media (max-width: 768px) {
                    .rbc-toolbar { flex-direction: column; gap: 8px; align-items: stretch; }
                    .rbc-toolbar > * { justify-content: center; }
                    .rbc-event { font-size: 11px !important; padding: 2px 4px !important; }
                    .rbc-header { font-size: 0.75rem; padding: 8px 0; }
                    .rbc-label { font-size: 0.65rem; }
                }
            `}</style>
		</div>
	);
}
