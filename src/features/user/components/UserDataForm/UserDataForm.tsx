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

import { useForm, textInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';
import useOnMount from '@/hooks/useOnMount';

export default function UserDataForm() {
    const { notifyError, notifySuccess } = useNotification();

    const { clientState, serverState, register, validate } = useForm({
        schema: v.object({
            lastName: v.string().required(),
            firstName: v.string().required(),
            patronymic: v.string().required(),
        }),
        initialState: {
            page: 1,
            userId: 0,
            email: '',
            phone: '',
        },
    });

    const saveUserDataAction = async () => {
        const { isValid } = validate();
        if (!isValid) {
            return;
        }

        // const response = await userGetAll(serverState);
        // if (!response.isSuccess) {
        //     notifyError(response.message);
        //     return;
        // }
    };

    return (
        <Form action={saveUserDataAction} disabled>
            <FormItem label="Имя">
                <Input {...register('lastName', textInput)} />
            </FormItem>
            <FormItem label="Фамилия">
                <Input {...register('firstName', textInput)} />
            </FormItem>
            <FormItem label="Отчество">
                <Input {...register('patronymic', textInput)} />
            </FormItem>
            <Button type="submit" className="mt-sm">
                Сохранить
            </Button>
        </Form>
    );
}
