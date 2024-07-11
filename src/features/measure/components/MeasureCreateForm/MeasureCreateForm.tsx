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
import styles from './page.module.css';
import Input from '@/components/form/Input';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { measureCreate } from '@/features/measure/routes';

export default function MeasureCreateForm() {
    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const { clientState, serverState, register, validate } = useForm({
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

    const handelCancel = () => {
        router.back();
    };

    const handleSubmit = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        const response = await measureCreate(serverState);
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
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Сокращение">
                            <Input {...register('shortName', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...register('description', textInput)} />
                        </FormItem>
                    </Col>
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
