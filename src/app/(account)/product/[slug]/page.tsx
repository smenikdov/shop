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
import type { Metadata } from 'next';
import TextBlock from '@/widgets/TextBlock/TextBlock';
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';
import Breadcrumbs from '@/components/Breadcrumbs';
import Rating from '@/components/form/Rating';

import ProductPrice from '@/features/product/components/ProductPrice';
import ProductAdvantagesList from '@/features/product/components/ProductAdvantagesList';
import ProductProperties from '@/features/product/components/ProductProperties';
import ProductDescription from '@/features/product/components/ProductDescription';
import ProductImages from '@/features/product/components/ProductImages';

import BannerBlock from '@/widgets/BannerBlock';

export const metadata: Metadata = {
    title: 'Страница товара',
    description: 'Generated by create next app',
};

const product = {
    name: 'Cookware Set',
    shortDescription:
        'This non‑alcoholic herbal tincture is crafted to help you wind down before bedtime. It is a blend of restorative herbs and nervines that have traditionally been known to calm restless minds and relax the central nervous system so you can gently slip into dreamland. Keep it by your bedside so you are always 2 dropperfuls away from a peaceful night of sleep.',
    longDescription: `ФЕНОМЕН ШВЕДСКОГО КНИГОИЗДАНИЯ
    «Кругом одни идиоты» побили все рекорды шведского книжного рынка!  Они стали одной из немногих скандинавских книг по популярной психологии, которая была переведена на 22 языка и продана общим тиражом 550 000 экземпляров! В течение двух лет книга держится в Топ-5 нехудожественных произведений среди всех скандинавских изданий и не собирается сдавать позиций. 
    
    В ЧЕМ СЕКРЕТ УСПЕХА
    
    В основе книги лежит несложная методика цветотипирования человеческих характеров. Шведский психолог Томас Эриксон делит всех людей на четыре типа: красный, желтый, зеленый, синий — и очень увлекательно, на узнаваемых примерах описывает логику поведения, темперамент, систему ценностей представителей каждого типа. Казалось бы, ничего нового. Подобный подход использовался психологами на протяжении десятилетий. Но Томасу Эриксону удалось придумать настолько удобную систему работы с известными инструментами, что сегодня книга «Кругом одни идиоты» лежит на столько каждого шведского руководителя, учителя и журналиста. 
    
    ЧЕМУ УЧИТ ЭТА КНИГА
    
    Прежде всего тому, как понимать тех, кого понять решительно невозможно — людей с максимально отличным от нашего образом мышления, темпераментом и системой ценностей. Эту книгу можно назвать универсальной отмычкой к личности любого человека. Томас Эриксон помогает не только понять, что происходит в чужой голове и душе, но и позволяет понять, как вас воспринимают окружающие. 
    
    ОБ АВТОРЕ
    
    Шведский психолог, бизнес-тренер, коуч, специалист по коммуникациям. Автор двух международных бестселлеров «Кругом одни идиоты» и «Кругом одни психопаты».`,
    id: 4325,
    rating: 4.3,
    price: 99.99,
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
    images: [
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1', alt: 'my image' },
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=2', alt: 'my image' },
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=3', alt: 'my image' },
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=4', alt: 'my image' },
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=5', alt: 'my image' },
        { src: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=6', alt: 'my image' },
    ],
    offer: undefined,
};

export default function Home() {
    return (
        <main>
            <Container>
                <Flex justify="space-between">
                    <Breadcrumbs />
                    <div>
                        <Text color="grey">Код товара: {product.id}</Text>
                    </div>
                </Flex>
            </Container>

            <Container>
                <Row>
                    <Col xl={7}>
                        <ProductImages images={product.images} />
                    </Col>
                    <Col xl={5}>
                        <div>
                            <Title level={1}>{product.name}</Title>
                            <Flex>
                                <Rating rating={product.rating} readOnly />
                                <Text color="grey">({product.rating})</Text>
                            </Flex>
                            <ProductPrice price={product.price} offer={product.offer} />
                            {/* <ProductAddButton/> */}
                            <Paragraph>{product.shortDescription}</Paragraph>
                            <ProductAdvantagesList advantages={product.advantages} />
                        </div>
                    </Col>
                </Row>
            </Container>

            {product.longDescription && (
                <ProductDescription description={product.longDescription} />
            )}
            {product.properties.length > 0 && <ProductProperties properties={product.properties} />}
        </main>
    );
}
