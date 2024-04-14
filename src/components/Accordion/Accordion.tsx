'use client';

import React, { useMemo } from 'react';
import './Accordion.scss';
import classNames from 'classnames';
import AccordionItem from './AccordionItem';
import { useUncontrolledProp } from 'uncontrollable';

import type { AccordionProps } from './Accordion.types';

const Accordion = (props: AccordionProps) => {
    const {
        activeNames,
        defaultActiveNames,
        accordion,
        destroyInactivePanel,
        onChange,
        style,
        className,
        items,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(
        activeNames,
        defaultActiveNames,
        onChange
    );

    const handleSelect = (name: string | number): void => {
        if (!controlledValue) {
            onControlledChange([name]);
        } else {
            if (controlledValue.includes(name)) {
                onControlledChange(controlledValue.filter((k) => k !== name));
            } else {
                onControlledChange([...controlledValue, name]);
            }
        }
    };

    const mergedCls = classNames('accordion', className);

    return (
        <div {...otherProps} className={mergedCls} style={style}>
            {items.map((item, index) => (
                <AccordionItem
                    {...item}
                    key={item.name || index}
                    name={item.name || index}
                    isActive={!!controlledValue && controlledValue.includes(item.name || index)}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
};

export default Accordion;
