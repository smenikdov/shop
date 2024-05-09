'use client';
import React, { useEffect, useState } from 'react';
import './FormItem.scss';
import classNames from 'classnames';
import Row from '@/components/grid/Row';
import Col, { ColProps } from '@/components/grid/Col';
import FormContext from '@/components/form/Form/Form.context';
import type { FormItemProps } from './FormItem.types';
import FormItemContext from './FormItem.context';
import Text from '@/components/typography/Text';

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

    useEffect(() => {
        if (formContext && formContext.response) {
            if (formContext.response.isSuccess) {
            } else {
                if (formContext.response.error && name && name in formContext.response.error) {
                    setIsValid(false);
                    if (typeof formContext.response.error[name] === 'string') {
                        setError(formContext.response.error[name]);
                    } else {
                        setError('');
                    }
                } else {
                    setIsValid(true);
                    setError('');
                }
            }
        }
    }, [formContext]);

    // const schema = formContext?.schema;
    // const validate = (value: any) => {
    //     if (schema && name && name in schema) {
    //         const validationResult = schema[name].validate(value);
    //         if (!validationResult.isValid) {
    //             setIsValid(false);
    //             setError(validationResult.error);
    //         }
    //     }
    // };

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

    const formItemContext = { name, required, isValid, error };

    return (
        <FormItemContext.Provider value={formItemContext}>
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
        </FormItemContext.Provider>
    );
};

export default FormItem;
