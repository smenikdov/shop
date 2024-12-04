import { MutableRefObject, useEffect } from 'react';

function useOutsideClickHandler(refs: Array<MutableRefObject<any>>, onClick: Function): void {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
                onClick(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, onClick]);
}

export default useOutsideClickHandler;
