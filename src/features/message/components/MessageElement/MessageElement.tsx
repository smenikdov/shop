'use client';

import React, { useState } from 'react';
import './MessageElement.scss';

import type { MessageElementProps } from './MessageElement.types';
import type { AnyMessageResult } from '@/features/message/typings';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import ModalSlider from '@/components/modal/ModalSlider';
import Text from '@/components/typography/Text';
import Flex from '@/components/Flex';
import FormItem from '@/components/form/FormItem';

import classNames from 'classnames';
import * as v from '@/utils/validate';

import useMessage from '@/features/message/hooks/useMessage';
import { useForm, textInput, baseInput } from '@/hooks/useForm';

const MessageElement = (props: MessageElementProps) => {
    const { title, message, id, type } = props;
    const { confirmMessage } = useMessage(id);
    const [isOpen, setIsOpen] = useState(true);

    const mergedCls = classNames('message');

    const form = useForm<{
        input: string;
    }>({
        initialState: {
            input: '',
        },
        schema: v.object({}),
    });

    const handleConfirm = (data: AnyMessageResult) => {
        if (!isOpen) {
            return;
        }
        setIsOpen(false);
        confirmMessage(data);
    };

    const handleClickOk = () => {
        if (type === 'CONFIRM') {
            handleConfirm({ ok: true });
        }
        if (type === 'PROMPT') {
            handleConfirm({ ok: true, input: form.clientState.input });
        }
    };

    return (
        <ModalDialog isOpen={isOpen} onClose={() => handleConfirm({ close: true })} title={title}>
            <div className={mergedCls}>
                <div className="mb-md">
                    <Text>{message}</Text>
                </div>
                {type === 'PROMPT' && (
                    <div>
                        <Input {...form.register('input', textInput)} />
                    </div>
                )}
                <Flex className="mt-md" justify="flex-end">
                    {(type === 'PROMPT' || type === 'CONFIRM') && (
                        <Button className="mr-md" onClick={() => handleConfirm({ cancel: true })}>Отмена</Button>
                    )}
                    <Button onClick={handleClickOk}>ОК</Button>
                </Flex>
            </div>
        </ModalDialog>
    );
};

export default MessageElement;
