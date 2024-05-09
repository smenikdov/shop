'use client';

import React, { useState } from 'react';
import './Rating.scss';
import classNames from 'classnames';
import { RatingProps, RatingItemProps } from './Rating.types';
import { useUncontrolledProp } from 'uncontrollable';
import Icon from '@/components/Icon';
import Flex from '@/components/Flex';
import { MdStarRate, MdStarOutline } from 'react-icons/md';
import FormContext from '@/components/form/Form/Form.context';
import FormItemContext from '@/components/form/FormItem/FormItem.context';

const RatingItem = (props: RatingItemProps) => {
    const { ratingValue, itemValue, hoverValue, ...otherProps } = props;

    const isFilled = hoverValue ? itemValue <= hoverValue : itemValue <= ratingValue;
    const isHovered = itemValue <= hoverValue;
    const isChecked = itemValue === ratingValue;

    const mergedCls = classNames('rating-item', {
        'rating-item-checked': isChecked,
        'rating-item-filled': isFilled,
        'rating-item-empty': !isFilled,
        'rating-item-hovered': isHovered,
    });

    return (
        <div className={mergedCls} {...otherProps}>
            {isFilled ? (
                <Icon icon={<MdStarRate />} color="primary" />
            ) : (
                <Icon icon={<MdStarOutline />} color="primary" />
            )}
        </div>
    );
};

const Rating = (props: RatingProps) => {
    const {
        className,
        style,
        disabled,
        readOnly,
        max = 5,
        rating,
        onChange,
        defaultRating = 0,
        ...otherProps
    } = props;

    const formContext = React.useContext(FormContext);
    const formItemContext = React.useContext(FormItemContext);

    const mergedDisabled = formContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || readOnly;

    const mergedCls = classNames(
        'rating',
        {
            'rating-disabled': mergedDisabled,
            'rating-readonly': mergedReadOnly,
        },
        className
    );

    const [hoverValue, setHoverValue] = useState(0);
    const [controlledValue, onControlledChange] = useUncontrolledProp(
        rating,
        defaultRating,
        onChange
    );

    const handleClick = (itemValue: number) => {
        onControlledChange(itemValue);
    };

    const handleMouseEnter = (itemValue: number) => {
        setHoverValue(itemValue);
    };

    const handleMouseLeave = (itemValue: number) => {
        setHoverValue(0);
    };

    return (
        <Flex {...otherProps} className={mergedCls} style={style}>
            {Array.from(new Array(max)).map((_, index) => {
                const eventListeners = {
                    onClick: () => {},
                    onMouseEnter: () => {},
                    onMouseLeave: () => {},
                };
                const itemValue = index + 1;

                if (!mergedDisabled && !mergedReadOnly) {
                    eventListeners.onClick = () => handleClick(itemValue);
                    eventListeners.onMouseEnter = () => handleMouseEnter(itemValue);
                    eventListeners.onMouseLeave = () => handleMouseLeave(itemValue);
                }

                return (
                    <RatingItem
                        key={itemValue}
                        {...eventListeners}
                        itemValue={itemValue}
                        ratingValue={controlledValue}
                        hoverValue={hoverValue}
                    />
                );
            })}
        </Flex>
    );
};

export default Rating;
