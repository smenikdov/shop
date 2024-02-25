import type React from 'react';
import { BaseColors } from '@/typings';
import { IconType } from 'react-icons';

export interface ResultProps {
    icon?: IconType;
    color?: BaseColors;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
