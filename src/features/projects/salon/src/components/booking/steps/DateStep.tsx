"use client"
import { useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { useBookingStore } from '@salon/store/useBookingStore'
import { useTranslations } from 'next-intl'
import { ArrowLeft, Clock } from 'lucide-react'
import { Button } from '@salon/components/ui/button'
import { getAvailableSlots } from '@salon/features/booking/actions'

export default function DateStep() {
    const t = useTranslations('Booking')
    const { serviceId, staffId, setDate, setStep } = useBookingStore()
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [slots, setSlots] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setSelectedDate(val)
        if (!val) return

        setLoading(true)
        try {
            const d = new Date(val)
            const targetStaff = staffId === 'any' ? undefined : staffId
            const slotsFound = await getAvailableSlots(d, serviceId || '', targetStaff || null)
            setSlots(slotsFound)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSlotSelect = async (slot: any) => {
        // Construct date from selectedDate and slot.time ("HH:mm")
        const dateTimeString = `${selectedDate}T${slot.time}`
        const d = new Date(dateTimeString)
        setDate(d)
        setStep(5)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(3)} className="text-neutral-500 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="space-y-1">
                    <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Step 04</span>
                    <h2 className="text-2xl md:text-4xl font-baroque text-neutral-100">{t('date')}</h2>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
                    <label htmlFor="date-input" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Select Date</label>
                    <input
                        id="date-input"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full bg-transparent text-neutral-200 border-none focus:ring-0 text-xl font-baroque"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-neutral-500">Available Slots</h3>

                    {loading && <div className="text-gold-500 animate-pulse text-sm">Checking availability...</div>}

                    {!loading && slots.length === 0 && selectedDate && (
                        <div className="text-neutral-600 italic text-sm">No slots available for this date.</div>
                    )}

                    <div className="grid grid-cols-3 gap-3">
                        {slots.map((slot) => (
                            <button
                                key={slot.time}
                                onClick={() => handleSlotSelect(slot)}
                                className="p-3 border border-white/10 bg-white/5 hover:bg-gold-500 hover:text-black transition-all rounded-sm flex items-center justify-center gap-2 group"
                            >
                                <Clock className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                                <span className="font-mono text-sm">
                                    {slot.time}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
