import "@/app/globals.css";
import { GlassContainer } from "@/components/ui/GlassContainer";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
                <div className="p-8 border-b border-gray-100">
                    <Link href="/" className="font-serif text-xl font-bold text-dark-500">
                        Backstage<br />Admin
                    </Link>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-accent-100/20 rounded-xl transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/dashboard/new" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-accent-100/20 rounded-xl transition-colors">
                        <PlusCircle size={20} />
                        <span>New Post</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-accent-100/20 rounded-xl transition-colors">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-0 w-full p-4">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={20} />
                        <span>Exit to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
