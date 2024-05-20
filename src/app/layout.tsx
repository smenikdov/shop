import { plexSans } from '@/ui/fonts';
import '@/styles/index.scss';
import StoreProvider from '@/context/StoreProvider';
import NotificationContainer from '@/features/notification/components/NotificationContainer';
import MessageContainer from '@/features/message/components/MessageContainer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={plexSans.className}>
                <StoreProvider>
                    {children}
                    <NotificationContainer />
                    <MessageContainer />
                </StoreProvider>
            </body>
        </html>
    );
}
