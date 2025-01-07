import type React from 'react';
import type { SessionListItem } from '@/features/auth/typings';

export interface AuthSessionsListProps {
    sessions: Array<SessionListItem>;
}
