import { useState } from 'react';

const useBoolean = (defaultValue: boolean = false) => {
    const [value, set] = useState(defaultValue);

    const toggle = () => set(value => !value);

    const setTrue = () => set(true);

    const setFalse = () => set(false);

    return { value, set, toggle, setTrue, setFalse };
};

export default useBoolean;