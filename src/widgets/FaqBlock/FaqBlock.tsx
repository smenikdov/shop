import React from 'react';
import styles from './FaqBlock.module.scss';
import classNames from 'classnames';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import Container from '@/components/grid/Container';
import Flex from '@/components/Flex';
import Accordion from '@/components/Accordion';
import type { FaqBlockProps } from './FaqBlock.types';

const FaqBlock = (props: FaqBlockProps) => {
    const { className, title, content, before, after, questions, ...othersProps } = props;

    const mergedCls = classNames(styles.container, className);

    const accordionItems = questions.map((q) => ({
        header: q.question,
        content: q.answer,
    }));

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

                <Accordion className={styles.accordion} items={accordionItems} />

                {after && (
                    <Flex className={styles.after} justify="center">
                        {after}
                    </Flex>
                )}
            </div>
        </Container>
    );
};

export default FaqBlock;
