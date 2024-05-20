import React from 'react';
import Title from '@/components/typography/Title';
import Flex from '@/components/Flex';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';

import type { StylePaletteProps } from './StylePalette.types';

import styles from './StylePalette.module.scss';
import classNames from 'classnames';

const StylePalette = (props: StylePaletteProps) => {
    const { color = 'primary', className, ...otherProps } = props;

    return (
        <div {...otherProps} className={classNames(styles.container, className)}>
            <div className={classNames(styles.colors, styles[`colors-${color}`])}>
                <div className={styles.mainColor} />
                <Flex>
                    <div className={styles.color} />
                    <div className={styles.color} />
                    <div className={styles.color} />
                    <div className={styles.color} />
                    <div className={styles.color} />
                </Flex>
            </div>
            <Title level={4}>{color}</Title>
        </div>
    );
};

export default StylePalette;
