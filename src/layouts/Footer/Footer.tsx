import React from 'react';
import styles from './Footer.module.scss';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Link from '@/components/typography/Link';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { CiYoutube } from 'react-icons/ci';

import FooterLogo from './FooterLogo';
import Paragraph from '@/components/typography/Paragraph';

const linksSections = [
    {
        title: 'Ссылки 1',
        links: [
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
        ],
    },

    {
        title: 'Ссылки 2',
        links: [
            {
                label: 'Каталог',
                href: '/product2',
            },
            {
                label: 'FAQ',
                href: '/faq2',
            },
            {
                label: 'Контакты',
                href: '/contacts2',
            },
            {
                label: 'Скидка 15%',
                href: '/discount2',
            },
        ],
    },
];

const socialLinks = [
    {
        name: '',
        href: '/',
        icon: <CiYoutube />,
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row align="center">
                    <Col lg={8}>
                        <FooterLogo className="footer-logo" />
                        <Flex>
                            {linksSections.map((section, index) => (
                                <div key={index} className="footer-links-section">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.href}
                                            className="footer-link"
                                            href={link.href}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </Flex>
                        <Flex>
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    className="footer-social-button"
                                    href={link.href}
                                    icon={link.icon}
                                />
                            ))}
                        </Flex>
                    </Col>

                    <Col lg={4}></Col>
                </Row>

                <Divider />

                <Paragraph>
                    These statements have not been evaluated by the Food and Drug Administration.
                    This product is not intended to diagnose, treat, cure or prevent any disease.
                    References: *Nutrition studies: 500mg Mitopure® have been shown to (1) induce
                    gene expression related to mitochondria function and metabolism and (2) increase
                    the strength of the hamstring leg muscle in measures of knee extension and
                    flexion in overweight 40-65 year olds. Data from two randomized double-blind
                    placebo-controlled human clinical trials. **Nutrition NOURISH Study: 500mg
                    Mitopure® have been shown to deliver at least 6 times higher Urolithin A plasma
                    levels over 24 hours (area under the curve) than 8 ounces (240ml) of pomegranate
                    juice in a randomized human clinical trial.
                </Paragraph>

                <Divider />

                <Flex justify="space-between">
                    <Flex>
                        <div>© 2024</div>
                        <Link href="/">Terms & Conditions</Link>
                        <Link href="/">Privacy Policy</Link>
                    </Flex>
                    <div></div>
                </Flex>
            </Container>
        </footer>
    );
};

export default Footer;
