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
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';
import Rating from '@/components/form/Rating';

import { PageProps } from '@/typings';

import ProductPrice from '@/features/product/components/ProductPrice';
import ProductAdvantagesList from '@/features/product/components/ProductAdvantagesList';
import ProductProperties from '@/features/product/components/ProductProperties';
import ProductDescription from '@/features/product/components/ProductDescription';
import ProductImages from '@/features/product/components/ProductImages';
import ProductMainButton from '@/features/product/components/ProductMainButton';

import BannerBlock from '@/widgets/BannerBlock';

import { productGetOne } from '@/features/product/routes';

export const metadata: Metadata = {
    title: 'Страница товара',
    description: 'Generated by create next app',
};

export default async function Product(props: PageProps<{ id: number }>) {
    const response = await productGetOne({ productId: Number(props.params.id) });
    if (!response.isSuccess) {
        throw new Error('Ошибка при загрузке страницы');
    }
    const product = response.data;

    return (
        <main>
            <Container className="mt-xl mb-xs">
                <Flex justify="space-between">
                    <Breadcrumbs />
                    <div>
                        <Text color="muted">Код товара: {product.id}</Text>
                    </div>
                </Flex>
            </Container>

            <Container>
                <Row>
                    <Col xl={7}>
                        <ProductImages images={product.images} />
                    </Col>
                    <Col xl={5}>
                        <div>
                            <Title level={1}>{product.name}</Title>
                            <Flex>
                                <Rating rating={product.rating} readOnly />
                                <Text color="muted">({product.rating})</Text>
                            </Flex>
                            <ProductPrice price={product.price} offer={product.offer} />
                            <ProductMainButton product={product} />
                            <Paragraph>{product.shortDescription}</Paragraph>
                            {/* <ProductAdvantagesList advantages={product.advantages} /> */}
                        </div>
                    </Col>
                </Row>
            </Container>

            {product.longDescription && (
                <ProductDescription description={product.longDescription} />
            )}
            {/* {product.properties.length > 0 && <ProductProperties properties={product.properties} />} */}
        </main>
    );
}
