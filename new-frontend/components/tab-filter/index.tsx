import clsx from 'clsx';
import React from 'react';

interface TabFilterProps {
    icon?: React.ReactNode;
    title: string;
    className?: string;
}

export const TabFilter: React.FC<TabFilterProps> = ({
    icon,
    title,
    className,
}) => {
    return (
        <>
            <div
                className={clsx(
                    `h-[2.125rem] px-4 w-fit rounded-lg
                     text-jacarta-700 dark:text-white
                     flex items-center flex-nowrap cursor-pointer select-none
                     transition duration-300
                     hover:bg-accent-default dark:hover:bg-accent-default`,
                    {
                        [`bg-white border border-jacarta-100 hover:border-accent-default
                         dark:bg-jacarta-800 dark:border-jacarta-600 dark:hover:border-accent-default`]:
                            !!icon,
                        'bg-jacarta-100 dark:bg-jacarta-700': !icon,
                    },
                    className
                )}
            >
                {icon && <div className="mr-1 text-base">{icon}</div>}
                <h6 className="text-heading-tiny text-inherit">{title}</h6>
            </div>
        </>
    );
};
