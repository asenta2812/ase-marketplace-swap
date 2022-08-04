import { DEFAULT_TOKENS } from '@/configs/tokens';
import { Currency } from '@/types/Currency';
import { Select, Typography } from 'antd';
import React from 'react';
interface SelectTokensProps {
  // eslint-disable-next-line no-unused-vars
  onSelectToken: (token: string) => void;
  defaultValue: Currency;
}

const SelectTokens: React.FC<SelectTokensProps> = ({
  onSelectToken,
  defaultValue,
}) => {
  const handleSelect = (value: string) => {
    onSelectToken(value);
  };
  return (
    <>
      <Select
        onSelect={handleSelect}
        defaultValue={defaultValue.symbol}
        className="!bg-transparent w-40 !max-w-40"
      >
        {DEFAULT_TOKENS.map((token) => (
          <Select.Option key={token.symbol} value={token.symbol}>
            <Typography.Paragraph
              ellipsis
            >{`${token.name} (${token.symbol})`}</Typography.Paragraph>
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default SelectTokens;
