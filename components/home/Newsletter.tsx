"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { Tiktok } from "@/components/icons/Tiktok";

export function Newsletter() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-100/10 via-white to-accent-200/10" />

            <div className="container mx-auto px-6 relative z-10">
                <GlassContainer className="max-w-4xl mx-auto text-center py-16 px-6 md:px-12 bg-white/30">
                    <p className="font-handwriting text-2xl text-accent-200 mb-2">
                        Zapratite nas
                    </p>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-dark-500 mb-8">
                        Nikad ne propustite epizodu
                    </h2>

                    <div className="flex justify-center gap-6">
                        <Link href="https://www.instagram.com/backstagebeauty.podcast/" target="_blank" className="p-4 rounded-full bg-white shadow-md text-dark-500 hover:text-accent-200 transition-all hover:scale-110">
                            <Instagram size={28} />
                        </Link>
                        <Link href="https://www.youtube.com/@Backstage_Beauty" target="_blank" className="p-4 rounded-full bg-white shadow-md text-dark-500 hover:text-red-500 transition-all hover:scale-110">
                            <Youtube size={28} />
                        </Link>
                        <Link href="https://www.tiktok.com/@backstagebeauty.podcast?_r=1&_t=ZN-93MqxpbG6v0" target="_blank" className="p-4 rounded-full bg-white shadow-md text-dark-500 hover:text-black transition-all hover:scale-110">
                            <Tiktok size={28} />
                        </Link>
                    </div>
                </GlassContainer>
            </div>
        </section>
    );
}
