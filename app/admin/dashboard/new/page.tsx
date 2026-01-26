import { createPost } from "@/lib/actions";
import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-dark-500 mb-8">Create New Episode</h1>
            <PostForm action={createPost} submitLabel="Publish Episode" />
        </div>
    );
}
