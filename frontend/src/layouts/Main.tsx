import { MainHeader } from '@/components';
import { Layout } from 'antd';
import React from 'react';
import { IMetaProps } from './Meta';
interface IMainLayoutProps {
  children: React.ReactNode;
  meta?: IMetaProps;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Layout className="h-[100vh] text-gray-50 text-base bg-[url('../assets/images/background.svg')] bg-no-repeat bg-blue-200 bg-bottom">
        <MainHeader />
        <Layout.Content className="bg-transparent">{children}</Layout.Content>
      </Layout>
    </>
  );
};
