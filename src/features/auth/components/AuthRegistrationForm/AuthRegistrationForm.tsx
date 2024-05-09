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
import Result from '@/components/Result';
import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import Input from '@/components/form/Input';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';
import Card from '@/components/Card';
import * as v from '@/utils/validate';

import { _authRegistrationWithPhone } from '@/features/auth/routes';

export default function AuthRegistrationForm() {
    return (
        <Form
            action={_authRegistrationWithPhone}
            schema={v.object({
                password: v.password(),
                phone: v.phone(),
            })}
        >
            <FormItem name="phone" label="Номер телефона">
                <Input placeholder="+7 (___) __-__" />
            </FormItem>
            <FormItem name="password" label="Пароль">
                <Input type="password" />
            </FormItem>
            <Button type="submit">Зарегистрироваться</Button>
        </Form>
    );
}
