import type { Metadata } from 'next';

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
import styles from './page.module.css';
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import Flex from '@/components/Flex';
import UsersList from '@/features/user/components/UsersList';
import { formatPhoneNumber } from '@/utils/text';

export const metadata: Metadata = {
    title: 'Админпанель | Пользователи',
    description: 'Generated by create next app',
};

export default function Users() {
    return (
        <main>
            <Container>
                <UsersList />
            </Container>
        </main>
    );
}
