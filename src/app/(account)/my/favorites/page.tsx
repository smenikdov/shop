import type { Metadata } from 'next';

import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import Input from '@/components/form/Input';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Card from '@/components/Card';

import TextBlock from '@/widgets/TextBlock/TextBlock';
import FaqBlock from '@/widgets/FaqBlock';

export const metadata: Metadata = {
    title: 'Избранное',
    description: 'Generated by create next app',
};

export default function Contacts() {
    return (
        <main>
            <Container>
                <Row>1</Row>
            </Container>
        </main>
    );
}
