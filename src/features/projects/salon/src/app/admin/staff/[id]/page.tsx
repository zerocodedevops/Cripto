import { notFound } from "next/navigation";
import AvailabilityEditor from "@/components/admin/AvailabilityEditor";
import prisma from "@/lib/prisma";

export default async function StaffAvailabilityPage({
	params,
}: {
	params: { id: string };
}) {
	// Await params to fix nextjs 15+ lint/type warning
	const { id } = await params;

	const staff = await prisma.staff.findUnique({
		where: { id },
		include: { schedules: true },
	});

	if (!staff) notFound();

	return (
		<div className="p-8 space-y-8 max-w-4xl mx-auto">
			<header>
				<h1 className="text-3xl font-baroque text-gold-500">{staff.name}</h1>
				<p className="text-neutral-400 font-mono text-sm tracking-wider uppercase">
					Gestionar Disponibilidad
				</p>
			</header>

			<AvailabilityEditor
				staffId={staff.id}
				initialSchedule={staff.schedules}
			/>
		</div>
	);
}
