import type React from 'react';
import { BaseColors } from '@/typings';

export interface AccordionItem {
    header?: string | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    name: string | number;
    disabled?: boolean;
    content?: string | React.ReactNode;
}

export interface AccordionItemProps extends AccordionItem {
    isActive: boolean;
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
