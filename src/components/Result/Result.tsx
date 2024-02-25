import React, { useMemo } from 'react';
import './Result.scss';
import classNames from 'classnames';
import Icon from '@/components/Icon';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import type { ResultProps } from './Result.types';

const Result = (props: ResultProps) => {
    const { className, subTitle, title, style, children, color = 'primary', icon } = props;

    const mergedCls = classNames('result', `result-${color}`, className);

    return (
        <div className={mergedCls} style={style}>
            {icon && <Icon color={color} icon={icon} />}
            <Title className="result-title">{title}</Title>
            {subTitle && <Paragraph className="result-subtitle">{subTitle}</Paragraph>}
            {children && <div className="result-content">{children}</div>}
        </div>
    );
};

export default Result;
