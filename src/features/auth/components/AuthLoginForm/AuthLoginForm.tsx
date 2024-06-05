'use client';

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
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';

import * as v from '@/utils/validate';

import { useForm, textInput, phoneInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter } from 'next/navigation';

import { authLoginWithPhone } from '@/features/auth/routes';

export default function AuthLoginForm() {
    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const { clientState, serverState, register, validate } = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({
            password: v.password(),
            phone: v.phone(),
        }),
    });

    const loginAction = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        const response = await authLoginWithPhone(serverState);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        router.push('/my');
    };

    return (
        <Form action={loginAction}>
            <FormItem label="Номер телефона">
                <Input {...register('phone', phoneInput)} placeholder="+7 (___) __-__" />
            </FormItem>
            <FormItem label="Пароль">
                <Input {...register('password', textInput)} type="password" />
            </FormItem>
            <Button type="submit">Войти</Button>
        </Form>
    );
}
