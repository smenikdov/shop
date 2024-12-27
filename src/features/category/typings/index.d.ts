export interface CategoryCreatePayload {
    name: string;
    description: string | null;
    categoryProperties: Array<{
        isRequired: boolean;
        isUseAsFilter: boolean;
        propertyId: integer;
    }>
}
