import type React from 'react';

import type { AnyObject, CustomComponent } from '@/typings';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fluid?: boolean;
    component?: CustomComponent<AnyObject>;
}
