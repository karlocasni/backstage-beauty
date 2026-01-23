"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white relative">
            {/* Decor */}
            <div className="absolute right-0 top-20 w-64 h-64 bg-accent-100/10 rounded-full blur-[80px]" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="font-handwriting text-2xl text-accent-200">Glasovi</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-500 mt-2">Upoznajte Vaše Voditelje</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Host 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <h3 className="font-serif text-2xl">Sarah Jenkins</h3>
                                <p className="font-sans text-sm opacity-90">Šminkerica</p>
                            </div>
                            {/* Replace with actual Image component */}
                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400">
                                Slika Dolazi Uskoro
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-first lg:order-none"
                    >
                        <GlassContainer className="text-center">
                            <p className="font-serif text-xl italic text-gray-800 mb-6">
                                "Vjerujemo da je ljepota više od površinskog—to su priče, borbe i tajne iza glamura."
                            </p>
                            <p className="font-sans text-gray-600 leading-relaxed mb-6">
                                Backstage Beauty donosi vam ekskluzivne intervjue s ikonama industrije, iskrene recenzije proizvoda i pogled na ono što se zapravo događa prije nego se zavjesa podigne.
                            </p>
                            <p className="font-handwriting text-2xl text-accent-200">
                                xoxo, S & J
                            </p>
                        </GlassContainer>
                    </motion.div>

                    {/* Host 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <h3 className="font-serif text-2xl">Jessica Lee</h3>
                                <p className="font-sans text-sm opacity-90">Beauty Urednica</p>
                            </div>
                            {/* Replace with actual Image component */}
                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400">
                                Image Placeholder
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
