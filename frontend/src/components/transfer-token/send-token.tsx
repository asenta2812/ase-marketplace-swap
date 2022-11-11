import { getASETokenContract } from '@/configs/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Input } from 'antd';
import { parseEther } from '@ethersproject/units';
import { isAddress } from '@ethersproject/address';
import React, { useState } from 'react';
import { MessageError, MessageSuccess } from '../messages';
import { PrimaryButton } from '../primary-button';

interface SendTokenProps {}

const SendToken: React.FC<SendTokenProps> = () => {
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>();
  const { account, library } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSendToken = () => {
    if (!library) {
      return MessageError('Library is required!');
    }
    const aseTokenContract = getASETokenContract(library?.getSigner());
    if (!address) {
      return MessageError('Address is required!');
    }
    if (!isAddress(address)) {
      return MessageError('Address is not a valid!');
    }

    if (!amount) {
      return MessageError('Amount is required!');
    }
    const am = parseInt(amount, 10);
    if (Number.isNaN(am)) {
      return MessageError('Amount is not valid');
    }
    aseTokenContract
      .transfer(address, parseEther(amount), { from: account || '' })
      .then(async (res) => {
        setLoading(true);
        return res.wait();
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
  };
  return (
    <>
      <div className="flex justify-end items-center">
        <Input
          placeholder="Address..."
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="Amount..."
          className="ml-2"
          onChange={(e) => setAmount(e.target.value)}
        />
        <PrimaryButton
          size="middle"
          className="ml-2"
          onClick={handleSendToken}
          loading={loading}
        >
          Send Token
        </PrimaryButton>
      </div>
    </>
  );
};

export default SendToken;
