

import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Instagram, Youtube, Calendar, Clock } from "lucide-react";
import { getPost } from "@/lib/actions";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const id = parseInt(slug.replace("post-", ""));
    const post = await getPost(id);

    if (!post) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="text-2xl font-serif text-dark-500">Post nije pronađen</h1>
                </div>
                <Footer />
            </main>
        );
    }

    // Gallery placeholder if json is not valid
    let gallery: string[] = [];
    try {
        if (post.galleryImages) gallery = JSON.parse(post.galleryImages);
    } catch (e) { }


    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="relative h-[60vh] w-full bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gray-800/30 z-10" />

                {post.featuredImage ? (
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-4xl text-gray-400 font-serif">
                        Hero Image
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full z-20 pb-12 px-6">
                    <div className="container mx-auto">
                        <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Natrag na Epizode
                        </Link>
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 text-white/90 mb-4 text-sm font-medium">
                                <span className="flex items-center gap-2"><Calendar size={16} /> {post.createdAt.toLocaleDateString()}</span>
                                <span className="flex items-center gap-2"><Clock size={16} /> 45 min</span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex gap-4">
                                {post.youtubeUrl && (
                                    <Link href={post.youtubeUrl} target="_blank">
                                        <Button className="flex items-center gap-2">
                                            <Youtube size={20} /> Gledaj na YouTubeu
                                        </Button>
                                    </Link>
                                )}
                                {post.instagramUrl && (
                                    <Link href={post.instagramUrl} target="_blank">
                                        <Button variant="secondary" className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-0">
                                            <Instagram size={20} /> Pogledaj na Instagramu
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <p className="text-xl text-gray-600 font-serif italic mb-8 border-l-4 border-accent-200 pl-6 py-2">
                            {post.shortDesc}
                        </p>

                        {/* Gallery Grid */}
                        {gallery.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                                {gallery.map((img, i) => (
                                    <img key={i} src={img} className="aspect-square rounded-xl object-cover hover:scale-105 transition-transform duration-300" />
                                ))}
                            </div>
                        )}


                        <div className="prose prose-lg prose-headings:font-serif prose-a:text-accent-200 hover:prose-a:text-accent-100 max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <GlassContainer className="bg-white">
                                <h3 className="font-serif text-2xl font-bold text-dark-500 mb-6">Preporučeno</h3>

                                {/* Placeholder Recommended Logic */}
                                <div className="space-y-6">
                                    <p className="text-gray-400 italic text-sm">Više epizoda uskoro...</p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <Link href="/blog">
                                        <Button variant="outline" className="w-full justify-center">
                                            Pogledaj Arhivu
                                        </Button>
                                    </Link>
                                </div>
                            </GlassContainer>

                            <div className="mt-8 bg-accent-100/20 p-8 rounded-3xl text-center">
                                <h4 className="font-serif text-xl font-bold mb-2">Pretplati se</h4>
                                <p className="text-sm text-gray-600 mb-4">Nikad ne propuštaj epizodu.</p>
                                <div className="flex justify-center gap-4">
                                    <Button size="sm" variant="ghost" className="bg-white hover:bg-white/80"><Instagram size={20} /></Button>
                                    <Button size="sm" variant="ghost" className="bg-white hover:bg-white/80"><Youtube size={20} /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
