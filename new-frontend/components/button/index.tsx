import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
interface ButtonProps {
    children: React.ReactNode;
    size?: 'lg' | 'md' | 'sm';
    highlight?: boolean;
    type?: 'primary' | 'stroke' | 'flat' | 'white';
    disabled?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    disabled,
    children,
    size = 'md',
    type = 'primary',
    onClick,
    style,
    className,
}) => {
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    };
    return (
        <>
            <button
                type="button"
                disabled={disabled}
                className={clsx(
                    styles.button,
                    `button--${size}`,
                    `button--${type}`,
                    className
                )}
                onClick={handleClick}
                style={style}
            >
                {children}
            </button>
        </>
    );
};
