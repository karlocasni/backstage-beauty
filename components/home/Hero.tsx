"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Instagram, Youtube } from "lucide-react";
import { Tiktok } from "@/components/icons/Tiktok";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Background Decor - simple gradients/blobs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image src="/hero-bg.jpg" alt="Background" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-white/70" />

                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-accent-200/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto z-10"
            >
                <span className="font-handwriting text-3xl md:text-5xl text-accent-200 block mb-6">
                    Dobrodošli u
                </span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-dark-500 mb-8 leading-tight">
                    Backstage Beauty <br /> Podcast
                </h1>
                <p className="font-sans text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Iskreni razgovori o trendovima, novostima i najbolje čuvanim tajnama beauty industrije.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link href="/blog">
                        <Button size="lg" className="shadow-accent-200/30">
                            Slušaj Epizode
                        </Button>
                    </Link>
                    <Link href="/#about">
                        <Button variant="outline" size="lg">
                            Upoznaj voditeljice
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Floating Socials */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4"
            >
                <a href="#" className="bg-white/50 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-sm border border-white/40">
                    <Instagram className="text-dark-500" size={24} />
                </a>
                <a href="#" className="bg-white/50 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-sm border border-white/40">
                    <Youtube className="text-dark-500" size={24} />
                </a>
                <a href="#" className="bg-white/50 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-sm border border-white/40">
                    <Tiktok className="text-dark-500" size={24} />
                </a>
            </motion.div>
        </section>
    );
}
