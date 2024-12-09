import React from 'react';
import './MessageElement.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import type { MessageElementProps } from './MessageElement.types';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import Text from '@/components/typography/Text';
import classNames from 'classnames';
import useMessage from '@/features/message/hooks/useMessage';

const MessageElement = (props: MessageElementProps) => {
    const { title, message, id, type } = props;
    const { confirmMessage } = useMessage(id);

    const mergedCls = classNames('message');

    const handleClickOk = () => {
        if (type === 'CONFIRM') {
            // TODO
        }
        if (type === 'PROMPT') {
            confirmMessage({ ok: true });
        }
    };

    return (
        <ModalDialog
            isOpen={true}
            onClose={() => confirmMessage({ close: true })}
            title={title}
        >
            <Card className={mergedCls}>
                <div>
                    <Text>{message}</Text>
                </div>
                {
                    type === 'PROMPT' &&
                    <div>
                        <Input

                        />
                    </div>
                }
                {
                    type === 'PROMPT' || 'CONFIRM' &&
                    <Button onClick={() => confirmMessage({ cancel: true })}>
                        Отмена
                    </Button>
                }
                <Button onClick={handleClickOk}>
                    ОК
                </Button>
            </Card>
        </ModalDialog>
    );
};

export default MessageElement;
