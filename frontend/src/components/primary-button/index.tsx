import { Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import clsx from 'clsx';
import React from 'react';

interface PrimaryButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (e: any) => void;
  loading?: boolean;
  ghost?: boolean;
  size?: SizeType;
  className?: string;
  shape?: 'circle' | 'default' | 'round' | undefined;
}

// eslint-disable-next-line react/display-name
export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(
  (
    { children, onClick, loading, ghost, icon, size, className, shape },
    ref
  ) => {
    return (
      <>
        <Button
          ref={ref}
          type="primary"
          shape={shape || 'round'}
          size={size || 'large'}
          className={clsx(
            'text-gray-50 bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-300 flex items-center border-indigo-500 hover:border-indigo-500 shadow-xl tracking-wide font-medium',
            className
          )}
          onClick={onClick}
          loading={loading}
          ghost={ghost}
          icon={icon}
        >
          {children}
        </Button>
      </>
    );
  }
);
