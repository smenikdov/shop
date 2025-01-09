import type React from 'react';

export interface CategoryPropertyCreateModalProps {
    isOpen: boolean;
    onClose: Function;
    onAdd: (propertyId: integer) => void;
    categoryId: integer;
}