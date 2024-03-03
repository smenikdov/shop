import Image from 'next/image';
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
import { FaBeer } from 'react-icons/fa';
import styles from './page.module.css';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Home() {
    return (
        <main>
            <Container>
                <Breadcrumbs />
                <Title>4234fsd</Title>
                <Icon icon={FaBeer} />
                <Button>asdasd</Button>
            </Container>
        </main>
    );
}
