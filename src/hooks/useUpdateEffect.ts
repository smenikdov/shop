import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

const useUpdateEffect = (callback: EffectCallback, dependencies: DependencyList) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
};

export default useUpdateEffect;
