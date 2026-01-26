import { getPosts, deletePost } from "@/lib/actions";
import { getSession, logout } from "@/lib/auth";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Edit, Trash2, Settings, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect("/admin/login");
    }

    const posts = await getPosts();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-dark-500">Dashboard</h1>
                <div className="flex gap-3">
                    <Link href="/admin/dashboard/settings">
                        <Button variant="outline" size="md" className="gap-2">
                            <Settings size={16} />
                            Settings
                        </Button>
                    </Link>
                    <form action={logout}>
                        <Button variant="ghost" size="md" className="gap-2">
                            <LogOut size={16} />
                            Logout
                        </Button>
                    </form>
                    <Link href="/admin/dashboard/new">
                        <Button>Create New Episode</Button>
                    </Link>
                </div>
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
                                            <Link href={`/admin/dashboard/edit/${post.id}`}>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <Edit size={16} />
                                                </Button>
                                            </Link>
                                            <DeleteButton id={post.id} deleteAction={deletePost} />
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
