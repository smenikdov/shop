'use client';

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
import Button from '@/components/Button';
import Tooltip from '@/components/floating/Tooltip';
import { useState } from 'react';
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Input';
import ModalSlider from '@/components/modal/ModalSlider';
import InputNumber from '@/components/form/InputNumber';
import styles from './page.module.css';

import useBoolean from '@/hooks/useBoolean';

// export const metadata: Metadata = {
//     title: 'Моя первая страница',
//     description: 'Generated by create next app',
// };

export default function Home() {
    const isOpenModal = useBoolean(false);

    return (
        <main>
            <TextBlock
                title="Working with small businesses and supporting our local economy"
                content="We recognize the importance of the American small business community and support buying local whenever possible."
                after={<Button onClick={isOpenModal.setTrue}>Купить</Button>}
            />
            <Container>
                <Tooltip content="asd">
                    <Input />
                </Tooltip>
                <Input className="mt-xl" />
            </Container>

            <ModalSlider isOpen={isOpenModal.value} onClose={isOpenModal.setFalse} title="sad">
                12321
            </ModalSlider>
        </main>
    );
}