
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Testing direct database connection via Prisma...');
    // masking password in log for security, just showing structure
    const url = process.env.DATABASE_URL || '';
    console.log('URL structure:', url.replace(/:[^:@]*@/, ':****@'));

    try {
        console.log('Attempting to connect...');
        await prisma.$connect();
        console.log('✅ Successfully connected to the database via TCP (Prisma)!');

        console.log('Attempting to run a query...');
        const count = await prisma.post.count();
        console.log(`✅ Database query successful. Found ${count} posts.`);

    } catch (e) {
        console.error('❌ Connection failed!');
        console.error('Error name:', e.name);
        console.error('Error message:', e.message);
        if (e.code) console.error('Error code:', e.code);
    } finally {
        await prisma.$disconnect();
    }
}

main();
