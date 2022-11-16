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

    Query: {
        getUser: async (_, { id }, { prisma }) => {
            let user = await prisma.user.findUnique({ where: { id } });
            // if(user){
            //   user = {...user, address: process.env.}
            // }
            return user;
        },
    },
};
export default resolvers;
