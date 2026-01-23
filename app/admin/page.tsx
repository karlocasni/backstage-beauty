import { redirect } from "next/navigation";

export default function AdminPage() {
    // Mock authentication check - in real app, check session here
    redirect("/admin/dashboard");
}
