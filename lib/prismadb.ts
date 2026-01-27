import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Fix: Strip quotes from env vars if they were accidentally added in Vercel
const sanitizeEnv = (key: string) => {
    const value = process.env[key];
    if (value && (value.startsWith('"') || value.startsWith("'"))) {
        const cleanValue = value.slice(1, -1);
        console.log(`Sanitized ${key}: removed quotes`);
        process.env[key] = cleanValue;
    }
};

sanitizeEnv("DATABASE_URL");
sanitizeEnv("DIRECT_URL");

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
