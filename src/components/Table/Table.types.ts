import type React from 'react';
import type { AnyObject } from '@/typings';

export interface TableColumn<DataType extends AnyObject = AnyObject> {
    title: React.ReactNode;
    name: string;
    render?: (value: any, data: DataType) => React.ReactNode;
}

export interface TableProps<DataType extends AnyObject = AnyObject>
    extends React.HTMLAttributes<HTMLTableElement> {
    style?: React.CSSProperties;
    className?: string;
    caption?: React.ReactNode;
    columns: Array<TableColumn<DataType>>;
    data: Array<DataType>;
}

export interface TableHeadProps<DataType extends AnyObject = AnyObject> {
    columns: Array<TableColumn<DataType>>;
}

export interface TableBodyProps<DataType extends AnyObject = AnyObject> {
    columns: Array<TableColumn<DataType>>;
    data: Array<DataType>;
}
