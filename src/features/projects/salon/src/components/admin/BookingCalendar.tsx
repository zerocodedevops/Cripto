'use client'

import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'

import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState, useMemo } from 'react'

const locales = {
    'en-US': enUS,
    'es': es,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface BookingCalendarProps {
    bookings: any[]
    defaultDate?: Date
}

export default function BookingCalendar({ bookings, defaultDate = new Date() }: BookingCalendarProps) {
    const [view, setView] = useState<any>('month')

    const { views, defaultView, formats, messages } = useMemo(() => ({
        defaultView: Views.MONTH,
        views: [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA],
        formats: {
            dateFormat: 'dd',
            dayFormat: (date: Date, culture: any, localizer: any) =>
                localizer.format(date, 'EEE', culture),
        },
        messages: {
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
            noEventsInRange: 'No hay reservas en este rango.',
            showMore: (total: number) => `+${total} más`,
        },
    }), [])

    return (
        <Calendar
            localizer={localizer}
            events={bookings.map(b => ({
                id: b.id,
                title: `${b.user?.name || 'Cliente'} - ${b.service?.name}`,
                start: new Date(b.date),
                end: new Date(b.endTime),
                resource: b
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            defaultView={defaultView}
            defaultDate={defaultDate}
            views={views}
            formats={formats}
            messages={messages}
            culture="es"
            className="text-neutral-200 font-sans"
        />
    )
}
