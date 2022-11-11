import { ChainId } from '@/utils/constants';

export type Address = {
  [K in ChainId]: string;
};
export interface ContractAddress {
  [name: string]: Address;
}

const defineContractAddresses = <T extends ContractAddress>(t: T) => t;

const ADDRESSES = defineContractAddresses({
  Petty: {
    [ChainId.BSC_TESTNET]: '0x02b8032CA1005C2436c19Fb3DDF5A9286cFcD055',
    [ChainId.MAINNET]: '',
  },
  ASE: {
    [ChainId.BSC_TESTNET]: '0xEADe4f06aa05130375BCB6A869Ad7580f85A3344',
    [ChainId.MAINNET]: '',
  },
  TokenSale: {
    [ChainId.BSC_TESTNET]: '0xa6596e5e50A6C6DB674F05e8BaF5EfA2A19c7a79',
    [ChainId.MAINNET]: '',
  },
  Reserve: {
    [ChainId.BSC_TESTNET]: '0x96263cf2b87607d701A5a871FeDd64a5e712cf91',
    [ChainId.MAINNET]: '',
  },
  Marketplace: {
    [ChainId.BSC_TESTNET]: '0x465A30DCd08b9CAB3e400a35F763a06d5931dD8b',
    [ChainId.MAINNET]: '',
  },
});

export default ADDRESSES;
