import React from 'react';
import classNames from 'classnames';
import type { TypographyProps } from './Typography.types';
import './Typography.scss';

function wrapperDecorations(
    {
        mark,
        code,
        underline,
        delete: del,
        bold,
        keyboard,
        italic,
    }: TypographyProps<keyof JSX.IntrinsicElements>,
    content: React.ReactNode
) {
    let currentContent = content;
    const wrap = (tag: string, needed?: boolean) => {
        if (!needed) {
            return;
        }
        currentContent = React.createElement(tag, {}, currentContent);
    };
    wrap('b', bold);
    wrap('u', underline);
    wrap('del', del);
    wrap('code', code);
    wrap('mark', mark);
    wrap('kbd', keyboard);
    wrap('i', italic);
    return currentContent;
}

const Typography = (props: TypographyProps<keyof JSX.IntrinsicElements>) => {
    const {
        component: Component = 'article',
        className,
        children,
        style,
        type,
        ...otherProps
    } = props;

    const mergedCls = classNames('typography', { [`typography-${type}`]: type }, className);

    return (
        <Component className={mergedCls} style={style} {...otherProps}>
            {wrapperDecorations(props, children)}
        </Component>
    );
};

export default Typography;
