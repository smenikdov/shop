'use client';

import React, { useState, useEffect } from 'react';
import './Autocomplete.scss';
import Input from '../Input';
import classNames from 'classnames';
import { AutocompleteProps } from './Autocomplete.types';
import { useUncontrolledProp } from 'uncontrollable';
import OptionList from '@/components/floating/OptionList';
import Icon from '@/components/Icon';
import FormContext from '@/components/form/Form/Form.context';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useOptionsList from '@/components/floating/OptionList/OptionsList.hooks';
import useBoolean from '@/hooks/useBoolean';

import type { AnyObject } from '@/typings';

const Autocomplete = <T extends AnyObject>(props: AutocompleteProps<T>) => {
    const {
        inputValue,
        options,
        className,
        style,
        value,
        onChange,
        disabled,
        readOnly,
        onClick,
        onKeyDown,
        onGetLabel = (option: T) => option.label,
        onGetValue = (option: T) => option.value,
        onInputChange,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, null, onChange);
    const [inputControlledValue, onInputControlledChange] = useUncontrolledProp(
        inputValue,
        controlledValue ? onGetLabel(controlledValue) : '',
        onInputChange
    );

    // Сомнительно
    useEffect(() => {
        onInputControlledChange(controlledValue ? onGetLabel(controlledValue) : '');
    }, [ controlledValue ]);

    const formContext = React.useContext(FormContext);
    const optionsListId = React.useId();
    const isOpenPopup = useBoolean(false);
    const { focusedItemIndex, increaseFocusItemIndex, decreaseFocusedItemIndex } =
        useOptionsList(options);

    const mergedCls = classNames('autocomplete', className);

    const handleSelect = (option: T) => {
        onControlledChange(option);
        onInputControlledChange(onGetLabel(option));
        isOpenPopup.setFalse();
    };

    const handleInputChange = (value: string) => {
        onInputControlledChange(value);
        const selectedOption = options.find((option: T) => onGetLabel(option) === value);
        if (selectedOption) {
            onControlledChange(selectedOption);
        } else {
            onControlledChange(null);
        }
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
                handleSelect(options[focusedItemIndex]);
            } else {
                isOpenPopup.toggle();
            }
        }

        if (isEsc) {
            isOpenPopup.setFalse();
        }
    };

    return (
        <div className="autocomplete-container">
            <OptionList
                id={optionsListId}
                value={controlledValue}
                options={options}
                onChange={handleSelect}
                open={isOpenPopup.value}
                focusedItemIndex={focusedItemIndex}
                onGetLabel={onGetLabel}
                onGetValue={onGetValue}
                onOutsideClickNeedHide
                onOpenChange={isOpenPopup.set}
            >
                <Input
                    {...otherProps}
                    autoComplete="off"
                    value={inputControlledValue}
                    className={mergedCls}
                    style={style}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => handleInputChange(event.target.value)}
                    onFocus={isOpenPopup.setTrue}
                    addonAfter={
                        <Icon className="autocomplete-icon" icon={<MdOutlineKeyboardArrowDown />} />
                    }
                />
            </OptionList>
        </div>
    );
};

export default Autocomplete;