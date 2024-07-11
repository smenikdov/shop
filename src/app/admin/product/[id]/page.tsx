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
import Breadcrumbs from '@/components/Breadcrumbs';

import type { PageProps, SearchParams } from '@/typings';

import ProductEditForm from '@/features/product/components/ProductEditForm';

export const metadata: Metadata = {
    title: 'Админпанель | Редактирование товара',
    description: 'Generated by create next app',
};

export default async function ProductEdit(props: PageProps<{ id: string }>) {
    return (
        <main>
            <Container className="my-lg">
                <Breadcrumbs
                    pageNames={{ [`${ props.params.id }`]: 'Редактирование товара' }}
                    className="mb-lg"
                />
                <ProductEditForm isEdit productId={Number(props.params.id)} />
            </Container>
        </main>
    );
}
