import { getPetties } from '@/services';
import { PAGE_SIZE } from '@/utils/constants';
import { Col, Empty, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import { PettyCard } from '../petty-card';
import { SkeletonPettyCard } from '../petty-card/skeleton';

interface ListPettyProps {}

export const ListPetty: React.FC<ListPettyProps> = () => {
  const [page, setPage] = useState<number>(PAGE_SIZE.pageDefault);
  const { data: results, error } = useSWR('get-petty', () =>
    getPetties({ page: 0, limit: PAGE_SIZE.pageLimit })
  );

  const renderPetties = useMemo(() => {
    if (results?.total === 0) {
      return (
        <Col span={24}>
          <Empty />
        </Col>
      );
    }

    return results?.data?.map((petty) => (
      <PettyCard
        nftId={petty.nft_id}
        key={petty.nft_id}
        symbol="ASE"
        {...petty}
      />
    ));
  }, [results]);
  return (
    <>
      <Row gutter={[16, 32]} className="w-full mb-24">
        {/* loading */}
        {!error &&
          !results &&
          Array.from(new Array(6)).map((_, index) => (
            <SkeletonPettyCard active loading key={index} />
          ))}
        {renderPetties}
      </Row>
    </>
  );
};
