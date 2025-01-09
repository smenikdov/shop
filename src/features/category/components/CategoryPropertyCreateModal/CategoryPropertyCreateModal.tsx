'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Empty from '@/components/Empty';
import Button from '@/components/Button';
import Tooltip from '@/components/floating/Tooltip';
import styles from './page.module.css';
import Checkbox from '@/components/form/Checkbox';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';

import type { CategoryPropertyCreateModalProps } from './CategoryPropertyCreateModal.types';

import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';
import useArray from '@/hooks/useArray';
import useBoolean from '@/hooks/useBoolean';
import { useRouter } from 'next/navigation';
import { useForm, textInput, baseInput } from '@/hooks/useForm';

import * as v from '@/utils/validate';

export default function CategoryPropertyTable({
    isOpen,
    onClose,
    onAdd,
    categoryId,
}: CategoryPropertyCreateModalProps) {
    const form = useForm<{
        category: {
            id: number;
            name: string;
        } | null;
    }>({
        initialState: {
            category: null
        },
        schema: v.object({
            category: v.object({}),
        }),
    });

    const handleClick = () => {
        const isValid = form.validate();
        if (!isValid) {
            return;
        }
        onAdd(form.serverState.category);
    };

    return (
        <ModalDialog isOpen={isOpen} onClose={onClose}>
            <div>
                <FormItem label="Свойство">
                    <Autocomplete
                        {...form.register('category')}
                        inputValue={measureInputValue}
                        options={measures}
                        onGetValue={(option) => option.id}
                        onGetLabel={(option) => option.name}
                        onInputChange={(value) => onMeasuresInputChange(value)}
                    />
                </FormItem>
                <Flex className="mt-md" justify="flex-end">
                    <Button onClick={handleClick}>Добавить</Button>
                </Flex>
            </div>
        </ModalDialog>
    );
}
