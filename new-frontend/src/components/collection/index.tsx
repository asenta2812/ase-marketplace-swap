import React from 'react';

interface CollectionProps {
    color: 'default' | 'dark';
    isVerify?: boolean;
    rankNumber: number;
    image: string;
    name: string;
    value: string;
    symbol?: string;
}

export const Collection: React.FC<CollectionProps> = ({
    color = 'default',
    rankNumber,
    isVerify,
    image,
    name,
    value,
    symbol,
}) => {
    return <></>;
};
