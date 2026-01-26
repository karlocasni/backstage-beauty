"use server";

import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";

export async function login(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const admin = await prisma.admin.findUnique({
        where: { username },
    });

    if (!admin) {
        return { error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
        return { error: "Invalid credentials" };
    }

    // Set session cookie
    (await cookies()).set(SESSION_COOKIE, admin.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect("/admin/dashboard");
}

export async function logout() {
    (await cookies()).delete(SESSION_COOKIE);
    redirect("/admin/login");
}

export async function getSession() {
    const sessionCookie = (await cookies()).get(SESSION_COOKIE);

    if (!sessionCookie) {
        return null;
    }

    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(sessionCookie.value) },
    });

    return admin;
}

export async function changePassword(formData: FormData) {
    const session = await getSession();

    if (!session) {
        return { error: "Not authenticated" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const admin = await prisma.admin.findUnique({
        where: { id: session.id },
    });

    if (!admin) {
        return { error: "Admin not found" };
    }

    const isValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isValid) {
        return { error: "Current password is incorrect" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
        where: { id: session.id },
        data: { password: hashedPassword },
    });

    return { success: true };
}

// Initialize default admin (run this once)
export async function initializeAdmin() {
    const existingAdmin = await prisma.admin.findFirst();

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.admin.create({
            data: {
                username: "admin",
                password: hashedPassword,
            },
        });
    }
}
