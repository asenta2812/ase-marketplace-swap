import { getTokenSaleContract } from '@/configs/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Input } from 'antd';
import { useCallback, useState } from 'react';
import { MessageError, MessageSuccess } from '../messages';
import { PrimaryButton } from '../primary-button';

const BuyToken = () => {
  const [value, setValue] = useState<string>('');
  const { library, account } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBuyToken = useCallback(() => {
    if (!library || !value || !account) return;
    if (!value) {
      return MessageError('Value is required!');
    }
    const valueParse = parseFloat(value);
    if (isNaN(valueParse)) {
      return MessageError('Value is not a number!');
    }
    const tokenSaleContract = getTokenSaleContract(
      library.getSigner(account).connectUnchecked()
    );
    tokenSaleContract
      .buy({
        from: account as string,
        value: parseEther(value),
      })
      .then((result) => {
        setLoading(false);
        return result.wait();
      })
      .then((res) => {
        setLoading(false);
        MessageSuccess(
          'Transaction successful with hash ' + res.transactionHash
        );
      })
      .catch((err) => {
        MessageError(err?.data?.message);
      });
  }, [account, library, value]);

  return (
    <>
      <div className="flex justify-end items-center">
        <Input
          placeholder="0.002 => 1"
          onChange={(e) => setValue(e.target.value)}
        />
        <PrimaryButton
          size="middle"
          className="ml-2"
          onClick={handleBuyToken}
          loading={loading}
        >
          Buy
        </PrimaryButton>
      </div>
    </>
  );
};

export default BuyToken;
