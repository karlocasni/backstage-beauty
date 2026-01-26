import { getPost, updatePost } from "@/lib/actions";
import { PostForm } from "@/components/admin/PostForm";
import { redirect } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postId = parseInt(id);
    const post = await getPost(postId);

    if (!post) {
        redirect("/admin/dashboard");
    }

    const { ...postData } = post;
    const updateAction = updatePost.bind(null, postId);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-dark-500 mb-8">Edit Episode</h1>
            <PostForm
                initialData={postData}
                action={updateAction}
                submitLabel="Update Episode"
            />
        </div>
    );
}
