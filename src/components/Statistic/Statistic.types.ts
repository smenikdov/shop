import type React from 'react';

export type ValueType = number | string;

export interface StatisticProps {
    className?: string;
    style?: React.CSSProperties;
    value?: ValueType;
    title?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    loading?: boolean;
}
