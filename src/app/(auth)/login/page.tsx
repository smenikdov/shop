import { FormEvent } from 'react';
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
import Tooltip from '@/components/floating/Tooltip';
import styles from './page.module.css';
import ModalDialog from '@/components/modal/ModalDialog';
import Flex from '@/components/Flex';
import Card from '@/components/Card';
import type { Metadata } from 'next';
import AuthLoginForm from '@/features/auth/components/AuthLoginForm';

export const metadata: Metadata = {
    title: 'Вход',
    description: 'Generated by create next app',
};

export default function Login() {
    return (
        <main>
            <Container>
                <Flex justify="center" align="center" style={{ height: '80vh' }}>
                    <Card>
                        <AuthLoginForm />
                    </Card>
                </Flex>
            </Container>
        </main>
    );
}
