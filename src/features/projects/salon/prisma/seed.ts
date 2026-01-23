import { PrismaClient } from '@prisma/client'
import servicesData from '../services-data.json'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting full seed...')

    // 1. Clean DB
    await prisma.availability.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.service.deleteMany()
    await prisma.staff.deleteMany()
    await prisma.user.deleteMany()

    // 2. Create Staff Members (Specialists)
    const staffMembers = [
        { name: 'Alice Vogue', email: 'alice@zerosalon.com', bio: 'Senior Stylist - Corte & Color', role: 'Hair' },
        { name: 'Bob Sharp', email: 'bob@zerosalon.com', bio: 'Master Barber', role: 'Barbería' },
        { name: 'Clara Bella', email: 'clara@zerosalon.com', bio: 'Esteticista Facial', role: 'Estética' },
        { name: 'Diana Nail', email: 'diana@zerosalon.com', bio: 'Nail Artist', role: 'Manicura' }
    ]

    const createdStaff = []
    for (const s of staffMembers) {
        const staff = await prisma.staff.create({
            data: { name: s.name, email: s.email, bio: s.bio }
        })
        createdStaff.push({ ...staff, role: s.role })
    }

    // 3. Create Services from JSON
    console.log('.. Importing Services')

    for (const category of servicesData.categories) {
        for (const s of category.services) {

            // Create Service
            const service = await prisma.service.create({
                data: {
                    name: s.name,
                    description: `${s.name} - ${category.name}`,
                    duration: s.duration,
                    price: s.price,
                    category: category.name
                }
            })

            // Assign to relevant Staff based on simple matching
            // Hair -> Alice
            // Barber -> Bob
            // Estética -> Clara
            // Manicura -> Diana
            // Others -> Distributed

            let targetStaff = []
            if (category.name.includes('Corte') || category.name.includes('Color') || category.name.includes('Tratamiento')) {
                targetStaff.push(createdStaff.find(st => st.email.includes('alice')))
            }
            if (category.name.includes('Barbería')) {
                targetStaff.push(createdStaff.find(st => st.email.includes('bob')))
            }
            if (category.name.includes('Estética') || category.name.includes('Cejas')) {
                targetStaff.push(createdStaff.find(st => st.email.includes('clara')))
            }
            if (category.name.includes('Manicura')) {
                targetStaff.push(createdStaff.find(st => st.email.includes('diana')))
            }

            // Fallback
            if (targetStaff.length === 0) targetStaff.push(createdStaff[0])

            // Connect
            for (const st of targetStaff) {
                if (!st) continue
                await prisma.service.update({
                    where: { id: service.id },
                    data: {
                        staff: { connect: { id: st.id } }
                    }
                })
            }
        }
    }

    // 4. Create Availability
    const weekdays = [1, 2, 3, 4, 5] // Mon-Fri

    for (const staff of createdStaff) {
        for (const day of weekdays) {
            await prisma.availability.create({
                data: {
                    staffId: staff.id,
                    dayOfWeek: day,
                    startTime: '09:00',
                    endTime: '19:00', // Long shift
                    breaks: JSON.stringify([{ start: '13:00', end: '14:00' }])
                }
            })
        }
    }

    console.log('✅ Seed with Real Data completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
