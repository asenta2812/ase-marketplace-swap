import { Button, Dropdown } from 'antd';
import clsx from 'clsx';
import React from 'react';

interface CustomDropdownProps {
  menu: React.ReactElement;
  children: React.ReactNode;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  menu,
  children,
  className,
}) => {
  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        overlayClassName="bg-gray-800 rounded-lg"
        trigger={['hover']}
      >
        <Button
          type="primary"
          shape="round"
          size="large"
          className={clsx(
            'text-gray-50 bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-300 flex items-center',
            className
          )}
          ghost
        >
          {children}
        </Button>
      </Dropdown>
    </>
  );
};

export default CustomDropdown;
