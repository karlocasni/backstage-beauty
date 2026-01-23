"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-100/10 via-white to-accent-200/10" />

            <div className="container mx-auto px-6 relative z-10">
                <GlassContainer className="max-w-4xl mx-auto text-center py-16 px-6 md:px-12 bg-white/30">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-dark-500 mb-4">
                        Join the Inner Circle
                    </h2>
                    <p className="font-sans text-gray-600 mb-8 max-w-lg mx-auto">
                        Get exclusive beauty tips, early access to episodes, and behind-the-scenes content delivered straight to your inbox.
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto p-2 bg-white/50 backdrop-blur-sm rounded-full border border-white">
                        <Input
                            type="email"
                            placeholder="Vaša email adresa"
                            className="border-0 bg-transparent h-auto py-3 focus-visible:ring-0"
                        />
                        <Button size="lg" className="rounded-full shadow-md">
                            Pretplati se
                        </Button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4">
                        Bez spama, samo glamur. Otkažite pretplatu bilo kada.
                    </p>
                </GlassContainer>
            </div>
        </section>
    );
}
