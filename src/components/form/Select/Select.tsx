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

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
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
        ...otherProps
    } = props;

    const formContext = React.useContext(FormContext);
    const [controlledValue, onControlledChange] = useUncontrolledProp(value, '', onChange);
    const setValueAndHide = (newValue: string | number | null) => {
        onControlledChange(newValue);
        setIsOpenPopup(false);
    };
    const optionsListId = React.useId();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { focusedItemIndex, increaseFocusItemIndex, decreaseFocusedItemIndex } =
        useOptionsList(options);

    const [focused, setFocused] = useState(false);
    const mergedDisabled = formContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || readOnly;

    const mergedCls = classNames(
        'select',
        {
            'select-disabled': mergedDisabled,
            'select-readonly': mergedReadOnly,
            'select-focus': focused,
            'select-invalid': error,
            'select-expanded': isOpenPopup,
        },
        `select-${size}`,
        `select-${variant}`
    );

    const handleFocus = (event: React.FocusEvent) => {
        onFocus?.(event);
        setFocused(true);
    };

    const handleBlur = (event: React.FocusEvent) => {
        onBlur?.(event);
        setFocused(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
        setIsOpenPopup(!isOpenPopup);
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
                setValueAndHide(options[focusedItemIndex].value);
            } else {
                setIsOpenPopup(!isOpenPopup);
            }
        }

        if (isEsc) {
            setIsOpenPopup(false);
        }
    };

    return (
        <div className={classNames('select-container', className)}>
            <OptionList
                id={optionsListId}
                value={controlledValue}
                options={options}
                onChange={setValueAndHide}
                open={isOpenPopup}
                focusedItemIndex={focusedItemIndex}
                onOutsideClickNeedHide
                onOpenChange={(isOpen) => setIsOpenPopup(isOpen)}
            >
                <div className={mergedCls} style={style}>
                    <div
                        ref={ref}
                        className="select-field"
                        tabIndex={0}
                        role="combobox"
                        aria-expanded={isOpenPopup}
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
                        <div className="select-content">
                            {controlledValue &&
                                options.find((option) => option.value === controlledValue)?.label}
                        </div>
                    </div>
                    <Icon className="select-icon" icon={<MdOutlineKeyboardArrowDown />} />
                </div>
            </OptionList>

            {error && <div className="select-error">{error}</div>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
