import React from 'react';
import styles from './ProductDescription.module.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { ProductDescriptionProps } from './ProductDescription.types';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';

const ProductProperties = (props: ProductDescriptionProps) => {
    const { description } = props;

    return (
        <Container>
            <Title level={2}>Описание</Title>
            <Paragraph className={styles.container}>{description}</Paragraph>
        </Container>
    );
};

export default ProductProperties;
