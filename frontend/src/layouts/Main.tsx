import { MainHeader } from '@/components';
import { Layout } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { IMetaProps } from './Meta';
interface IMainLayoutProps {
  children: React.ReactNode;
  meta?: IMetaProps;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const ref = useRef<any>();
  const [showBgHeader, setShowBgHeader] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;
    const exeFunc = (e: any) => {
      if (e.target.scrollTop > 96) {
        setShowBgHeader(true);
      } else {
        setShowBgHeader(false);
      }
    };
    ref.current.addEventListener('scroll', exeFunc);

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', exeFunc);
      }
    };
  }, []);
  return (
    <>
      <Layout
        ref={ref}
        className="h-[100vh] text-gray-50 text-base bg-[url('../assets/images/background.svg')] bg-no-repeat bg-blue-200 bg-bottom overflow-auto"
      >
        <MainHeader showBg={showBgHeader} />
        <Layout.Content className="bg-transparent mt-24">
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
};
