import { requestAsync } from '@/utils';
export const requestNonce = (address: string) => {
  return requestAsync<{ address: string; nonce: number }>({
    method: 'GET',
    url: '/auth/request-nonce/' + address,
  });
};
export const verifySignature = (
  signature: string,
  nonce: number,
  address: string
) => {
  return requestAsync<{ access_token: string }>({
    method: 'POST',
    url: '/auth/verify-signature',
    data: {
      signature,
      nonce,
      address,
    },
  });
};
