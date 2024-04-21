import React from 'react';
import styles from './AdvantagesBlock.module.scss';
import classNames from 'classnames';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Text from '@/components/typography/Text';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Flex from '@/components/Flex';
import type { AdvantagesBlockProps } from './AdvantagesBlock.types';
import Image from '@/components/Image';

const AdvantagesBlock = (props: AdvantagesBlockProps) => {
    const { className, title, content, advantages = [], before, after, ...othersProps } = props;

    const mergedCls = classNames(styles.container, className);

    return (
        <Container>
            <div className={mergedCls} {...othersProps}>
                {before && (
                    <Flex className={styles.before} justify="center">
                        {before}
                    </Flex>
                )}

                {title && (
                    <Title className={styles.title} align="center" level={2}>
                        {title}
                    </Title>
                )}

                {content && (
                    <Flex className={styles.content} justify="center">
                        {content}
                    </Flex>
                )}

                <Row>
                    {advantages.map((advantage, index) => (
                        <Col key={index} md={6} lg={3}>
                            {advantage.image && (
                                <Image
                                    src={advantage.image}
                                    alt="Иконка"
                                    width={200}
                                    height={200}
                                />
                            )}
                            {advantage.content && (
                                <div className={styles.label}>{advantage.content}</div>
                            )}
                        </Col>
                    ))}
                </Row>

                {after && (
                    <Flex className={styles.after} justify="center">
                        {after}
                    </Flex>
                )}
            </div>
        </Container>
    );
};

export default AdvantagesBlock;
