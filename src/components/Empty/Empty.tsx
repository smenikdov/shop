import React, { useMemo } from 'react';
import './Empty.scss';
import classNames from 'classnames';
import EmptyDefaultImg from './EmptyDefaultImg';
import type { EmptyProps } from './Empty.types';

const Empty = (props: EmptyProps) => {
    const { className, description, children, style, ...restProps } = props;

    const des = typeof description !== 'undefined' ? description : null;

    const mergedCls = classNames('empty', className);

    return (
        <div className={mergedCls} style={style} {...restProps}>
            <div className="empty-image">
                <EmptyDefaultImg />
            </div>
            {des && <div className="empty-description">{des}</div>}
            {children && <div className="empty-footer">{children}</div>}
        </div>
    );
};

export default Empty;
