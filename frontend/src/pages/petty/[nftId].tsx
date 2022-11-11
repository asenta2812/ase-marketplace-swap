import { MainLayout } from '@/layouts';
import { getPetties, getPetty, PettyModel } from '@/services';
import { getFullUrlImage, shortenAddress } from '@/utils';
import {
  HeartOutlined,
  RiseOutlined,
  SafetyOutlined,
  TeamOutlined,
  ThunderboltFilled,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Carousel, Col, Image, Row, Typography } from 'antd';
import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPageWithLayout } from '../_app';

const PettyDetail: NextPageWithLayout = (props) => {
  const { images, name, nft_id, gender, ...attrs } = props as PettyModel;
  console.log('🚀 -> props', props);
  return (
    <div className="mt-4 px-[10%] overflow-auto select-none">
      <Row gutter={[16, 16]}>
        <Col sm={24} xs={24} md={12}>
          <Carousel draggable lazyLoad="progressive">
            {images.map((image, index) => (
              <div key={image} className="rounded-xl">
                <Image
                  src={getFullUrlImage(image)}
                  alt={name + ` image ${index}`}
                  loading="lazy"
                  preview={false}
                  className="w-full block overflow-hidden"
                />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <h2 className="text-3xl font-semibold tracking-wide">
            {name}
            <span className="ml-4 text-indigo-700">#{nft_id}</span>
          </h2>
          <div className="flex items-center my-4">
            <Typography.Title level={3} className="flex items-center !mb-0">
              <UserOutlined style={{ fontSize: 20 }} />
              <span className="ml-2 text-lg font-semibold">Owner :</span>
            </Typography.Title>
            <Typography.Text
              copyable={{ text: '0x1Fc380140a8DA79B645225733A11a662e5d76705' }}
              className="ml-2 text-xl font-bold text-violet-600"
            >
              {shortenAddress('0x1Fc380140a8DA79B645225733A11a662e5d76705')}
            </Typography.Text>
          </div>
          <div className="flex items-center my-4">
            <Typography.Title level={3} className="flex items-center !mb-0">
              <TeamOutlined style={{ fontSize: 20 }} />
              <span className="ml-2 text-lg font-semibold">Gender :</span>
            </Typography.Title>
            <Typography.Text
              className={clsx('ml-2 text-xl font-bold', {
                'text-blue-500': gender === 'male',
                'text-red-500': gender !== 'male',
              })}
            >
              {gender.substring(0, 1).toLocaleUpperCase() + gender.substring(1)}
            </Typography.Text>
          </div>
          <div className="grid grid-cols-2 gap-5 w-[50%]">
            <div className="flex items-center px-4 py-2 border-2 border-violet-400 bg-violet-200/40 rounded-xl flex-1 w-fit shadow-lg">
              <ThunderboltOutlined
                style={{ fontSize: 22, color: 'rgb(139 92 246)' }}
              />
              <Typography.Text className="ml-2 text-xl font-semibold text-violet-500">
                {attrs.stats_attack}
              </Typography.Text>
            </div>
            <div className="flex items-center px-4 py-2 border-2 border-blue-400 bg-blue-200/20 rounded-xl flex-1 w-fit shadow-lg">
              <SafetyOutlined
                style={{ fontSize: 22, color: 'rgb(59 130 246)' }}
              />
              <Typography.Text className="ml-2 text-xl font-semibold text-blue-500">
                {attrs.stats_def}
              </Typography.Text>
            </div>
            <div className="flex items-center px-4 py-2 border-2 border-yellow-400 bg-yellow-200/40 rounded-xl flex-1 w-fit shadow-lg">
              <RiseOutlined style={{ fontSize: 22, color: 'rgb(234 179 8)' }} />
              <Typography.Text className="ml-2 text-xl font-semibold text-yellow-500">
                {attrs.stats_speed}
              </Typography.Text>
            </div>
            <div className="flex items-center px-4 py-2 border-2 border-red-400 bg-red-200/20 rounded-xl flex-1 w-fit shadow-lg">
              <HeartOutlined
                style={{ fontSize: 22, color: 'rgb(239 68 68)' }}
              />
              <Typography.Text className="ml-2 text-xl font-semibold text-red-500">
                {attrs.stats_hp}
              </Typography.Text>
            </div>
          </div>

          <div className="mt-4">
            <div className="">2230 ASE</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

PettyDetail.getLayout = (children: ReactElement): ReactNode => {
  return <MainLayout>{children}</MainLayout>;
};

export const getStaticProps: GetStaticProps<PettyModel> = async (context) => {
  const nftId = context.params?.nftId;

  if (nftId) {
    const result = await getPetty(+nftId);
    return {
      props: {
        ...(result.data[0] as PettyModel),
      },
    };
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const nftIds = await getPetties({ $select: 'nft_id' });
  let paths: { params: { nftId: any } }[] = [];
  if (nftIds.data && nftIds.data.length > 0) {
    paths = nftIds.data.map((item) => ({ params: { nftId: item.nft_id } }));
  }

  return {
    paths,
    fallback: true,
  };
};
export default PettyDetail;
