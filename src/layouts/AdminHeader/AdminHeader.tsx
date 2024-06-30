import React from 'react';
import styles from './AdminHeader.module.scss';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Link from '@/components/typography/Link';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

import { MdOutlineAccountCircle, MdOutlineShoppingBasket } from 'react-icons/md';

const links = [
    {
        label: 'Пользователи',
        href: '/admin/user',
    },
    {
        label: 'Баланс',
        href: '/admin/payment',
    },
    {
        label: 'Заказы',
        href: '/admin/order',
    },
    {
        label: 'Каталог',
        href: '/admin/product',
    },
];

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Row className={styles.container} align="center">
                    <Col lg={10}>
                        <Flex>
                            {links.map((link) => (
                                <Link key={link.href} className={styles.link} href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </Flex>
                    </Col>

                    <Col lg={2}>
                        <Flex justify="flex-end">
                            <Button
                                href="/my"
                                className={styles.loginButton}
                                shape="circle"
                                variant="text"
                                icon={<MdOutlineAccountCircle />}
                            />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
