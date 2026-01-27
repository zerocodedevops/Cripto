'use server'

import prisma from '@salon/lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'

export interface TimeSlot {
    time: string
    available: boolean
}

export async function getBeforeAndAfterDates(date: Date) {
    // Logic to get surrounding dates availability if needed
    return [] // Placeholder
}

export async function getAvailableSlots(
    date: Date,
    serviceId: string,
    staffId: string | null = null
): Promise<TimeSlot[]> {
    // 1. Get Service Duration
    const service = await prisma.service.findUnique({
        where: { id: serviceId }
    })
    if (!service) throw new Error('Service not found')

    const dayOfWeek = date.getDay() // 0-6

    // 2. Find Available Staff
    // If staffId is provided, check only that staff.
    // If not, find ANY staff capable of the service who works on this day.
    const whereStaff = staffId ? { id: staffId } : {}

    const eligibleStaff = await prisma.staff.findMany({
        where: {
            ...whereStaff,
            active: true,
            services: { some: { id: serviceId } },
            schedules: { some: { dayOfWeek: dayOfWeek } }
        },
        include: {
            schedules: { where: { dayOfWeek: dayOfWeek } },
            bookings: {
                where: {
                    date: {
                        gte: startOfDay(date),
                        lte: endOfDay(date)
                    },
                    status: { not: 'CANCELLED' }
                }
            }
        }
    })

    if (eligibleStaff.length === 0) return []

    // 3. Generate Time Slots based on Real Availability
    const slots: TimeSlot[] = []

    // Get the specific schedule for this day
    const schedule = eligibleStaff[0].schedules[0] // Assuming first available staff defines the slot structure for simplicity in this version

    if (!schedule) {
        // Fallback if no schedule defined (e.g. 09:00 - 18:00)
        // In a real app we might return empty or default
        return []
    }

    const startParts = schedule.startTime.split(':').map(Number)
    const endParts = schedule.endTime.split(':').map(Number)

    let currentHour = startParts[0]
    let currentMinute = startParts[1]
    const endHour = endParts[0]
    const endMinute = endParts[1]

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

        // Basic check: Is this time booked?
        // We filter 'conflicted' slots later, but for now we generate the candidate list
        slots.push({ time: timeString, available: true })

        // Increment by 30 mins
        currentMinute += 30
        if (currentMinute >= 60) {
            currentHour += 1
            currentMinute = 0
        }
    }

    // 4. Filter by existing bookings
    // Check conflicts for each generated slot
    const finalSlots = []
    for (const slot of slots) {
        const slotStart = new Date(date)
        const [h, m] = slot.time.split(':').map(Number)
        slotStart.setHours(h, m, 0, 0)

        const slotEnd = new Date(slotStart.getTime() + service.duration * 60000)

        // Check against ALL bookings of the eligible staff for this day
        // Simplified: check if ANY eligible staff is free for this slot
        // For 'Any Specialist', we need at least ONE staff member free.
        // For specific staff, we need THAT staff member free.

        let isSlotFree = false

        for (const staff of eligibleStaff) {
            const isBooked = staff.bookings.some(b => {
                const bStart = new Date(b.date)
                const bEnd = new Date(b.endTime)
                return (slotStart < bEnd && slotEnd > bStart)
            })

            if (!isBooked) {
                isSlotFree = true
                break // Found a free staff member!
            }
        }

        if (isSlotFree) {
            finalSlots.push(slot)
        }
    }

    return finalSlots
}

export async function createBooking(data: {
    userId: string,
    serviceId: string,
    staffId?: string,
    date: Date,
}): Promise<{ success: true; booking: any } | { success: false; error: string }> {
    let { userId, staffId } = data
    const { serviceId, date } = data

    try {
        // 0. Ensure User Exists (Guest Handling)
        if (userId === 'guest-user') {
            const guest = await prisma.user.upsert({
                where: { email: 'guest@zero.com' },
                update: {},
                create: {
                    id: 'guest-user', // Trying to force ID
                    email: 'guest@zero.com',
                    name: 'Guest Client',
                    role: 'CLIENT'
                }
            })
            userId = guest.id
        }

        // 1. Validate Service
        const service = await prisma.service.findUnique({
            where: { id: serviceId }
        })
        if (!service) {
            throw new Error('Service not found')
        }

        // Handle 'any' staff selection
        if (!staffId || staffId === 'any') {
            // Find first staff available for this service
            const staffMember = await prisma.staff.findFirst({
                where: {
                    active: true,
                    services: { some: { id: serviceId } }
                }
            })
            if (!staffMember) return { success: false, error: 'No staff available' }
            staffId = staffMember.id
        }

        // 2. Validate Staff Availability (Simple check)
        const bookingDuration = service.duration
        const bookingEnd = new Date(date.getTime() + bookingDuration * 60000)

        // Check for conflicts
        const conflict = await prisma.booking.findFirst({
            where: {
                staffId,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        // Existing booking starts inside new slot
                        date: { gte: date, lt: bookingEnd }
                    },
                    {
                        // Existing booking ends inside new slot
                        endTime: { gt: date, lte: bookingEnd }
                    },
                    {
                        // Existing booking encompasses new slot
                        date: { lte: date },
                        endTime: { gte: bookingEnd }
                    }
                ]
            }
        })

        if (conflict) {
            return { success: false, error: 'Slot already taken' }
        }

        // 3. Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                serviceId,
                staffId: staffId!,
                date,
                endTime: bookingEnd,
                totalPrice: service.price,
                status: 'CONFIRMED'
            }
        })

        return { success: true, booking }
    } catch (error) {
        console.error('CreateBooking Error:', error)
        return { success: false, error: 'Database error' }
    }
}
