import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query'],
        });
    }
    prisma = global.prisma;
}
export default prisma;
