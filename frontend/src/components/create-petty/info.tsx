import { checkName, PettyModel } from '@/services';
import { Form, Input, InputNumber, Radio } from 'antd';
import React, { forwardRef, useCallback, useRef } from 'react';
import { ChildMethodRefType } from '.';
import CustomForm from './custom-form';

interface InfoPettyProps {
  active: boolean;
  updateValue: (value: Partial<PettyModel>) => void;
}
const InfoPetty = (
  { active, updateValue }: InfoPettyProps,
  ref: React.ForwardedRef<ChildMethodRefType>
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const validatorName = (_: any, value: string) => {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        checkName(value)
          .then((res) => {
            res.total > 0
              ? reject('This name already exists.')
              : resolve(value);
          })
          .catch(reject);
      }, 500);
    });
  };

  const handeSetValue = useCallback(
    (value: any) => {
      console.log('🚀 -> handeSetValue -> value', value);
      updateValue(value);
    },
    [updateValue]
  );
  return (
    <CustomForm
      active={active}
      setValue={handeSetValue}
      ref={ref}
      name="add-petty-info"
      initialValues={{ gender: 'male' }}
    >
      <Form.Item
        label="Name"
        name="name"
        hasFeedback
        rules={[{ required: true }, { validator: validatorName }]}
      >
        <Input
          autoFocus
          placeholder="Petty's name..."
          className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
        />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="male"> Male </Radio>
          <Radio value="female"> Female </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Stats Attack"
        name="stats_attack"
        validateFirst={true}
        rules={[{ required: true }, { type: 'number', min: 0, max: 10000 }]}
      >
        <InputNumber
          placeholder="Stats Attack..."
          className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
        />
      </Form.Item>
      <Form.Item
        label="Stats Def"
        name="stats_def"
        validateFirst={true}
        rules={[{ required: true }, { type: 'number', min: 0, max: 10000 }]}
      >
        <InputNumber
          placeholder="Stats Def..."
          className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
        />
      </Form.Item>
      <Form.Item
        label="Stats HP"
        name="stats_hp"
        validateFirst={true}
        rules={[{ required: true }, { type: 'number', min: 0, max: 10000 }]}
      >
        <InputNumber
          placeholder="Stats HP...."
          className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
        />
      </Form.Item>
      <Form.Item
        label="Stats Speed"
        name="stats_speed"
        validateFirst={true}
        rules={[{ required: true }, { type: 'number', min: 0, max: 10000 }]}
      >
        <InputNumber
          placeholder="Stats Speed..."
          className="!bg-transparent rounded-md border-gray-500 hover:!border-indigo-500 focus:!border-indigo-500"
        />
      </Form.Item>
    </CustomForm>
  );
};

export default forwardRef(InfoPetty);
