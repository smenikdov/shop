import React from 'react';
import './Table.scss';
import classNames from 'classnames';

import type { TableProps, TableColumn, TableHeadProps, TableBodyProps } from './Table.types';

const TableHead = (props: TableHeadProps) => {
    const { columns } = props;

    return (
        <thead className="table-head">
            <tr className="table-row">
                {columns.map((column, columnIndex) => (
                    <th key={columnIndex} className="table-cell">
                        {column.title}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

const TableBody = (props: TableBodyProps) => {
    const { columns, data } = props;

    return (
        <tbody className="table-body">
            {data.map((data, dataIndex) => (
                <tr key={dataIndex} className="table-row">
                    {columns.map((column, columnIndex) => (
                        <td key={columnIndex} className="table-cell">
                            {column.render(data) || '—'}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

const Table = (props: TableProps) => {
    const { className, style, columns, data, caption, ...othersProps } = props;

    const mergedCls = classNames(className, 'table');

    return (
        <table className={mergedCls} style={style} {...othersProps}>
            {caption && <caption>{caption}</caption>}
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
};

export default Table;
