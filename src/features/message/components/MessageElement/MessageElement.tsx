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
                <div>
                    <Text>{message}</Text>
                </div>
                {type === 'PROMPT' && (
                    <div>
                        <FormItem label={title}>
                            <Input {...form.register('input', textInput)} />
                        </FormItem>
                    </div>
                )}
                {(type === 'PROMPT' || type === 'CONFIRM') && (
                    <Button onClick={() => handleConfirm({ cancel: true })}>Отмена</Button>
                )}
                <Button onClick={handleClickOk}>ОК</Button>
            </div>
        </ModalDialog>
    );
};

export default MessageElement;
