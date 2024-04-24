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
                        <div className={styles.product}>
                            <Chip></Chip>
                            <Image src={product.image} alt={product.name} />
                            <Flex justify="space-between">
                                <Title level={3}>{product.name}</Title>
                                <div>
                                    <Icon icon={<MdStarRate />} />
                                    <Text>{product.rating}</Text>
                                </div>
                            </Flex>
                            <ProductPrice
                                price={product.price}
                                prevPrice={product.prevPrice}
                                discount={product.discount}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
