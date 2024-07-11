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
import Select from '@/components/form/Select';
import InputMask from '@/components/form/InputMask';
import InputNumber from '@/components/form/InputNumber';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Result from '@/components/Result';
import Stepper from '@/components/Stepper';

import styles from './PropertyEditOptionModal.module.scss';

import * as v from '@/utils/validate';
import { formatPhoneNumber } from '@/utils/text';
import { parseSearchParams as psp } from '@/utils/actions/search-params';
import { getOptionsFromConstants } from '@/constants/constants.utils';
import { PROPERTY_TYPE, PROPERTY_TYPE_LABEL } from '@/constants';

import type { PropertyEditOptionModalProps } from './PropertyEditOptionModal.types';
import type { PropertyOption } from '@/features/property/typings';

import { useForm, textInput, phoneInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useArray from '@/hooks/useArray';
import useOnMount from '@/hooks/useOnMount';

export default function PropertyEditOptionModal(props: PropertyEditOptionModalProps) {
    const {} = props;

    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();
    const [ measures, setMeasures] = useState([]);

    const showAddModal = () => {};

    const form = useForm({
        initialState: {
            name: '',
        },
        schema: v.object({}),
    });

    const handleApply = async () => {
    }; 

    return (
        <div>
            <Form action={handleApply}>
                <FormItem label="Значение">
                    <Input {...form.register('name'), textInput} />
                </FormItem>
            </Form>
        </div>
    );
}
