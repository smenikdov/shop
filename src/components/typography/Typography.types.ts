import type React from 'react';
import { BaseColors, FontFamily } from '@/typings';

export type TextAlign = 'center' | 'left' | 'right' | 'justify';
export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
    extends React.HTMLAttributes<HTMLOrSVGElement> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    type?: BaseColors;
    //
    align?: TextAlign;
    family?: FontFamily;
    // decorations
    code?: boolean;
    mark?: boolean;
    underline?: boolean;
    delete?: boolean;
    bold?: boolean;
    keyboard?: boolean;
    italic?: boolean;
    component?: C;
}

export interface TextProps
    extends TypographyProps<'span'>,
        Omit<React.HTMLAttributes<HTMLSpanElement>, keyof TypographyProps<'span'>> {}

export interface LinkProps
    extends TypographyProps<'a'>,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TypographyProps<'a'>> {}

export interface ParagraphProps
    extends TypographyProps<'p'>,
        Omit<React.HTMLAttributes<HTMLParagraphElement>, keyof TypographyProps<'p'>> {}

export const TITLE_ELE_LIST = [1, 2, 3, 4, 5] as const;

export interface TitleProps
    extends TypographyProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>,
        Omit<
            React.HTMLAttributes<HTMLHeadElement>,
            keyof TypographyProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
        > {
    level?: (typeof TITLE_ELE_LIST)[number];
}
