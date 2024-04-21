import type React from 'react';

export interface AdvantagesType {
    content?: React.ReactNode;
    image?: string;
}

export interface AdvantagesBlockProps {
    title?: React.ReactNode;
    before?: React.ReactNode;
    after?: React.ReactNode;
    content?: React.ReactNode;
    advantages?: Array<AdvantagesType>;
    style?: React.CSSProperties;
    className?: string;
}
