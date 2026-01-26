"use client";

import { useState } from "react";
import { changePassword } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassContainer } from "@/components/ui/GlassContainer";
import Link from "next/link";

export default function SettingsPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setSuccess(false);

        const result = await changePassword(formData);

        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            setSuccess(true);
            // Reset form
            (document.getElementById("password-form") as HTMLFormElement)?.reset();
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-dark-500">Settings</h1>
                <Link href="/admin/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </div>

            <GlassContainer className="bg-white">
                <h2 className="font-serif text-2xl font-bold text-dark-500 mb-6">Change Password</h2>

                <form id="password-form" action={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                            Password changed successfully!
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <Input
                            name="currentPassword"
                            type="password"
                            required
                            placeholder="Enter current password"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <Input
                            name="newPassword"
                            type="password"
                            required
                            placeholder="Enter new password"
                            minLength={6}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <Input
                            name="confirmPassword"
                            type="password"
                            required
                            placeholder="Confirm new password"
                            minLength={6}
                        />
                    </div>

                    <Button type="submit" size="lg">
                        Change Password
                    </Button>
                </form>
            </GlassContainer>
        </div>
    );
}
