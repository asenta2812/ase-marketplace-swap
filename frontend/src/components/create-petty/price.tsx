import { PettyModel } from '@/services';
import { Form, InputNumber } from 'antd';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { ChildMethodRefType } from '.';
import CustomForm from './custom-form';

interface PricePettyProps {
  active: boolean;
  updateValue: (value: Partial<PettyModel>) => void;
}

const PricePetty = (
  { active, updateValue }: PricePettyProps,
  ref: React.ForwardedRef<ChildMethodRefType>
) => {
  const handleSetValue = useCallback(
    (value: any) => {
      updateValue(value);
    },
    [updateValue]
  );

  return (
    <>
      <CustomForm
        name="add-petty-price"
        initialValues={{ listing_price: 0 }}
        active={active}
        ref={ref}
        setValue={handleSetValue}
      >
        <Form.Item
          label="Price"
          name="listing_price"
          validateFirst={true}
          rules={[{ required: true }, { type: 'number', min: 0, max: 1000000 }]}
          className="w-1/2"
        >
          <InputNumber
            placeholder="Price..."
            className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
            addonAfter="ASE"
          />
        </Form.Item>
      </CustomForm>
    </>
  );
};

export default forwardRef(PricePetty);
