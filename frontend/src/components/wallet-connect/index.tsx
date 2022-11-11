import { getASETokenContract } from '@/configs/contracts';
import { requestNonce, verifySignature } from '@/services';
import {
  getIsValidAccessToken,
  getSigner,
  removeLocalStorage,
  setLocalStorage,
  shortenAddress,
} from '@/utils';
import { getWalletActive } from '@/utils/web3react';
import { LoginOutlined, WalletOutlined } from '@ant-design/icons';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Menu, Row, Typography } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomDropdown from '../dropdown';
import { MessageError } from '../messages';
import { PrimaryButton } from '../primary-button';

interface WalletConnectProps {}

export const WalletConnect: React.FC<WalletConnectProps> = () => {
  const { active, error, account, activate, deactivate, library, chainId } =
    useWeb3React<Web3Provider>();
  const [data, setData] = useState({ symbol: '', balance: '0' });
  const [loading, setLoading] = useState<boolean>(false);
  const { Metamask } = getWalletActive();
  const isValidAccessToken = getIsValidAccessToken();

  const handleSignOut = useCallback(() => {
    removeLocalStorage();
    deactivate();
  }, [deactivate]);

  const handleMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'sign_out') {
        handleSignOut();
      }
    },
    [handleSignOut]
  );

  const handleSignIn = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const acc = await Metamask.getAccount();
      const provider = await Metamask.getProvider();
      const web3Provider = new Web3Provider(provider);
      const signer = getSigner(web3Provider, acc);
      if (!acc || !signer) {
        setLoading(false);
        return;
      }
      const { nonce, address } = await requestNonce(acc);
      const signature = await signer.signMessage(nonce.toString());
      const { access_token } = await verifySignature(signature, nonce, address);
      setLocalStorage(access_token);
      activate(Metamask);
    } catch (error: any) {
      deactivate();
      MessageError(error?.message);
    } finally {
      setLoading(false);
    }
  }, [Metamask, activate, deactivate, loading]);

  const accountChanged = useCallback(
    async (e: any) => {
      const arr = Array.from(e);
      if (arr && arr[0]) {
        await handleSignIn();
      } else {
        handleSignOut();
      }
    },
    [handleSignOut, handleSignIn]
  );

  const chainChanged = (e: any) => {
    console.log('chain changed', e);
  };

  useEffect(() => {
    // refAccount.current = account;
    const metamask = (window as any).ethereum;
    if (metamask && metamask.on) {
      metamask.on('accountsChanged', accountChanged);
      metamask.on('chainChanged', chainChanged);
    }

    return () => {
      const metamask = (window as any).ethereum;

      if (metamask && metamask.on) {
        metamask.removeListener('accountsChanged', accountChanged);
        metamask.removeListener('chainChanged', chainChanged);
      }
    };
  }, [account, accountChanged]);

  // refresh page
  useEffect(() => {
    if (isValidAccessToken) {
      activate(Metamask);
    }
  }, [isValidAccessToken]);

  const menu = useMemo(() => {
    return (
      <Menu
        className="bg-transparent custom-dropdown"
        onClick={handleMenuClick}
        items={[
          {
            label: (
              <Row
                align="middle"
                justify="space-between"
                className="!w-full"
                wrap={false}
              >
                <Typography.Text ellipsis className="text-inherit">
                  {data.balance}
                </Typography.Text>
                <Typography.Text strong className="text-inherit">
                  {data.symbol}
                </Typography.Text>
              </Row>
            ),
            key: 1,
            icon: <WalletOutlined />,
          },
          {
            label: 'Disconnect',
            key: 'sign_out',
            icon: <LoginOutlined />,
          },
        ]}
      />
    );
  }, [handleMenuClick, data]);

  useEffect(() => {
    if (error) {
      MessageError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (account && library && chainId && !error) {
      const get = async () => {
        const asenContract = getASETokenContract(library.getSigner(account));
        const balanceBN = await asenContract.balanceOf(account);
        const balance = formatEther(balanceBN);
        const symbol = await asenContract.symbol();
        setData({ symbol, balance });
      };
      get();
    }
  }, [account, library, chainId]);
  return (
    <>
      {(!active || !account || loading) && (
        <PrimaryButton
          onClick={handleSignIn}
          icon={<WalletOutlined />}
          loading={loading}
        >
          Wallet Connect
        </PrimaryButton>
      )}
      {active && account && !loading && (
        <CustomDropdown menu={menu} className="w-44 justify-center">
          {shortenAddress(account)}
        </CustomDropdown>
      )}
    </>
  );
};
