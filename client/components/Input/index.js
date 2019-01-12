/* @flow */

import React from 'react';
import cn from 'classnames';

import css from './style.css';

type InputProps = {
    className: string,
};

const Input = ({className, ...props}: InputProps) => (
    <input className={cn(css.root, className)} {...props} />
);

export default Input;
