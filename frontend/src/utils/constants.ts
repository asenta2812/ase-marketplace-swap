import { Currency } from '@/types/Currency';

export const POLLING_INTERVAL = 1200;

export const ASA_DEFAULT: Currency = {
  decimals: 18,
  symbol: 'ASA',
  name: 'ASA',
};

export enum ChainId {
  MAINNET = 56,
  BSC_TESTNET = 97,
}

export const OWNER_ADDRESS: { [key: number]: string } = {
  [ChainId.BSC_TESTNET]: '0x1Fc380140a8DA79B645225733A11a662e5d76705',
};

export const KEY_ACCESS_TOKEN = 'AccessToken_123';

export const MAXIMUM_NUMBER_IMAGES = 4;

export enum STATUS {
  CREATED,
  SELLED,
  BUYED,
  CANCELLED,
}

export const PAGE_SIZE = {
  pageDefault: 0,
  pageLimit: 50,
};
