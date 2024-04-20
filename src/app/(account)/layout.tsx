import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
