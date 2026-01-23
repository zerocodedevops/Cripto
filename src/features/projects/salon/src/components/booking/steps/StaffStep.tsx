import { motion } from 'framer-motion'
import { useBookingStore } from '@/store/useBookingStore'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StaffStep({ staff }: Readonly<{ staff: any[] }>) {
    const t = useTranslations('Booking')
    const { setStaff, setStep } = useBookingStore()

    // In a real app we might filter staff by service capability here
    // For now show all

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="text-neutral-500 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="space-y-1">
                    <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Step 03</span>
                    <h2 className="text-2xl md:text-4xl font-baroque text-neutral-100">{t('selectStaff')}</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <button
                    onClick={() => setStaff('any')}
                    className="group flex flex-col items-center gap-4 p-6 border border-white/5 bg-white/5 hover:bg-gold-500/10 hover:border-gold-500 transition-all rounded-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 group-hover:border-gold-500 transition-colors">
                        <span className="font-baroque text-xl text-neutral-400 group-hover:text-gold-500">?</span>
                    </div>
                    <span className="font-body text-sm font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider">Any Specialist</span>
                </button>

                {staff.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setStaff(s.id)}
                        className="group flex flex-col items-center gap-4 p-6 border border-white/5 bg-white/5 hover:bg-gold-500/10 hover:border-gold-500 transition-all rounded-sm"
                    >
                        <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden relative">
                            {/* Placeholder Avatar */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800" />
                            <span className="relative font-baroque text-xl text-neutral-400 group-hover:text-gold-500 z-10">{s.name.charAt(0)}</span>
                        </div>
                        <div className="text-center">
                            <h3 className="font-body text-sm font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider">{s.name}</h3>
                            <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">{s.role || 'Specialist'}</p>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
