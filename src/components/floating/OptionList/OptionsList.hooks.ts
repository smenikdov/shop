import { useState } from "react";
import type { Options } from "./OptionList.types";

const useOptionsList = (options: Options) => {
    const [focusedItemIndex, setFocusedItemIndex] = useState(-1);

    const increaseFocusItemIndex = () => {
        if (focusedItemIndex === -1) {
            setFocusedItemIndex(options.length - 1);
        } else {
            setFocusedItemIndex(focusedItemIndex > 0 ? focusedItemIndex - 1 : options.length - 1);
        }
    };

    const decreaseFocusedItemIndex = () => {
        if (focusedItemIndex === -1) {
            setFocusedItemIndex(0);
        } else {
            setFocusedItemIndex(focusedItemIndex + 1 < options.length ? focusedItemIndex + 1 : 0);
        }
    };

    return { focusedItemIndex, setFocusedItemIndex, increaseFocusItemIndex, decreaseFocusedItemIndex };
};

export default useOptionsList;