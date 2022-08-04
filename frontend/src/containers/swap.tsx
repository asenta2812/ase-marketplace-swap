import { PrimaryButton, SwapInput, SwapOutput } from '@/components';
import { RetweetOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

interface SwapProps {}

export const Swap: React.FC<SwapProps> = () => {
  const handleSwap = useCallback(() => {}, []);
  const [valueSwap, setValueSwap] = useState<number>(0);
  const handleSetValueSwap = useCallback((value: number) => {
    setValueSwap(value);
  }, []);
  return (
    <>
      <Row justify="center" align="middle" className="bg-red mt-32">
        <Col xl={6} lg={8} md={10} sm={14} xs={18}>
          <div className="bg-gradient-to-br from-cyan-800 to-blue-800 shadow-xl text-gray-50 rounded-2xl p-5">
            <div>
              <Typography.Title className="!text-inherit text-center" level={3}>
                Swap
              </Typography.Title>
            </div>
            <SwapInput setValueSwap={handleSetValueSwap} />
            <div className="text-center my-5">
              <PrimaryButton
                size="large"
                icon={<RetweetOutlined className="!text-inherit flex-1" />}
                shape="circle"
                ghost
                className="!inline-block"
              />
            </div>
            <SwapOutput />
            <PrimaryButton
              className="!mt-5 w-full justify-center"
              onClick={handleSwap}
            >
              Swap
            </PrimaryButton>
          </div>
        </Col>
      </Row>
    </>
  );
};
