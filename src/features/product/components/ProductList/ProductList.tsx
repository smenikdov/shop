import React from 'react';

import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Link from '@/components/typography/Link';
import { MdStarRate } from 'react-icons/md';
import Icon from '@/components/Icon';
import Image from '@/components/Image';

import { formatNumber } from '@/utils/number';

import styles from './ProductList.module.scss';

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
                                <Chip className={styles.chip}>Распродажа</Chip>
                                <div className={styles.imageWrap}>
                                    <Image
                                        className={styles.image}
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                    />
                                </div>
                                <ProductPrice
                                    className={styles.price}
                                    price={product.price}
                                    offer={product.offer}
                                />
                                <Flex justify="space-between" align="center">
                                    <Title level={3} className={styles.name} family="plex-sans">
                                        {product.name}
                                    </Title>
                                    {/* <div>
                                        <Icon icon={<MdStarRate />} />
                                        <Text>{product.rating}</Text>
                                    </div> */}
                                </Flex>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
