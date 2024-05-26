import { useFormState } from 'react-dom';
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
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import { formatPhoneNumber } from '@/utils/text';
import { userGetAll } from '@/features/user/routes';
import Result from '@/components/Result';

const columns = [
    {
        title: 'ID',
        name: 'id',
    },
    {
        title: 'Email',
        name: 'email',
        render: (email: string) => (email ? <a href={`mailto:+${email}`}>{email}</a> : '—'),
    },
    {
        title: 'Телефон',
        name: 'phone',
        render: (phone: string) =>
            phone ? <a href={`tel:+${phone}`}>{formatPhoneNumber(phone)}</a> : '—',
    },
    {
        title: 'ФИО',
        name: 'fio',
    },
];

export default async function UsersList() {
    const response = await userGetAll({});
    if (!response.isSuccess || !response.data) {
        return <Result response={response} />;
    }
    const users = response.data;

    return <Table columns={columns} data={users} />;
}
