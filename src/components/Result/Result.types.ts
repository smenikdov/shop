import type React from 'react';
import type { Response } from '@/utils/actions/responses';

export interface ResultProps {
    response: Response;
    className?: string;
    style?: React.CSSProperties;
}
