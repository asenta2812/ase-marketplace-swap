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
import { ethers } from 'ethers';
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
  const refAccount = useRef<string>();

  const handleMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'sign_out') {
        removeLocalStorage();
        deactivate();
      }
    },
    [deactivate]
  );

  const handleSignIn = async () => {
    console.log('123123123');
    if (loading) {
      return;
    }
    setLoading(true);
    const acc = await Metamask.getAccount();
    const eth = new ethers.providers.Web3Provider(await Metamask.getProvider());
    const signer = getSigner(eth, acc);
    if (!acc || !signer) {
      setLoading(false);
      return;
    }
    try {
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
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    if (!refAccount.current) {
      refAccount.current = account;
    }
    if (account !== refAccount.current) {
      (async () => {
        await handleSignIn();
        refAccount.current = account;
      })();
    }

    // refAccount.current = account;
  }, [account]);

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
    if (account && library && chainId) {
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
          {shortenAddress(account)}{' '}
        </CustomDropdown>
      )}
    </>
  );
};
