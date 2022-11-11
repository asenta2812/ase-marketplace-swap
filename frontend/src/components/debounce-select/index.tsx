import { useDebounce } from '@/hooks';
import { BaseResponse } from '@/utils';
import { Empty, Select, SelectProps, Spin } from 'antd';
import { memo, useState } from 'react';
import useSWR from 'swr';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<BaseResponse>;
  debounceTimeout?: number;
  keySWR: string;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  keySWR,
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [debounceSearchValue, setDebounceSearchValue] = useState<string>('');
  const searchValue = useDebounce(debounceSearchValue, debounceTimeout);
  const { data, error } = useSWR(
    [keySWR, searchValue],
    (_, value) => fetchOptions(value),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const fetching = !data && !error;

  return (
    <Select
      {...props}
      autoClearSearchValue={false}
      filterOption={false}
      showSearch
      onSearch={(value) => setDebounceSearchValue(value)}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      options={
        data?.data?.map(({ nft_id, name }) => ({
          key: nft_id,
          value: nft_id,
          label: name,
        })) || []
      }
      className="debounce-select"
    />
  );
}

export default memo(DebounceSelect);
