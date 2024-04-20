import React from 'react';
import styles from './BannerBlock.module.scss';
import classNames from 'classnames';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';

import Flex from '@/components/Flex';
import Image from '@/components/Image';
import type { BannerBlockProps } from './BannerBlock.types';

const BannerBlock = (props: BannerBlockProps) => {
    const { title, children, image, style, className, reverse = false, ...othersProps } = props;

    const mergedCls = classNames(styles.container, className);

    return (
        <Container>
            <Row direction={reverse ? 'row-reverse' : 'row'} className={mergedCls} {...othersProps}>
                <Col lg={6}>
                    <Flex className={styles.image}>
                        <Image src={image.src} alt={image.alt || ''} height={500} width={500} />
                    </Flex>
                </Col>
                <Col lg={6}>
                    <Flex className={styles.content} direction="column" justify="center">
                        {title && <Title className={styles.title}>{title}</Title>}
                        {children && <div className={styles.body}>{children}</div>}
                    </Flex>
                </Col>
            </Row>
        </Container>
    );
};

export default BannerBlock;
