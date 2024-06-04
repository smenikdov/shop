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

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';

import { userGetAll } from '@/features/user/routes';

interface TableUserItem {
    id: number;
    email: string | null;
    phone: string | null;
    fio: string | null;
}

const columns = [
    {
        title: 'ID',
        name: 'id',
    },
    {
        title: 'Email',
        name: 'email',
        render: (email: string) => (email ? <a href={`mailto:+${email}`}>{email}</a> : '—'),
    },
    {
        title: 'Телефон',
        name: 'phone',
        render: (phone: string) =>
            phone ? <a href={`tel:+${phone}`}>{formatPhoneNumber(phone)}</a> : '—',
    },
    {
        title: 'ФИО',
        name: 'fio',
    },
];

export default function UsersList() {
    const { notifyError, notifySuccess } = useNotification();

    const [users, setUsers] = useState<Array<TableUserItem>>([]);

    const { clientState, serverState, register, validate } = useForm({
        schema: v.object({
            page: v.page(),
            userId: v.id(),
            email: v.string(),
            phone: v.string(),
        }),
        initialState: {
            page: 1,
            userId: 0,
            email: '',
            phone: '',
        },
    });

    const getUsers = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        const response = await userGetAll(serverState);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        setUsers(response.data);
    };

    useOnMount(() => {
        getUsers();
    });

    return (
        <div>
            <Form action={getUsers} className="mb-md">
                <Row gapX="md" gapY="sm">
                    <Col md={3}>
                        <FormItem label="ID">
                            <InputNumber {...register('userId', baseInput)} min={0} />
                        </FormItem>
                    </Col>
                    <Col md={3}>
                        <FormItem label="Номер телефона">
                            <Input
                                {...register('phone', phoneInput)}
                                placeholder="+7 (___) __-__"
                            />
                        </FormItem>
                    </Col>
                    <Col md={3}>
                        <FormItem label="Email">
                            <Input {...register('email', textInput)} type="email" />
                        </FormItem>
                    </Col>
                </Row>
                <Flex justify="flex-end" className="mt-sm">
                    <Button type="submit">Найти</Button>
                </Flex>
            </Form>

            <Table columns={columns} data={users} />
        </div>
    );
}
