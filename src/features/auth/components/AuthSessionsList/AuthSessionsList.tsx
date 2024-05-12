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
import Divider from '@/components/Divider';
import Card from '@/components/Card';
import { authGetAllSessions } from '@/features/auth/routes';
import { formatDate } from '@/utils/date';

export default async function AuthSessionsList() {
    const response = await authGetAllSessions({});
    if (!response.isSuccess || !response.data) {
        return <Result response={response} />;
    }
    const sessions = response.data;

    return (
        <div>
            {sessions.map((session) => (
                <Card key={session.id}>
                    <div>
                        {session.operatingSystem && <Text>{session.operatingSystem}</Text>}
                        {session.operatingSystem && session.browserName && <Divider vertical />}
                        {session.browserName && <Text>Бразер {session.browserName}</Text>}
                    </div>
                    <div>
                        {session.createdAt && (
                            <Text color="grey">{formatDate(new Date(session.createdAt))}</Text>
                        )}
                        {session.createdAt && session.ip && <Divider vertical />}
                        {session.ip && <Text color="grey">{session.ip}</Text>}
                    </div>
                </Card>
            ))}
        </div>
    );
}
