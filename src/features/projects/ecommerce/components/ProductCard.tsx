import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { Product } from "../services/productsApi";
import { addToCart } from "../store/cartSlice";
import type { RootState } from "../store/store";
import { toggleWishlist } from "../store/wishlistSlice";
import OptimizedImage from "./OptimizedImage";

interface ProductCardProps {
	readonly product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const dispatch = useDispatch();
	const wishlist = useSelector((state: RootState) => state.wishlist.items);
	const isLiked = wishlist.includes(product.id);

	// Size selection for clothing
	const isClothing =
		product.category.toLowerCase().includes("clothing") ||
		product.category.toLowerCase().includes("ropa") ||
		product.category.toLowerCase().includes("shirt") ||
		product.category.toLowerCase().includes("jacket");

	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const sizes = ["XS", "S", "M", "L", "XL"];
	const [showSizeError, setShowSizeError] = useState(false);

	const handleAddToCart = () => {
		if (isClothing && !selectedSize) {
			setShowSizeError(true);
			setTimeout(() => setShowSizeError(false), 2000);
			return;
		}

		dispatch(
			addToCart({
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.image,
				size: selectedSize || undefined,
			}),
		);

		// Reset selection after adding
		if (isClothing) setSelectedSize(null);
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-soft hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full group relative"
		>
			{/* Wishlist Button */}
			<button
				onClick={() => dispatch(toggleWishlist(product.id))}
				className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
			>
				<Heart
					className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-400"}`}
				/>
			</button>

			<Link to={`producto/${product.id}`} className="block">
				<div className="relative aspect-square mb-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex items-center justify-center overflow-hidden cursor-pointer">
					<OptimizedImage
						src={product.image}
						alt={product.title}
						className="w-full h-full"
					/>

					<div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-200">
						<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
						{product.rating.rate}
					</div>
				</div>
			</Link>

			<div className="flex-1 flex flex-col">
				<p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1 uppercase tracking-wider">
					{product.category}
				</p>
				<Link to={`producto/${product.id}`}>
					<h3
						className="font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 flex-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
						title={product.title}
					>
						{product.title}
					</h3>
				</Link>

				{/* Size Selector */}
				{isClothing && (
					<div className="mt-2 mb-3">
						<div className="flex gap-1 flex-wrap">
							{sizes.map((size) => (
								<button
									key={size}
									onClick={() => {
										setSelectedSize(size);
										setShowSizeError(false);
									}}
									className={`w-8 h-8 rounded-full text-xs font-medium transition-all
                     ${
												selectedSize === size
													? "bg-indigo-600 text-white shadow-md scale-105"
													: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
											}
                     ${showSizeError ? "ring-2 ring-red-500 animate-pulse" : ""}
                   `}
								>
									{size}
								</button>
							))}
						</div>
						{showSizeError && (
							<p className="text-[10px] text-red-500 mt-1 font-medium animate-fade-in">
								Selecciona talla
							</p>
						)}
					</div>
				)}

				<div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
					<span className="text-lg font-bold text-slate-900 dark:text-white">
						{product.price}€
					</span>
					<button
						aria-label="Añadir al carrito"
						onClick={handleAddToCart}
						className={`bg-slate-900 dark:bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shadow-lg hover:shadow-indigo-500/20 active:scale-95 ${showSizeError ? "bg-red-500 hover:bg-red-600" : ""}`}
					>
						<ShoppingBag className="w-5 h-5" />
					</button>
				</div>
			</div>
		</motion.div>
	);
}
