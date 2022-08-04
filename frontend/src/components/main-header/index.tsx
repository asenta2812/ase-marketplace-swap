import logo from '@/assets/images/logo.png';
import { Layout } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Navbar } from '../navbar';
import { WalletConnect } from '../wallet-connect';
const { Header } = Layout;

interface HeaderProps {}

export const MainHeader: React.FC<HeaderProps> = () => {
  const router = useRouter();

  const handleClickLogo = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <Header className="bg-transparent text-inherit flex items-center justify-between h-24">
      <Image
        onClick={handleClickLogo}
        src={logo}
        alt="Logo"
        width={50}
        height={50}
        className="cursor-pointer"
      />

      <Navbar />
      <WalletConnect />
    </Header>
  );
};
