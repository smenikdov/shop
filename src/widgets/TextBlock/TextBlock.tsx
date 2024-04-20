import React from 'react';
import styles from './TextBlock.module.scss';
import classNames from 'classnames';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Container from '@/components/grid/Container';
import Flex from '@/components/Flex';
import type { TextBlockProps } from './TextBlock.types';

const TextBlock = (props: TextBlockProps) => {
    const { className, title, content, before, after, ...othersProps } = props;

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
                    <Paragraph className={styles.content} align="center">
                        {content}
                    </Paragraph>
                )}

                {after && (
                    <Flex className={styles.after} justify="center">
                        {after}
                    </Flex>
                )}
            </div>
        </Container>
    );
};

export default TextBlock;
