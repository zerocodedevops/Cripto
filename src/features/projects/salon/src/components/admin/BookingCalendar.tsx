import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { useState, useMemo } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const locales = {
    'en-US': enUS,
    'es': es,
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
}

const messages = {
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Todo el día',
    week: 'Semana',
    work_week: 'Semana laboral',
    day: 'Día',
    month: 'Mes',
    previous: 'Anterior',
    next: 'Siguiente',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    today: 'Hoy',
    agenda: 'Agenda',
    noEventsInRange: 'No hay citas en este rango.',
    showMore: (total: number) => `+${total} más`,
};

const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    const label = () => {
        const date = toolbar.date;
        return (
            <span className="capitalize">
                {format(date, toolbar.view === 'month' ? 'MMMM yyyy' : 'MMMM dd', { locale: es })}
            </span>
        );
    };

    return (
        <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
                <button onClick={goToBack} className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white" type="button">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={goToCurrent} className="px-3 py-1 text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-800/50 rounded-md hover:bg-amber-900/50 transition-colors" type="button">
                    Hoy
                </button>
                <button onClick={goToNext} className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white" type="button">
                    <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-slate-200 font-medium ml-2 text-lg">{label()}</span>
            </div>

            <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                <button
                    onClick={() => toolbar.onView('month')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${toolbar.view === 'month' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    type="button"
                >
                    Mes
                </button>
                <button
                    onClick={() => toolbar.onView('week')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${toolbar.view === 'week' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    type="button"
                >
                    Semana
                </button>
                <button
                    onClick={() => toolbar.onView('day')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${toolbar.view === 'day' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    type="button"
                >
                    Día
                </button>
            </div>
        </div>
    );
};

export default function BookingCalendar({ bookings = [], className, onSelectBooking }: BookingCalendarProps) {
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const { views } = useMemo(() => ({
        views: [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA],
    }), []);

    const events = bookings.map(b => {
        // Construct full date string (YYYY-MM-DDTHH:mm:00)
        // If 'time' is missing or null, default to 10:00 to avoid midnight issues
        const timeStr = b.time ? b.time : '10:00';
        const dateTimeStr = `${b.date.split('T')[0]}T${timeStr}:00`;
        const startDate = new Date(dateTimeStr);

        return {
            id: b.id,
            title: `${b.user_name || 'Cliente'} - ${b.service_name || 'Servicio'}`,
            start: startDate,
            end: new Date(startDate.getTime() + (b.duration || 60) * 60000),
            resource: b
        };
    });

    return (
        <div className={`h-[600px] bg-slate-900 border border-slate-800 rounded-xl p-4 ${className}`}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={views}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                messages={messages}
                culture="es"
                components={{
                    toolbar: CustomToolbar
                }}
                onSelectEvent={(event) => {
                    console.log('Calendar Event Clicked:', event);
                    onSelectBooking?.(event.resource);
                }}
                className="custom-calendar text-slate-300"
                eventPropGetter={(event) => {
                    let newStyle = 'border-none text-white text-xs rounded px-1 py-0.5 opacity-90 hover:opacity-100 cursor-pointer ';

                    switch (event.resource.status) {
                        case 'confirmed':
                        case 'paid':
                            newStyle += 'bg-emerald-600';
                            break;
                        case 'cancelled':
                            newStyle += 'bg-red-600 line-through opacity-50';
                            break;
                        default: // pending
                            newStyle += 'bg-amber-600';
                    }

                    return { className: newStyle };
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
                .rbc-current-time-indicator { background-color: #f59e0b; }
            `}</style>
        </div>
    );
}
