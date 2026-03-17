import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingScreen = ({ color = '#2563eb' }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                <motion.div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden"
                    style={{ backgroundColor: color }}
                    animate={{
                        borderRadius: ["24px", "48px", "24px"],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Sparkles size={40} className="text-white relative z-10" />
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{
                            y: ["100%", "-100%"]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    className="mt-8 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Générateur de CV</h2>
                    <div className="flex items-center justify-center gap-1 mt-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: color }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
