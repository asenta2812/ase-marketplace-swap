import { isOwner } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { Row, Typography } from 'antd';
import React, { useMemo } from 'react';
import BuyToken from './buy-token';
import SendToken from './send-token';

interface BuyTokenProps {}

export const TransferToken: React.FC<BuyTokenProps> = () => {
  const { active, account, chainId } = useWeb3React();
  const owner = useMemo(() => isOwner(account, chainId), [account, chainId]);
  return (
    <>
      <Row justify="end" className="w-full">
        {active && owner && <SendToken />}
        {active && !owner && <BuyToken />}

        {!active && (
          <Typography.Paragraph className="text-inherit">
            Please connect your wallet
          </Typography.Paragraph>
        )}
      </Row>
    </>
  );
};
