import { Modal, ModalProps } from 'antd';
import React from 'react';

type CustomModalProps = {} & ModalProps;

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  footer,
  ...props
}) => {
  return (
    <Modal {...props} footer={footer} className="asen-modal">
      {children}
    </Modal>
  );
};

export default CustomModal;
