// Mock implementation for Vite Client

export interface TimeSlot {
	time: string;
	available: boolean;
}

export async function getBeforeAndAfterDates(date: Date) {
	return [];
}

export async function getAvailableSlots(
	date: Date,
	serviceId: string,
	staffId: string | null = null,
): Promise<TimeSlot[]> {
	console.log("Mock: getAvailableSlots", date, serviceId, staffId);
	// Return some mock slots
	return [
		{ time: "10:00", available: true },
		{ time: "11:00", available: true },
		{ time: "14:00", available: true },
		{ time: "16:30", available: true },
	];
}

export async function createBooking(data: {
	userId: string;
	serviceId: string;
	staffId?: string;
	date: Date;
}): Promise<
	{ success: true; booking: any } | { success: false; error: string }
> {
	console.log("Mock: createBooking", data);
	return {
		success: true,
		booking: {
			id: "MOCK-" + Math.random().toString(36).substr(2, 9),
			...data,
		},
	};
}
