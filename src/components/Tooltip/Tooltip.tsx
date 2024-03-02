import React, { useMemo } from 'react';
import './Tooltip.scss';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import type { TooltipProps } from './Tooltip.types';

const Tooltip = (props: TooltipProps) => {
    const {
        className,
        color = 'primary',
        style,
        arrow,
        disable,
        children,
        enterDelay = 0,
        leaveDelay = 0,
        onChange,
        open,
        placement,
        title,
        offset = [0, 0],
        trigger = 'hover',
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(open, false, onChange);

    const mergedCls = classNames(
        'tooltip',
        `tooltip-${color}`,
        { 'tooltip-hidden': !controlledValue },
        { 'tooltip-visible': controlledValue },
        className
    );

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        const offsetStyle: React.CSSProperties = { marginLeft: offset[0], marginTop: offset[1] };
        return { ...offsetStyle, ...style };
    }, [offset, style]);

    let enterTimer: ReturnType<typeof setTimeout>;
    let leaveTimer: ReturnType<typeof setTimeout>;

    const handleEnterEvent = () => {
        clearTimeout(leaveTimer);
        if (enterDelay) {
            enterTimer = setTimeout(() => {
                onControlledChange(true);
            }, enterDelay);
        } else {
            onControlledChange(true);
        }
    };

    const handleLeaveEvent = () => {
        clearTimeout(enterTimer);
        if (leaveDelay) {
            leaveTimer = setTimeout(() => {
                onControlledChange(false);
            }, leaveDelay);
        } else {
            onControlledChange(false);
        }
    };

    const interactiveListeners: {
        onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
        onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
        onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
        onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
    } = {};

    if (trigger === 'hover') {
        interactiveListeners.onMouseOver = handleEnterEvent;
        interactiveListeners.onMouseLeave = handleLeaveEvent;
    }
    if (trigger === 'focus') {
        interactiveListeners.onFocus = handleEnterEvent;
        interactiveListeners.onBlur = handleLeaveEvent;
    }

    return (
        <div {...otherProps} {...interactiveListeners}>
            {children}
            <div className={mergedCls} style={mergedStyle}>
                {title}
            </div>
        </div>
    );
};

export default Tooltip;
