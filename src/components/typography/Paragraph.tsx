import React from 'react';
import type { ParagraphProps } from './Typography.types';
import Typography from './Typography';

const Paragraph = (props: ParagraphProps) => <Typography {...props} component="p" />;

export default Paragraph;
