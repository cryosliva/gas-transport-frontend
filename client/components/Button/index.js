/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type ButtonProps = {
    size?: 's' | 'm',
    theme?: string,
    className?: string,
    children: Node,
};

const Button = ({
    size = 'm',
    theme = 'default',
    className,
    children,
    ...props
}: ButtonProps) => (
    <button className={cn(css.root, css[theme], css[`size_${size}`], className)} {...props}>
        {children}
    </button>
);

export default Button;
