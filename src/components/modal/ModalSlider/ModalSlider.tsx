'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalSlider.scss';
import classNames from 'classnames';
import BackLeft from '@/components/transitions/BackLeft';
import Icon from '@/components/Icon';
import Title from '@/components/typography/Title';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import ModalTemplate from '../ModalTemplate';

import type { ModalSliderProps } from './ModalSlider.types';

import useMounted from '@/hooks/useMounted';

import { MdClose } from "react-icons/md";

const ModalSlider = (props: ModalSliderProps) => {
    const {
        children,
        title,
        isOpen,
        style,
        className,
        onClose,
        ...othersProps
    } = props;

    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    const mergedCls = classNames(className, 'modal-slider');

    return (
        <ModalTemplate {...othersProps} isOpen={isOpen} onClose={onClose} className={mergedCls} overlayClassName="modal-slider-overlay">
            <div className="modal-slider-content">
                <Flex className="modal-slider-header" justify="space-between">
                    <Button
                        shape="circle"
                        variant="text"
                        className="modal-slider-close"
                        icon={<MdClose />}
                        onClick={() => onClose?.()}
                    />
                    <Title level={2} className="modal-slider-title">
                        {title}
                    </Title>
                </Flex>

                <div className="modal-slider-body">
                    {children}
                </div>
            </div>
        </ModalTemplate>
    );
};

export default ModalSlider;
