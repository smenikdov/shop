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
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductList from '@/features/product/components/ProductList';
import Result from '@/components/Result';
import { productGetAll } from '@/features/product/routes';

export const metadata: Metadata = {
    title: 'Каталог',
    description: 'Generated by create next app',
};
export default async function Product() {
    const response = await productGetAll({});
    if (!response.isSuccess || !response.data) {
        return <Result response={response} />;
    }

    const products = response.data;

    return (
        <main>
            <Container className="mt-xl mb-xs">
                <Breadcrumbs />
            </Container>
            <ProductList products={products} />
        </main>
    );
}
