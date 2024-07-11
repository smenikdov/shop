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
            xs: width >= BREAKPOINTS.XS,
            sm: width >= BREAKPOINTS.SM,
            md: width >= BREAKPOINTS.MD,
            lg: width >= BREAKPOINTS.LG,
            xl: width >= BREAKPOINTS.XL,
            xxl: width >= BREAKPOINTS.XXL,
        };
    };

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEventListener('resize', () => {
        setWindowSize(getWindowSize());
    });

    return windowSize;
};

export default useWindowSize;
