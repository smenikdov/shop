import type React from 'react';
import type { BaseColors } from '@/typings';

export type DefaultOption = {
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
};

export interface BaseOptionListProps<T> {
    className?: string;
    style?: React.CSSProperties;
    open?: boolean;
    onOpenChange?: (value: boolean) => void;
    options: Array<T>;
    children: React.ReactNode;
    offset?: number;
    color?: BaseColors;
    disabled?: boolean;
    value?: T | null;
    onChange?: (option: T) => void;
    focusedItemIndex?: integer;
    onOutsideClickNeedHide?: boolean;
    onGetLabel?: (option: T) => React.ReactNode;
    onGetValue?: (option: T) => number | string;
    noDataText?: string;
}

export type OptionListProps<T> = BaseOptionListProps<T> &
    Omit<React.HTMLAttributes<HTMLUListElement>, keyof BaseOptionListProps<T>>;