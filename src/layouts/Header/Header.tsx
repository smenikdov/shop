import React from 'react';
import './Header.scss';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Link from '@/components/typography/Link';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

import { MdOutlineAccountCircle, MdOutlineShoppingBasket } from 'react-icons/md';

import HeaderLogo from './HeaderLogo';

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
        <header className="header">
            <Container>
                <Row className="header-container" align="center">
                    <Col lg={2}>
                        <Link href="/">
                            <HeaderLogo className="header-logo" />
                        </Link>
                    </Col>

                    <Col lg={7}>
                        <Flex>
                            {links.map((link) => (
                                <Link key={link.href} className="header-link" href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </Flex>
                    </Col>

                    <Col lg={3}>
                        <Flex justify="flex-end">
                            <Button
                                href="/login"
                                className="header-login-button"
                                icon={<MdOutlineAccountCircle />}
                            />
                            <Button
                                href="/basket"
                                className="header-login-basket"
                                icon={<MdOutlineShoppingBasket />}
                            />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
