import { getPosts, deletePost } from "@/lib/actions";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

export default async function DashboardPage() {
    const posts = await getPosts();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-dark-500">Dashboard</h1>
                <Link href="/admin/dashboard/new">
                    <Button>Create New Episode</Button>
                </Link>
            </div>

            <GlassContainer className="bg-white p-0 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                            <th className="p-6">Episode Title</th>
                            <th className="p-6">Date</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-12 text-center text-gray-500">
                                    No episodes found. Create your first one!
                                </td>
                            </tr>
                        ) : (
                            posts.map((post: any) => (
                                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-dark-500">{post.title}</div>
                                        <div className="text-sm text-gray-400 truncate max-w-xs">{post.shortDesc}</div>
                                    </td>
                                    <td className="p-6 text-sm text-gray-500">
                                        {post.createdAt.toLocaleDateString()}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Edit size={16} />
                                            </Button>
                                            <form action={deletePost.bind(null, post.id)}>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </GlassContainer>
        </div>
    );
}
