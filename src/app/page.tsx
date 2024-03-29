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
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';

export const metadata: Metadata = {
    title: 'Моя первая страница',
    description: 'Generated by create next app',
};

export default function Home() {
    return (
        <main>
            <Container>
                <Icon icon={FaBeer} />
            </Container>

            <TextBlock
                title="Working with small businesses and supporting our local economy"
                description="We recognize the importance of the American small business community and support buying local whenever possible."
                after={<Button>Купить</Button>}
            />
        </main>
    );
}
