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
import Tooltip from '@/components/Tooltip';
import styles from './page.module.css';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import type { Metadata } from 'next';
import AuthRegistrationForm from '@/features/auth/components/AuthRegistrationForm';

export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'Generated by create next app',
};

export default function Registration() {
    return (
        <main>
            <Container>
                <Flex justify="center">
                    <Card>
                        <AuthRegistrationForm />
                    </Card>
                </Flex>
            </Container>
        </main>
    );
}
