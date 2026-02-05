import { Edit2, Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ServicesPage() {
	const [services, setServices] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<any>({});

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		try {
			const { data, error } = await supabase
				.from("services")
				.select("*")
				.order("category", { ascending: true });

			if (error) throw error;
			setServices(data || []);
		} catch (error) {
			console.error("Error fetching services:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (service: any) => {
		setEditingId(service.id);
		setEditForm(service);
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditForm({});
	};

	const handleSave = async (id: string) => {
		try {
			const { error } = await supabase
				.from("services")
				.update({
					price: editForm.price,
					duration: editForm.duration,
					description: editForm.description,
				})
				.eq("id", id);

			if (error) throw error;

			setServices((prev) =>
				prev.map((s) => (s.id === id ? { ...s, ...editForm } : s)),
			);
			setEditingId(null);
		} catch (error) {
			console.error("Error updating service:", error);
			alert("Error al guardar cambios");
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
					Gestión de Servicios
				</h1>
				{/* <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Servicio
                </button> */}
			</div>

			<div className="grid gap-4">
				{services.map((service) => (
					<div
						key={service.id}
						className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-700 transition-colors"
					>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs font-semibold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-900/50 uppercase tracking-wider">
									{service.category}
								</span>
								{editingId === service.id ? (
									<input
										className="bg-slate-950 text-white border border-slate-700 rounded px-2 py-1 text-sm font-bold"
										value={editForm.title || ""}
										aria-label="Service Title"
										onChange={(e) =>
											setEditForm({ ...editForm, title: e.target.value })
										}
									/>
								) : (
									<h3 className="font-bold text-slate-200">{service.title}</h3>
								)}
							</div>

							{editingId === service.id ? (
								<textarea
									className="w-full bg-slate-950 text-slate-300 text-sm border border-slate-700 rounded p-2 mt-2 focus:ring-1 focus:ring-amber-500 outline-none"
									value={editForm.description || ""}
									aria-label="Service Description"
									onChange={(e) =>
										setEditForm({ ...editForm, description: e.target.value })
									}
									rows={2}
								/>
							) : (
								<p className="text-slate-400 text-sm">{service.description}</p>
							)}
						</div>

						<div className="flex items-center gap-4 md:border-l md:border-slate-800 md:pl-4">
							<div className="flex flex-col gap-1 w-24">
								<span className="text-xs text-slate-500 uppercase">
									Precio (€)
								</span>
								{editingId === service.id ? (
									<input
										type="number"
										className="bg-slate-950 text-white border border-slate-700 rounded px-2 py-1 text-sm w-full"
										value={editForm.price || ""}
										aria-label="Service Price"
										onChange={(e) =>
											setEditForm({
												...editForm,
												price: Number.parseFloat(e.target.value),
											})
										}
									/>
								) : (
									<span className="text-emerald-400 font-mono font-medium">
										{service.price}€
									</span>
								)}
							</div>

							<div className="flex flex-col gap-1 w-24">
								<span className="text-xs text-slate-500 uppercase">
									Duración (min)
								</span>
								{editingId === service.id ? (
									<input
										type="number"
										className="bg-slate-950 text-white border border-slate-700 rounded px-2 py-1 text-sm w-full"
										value={editForm.duration || ""}
										aria-label="Service Duration"
										onChange={(e) => {
											const val = Number.parseInt(e.target.value);
											setEditForm({
												...editForm,
												duration: Number.isNaN(val) ? 0 : val,
											});
										}}
									/>
								) : (
									<span className="text-slate-300 font-medium">
										{service.duration}m
									</span>
								)}
							</div>

							<div className="flex gap-2">
								{editingId === service.id ? (
									<>
										<button
											onClick={() => handleSave(service.id)}
											className="p-2 bg-emerald-600/20 text-emerald-400 rounded hover:bg-emerald-600/30 transition-colors"
										>
											<Save className="w-4 h-4" />
										</button>
										<button
											onClick={handleCancel}
											className="p-2 bg-slate-700/50 text-slate-400 rounded hover:bg-slate-700 transition-colors"
										>
											<X className="w-4 h-4" />
										</button>
									</>
								) : (
									<button
										onClick={() => handleEdit(service)}
										className="p-2 text-slate-500 hover:text-amber-400 hover:bg-amber-950/30 rounded transition-all"
									>
										<Edit2 className="w-4 h-4" />
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
