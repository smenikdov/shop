'use client';

import React from 'react';
import type { FormContext } from './Form.types';

const FormContext = React.createContext<FormContext | null>(null);

export default FormContext;
