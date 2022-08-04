import { getLibrary } from '@/utils/web3react';
import { Web3ReactProvider } from '@web3-react/core';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {getLayout(<Component {...pageProps} />)}
    </Web3ReactProvider>
  );
}

export default MyApp;
