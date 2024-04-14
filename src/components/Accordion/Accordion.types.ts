import type React from 'react';
import { BaseColors } from '@/typings';

export interface AccordionItem {
    header?: string | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    content?: string | React.ReactNode;
    name?: string | number;
}

export interface AccordionItemProps extends AccordionItem {
    isActive: boolean;
    name: string | number;
    onSelect: (itemName: string | number) => void;
}

export interface AccordionProps {
    activeNames?: Array<string | number>;
    defaultActiveNames?: Array<string | number>;
    accordion?: boolean;
    destroyInactivePanel?: boolean;
    onChange?: (activeNames: Array<string | number>) => void;
    style?: React.CSSProperties;
    className?: string;
    items: Array<AccordionItem>;
}
