import type React from 'react';

export interface TextBlockProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    before?: React.ReactNode;
    after?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
