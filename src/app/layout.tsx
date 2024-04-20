import { plexSans } from '@/ui/fonts';
import '@/styles/index.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={plexSans.className}>{children}</body>
        </html>
    );
}
