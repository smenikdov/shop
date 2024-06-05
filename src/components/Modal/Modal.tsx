'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import classNames from 'classnames';
import Fade from '@/components/transitions/Fade';

import type { ModalProps } from './Modal.types';

const Modal = (props: ModalProps) => {
    const {
        isOpen: isOpenProp = false,
        // portalClassName,
        bodyOpenClassName = 'overflow-hidden',
        role = 'dialog',
        shouldFocusAfterRender = true,
        shouldCloseOnEsc = true,
        shouldCloseOnOverlayClick = true,
        shouldReturnFocusAfterClose = true,
        // preventScroll = false,
        className,
        style,
        overlayClassName,
        overlayStyle,
        children,
        onClose,
        onAfterOpen,
        onAfterClose,
        ...othersProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        bodyOpenClassName && document.body.classList.add(bodyOpenClassName);
        setIsOpen(true);
        if (onAfterOpen) {
            onAfterOpen();
        }
    };

    const close = () => {
        setIsOpen(false);
        bodyOpenClassName && document.body.classList.remove(bodyOpenClassName);
        if (onAfterClose) {
            onAfterClose();
        }
    };

    useEffect(() => {
        if (isOpenProp) {
            open();
        } else {
            close();
        }
    }, [isOpenProp]);

    const mergedCls = classNames(className, 'modal-content');

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (shouldCloseOnOverlayClick) {
            onClose?.(event);
        }
    };

    const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const isTabKey = event.keyCode === 9;
        const isEscKey = event.keyCode === 27;

        if (isTabKey) {
            // scopeTab(this.content, event);
        }

        if (shouldCloseOnEsc && isEscKey) {
            event.stopPropagation();
            onClose?.(event);
        }
    };

    return createPortal(
        <Fade isVisible={isOpen}>
            <div
                className={classNames('modal-overlay', overlayClassName)}
                style={overlayStyle}
                onClick={handleOverlayClick}
            >
                <div
                    tabIndex={-1}
                    className={mergedCls}
                    style={style}
                    role={role}
                    onKeyDown={handleKeyDown}
                    onClick={handleContentClick}
                    {...othersProps}
                >
                    {children}
                </div>
            </div>
        </Fade>,
        document.body
    );
};

export default Modal;
