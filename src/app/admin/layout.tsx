import AdminHeader from '@/layouts/AdminHeader';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AdminHeader />
            {children}
        </>
    );
}
