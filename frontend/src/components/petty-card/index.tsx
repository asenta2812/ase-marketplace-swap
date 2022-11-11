import { PettyModel } from '@/services';
import { getFullUrlImage } from '@/utils';
import { STATUS } from '@/utils/constants';
import { Card, Carousel, Col, Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { PrimaryButton } from '../primary-button';

interface PettyCardProps extends Partial<PettyModel> {
  nftId: number;
  status: STATUS;
  symbol: string;
  onCancel: (nftId: number) => void;
  onSell: (nftId: number) => void;
  onBuy: (nftId: number) => void;
}

export const PettyCard: React.FC<PettyCardProps> = ({
  images,
  name,
  nftId,
  status,
  onCancel,
  onSell,
  onBuy,
  listing_price,
  symbol,
}) => {
  const rederImages = useMemo(
    () =>
      images &&
      images.length > 0 && (
        <div className="relative select-none">
          <Carousel draggable lazyLoad="progressive" dots={false}>
            {images.map((image, index) => (
              <div key={image} className="rounded-xl">
                <Image
                  src={getFullUrlImage(image)}
                  alt={name + ` image ${index}`}
                  layout="responsive"
                  loading="lazy"
                  width={300}
                  height={225}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute bottom-0 w-full text-center">
            <h4 className="text-lg font-bold text-indigo-800">
              {listing_price} {symbol}
            </h4>
          </div>
        </div>
      ),
    [images, listing_price, name, symbol]
  );

  const handleCancel = useCallback(
    (e: any) => {
      e.preventDefault();
      if (typeof onCancel === 'function') {
        onCancel(nftId);
      }
    },
    [nftId, onCancel]
  );

  const handleSell = useCallback(
    (e: any) => {
      e.preventDefault();
      if (typeof onSell === 'function') {
        onSell(nftId);
      }
    },
    [nftId, onSell]
  );

  const handleBuy = useCallback(
    (e: any) => {
      e.preventDefault();

      if (typeof onBuy === 'function') {
        onBuy(nftId);
      }
    },
    [nftId, onBuy]
  );

  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <Link
        href={{
          pathname: '/petty/[nftId]',
          query: { nftId },
        }}
      >
        <Card
          hoverable
          className="w-full bg-gradient-to-br from-sky-100 to-indigo-300 rounded-xl border-none shadow-xl overflow-hidden"
          cover={rederImages}
        >
          <Card.Meta
            className="custom-card--meta"
            title={`${name} #${nftId}`}
          />
          <div className="flex mt-5 gap-2">
            {+status === STATUS.SELLED && (
              <PrimaryButton
                className="flex-1 justify-center"
                ghost
                onClick={handleCancel}
              >
                Cancel
              </PrimaryButton>
            )}
            {+status === STATUS.CREATED && (
              <PrimaryButton
                className="flex-1 justify-center"
                onClick={handleSell}
              >
                Sell
              </PrimaryButton>
            )}
            {+status === STATUS.SELLED && (
              <PrimaryButton
                className="flex-1 justify-center"
                onClick={handleBuy}
              >
                Buy
              </PrimaryButton>
            )}
          </div>
        </Card>
      </Link>
    </Col>
  );
};
