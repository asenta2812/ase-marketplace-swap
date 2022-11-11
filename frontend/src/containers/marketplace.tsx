import { TransferToken } from '@/components';
import CreateOrder from '@/components/create-petty';
import { ListPetty } from '@/components/list-petty';
import { Row } from 'antd';
import React from 'react';

interface MarketplaceProps {}

export const Marketplace: React.FC<MarketplaceProps> = () => {
  // const get;
  return (
    <>
      <Row className="mx-[10%]">
        {/* <TransferToken /> */}
        <CreateOrder />
        <ListPetty />
      </Row>
    </>
  );
};
