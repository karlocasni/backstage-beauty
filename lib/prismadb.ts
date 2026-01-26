import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Use absolute path for the database file to ensure it works in all environments
// const dbPath = path.join(process.cwd(), "prisma", "dev.db");
// process.env.DATABASE_URL = `file:${dbPath}`;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
