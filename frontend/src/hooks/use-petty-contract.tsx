import { getPettyContract } from '@/configs/contracts';
import { Petty } from '@/configs/contracts/types';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useRef } from 'react';

export function usePettyContract() {
  const nftContract = useRef<Petty>();
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!nftContract.current && library) {
      nftContract.current = getPettyContract(library.getSigner());
    }
  }, [library]);

  async function checkApprovalNFT(tokenId: number) {
    if (!nftContract.current || !account) return null;
    const a = await nftContract.current.getApproved(tokenId);
    console.log('🚀 -> checkApprovalNFT -> a', a);
  }

  const mintNft = useCallback(async () => {
    if (!nftContract.current || !account) return null;
    return nftContract.current
      .mint(account, { from: account })
      .then((res) => {
        return res.wait();
      })
      .then((res) => {
        if (res.events && res.events.length > 0) {
          const { tokenId } = res.events[0].args as any;
          return BigNumber.from(tokenId).toNumber();
        }
        return 0;
      });
  }, [account]);

  return {
    mintNft,
  };
}
