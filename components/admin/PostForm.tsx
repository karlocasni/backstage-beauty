"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface PostFormProps {
    initialData?: {
        title: string;
        shortDesc: string;
        content: string;
        instagramUrl?: string | null;
        youtubeUrl?: string | null;
        featuredImage?: string | null;
        duration?: string | null;
        createdAt?: Date;
    };
    action: (formData: FormData) => Promise<void>;
    submitLabel: string;
}

export function PostForm({ initialData, action, submitLabel }: PostFormProps) {
    const [content, setContent] = useState(initialData?.content || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Format date for value prop (YYYY-MM-DDThh:mm)
    const formatDateForInput = (dateString?: Date) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);
        return localISOTime;
    };

    const formattedDate = formatDateForInput(initialData?.createdAt);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
    };

    return (
        <GlassContainer className="bg-white">
            <form action={action} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Episode Title</label>
                    <Input name="title" defaultValue={initialData?.title} placeholder="e.g. The Science of Retinol" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Publish Date & Time</label>
                        <Input
                            type="datetime-local"
                            name="createdAt"
                            defaultValue={formattedDate}
                            className="block w-full"
                        />
                        <p className="text-xs text-gray-400">Leave blank to use current time (for new posts).</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Duration</label>
                        <Input name="duration" defaultValue={initialData?.duration || ""} placeholder="e.g. 45 min" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        name="shortDesc"
                        defaultValue={initialData?.shortDesc}
                        className="flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:outline-none"
                        rows={3}
                        placeholder="A brief teaser for the card..."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Instagram URL</label>
                        <Input name="instagramUrl" defaultValue={initialData?.instagramUrl || ""} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">YouTube URL</label>
                        <Input name="youtubeUrl" defaultValue={initialData?.youtubeUrl || ""} placeholder="https://youtube.com/..." />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Featured Image</label>
                    {initialData?.featuredImage && (
                        <div className="mb-2">
                            <img src={initialData.featuredImage} alt="Current" className="h-40 w-auto rounded-md object-cover" />
                        </div>
                    )}
                    <Input type="file" name="featuredImage" accept="image/*" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-100 file:text-accent-200 hover:file:bg-accent-100/20" />
                    <p className="text-xs text-gray-400">Upload a new image to replace the existing one.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Content</label>
                    <input type="hidden" name="content" value={content} />
                    <div className="prose-editor">
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Write your show notes here..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit">{submitLabel}</Button>
                </div>
            </form>
        </GlassContainer>
    );
}
