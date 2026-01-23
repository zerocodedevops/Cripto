'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getAvailableSlots, createBooking } from '@/features/booking/actions'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"

export default function BookingDebugger({ services, staff }: Readonly<{ services: any[], staff: any[] }>) {
    // Extract unique categories
    const categories = Array.from(new Set(services.map(s => s.category)))

    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '')

    // Filter services by category
    const filteredServices = services.filter(s => s.category === selectedCategory)

    const [selectedService, setSelectedService] = useState(filteredServices[0]?.id || '')
    const [selectedStaff, setSelectedStaff] = useState(staff[0]?.id || '')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [slots, setSlots] = useState<any[]>([])
    const [bookingResult, setBookingResult] = useState<any>(null)

    // Update selected service when category changes
    useEffect(() => {
        const firstService = services.find(s => s.category === selectedCategory)
        if (firstService) setSelectedService(firstService.id)
    }, [selectedCategory, services])

    const checkAvailability = async () => {
        const d = new Date(date)
        const result = await getAvailableSlots(d, selectedStaff, selectedService)
        setSlots(result)
    }

    const handleBook = async () => {
        const d = new Date(date)
        // Create booking at 10:00 AM for simplicity or use logic
        // Just mapping the first available slot?
        d.setHours(10, 0, 0, 0)

        const res = await createBooking({
            userId: 'test-user-id',
            serviceId: selectedService,
            staffId: selectedStaff,
            date: d
        })
        setBookingResult(res)
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Force dark theme container here to ensure previews look right even if dev tool parent is unpredictable */}
                <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                    <CardHeader>
                        <CardTitle className="text-gold-500">Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="category-select" className="text-sm font-medium text-neutral-400">Category</Label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger id="category-select" className="border-neutral-700 bg-neutral-950 text-neutral-200 focus:ring-gold-500">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-200">
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat} className="focus:bg-neutral-800 focus:text-gold-500">
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service-select" className="text-sm font-medium text-neutral-400">Service</Label>
                            <Select value={selectedService} onValueChange={setSelectedService}>
                                <SelectTrigger id="service-select" className="border-neutral-700 bg-neutral-950 text-neutral-200 focus:ring-gold-500">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-200 max-h-[300px]">
                                    <SelectGroup>
                                        {/* We could group by category if we had that structure flat here, but let's just list */}
                                        {filteredServices.map(s => (
                                            <SelectItem key={s.id} value={s.id} className="focus:bg-neutral-800 focus:text-gold-500">
                                                {s.name} <span className="text-neutral-500 ml-2">({s.price}€)</span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="staff-select" className="text-sm font-medium text-neutral-400">Staff Specialist</Label>
                            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                                <SelectTrigger id="staff-select" className="border-neutral-700 bg-neutral-950 text-neutral-200 focus:ring-gold-500">
                                    <SelectValue placeholder="Select staff" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-200">
                                    {staff.map(s => (
                                        <SelectItem key={s.id} value={s.id} className="focus:bg-neutral-800 focus:text-gold-500">
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date-input" className="text-sm font-medium text-neutral-400">Date</Label>
                            <Input
                                id="date-input"
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="border-neutral-700 bg-neutral-950 text-neutral-200 focus:ring-gold-500 block w-full"
                            />
                        </div>
                        <Button onClick={checkAvailability} className="w-full bg-gold-500 text-black hover:bg-gold-400 font-bold transition-all">Check Slots</Button>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                    <CardHeader>
                        <CardTitle className="text-gold-500">Results & Actions</CardTitle>
                        <CardDescription className="text-neutral-400">Slots found: {slots.length}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-black/50 border border-neutral-800 p-4 rounded h-40 overflow-auto text-xs font-mono text-gold-200/80">
                            {slots.length === 0 ? "No slots available or not checked yet." : JSON.stringify(slots, null, 2)}
                        </div>
                        <Button onClick={handleBook} variant="outline" className="w-full border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold">
                            Book First Slot (Test)
                        </Button>
                        {bookingResult && (
                            <div className={`p-4 rounded border text-sm ${bookingResult.success
                                ? 'bg-green-900/20 border-green-900 text-green-400'
                                : 'bg-red-900/20 border-red-900 text-red-400'
                                }`}>
                                {JSON.stringify(bookingResult)}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
