import { useEffect, useState } from 'react';
import { Users, CreditCard, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BookingCalendar from '../components/admin/BookingCalendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import BookingActions from '../components/admin/BookingActions';

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [stats, setStats] = useState({
        todayCount: 0,
        pendingCount: 0,
        revenue: 0,
        nextClient: null as any
    });
    const [loading, setLoading] = useState(true);
    const [stylists, setStylists] = useState<any[]>([]);
    const [selectedStylistId, setSelectedStylistId] = useState<string>('all');
    const [selectedBookingForAction, setSelectedBookingForAction] = useState<any>(null);

    useEffect(() => {
        console.log("AdminDashboard Component Mounted - Fetching Data");
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (selectedBookingForAction) {
            console.log("Modal Open for Booking:", selectedBookingForAction);
        }
    }, [selectedBookingForAction]);

    const fetchDashboardData = async () => {
        console.log("Fetching dashboard data...");
        // ... (keep fetchDashboardData implementation same) ...
        // ... (keep fetchDashboardData implementation same) ...
        try {
            // 1. Fetch Bookings
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('*')
                .order('date', { ascending: true });

            if (bookingsError) throw bookingsError;

            // 2. Fetch Services & Stylists (for manual join)
            const { data: servicesData } = await supabase.from('services').select('id, title, price, duration');
            const { data: stylistsData } = await supabase.from('stylists').select('id, name');

            const servicesMap = new Map(servicesData?.map(s => [s.id, s]));
            const stylistsMap = new Map(stylistsData?.map(s => [s.id, s]));

            setStylists(stylistsData || []);

            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];

            // Normalize data for Calendar
            const formattedBookings = bookingsData?.map(b => {
                // Handle multiple services (array of IDs)
                const bookingServices = b.service_ids?.map((id: string) => servicesMap.get(id)).filter(Boolean) || [];
                const serviceNames = bookingServices.map((s: any) => s.title).join(', ');
                const totalDuration = bookingServices.reduce((acc: number, curr: any) => acc + (curr.duration || 0), 0);
                const totalPrice = bookingServices.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);
                const stylistName = b.stylist_id ? stylistsMap.get(b.stylist_id)?.name : 'Cualquiera';

                return {
                    ...b,
                    user_name: b.user_email?.split('@')[0] || b.customer_notes?.slice(0, 10) || 'Cliente',
                    service_name: serviceNames || 'Varios Servicios',
                    duration: totalDuration || 60,
                    price: totalPrice,
                    stylist_name: stylistName
                };
            }) || [];

            setBookings(formattedBookings);

            // Calculate Stats
            const todayBookings = formattedBookings.filter(b => b.date.startsWith(todayStr));
            const pending = formattedBookings.filter(b => b.status === 'pending');

            // Calc Revenue (Confirmed)
            const revenue = formattedBookings
                .filter(b => b.status === 'confirmed')
                .reduce((acc, curr) => acc + (curr.price || 0), 0);

            // Next Client
            const futureBookings = formattedBookings.filter(b => new Date(b.date) > now && b.status !== 'cancelled');
            const next = futureBookings.length > 0 ? futureBookings[0] : null;

            setStats({
                todayCount: todayBookings.length,
                pendingCount: pending.length,
                revenue,
                nextClient: next
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state to reflect change immediately
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

            // Re-calculate stats deeply or just simple adjustment (Re-fetching is safer for simple app)
            fetchDashboardData();

        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar la cita');
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-slate-400">Cargando datos del salón...</div>;
    }

    return (
        <div className="space-y-6">
            {/* DEBUG BUTTON - REMOVE LATER */}
            <button
                onClick={() => setSelectedBookingForAction({
                    id: 'debug-1',
                    service_name: 'CITA DE PRUEBA',
                    user_name: 'USUARIO TEST',
                    date: new Date().toISOString(),
                    time: '12:00',
                    status: 'confirmed',
                    stylist_name: 'TESTER'
                })}
                className="bg-purple-600 text-white px-4 py-2 rounded shadow-lg font-bold w-full uppercase"
            >
                🛑 CLICK PARA PROBAR MODAL 🛑
            </button>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Citas Hoy */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CalendarIcon className="w-24 h-24 text-amber-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Citas Hoy</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-2 text-shadow-glow">{stats.todayCount}</h3>
                        <p className="text-amber-400 text-xs mt-1 flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${stats.pendingCount > 0 ? 'bg-amber-400 animate-pulse' : 'bg-amber-400'}`} />
                            {' '}{stats.pendingCount} pendientes de aprobar
                        </p>
                    </div>
                </div>

                {/* Card 2: Facturación */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CreditCard className="w-24 h-24 text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Facturación (Confirmada)</p>
                        <h3 className="text-3xl font-bold text-slate-100 mt-2">{stats.revenue}€</h3>
                        <p className="text-emerald-400 text-xs mt-1 flex items-center">
                            Acumulado total
                        </p>
                    </div>
                </div>

                {/* Card 3: Próximo Cliente */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-24 h-24 text-amber-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Próximo Cliente</p>
                        {stats.nextClient ? (
                            <>
                                <h3 className="text-xl font-bold text-slate-100 mt-2 truncate">{stats.nextClient.user_name}</h3>
                                <p className="text-amber-400 text-xs mt-1 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {format(new Date(stats.nextClient.date), 'HH:mm', { locale: es })} - {stats.nextClient.service_name}
                                </p>
                            </>
                        ) : (
                            <h3 className="text-xl font-bold text-slate-500 mt-2">Sin citas futuras</h3>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-lg font-semibold text-slate-200 flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2 text-amber-400" />
                            Agenda del Salón
                        </h2>
                        <select
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500 block w-full sm:w-auto"
                            value={selectedStylistId}
                            onChange={(e) => setSelectedStylistId(e.target.value)}
                        >
                            <option value="all">Ver Todos</option>
                            {stylists.map((stylist) => (
                                <option key={stylist.id} value={stylist.id}>
                                    {stylist.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <BookingCalendar
                        bookings={selectedStylistId === 'all' ? bookings : bookings.filter(b => b.stylist_id === selectedStylistId)}
                        className="min-h-[500px]"
                        onSelectBooking={(booking) => setSelectedBookingForAction(booking)}
                    />
                </div>

                {/* Quick List / Pending Approvals */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-200 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-amber-400" />
                        Pendientes ({stats.pendingCount})
                    </h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[500px] overflow-y-auto custom-scrollbar">
                        {stats.pendingCount === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
                                <CheckCircle className="w-8 h-8 mb-2 opacity-50" />
                                <p>Todo al día</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {bookings.filter(b => b.status === 'pending').map(b => (
                                    <div key={b.id} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 hover:border-amber-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-slate-200 text-sm">{b.user_name}</span>
                                            <span className="text-xxs bg-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded">PENDIENTE</span>
                                        </div>
                                        <div className="text-xs text-slate-400 space-y-1">
                                            <div className="flex items-center">
                                                <CalendarIcon className="w-3 h-3 mr-1.5 opacity-70" />
                                                {format(new Date(b.date), 'dd MMM yyyy', { locale: es })}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1.5 opacity-70" />
                                                {format(new Date(b.date), 'HH:mm', { locale: es })} ({b.duration} min)
                                            </div>
                                            <div className="flex items-center text-amber-400/80">
                                                <Users className="w-3 h-3 mr-1.5 opacity-70" />
                                                {b.services?.name}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => handleStatusUpdate(b.id, 'confirmed')}
                                                className="flex-1 bg-emerald-900/30 text-emerald-400 text-xs py-1.5 rounded hover:bg-emerald-900/50 transition-colors border border-emerald-800/50"
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(b.id, 'cancelled')}
                                                className="flex-1 bg-red-900/30 text-red-400 text-xs py-1.5 rounded hover:bg-red-900/50 transition-colors border border-red-800/50"
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Modal for Calendar Clicks */}
            {selectedBookingForAction && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop Layer */}
                    <button
                        type="button"
                        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm cursor-default"
                        onClick={() => setSelectedBookingForAction(null)}
                        aria-label="Cerrar modal"
                    />

                    {/* Modal Content */}
                    <div
                        className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl w-full max-w-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-100">{selectedBookingForAction.service_name}</h3>
                                <p className="text-slate-400 text-sm">{selectedBookingForAction.user_name}</p>
                            </div>
                            <button onClick={() => setSelectedBookingForAction(null)} className="text-slate-500 hover:text-white">
                                <span className="sr-only">Cerrar</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="space-y-3 mb-6 bg-slate-950/50 p-3 rounded-lg border border-slate-800 text-sm text-slate-300">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Fecha:</span>
                                <span>{format(new Date(selectedBookingForAction.date), 'dd MMM yyyy', { locale: es })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Hora:</span>
                                <span>{selectedBookingForAction.time || format(new Date(selectedBookingForAction.date), 'HH:mm')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Profesional:</span>
                                <span>{selectedBookingForAction.stylist_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Estado:</span>
                                <span className={`uppercase font-bold text-xs px-2 py-0.5 rounded ${(() => {
                                    if (selectedBookingForAction.status === 'confirmed') return 'bg-emerald-900/50 text-emerald-400';
                                    if (selectedBookingForAction.status === 'cancelled') return 'bg-red-900/50 text-red-400';
                                    return 'bg-amber-900/50 text-amber-400';
                                })()
                                    }`}>
                                    {selectedBookingForAction.status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Primary Actions */}
                            <div className="flex gap-2">
                                <BookingActions booking={selectedBookingForAction} />
                                <div className="text-xs text-slate-500 flex items-center ml-2">
                                    ← Usa este menú para Editar
                                </div>
                            </div>

                            {/* Cancel Button - Case Insensitive Check */}
                            {selectedBookingForAction.status?.toLowerCase() !== 'cancelled' ? (
                                <button
                                    onClick={() => {
                                        console.log("Cancel button clicked for id:", selectedBookingForAction.id);
                                        if (confirm('¿Seguro que quieres cancelar esta cita?')) {
                                            handleStatusUpdate(selectedBookingForAction.id, 'cancelled');
                                            setSelectedBookingForAction(null);
                                        }
                                    }}
                                    className="w-full py-4 mt-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg uppercase shadow-lg transition-transform transform active:scale-95"
                                >
                                    CANCELAR CITA
                                </button>
                            ) : (
                                <div className="w-full text-center py-2 text-red-500 font-bold border border-red-900/50 bg-red-900/10 rounded mt-2">
                                    CITA CANCELADA
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
