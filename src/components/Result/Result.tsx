import React, { useMemo } from 'react';
import './Result.scss';
import classNames from 'classnames';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Title from '@/components/typography/Title';
import Paragraph from '@/components/typography/Paragraph';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';
import type { ResultProps } from './Result.types';
import { HttpStatusCode } from '@/utils/actions/responses';

const Result = (props: ResultProps) => {
    const { response, className, style } = props;

    const title = response.statusCode;
    let icon;
    let content;

    if (response.isSuccess) {
        icon = <Icon icon={<MdCheckCircleOutline />} />;
        content = 'Отлично, мы сделали все операции!';
    } else {
        icon = <Icon icon={<MdErrorOutline />} />;
        if (response.message) {
            content = response.message;
        } else {
            switch (response.statusCode) {
                case HttpStatusCode.BAD_REQUEST:
                    content = 'Что-то пошло не так';
                    break;
                case HttpStatusCode.ACCESS_DENIED:
                    content = 'Отказано в доступе';
                    break;
                case HttpStatusCode.NOT_FOUND:
                    content = 'Страница не найдена';
                    break;
                case HttpStatusCode.INTERNAL_SERVER:
                    content = 'Что-то пошло не так';
                    break;
                default:
                    content = 'Что-то пошло не так';
            }
        }
    }

    const mergedCls = classNames('result', className);

    return (
        <div className={mergedCls} style={style}>
            {icon && (
                <Flex className="result-icon" justify="center">
                    {icon}
                </Flex>
            )}

            <Title className="result-title" align="center" level={2}>
                {title}
            </Title>

            {content && (
                <Paragraph className="result-content" align="center">
                    {content}
                </Paragraph>
            )}
        </div>
    );
};

export default Result;
