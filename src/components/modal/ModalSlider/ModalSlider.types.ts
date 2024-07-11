import type React from 'react';

export interface ModalSliderProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    isOpen: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClose?: Function;
}
