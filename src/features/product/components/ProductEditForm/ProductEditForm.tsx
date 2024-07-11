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
import Input from '@/components/form/Input';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import styles from './ProductEditForm.module.scss';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';
import { BREAKPOINTS } from '@/constants';

import type { ProductEditFormProps } from './ProductEditForm.types';

import Step1 from './ProductEditFormStep1';
import Step2 from './ProductEditFormStep2';
import Step3 from './ProductEditFormStep3';
import Step4 from './ProductEditFormStep4';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useOnMount from '@/hooks/useOnMount';

export default function ProductEditForm(props: ProductEditFormProps) {
    const { isCreate, isEdit, productId } = props;

    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const [step, setStep] = useState(1);

    const goToNextStep = () => setStep(step + 1);
    const goToPrevStep = () => setStep(step - 1);

    const onCancel = () => {
        router.back();
    };

    const handleSubmit = () => {};

    const steps = [
        {
            value: 1,
            title: 'Информация о товаре',
            content: <Step1 onCancel={onCancel} onGoToNextStep={goToNextStep} />,
        },
        {
            value: 2,
            title: 'Характеристики',
            content: <Step2 onGoToPrevStep={goToPrevStep} onGoToNextStep={goToNextStep} />,
        },
        {
            value: 3,
            title: 'Медиа',
            content: <Step3 onGoToPrevStep={goToPrevStep} onGoToNextStep={goToNextStep} />,
        },
        {
            value: 4,
            title: 'Предварительный просмотр',
            content: <Step4 onGoToPrevStep={goToPrevStep} onSubmit={handleSubmit} />,
        },
    ];

    const loadForm = async () => {
        if (!isEdit || !productId) {
            return;
        }

        const response = await TODO({ productId });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        // form.setState(response.data);
        // TODO
    };

    useOnMount(() => {
        loadForm();
    });

    return (
        <div>
            <Stepper responsiveBreakPoint={BREAKPOINTS.LG} value={step} items={steps} />
        </div>
    );
}
