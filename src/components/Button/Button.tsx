'use client';

import React, { useMemo } from 'react';
import './Button.scss';
import Icon from '@/components/Icon';
import Spin from '@/components/Spin';
import classNames from 'classnames';

import type { ButtonProps } from './Button.types';

const Button = (props: ButtonProps) => {
    const {
        loading = false,
        variant = 'filled',
        color = 'primary',
        shape = 'round',
        size = 'md',
        disabled = false,
        className,
        children,
        icon,
        type = 'button',
        style,
        href,
        ...otherProps
    } = props;

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
        const { onClick } = props;
        if (loading || disabled) {
            e.preventDefault();
            return;
        }
        (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
    };

    const mergedCls = classNames(
        'button',
        `button-${color}`,
        `button-${shape}`,
        `button-${variant}`,
        `button-${size}`,
        {
            [`button-disabled`]: disabled,
            [`button-icon-only`]: !children && children !== 0 && !!icon,
            [`button-loading`]: loading,
        },
        className
    );

    const ButtonInner = () => {
        if (loading) {
            return <Spin spinning />;
        }
        return (
            <>
                {icon && <Icon icon={icon} />}
                {children}
            </>
        );
    };

    if (href !== undefined) {
        return (
            <a
                {...otherProps}
                className={mergedCls}
                href={disabled ? undefined : href}
                style={style}
                tabIndex={disabled ? -1 : 0}
                onClick={handleClick}
            >
                <ButtonInner />
            </a>
        );
    }

    return (
        <button
            {...otherProps}
            type={type}
            className={mergedCls}
            style={style}
            disabled={disabled}
            onClick={handleClick}
        >
            <ButtonInner />
        </button>
    );
};

export default Button;
