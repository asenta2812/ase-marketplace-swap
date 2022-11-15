import resolvers from '@/graphql/resolvers';
import { createServer } from '@graphql-yoga/node';
import type { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import prisma from '@/lib/prisma';

const typeDefs = readFileSync(join(process.cwd(), 'graphql/schema.graphql'), {
    encoding: 'utf-8',
});

export type GraphQLContext = {
    prisma: PrismaClient;
};

export async function createContext(...props: any[]): Promise<GraphQLContext> {
    return {
        prisma,
    };
}

const server = createServer<{
    req: NextApiRequest;
    res: NextApiResponse;
}>({
    endpoint: '/api',
    schema: {
        typeDefs,
        resolvers,
    },
    context: createContext(),
});

export default server.requestListener;
