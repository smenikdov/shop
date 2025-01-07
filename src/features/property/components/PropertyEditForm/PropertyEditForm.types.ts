import type React from 'react';

export type PropertyEditFormProps  = {
    isCreate: true;
    isEdit?: undefined;
    propertyId: undefined;
} | {
    isCreate?: undefined;
    isEdit: true;
    propertyId: integer;
};
