'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAdminStaff() {
    return await prisma.staff.findMany({
        include: {
            services: true,
            schedules: true
        },
        orderBy: { name: 'asc' }
    })
}

export async function toggleStaffStatus(staffId: string, isActive: boolean) {
    try {
        await prisma.staff.update({
            where: { id: staffId },
            data: { active: isActive }
        })
        revalidatePath('/admin/staff')
        return { success: true }
    } catch (error) {
        return { success: false, error: 'Failed to update status' }
    }
}

export async function updateAvailability(staffId: string, availabilityData: any[]) {
    try {
        // Simple strategy: Clear existing and re-create
        // In production: transactional update or diff
        await prisma.availability.deleteMany({
            where: { staffId }
        })

        if (availabilityData.length > 0) {
            await prisma.availability.createMany({
                data: availabilityData.map((slot: any) => ({
                    staffId,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                    endTime: slot.endTime
                }))
            })
        }

        revalidatePath('/admin/staff')
        return { success: true }
    } catch (error) {
        console.error('Update Availability Error:', error)
        return { success: false, error: 'Failed to update availability' }
    }
}
