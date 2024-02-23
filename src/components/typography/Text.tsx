import React from 'react';
import type { TextProps } from './Typography.types';
import Typography from './Typography';

const Text = (props: TextProps) => <Typography {...props} component="span" />;

export default Text;
