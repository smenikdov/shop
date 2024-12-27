'use client';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Flex from '@/components/Flex';
import Form from '@/components/form/Form';
import FormItem from '@/components/form/FormItem';

import * as v from '@/utils/validate';

import { useForm, textInput, baseInput } from '@/hooks/useForm';
import useNotification from '@/features/notification/hooks/useNotification';

import { userUpdateData } from '@/features/user/routes';

export default function UserDataForm() {
    const { notifyError, notifySuccess } = useNotification();

    const form = useForm<{
        fio: string | null;
        birthday: Date | null;
        email: string | null;
    }>({
        schema: v.object({
            fio: v.sn(),
            birthday: v.date().past().nullable(),
            email: v.email().nullable(),
        }),
        initialState: {
            fio: '',
            birthday: null,
            email: '',
        },
    });

    const saveUserDataAction = async () => {
        const { isValid } = form.validate();
        if (!isValid) {
            return;
        }

        const response = await userUpdateData(form.serverState);
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }

        notifySuccess('Данные успешно обновлены!');
    };

    return (
        <Form action={saveUserDataAction} disabled>
            <FormItem label="ФИО">
                <Input {...form.register('fio', textInput)} />
            </FormItem>

            <FormItem label="Email">
                <Input {...form.register('email', textInput)} type="email" />
            </FormItem>

            <Button type="submit" className="mt-sm">
                Сохранить
            </Button>
        </Form>
    );
}
