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
import QuestionTooltip from '@/components/floating/QuestionTooltip';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Card from '@/components/Card';

import * as v from '@/utils/validate';

import { useForm, textInput, phoneInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import { useRouter } from 'next/router';

import { authRegistrationWithPhone } from '@/features/auth/routes';

export default function AuthRegistrationForm() {
    const { notifyError, notifySuccess } = useNotification();
    const router = useRouter();

    const {
        serverState: stateStep1,
        register: registerStep1,
        validate: validateStep1,
    } = useForm({
        initialState: {
            password: '',
            phone: '',
        },
        schema: v.object({
            password: v.password(),
            phone: v.phone(),
        }),
    });

    // const {
    //     serverState: stateStep2,
    //     register: registerStep2,
    //     validate: validateStep2,
    // } = useForm({
    //     initialState: {
    //         code: '',
    //     },
    //     schema: v.object({
    //         code: v.code(),
    //     }),
    // });

    const registerAction = async () => {
        const { isValid } = validateStep1();
        if (!isValid) {
            return;
        }

        // const response = await authRegistrationWithPhone(serverState);
        // if (!response.isSuccess) {
        //     notifyError(response.message);
        //     return;
        // }

        // router.push('/my');
    };

    return (
        <Form action={registerAction}>
            <FormItem label="Номер телефона">
                <Input {...registerStep1('phone', phoneInput)} placeholder="+7 (___) __-__" />
            </FormItem>
            <FormItem label="Пароль">
                <Input {...registerStep1('password', textInput)} type="password" />
            </FormItem>
            <Button type="submit">Зарегистрироваться</Button>
        </Form>
    );
}
