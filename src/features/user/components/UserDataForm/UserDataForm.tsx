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
import Card from '@/components/Card';
import * as v from '@/utils/validate';

export default function UserDataForm() {
    return (
        <Form
            schema={v.object({
                lastName: v.string().required(),
                firstName: v.string().required(),
                patronymic: v.string().required(),
            })}
            disabled
        >
            <FormItem name="lastName" label="Имя">
                <Input />
            </FormItem>
            <FormItem name="firstName" label="Фамилия">
                <Input />
            </FormItem>
            <FormItem name="patronymic" label="Отчество">
                <Input />
            </FormItem>
            <Button type="submit" className="mt-sm">
                Сохранить
            </Button>
        </Form>
    );
}
