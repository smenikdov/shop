'use client';
import React, { useMemo, useState } from 'react';
import './QuestionTooltip.scss';
import classNames from 'classnames';
import type { QuestionTooltipProps } from './QuestionTooltip.types';
import Tooltip from '@/components/floating/Tooltip';
import Icon from '@/components/Icon';
import { MdHelpOutline } from 'react-icons/md';

const QuestionTooltip = (props: QuestionTooltipProps) => {
    const { className, color = 'primary', style, content, ...otherProps } = props;

    const mergedCls = classNames('question-tooltip', `question-tooltip-${color}`, className);

    return (
        <Tooltip content={content} color={color}>
            <div {...otherProps} className={mergedCls} style={style}>
                <Icon icon={<MdHelpOutline />} />
            </div>
        </Tooltip>
    );
};

export default QuestionTooltip;
