'use client';

import React, { useState } from 'react';

import Image from '@/components/Image';
import Flex from '@/components/Flex';

import type { ProductImagesProps } from './ProductImages.types';

import styles from './ProductImages.module.scss';

import classNames from 'classnames';

const ProductImages = (props: ProductImagesProps) => {
    const { images } = props;
    const [mainImageIndex, setMainImageIndex] = useState(0);

    return (
        <Flex className={styles.container} align="stretch">
            <div className={styles.list}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={classNames(styles.item, {
                            [styles.selected]: index === mainImageIndex,
                        })}
                        onClick={() => setMainImageIndex(index)}
                    >
                        <Image src={image} width={68} height={68} alt="TODO" />
                    </div>
                ))}
            </div>

            <div className={styles.rightPart}>
                <div className={styles.mainWrap}>
                    <Image className={styles.mainImage} src={images[mainImageIndex]} fill alt="TODO" />
                </div>
            </div>
        </Flex>
    );
};

export default ProductImages;
