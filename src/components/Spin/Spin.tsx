import React, { useMemo } from 'react';
import './Spin.scss';
import classNames from 'classnames';
import type { SpinProps } from './Spin.types';
import { FaSpinner } from 'react-icons/fa';

const Spin = (props: SpinProps) => {
    const {
        className,
        spinning,
        style,
        size,
        tip,
        icon: Spinner = FaSpinner,
        children,
        fullscreen,
        ...otherProps
    } = props;

    const isNestedPattern = useMemo<boolean>(
        () => typeof children !== 'undefined' && !fullscreen,
        [children, fullscreen]
    );

    const mergedCls = classNames(
        'spin',
        {
            'spin-spinning': spinning,
            'spin-fullscreen': fullscreen,
        },
        className
    );

    const containerClassName = classNames('spin-container', {
        'spin-blur': spinning,
    });

    const spinElement: React.ReactNode = (
        <div
            {...otherProps}
            style={style}
            className={mergedCls}
            aria-live="polite"
            aria-busy={spinning}
        >
            <Spinner />
            {tip && (isNestedPattern || fullscreen) ? <div className="spin-tip">{tip}</div> : null}
        </div>
    );

    if (isNestedPattern) {
        return (
            <div className={classNames('spin-nested-loading')}>
                {spinning && <div key="loading">{spinElement}</div>}
                <div className={containerClassName} key="container">
                    {children}
                </div>
            </div>
        );
    }

    return spinElement;
};

export default Spin;
