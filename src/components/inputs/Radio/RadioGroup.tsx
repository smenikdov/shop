'use client';

import React from 'react';
import Radio from './Radio';
import RadioContext from './Radio.context';
import { RadioGroupProps } from './Radio.types';
import { useUncontrolledProp } from 'uncontrollable';

const RadioGroup = (props: RadioGroupProps) => {
    const {
        children,
        options = [],
        className,
        style,
        onChange,
        value,
        disabled = false,
        name,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, null, onChange);

    const childrenNode = options.length
        ? options.map<React.ReactNode>((option) => (
              <Radio key={option.value.toString()} {...option}>
                  {option.label}
              </Radio>
          ))
        : children;

    const context = {
        onChange: onControlledChange,
        value: controlledValue,
        disabled: disabled,
        name: name,
    };
    return (
        <div className={className} style={style} {...otherProps}>
            <RadioContext.Provider value={context}>{childrenNode}</RadioContext.Provider>
        </div>
    );
};

export default RadioGroup;
