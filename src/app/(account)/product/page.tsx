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
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Input';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductList from '@/features/product/components/ProductList';

import { productGetAllPublish } from '@/features/product/routes';

export const metadata: Metadata = {
    title: 'Каталог',
    description: 'Generated by create next app',
};
export default async function Product() {
    const response = await productGetAllPublish({});

    if (!response.isSuccess) {
        throw new Error('Ошибка при загрузке страницы');
    }

    const products = response.data;

    return (
        <main>
            <Container className="mt-xl mb-xs">
                <Breadcrumbs />
                <Title level={2} className="mt-sm">
                    Товары которые вам могут понравиться
                </Title>
            </Container>
            <ProductList products={products} />
        </main>
    );
}
