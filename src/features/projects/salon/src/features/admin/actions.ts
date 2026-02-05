// Mock implementation for Vite Client
export async function getAdminBookings() {
	console.log("Mock: getAdminBookings");
	return [];
}

export async function deleteBooking(id: string) {
	console.log("Mock: deleteBooking", id);
	return { success: true };
}

export async function updateBookingStatus(
	id: string,
	status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED",
) {
	console.log("Mock: updateBookingStatus", id, status);
	return { success: true };
}
