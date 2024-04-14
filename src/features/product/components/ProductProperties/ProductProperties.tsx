import React from 'react';
import styles from './ProductProperties.module.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { ProductPropertiesProps } from './ProductProperties.types';

const ProductProperties = (props: ProductPropertiesProps) => {
    const { properties } = props;

    return (
        <Container>
            <div className={styles.container}>
                {properties.map((property, index) => (
                    <Property key={index} {...property} />
                ))}
            </div>
        </Container>
    );
};

export default ProductProperties;
