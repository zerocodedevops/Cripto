import { motion } from 'framer-motion'
import { useBookingStore } from '@salon/store/useBookingStore'
import { useTranslations } from 'next-intl'
import { Check, ArrowLeft } from 'lucide-react'
import { Button } from '@salon/components/ui/button'

export default function ServiceStep({ services }: Readonly<{ services: any[] }>) {
    const t = useTranslations('Booking')
    const { selectedCategory, setService, setStep } = useBookingStore()

    // Filter services by category
    const filteredServices = services.filter(s => s.category === selectedCategory)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="text-neutral-500 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="space-y-1">
                    <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Step 02</span>
                    <h2 className="text-2xl md:text-4xl font-baroque text-neutral-100">{t('selectService')}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredServices.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setService(service.id)}
                        className="group relative flex items-center justify-between p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-sm text-left"
                    >
                        <div>
                            <h3 className="font-baroque text-xl text-neutral-200 group-hover:text-gold-500 transition-colors">{service.name}</h3>
                            <p className="font-body text-xs text-neutral-500 mt-1">{service.description}</p>
                            <p className="font-mono text-xs text-neutral-600 mt-2">{service.duration} min • {service.price}€</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold-500 group-hover:bg-gold-500 transition-all">
                            <Check className="w-4 h-4 text-black opacity-0 group-hover:opacity-100" />
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
