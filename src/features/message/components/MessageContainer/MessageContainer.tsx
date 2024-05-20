'use client';
import React from 'react';
import './MessageContainer.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import MessageElement from '../MessageElement';
import type { Message } from '../../typings';
import { useAppSelector, useAppDispatch } from '@/hooks/useStore';

const MessageContainer = () => {
    const messages: Array<Message> = useAppSelector((state) => state.message.messages);
    const dispatch = useAppDispatch();

    return (
        <div className="message-container">
            {messages.map((message) => (
                <MessageElement key={message.id} {...message} />
            ))}
        </div>
    );
};

export default MessageContainer;
