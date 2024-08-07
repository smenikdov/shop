import type { Metadata } from 'next';

import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Empty from '@/components/Empty';
import Result from '@/components/Result';
import Button from '@/components/Button';
import Tooltip from '@/components/floating/Tooltip';
import styles from './page.module.css';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import Table from '@/components/Table';
import Flex from '@/components/Flex';

import OrdersListFilters from '@/features/order/components/OrderListFilters';

import type { PageProps, SearchParams } from '@/typings';
import type { TableColumnsFor } from '@/components/Table';

import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { orderGetAll } from '@/features/order/routes';

export const metadata: Metadata = {
    title: 'Админпанель | Заказы',
    description: 'Generated by create next app',
};

const getOrders = async (params?: SearchParams) => {
    const response = await orderGetAll({
        page: psp.integer(params?.page) || 1,
        orderId: psp.integer(params?.orderId),
    });
    if (!response.isSuccess) {
        throw new Error('Ошибка при загрузке страницы');
    }

    return response.data;
};

const columns: TableColumnsFor<typeof getOrders> = [
    {
        title: 'ID',
        render: ({ id }) => id,
    },
    {
        title: 'Заказчик',
        render: ({ fio }) => <Link>{fio}</Link>,
    },
    {
        title: 'Статус',
        render: ({ status }) => status,
    },
    {
        title: 'Сумма',
        render: ({ total }) => total,
    },
    {
        title: 'Действия',
        render: ({ id }) => (
            <Button href={`/admin/order/${id}`} variant="link" size="sm">
                Подробнее
            </Button>
        ),
    },
];

export default async function Order(props: PageProps) {
    const orders = await getOrders(props.searchParams);

    return (
        <main>
            <Container className="mt-lg">
                <OrdersListFilters />
                <Table columns={columns} data={orders} />
            </Container>
        </main>
    );
}
