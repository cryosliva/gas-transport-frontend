/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type ButtonProps = {
    theme: string,
    className: string,
    children: Node,
};

const Button = ({
    theme,
    className,
    children,
    ...props
}: ButtonProps) => (
    <button className={cn(css.root, className, css[theme])} {...props}>
        {children}
    </button>
);

export default Button;
