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
import InputNumber from '@/components/form/InputNumber';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';

import styles from './page.module.css';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { MdOutlineAdd } from 'react-icons/md';

export default function CategoryListFilters() {
    const { notifyError, notifySuccess } = useNotification();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        schema: v.object({
            page: v.page(),
            categoryId: v.id(),
            name: v.string(),
        }),
        initialState: {
            page: psp.integer(searchParams.get('page')) || 1,
            categoryId: psp.integer(searchParams.get('categoryId')),
            name: psp.string(searchParams.get('name')),
        },
    });

    const handleApplyFilters = async () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(form.serverState)) {
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
                            <InputNumber {...form.register('categoryId')} min={0} />
                        </FormItem>
                    </Col>
                    <Col md={3}>
                        <FormItem label="Название">
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                </Row>
                <Flex justify="space-between" className="mt-sm">
                    <Button
                        type="submit"
                        variant="text"
                        href="/admin/category/create"
                        icon={<MdOutlineAdd />}
                    >
                        Добавить категорию
                    </Button>
                    <Button type="submit">Найти</Button>
                </Flex>
            </Form>
        </div>
    );
}
