"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface Post {
    id: number;
    title: string;
    excerpt: string; // Mapped from shortDesc
    image: string; // Mapped from featuredImage or default
    date: string;
}

interface BlogCarouselProps {
    posts: Post[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section id="episodes" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <span className="font-handwriting text-2xl text-accent-200">Slušaj Sad</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-500 mt-2">Najnovije Epizode</h2>
                </div>
                <Link href="/blog">
                    <Button variant="ghost" className="hidden md:flex gap-2 items-center">
                        Sve Epizode <ArrowRight size={18} />
                    </Button>
                </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative w-full pl-6 md:pl-[calc(50vw-600px)]">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 pr-6 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {posts.length === 0 ? (
                        <div className="text-gray-500 italic px-6">Nema epizoda još. Ostanite s nama!</div>
                    ) : (
                        posts.map((ep, index) => (
                            <motion.div
                                key={ep.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="min-w-[300px] md:min-w-[400px] snap-center"
                            >
                                <GlassContainer className="h-full flex flex-col p-0 overflow-hidden bg-white/40 hover:bg-white/60 transition-colors group cursor-pointer">
                                    <div className="h-48 w-full relative bg-gray-200">
                                        {ep.image && <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                            <div className="bg-white/90 p-4 rounded-full shadow-lg">
                                                <Play size={24} className="ml-1 text-accent-200" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="text-xs font-bold tracking-wider text-accent-200 uppercase mb-2">{ep.date}</span>
                                        <h3 className="font-serif text-2xl font-bold text-dark-500 mb-3 group-hover:text-accent-200 transition-colors">{ep.title}</h3>
                                        <p className="text-gray-600 text-sm mb-6 flex-grow">{ep.excerpt}</p>
                                        <Link href={`/blog/post-${ep.id}`} className="inline-flex items-center text-sm font-semibold text-dark-500 hover:text-accent-200 transition-colors">
                                            Slušaj Epizodu <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </GlassContainer>
                            </motion.div>
                        ))
                    )}

                    {/* Spacer for end of scroll */}
                    <div className="min-w-[5vw]"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-6 md:hidden">
                <Link href="/blog">
                    <Button variant="outline" className="w-full justify-center">
                        View All Episodes
                    </Button>
                </Link>
            </div>
        </section>
    );
}
