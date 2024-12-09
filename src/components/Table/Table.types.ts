import type React from 'react';
import type { AnyObject, UnwrapArray, UnwrapPromise } from '@/typings';

export interface TableColumn<DataType extends AnyObject> {
    title: React.ReactNode;
    render: (data: DataType, index: integer) => React.ReactNode;
}

export type TableColumns<DataType extends AnyObject> = Array<TableColumn<DataType>>;

export type TableColumnsFor<T extends (...args: any) => any> = TableColumns<
    UnwrapArray<UnwrapPromise<ReturnType<T>>>
>;

export interface TableProps<DataType extends AnyObject>
    extends React.HTMLAttributes<HTMLTableElement> {
    style?: React.CSSProperties;
    className?: string;
    caption?: React.ReactNode;
    columns: TableColumns<DataType>;
    data: Array<DataType>;
}

export interface TableHeadProps<DataType extends AnyObject> {
    columns: TableColumns<DataType>;
}

export interface TableBodyProps<DataType extends AnyObject> {
    columns: TableColumns<DataType>;
    data: Array<DataType>;
}
