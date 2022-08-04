import { Swap } from '@/containers';
import { MainLayout, Meta } from '@/layouts';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Meta />
      <Swap />
    </>
  );
};

Home.getLayout = (children: ReactElement): ReactNode => {
  return <MainLayout>{children}</MainLayout>;
};
export default Home;
