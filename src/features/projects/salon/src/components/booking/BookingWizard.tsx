"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useBookingStore } from '@/store/useBookingStore'

// Step Components (Inline for now or imported later)
import CategoryStep from '@/components/booking/steps/CategoryStep'
import ServiceStep from '@/components/booking/steps/ServiceStep'
import StaffStep from '@/components/booking/steps/StaffStep'
import DateStep from '@/components/booking/steps/DateStep'
import ConfirmationStep from '@/components/booking/steps/ConfirmationStep'

export default function BookingWizard({ services, staff }: Readonly<{ services: any[], staff: any[] }>) {
    const { step } = useBookingStore()

    // Calculate distinct categories
    const categories = Array.from(new Set(services.map(s => s.category)))

    return (
        <div className="flex-1 h-screen overflow-hidden flex flex-col relative bg-neutral-950">

            {/* Progress Bar */}
            <div className="w-full h-1 bg-neutral-900 absolute top-0 left-0 z-20">
                <motion.div
                    className="h-full bg-gold-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 lg:p-20">
                <div className="max-w-2xl mx-auto w-full h-full flex flex-col justify-center">

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <CategoryStep key="step1" categories={categories} />
                        )}
                        {step === 2 && (
                            <ServiceStep key="step2" services={services} />
                        )}
                        {step === 3 && (
                            <StaffStep key="step3" staff={staff} />
                        )}
                        {step === 4 && (
                            <DateStep key="step4" />
                        )}
                        {step === 5 && (
                            <ConfirmationStep key="step5" />
                        )}
                    </AnimatePresence>

                </div>
            </div>

        </div>
    )
}
