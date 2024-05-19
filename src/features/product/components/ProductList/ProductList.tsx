import React from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import styles from './ProductList.module.scss';
import { formatNumber } from '@/utils/number';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import { MdStarRate } from 'react-icons/md';
import Icon from '@/components/Icon';
import Image from '@/components/Image';

import ProductPrice from '../ProductPrice';

import type { ProductListProps } from './ProductList.types';

const ProductList = (props: ProductListProps) => {
    const { products } = props;

    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={6} md={4} lg={3}>
                        <Link href={`/product/${product.id}`}>
                            <div className={styles.product}>
                                {/* <Chip>скидка 33%</Chip> */}
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                />
                                <Flex justify="space-between">
                                    <Title level={3}>{product.name}</Title>
                                    <div>
                                        <Icon icon={<MdStarRate />} />
                                        <Text>{product.rating}</Text>
                                    </div>
                                </Flex>
                                <ProductPrice price={product.price} offer={product.offer} />
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
