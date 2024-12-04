import type React from 'react';
import { BaseColors } from '@/typings';

export type Options = Array<{
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
}>;

export interface BaseOptionListProps {
    className?: string;
    style?: React.CSSProperties;
    open?: boolean;
    onOpenChange?: (value: boolean) => void;
    options: Options;
    children: React.ReactNode;
    offset?: number;
    color?: BaseColors;
    disabled?: boolean;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    focusedItemIndex?: integer;
    onOutsideClickNeedHide?: boolean;
}

export type OptionListProps = BaseOptionListProps &
    Omit<React.HTMLAttributes<HTMLUListElement>, keyof BaseOptionListProps>;
