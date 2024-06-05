import { plexSans } from '@/ui/fonts';
import '@/styles/index.scss';
import StoreProvider from '@/context/StoreProvider';
import { InitialDataProvider } from '@/context/InitialDataProvider';
import NotificationContainer from '@/features/notification/components/NotificationContainer';
import MessageContainer from '@/features/message/components/MessageContainer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={plexSans.className}>
                <StoreProvider>
                    <InitialDataProvider>
                        {children}
                        <NotificationContainer />
                        <MessageContainer />
                    </InitialDataProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
