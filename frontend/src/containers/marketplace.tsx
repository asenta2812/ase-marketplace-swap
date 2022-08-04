import { TransferToken } from '@/components';
import { Row } from 'antd';
import React from 'react';

interface MarketplaceProps {}

export const Marketplace: React.FC<MarketplaceProps> = () => {
  // const get;
  return (
    <>
      <Row className="mx-12">
        <TransferToken />
      </Row>
    </>
  );
};
