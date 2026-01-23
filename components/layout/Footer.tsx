import Link from "next/link";
import { Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-handwriting font-bold text-dark-500 mb-2">Backstage Beauty</h2>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Vaš gušt za ljepotu iza zastora. Ekskluzivne priče, trendovi i razgovori s najsjaćnijim ikonama industrije.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="p-3 rounded-full bg-gray-50 text-dark-500 hover:bg-accent-100/20 hover:text-accent-200 transition-all">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="p-3 rounded-full bg-gray-50 text-dark-500 hover:bg-red-50 hover:text-red-500 transition-all">
                            <Youtube size={20} />
                        </Link>
                        <Link href="mailto:hello@backstagebeauty.com" className="p-3 rounded-full bg-gray-50 text-dark-500 hover:bg-gray-100 transition-all">
                            <Mail size={20} />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Backstage Beauty. Sva prava pridržana.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <h4 className="font-bold mb-3">Brze Poveznice</h4>
                        <ul className="flex gap-6 mt-4 md:mt-0">
                            <li><Link href="/#about" className="hover:text-dark-500 transition-colors">O Nama</Link></li>
                            <li><Link href="/#episodes" className="hover:text-dark-500 transition-colors">Epizode</Link></li>
                            <li><Link href="/blog" className="hover:text-dark-500 transition-colors">Blog</Link></li>
                            <li><Link href="/#contact" className="hover:text-dark-500 transition-colors">Kontakt</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
