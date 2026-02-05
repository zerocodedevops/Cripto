import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, User } from "lucide-react";
import { useState } from "react";
import {
	premiumEffects,
	premiumLayout,
	premiumTypography,
} from "../utils/premiumTheme";

interface LoginModalProps {
	readonly isOpen: boolean;
	readonly onLogin: (username: string) => void;
}

export function LoginModal({ isOpen, onLogin }: LoginModalProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username.trim()) {
			onLogin(username);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-black/80 backdrop-blur-sm"
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className="relative w-full max-w-[400px] p-8 overflow-hidden"
						style={{
							...premiumEffects.glassmorphism,
							borderRadius: premiumLayout.borderRadius.lg,
							borderColor: "rgba(255, 255, 255, 0.1)",
						}}
					>
						{/* Background Glow */}
						<div className="absolute -top-24 -left-24 w-48 h-48 bg-lavender-500/20 blur-[60px] rounded-full pointer-events-none" />

						<div className="relative text-center mb-8">
							<div className="w-16 h-16 mx-auto mb-6 rounded-3xl bg-lavender-500/10 flex items-center justify-center border border-lavender-500/20">
								<User className="w-8 h-8 text-lavender-400" />
							</div>
							<h2
								className="text-2xl font-bold mb-2"
								style={{ fontFamily: premiumTypography.fontFamily.display }}
							>
								Welcome Back
							</h2>
							<p className="text-sm opacity-40 uppercase tracking-widest font-medium">
								Access Analytics Workspace
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-1">
								<div className="relative">
									<User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
									<input
										type="text"
										placeholder="Username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-lavender-500/50 transition-colors"
									/>
								</div>
							</div>

							<div className="space-y-1">
								<div className="relative">
									<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
									<input
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-lavender-500/50 transition-colors"
									/>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-lavender-400 hover:bg-lavender-300 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group mt-8"
							>
								<span>Initialize Session</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</button>
						</form>

						<p className="mt-8 text-[10px] text-center opacity-30 uppercase tracking-[0.2em]">
							Encrypted Session Hardware Required
						</p>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
