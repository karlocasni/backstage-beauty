"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Instagram, Youtube } from "lucide-react";
import { Tiktok } from "@/components/icons/Tiktok";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Početna" },
        { href: "/#about", label: "O nama" },
        { href: "/#episodes", label: "Epizode" },
        { href: "/blog", label: "Blog" },
        { href: "/#contact", label: "Kontakt" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-handwriting font-bold text-dark-500">
                    Backstage Beauty
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium hover:text-accent-200 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="https://www.instagram.com/backstagebeauty.podcast/" target="_blank" className="hover:text-accent-200 transition-colors">
                        <Instagram size={20} />
                    </Link>
                    <Link href="https://www.youtube.com/@Backstage_Beauty" target="_blank" className="hover:text-red-500 transition-colors">
                        <Youtube size={20} />
                    </Link>
                    <Link href="https://www.tiktok.com/@backstagebeauty.podcast?_r=1&_t=ZN-93MqxpbG6v0" target="_blank" className="hover:text-black transition-colors">
                        <Tiktok size={20} />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md p-6 shadow-lg border-t border-gray-100 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-lg font-medium py-2 border-b border-gray-50 last:border-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex gap-4 pt-4 justify-center">
                        <Link href="https://www.instagram.com/backstagebeauty.podcast/" target="_blank" className="hover:text-accent-200 transition-colors">
                            <Instagram size={24} />
                        </Link>
                        <Link href="https://www.youtube.com/@Backstage_Beauty" target="_blank" className="hover:text-red-500 transition-colors">
                            <Youtube size={24} />
                        </Link>
                        <Link href="https://www.tiktok.com/@backstagebeauty.podcast?_r=1&_t=ZN-93MqxpbG6v0" target="_blank" className="hover:text-black transition-colors">
                            <Tiktok size={24} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
