'use client';

import React, { useState } from 'react';
import './Select.scss';
import classNames from 'classnames';
import { SelectProps } from './Select.types';
import { useUncontrolledProp } from 'uncontrollable';
import OptionList from '@/components/floating/OptionList';
import Icon from '@/components/Icon';
import FormContext from '@/components/form/Form/Form.context';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useOptionsList from '@/components/floating/OptionList/OptionsList.hooks';
import useBoolean from '@/hooks/useBoolean';

import type { AnyObject } from '@/typings';

const Select = <T extends AnyObject>(props: SelectProps<T>) => {
    const {
        options,
        name,
        className,
        style,
        value,
        onChange,
        onFocus,
        onBlur,
        error,
        disabled,
        readOnly,
        size = 'outlined',
        variant = 'md',
        onClick,
        onKeyDown,
        onGetLabel = (option: T) => option.label,
        onGetValue = (option: T) => option.value,
        ...otherProps
    } = props;

    const formContext = React.useContext(FormContext);
    const [controlledValue, onControlledChange] = useUncontrolledProp(value, null, onChange);
    const setValueAndHide = (option: T) => {
        onControlledChange(onGetValue(option));
        isOpenPopup.setFalse();
    };
    const optionsListId = React.useId();
    const isOpenPopup = useBoolean(false);
    const { focusedItemIndex, increaseFocusItemIndex, decreaseFocusedItemIndex } =
        useOptionsList(options);

    const isFocused = useBoolean(false);
    const mergedDisabled = formContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || readOnly;

    const mergedCls = classNames(
        'select',
        {
            'select-disabled': mergedDisabled,
            'select-readonly': mergedReadOnly,
            'select-focus': isFocused.value,
            'select-invalid': error,
            'select-expanded': isOpenPopup,
        },
        `select-${size}`,
        `select-${variant}`
    );

    const handleFocus = (event: React.FocusEvent) => {
        onFocus?.(event);
        isFocused.setTrue();
    };

    const handleBlur = (event: React.FocusEvent) => {
        onBlur?.(event);
        isFocused.setFalse();
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
        isOpenPopup.toggle();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        onKeyDown?.(event);

        const isEnter = event.keyCode === 13;
        const isEsc = event.keyCode === 27;
        const isArrowUp = event.keyCode === 38;
        const isArrowDown = event.keyCode === 40;

        if (isArrowDown) {
            decreaseFocusedItemIndex();
        }

        if (isArrowUp) {
            increaseFocusItemIndex();
        }

        if (isEnter) {
            if (options[focusedItemIndex] && isOpenPopup) {
                setValueAndHide(options[focusedItemIndex]);
            } else {
                isOpenPopup.toggle();
            }
        }

        if (isEsc) {
            isOpenPopup.setFalse();
        }
    };

    const selectedOption =
        options.find((option: T) => onGetValue(option) === controlledValue) || null;

    return (
        <div className={classNames('select-container', className)}>
            <OptionList
                id={optionsListId}
                value={selectedOption}
                options={options}
                onChange={setValueAndHide}
                open={isOpenPopup.value}
                focusedItemIndex={focusedItemIndex}
                onOutsideClickNeedHide
                onOpenChange={isOpenPopup.set}
                onGetLabel={onGetLabel}
                onGetValue={onGetValue}
            >
                <div className={mergedCls} style={style}>
                    <div
                        className="select-field"
                        tabIndex={0}
                        role="combobox"
                        aria-expanded={isOpenPopup.value}
                        aria-controls={optionsListId}
                        aria-haspopup="listbox"
                        aria-disabled={disabled}
                        aria-readonly={readOnly}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onClick={handleClick}
                        onKeyDown={handleKeyDown}
                        {...otherProps}
                    >
                        <div className="select-content">{onGetLabel(selectedOption)}</div>
                    </div>
                    <Icon className="select-icon" icon={<MdOutlineKeyboardArrowDown />} />
                </div>
            </OptionList>

            {error && <div className="select-error">{error}</div>}
        </div>
    );
};

export default Select;