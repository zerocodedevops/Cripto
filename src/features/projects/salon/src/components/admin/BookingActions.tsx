'use client'

import { useState } from 'react'
import { Trash2, MoreHorizontal, CheckCircle, XCircle, Edit } from 'lucide-react'
import { BookingService } from '@salon/services/bookingService'
import BookingEditModal from './BookingEditModal'

export default function BookingActions({ booking }: { readonly booking: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    // Extract ID and Status for actions
    const bookingId = booking.id
    const currentStatus = booking.status

    const handleDelete = async () => {
        if (!confirm('¿Seguro que quieres eliminar esta reserva permanentemente?')) return

        const res = await BookingService.deleteBooking(bookingId)

        if (res.success) {
            globalThis.location.reload()
        } else {
            alert('Error al eliminar: ' + (res.error || 'Desconocido'))
        }
    }

    const handleStatus = async (status: 'confirmed' | 'cancelled') => {
        // Lowercase status to match DB enum
        // Explicit cast because DB type is strict but component might pass uppercase
        await BookingService.updateBookingStatus(bookingId, status.toLowerCase() as any)
        setIsOpen(false)
        globalThis.location.reload()
    }

    return (
        <>
            <div className="relative inline-block">
                <button
                    onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                    onBlur={() => setTimeout(() => setIsOpen(false), 300)} // Delay to allow click on menu items
                    className="p-2 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors"
                    title="Acciones"
                    type="button"
                >
                    <MoreHorizontal size={16} />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div
                        role="menu"
                        tabIndex={0}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-white/10 rounded-sm shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200"
                    >
                        <div className="p-1 space-y-1">
                            <button
                                onClick={() => { setIsEditOpen(true); setIsOpen(false); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-[#FCF6BA] hover:bg-white/5 rounded-sm"
                            >
                                <Edit size={14} /> Editar
                            </button>
                            <div className="h-px bg-white/10 my-1" />
                            {currentStatus !== 'confirmed' && (
                                <button
                                    onClick={() => handleStatus('confirmed')}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-green-500 hover:bg-white/5 rounded-sm"
                                >
                                    <CheckCircle size={14} /> Confirmar
                                </button>
                            )}
                            {currentStatus !== 'cancelled' && (
                                <button
                                    onClick={() => handleStatus('cancelled')}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-yellow-500 hover:bg-white/5 rounded-sm"
                                >
                                    <XCircle size={14} /> Cancelar
                                </button>
                            )}
                            <div className="h-px bg-white/10 my-1" />
                            <button
                                onClick={handleDelete}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-red-500 hover:bg-white/5 rounded-sm"
                            >
                                <Trash2 size={14} /> Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Portal */}
            <BookingEditModal booking={booking} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </>
    )
}
