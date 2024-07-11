'use client';
import React, { useMemo, useState } from 'react';
import './OptionList.scss';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import type { OptionListProps } from './OptionList.types';
import {
    useFloating,
    autoUpdate,
    offset as floatingOffset,
    flip as floatingFlip,
    shift as floatingShift,
    useHover,
    useFocus,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
} from '@floating-ui/react';

const OptionList = (props: OptionListProps) => {
    const {
        className,
        color = 'primary',
        style,
        disabled,
        children,
        value,
        onChange,
        open,
        offset = 10,
        placement = 'bottom-start',
        options,
        onOpenChange,
        focusedItemIndex,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, null, onChange);
    const [controlledOpenValue, onControlledOpenChange] = useUncontrolledProp(
        open,
        false,
        onOpenChange
    );

    const { refs, floatingStyles, context } = useFloating({
        open: controlledOpenValue,
        onOpenChange: onControlledOpenChange,
        middleware: [floatingOffset(offset), floatingFlip(), floatingShift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
    });

    const mergedCls = classNames('option-list', `option-list-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        return { ...floatingStyles, ...style };
    }, [floatingStyles, style]);

    const dismiss = useDismiss(context);
    const interactions = [dismiss];

    const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

    return (
        <>
            <div
                className="option-list-container"
                ref={refs.setReference}
                {...getReferenceProps()}
                aria-disabled={disabled}
            >
                {children}
            </div>

            {controlledOpenValue && (
                <ul
                    ref={refs.setFloating}
                    className={mergedCls}
                    style={mergedStyle}
                    role="listbox"
                    tabIndex={-1}
                    {...getFloatingProps()}
                    {...otherProps}
                >
                    {options.map((option, optionIndex) => (
                        <li
                            key={optionIndex}
                            className={classNames('option-list-item', {
                                'option-list-item-selected': controlledValue === option.value,
                                'option-list-item-disabled': option.disabled,
                                'option-list-item-focused': focusedItemIndex === optionIndex,
                            })}
                            role="option"
                            aria-selected={controlledValue === option.value}
                            data-value={option.value}
                            onClick={() => onControlledChange(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default OptionList;
