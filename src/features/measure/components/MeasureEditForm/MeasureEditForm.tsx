'use client';

import React, { useState } from 'react';

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

import styles from './MeasureEditForm.module.css';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import type { MeasureEditFormProps } from './MeasureEditForm.types';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useOnMount from '@/hooks/useOnMount';

import { measureGetDetails, measureCreate, measureUpdate } from '@/features/measure/routes';

export default function MeasureEditForm(props: MeasureEditFormProps) {
    const { isCreate, isEdit, measureId } = props;

    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const form = useForm<{
        name: string;
        shortName: string;
        description: string | null;
    }>({
        initialState: {
            name: '',
            shortName: '',
            description: '',
        },
        schema: v.object({
            name: v.string().required(),
            shortName: v.string().required(),
            description: v.string(),
        }),
    });

    const loadForm = async () => {
        if (!isEdit || !measureId) {
            return;
        }

        const response = await measureGetDetails({ measureId });
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

    const handleSubmit = async () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }

        let response;
        if (isEdit && measureId) {
            response = await measureUpdate({
                measureId,
                ...form.serverState,
            });
        } else {
            response = await measureCreate(form.serverState);
        }
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        router.push('/admin/measure');
    };

    return (
        <div>
            <Form action={handleSubmit}>
                <Title level={2} className="mb-sm">
                    Информация о единице измерения
                </Title>
                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        <FormItem label="Название">
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Сокращение">
                            <Input {...form.register('shortName', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...form.register('description', textInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Flex justify="flex-end" gapX="md" className="mt-sm">
                    <div>
                        <Button onClick={handelCancel}>Отмена</Button>
                    </div>
                    <div>
                        <Button type="submit">
                            { isCreate && 'Добавить' }
                            { isEdit && 'Сохранить' }
                        </Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
