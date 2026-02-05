// Mock implementation for Vite Client

export async function getAdminStaff() {
	return [
		{
			id: "1",
			name: "Ana Silva",
			role: "Stylist",
			active: true,
			services: [],
			schedules: [],
		},
		{
			id: "2",
			name: "Carlos Ruiz",
			role: "Barber",
			active: true,
			services: [],
			schedules: [],
		},
	];
}

export async function toggleStaffStatus(staffId: string, isActive: boolean) {
	console.log("Mock: toggleStaffStatus", staffId, isActive);
	return { success: true };
}

export async function updateAvailability(
	staffId: string,
	availabilityData: any[],
) {
	console.log("Mock: updateAvailability", staffId, availabilityData);
	return { success: true };
}
