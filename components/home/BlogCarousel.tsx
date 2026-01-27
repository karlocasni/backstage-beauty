"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

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

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
    };

    return (
        <section id="episodes" className="py-24 bg-accent-100/20 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <span className="font-handwriting text-2xl text-accent-200">Slušaj Sad</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-500 mt-2">Najnovije Epizode</h2>
                </div>
                <div className="hidden md:flex gap-4 items-center">
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white hover:bg-white/80"
                            onClick={scrollLeft}
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white hover:bg-white/80"
                            onClick={scrollRight}
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                    <Link href="/blog">
                        <Button variant="ghost" className="flex gap-2 items-center">
                            Sve Epizode <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-6 md:px-[calc(50vw-600px)]"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {posts.length === 0 ? (
                        <div className="text-gray-500 italic px-6 w-full text-center py-12">Nema epizoda još. Ostanite s nama!</div>
                    ) : (
                        posts.map((ep, index) => (
                            <motion.div
                                key={ep.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="min-w-[340px] w-[340px] snap-center flex-shrink-0"
                            >
                                <Link href={`/blog/post-${ep.id}`} className="block h-full transition-transform duration-300 hover:-translate-y-2">
                                    <GlassContainer className="h-full flex flex-col p-0 overflow-hidden bg-white/40 hover:bg-white/60 transition-colors group cursor-pointer">
                                        <div className="h-56 w-full relative bg-gray-200 overflow-hidden">
                                            {ep.image && <img src={ep.image} alt={ep.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                                <div className="bg-white/90 p-4 rounded-full shadow-lg backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                                    <Play size={24} className="ml-1 text-accent-200" fill="currentColor" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs font-bold tracking-wider text-accent-200 uppercase">{ep.date}</span>
                                            </div>
                                            <h3 className="font-serif text-2xl font-bold text-dark-500 mb-3 group-hover:text-accent-200 transition-colors leading-tight">{ep.title}</h3>
                                            <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{ep.excerpt}</p>
                                            <span className="inline-flex items-center text-sm font-semibold text-dark-500 group-hover:text-accent-200 transition-colors mt-auto group/btn">
                                                Slušaj Epizodu <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </span>
                                        </div>
                                    </GlassContainer>
                                </Link>
                            </motion.div>
                        ))
                    )}

                    {/* Spacer for end of scroll */}
                    <div className="min-w-[5vw]"></div>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="container mx-auto px-6 mt-6 flex justify-between md:hidden">
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white"
                        onClick={scrollRight}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
                <Link href="/blog">
                    <Button variant="outline" className="justify-center">
                        Sve Epizode
                    </Button>
                </Link>
            </div>
        </section>
    );
}
