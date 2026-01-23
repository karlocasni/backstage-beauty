"use client";

import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassContainer } from "@/components/ui/GlassContainer";

export default function NewPostPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-dark-500 mb-8">Create New Episode</h1>

            <GlassContainer className="bg-white">
                <form action={createPost} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Episode Title</label>
                        <Input name="title" placeholder="e.g. The Science of Retinol" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Short Description</label>
                        <textarea
                            name="shortDesc"
                            className="flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:outline-none"
                            rows={3}
                            placeholder="A brief teaser for the card..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Instagram URL</label>
                            <Input name="instagramUrl" placeholder="https://instagram.com/..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">YouTube URL</label>
                            <Input name="youtubeUrl" placeholder="https://youtube.com/..." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Featured Image URL</label>
                        <Input name="featuredImage" placeholder="/images/placeholder.jpg" />
                        <p className="text-xs text-gray-400">For now, enter a valid image URL.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Content (HTML Support)</label>
                        <textarea
                            name="content"
                            className="flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-mono focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:outline-none"
                            rows={15}
                            placeholder="<p>Write your show notes here...</p>"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="ghost">Cancel</Button>
                        <Button type="submit">Publish Episode</Button>
                    </div>
                </form>
            </GlassContainer>
        </div>
    );
}
