import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import styles from './Collection.module.css';
interface CollectionProps {
    isVerify?: boolean;
    rankNumber: number;
    image: string;
    name: string;
    value: string;
    symbol?: string;
}

export const Collection: React.FC<CollectionProps> = ({
    rankNumber,
    isVerify,
    image,
    name,
    value,
    symbol,
}) => {
    return (
        <>
            <div
                className={clsx(
                    styles.wrapper,
                    'bg-white border-jacarta-100 overflow-hidden dark:bg-jacarta-700 transition duration-300'
                )}
            >
                <div className="relative min-w-[3rem]">
                    <Image
                        src={image}
                        width={48}
                        height={48}
                        alt={name}
                        placeholder="blur"
                        blurDataURL="/images/avt.jpg"
                        className="rounded-[.625rem] bg-jacarta-700 dark:bg-jacarta-500"
                    />
                    <div
                        className={clsx(
                            styles.tag,
                            styles.rankNumber,
                            'border-white dark:border-jacarta-600'
                        )}
                    >
                        <p className="text-white text-body-xsmall text-xs leading-[20px]">
                            {rankNumber}
                        </p>
                    </div>
                    {isVerify && (
                        <div
                            className={clsx(
                                styles.tag,
                                styles.verify,
                                'border-white dark:border-jacarta-600'
                            )}
                        >
                            <i className="ri-check-fill text-base text-white leading-[20px]" />
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <h6 className="text-heading-small text-jacarta-700 dark:text-white">
                        {name}
                    </h6>
                    <p className="text-body-small text-jacarta-500 dark:text-jacarta-300">
                        {value} {symbol || 'ASE'}
                    </p>
                </div>
            </div>
        </>
    );
};
