import type { Metadata } from 'next';

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
import Input from '@/components/form/Field';
import Modal from '@/components/Modal';
import InputNumber from '@/components/form/InputNumber';
import Flex from '@/components/Flex';

import TextBlock from '@/widgets/TextBlock/TextBlock';
import AdvantagesBlock from '@/widgets/AdvantagesBlock';

export const metadata: Metadata = {
    title: 'Контакты',
    description: 'Generated by create next app',
};

export default function Contacts() {
    return (
        <main>
            <TextBlock
                title="We’re here to help"
                content="We’ve gathered some common questions below, plus different ways you can contact our team. Based on thousands of reviews, we’ve been rated 4.7/5 stars. If you cant find the answer you’re looking for below, just send us a (virtual) note."
                after={<Button>Get in touch</Button>}
            />

            <AdvantagesBlock
                title="Our most common queries"
                advantages={[
                    {
                        content: (
                            <div>
                                <Paragraph>I need to cancel/change my order</Paragraph>
                                <Link href="/">Get in tourch</Link>
                            </div>
                        ),
                        image: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1',
                    },
                    {
                        content: (
                            <div>
                                <Paragraph>I need help personalising my order</Paragraph>
                                <Link href="/">Get in tourch</Link>
                            </div>
                        ),
                        image: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1',
                    },
                    {
                        content: (
                            <div>
                                <Paragraph>How long will my order take to arrive?</Paragraph>
                                <Link href="/">Get in tourch</Link>
                            </div>
                        ),
                        image: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1',
                    },
                    {
                        content: (
                            <div>
                                <Paragraph>I need help with my wedding stationery</Paragraph>
                                <Link href="/">Get in tourch</Link>
                            </div>
                        ),
                        image: 'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1',
                    },
                ]}
            />

            <TextBlock
                content="Can’t find what you’re looking for? Our FAQs page may have a quick answer to your question. Otherwise, get in touch below."
                after={<Button>Go to FAQs page</Button>}
            />

            <Container></Container>
        </main>
    );
}