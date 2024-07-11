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
    const optionsListId = React.useId();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

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
        setIsOpenPopup(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        onKeyDown?.(event);

        const isEnter = event.keyCode === 13;
        const isEsc = event.keyCode === 27;
        const isArrowUp = event.keyCode === 38;
        const isArrowDown = event.keyCode === 40;

        if (isArrowDown) {
            if (focusedItemIndex === -1) {
                setFocusedItemIndex(0);
            } else {
                setFocusedItemIndex(focusedItemIndex + 1 < options.length ? focusedItemIndex + 1 : 0);
            }
        }

        if (isArrowUp) {
            if (focusedItemIndex === -1) {
                setFocusedItemIndex(options.length - 1);
            } else {
                setFocusedItemIndex(focusedItemIndex > 0 ? focusedItemIndex - 1 : options.length - 1);
            }
        }

        if (isEnter) {
            if (options[focusedItemIndex] && isOpenPopup) {
                onControlledChange(options[focusedItemIndex].value);
                setIsOpenPopup(false);
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
                    <OptionList
                        id={optionsListId}
                        value={controlledValue}
                        options={options}
                        onChange={onControlledChange}
                        open={isOpenPopup}
                        onOpenChange={setIsOpenPopup}
                        focusedItemIndex={focusedItemIndex}
                    >
                        <div className="select-content">
                            { controlledValue && options.find((option) => option.value === controlledValue)?.label }
                        </div>
                    </OptionList>
                </div>
                <Icon
                    className="select-icon"
                    icon={<MdOutlineKeyboardArrowDown />}
                />
            </div>

            {error && <div className="select-error">{error}</div>}
        </div>
    );
});

export default Select;
