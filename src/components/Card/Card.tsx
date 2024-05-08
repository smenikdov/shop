import React, { useMemo } from 'react';
import './Card.scss';
import classNames from 'classnames';
import type { CardProps } from './Card.types';

const Card = (props: CardProps) => {
    const { className, children, clickable = false, ...otherProps } = props;

    const mergedCls = classNames('card', { 'card-clickable': clickable }, className);

    return (
        <div {...otherProps} className={mergedCls}>
            {children}
        </div>
    );
};

export default Card;
