import { Resolvers } from '../types';
import { requestNonce, verifySignature } from './authentication';

const resolvers: Resolvers = {
    Mutation: {
        requestNonce: async (_, { input }, { prisma }) => {
            return requestNonce(input.address, prisma);
        },
        verifySignature: async (_, { input }, { prisma }) => {
            return verifySignature(input, prisma);
        },
    },
};
export default resolvers;
