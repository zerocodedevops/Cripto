import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, Calendar, MessageSquare } from 'lucide-react';
import { SERVICE_CATALOG } from '../data/services';

interface BookingModalProps {
    onClose: () => void;
}

export function BookingModal({ onClose }: Readonly<BookingModalProps>) {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [openCategory, setOpenCategory] = useState<string | null>('color'); // Default open first
    const [specialRequests, setSpecialRequests] = useState('');

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
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#BF953F]/5">
                    <div>
                        <h2 className="font-heading text-2xl text-[#FCF6BA]">Reserva tu Cita</h2>
                        <p className="text-neutral-400 text-xs mt-1">Selecciona los servicios que deseas realizarte</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                    {/* Special Requests */}
                    <div className="bg-white/[0.03] border border-white/5 p-4 rounded-sm">
                        <div className="flex items-start gap-3 mb-3">
                            <MessageSquare className="text-[#BF953F] mt-1" size={18} />
                            <div>
                                <h3 className="text-[#FCF6BA] font-bold text-sm uppercase tracking-wider">Solicitudes Especiales</h3>
                                <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                                    Puedes añadir una nota sobre tus dudas o quién te gustaría que te atendiera.
                                </p>
                            </div>
                        </div>
                        <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Escribe aquí tus notas..."
                            className="w-full bg-black/30 border border-white/10 rounded-sm p-3 text-sm text-neutral-300 focus:outline-none focus:border-[#BF953F]/50 transition-colors min-h-[80px] resize-none"
                        />
                    </div>

                    {/* Services Accordion */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl text-[#FCF6BA] border-b border-white/10 pb-2 mb-4">Catálogo de Servicios</h3>

                        {SERVICE_CATALOG.map((category) => (
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
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[#121212] relative z-10">
                    <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="text-neutral-400">Servicios seleccionados:</span>
                        <span className="text-[#FCF6BA] font-bold">{selectedServices.length}</span>
                    </div>
                    <button
                        className="w-full py-4 bg-[#BF953F] text-black font-bold uppercase tracking-widest hover:bg-[#d4a84d] transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedServices.length === 0}
                        onClick={() => {
                            alert(`Reserva simulada.\nServicios: ${selectedServices.join(', ')}\nNotas: ${specialRequests}`);
                            onClose();
                        }}
                    >
                        <Calendar size={18} />
                        Confirmar Reserva
                    </button>
                    <p className="text-center text-[10px] text-neutral-600 mt-3 uppercase tracking-wider">
                        Te enviaremos un email de confirmación
                    </p>
                </div>
            </motion.div>
        </motion.div >
    );
}
