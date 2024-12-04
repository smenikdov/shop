import React from 'react';
import './MessageElement.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import type { MessageElementProps } from './MessageElement.types';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import ModalDialog from '@/components/modal/ModalDialog';
import Text from '@/components/typography/Text';
import classNames from 'classnames';
import useMessage from '@/features/message/hooks/useMessage';

const MessageElement = (props: MessageElementProps) => {
    const { title, message, id } = props;
    const { confirmMessage } = useMessage();

    const mergedCls = classNames('message');

    const handleClose = () => {
        confirmMessage(id, { close: true });
    };

    return (
        <ModalDialog isOpen={true} onClose={handleClose}>
            <div className={mergedCls}>
                <div>
                    <Text bold>{title}</Text>
                </div>
                <div>
                    <Text>{message}</Text>
                </div>
            </div>
        </ModalDialog>
    );
};

export default MessageElement;
