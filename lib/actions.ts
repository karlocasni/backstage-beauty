"use server";

import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

async function saveImage(file: File | null): Promise<string> {
    if (!file || file.size === 0) return "";

    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const buffer = await file.arrayBuffer();

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from('images') // Ensure this bucket exists in Supabase
        .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        console.error("Error uploading image to Supabase:", error);
        return "";
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filename);

    return publicUrl;
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function getRecentPosts(excludeId?: number) {
    try {
        const posts = await prisma.post.findMany({
            where: excludeId ? {
                NOT: {
                    id: excludeId
                }
            } : {},
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        return posts;
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        return [];
    }
}

export async function getPost(id: number) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const content = formData.get("content") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const duration = formData.get("duration") as string;
    const createdAtRaw = formData.get("createdAt") as string;

    // Parse createdAt if provided, otherwise default (handled by DB default if undefined here, 
    // but if we pass undefined to prisma it uses default. If we pass a value, it uses it.)
    let createdAt: Date | undefined = undefined;
    if (createdAtRaw) {
        createdAt = new Date(createdAtRaw);
    }

    // Handle Image Upload
    const imageFile = formData.get("featuredImage") as File;
    const featuredImage = await saveImage(imageFile);

    await prisma.post.create({
        data: {
            title,
            shortDesc,
            content,
            instagramUrl,
            youtubeUrl,
            featuredImage,
            duration,
            ...(createdAt && { createdAt }),
        },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}

export async function deletePost(id: number) {
    try {
        await prisma.post.delete({
            where: { id },
        });
        revalidatePath("/blog");
        revalidatePath("/admin/dashboard");
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

export async function updatePost(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const content = formData.get("content") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const duration = formData.get("duration") as string;
    const createdAtRaw = formData.get("createdAt") as string;

    const data: any = {
        title,
        shortDesc,
        content,
        instagramUrl,
        youtubeUrl,
        duration,
    };

    if (createdAtRaw) {
        data.createdAt = new Date(createdAtRaw);
    }

    // Handle Image Upload only if a new file is provided
    const imageFile = formData.get("featuredImage") as File;
    const newImage = await saveImage(imageFile);
    if (newImage) {
        data.featuredImage = newImage;
    }

    await prisma.post.update({
        where: { id },
        data,
    });

    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}
