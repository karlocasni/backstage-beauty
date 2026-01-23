import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogCarousel } from "@/components/home/BlogCarousel";
import { Newsletter } from "@/components/home/Newsletter";
import { Sponsors } from "@/components/home/Sponsors";
import { ContactForm } from "@/components/home/ContactForm";
import { getPosts } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();
  const carouselPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt: post.shortDesc,
    image: post.featuredImage || "",
    date: post.createdAt.toLocaleDateString(),
  }));

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <BlogCarousel posts={carouselPosts} />
      <Newsletter />
      <Sponsors />
      <ContactForm />
      <Footer />
    </main>
  );
}
