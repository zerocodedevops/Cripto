import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Camera, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../../../../config/firebase"; // Corrected Path (features/projects/ecommerce/components -> ../../../../config)
import type { RootState } from "../store/store";

interface ReviewFormProps {
	readonly productId: number;
	readonly onReviewAdded: () => void;
}

export default function ReviewForm({
	productId,
	onReviewAdded,
}: ReviewFormProps) {
	const { user } = useSelector((state: RootState) => state.auth);
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			setImage(file);
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);
		}
	};

	const removeImage = () => {
		setImage(null);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) {
			alert("Debes iniciar sesión para publicar una reseña");
			return;
		}

		setIsSubmitting(true);

		try {
			let imageUrl = "";

			// Upload Image if exists
			if (image) {
				const storageRef = ref(
					storage,
					`reviews/${productId}/${Date.now()}_${image.name}`,
				);
				const snapshot = await uploadBytes(storageRef, image);
				imageUrl = await getDownloadURL(snapshot.ref);
			}

			// Save Review to Firestore
			await addDoc(collection(db, "reviews"), {
				productId,
				userId: user.username,
				userName: user.username,
				rating,
				comment,
				imageUrl,
				createdAt: serverTimestamp(),
			});

			// Reset Form
			setComment("");
			setRating(5);
			removeImage();
			onReviewAdded();
		} catch (error) {
			console.error("Error submitting review:", error);
			alert("Error al publicar la reseña. Inténtalo de nuevo.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return (
			<div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
				<p className="text-slate-600 mb-2">
					Inicia sesión para compartir tu experiencia
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
		>
			<h3 className="text-lg font-bold text-slate-900 mb-4">
				Escribe una Reseña
			</h3>

			{/* Rating */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-slate-700 mb-2">
					Valoración
				</label>
				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => setRating(star)}
							className="focus:outline-none transition-transform hover:scale-110"
							aria-label={`Rate ${star} stars`}
						>
							<Star
								className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-500" : "text-slate-300"}`}
							/>
						</button>
					))}
				</div>
			</div>

			{/* Comment */}
			<div className="mb-4">
				<label
					htmlFor="comment-input"
					className="block text-sm font-medium text-slate-700 mb-2"
				>
					Tu Opinión
				</label>
				<textarea
					id="comment-input"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
					rows={4}
					className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
					placeholder="¿Qué te pareció el producto?"
				/>
			</div>

			{/* Photo Upload */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-slate-700 mb-2">
					Foto (Opcional)
				</label>

				{!preview ? (
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-all group"
					>
						<Camera className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2" />
						<span className="text-sm text-slate-500 group-hover:text-indigo-600 font-medium">
							Subir foto real
						</span>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							aria-label="Subir foto"
							title="Subir foto"
						/>
					</button>
				) : (
					<div className="relative inline-block">
						<img
							src={preview}
							alt="Preview"
							className="h-32 w-32 object-cover rounded-xl border border-slate-200"
						/>
						<button
							type="button"
							onClick={removeImage}
							className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-md transition-colors"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				)}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
			>
				{isSubmitting ? "Publicando..." : "Publicar Reseña"}
			</button>
		</form>
	);
}
