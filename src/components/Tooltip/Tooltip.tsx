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
        offset = [0, 0],
        trigger = 'hover',
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(open, false, onChange);

    const { refs, floatingStyles, context } = useFloating({
        open: controlledValue,
        onOpenChange: onControlledChange,
        middleware: [floatingOffset(0), floatingFlip(), floatingShift()],
        whileElementsMounted: autoUpdate,
    });

    const mergedCls = classNames('tooltip', `tooltip-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        // const offsetStyle: React.CSSProperties = { marginLeft: offset[0], marginTop: offset[1] };
        return { ...floatingStyles, ...style };
    }, [floatingStyles, style]);

    const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const interactions = [dismiss, role];

    if (trigger === 'hover') {
        interactions.push(hover);
    }
    if (trigger === 'focus') {
        interactions.push(focus);
    }

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
