import React from 'react';
import classNames from 'classnames';
import type { TypographyProps } from './Typography.types';
import './Typography.scss';
import { plexSerif, plexSans } from '@/ui/fonts';
import NextLink from 'next/link';

function wrapperDecorations(
    props: TypographyProps<keyof JSX.IntrinsicElements>,
    content: React.ReactNode
) {
    let currentContent = content;
    const wrap = (tag: string, needed?: boolean) => {
        if (!needed) {
            return;
        }
        currentContent = React.createElement(tag, {}, currentContent);
    };
    wrap('b', props.bold);
    wrap('u', props.underline);
    wrap('del', props.delete);
    wrap('code', props.code);
    wrap('mark', props.mark);
    wrap('kbd', props.keyboard);
    wrap('i', props.italic);
    return currentContent;
}

const Typography = (props: TypographyProps<keyof JSX.IntrinsicElements>) => {
    const {
        component: Component = 'article',
        className,
        children,
        style,
        color,
        align,
        family,

        mark,
        code,
        underline,
        delete: del,
        bold,
        keyboard,
        italic,

        ...otherProps
    } = props;

    const mergedCls = classNames(
        'typography',
        { [`typography-align-${align}`]: align },
        { [`typography-${color}`]: color },
        { [plexSans.className]: family === 'plex-sans' },
        { [plexSerif.className]: family === 'plex-serif' },
        className
    );

    return (
        <Component className={mergedCls} style={style} {...otherProps}>
            {wrapperDecorations(props, children)}
        </Component>
    );
};

export default Typography;
