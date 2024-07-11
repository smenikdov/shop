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
import Select from '@/components/form/Select';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import styles from './page.module.css';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';
import { getOptionsFromConstants } from '@/constants/constants.utils';
import { PROPERTY_TYPE_LABEL } from '@/constants';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PropertyCreateForm() {
    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const { clientState, serverState, register, validate } = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({}),
    });

    const handelCancel = () => {
        router.back();
    };

    const handleApply = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }
    };

    // const columns: TableColumnsFor<typeof getMeasures> = [
    //     {
    //         title: 'ID',
    //         render: ({ id }) => id,
    //     },
    //     {
    //         title: 'Название',
    //         render: ({ name }) => name,
    //     },
    //     {
    //         title: 'Сокращение',
    //         render: ({ shortName }) => shortName,
    //     },
    // ];

    return (
        <div>
            <Form action={handleApply}>
                <Title level={2} className="mb-sm">
                    Информация о свойстве
                </Title>
                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        <FormItem label="Название">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...register('description', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Тип">
                            <Select {...register('type', baseInput)} options={getOptionsFromConstants(PROPERTY_TYPE_LABEL)} />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-lg mb-sm">
                    Значения свойства
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
