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

import type { OrderStatuses } from '@prisma/client';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';

import { orderGetAll } from '@/features/order/routes';

interface TableOrderItem {
    id: number;
    fio: string;
    userId: number;
    status: OrderStatuses;
    total: number;
}

const columns = [
    {
        title: 'ID',
        name: 'id',
    },
    {
        title: 'Заказчик',
        name: 'fio',
        render: (fio: string) => <Link>{fio}</Link>,
    },
    {
        title: 'Статус',
        name: 'status',
    },
    {
        title: 'Сумма',
        name: 'total',
    },
];

export default function OrdersList() {
    const { notifyError, notifySuccess } = useNotification();

    const [orders, setOrders] = useState<Array<TableOrderItem>>([]);

    const { clientState, serverState, register, validate } = useForm({
        schema: v.object({
            page: v.page(),
            orderId: v.id(),
        }),
        initialState: {
            page: 1,
            orderId: 0,
        },
    });

    const getOrders = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        const response = await orderGetAll(serverState);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        setOrders(response.data);
    };

    useOnMount(() => {
        getOrders();
    });

    return (
        <div>
            <Form action={getOrders} className="mb-md">
                <Row gapX="md" gapY="sm">
                    <Col md={3}>
                        <FormItem label="ID">
                            <InputNumber {...register('orderId', baseInput)} min={0} />
                        </FormItem>
                    </Col>
                </Row>
                <Flex justify="flex-end" className="mt-sm">
                    <Button type="submit">Найти</Button>
                </Flex>
            </Form>

            <Table columns={columns} data={orders} />
        </div>
    );
}
