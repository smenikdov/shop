import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Text from '@/components/typography/Text';
import Paragraph from '@/components/typography/Paragraph';
import Title from '@/components/typography/Title';
import Link from '@/components/typography/Link';
import Icon from '@/components/Icon';
import Empty from '@/components/Empty';
import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import Input from '@/components/form/Input';
import Modal from '@/components/Modal';
import Flex from '@/components/Flex';
import Result from '@/components/Result';
import { _authGetAllSessions } from '@/features/auth/routes';

export default async function AuthSessionsList() {
    const response = await _authGetAllSessions();
    if (!response.isSuccess) {
        return <Result response={response} />;
    }
    const sessions = response.data;

    return JSON.stringify(sessions);
}
