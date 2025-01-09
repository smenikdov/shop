'use client';

import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Checkbox from '@/components/form/Checkbox';
import Flex from '@/components/Flex';
import Table from '@/components/Table';

import type { CategoryPropertyTableProps, CategoryProperty } from './CategoryPropertyTable.types';
import type { TableColumns } from '@/components/Table';

import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';
import useArray from '@/hooks/useArray';
import useBoolean from '@/hooks/useBoolean';

import { useRouter } from 'next/navigation';

import {
    categoryPropertyCreate,
    categoryPropertyUpdate,
    categoryPropertyDelete,
    categoryPropertyGetAll,
} from '@/features/category/routes';
import CategoryPropertyCreateModal from '../CategoryPropertyCreateModal';

export default function CategoryPropertyTable({ categoryId }: CategoryPropertyTableProps) {
    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const isOpenModal = useBoolean(false);
    const categoryProperties = useArray<CategoryProperty>([]);
    const loadTable = async () => {
        const response = await categoryPropertyGetAll({ categoryId });
        if (!response.isSuccess) {
            notifyError(response.message);
            router.back();
            return;
        }
        categoryProperties.set(response.data);
    };

    useOnMount(() => {
        loadTable();
    });

    const handelCancel = () => {
        router.back();
    };

    const handleChange = async (index: integer, newCategoryProperty: CategoryProperty) => {
        const response = await categoryPropertyUpdate(newCategoryProperty);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        categoryProperties.update(index, newCategoryProperty);
    };

    const handleDelete = async (index: integer, categoryProperty: CategoryProperty) => {
        const response = await categoryPropertyDelete(categoryProperty);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        categoryProperties.remove(index);
    };

    const handleCreate = async (propertyId: integer) => {
        const response = await categoryPropertyCreate({ categoryId, propertyId });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        // TODO
        categoryProperties.push({});
    };

    const columns: TableColumns<CategoryProperty> = [
        {
            title: 'Название',
            render: ({ property }) => property.name,
        },
        {
            title: 'Обязательно?',
            render: (categoryProperty, index) => (
                <Checkbox
                    checked={categoryProperty.isRequired}
                    onChange={() =>
                        handleChange(index, {
                            ...categoryProperty,
                            isRequired: !categoryProperty.isRequired,
                        })
                    }
                />
            ),
        },
        {
            title: 'Использовать как фильтр?',
            render: (categoryProperty, index) => (
                <Checkbox
                    checked={categoryProperty.isUseAsFilter}
                    onChange={() =>
                        handleChange(index, {
                            ...categoryProperty,
                            isUseAsFilter: !categoryProperty.isUseAsFilter,
                        })
                    }
                />
            ),
        },
        {
            title: 'Действия',
            render: (categoryProperty, index) => (
                <Button
                    variant="link"
                    size="sm"
                    color="danger"
                    onClick={() => handleDelete(index, categoryProperty)}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} data={categoryProperties.value} />
            <Flex justify="flex-end" gapX="md" className="mt-sm">
                <div>
                    <Button onClick={handelCancel}>Отмена</Button>
                </div>
                <div>
                    <Button onClick={isOpenModal.setTrue}>Добавить свойство</Button>
                </div>
            </Flex>

            <CategoryPropertyCreateModal
                isOpen={isOpenModal.value}
                onClose={isOpenModal.setFalse}
                onAdd={handleCreate}
                categoryId={categoryId}
            />
        </div>
    );
}
