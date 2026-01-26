"use client";

import { motion } from "framer-motion";

const sponsors = [
    "Callux"
];

export function Sponsors() {
    return (
        <section className="py-16 bg-white border-b border-gray-50">
            <div className="container mx-auto px-6 text-center">
                <p className="font-sans text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">
                    Naši sponzori
                </p>

                <div className="flex flex-wrap justify-center gap-8 items-center">
                    {sponsors.map((sponsor, index) => (
                        <motion.div
                            key={sponsor}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            className="flex justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                        >
                            {/* Logo Placeholder - using text for now but tailored for visual check */}
                            <span className="font-serif font-bold text-xl md:text-2xl text-gray-600 hover:text-dark-500 transition-colors">
                                {sponsor}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
