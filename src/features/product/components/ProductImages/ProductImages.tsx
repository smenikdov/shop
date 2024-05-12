'use client';

import React, { useState } from 'react';
import styles from './ProductImages.module.scss';
import Image from '@/components/Image';
import Flex from '@/components/Flex';
import classNames from 'classnames';
import type { ProductImagesProps } from './ProductImages.types';

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
                        <Image src={image} width={68} height={68} />
                    </div>
                ))}
            </div>

            <div className={styles.main}>
                <Image src={images[mainImageIndex]} fill />
            </div>
        </Flex>
    );
};

export default ProductImages;
