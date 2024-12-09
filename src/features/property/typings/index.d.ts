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

export interface PropertyUpdatePayload {}

export interface PropertyCreatePayload {
    name: string;
    description: string;
    type: PropertyType;
    measure: 

}
