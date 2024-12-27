'use client';

import React, { useState } from 'react';

import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Autocomplete from '@/components/form/Autocomplete';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';

import styles from './PropertyEditForm.module.scss';

import * as v from '@/utils/validate';
import { getOptionsFromConstants } from '@/constants/constants.utils';
import { PROPERTY_TYPE, PROPERTY_TYPE_LABEL } from '@/constants';

import type { PropertyEditFormProps } from './PropertyEditForm.types';
import type { PropertyType } from '@prisma/client';
import type { AnyObject } from '@/typings';
import type { TableColumns } from '@/components/Table';

import { useForm, textInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useArray from '@/hooks/useArray';
import useOnMount from '@/hooks/useOnMount';
import useMessage from '@/features/message/hooks/useMessage';

import { propertyGetDetails, propertyUpdate, propertyCreate } from '@/features/property/routes';
import { measureSuggest } from '@/features/measure/routes';

export default function PropertyEditForm(props: PropertyEditFormProps) {
    const { notifyError, notifySuccess } = useNotification();
    const { prompt, confirm } = useMessage();

    const router = useRouter();

    const form = useForm<{
        name: string;
        description: string | null;
        type: PropertyType;
        measure: {
            id: integer;
            name: string;
        } | null;
    }>({
        initialState: {
            name: '',
            description: null,
            type: PROPERTY_TYPE.STRING,
            measure: null,
        },
        schema: v.object({
            name: v.sr(),
            description: v.sn(),
            type: v.constant(PROPERTY_TYPE),
        }),
    });

    const meta = useForm<AnyObject>({
        initialState: {},
        schema: v.object({}),
    });

    interface OptionsTableItem {
        id?: integer;
        name: string;
    }
    const options = useArray<OptionsTableItem>([]);
    const addNewOption = async () => {
        const newName = await prompt('Введите название нового варианта');
        if (newName.ok) {
            options.push({ name: newName.input });
        }
    };
    const deletePropertyOption = async (index: integer) => {
        const result = await confirm('Вы уверены, что хотите удалить свойство?');
        if (result.ok) {
            options.remove(index);
        }
    };

    const columns: TableColumns<OptionsTableItem> = [
        {
            title: 'ID',
            render: ({ id }) => id || '-',
        },
        {
            title: 'Название',
            render: ({ name }) => name,
        },
        {
            title: 'Действия',
            render: (propertyOption, index) => (
                <Button
                    color="danger"
                    variant="link"
                    size="sm"
                    onClick={() => deletePropertyOption(index)}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    const loadForm = async () => {
        if (props.isCreate) {
            return;
        }

        const response = await propertyGetDetails({ propertyId: props.propertyId });
        if (!response.isSuccess) {
            notifyError(response.message);
            router.back();
            return;
        }
        form.setState({
            ...response.data,
        });
        meta.setState(response.data.meta || {});
        options.set(response.data.options);
    };

    useOnMount(() => {
        loadForm();
    });

    const { value: measures, set: setMeasures } = useArray<{ id: integer; name: string }>([]);
    const [measureInputValue, setMeasureInputValue] = useState('');
    const onMeasuresInputChange = async (value: string) => {
        setMeasureInputValue(value);
        const response = await measureSuggest({ query: value });
        if (response.isSuccess) {
            setMeasures(response.data);
        }
    };

    const handelCancel = () => {
        router.back();
    };

    const handleApply = async () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }

        let response;
        if (props.isEdit) {
            response = await propertyUpdate({
                ...form.serverState,
                propertyId: props.propertyId,
                meta: meta.serverState,
                options: options.value,
            });
        } else {
            response = await propertyCreate({
                ...form.serverState,
                meta: meta.serverState,
                options: options.value,
            });
        }
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        router.push('/admin/property');
    };

    return (
        <div>
            <Form action={handleApply}>
                <Title level={2} className="mb-lg">
                    Информация о свойстве
                </Title>
                <Row gapX="md" gapY="md">
                    <Col md={6}>
                        <FormItem label="Название" required>
                            <Input {...form.register('name', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Описание">
                            <Input {...form.register('description', textInput)} />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Тип" required>
                            <Select
                                {...form.register('type')}
                                options={getOptionsFromConstants(PROPERTY_TYPE_LABEL)}
                            />
                        </FormItem>
                    </Col>
                    <Col md={6}>
                        <FormItem label="Единица измерения">
                            <Autocomplete
                                {...form.register('measure')}
                                inputValue={measureInputValue}
                                options={measures}
                                onGetValue={(option) => option.id}
                                onGetLabel={(option) => option.name}
                                onInputChange={(value) => onMeasuresInputChange(value)}
                            />
                        </FormItem>
                    </Col>
                </Row>

                <Title level={2} className="mt-xl mb-lg">
                    Информация для заполнения
                </Title>
                <div>
                    {form.serverState.type === PROPERTY_TYPE.STRING && (
                        <Row gapX="md" gapY="md">
                            <Col md={6}>
                                <FormItem label="Максимальная длинна" required>
                                    <InputNumber {...meta.register('maxLength')} />
                                </FormItem>
                            </Col>
                            <Col md={6}>
                                <FormItem label="Минимальная длинна" required>
                                    <InputNumber {...meta.register('minLength')} />
                                </FormItem>
                            </Col>
                        </Row>
                    )}

                    {form.serverState.type === PROPERTY_TYPE.NUMBER && (
                        <Row gapX="md" gapY="md">
                            <Col md={6}>
                                <FormItem label="Максимальное значение" required>
                                    <InputNumber {...meta.register('max')} />
                                </FormItem>
                            </Col>
                            <Col md={6}>
                                <FormItem label="Минимальное значение" required>
                                    <InputNumber {...meta.register('min')} />
                                </FormItem>
                            </Col>
                        </Row>
                    )}

                    {form.serverState.type === PROPERTY_TYPE.SELECT && (
                        <div>
                            <Table columns={columns} data={options.value} />
                            <Button onClick={addNewOption} className="mt-md">
                                Добавить вариант
                            </Button>
                        </div>
                    )}
                </div>

                <Flex justify="flex-end" gapX="md" className="mt-xl">
                    <div>
                        <Button onClick={handelCancel}>Отмена</Button>
                    </div>
                    <div>
                        <Button type="submit">
                            {props.isCreate && 'Добавить'}
                            {props.isEdit && 'Сохранить'}
                        </Button>
                    </div>
                </Flex>
            </Form>
        </div>
    );
}
