import { VerifySignatureOutput, RequestNonceOutput } from './../types';
import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';
import { GraphQLYogaError } from '@graphql-yoga/node';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { VerifySignatureInput } from '../types';

export async function requestNonce(
    address: string,
    prisma: PrismaClient
): Promise<RequestNonceOutput> {
    if (!address) {
        throw new GraphQLYogaError('Address is required!');
    }
    const isValid = isAddress(address);
    if (!isValid) {
        throw new GraphQLYogaError('Address is not valid!');
    }
    const addressLowerCase = address?.toLowerCase();
    const nonce = Math.floor(Math.random() * 10000 + 1);
    prisma.user &&
        (await prisma.user.upsert({
            where: { address },
            update: { nonce },
            create: {
                address,
                nonce,
            },
        }));
    return {
        nonce,
        address: addressLowerCase,
    };
}

export const verifySignature = async (
    input: VerifySignatureInput,
    prisma: PrismaClient
): Promise<VerifySignatureOutput> => {
    const { signature, nonce, address } = input;
    if (!signature) {
    }
    if (!nonce) {
        throw new GraphQLYogaError('Nonce is required!');
    }
    if (!address) {
        throw new GraphQLYogaError('Address is required!');
    }
    const isValid = isAddress(address);
    if (!isValid) {
        throw new GraphQLYogaError('Address is not valid!');
    }

    const addressLowerCase = address?.toLowerCase();
    const accountVerify = verifyMessage(
        nonce.toString(),
        signature
    ).toLowerCase();
    if (accountVerify === addressLowerCase) {
        const user = await prisma.user.findUnique({ where: { address } });
        if (!user) {
            throw new GraphQLYogaError('No address found');
        }

        if (user.nonce?.toString() === nonce.toString()) {
            // const token = await this.createAccessToken({
            //   nonce,
            //   name: user.name,
            //   avatar: user.avatar,
            //   sub: user._id,
            // });
            const secret = process.env.JWT_SECRET_KEY as string;
            const expiresIn = process.env.JWT_EXPIRES_IN as string;

            const token = sign(
                { nonce, name: user.name, avatar: user.avatar, sub: user.id },
                secret,
                { expiresIn }
            );

            return {
                accessToken: token,
                nonce,
            };
        }

        throw new GraphQLYogaError('Nonce not match');
    }
    throw new GraphQLYogaError('Signature failed!');
};
