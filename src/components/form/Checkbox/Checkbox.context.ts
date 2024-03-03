'use client';

import React from 'react';
import type { CheckboxGroupContext } from './Checkbox.types';

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
