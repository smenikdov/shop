'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import classNames from 'classnames';
import useOnMount from '@/hooks/useOnMount';

import type { ModalProps } from './Modal.types';

const Modal = (props: ModalProps) => {
    const {
        isOpen: isOpenProp = false,
        // portalClassName,
        bodyOpenClassName = 'overflow-hidden',
        role = 'dialog',
        closeTimeoutMS = 300,
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
    const [beforeClose, setBeforeClose] = useState(false);

    const open = () => {
        bodyOpenClassName && document.body.classList.add(bodyOpenClassName);
        setIsOpen(true);
        if (onAfterOpen) {
            onAfterOpen();
        }
    };

    const close = () => {
        setBeforeClose(true);
        setTimeout(() => {
            setBeforeClose(false);
            setIsOpen(false);
            bodyOpenClassName && document.body.classList.remove(bodyOpenClassName);
            if (onAfterClose) {
                onAfterClose();
            }
        }, closeTimeoutMS);
    };

    useEffect(() => {
        if (isOpenProp) {
            open();
        } else {
            close();
        }
    }, [isOpenProp]);

    const mergedCls = classNames(className, 'modal-content', {
        [`modal-before-close`]: beforeClose,
    });

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (shouldCloseOnOverlayClick) {
            onClose?.(event);
        }
    };

    const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const isTabKey = event.code === 'Tab' || event.keyCode === 9;
        const isEscKey = event.code === 'Escape' || event.keyCode === 27;

        if (isTabKey) {
            // scopeTab(this.content, event);
        }

        if (shouldCloseOnEsc && isEscKey) {
            event.stopPropagation();
            onClose?.(event);
        }
    };

    if (!isOpen) {
        return null;
    }

    return createPortal(
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
        </div>,
        document.body
    );
};

export default Modal;
