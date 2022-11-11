import { MessageError, MessageSuccess, PrimaryButton } from '@/components';
import { usePettyContract } from '@/hooks';
import { createPetty, PettyModel } from '@/services';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Row, Steps } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import CustomModal from '../custom-modal';
import InfoPetty from './info';
import ParentPetty from './parent';
import Price from './price';
import UploadImages from './upload-images';

enum STEPS_SCREEN {
  INFO,
  PARENT,
  IMAGES,
  PRICE,
}

const STEPS_SCREEN_LENGTH = Object.keys(STEPS_SCREEN).length / 2;
interface CreateOrderProps {}

export type ChildMethodRefType = {
  validate?: () => Promise<boolean>;
  submit?: () => Promise<Record<string, any>>;
  reset?: () => void;
};
export type ChildRefType = {
  [key in STEPS_SCREEN]?: ChildMethodRefType;
};
const CreateOrder: React.FC<CreateOrderProps> = ({}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [current, setCurrent] = useState<STEPS_SCREEN>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const childrenRef = useRef<ChildRefType>();
  const valueRef = useRef<PettyModel>();
  const { active: accountActive } = useWeb3React<Web3Provider>();
  const { mutate } = useSWRConfig();
  const { mintNft } = usePettyContract();

  const validate = useCallback(async () => {
    if (!childrenRef.current) {
      return;
    }
    const validateFunc = childrenRef.current[current]?.validate;

    const isVerify = validateFunc && (await validateFunc());

    if (!isVerify) {
      MessageError('The following fields must be completed!');
    }
    return isVerify;
  }, [current]);

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const prev = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);

  const updateValue = useCallback((value: Partial<PettyModel>) => {
    if (valueRef.current) {
      valueRef.current = { ...valueRef.current, ...value };
    } else {
      valueRef.current = value as PettyModel;
    }
  }, []);

  const uploadImages = useCallback(async () => {
    if (!childrenRef.current) return [];
    const imageRef = childrenRef.current[STEPS_SCREEN.IMAGES];

    return imageRef?.submit && (await imageRef?.submit());
  }, []);

  const handleMintNft = useCallback(async () => {
    return mintNft().then((nftId) => {
      valueRef.current = { ...valueRef.current, nft_id: nftId } as PettyModel;
      return createPetty(valueRef.current);
    });
  }, [mintNft]);

  const handleSubmit = useCallback(async () => {
    if (!valueRef.current?.images || valueRef.current?.images?.length == 0) {
      return uploadImages().then(({ images }: any) => {
        valueRef.current = { ...valueRef.current, images } as PettyModel;
        return handleMintNft();
      });
    }
    return handleMintNft();
  }, [handleMintNft, uploadImages]);

  const resetForm = useCallback(() => {
    for (let child in childrenRef.current) {
      const screen = parseInt(child) as STEPS_SCREEN;
      const currentChild = childrenRef.current[screen];
      if (currentChild && currentChild.reset) {
        currentChild.reset();
      }
    }
    setCurrent(STEPS_SCREEN.INFO);
  }, []);

  const mutateDataPetty = useCallback(
    (res: any) => {
      mutate(
        'get-petty',
        (data: any) => {
          const ob = {
            ...data,
            total: data.total + 1,
            data: Array.from(data.data).concat(res),
          };
          return ob;
        },
        { revalidate: false }
      );
    },
    [mutate]
  );

  const handleOk = useCallback(async () => {
    const isVerify = await validate();
    if (!isVerify) return;

    if (current === STEPS_SCREEN_LENGTH - 1) {
      // submit
      if (loading) {
        return;
      }
      setLoading(true);
      handleSubmit()
        .then((res: any) => {
          MessageSuccess(`Create ${res?.name} successfully!`);
          setIsOpenModal(false);
          mutateDataPetty(res);
          resetForm();
        })
        .catch((err) => {
          console.log('🚀 -> handleOk -> err', { err });
          MessageError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      next();
    }
  }, [
    current,
    handleSubmit,
    loading,
    mutateDataPetty,
    next,
    resetForm,
    validate,
  ]);
  const handleCancel = useCallback(() => {
    if (current === 0) {
      setIsOpenModal(false);
    } else {
      prev();
    }
  }, [current, prev]);
  const showModal = () => {
    setIsOpenModal(true);
  };

  const renderFooter = useMemo(
    () => (
      <Row className="items-center justify-end">
        <PrimaryButton ghost onClick={handleCancel} loading={loading}>
          {current === 0 ? 'Cancel' : 'Back'}
        </PrimaryButton>
        <PrimaryButton onClick={handleOk} loading={loading}>
          {current === STEPS_SCREEN_LENGTH - 1 ? 'Submit' : 'Next'}
        </PrimaryButton>
      </Row>
    ),
    [current, handleCancel, handleOk, loading]
  );

  return (
    <Row className="w-full justify-end h-[45px]">
      {accountActive && (
        <PrimaryButton onClick={showModal}>Add Petty</PrimaryButton>
      )}
      <CustomModal
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        focusTriggerAfterClose={false}
        title="Add Petty"
        width={600}
        footer={renderFooter}
      >
        <Steps
          current={current}
          size="small"
          labelPlacement="vertical"
          className="mb-4"
        >
          <Steps.Step
            disabled={current < STEPS_SCREEN.INFO}
            title="Basic Info"
            onStepClick={() => setCurrent(STEPS_SCREEN.INFO)}
          />
          <Steps.Step
            disabled={current < STEPS_SCREEN.PARENT}
            title="Parent"
            onStepClick={() => setCurrent(STEPS_SCREEN.PARENT)}
          />
          <Steps.Step
            disabled={current < STEPS_SCREEN.IMAGES}
            title="Images"
            onStepClick={() => setCurrent(STEPS_SCREEN.IMAGES)}
          />
          <Steps.Step
            disabled={current < STEPS_SCREEN.PRICE}
            title="Price"
            onStepClick={() => setCurrent(STEPS_SCREEN.PRICE)}
          />
        </Steps>
        <InfoPetty
          ref={(ref) => {
            if (!ref) return;
            childrenRef.current = {
              ...childrenRef.current,
              [STEPS_SCREEN.INFO]: ref,
            };
          }}
          active={current === STEPS_SCREEN.INFO}
          updateValue={updateValue}
        />
        <ParentPetty
          ref={(ref) => {
            if (!ref) return;
            childrenRef.current = {
              ...childrenRef.current,
              [STEPS_SCREEN.PARENT]: ref,
            };
          }}
          updateValue={updateValue}
          active={current === STEPS_SCREEN.PARENT}
        />
        <UploadImages
          ref={(ref) => {
            if (!ref) return;
            childrenRef.current = {
              ...childrenRef.current,
              [STEPS_SCREEN.IMAGES]: ref,
            };
          }}
          active={current === STEPS_SCREEN.IMAGES}
          updateValue={updateValue}
        />

        <Price
          ref={(ref) => {
            if (!ref) return;
            childrenRef.current = {
              ...childrenRef.current,
              [STEPS_SCREEN.PRICE]: ref,
            };
          }}
          active={current === STEPS_SCREEN.PRICE}
          updateValue={updateValue}
        />
      </CustomModal>
    </Row>
  );
};

export default CreateOrder;
