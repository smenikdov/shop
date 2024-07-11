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
import Input from '@/components/form/Input';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import type { CategoryEditFormProps } from './CategoryEditForm.types';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function CategoryEditForm(props: CategoryEditFormProps) {
    const { isCreate, isEdit, categoryId } = props;

    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const form = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({}),
    });

    const loadForm = async () => {
        if (!isEdit || !categoryId) {
            return;
        }

        const response = await TODO({ categoryId });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        form.setState(response.data);
    };

    useOnMount(() => {
        loadForm();
    });

    const handelCancel = () => {
        router.back();
    };

    const handleApply = () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }
    };

    return (
        <div>
            <Form action={handleApply}>
                <Title level={2} className="mb-sm">
                    Информация о категории
                </Title>
                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        <FormItem label="Название">
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...form.register('description', textInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-lg mb-sm">
                    Свойства товаров
                </Title>
                <Row gapX="md" gapY="sm">
                </Row>

                <Flex justify="flex-end" gapX="md" className="mt-sm">
                    <div>
                        <Button onClick={handelCancel}>Отмена</Button>
                    </div>
                    <div>
                        <Button type="submit">Добавить</Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
