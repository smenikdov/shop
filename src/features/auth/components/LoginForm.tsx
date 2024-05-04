'use client';
import { useFormState } from 'react-dom';
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
import Input from '@/components/form/Input';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';

import { _authLoginWithEmail } from '@/features/auth/routes';

export default function LoginForm() {
    const [formState, formAction] = useFormState(_authLoginWithEmail, undefined);

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" placeholder="Email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Input id="password" name="password" type="password" />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}
