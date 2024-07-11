import type React from 'react';

export interface ModalTemplateProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;

    isOpen: boolean;

    // portalClassName?: string;
    bodyOpenClassName?: string;

    style?: React.CSSProperties;
    className?: string;

    overlayClassName?: string;

    onAfterOpen?: Function;
    onAfterClose?: Function;
    onClose?: Function;

    shouldFocusAfterRender?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    shouldReturnFocusAfterClose?: boolean;

    // preventScroll?: boolean;
    role?: string;
    shouldCloseOnEsc?: boolean;
}
