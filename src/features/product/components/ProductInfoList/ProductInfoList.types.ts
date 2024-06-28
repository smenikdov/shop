import type React from 'react';

interface InfoType {
    header: string;
    content: string;
}

export interface ProductInfoListProps {
    info: Array<InfoType>;
}
