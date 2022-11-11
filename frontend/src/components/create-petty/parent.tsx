import { PettyModel } from '@/services';
import { requestAsync } from '@/utils';
import { Form } from 'antd';
import React, { forwardRef, useCallback } from 'react';
import { ChildMethodRefType } from '.';
import DebounceSelect from '../debounce-select';
import CustomForm from './custom-form';

interface ParentPettyProps {
  active: boolean;
  updateValue: (value: Partial<PettyModel>) => void;
}

const ParentPetty = (
  { active, updateValue }: ParentPettyProps,
  ref: React.ForwardedRef<ChildMethodRefType>
) => {
  const fetchPet = useCallback(
    (search: string, gender: string) =>
      requestAsync({
        method: 'GET',
        url: '/pets',
        params: {
          gender,
          'name[$search]': search,
          $select: ['name', 'nft_id'],
        },
      }),
    []
  );

  const handleSetValue = useCallback(
    (value: any) => {
      updateValue(value);
    },
    [updateValue]
  );

  return (
    <CustomForm
      active={active}
      ref={ref}
      setValue={handleSetValue}
      name="add-petty-parents"
    >
      <Form.Item label="Father" name="father_id">
        <DebounceSelect
          keySWR="fetch-pets-father"
          fetchOptions={(vl) => fetchPet(vl, 'male')}
          placeholder="Select Petty's Father..."
          size="large"
          allowClear
        />
      </Form.Item>
      <Form.Item label="Mother" name="mother_id">
        <DebounceSelect
          keySWR="fetch-pets-mother"
          fetchOptions={(vl) => fetchPet(vl, 'female')}
          placeholder="Select Petty's Mother..."
          size="large"
          allowClear
        />
      </Form.Item>
    </CustomForm>
  );
};

export default forwardRef(ParentPetty);
