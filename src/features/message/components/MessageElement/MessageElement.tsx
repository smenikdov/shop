import React from 'react';
import './MessageElement.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { MessageElementProps } from './MessageElement.types';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Text from '@/components/typography/Text';
import classNames from 'classnames';

const MessageElement = (props: MessageElementProps) => {
    const { title, message } = props;

    const mergedCls = classNames('message');

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

export default MessageElement;
