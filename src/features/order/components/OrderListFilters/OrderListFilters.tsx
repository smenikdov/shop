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

import type { OrderStatus } from '@prisma/client';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function OrderListFilters() {
    const { notifyError, notifySuccess } = useNotification();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { serverState, register, validate } = useForm({
        schema: v.object({
            page: v.page(),
            orderId: v.id(),
        }),
        initialState: {
            page: psp.integer(searchParams.get('page')) || 1,
            orderId: psp.integer(searchParams.get('orderId')),
        },
    });

    const handleApplyFilters = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(serverState)) {
            params.set(key, value.toString());
        }
        router.replace(`${pathname}?${params}`);
    };

    return (
        <div>
            <Form action={handleApplyFilters} className="mb-md">
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
        </div>
    );
}
