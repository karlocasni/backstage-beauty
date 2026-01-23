import { GlassContainer } from "@/components/ui/GlassContainer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { getPosts } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function BlogArchive() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <section className="pt-32 pb-16 px-6 text-center">
                <span className="font-handwriting text-3xl text-accent-200">Arhiva</span>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-500 mt-4">Sve Epizode</h1>
            </section>

            <section className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((ep: any) => (
                        <Link key={ep.id} href={`/blog/post-${ep.id}`}>
                            <GlassContainer className="h-full flex flex-col p-0 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white">
                                <div className="h-64 w-full relative bg-gray-200">
                                    {ep.featuredImage && <img src={ep.featuredImage} alt={ep.title} className="w-full h-full object-cover" />}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                        <div className="bg-white/90 p-4 rounded-full shadow-lg">
                                            <Play size={24} className="ml-1 text-accent-200" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-xs font-bold tracking-wider text-accent-200 uppercase mb-3">{ep.createdAt.toLocaleDateString()}</span>
                                    <h3 className="font-serif text-2xl font-bold text-dark-500 mb-3 group-hover:text-accent-200 transition-colors">
                                        {ep.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow">{ep.shortDesc}</p>
                                    <div className="flex items-center text-sm font-semibold text-dark-500 group-hover:text-accent-200 transition-colors">
                                        Slušaj Epizodu <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </GlassContainer>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
