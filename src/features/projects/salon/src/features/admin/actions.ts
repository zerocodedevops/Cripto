'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAdminBookings() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                },
                service: {
                    select: { name: true }
                },
                staff: {
                    select: { name: true }
                }
            },
            orderBy: { date: 'desc' }
        })

        // Serialize dates for Client Components
        return bookings.map(b => ({
            ...b,
            date: b.date.toISOString(),
            endTime: b.endTime.toISOString(),
            createdAt: b.createdAt.toISOString(),
            updatedAt: b.updatedAt.toISOString(),
        }))
    } catch (error) {
        console.error('Error fetching admin bookings:', error)
        return []
    }
}

export async function deleteBooking(id: string) {
    try {
        await prisma.booking.delete({
            where: { id }
        })
        revalidatePath('/admin/bookings')
        revalidatePath('/admin/dashboard')
        return { success: true }
    } catch (error) {
        console.error('Delete error:', error)
        return { success: false, error: 'Failed to delete' }
    }
}

export async function updateBookingStatus(id: string, status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED') {
    try {
        await prisma.booking.update({
            where: { id },
            data: { status }
        })
        revalidatePath('/admin/bookings')
        revalidatePath('/admin/dashboard')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Failed to update status' }
    }
}
