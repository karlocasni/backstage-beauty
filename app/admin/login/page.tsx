"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassContainer } from "@/components/ui/GlassContainer";

export default function LoginPage() {
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-100/10 via-white to-accent-200/10 px-6">
            <GlassContainer className="w-full max-w-md bg-white/60">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-4xl font-bold text-dark-500 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Backstage Beauty</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <Input
                            name="username"
                            type="text"
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <Input
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Login
                    </Button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-6">
                    Default credentials: admin / admin123
                </p>
            </GlassContainer>
        </div>
    );
}
