'use client';

import React from 'react';
import Flex from '@/components/Flex';
import Button from '@/components/Button';

import type { TestRequestButtonProps } from './TestRequestButton.types';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import styles from './TestRequestButton.module.scss';
import classNames from 'classnames';

const TestRequestButton = (props: TestRequestButtonProps) => {
    const { name } = props;

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleRequestClick = async () => {
        const params = new URLSearchParams(searchParams);
        params.set('name', name);
        router.replace(`${pathname}?${params}`);
    };

    return <Button onClick={handleRequestClick}>{name}</Button>;
};

export default TestRequestButton;
