'use client';

import React, { useMemo } from 'react';
import './Button.scss';
import Icon from '@/components/Icon';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';

import type { ButtonProps } from './Button.types';

const Button = (props: ButtonProps) => {
    const {
        loading = false,
        type = 'filled',
        color = 'primary',
        shape = 'squre',
        disabled = false,
        className,
        children,
        icon,
        htmlType = 'button',
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
        `button-${type}`,
        {
            [`button-disabled`]: disabled,
            [`button-icon-only`]: !children && children !== 0 && !!icon,
            [`button-loading`]: loading,
        },
        className
    );

    const ButtonInner = () => {
        if (loading) {
            return <Icon icon={FaSpinner} />;
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
                onClick={handleClick}
                tabIndex={disabled ? -1 : 0}
            >
                <ButtonInner />
            </a>
        );
    }

    return (
        <button
            {...otherProps}
            type={htmlType}
            className={mergedCls}
            style={style}
            onClick={handleClick}
            disabled={disabled}
        >
            <ButtonInner />
        </button>
    );
};

export default Button;
