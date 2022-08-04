import { MainLayout, Meta } from '@/layouts';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from './_app';
import { Marketplace as MarketplaceContainer } from '@/containers';

const Marketplace: NextPageWithLayout = () => {
  return (
    <>
      <Meta title="Marketplace" />
      <MarketplaceContainer />
    </>
  );
};

Marketplace.getLayout = (children: ReactElement): ReactNode => {
  return <MainLayout>{children}</MainLayout>;
};
export default Marketplace;
