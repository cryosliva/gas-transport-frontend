/* @flow */

import React from 'react';
import cn from 'classnames';

import css from './style.css';

type InputProps = {
    className?: string,
    size?: 's' | 'm',
};

const Input = ({
    className,
    size = 'm',
    ...props
}: InputProps) => (
    <input className={cn(css.root, css[`size_${size}`], className)} {...props} />
);

export default Input;
