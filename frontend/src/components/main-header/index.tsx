import logo from '@/assets/images/logo.png';
import { Layout } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Navbar } from '../navbar';
import { WalletConnect } from '../wallet-connect';
const { Header } = Layout;

interface HeaderProps {
  showBg: boolean;
}

export const MainHeader: React.FC<HeaderProps> = ({ showBg }) => {
  const router = useRouter();

  const handleClickLogo = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <Header
      className={clsx('fixed z-50 w-full h-24 transition-all bg-transparent', {
        'bg-black/20 shadow-lg': showBg,
      })}
    >
      <div className="text-inherit flex items-center justify-between h-full">
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
      </div>
    </Header>
  );
};
