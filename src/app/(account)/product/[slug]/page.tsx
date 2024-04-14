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
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';

import ProductPrice from '@/features/product/components/ProductPrice';
import ProductAdvantagesList from '@/features/product/components/ProductAdvantagesList';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductProperties from '@/features/product/components/ProductProperties';

export const metadata: Metadata = {
    title: 'Моя первая страница',
    description: 'Generated by create next app',
};

const product = {
    title: 'Cookware Set',
    description:
        'This non‑alcoholic herbal tincture is crafted to help you wind down before bedtime. It is a blend of restorative herbs and nervines that have traditionally been known to calm restless minds and relax the central nervous system so you can gently slip into dreamland. Keep it by your bedside so you are always 2 dropperfuls away from a peaceful night of sleep.',
    id: 4325,
    rating: 4.3,
    price: 99.99,
    prevPrice: 125,
    discount: 20.2,
    advantages: [
        {
            header: 'Size',
            content: '153mm x 215mm',
        },
        {
            header: 'Paper quality',
            content:
                '96 leaves (192 sides) of paper. The inner pages are 100gsm. Its hardback cover is 3mm thick with a 150gsm silk paper finish.',
        },
        {
            header: 'Returns',
            content:
                "Due to the personalised nature of these products, we don’t typically accept returns. However, if you're not 100% happy with your order, get in touch within 30 days of your order date and we'll sort it.",
        },
    ],
    properties: [
        {
            name: 'Серия',
            value: 'UnicornBook. Мега-бестселлеры в мини-формате',
        },
        {
            name: 'ISBN',
            value: '978-5-04-114126-4',
        },
        {
            name: 'Год выпуска',
            value: '2023',
        },
        {
            name: 'Автор',
            value: 'Эриксон Томас',
        },
        {
            name: 'Серия',
            value: 'UnicornBook. Мега-бестселлеры в мини-формате',
        },
        {
            name: 'ISBN',
            value: '978-5-04-114126-4',
        },
        {
            name: 'Год выпуска',
            value: '2023',
        },
        {
            name: 'Автор',
            value: 'Эриксон Томас',
        },
    ],
};

export default function Home() {
    return (
        <main>
            <Container>
                <Flex>
                    <Breadcrumbs />
                    <div />
                </Flex>
            </Container>

            <Container>
                <Row>
                    <Col md={7}>{/* <ProductImage/> */}</Col>
                    <Col md={5}>
                        <div>
                            <Title level={1}>{product.title}</Title>
                            {/* <Rating
                                value={rating}
                                readonly
                            /> */}
                            <ProductPrice
                                price={product.price}
                                prevPrice={product.prevPrice}
                                discount={product.discount}
                            />
                            {/* <ProductAddButton/> */}
                            <Paragraph>{product.description}</Paragraph>
                            <ProductAdvantagesList advantages={product.advantages} />
                        </div>
                    </Col>
                </Row>
            </Container>

            <ProductProperties properties={product.properties} />

            {/* Product */}
        </main>
    );
}