'use client'

import { useState } from 'react'
import { updateAvailability } from '@/features/admin/staffActions'
import { Save, Clock, Trash } from 'lucide-react'

const DAYS = [
    { id: 1, label: 'Lunes' },
    { id: 2, label: 'Martes' },
    { id: 3, label: 'Miércoles' },
    { id: 4, label: 'Jueves' },
    { id: 5, label: 'Viernes' },
    { id: 6, label: 'Sábado' },
    { id: 0, label: 'Domingo' } // Date.getDay() 0 is Sunday
]

export default function AvailabilityEditor({ staffId, initialSchedule }: { staffId: string, initialSchedule: any[] }) {
    const [schedule, setSchedule] = useState(initialSchedule)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        const res = await updateAvailability(staffId, schedule)
        setIsSaving(false)
        if (res.success) {
            alert('Horario guardado correctamente')
        } else {
            alert('Error al guardar horario')
        }
    }

    const updateDay = (dayId: number, start: string, end: string) => {
        const existing = schedule.find(s => s.dayOfWeek === dayId)
        if (existing) {
            setSchedule(schedule.map(s => s.dayOfWeek === dayId ? { ...s, startTime: start, endTime: end } : s))
        } else {
            setSchedule([...schedule, { dayOfWeek: dayId, startTime: start, endTime: end }])
        }
    }

    const removeDay = (dayId: number) => {
        setSchedule(schedule.filter(s => s.dayOfWeek !== dayId))
    }

    return (
        <div className="bg-neutral-800 border border-white/10 rounded-sm p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-lg font-heading text-white">Horario Semanal</h3>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-gold-500 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gold-400"
                >
                    <Save size={16} />
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            <div className="space-y-4">
                {DAYS.map(day => {
                    const slot = schedule.find(s => s.dayOfWeek === day.id)

                    return (
                        <div key={day.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-sm">
                            <div className="w-24 text-sm font-bold text-neutral-300 uppercase tracking-wide">
                                {day.label}
                            </div>

                            {slot ? (
                                <>
                                    <div className="flex items-center gap-2 text-white font-mono">
                                        <Clock size={14} className="text-gold-500" />
                                        <input
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) => updateDay(day.id, e.target.value, slot.endTime)}
                                            className="bg-transparent border-b border-white/20 focus:border-gold-500 outline-none w-20 text-center"
                                        />
                                        <span className="text-neutral-500">-</span>
                                        <input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) => updateDay(day.id, slot.startTime, e.target.value)}
                                            className="bg-transparent border-b border-white/20 focus:border-gold-500 outline-none w-20 text-center"
                                        />
                                    </div>
                                    <button onClick={() => removeDay(day.id)} className="ml-auto text-red-500 hover:text-red-400">
                                        <Trash size={16} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => updateDay(day.id, '09:00', '18:00')}
                                    className="text-xs text-neutral-500 border border-dashed border-neutral-600 px-3 py-1 hover:border-gold-500 hover:text-gold-500 transition-colors"
                                >
                                    + Añadir Horario
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
