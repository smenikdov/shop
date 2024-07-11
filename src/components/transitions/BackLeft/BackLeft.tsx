'use client';

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './BackLeft.scss';
import { BackLeftProps } from './BackLeft.types';

const BackLeft = ({ isVisible, children }: BackLeftProps) => {
    const overlayRef = React.useRef(null);

    return (
        <CSSTransition
            nodeRef={overlayRef}
            classNames="back-left"
            in={isVisible}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div ref={overlayRef}> {children} </div>
        </CSSTransition>
    );
};

export default BackLeft;
