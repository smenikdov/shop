import type { Metadata } from 'next';

import Container from '@/components/grid/Container';
import Breadcrumbs from '@/components/Breadcrumbs';

import type { PageProps } from '@/typings';

export const metadata: Metadata = {
    title: 'Админпанель | Свойства категории',
    description: 'Generated by create next app',
};

export default async function CategoryEdit(props: PageProps<{ id: string }>) {
    return (
        <main>
            <Container className="my-lg">
                <Breadcrumbs
                    pageNames={{ [`${ props.params.id }`]: 'Редактирование категории' }}
                    className="mb-lg"
                />

                TODO
            </Container>
        </main>
    );
}
