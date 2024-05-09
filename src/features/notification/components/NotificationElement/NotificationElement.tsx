import React from 'react';
import './NotificationElement.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { NotificationElementProps } from './NotificationElement.types';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Text from '@/components/typography/Text';
import classNames from 'classnames';

const NotificationElement = (props: NotificationElementProps) => {
    const { title, message, color = 'grey' } = props;

    const mergedCls = classNames('notification', `notification-${color}`);

    return (
        <div className={mergedCls}>
            <div>
                <Text bold>{title}</Text>
            </div>
            <div>
                <Text>{message}</Text>
            </div>
        </div>
    );
};

export default NotificationElement;
