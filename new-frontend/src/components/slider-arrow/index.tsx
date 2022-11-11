import clsx from 'clsx';
import React from 'react';
import { Button } from '../button';

interface SliderArrowProps {
    left?: boolean;
}

export const SliderArrow: React.FC<SliderArrowProps> = ({ left }) => {
    return (
        <>
            <Button
                type="white"
                className={clsx(
                    'w-12 !h-12 !p-0 duration-500',
                    {
                        'hover:translate-x-1': !left,
                    },
                    {
                        'hover:-translate-x-1': left,
                    }
                )}
            >
                <i
                    className={clsx(
                        'text-2xl text-jacarta-700 translate-x-10',
                        {
                            'ri-arrow-left-s-line': left,
                            'ri-arrow-right-s-line': !left,
                        }
                    )}
                ></i>
            </Button>
        </>
    );
};
