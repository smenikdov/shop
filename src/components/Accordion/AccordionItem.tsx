'use client';

import React, { useMemo } from 'react';
import './Accordion.scss';
import classNames from 'classnames';

import type { AccordionItemProps } from './Accordion.types';

const AccordionItem = (props: AccordionItemProps) => {
    const { header, className, style, isActive, onSelect, name, content, disabled, ...otherProps } =
        props;

    const mergedCls = classNames(
        'accordion-item',
        { 'accordion-item-active': isActive },
        className
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onSelect?.(name);
    };

    return (
        <div {...otherProps} className={mergedCls} style={style}>
            <div
                className="accordion-header"
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-expanded={isActive}
                aria-disabled={disabled}
                onClick={handleClick}
            >
                <div className="accordion-header-text">{header}</div>
            </div>
            <div className="accordion-body">
                <div className="accordion-content">{content}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
