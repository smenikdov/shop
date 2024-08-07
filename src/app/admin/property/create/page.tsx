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
import styles from './page.module.css';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import Table from '@/components/Table';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';

import type { PageProps, SearchParams } from '@/typings';

import PropertyEditForm from '@/features/property/components/PropertyEditForm';

export const metadata: Metadata = {
    title: 'Админпанель | Добавление свойства',
    description: 'Generated by create next app',
};

export default async function PropertyCreate(props: PageProps) {
    return (
        <main>
            <Container className="my-lg">
                <Breadcrumbs pageNames={{ create: 'Добавление свойства' }} className="mb-lg" />
                <PropertyEditForm isCreate />
            </Container>
        </main>
    );
}
