import React, { RefObject, useCallback, useEffect, useState } from 'react';

export type Side = 'top' | 'left' | 'right' | 'bottom';

export type Alignment = 'start' | 'end' | 'center';

type Axis = 'x' | 'y';

type Length = 'width' | 'height';

type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

interface Placement {
    left: string;
    top: string;
    right: string;
    bottom: string;
    transform: string;
}

interface UseTooltipProps {
    containerReference: RefObject<HTMLElement>;
    floatingReference: RefObject<HTMLElement>;
    isVisible?: boolean;
    side?: Side;
    alignment?: Alignment;
    offset?: number;
    flip?: boolean;
    shift?: boolean;
}

const getIsTopOrBottom = (side: Side): Boolean => {
    return ['top', 'bottom'].includes(side);
};

const computePlacement = (side: Side, alignment: Alignment): Placement => {
    const isTopOrBottom = getIsTopOrBottom(side);

    const placement: Placement = {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        transform: 'none',
    };

    switch (side) {
        case 'bottom':
            placement.top = '100%';
            break;
        case 'right':
            placement.left = '100%';
            break;
        case 'left':
            placement.right = '100%';
            break;
        case 'top':
        default:
            placement.bottom = '100%';
            break;
    }

    switch (alignment) {
        case 'start':
            if (isTopOrBottom) {
                placement.left = '0';
            } else {
                placement.top = '0';
            }
            break;
        case 'end':
            if (isTopOrBottom) {
                placement.right = '0';
            } else {
                placement.bottom = '0';
            }
            break;
        case 'center':
        default:
            if (isTopOrBottom) {
                placement.right = '0';
                placement.left = '0';
            } else {
                placement.bottom = '0';
                placement.top = '0';
            }
            break;
    }

    return placement;
};

const useFloating = ({
    containerReference,
    floatingReference,
    isVisible,
    side = 'top',
    alignment = 'center',
    offset = 0,
    flip = false,
    shift = false,
}: UseTooltipProps) => {
    const [placement, setPlacement] = useState<Placement>({
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
        transform: 'none',
    });

    const updatePosition = () => {
        if (!containerReference.current || !floatingReference.current) {
            return;
        }
        const computedPlacement = computePlacement(side, alignment);

        if (flip) {
            const screenPadding = 16;

            const placeholderRect = containerReference.current.getBoundingClientRect();
            const dropdownRect = floatingReference.current.getBoundingClientRect();

            const dropdownRightX = dropdownRect.x + dropdownRect.width;
            const placeholderRightX = placeholderRect.x + placeholderRect.width;

            // if (dropdownRect.x < 0) {
            //     computedPlacement.left = '0';
            //     computedPlacement.right = 'auto';
            //     computedPlacement.transform = `translateX(${-placeholderRect.x + screenPadding}px)`;
            // } else if (dropdownRightX > window.outerWidth) {
            //     computedPlacement.left = 'auto';
            //     computedPlacement.right = '0';
            //     computedPlacement.transform = `translateX(${window.outerWidth - placeholderRightX - screenPadding}px)`;
            // }
        }

        setPlacement(computedPlacement);
    };

    useEffect(() => {
        if (isVisible) {
            updatePosition();
        }
    }, [isVisible, containerReference, floatingReference]);

    return {
        floatingStyles: {
            ...placement,
            position: 'absolute',
        },
    };
};

export default useFloating;
