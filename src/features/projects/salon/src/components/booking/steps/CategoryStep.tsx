import { motion } from 'framer-motion'
import { useBookingStore } from '@/store/useBookingStore'
import { useTranslations } from 'next-intl'
import { Scissors, Palette, Sparkles, User } from 'lucide-react'

// Map categories to icons
const getIcon = (cat: string) => {
    if (cat.includes('Corte') || cat.includes('Barbería') || cat.includes('Hair')) return <Scissors className="w-8 h-8 mb-4 text-neutral-400 group-hover:text-black transition-colors" />
    if (cat.includes('Color')) return <Palette className="w-8 h-8 mb-4 text-neutral-400 group-hover:text-black transition-colors" />
    if (cat.includes('Estética') || cat.includes('Skin')) return <Sparkles className="w-8 h-8 mb-4 text-neutral-400 group-hover:text-black transition-colors" />
    return <User className="w-8 h-8 mb-4 text-neutral-400 group-hover:text-black transition-colors" />
}

export default function CategoryStep({ categories }: Readonly<{ categories: string[] }>) {
    const t = useTranslations('Booking')
    const { setCategory } = useBookingStore()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2 text-center md:text-left">
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Step 01</span>
                <h2 className="text-3xl md:text-5xl font-baroque text-neutral-100">{t('selectCategory')}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className="group relative p-8 border border-white/10 bg-white/5 hover:bg-gold-500 transition-all duration-300 rounded-sm flex flex-col items-center justify-center text-center aspect-square"
                    >
                        {getIcon(cat)}
                        <span className="font-body text-sm tracking-widest text-neutral-300 group-hover:text-black uppercase font-bold">
                            {cat}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
