import prisma from "@salon/lib/prisma";
import BookingDebugger from "./client";

export default async function TestPage() {
	try {
		const services = await prisma.service.findMany();
		const staff = await prisma.staff.findMany();

		return (
			<div className="container mx-auto py-10">
				<h1 className="text-3xl font-bold mb-8">Booking Engine Debugger</h1>
				<BookingDebugger services={services} staff={staff} />
			</div>
		);
	} catch (error) {
		console.error("Failed to load admin test data:", error);
		return (
			<div className="text-red-500 p-10">
				Error loading data: {String(error)}
			</div>
		);
	}
}
