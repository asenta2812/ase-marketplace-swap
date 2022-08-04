import { ShopOutlined, SwapOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { pathname, push } = useRouter();
  const getSelectedKey = useCallback(() => {
    if (pathname === '/') {
      return 'swap';
    }
    return 'marketplace';
  }, [pathname]);
  return (
    <>
      <Menu
        className="bg-transparent text-white text-lg flex-1 mx-10 justify-center border-none font-semibold"
        mode="horizontal"
        defaultSelectedKeys={['swap']}
        selectedKeys={[getSelectedKey()]}
      >
        <Menu.Item
          className="asen-menu items-center"
          key="swap"
          icon={<SwapOutlined />}
          onClick={() => pathname !== '/' && push('/')}
        >
          Swap
        </Menu.Item>
        <Menu.Item
          className="asen-menu items-center"
          key="marketplace"
          icon={<ShopOutlined />}
          onClick={() => pathname !== '/marketplace' && push('/marketplace')}
        >
          Marketplace
        </Menu.Item>
      </Menu>
    </>
  );
};
