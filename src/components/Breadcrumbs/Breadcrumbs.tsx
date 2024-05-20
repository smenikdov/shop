'use client';

import React, { useMemo } from 'react';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import type { BreadcrumbsProps, BreadcrumbsItemProps } from './Breadcrumbs.types';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Flex from '@/components/Flex';
import { MdOutlineHome } from 'react-icons/md';

const PAGE_NAMES: {
    [key: string]: string;
} = {
    product: 'Каталог',
    my: 'Личный кабинет',
};

const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
    const { style, className, href, label, separator, ...otherProps } = props;
    const mergedCls = classNames('breadcrumbs-item', className);

    return (
        <React.Fragment>
            <li className={mergedCls} style={style} {...otherProps}>
                <Link href={href}>{label}</Link>
            </li>
            {separator}
        </React.Fragment>
    );
};

const Breadcrumbs = (props: BreadcrumbsProps) => {
    const {
        separator = <div className="px-xs">/</div>,
        style,
        className,
        children,
        items,
        ...otherProps
    } = props;

    const paths = usePathname();

    const mergedCls = classNames('breadcrumbs', className);

    let crumbs: React.ReactNode;

    if (items) {
        crumbs = items.map((item, index) => (
            <BreadcrumbsItem
                key={index}
                {...item}
                separator={items.length !== index + 1 && separator}
            />
        ));
    }

    if (!items) {
        const pathNames = paths.split('/').filter((path) => path);
        crumbs = (
            <React.Fragment>
                <BreadcrumbsItem
                    label={<Icon icon={<MdOutlineHome />} />}
                    href="/"
                    separator={pathNames.length > 0 && separator}
                />
                {pathNames.map((link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    return (
                        <BreadcrumbsItem
                            key={index}
                            label={PAGE_NAMES[link] || link}
                            href={href}
                            separator={pathNames.length !== index + 1 && separator}
                        />
                    );
                })}
            </React.Fragment>
        );
    }

    return (
        <nav className={mergedCls} style={style} {...otherProps}>
            <Flex component="ol" align="center">
                {crumbs}
            </Flex>
        </nav>
    );
};

export default Breadcrumbs;
