import { Edit2, Loader2, Plus, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StylistsPage() {
	const [stylists, setStylists] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<any>({});
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		fetchStylists();
	}, []);

	const fetchStylists = async () => {
		try {
			const { data, error } = await supabase
				.from("stylists")
				.select("*")
				.order("name", { ascending: true });

			if (error) throw error;
			setStylists(data || []);
		} catch (error) {
			console.error("Error fetching stylists:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (stylist: any) => {
		setEditingId(stylist.id);
		setEditForm(stylist);
		setIsCreating(false);
	};

	const handleCreate = () => {
		setEditForm({ name: "", role: "Stylist", bio: "" });
		setIsCreating(true);
		setEditingId("new");
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditForm({});
		setIsCreating(false);
	};

	const handleSave = async (id: string) => {
		try {
			if (isCreating) {
				const { data, error } = await supabase
					.from("stylists")
					.insert([
						{
							name: editForm.name,
							role: editForm.role,
							bio: editForm.bio,
							image_url:
								"https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg", // Placeholder
						},
					])
					.select();

				if (error) throw error;
				if (data) setStylists((prev) => [...prev, data[0]]);
			} else {
				const { error } = await supabase
					.from("stylists")
					.update({
						name: editForm.name,
						role: editForm.role,
						bio: editForm.bio,
					})
					.eq("id", id);

				if (error) throw error;
				setStylists((prev) =>
					prev.map((s) => (s.id === id ? { ...s, ...editForm } : s)),
				);
			}

			setEditingId(null);
			setIsCreating(false);
		} catch (error) {
			console.error("Error saving stylist:", error);
			alert("Error al guardar estilista");
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("¿Seguro que quieres eliminar este estilista?")) return;
		try {
			const { error } = await supabase.from("stylists").delete().eq("id", id);
			if (error) throw error;
			setStylists((prev) => prev.filter((s) => s.id !== id));
		} catch (error) {
			console.error("Error deleting stylist:", error);
		}
	};

	if (loading)
		return (
			<div className="flex justify-center p-10">
				<Loader2 className="animate-spin text-amber-400" />
			</div>
		);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-slate-100">
					Equipo de Estilistas
				</h1>
				<button
					onClick={handleCreate}
					className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors"
				>
					<Plus className="w-4 h-4 mr-2" /> Añadir Estilista
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{isCreating && (
					<div className="bg-amber-950/20 border border-amber-500/50 rounded-xl p-6 relative">
						<h3 className="text-amber-400 font-bold mb-4">Nuevo Estilista</h3>
						<div className="space-y-3">
							<input
								className="w-full bg-slate-950 text-white border border-slate-700 rounded px-3 py-2 text-sm"
								placeholder="Nombre"
								value={editForm.name || ""}
								aria-label="Stylist Name"
								onChange={(e) =>
									setEditForm({ ...editForm, name: e.target.value })
								}
							/>
							<input
								className="w-full bg-slate-950 text-white border border-slate-700 rounded px-3 py-2 text-sm"
								placeholder="Rol (Ej: Senior Stylist)"
								value={editForm.role || ""}
								aria-label="Stylist Role"
								onChange={(e) =>
									setEditForm({ ...editForm, role: e.target.value })
								}
							/>
							<textarea
								className="w-full bg-slate-950 text-white border border-slate-700 rounded px-3 py-2 text-sm"
								placeholder="Biografía corta"
								rows={3}
								value={editForm.bio || ""}
								aria-label="Stylist Bio"
								onChange={(e) =>
									setEditForm({ ...editForm, bio: e.target.value })
								}
							/>
							<div className="flex gap-2 pt-2">
								<button
									onClick={() => handleSave("new")}
									className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-500"
								>
									Guardar
								</button>
								<button
									onClick={handleCancel}
									className="flex-1 bg-slate-700 text-slate-300 py-2 rounded hover:bg-slate-600"
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)}

				{stylists.map((stylist) => (
					<div
						key={stylist.id}
						className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-600 transition-all"
					>
						<div className="h-32 bg-slate-800/50 relative">
							{/* In a real app, we'd enable image upload. For now using placeholder or existing url */}
							<img
								src={stylist.image_url}
								alt={stylist.name}
								className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
							/>
							<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onClick={() => handleEdit(stylist)}
									className="p-1.5 bg-slate-900/80 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white backdrop-blur-sm"
								>
									<Edit2 className="w-4 h-4" />
								</button>
								<button
									onClick={() => handleDelete(stylist.id)}
									className="p-1.5 bg-slate-900/80 text-red-400 rounded-lg hover:bg-red-500 hover:text-white backdrop-blur-sm"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						<div className="p-4 relative">
							<div className="absolute -top-10 left-4">
								<div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center overflow-hidden">
									<User className="w-8 h-8 text-slate-500" />
								</div>
							</div>

							<div className="mt-8">
								{editingId === stylist.id ? (
									<div className="space-y-2">
										<input
											className="w-full bg-slate-950 text-white border border-slate-700 rounded px-2 py-1 text-sm font-bold"
											value={editForm.name || ""}
											aria-label="Stylist Name"
											onChange={(e) =>
												setEditForm({ ...editForm, name: e.target.value })
											}
										/>
										<input
											className="w-full bg-slate-950 text-slate-400 border border-slate-700 rounded px-2 py-1 text-xs"
											value={editForm.role || ""}
											aria-label="Stylist Role"
											onChange={(e) =>
												setEditForm({ ...editForm, role: e.target.value })
											}
										/>
										<button
											onClick={() => handleSave(stylist.id)}
											className="w-full bg-emerald-600/20 text-emerald-400 py-1 rounded text-xs mt-2 border border-emerald-800/50 hover:bg-emerald-600/30"
										>
											Guardar Cambios
										</button>
										<button
											onClick={handleCancel}
											className="w-full bg-slate-800 text-slate-400 py-1 rounded text-xs mt-1 hover:bg-slate-700"
										>
											Cancelar
										</button>
									</div>
								) : (
									<>
										<h3 className="font-bold text-slate-100 text-lg">
											{stylist.name}
										</h3>
										<p className="text-amber-400 text-sm font-medium">
											{stylist.role}
										</p>
										<p className="text-slate-400 text-sm mt-3 line-clamp-3 leading-relaxed">
											{stylist.bio}
										</p>
									</>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
