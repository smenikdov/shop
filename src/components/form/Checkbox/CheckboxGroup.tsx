'use client';

import React from 'react';
import classNames from 'classnames';
import Checkbox from './Checkbox';
import CheckboxContext from './Checkbox.context';
import { CheckboxGroupProps, CheckboxValue } from './Checkbox.types';
import { useUncontrolledProp } from 'uncontrollable';

const CheckboxGroup = (props: CheckboxGroupProps) => {
    const {
        children,
        options = [],
        className,
        style,
        onChange,
        value,
        disabled = false,
        readOnly = false,
        name,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, [], onChange);

    const toggleOption = (value: CheckboxValue) => {
        const optionIndex = controlledValue.indexOf(value);
        const newValue = [...controlledValue];
        if (optionIndex === -1) {
            newValue.push(value);
        } else {
            newValue.splice(optionIndex, 1);
        }
        onControlledChange(newValue);
    };

    const childrenNode = options.length
        ? options.map<React.ReactNode>((option) => (
              <Checkbox key={option.value.toString()} {...option}>
                  {option.label}
              </Checkbox>
          ))
        : children;

    const context = {
        onChange: toggleOption,
        value: controlledValue,
        disabled,
        readOnly,
        name,
    };
    return (
        <div className={className} style={style} {...otherProps}>
            <CheckboxContext.Provider value={context}>{childrenNode}</CheckboxContext.Provider>
        </div>
    );
};

export default CheckboxGroup;
