'use client';
import React, { useMemo, useState } from 'react';
import './Tooltip.scss';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import type { TooltipProps } from './Tooltip.types';
import useFloating from '@/hooks/useFloating';

const Tooltip = (props: TooltipProps) => {
    const {
        className,
        color = 'primary',
        style,
        arrow,
        disabled,
        children,
        onOpenChange,
        open,
        content,
        offset = 10,
        triggers = ['hover'],
        alignment = 'center',
        side = 'left',
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(open, false, onOpenChange);
    const containerReference = React.useRef(null);
    const floatingReference = React.useRef(null);

    const { floatingStyles } = useFloating({
        containerReference,
        floatingReference,
        isVisible: controlledValue,
        offset,
        flip: true,
        shift: true,
        side,
        alignment,
    });

    const mergedCls = classNames('tooltip', `tooltip-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        return { ...floatingStyles, ...style };
    }, [floatingStyles, style]);

    return (
        <div className="tooltip-container">
            <div
                className="tooltip-content"
                ref={containerReference}
                aria-disabled={disabled}
                onMouseEnter={() => onControlledChange(true)}
                onMouseLeave={() => onControlledChange(false)}
            >
                {children}
            </div>

            {(
                <div
                    ref={floatingReference}
                    role="tooltip"
                    className={mergedCls}
                    style={mergedStyle}
                    {...otherProps}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
