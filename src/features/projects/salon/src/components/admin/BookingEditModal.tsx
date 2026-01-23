import { useState, useEffect } from 'react'
import { X, Save, Calendar as CalIcon, Clock, User, Scissors } from 'lucide-react'
import { BookingService } from '@/services/mockData'
import { format } from 'date-fns'

interface EditModalProps {
    readonly booking: any
    readonly isOpen: boolean
    readonly onClose: () => void
}

export default function BookingEditModal({ booking, isOpen, onClose }: EditModalProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Form States
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [staffId, setStaffId] = useState('')
    const [serviceId, setServiceId] = useState('')

    // Data for dropdowns
    const [staffList, setStaffList] = useState<any[]>([])
    const [serviceList, setServiceList] = useState<any[]>([])

    useEffect(() => {
        if (isOpen) {
            // Initialize form with booking data
            const bookingDate = new Date(booking.date)
            setDate(format(bookingDate, 'yyyy-MM-dd'))
            setTime(format(bookingDate, 'HH:mm'))
            setStaffId(booking.staffId || booking.staff?.id)
            setServiceId(booking.serviceId || booking.service?.id)

            // Load dropdown data
            BookingService.getFormData().then(data => {
                setStaffList(data.staff)
                setServiceList(data.services)
            })
        }
    }, [isOpen, booking])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Construct Date object
            const [year, month, day] = date.split('-').map(Number)
            const [hour, minute] = time.split(':').map(Number)

            const newDate = new Date(year, month - 1, day, hour, minute)

            const res = await BookingService.updateBookingDetails(booking.id, {
                date: newDate,
                staffId,
                serviceId
            })

            if (res.success) {
                globalThis.location.reload()
                onClose()
            } else {
                setError(res.error || 'Error al actualizar')
            }
        } catch {
            setError('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-neutral-900 border border-[#BF953F]/30 rounded-sm shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <h3 className="text-[#FCF6BA] font-heading tracking-wide">Editar Reserva</h3>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#BF953F] font-bold flex items-center gap-2">
                                <CalIcon size={12} /> Fecha
                            </label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:border-[#BF953F] outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#BF953F] font-bold flex items-center gap-2">
                                <Clock size={12} /> Hora
                            </label>
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:border-[#BF953F] outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[#BF953F] font-bold flex items-center gap-2">
                            <User size={12} /> Profesional
                        </label>
                        <select
                            value={staffId}
                            onChange={(e) => setStaffId(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:border-[#BF953F] outline-none"
                        >
                            <option value="">Seleccionar...</option>
                            {staffList.map(s => (
                                <option key={s.id} value={s.id}>{s.name} {s.active ? '' : '(Inactivo)'}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[#BF953F] font-bold flex items-center gap-2">
                            <Scissors size={12} /> Servicio
                        </label>
                        <select
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:border-[#BF953F] outline-none"
                        >
                            <option value="">Seleccionar...</option>
                            {serviceList.map(s => (
                                <option key={s.id} value={s.id}>{s.name} - {s.duration} min - {s.price}€</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-white/10 text-neutral-400 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors rounded-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-[#BF953F] hover:bg-[#a67c2e] text-black text-xs font-bold uppercase tracking-widest transition-colors rounded-sm flex justify-center items-center gap-2"
                        >
                            {loading ? 'Guardando...' : <><Save size={14} /> Guardar</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
