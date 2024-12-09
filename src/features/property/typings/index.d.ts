import { PropertyType } from "@prisma/client";

export interface PropertyOption {
    id: number;
    value: string;
}

export interface PropertyGetAllPayload {
    page: number;
    name: string;
    propertyId: number;
}

export interface PropertyUpdatePayload {
    propertyId: number;
    name: string;
    description: string | null;
    type: PropertyType;
    measure: {
        id: integer;
        name: string;
    } | null;
    meta: AnyObject;
    options: Array<{
        id?:  integer;
        name: string;
    }>;
}

export interface PropertyCreatePayload {
    name: string;
    description: string | null;
    type: PropertyType;
    measure: {
        id: integer;
        name: string;
    } | null;
    meta: AnyObject;
    options: Array<{
        name: string;
    }>;
}
