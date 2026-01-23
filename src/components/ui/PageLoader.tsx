import { motion } from 'framer-motion';

export function PageLoader({ text = 'Loading...' }: { readonly text?: string }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-50">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    className="w-16 h-16 rounded-full border-2 border-t-purple-500 border-r-purple-500/50 border-b-purple-500/10 border-l-purple-500/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-cyan-400/50 border-b-transparent border-l-transparent"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-sm font-medium tracking-widest text-white/60 uppercase"
            >
                {text}
            </motion.p>
        </div>
    );
}
