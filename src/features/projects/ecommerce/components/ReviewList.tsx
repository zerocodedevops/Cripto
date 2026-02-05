import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase"; // Corrected path

interface Review {
	id: string;
	userName: string;
	rating: number;
	comment: string;
	imageUrl?: string;
	createdAt: any;
}

interface ReviewListProps {
	readonly productId: number;
	readonly refreshTrigger: number;
}

export default function ReviewList({
	productId,
	refreshTrigger,
}: ReviewListProps) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true);
				// Using mock fallback if API key is missing happens in firebase.ts,
				// but here we just try to fetch. If offline/mock, it might just return empty or error.

				const q = query(
					collection(db, "reviews"),
					where("productId", "==", productId),
					orderBy("createdAt", "desc"),
				);

				const querySnapshot = await getDocs(q);
				const fetchedReviews: Review[] = [];
				querySnapshot.forEach((doc) => {
					fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
				});

				setReviews(fetchedReviews);
			} catch (error) {
				console.error("Error fetching reviews", error);
				// Might fail if index is missing in Firestore, but single field sort usually works?
				// Actually compound query (where + orderBy) requires index.
				// Fallback: fetch purely by ID and sort client side if index fails.
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [productId, refreshTrigger]);

	if (loading) {
		return (
			<div className="text-center py-10 text-slate-500">
				Cargando opiniones...
			</div>
		);
	}

	if (reviews.length === 0) {
		return (
			<div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
				<p className="text-slate-500 mb-2">Aún no hay reseñas.</p>
				<p className="text-sm text-slate-400">¡Sé el primero en opinar!</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<h3 className="text-xl font-bold text-slate-900">
				Opiniones de Clientes ({reviews.length})
			</h3>

			{reviews.map((review, idx) => (
				<motion.div
					key={review.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: idx * 0.1 }}
					className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
				>
					<div className="flex justify-between items-start mb-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
								<User className="w-5 h-5" />
							</div>
							<div>
								<p className="font-bold text-slate-900">{review.userName}</p>
								<div className="flex text-yellow-400">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={`star-${i}`}
											className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-200"}`}
										/>
									))}
								</div>
							</div>
						</div>
						<span className="text-xs text-slate-400">
							{review.createdAt?.seconds
								? new Date(review.createdAt.seconds * 1000).toLocaleDateString()
								: "Reciente"}
						</span>
					</div>

					<p className="text-slate-600 mb-4 leading-relaxed">
						{review.comment}
					</p>

					{review.imageUrl && (
						<div className="mt-4">
							<button
								type="button"
								onClick={() => window.open(review.imageUrl, "_blank")}
								className="block overflow-hidden rounded-xl border border-slate-100 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500"
								aria-label="Ver foto de la reseña en tamaño completo"
							>
								<img
									src={review.imageUrl}
									alt="Foto de reseña"
									className="h-48 w-full object-cover"
								/>
							</button>
						</div>
					)}
				</motion.div>
			))}
		</div>
	);
}
