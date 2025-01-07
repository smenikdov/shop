import type { Metadata } from 'next';

import Container from '@/components/grid/Container';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Empty from '@/components/Empty';
import Result from '@/components/Result';
import Button from '@/components/Button';
import Tooltip from '@/components/floating/Tooltip';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import Table from '@/components/Table';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';
import Property from '@/components/Property';

import { USER_ROLE_LABEL } from '@/constants';
import { formatPhoneNumber } from '@/utils/text';

import type { PageProps, SearchParams } from '@/typings';

import { userGetDetails } from '@/features/user/routes';

export const metadata: Metadata = {
    title: 'Админпанель | Детализация пользователя',
    description: 'Generated by create next app',
};

export default async function PropertyEdit(props: PageProps<{ id: string }>) {
    const userId = Number(props.params.id);
    const response = await userGetDetails({ userId });
    if (!response.isSuccess) {
        throw new Error('Ошибка при загрузке страницы');
    }
    const userData = response.data;

    return (
        <main>
            <Container className="my-lg">
                <Breadcrumbs
                    pageNames={{ [`${props.params.id}`]: 'Детализация пользователя' }}
                    className="mb-lg"
                />
                <Title level={2} className="mb-lg">
                    Детализация пользователя
                </Title>
                <Flex direction="column">
                    <Property name="Фамилия" value={userData.lastName} />
                    <Property name="Имя" value={userData.firstName} />
                    <Property name="Отчество" value={userData.patronymic} />
                    <Property
                        name="Почта"
                        value={
                            userData.email ? (
                                <a href={`mailto:+${userData.email}`}>{userData.email}</a>
                            ) : (
                                '—'
                            )
                        }
                    />
                    <Property
                        name="Телефон"
                        value={
                            userData.phone ? (
                                <a href={`tel:+${userData.phone}`}>
                                    {formatPhoneNumber(userData.phone)}
                                </a>
                            ) : (
                                '—'
                            )
                        }
                    />
                    <Property name="Роль" value={USER_ROLE_LABEL[userData.role]} />
                </Flex>
            </Container>
        </main>
    );
}
