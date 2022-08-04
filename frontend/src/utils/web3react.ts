import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { POLLING_INTERVAL } from '../configs/contants';

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const getWalletActive = () => {
  return {
    Metamask: new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42, 97, 11115],
    }),
  };
};
