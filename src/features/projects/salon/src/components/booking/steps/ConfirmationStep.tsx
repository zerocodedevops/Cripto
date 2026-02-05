"use client";
import { Button } from "@salon/components/ui/button";
import { createBooking } from "@salon/features/booking/actions";
import { useBookingStore } from "@salon/store/useBookingStore";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ConfirmationStep() {
	const { t } = useTranslation();
	const { serviceId, staffId, date, reset } = useBookingStore();
	const [status, setStatus] = useState<
		"idle" | "processing" | "success" | "error"
	>("idle");
	const [bookingRef, setBookingRef] = useState("");

	useEffect(() => {
		if (status === "idle" && date) {
			confirmBooking();
		}
	}, [status, date]);

	const confirmBooking = async () => {
		setStatus("processing");
		try {
			const res = await createBooking({
				userId: "guest-user", // Hardcoded for wizard demo
				serviceId: serviceId!,
				staffId: staffId === "any" ? undefined : staffId!,
				date: date!,
			});

			if (res.success && res.booking) {
				setStatus("success");
				setBookingRef(res.booking.id.slice(0, 8).toUpperCase());
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	if (status === "error") {
		return (
			<div className="text-center space-y-4">
				<h2 className="text-red-500 font-baroque text-3xl">Error</h2>
				<p className="text-neutral-400">
					Something went wrong creating your booking.
				</p>
				<Button onClick={reset} variant="outline">
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="flex flex-col items-center justify-center text-center space-y-8 h-full"
		>
			{status === "processing" ? (
				<div className="space-y-4">
					<Loader2 className="w-12 h-12 text-gold-500 animate-spin mx-auto" />
					<p className="text-neutral-400 text-sm tracking-widest uppercase animate-pulse">
						Confirming reservation...
					</p>
				</div>
			) : (
				<>
					<div className="w-24 h-24 rounded-full border-2 border-gold-500/50 flex items-center justify-center relative">
						<div className="absolute inset-0 bg-gold-500/10 rounded-full animate-pulse" />
						<CheckCircle className="w-10 h-10 text-gold-500" />
					</div>

					<div className="space-y-2">
						<h2 className="text-4xl md:text-5xl font-baroque text-gold-500">
							{t("success")}
						</h2>
						<p className="font-mono text-neutral-500 tracking-widest uppercase">
							Ref: {bookingRef}
						</p>
					</div>

					<div className="pt-8 space-y-4 w-full max-w-xs">
						<Button
							asChild
							className="w-full bg-white text-black hover:bg-neutral-200"
						>
							<Link to="/">Back to Home</Link>
						</Button>
					</div>
				</>
			)}
		</motion.div>
	);
}
