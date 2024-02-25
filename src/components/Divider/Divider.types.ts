import type React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    vertical?: boolean;
    dashed?: boolean;
}
