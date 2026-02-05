import StaffList from "@salon/components/admin/StaffList";
import { getAdminStaff } from "@salon/features/admin/staffActions";

export default async function AdminStaffPage() {
	const staff = await getAdminStaff();

	return (
		<div className="p-8 space-y-8">
			<header className="flex justify-between items-center">
				<h1 className="text-3xl font-baroque text-gold-500">
					Gestión de Staff
				</h1>
				<button className="bg-gold-500 text-black px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors">
					Añadir Miembro
				</button>
			</header>

			<StaffList staff={staff} />
		</div>
	);
}
