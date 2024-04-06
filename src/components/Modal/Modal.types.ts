import type React from 'react';

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;

    isOpen: boolean;

    // portalClassName?: string;
    bodyOpenClassName?: string;

    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;

    style?: React.CSSProperties;
    className?: string;

    onAfterOpen?: Function;
    onAfterClose?: Function;
    onClose?: Function;
    closeTimeoutMS?: number;

    shouldFocusAfterRender?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    shouldReturnFocusAfterClose?: boolean;

    // preventScroll?: boolean;
    role?: string;
    shouldCloseOnEsc?: boolean;
}
