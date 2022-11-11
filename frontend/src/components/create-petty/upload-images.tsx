import { PettyModel, uploadImage } from '@/services';
import { MAXIMUM_NUMBER_IMAGES } from '@/utils/constants';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { ChildMethodRefType } from '.';
import CustomModal from '../custom-modal';
import { MessageError } from '../messages';

interface UploadImagesProps {
  active: boolean;
  updateValue: (value: Partial<PettyModel>) => void;
}

const UploadImages = (
  { active, updateValue }: UploadImagesProps,
  ref: React.ForwardedRef<ChildMethodRefType>
) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      MessageError('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      MessageError('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleCancel = () => setPreviewOpen(false);

  const getUrlPreviewFile = (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj as RcFile);
    }
    return file.url || (file.preview as string);
  };

  const handlePreview = async (file: UploadFile) => {
    const urlPreview = getUrlPreviewFile(file);
    setPreviewImage(urlPreview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    newFileList.forEach((item) => {
      item.status = 'done';
    });
    setFileList(newFileList);
  };

  const validate = useCallback(async () => {
    if (fileList.length > 0) {
      return true;
    }
    return false;
  }, [fileList]);

  const submit = useCallback(async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      fileList.forEach((file) =>
        formData.append('images', file.originFileObj as Blob)
      );
      return new Promise<any>((resolve, reject) => {
        uploadImage(formData)
          .then(resolve)
          .catch((err) => {
            MessageError(err.message);
            reject(err);
          });
      });
    }

    return {
      images: [],
    };
  }, [fileList]);

  const reset = useCallback(async () => {
    setFileList([]);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      validate,
      submit,
      reset,
    }),
    [validate, submit, reset]
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className={active ? 'show' : 'hidden'}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        customRequest={() => null}
        beforeUpload={beforeUpload}
        accept=".png,.jpg,.gif,.jpeg"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={MAXIMUM_NUMBER_IMAGES}
      >
        {fileList.length >= MAXIMUM_NUMBER_IMAGES ? null : uploadButton}
      </Upload>
      <CustomModal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt={previewTitle} src={previewImage} />
      </CustomModal>
    </div>
  );
};

export default forwardRef(UploadImages);
