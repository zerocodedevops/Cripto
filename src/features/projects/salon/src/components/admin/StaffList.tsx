'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toggleStaffStatus } from '@/features/admin/staffActions'
import { Check, X, User } from 'lucide-react'

interface StaffListProps {
    staff: any[]
}

export default function StaffList({ staff: initialStaff }: StaffListProps) {
    const [staffList, setStaffList] = useState(initialStaff)

    const handleToggle = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        setStaffList(staffList.map(s => s.id === id ? { ...s, active: !currentStatus } : s))

        const res = await toggleStaffStatus(id, !currentStatus)
        if (!res.success) {
            // Revert on failure
            setStaffList(staffList.map(s => s.id === id ? { ...s, active: currentStatus } : s))
            alert('Error updating status')
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffList.map((member) => (
                <div key={member.id} className="bg-neutral-800 border border-white/10 rounded-sm p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                <User className="text-neutral-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white max-w-[150px] truncate" title={member.name}>{member.name}</h3>
                                <Link href={`/admin/staff/${member.id}`} className="text-xs text-gold-500 hover:text-white underline underline-offset-4 decoration-gold-500/30 hover:decoration-white/50 transition-all">
                                    Gestionar Horario
                                </Link>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle(member.id, member.active)}
                            className={`p-2 rounded-full border transition-colors ${member.active
                                ? 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20'
                                : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20'
                                }`}
                        >
                            {member.active ? <Check size={16} /> : <X size={16} />}
                        </button>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Servicios</p>
                        <div className="flex flex-wrap gap-2">
                            {member.services.map((s: any) => (
                                <span key={s.id} className="text-xs px-2 py-1 bg-white/5 rounded-sm text-neutral-300 border border-white/5">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
