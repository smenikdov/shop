'use client';

import React, { useState } from 'react';

import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Empty from '@/components/Empty';
import Button from '@/components/Button';
import Tooltip from '@/components/floating/Tooltip';
import styles from './page.module.css';
import Input from '@/components/form/Input';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ProductCreateFormStep3Props {
    onGoToPrevStep: () => void;
    onSubmit: () => void;
};

export default function ProductCreateFormStep4(props: ProductCreateFormStep3Props) {
    const { onGoToPrevStep, onSubmit } = props; 
    const { notifyError, notifySuccess } = useNotification();

    const handleApplyFilters = () => {
        onSubmit();
    };

    return (
        <div>
            <Flex justify="flex-end" gapX="md" className="mt-sm">
                <div>
                    <Button onClick={onGoToPrevStep}>Назад</Button>
                </div>
                <div>
                    <Button onClick={handleApplyFilters}>Создать</Button>
                </div>
            </Flex>
        </div>
    );
}
