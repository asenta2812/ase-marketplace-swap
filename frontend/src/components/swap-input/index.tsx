import { DEFAULT_TOKENS } from '@/configs/tokens';
import { useDebounce } from '@/hooks';
import { Currency } from '@/types/Currency';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { Input, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton } from '../primary-button';
import SelectTokens from '../select-tokens';

interface SwapInputProps {
  currency?: Currency;
  // eslint-disable-next-line no-unused-vars
  setValueSwap?: (value: number) => void;
}

export const SwapInput: React.FC<SwapInputProps> = ({
  currency = DEFAULT_TOKENS[0],
  setValueSwap,
}) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState('0');
  const [valueTerm, setValueTerm] = useState<string>('0.0');
  const debounceValueTerm = useDebounce(valueTerm, 500);

  const handleSelectToken = useCallback((token: string) => {
    console.log('🚀 -> handleSelectToken -> props', token);
  }, []);

  useEffect(() => {
    if (!setValueSwap) {
      return;
    }
    if (debounceValueTerm) {
      setValueSwap(+debounceValueTerm);
    } else {
      setValueSwap(0);
    }
  }, [debounceValueTerm, setValueSwap]);

  useEffect(() => {
    if (library && account) {
      (async () => {
        const bn = await library.getBalance(account);
        const bl = formatEther(bn);
        setBalance(bl);
      })();
    }
  }, [account, library, currency]);
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <Typography.Text ellipsis className="flex-1 text-gray-50">
          {balance}
        </Typography.Text>
        <PrimaryButton size="small" ghost>
          Swap All
        </PrimaryButton>
      </div>
      <Input.Group compact className="!flex !bg-gray-600">
        <SelectTokens
          defaultValue={currency}
          onSelectToken={handleSelectToken}
        />
        <Input
          onChange={(elm) => setValueTerm(elm.target.value)}
          value={valueTerm}
        />
      </Input.Group>
    </>
  );
};
