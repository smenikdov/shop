'use client';
import React, { useMemo, useState } from 'react';
import './OptionList.scss';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import type { OptionListProps } from './OptionList.types';
import useFloating from '@/hooks/useFloating';
import useOutsideClickHandler from '@/hooks/useOutsideClickHandler';

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
        options,
        onOpenChange,
        focusedItemIndex,
        onOutsideClickNeedHide = false,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, null, onChange);
    const [controlledOpenValue, onControlledOpenChange] = useUncontrolledProp(
        open,
        false,
        onOpenChange
    );

    const containerReference = React.useRef(null);
    const floatingReference = React.useRef(null);
    useOutsideClickHandler([containerReference, floatingReference], () => {
        if (onOutsideClickNeedHide) {
            onControlledOpenChange(false);
        }
    });
    const { floatingStyles } = useFloating({
        containerReference,
        floatingReference,
        isVisible: controlledOpenValue,
        offset,
        flip: true,
        shift: true,
        side: 'bottom',
        alignment: 'start',
    });

    const mergedCls = classNames('option-list', `option-list-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        return { ...floatingStyles, ...style };
    }, [floatingStyles, style]);

    return (
        <>
            <div
                className="option-list-container"
                ref={containerReference}
                aria-disabled={disabled}
            >
                {children}
            </div>

            {controlledOpenValue && (
                <ul
                    ref={floatingReference}
                    className={mergedCls}
                    style={mergedStyle}
                    role="listbox"
                    tabIndex={-1}
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
