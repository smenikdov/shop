'use client';

import React from 'react';
import type { FormItemContext } from './FormItem.types';

const FormItemContext = React.createContext<FormItemContext | null>(null);

export default FormItemContext;
