import type React from 'react';

interface AdvantageType {
    header: string;
    content: string;
}

export interface ProductAdvantagesListProps {
    advantages: Array<AdvantageType>;
}
