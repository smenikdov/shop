'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalDialog.scss';
import classNames from 'classnames';
import Fade from '@/components/transitions/Fade';
import Icon from '@/components/Icon';
import Title from '@/components/typography/Title';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import ModalTemplate from '../ModalTemplate';

import type { ModalDialogProps } from './ModalDialog.types';

import { MdClose } from 'react-icons/md';

const ModalDialog = (props: ModalDialogProps) => {
    const { children, title, isOpen, style, className, onClose, ...othersProps } = props;

    const mergedCls = classNames(className, 'modal-dialog');

    return (
        <ModalTemplate
            {...othersProps}
            isOpen={isOpen}
            onClose={onClose}
            className={mergedCls}
            overlayClassName="modal-dialog-overlay"
        >
            <div className="modal-dialog-content">
                <Flex className="modal-dialog-header" justify="space-between">
                    <Title level={2} className="modal-dialog-title">
                        {title}
                    </Title>
                    <Button
                        shape="circle"
                        variant="text"
                        className="modal-dialog-close"
                        icon={<MdClose />}
                        onClick={() => onClose?.()}
                    />
                </Flex>

                <div className="modal-dialog-body">{children}</div>
            </div>
        </ModalTemplate>
    );
};

export default ModalDialog;
