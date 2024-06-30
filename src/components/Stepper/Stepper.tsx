'use client';

import React, { useMemo } from 'react';
import './Stepper.scss';
import classNames from 'classnames';
import Flex from '@/components/Flex';

import { useUncontrolledProp } from 'uncontrollable';
import useWindowSize from '@/hooks/useWindowSize';

import type { StepperProps } from './Stepper.types';

const Stepper = (props: StepperProps) => {
    const {
        value,
        onChange,
        className,
        items,
        responsiveBreakPoint,
        direction = 'horizontal',
        defaultStep = 0,
        ...otherProps
    } = props;

    const windowSize = useWindowSize()

    const [controlledValue, onControlledChange] = useUncontrolledProp(
        value,
        defaultStep,
        onChange
    );

    const mergedDirection = useMemo(() => {
        if (responsiveBreakPoint && windowSize.width < responsiveBreakPoint) {
            return 'vertical';
        }
        return direction;
    }, [direction, windowSize, responsiveBreakPoint]);

    const mergedCls = classNames(
        'stepper',
        `stepper-${ mergedDirection }`,
        className,
    );

    const stepperContent = useMemo(() => {
        const item = items.find((item, index) => item.value === controlledValue || index === controlledValue);
        return item?.content || null;
    }, [items, controlledValue]);

    return (
        <div {...otherProps} className={mergedCls}>
            <div className="stepper-controls">
                {items.map((item, index) => (
                    <div
                        key={item.value || index}
                        className={classNames(
                            'stepper-item',
                            {
                                'stepper-item-current': controlledValue === (item.value || index),
                                'stepper-item-disabled': item.disabled,
                                [`stepper-item-${ item.status }`]: item.status,
                            },
                        )}
                    >
                        <Flex
                            className="stepper-item-container"
                            align="center"
                            wrap="nowrap"
                        >
                            <Flex className="stepper-item-icon" align="center" justify="center">
                                { index + 1 }
                            </Flex>
                            <div className="stepper-item-name">
                                {item.title}
                            </div>
                        </Flex>
                    </div>
                ))}
            </div>

            <div className="stepper-content">
                { stepperContent }
            </div>
        </div>
    );
};

export default Stepper;
