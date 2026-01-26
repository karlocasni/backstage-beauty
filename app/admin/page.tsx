import { getSession, initializeAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    // Initialize admin on first run
    await initializeAdmin();

    // Check if user is authenticated
    const session = await getSession();

    if (!session) {
        redirect("/admin/login");
    }

    redirect("/admin/dashboard");
}
