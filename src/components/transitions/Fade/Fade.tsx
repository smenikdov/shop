'use client';

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.scss';
import { FadeProps } from './Fade.types';

const Fade = ({ isVisible, children }: FadeProps) => {
    const overlayRef = React.useRef(null);

    return (
        <CSSTransition
            nodeRef={overlayRef}
            classNames="fade"
            in={isVisible}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div ref={overlayRef}> {children} </div>
        </CSSTransition>
    );
};

export default Fade;
