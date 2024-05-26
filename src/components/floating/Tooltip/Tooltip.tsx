'use client';
import React, { useMemo, useState } from 'react';
import './Tooltip.scss';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import type { TooltipProps } from './Tooltip.types';
import {
    useFloating,
    autoUpdate,
    offset as floatingOffset,
    flip as floatingFlip,
    shift as floatingShift,
    useHover,
    useFocus,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
} from '@floating-ui/react';

const Tooltip = (props: TooltipProps) => {
    const {
        className,
        color = 'primary',
        style,
        arrow,
        disabled,
        children,
        onChange,
        open,
        content,
        offset = 10,
        triggers = ['hover'],
        placement = 'top',
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(open, false, onChange);

    const { refs, floatingStyles, context } = useFloating({
        open: controlledValue,
        onOpenChange: onControlledChange,
        middleware: [floatingOffset(offset), floatingFlip(), floatingShift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
    });

    const mergedCls = classNames('tooltip', `tooltip-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        return { ...floatingStyles, ...style };
    }, [floatingStyles, style]);

    const hover = useHover(context, { enabled: triggers.includes('hover'), move: false });
    const click = useClick(context, { enabled: triggers.includes('click') });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const interactions = [dismiss, role, hover, click];

    const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

    return (
        <>
            <div
                className="tooltip-container"
                ref={refs.setReference}
                {...getReferenceProps()}
                aria-disabled={disabled}
            >
                {children}
            </div>

            {controlledValue && (
                <div
                    ref={refs.setFloating}
                    className={mergedCls}
                    style={mergedStyle}
                    {...getFloatingProps()}
                    {...otherProps}
                >
                    {content}
                </div>
            )}
        </>
    );
};

export default Tooltip;
