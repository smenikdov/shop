'use client';
import './OptionList.scss';
import classNames from 'classnames';

import React, { useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';
import useFloating from '@/hooks/useFloating';
import useOutsideClickHandler from '@/hooks/useOutsideClickHandler';

import type { AnyObject } from '@/typings';
import type { OptionListProps } from './OptionList.types';

const OptionList = <T extends AnyObject>(props: OptionListProps<T>) => {
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
        onGetLabel = (option: T) => option.label,
        onGetValue = (option: T) => option.value,
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
                                'option-list-item-selected':
                                    !!controlledValue &&
                                    onGetValue(controlledValue) === onGetValue(option),
                                'option-list-item-disabled': option.disabled,
                                'option-list-item-focused': focusedItemIndex === optionIndex,
                            })}
                            role="option"
                            aria-selected={
                                !!controlledValue &&
                                onGetValue(controlledValue) === onGetValue(option)
                            }
                            data-value={option.value}
                            onClick={() => onControlledChange(option)}
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
