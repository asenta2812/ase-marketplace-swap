import { Form } from 'antd';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { ChildMethodRefType } from '.';

interface CustomFormProps {
  active: boolean;
  children: React.ReactNode;
  setValue: (value: string) => void;
  initialValues?: Record<string, any>;
  name: string;
}

const CustomForm = (
  { active, children, setValue, initialValues, name }: CustomFormProps,
  ref: React.ForwardedRef<ChildMethodRefType>
) => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is Required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const validate = useCallback(async () => {
    if (form) {
      try {
        const results = await form.validateFields();
        setValue(results);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }, [form, setValue]);

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
  }, [form]);

  useImperativeHandle(
    ref,
    () => ({
      validate,
      reset,
    }),
    [reset, validate]
  );

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        size="large"
        name={name}
        autoComplete="off"
        autoCapitalize="off"
        initialValues={initialValues}
        validateMessages={validateMessages}
        className={active ? 'block' : 'hidden'}
      >
        {children}
      </Form>
    </>
  );
};

export default forwardRef(CustomForm);
