'use client';
import React, { useState } from 'react';
import './FormItem.scss';
import classNames from 'classnames';
import Row from '@/components/grid/Row';
import Col, { ColProps } from '@/components/grid/Col';
import FormContext from '@/components/form/Form/Form.context';
import type { FormItemProps } from './FormItem.types';

const FormItem = (props: FormItemProps) => {
    const {
        className,
        style,
        children,
        label,
        layout = 'vertical',
        name,
        required = false,
        ...othersProps
    } = props;

    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    const formContext = React.useContext(FormContext);
    const schema = formContext?.schema;

    const validate = (value: any) => {
        if (schema && name && name in schema) {
            const validationResult = schema[name].validate(value);
            if (!validationResult.isValid) {
                setIsValid(false);
                setError(validationResult.error);
            }
        }
    };

    const mergedCls = classNames(className, 'form-item', `form-item-${layout}`, {
        'form-item-required': required,
    });

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
            </Col>
        </Row>
    );
};

export default FormItem;
