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
    const {
        title,
        content,
        image,
        style,
        className,
        reverse = false,
        before,
        after,
        ...othersProps
    } = props;

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
                    <Flex className={styles.body} direction="column" justify="center">
                        {before && <div className={styles.before}>{before} </div>}
                        {title && <Title className={styles.title}>{title}</Title>}
                        {content && <div className={styles.content}>{content}</div>}
                        {after && <div className={styles.after}>{after}</div>}
                    </Flex>
                </Col>
            </Row>
        </Container>
    );
};

export default BannerBlock;
