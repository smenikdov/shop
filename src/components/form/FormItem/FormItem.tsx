'use client';
import React, { useEffect, useState } from 'react';
import './FormItem.scss';
import classNames from 'classnames';
import Row from '@/components/grid/Row';
import Col, { ColProps } from '@/components/grid/Col';
import FormContext from '@/components/form/Form/Form.context';
import type { FormItemProps } from './FormItem.types';
import Text from '@/components/typography/Text';

const FormItem = (props: FormItemProps) => {
    const { className, style, children, label, layout = 'vertical', ...othersProps } = props;

    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    const formContext = React.useContext(FormContext);

    const mergedCls = classNames(className, 'form-item', `form-item-${layout}`);

    const labelColProps: ColProps =
        layout === 'vertical'
            ? {}
            : {
                  sm: 12,
                  md: 6,
                  lg: 4,
                  xl: 3,
              };
    const controlColProps: ColProps =
        layout === 'vertical'
            ? {}
            : {
                  sm: 12,
                  md: 6,
                  lg: 8,
                  xl: 9,
              };

    return (
        <Row className={mergedCls} style={style} {...othersProps}>
            <Col {...labelColProps}>
                {label && <label className="form-item-label">{label}</label>}
            </Col>
            <Col {...controlColProps}>
                {children && <div className="form-item-control">{children}</div>}
                {error && (
                    <div className="form-item-error">
                        <Text color="danger">{error}</Text>
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default FormItem;
