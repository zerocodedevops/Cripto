/* eslint-disable @typescript-eslint/no-deprecated */

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui";
import { articles } from "@/data/articles";

export default function BlogPost() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const article = articles.find((a) => a.id === Number(id));

	// Scroll to top on mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	// If article not found, redirect to home
	if (!article) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="min-h-screen pt-24 pb-20">
			{/* ProgressBar could go here */}

			<article className="container-custom max-w-4xl mx-auto">
				{/* Back Button */}
				<div className="mb-8">
					<Link
						to="/#blog"
						onClick={() => {
							// Small hack to ensure scroll happens if we are already on the page or just navigating back
							setTimeout(() => {
								document
									.getElementById("blog")
									?.scrollIntoView({ behavior: "smooth" });
							}, 100);
						}}
					>
						<Button
							variant="outline"
							leftIcon={<ArrowLeft className="w-4 h-4" />}
						>
							Volver a Pensamientos
						</Button>
					</Link>
				</div>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-12"
				>
					<div className="flex items-center gap-4 mb-6">
						<span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
							{article.category}
						</span>
						<div className="flex items-center gap-2 text-dark-400 text-sm">
							<Calendar className="w-4 h-4" />
							{article.date}
						</div>
						<div className="flex items-center gap-2 text-dark-400 text-sm">
							<Clock className="w-4 h-4" />
							{article.readTime} lectura
						</div>
					</div>

					<h1 className="heading-1 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-dark-100 to-dark-300">
						{article.title}
					</h1>

					<div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-dark-700/50 shadow-2xl">
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-dark-100
            prose-h2:text-2xl prose-h2:text-primary-400 prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:text-accent-400 prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-dark-300 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-white prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-dark-800/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-dark-200 prose-blockquote:rounded-r-lg
            prose-li:text-dark-300 prose-li:marker:text-primary-500"
				>
					<div dangerouslySetInnerHTML={{ __html: article.content }} />
				</motion.div>

				{/* Footer / Share */}
				<div className="mt-16 pt-8 border-t border-dark-700/50 flex justify-between items-center">
					<Link
						to="/#blog"
						onClick={() => {
							setTimeout(() => {
								document
									.getElementById("blog")
									?.scrollIntoView({ behavior: "smooth" });
							}, 100);
						}}
					>
						<span className="text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-2">
							<ArrowLeft className="w-4 h-4" />
							Volver a Pensamientos
						</span>
					</Link>

					<Button
						variant="outline"
						size="sm"
						rightIcon={<Share2 className="w-4 h-4" />}
					>
						Compartir
					</Button>
				</div>
			</article>
		</div>
	);
}
