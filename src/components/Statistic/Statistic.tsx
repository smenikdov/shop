import React, { useMemo } from 'react';
import './Spin.scss';
import classNames from 'classnames';
import type { StatisticProps } from './Statistic.types';
import Spin from '@/components/Spin';

const Statistic = (props: StatisticProps) => {
    const {
        className,
        style,
        value = 0,
        title,
        prefix,
        suffix,
        loading = false,
        ...otherProps
    } = props;
    const mergedCls = classNames('statistic', className);

    const StatisticInner = () => {
        if (loading) {
            return <Spin spinning />;
        }
        return (
            <>
                {prefix && <span className="statistic-prefix">{prefix}</span>}
                <span className="statistic-value">{value}</span>
                {suffix && <span className="statistic-suffix">{suffix}</span>}
            </>
        );
    };

    return (
        <div {...otherProps} className={mergedCls} style={style}>
            {title && <div className="statistic-title">{title}</div>}
            <div className="statistic-content">
                <StatisticInner />
            </div>
        </div>
    );
};

export default Statistic;
