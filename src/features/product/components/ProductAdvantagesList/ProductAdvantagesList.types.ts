import type React from 'react';

interface AdvantageType {
    name: string;
    description: string;
}

export interface ProductAdvantagesListProps {
    advantages: Array<AdvantageType>;
}
