'use client';

import React, { useState } from 'react';
import './Select.scss';
import Input from '../Input';
import classNames from 'classnames';
import { SelectProps } from './Select.types';
import { useUncontrolledProp } from 'uncontrollable';
import {
    useFloating,
    autoUpdate,
    offset as floatingOffset,
    flip as floatingFlip,
    shift as floatingShift,
    useRole,
    useInteractions,
} from '@floating-ui/react';

const Select = (props: SelectProps) => {
    const { options, className, style, value, onChange, onFocus, onBlur, ...otherProps } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, '', onChange);

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        middleware: [floatingOffset(0), floatingFlip(), floatingShift()],
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start',
    });

    const role = useRole(context, { role: 'listbox' });

    const interactions = [role];

    const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

    const mergedCls = classNames('select', className);

    const handleFocus = (event: React.FocusEvent) => {
        onFocus?.(event);
        setIsOpenPopup(true);
    };

    const handleBlur = (event: React.FocusEvent) => {
        onBlur?.(event);
        setIsOpenPopup(false);
    };

    return (
        <div className="select-container" ref={refs.setReference}>
            <Input
                {...getReferenceProps()}
                {...otherProps}
                value={controlledValue}
                className={mergedCls}
                style={style}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onControlledChange}
            />

            {isOpenPopup && (
                <div
                    className="select-popup"
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    {options.map((option, optionIndex) => (
                        <div
                            key={optionIndex}
                            className="select-option"
                            onClick={() => onControlledChange(option.label)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
