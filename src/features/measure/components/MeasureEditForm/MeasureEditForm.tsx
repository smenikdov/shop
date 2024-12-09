'use client';

import React, { useState } from 'react';

import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Flex from '@/components/Flex';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';

import styles from './MeasureEditForm.module.css';

import * as v from '@/utils/validate';

import type { MeasureEditFormProps } from './MeasureEditForm.types';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useOnMount from '@/hooks/useOnMount';

import { measureGetDetails, measureCreate, measureUpdate } from '@/features/measure/routes';

export default function MeasureEditForm(props: MeasureEditFormProps) {
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
        if (!props.isEdit) {
            return;
        }

        const response = await measureGetDetails({ measureId: props.measureId });
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
        if (props.isEdit) {
            response = await measureUpdate({
                measureId: props.measureId,
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
                <Title level={2} className="mb-lg">
                    Информация о единице измерения
                </Title>
                <Row gapX="md" gapY="md">
                    <Col md={4}>
                        <FormItem label="Название" required>
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={4}>
                        <FormItem label="Сокращение" required>
                            <Input {...form.register('shortName', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={4}>
                        <FormItem label="Описание">
                            <Input {...form.register('description', textInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Flex justify="flex-end" gapX="md" className="mt-xl">
                    <div>
                        <Button onClick={handelCancel}>Отмена</Button>
                    </div>
                    <div>
                        <Button type="submit">
                            {props.isCreate && 'Добавить'}
                            {props.isEdit && 'Сохранить'}
                        </Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
