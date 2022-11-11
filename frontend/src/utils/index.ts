import CHAINS from '@/configs/chains.json';
import { KEY_ACCESS_TOKEN, OWNER_ADDRESS, ChainId } from './constants';
import { Web3Provider } from '@ethersproject/providers';
import { AxiosRequestConfig, Method } from 'axios';
import axios from './axios';
export const shortenAddress = (address: string) => {
  if (!address) return '';
  return address.slice(0, 5) + '...' + address.slice(-4);
};

export const getChainByChainId = (chainId: number) => {
  return CHAINS.find((chain) => chain.chainId === chainId);
};

export const getLocalStorage = <T>(key = KEY_ACCESS_TOKEN): T | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value || '') as T;
};

export const setLocalStorage = (value: any, key = KEY_ACCESS_TOKEN): void => {
  if (typeof window === 'undefined') {
    return;
  }
  const vl = JSON.stringify(value);
  localStorage.setItem(key, vl);
};

export const removeLocalStorage = (key = KEY_ACCESS_TOKEN): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(key);
};
export interface BaseResponse {
  total: number;
  limit: number;
  skip: number;
  data: any[];
}
interface RequestAsyncProps<X> extends AxiosRequestConfig {
  method: Method;
  url: string;
  data?: X;
}
export const requestAsync = <T = BaseResponse, X = any>({
  method,
  url,
  data,
  ...options
}: RequestAsyncProps<X>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axios({
      method,
      url,
      data,
      ...options,
    })
      .then((res) => resolve(res.data as T))
      .catch(reject);
  });
};

export const parseJwt = () => {
  const accessToken = getLocalStorage<string>();
  type JwtType = {
    nonce: number;
    name: string;
    exp: number;
    avatar: string;
  };
  try {
    if (!accessToken) {
      return null;
    }
    return JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    ) as JwtType;
  } catch (e) {
    return null;
  }
};

export const isOwner = (
  account: string | null | undefined,
  chainId: number | undefined
) => {
  if (!account || !chainId) return false;
  return account === OWNER_ADDRESS[chainId || ChainId.BSC_TESTNET];
};

export const getSigner = (
  library: Web3Provider | undefined,
  account: string | null | undefined
) => {
  if (!library) {
    return null;
  }
  if (!account) {
    return library.getSigner();
  }
  return library.getSigner(account).connectUnchecked();
};

export const getIsValidAccessToken = () => {
  const jwt = parseJwt();
  return jwt && new Date(jwt.exp * 1000) > new Date();
};

export const getFullUrlImage = (name: string) => {
  if (!name) return '';

  return (process.env.NEXT_PUBLIC_CDN_URL as string) + name;
};
