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
import InputNumber from '@/components/form/InputNumber';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';

import { PaymentStatuses } from '@prisma/client';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';

import { paymentGetAll } from '@/features/payment/routes';

interface TablePaymentItem {
    id: number;
    status: PaymentStatuses;
    createdAt: Date;
    userId: number;
    fio: string;
}

const columns = [
    {
        title: 'ID',
        name: 'id',
    },
    {
        title: 'Инициатор',
        name: 'fio',
    },
    {
        title: 'Статус',
        name: 'status',
    },
    {
        title: 'Дата',
        name: 'createdAt',
    },
];

export default function PaymentsList() {
    const { notifyError, notifySuccess } = useNotification();

    const [payments, setPayments] = useState<Array<TablePaymentItem>>([]);

    const { serverState, register, validate } = useForm({
        schema: v.object({
            page: v.page(),
            paymentId: v.id(),
        }),
        initialState: {
            page: 1,
            paymentId: 0,
        },
    });

    const getPayments = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        const response = await paymentGetAll(serverState);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        setPayments(response.data);
    };

    useOnMount(() => {
        getPayments();
    });

    return (
        <div>
            <Form action={getPayments} className="mb-md">
                <Row gapX="md" gapY="sm">
                    <Col md={3}>
                        <FormItem label="ID">
                            <InputNumber {...register('paymentId', baseInput)} min={0} />
                        </FormItem>
                    </Col>
                </Row>
                <Flex justify="flex-end" className="mt-sm">
                    <Button type="submit">Найти</Button>
                </Flex>
            </Form>

            <Table columns={columns} data={payments} />
        </div>
    );
}
