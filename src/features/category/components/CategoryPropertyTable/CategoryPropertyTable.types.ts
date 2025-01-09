import type React from 'react';

export interface CategoryPropertyTableProps {
    categoryId: integer;
}

export interface CategoryProperty {
    categoryId: integer;
    propertyId: integer;
    isUseAsFilter: boolean;
    isRequired: boolean;
    property: {
        name: string;
    };
}

