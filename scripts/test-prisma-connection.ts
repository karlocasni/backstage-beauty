
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Testing direct database connection via Prisma...');
    console.log('URL from env:', process.env.DATABASE_URL);

    try {
        await prisma.$connect();
        console.log('✅ Successfully connected to the database via TCP (Prisma)!');

        const count = await prisma.post.count();
        console.log(`✅ Database query successful. Found ${count} posts.`);

    } catch (e) {
        console.error('❌ Connection failed!');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
