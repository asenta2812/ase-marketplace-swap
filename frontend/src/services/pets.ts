import { Page, QueryKey } from '@/types';
import { requestAsync } from '@/utils';
import { PAGE_SIZE } from '@/utils/constants';

export interface PettyModel {
  name: string;
  gender: string;
  stats_attack: number;
  stats_def: number;
  stats_hp: number;
  stats_speed: number;
  father_id?: string;
  mother_id?: string;
  images: string[];
  listing_price: number;
  nft_id?: number;
}
export type QueryPettyParams = {
  [T in keyof (Partial<PettyModel> & Partial<QueryKey>)]: any;
} & Partial<Page>;
export const checkName = (name: string) => {
  return requestAsync({
    method: 'GET',
    url: '/pets',
    params: {
      name,
      $limit: 1,
    },
  });
};

export const createPetty = (props: PettyModel) => {
  return requestAsync({
    method: 'POST',
    url: '/pets',
    data: props,
  });
};

export const getPetties = ({
  page = PAGE_SIZE.pageDefault,
  limit = PAGE_SIZE.pageLimit,
  ...props
}: QueryPettyParams) => {
  return requestAsync({
    method: 'GET',
    url: '/pets',
    params: { $skip: page * limit, $limit: limit, ...props },
  });
};

export const getPetty = (nftId: number) => {
  return requestAsync({
    method: 'GET',
    url: '/pets',
    params: { nft_id: nftId },
  });
};
