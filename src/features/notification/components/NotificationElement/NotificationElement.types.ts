import type React from 'react';
import { BaseColors } from '@/typings';

export interface NotificationElementProps {
    title: string;
    message: string;
    color?: BaseColors;
}
