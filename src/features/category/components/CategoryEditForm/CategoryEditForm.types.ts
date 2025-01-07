import type React from 'react';

export type CategoryEditFormProps  = {
    isCreate: true;
    isEdit?: undefined;
    categoryId: undefined;
} | {
    isCreate?: undefined;
    isEdit: true;
    categoryId: integer;
};
