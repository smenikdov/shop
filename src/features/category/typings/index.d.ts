export interface CategoryCreatePayload {
    name: string;
    description: string | null;
}

export interface CategoryUpdatePayload {
    categoryId: integer;
    name: string;
    description: string | null;
}

export interface CategoryPropertyCreatePayload {
    categoryId: integer;
    propertyId: integer;
}

export interface CategoryPropertyUpdatePayload {
    categoryId: integer;
    propertyId: integer;
    isUseAsFilter: boolean;
    isRequired: boolean;
}

export interface CategoryPropertyDeletePayload {
    categoryId: integer;
    propertyId: integer;
}

export interface CategoryPropertyGetAllPayload {
    categoryId: integer;
}