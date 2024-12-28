import React from 'react';
import styles from './Header.module.scss';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Link from '@/components/typography/Link';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

import { MdOutlineAccountCircle } from 'react-icons/md';

import HeaderLogo from './HeaderLogo';

import BasketButton from '@/features/basket/components/BasketButton';

const links = [
    {
        label: 'Каталог',
        href: '/product',
    },
    {
        label: 'FAQ',
        href: '/faq',
    },
    {
        label: 'Контакты',
        href: '/contacts',
    },
    {
        label: 'Скидка 15%',
        href: '/discount',
    },
];

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Row className={styles.container} align="center">
                    <Col lg={2}>
                        <Link href="/">
                            <HeaderLogo className={styles.logo} />
                        </Link>
                    </Col>

                    <Col lg={7}>
                        <Flex>
                            {links.map((link) => (
                                <Link key={link.href} className={styles.link} href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </Flex>
                    </Col>

                    <Col lg={3}>
                        <Flex justify="flex-end">
                            <Button
                                href="/my"
                                shape="circle"
                                variant="text"
                                className={styles.loginButton}
                                icon={<MdOutlineAccountCircle />}
                            />
                            <BasketButton className={styles.loginBasket} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
