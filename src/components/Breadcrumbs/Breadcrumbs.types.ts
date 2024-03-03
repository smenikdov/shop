import type React from 'react';

export interface BreadcrumbsItemProps {
    style?: React.CSSProperties;
    className?: string;
    label: React.ReactNode;
    href: string;
    separator?: React.ReactNode;
}

export interface BreadcrumbsProps {
    separator?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    items?: BreadcrumbsItemProps[];
}
