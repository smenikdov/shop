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

interface ProductCreateFormStep1Props {
    onGoToNextStep: () => void;
    onCancel: () => void;
}

export default function ProductCreateFormStep1(props: ProductCreateFormStep1Props) {
    const { onCancel, onGoToNextStep } = props;

    const { notifyError, notifySuccess } = useNotification();

    const { clientState, serverState, register, validate } = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({}),
    });

    const handleApply = () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }
        onGoToNextStep();
    };

    return (
        <div>
            <Form action={handleApply}>
                <Title level={2} className="mb-sm">
                    Информация о товаре
                </Title>
                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        <FormItem label="Категория">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Название">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Штрихкод">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Артикул">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Цена">
                            <Input {...register('name', textInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-lg mb-sm">
                    Габариты и вес
                </Title>
                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        <FormItem label="Длина упаковки, мм">
                            <InputNumber {...register('name', baseInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Ширина упаковки, мм">
                            <InputNumber {...register('name', baseInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Высота упаковки, мм">
                            <InputNumber {...register('name', baseInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Вес с упаковкой, г">
                            <InputNumber {...register('name', baseInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Flex justify="flex-end" gapX="md" className="mt-sm">
                    <div>
                        <Button onClick={onCancel}>Отмена</Button>
                    </div>
                    <div>
                        <Button type="submit">Далее</Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
