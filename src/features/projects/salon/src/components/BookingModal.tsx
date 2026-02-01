import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, Calendar, MessageSquare, User, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../../../../../lib/supabase';
import type { Stylist } from '../data/stylists';

interface BookingModalProps {
    onClose: () => void;
}

type BookingStep = 1 | 2 | 3;

interface ServiceItem {
    id: string;
    title: string;
    description?: string;
    duration: string;
    price?: number;
    category: string;
}

interface ServiceCategory {
    id: string;
    title: string;
    services: ServiceItem[];
}

export function BookingModal({ onClose }: Readonly<BookingModalProps>) {
    const [step, setStep] = useState<BookingStep>(1);

    // Data State
    const [catalog, setCatalog] = useState<ServiceCategory[]>([]);
    const [stylistsList, setStylistsList] = useState<Stylist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Selection State
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [specialRequests, setSpecialRequests] = useState('');

    // UI State
    const [openCategory, setOpenCategory] = useState<string | null>('color');

    // Fetch Data on Mount
    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Fetch Services
                const { data: servicesData, error: servicesError } = await supabase
                    .from('services')
                    .select('*')
                    .order('category');

                if (servicesError) throw servicesError;

                // Transform flat services to nested catalog
                const grouped = servicesData.reduce((acc: any, service: ServiceItem) => {
                    if (!acc[service.category]) {
                        acc[service.category] = [];
                    }
                    acc[service.category].push(service);
                    return acc;
                }, {});

                const newCatalog: ServiceCategory[] = Object.keys(grouped).map(key => ({
                    id: key,
                    title: key.replace('-', ' ').toUpperCase(),
                    services: grouped[key]
                }));

                setCatalog(newCatalog);

                // 2. Fetch Stylists
                const { data: stylistsData, error: stylistsError } = await supabase
                    .from('stylists')
                    .select('*')
                    .eq('available', true);

                if (stylistsError) throw stylistsError;

                // Map DB keys to UI interface if needed (image_url -> image)
                const mappedStylists = stylistsData.map((s: any) => ({
                    ...s,
                    image: s.image_url
                }));

                setStylistsList(mappedStylists);

            } catch (error) {
                console.error('Error loading data:', error);
                alert('Hubo un error cargando los datos del salón. Por favor intenta más tarde.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Mock Date Generation (Next 7 days)
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d;
    });

    const timeSlots = [
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ];

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(prev => prev === categoryId ? null : categoryId);
    };

    const handleNext = () => {
        if (step < 3) setStep(prev => (prev + 1) as BookingStep);
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => (prev - 1) as BookingStep);
    };

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsSaving(true);
        try {
            // Combine Date and Time into YYYY-MM-DD format (DB expects Date type)
            // Ideally we'd store a proper timestamp, but schema says 'date' and 'time' separate columns.
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const payload = {
                service_ids: selectedServices,
                stylist_id: selectedStylist ? selectedStylist.id : null, // Handle "Anyone" logic appropriately if needed
                date: formattedDate,
                time: selectedTime, // "10:00" format fits 'time' type usually
                customer_notes: specialRequests,
                status: 'pending'
            };

            const { error } = await supabase.from('bookings').insert([payload]);

            if (error) throw error;

            alert('¡Reserva confirmada con éxito! Te esperamos.');
            onClose();

        } catch (error: any) {
            console.error('Booking error:', error);
            alert(`Error al reservar: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const isNextDisabled = () => {
        if (step === 1) return selectedServices.length === 0;
        if (step === 2) return false;
        return false;
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
                <Loader2 className="animate-spin text-[#BF953F]" size={48} />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#121212] w-full max-w-2xl max-h-[90vh] flex flex-col rounded-sm border border-[#BF953F]/30 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Progress */}
                <div className="p-6 border-b border-white/10 bg-[#BF953F]/5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="font-heading text-2xl text-[#FCF6BA]">Reserva tu Cita</h2>
                            <p className="text-neutral-400 text-xs mt-1">
                                {step === 1 && "Paso 1: Selecciona tus servicios"}
                                {step === 2 && "Paso 2: Elige a tu estilista"}
                                {step === 3 && "Paso 3: Fecha y Hora"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                        <motion.div
                            className="h-full bg-[#BF953F]"
                            initial={{ width: "33%" }}
                            animate={{ width: `${step * 33.33}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                    <AnimatePresence mode='wait'>

                        {/* STEP 1: SERVICES */}
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Special Requests (Moved to Step 1 for simplicity) */}
                                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-sm">
                                    <div className="flex items-start gap-3 mb-3">
                                        <MessageSquare className="text-[#BF953F] mt-1" size={18} />
                                        <div>
                                            <h3 className="text-[#FCF6BA] font-bold text-sm uppercase tracking-wider">Solicitudes Especiales</h3>
                                            <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                                                ¿Alguna duda o petición específica?
                                            </p>
                                        </div>
                                    </div>
                                    <textarea
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        placeholder="Escribe aquí..."
                                        className="w-full bg-black/30 border border-white/10 rounded-sm p-3 text-sm text-neutral-300 focus:outline-none focus:border-[#BF953F]/50 transition-colors min-h-[60px] resize-none"
                                    />
                                </div>

                                {/* Services Accordion */}
                                <div className="space-y-4">
                                    {catalog.map((category) => (
                                        <div key={category.id} className="border border-white/5 rounded-sm overflow-hidden bg-white/[0.02]">
                                            <button
                                                onClick={() => toggleCategory(category.id)}
                                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${openCategory === category.id ? 'bg-white/5' : 'hover:bg-white/[0.04]'}`}
                                            >
                                                <span className="font-bold text-[#BF953F] tracking-wider text-sm">{category.title}</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-neutral-400 transition-transform duration-300 ${openCategory === category.id ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {openCategory === category.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-2 space-y-2">
                                                            {category.services.map((service) => (
                                                                <button
                                                                    key={service.id}
                                                                    className={`w-full flex items-start justify-between p-3 rounded-sm border transition-all cursor-pointer group text-left ${selectedServices.includes(service.id) ? 'bg-[#BF953F]/10 border-[#BF953F]/30' : 'bg-transparent border-transparent hover:bg-white/[0.02]'}`}
                                                                    onClick={() => toggleService(service.id)}
                                                                >
                                                                    <div className="flex-1 pr-4">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className={`font-medium text-sm ${selectedServices.includes(service.id) ? 'text-[#FCF6BA]' : 'text-neutral-300'}`}>{service.title}</h4>
                                                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-500 border border-white/5 whitespace-nowrap">{service.duration}</span>
                                                                        </div>
                                                                        {service.description && (
                                                                            <p className="text-xs text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">{service.description}</p>
                                                                        )}
                                                                    </div>
                                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all mt-1 ${selectedServices.includes(service.id) ? 'bg-[#BF953F] border-[#BF953F]' : 'border-white/20 group-hover:border-white/40'}`}>
                                                                        {selectedServices.includes(service.id) && <Check size={12} className="text-black stroke-[3]" />}
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: STYLIST */}
                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <button
                                    className={`p-4 rounded-sm border transition-all text-left flex items-center gap-4 ${selectedStylist === null ? 'bg-[#BF953F]/20 border-[#BF953F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                    onClick={() => setSelectedStylist(null)}
                                >
                                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
                                        <User size={20} className="text-neutral-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#FCF6BA] font-bold">Cualquiera disponible</h4>
                                        <p className="text-xs text-neutral-400">El primero que esté libre</p>
                                    </div>
                                    {selectedStylist === null && <Check className="ml-auto text-[#BF953F]" />}
                                </button>

                                {stylistsList.map((stylist) => (
                                    <button
                                        key={stylist.id}
                                        className={`p-4 rounded-sm border transition-all text-left flex items-center gap-4 ${selectedStylist?.id === stylist.id ? 'bg-[#BF953F]/20 border-[#BF953F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        onClick={() => setSelectedStylist(stylist)}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
                                            {stylist.image ? (
                                                <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-lg font-bold text-[#BF953F]">{stylist.name[0]}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-[#FCF6BA] font-bold">{stylist.name}</h4>
                                            <p className="text-xs text-neutral-400">{stylist.role}</p>
                                        </div>
                                        {selectedStylist?.id === stylist.id && <Check className="ml-auto text-[#BF953F]" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* STEP 3: DATE & TIME */}
                        {step === 3 && (
                            <motion.div
                                key="step-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Date Scroller */}
                                <div>
                                    <h3 className="text-[#FCF6BA] font-heading mb-4 flex items-center gap-2">
                                        <Calendar size={18} className="text-[#BF953F]" /> Selecciona el Día
                                    </h3>
                                    <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                                        {dates.map((date) => {
                                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                                            return (
                                                <button
                                                    key={date.toISOString()}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`min-w-[80px] p-3 rounded-sm border flex flex-col items-center justify-center transition-all ${isSelected ? 'bg-[#BF953F] border-[#BF953F] text-black' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                                                >
                                                    <span className="text-xs uppercase font-bold tracking-wider">{date.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                                                    <span className="text-xl font-bold mt-1">{date.getDate()}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                {selectedDate && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="text-[#FCF6BA] font-heading mb-4 flex items-center gap-2">
                                            <Clock size={18} className="text-[#BF953F]" /> Selecciona la Hora
                                        </h3>
                                        <div className="grid grid-cols-4 gap-3">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 px-1 rounded-sm border text-sm font-medium transition-all ${selectedTime === time ? 'bg-[#BF953F]/20 border-[#BF953F] text-[#FCF6BA]' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="p-6 border-t border-white/10 bg-[#121212] relative z-10 flex justify-between items-center">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            disabled={isSaving}
                            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors px-4 py-2 disabled:opacity-50"
                        >
                            <ChevronLeft size={18} /> Atrás
                        </button>
                    ) : (
                        <div /> /* Spacer */
                    )}

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
                            {(() => {
                                if (step === 1) return `${selectedServices.length} servicios`;
                                if (step === 2) return selectedStylist?.name || 'Cualquiera';
                                return `${selectedDate ? selectedDate.toLocaleDateString() : ''} ${selectedTime || ''}`;
                            })()}
                        </span>

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled() || isSaving}
                                className="bg-[#BF953F] text-black px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#d4a84d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Siguiente <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedDate || !selectedTime || isSaving}
                                className="bg-[#BF953F] text-black px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#d4a84d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Calendar size={16} />}
                                {isSaving ? 'Reservando...' : 'Confirmar'}
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
