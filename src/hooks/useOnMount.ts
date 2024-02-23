import { useEffect } from 'react';

const useOnMount = (effect: React.EffectCallback) => {
    return useEffect(effect, []);
};

export default useOnMount;
