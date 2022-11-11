import type { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { Provider, StaticJsonRpcProvider } from '@ethersproject/providers';
import ADDRESSES, { Address } from './address';
import { AsenToken, Marketplace, Petty, Reserve, TokenSale } from './types';

// abis
import ASE_ABI from './abis/AsenToken.json';
import MARKETPLACE_ABI from './abis/Marketplace.json';
import PETTY_ABI from './abis/Petty.json';
import RESERVE_ABI from './abis/Reserve.json';
import TOKENSALE_ABI from './abis/TokenSale.json';
import { ChainId } from '@/utils/constants';

type ContractNames = keyof typeof ADDRESSES;
export const getAddress = (address: Address): string => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
    ? (parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) as ChainId)
    : ChainId.BSC_TESTNET;
  return address[chainId];
};
export const getContract = (
  keyAddress: ContractNames,
  abi: any[],
  signer?: Signer | Provider
) => {
  const s =
    signer || new StaticJsonRpcProvider(process.env.NEXT_PUBLIC_JRPC_PROVIDER);
  const addr = getAddress(ADDRESSES[keyAddress]);
  return new Contract(addr, abi, s);
};

export const getPettyContract = (signerOrProvider?: Signer | Provider) => {
  return getContract('Petty', PETTY_ABI, signerOrProvider) as Petty;
};

export const getASETokenContract = (signerOrProvider?: Signer | Provider) => {
  return getContract('ASE', ASE_ABI, signerOrProvider) as AsenToken;
};

export const getMarketplaceContract = (
  signerOrProvider?: Signer | Provider
) => {
  return getContract(
    'Marketplace',
    MARKETPLACE_ABI,
    signerOrProvider
  ) as Marketplace;
};

export const getReserveContract = (signerOrProvider?: Signer | Provider) => {
  return getContract('Reserve', RESERVE_ABI, signerOrProvider) as Reserve;
};

export const getTokenSaleContract = (signerOrProvider?: Signer | Provider) => {
  return getContract('TokenSale', TOKENSALE_ABI, signerOrProvider) as TokenSale;
};
