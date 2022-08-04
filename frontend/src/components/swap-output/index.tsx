import { DEFAULT_TOKENS } from '@/configs/tokens';
import { Currency } from '@/types/Currency';
import { Input } from 'antd';
import React from 'react';
import SelectTokens from '../select-tokens';

interface SwapOutputProps {
  currency?: Currency;
}

export const SwapOutput: React.FC<SwapOutputProps> = ({
  currency = DEFAULT_TOKENS[1],
}) => {
  const handleSelectToken = () => {};
  return (
    <>
      <Input.Group compact className="!flex !bg-gray-600">
        <SelectTokens
          defaultValue={currency}
          onSelectToken={handleSelectToken}
        />

        <Input
        // style={{ width: '50%' }}
        />
      </Input.Group>
    </>
  );
};
