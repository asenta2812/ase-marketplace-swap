import { Col, Skeleton } from 'antd';
import React from 'react';

interface SkeletonPettyCardProps {
  active: boolean;
  loading: boolean;
}

export const SkeletonPettyCard: React.FC<SkeletonPettyCardProps> = ({
  active,
  loading,
}) => {
  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <Skeleton
        round
        active={active}
        loading={loading}
        className="w-full bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl border-none shadow-xl p-10 opacity-70"
      >
        <Skeleton.Image />
      </Skeleton>
    </Col>
  );
};
