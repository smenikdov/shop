'use client';
import React from 'react';
import './NotificationContainer.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import NotificationElement from '../NotificationElement';
import type { Notification } from '../../typings';
import { useAppSelector, useAppDispatch } from '@/hooks/useStore';

const NotificationContainer = () => {
    const notifications: Array<Notification> = useAppSelector(
        (state) => state.notification.notifications
    );
    const dispatch = useAppDispatch();

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <NotificationElement key={notification.id} {...notification} />
            ))}
        </div>
    );
};

export default NotificationContainer;
