import { getMarketplaceContract, getPettyContract } from '@/configs/contracts';
import { Marketplace, Petty } from '@/configs/contracts/types';
import { useEffect, useRef, useCallback } from 'react';

export function useMaketplace() {
  const nftContract = useRef<Petty>();
  const marketplaceContract = useRef<Marketplace>();

  useEffect(() => {
    if (!nftContract.current) {
      nftContract.current = getPettyContract();
    }
    if (!marketplaceContract.current) {
      marketplaceContract.current = getMarketplaceContract();
    }
  }, []);

  function checkApprovalNFT() {
    // nftContract.current.ap
  }

  const mintNft = useCallback(() => {}, []);

  return {
    mintNft,
  };
}
