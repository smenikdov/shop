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
import TextArea from '@/components/form/TextArea';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ProductCreateFormStep2Props {
    onGoToNextStep: () => void;
    onGoToPrevStep: () => void;
};

export default function ProductCreateFormStep2(props: ProductCreateFormStep2Props) {
    const { onGoToNextStep, onGoToPrevStep } = props; 
    const { notifyError, notifySuccess } = useNotification();

    const { clientState, serverState, register, validate } = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({
        }),
    });

    const handleApplyFilters = () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }
        onGoToNextStep();
    };

    return (
        <div>
            <Form action={handleApplyFilters}>
                <Title level={2} className="mb-sm">
                    Общие характеристики
                </Title>

                <Row gapX="md" gapY="sm">
                    <Col md={12}>
                        <FormItem label="Описание">
                            <TextArea {...register('shortDescription', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Ключевые слова">
                            <Input {...register('keywords', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Количество в упаковке, шт">
                            <Input {...register('packageQuantity', textInput)} />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-lg mb-sm">
                    Уникальные характеристики
                </Title>

                <Row gapX="md" gapY="sm">
                    <Col md={6}>
                        {/* <FormItem label="Описание">
                            <Input {...register('packageQuantity', textInput)} />
                        </FormItem> */}
                    </Col>
                </Row>

                <Flex justify="flex-end" gapX="md" className="mt-sm">
                    <div>
                        <Button onClick={onGoToPrevStep}>Назад</Button>
                    </div>
                    <div>
                        <Button type="submit">Далее</Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
