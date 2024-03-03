'use client';

import React from 'react';
import type { RadioGroupContext } from './Radio.types';

const GroupContext = React.createContext<RadioGroupContext | null>(null);

export default GroupContext;
