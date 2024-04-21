import type React from 'react';

export interface QuestionType {
    question: React.ReactNode;
    answer: React.ReactNode;
}

export interface FaqBlockProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
    before?: React.ReactNode;
    after?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    questions: Array<QuestionType>;
}
