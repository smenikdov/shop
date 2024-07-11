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
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import styles from './PropertyEditForm.module.scss';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';
import { getOptionsFromConstants } from '@/constants/constants.utils';
import { PROPERTY_TYPE, PROPERTY_TYPE_LABEL } from '@/constants';

import type { PropertyEditFormProps } from './PropertyEditForm.types';
import type { PropertyOption } from '@/features/property/typings';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useArray from '@/hooks/useArray';
import useOnMount from '@/hooks/useOnMount';

export default function PropertyEditForm(props: PropertyEditFormProps) {
    const { isCreate, isEdit, propertyId } = props;

    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();
    const [ measures, setMeasures] = useState([]);

    const showAddModal = () => {};

    const form = useForm({
        initialState: {
            name: '',
            description: '',
            type: '',
            measure: '',
        },
        schema: v.object({}),
    });

    const meta = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({}),
    });

    const options = useArray<PropertyOption>([]);

    const loadForm = async () => {
        if (!isEdit || !propertyId) {
            return;
        }

        const response = await TODO({ propertyId });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        // TODO
        form.setState(response.data);
        meta.setState(response.data.meta);
        options.set(response.data.options);
    }; 

    useOnMount(() => {
        loadForm();
    });

    const handelCancel = () => {
        router.back();
    };

    const handleApply = async () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }

        const request = {
            ...form.serverState,
            meta: meta.serverState,
            options: options.value,
        };
    };

    // const columns: TableColumnsFor<typeof Option> = [
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
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...form.register('description', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Тип">
                            <Select {...form.register('type')} options={getOptionsFromConstants(PROPERTY_TYPE_LABEL)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Единица измерения">
                            <Select {...form.register('measure')} options={measures} />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-lg mb-sm">
                    Информация для заполнения
                </Title>
                <Row gapX="md" gapY="sm">
                    { form.serverState.type === PROPERTY_TYPE.STRING && (
                        <Row gapX="md" gapY="sm">
                            <Col md={6}>
                                <FormItem label="Максимальная длинна">
                                    <InputNumber {...meta.register('maxLength')} />
                                </FormItem>
                            </Col>
                            <Col md={6}>
                                <FormItem label="Минимальная длинна">
                                    <InputNumber {...meta.register('minLength')} />
                                </FormItem>
                            </Col>
                        </Row>
                    )}
                    
                    { form.serverState.type === PROPERTY_TYPE.NUMBER && (
                        <Row gapX="md" gapY="sm">
                            <Col md={6}>
                                <FormItem label="Максимальное значение">
                                    <InputNumber {...meta.register('max')} />
                                </FormItem>
                            </Col>
                            <Col md={6}>
                                <FormItem label="Минимальное значение">
                                    <InputNumber {...meta.register('min')} />
                                </FormItem>
                            </Col>
                        </Row>
                    )}

                    { form.serverState.type === PROPERTY_TYPE.SELECT && (
                        <div>
                            <Button onClick={showAddModal}>
                                Добавить вариант
                            </Button>
                        </div>
                    )}
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
