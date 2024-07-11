// 'use client';

// import React, { useState } from 'react';
// import './Autocomplete.scss';
// import Input from '../Input';
// import classNames from 'classnames';
// import { AutocompleteProps } from './Autocomplete.types';
// import { useUncontrolledProp } from 'uncontrollable';
// import OptionList from '@/components/floating/OptionList';
// import Icon from '@/components/Icon';
// import FormContext from '@/components/form/Form/Form.context';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import useOptionsList from '@/components/floating/OptionList/OptionsList.hooks';

// const Autocomplete = (props: AutocompleteProps) => {
//     const { options, className, style, value, onChange, onClick, onKeyDown, ...otherProps } = props;

//     const [controlledValue, onControlledChange] = useUncontrolledProp(value, '', onChange);

//     const formContext = React.useContext(FormContext);
//     const optionsListId = React.useId();
//     const [isOpenPopup, setIsOpenPopup] = useState(false);
//     const { focusedItemIndex, increaseFocusItemIndex, decreaseFocusedItemIndex } = useOptionsList(options);

//     const [focused, setFocused] = useState(false);
//     const mergedDisabled = formContext?.disabled || disabled;
//     const mergedReadOnly = formContext?.readOnly || readOnly;

//     const mergedCls = classNames(
//         'autocomplete',
//         className,
//     );

//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//         onClick?.(event);
//         setIsOpenPopup(true);
//     };

//     const handleKeyDown = (event: React.KeyboardEvent) => {
//         onKeyDown?.(event);

//         const isEnter = event.keyCode === 13;
//         const isEsc = event.keyCode === 27;
//         const isArrowUp = event.keyCode === 38;
//         const isArrowDown = event.keyCode === 40;

//         if (isArrowDown) {
//             decreaseFocusedItemIndex();
//         }

//         if (isArrowUp) {
//             increaseFocusItemIndex()
//         }

//         if (isEnter) {
//             if (options[focusedItemIndex] && isOpenPopup) {
//                 onControlledChange(options[focusedItemIndex].value);
//                 setIsOpenPopup(false);
//             } else {
//                 setIsOpenPopup(!isOpenPopup);
//             }
//         }
        
//         if (isEsc) {
//             setIsOpenPopup(false);
//         }
//     };

//     return (
//         <div className="autocomplete-container">
//             <OptionList
//                 id={optionsListId}
//                 value={controlledValue}
//                 options={options}
//                 onChange={onControlledChange}
//                 open={isOpenPopup}
//                 onOpenChange={setIsOpenPopup}
//                 focusedItemIndex={focusedItemIndex}
//             >
//                 <Input
//                     {...otherProps}
//                     value={controlledValue}
//                     className={mergedCls}
//                     style={style}
//                     onClick={handleClick}
//                     onKeyDown={handleKeyDown}
//                     onChange={onControlledChange}
//                 />
//             </OptionList>

//             <Icon
//                 className="autocomplete-icon"
//                 icon={<MdOutlineKeyboardArrowDown />}
//             />
//         </div>
//     );
// };

// export default Autocomplete;
