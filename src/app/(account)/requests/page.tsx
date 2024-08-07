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
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Input';
import ModalDialog from '@/components/modal/ModalDialog';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Связаться с нами',
    description: 'Generated by create next app',
};
export default function Contacts() {
    return (
        <main>
            <Container>
                <Breadcrumbs className="mt-xl mb-xs" />
            </Container>
        </main>
    );
}
