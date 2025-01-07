export interface CategoryCreatePayload {
    name: string;
    description: string | null;
}

export interface CategoryUpdatePayload {
    categoryId: integer;
    name: string;
    description: string | null;
}
