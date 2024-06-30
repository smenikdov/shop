import { useState } from 'react';
import useEventListener from './useEventListener';

import { BREAKPOINTS } from '@/constants';

const useWindowSize = () => {
    const getWindowSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            width: width,
            height: height,
            xs: width >= BREAKPOINTS.xs,
            sm: width >= BREAKPOINTS.sm,
            md: width >= BREAKPOINTS.md,
            lg: width >= BREAKPOINTS.lg,
            xl: width >= BREAKPOINTS.xl,
            xxl: width >= BREAKPOINTS.xxl,
        };
    };

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEventListener('resize', () => {
        setWindowSize(getWindowSize());
    });

    return windowSize;
};

export default useWindowSize;
