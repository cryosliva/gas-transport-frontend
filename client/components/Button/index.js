/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type ButtonProps = {
    theme?: string,
    className?: string,
    children: Node,
};

const Button = ({
    theme = 'default',
    className,
    children,
    ...props
}: ButtonProps) => (
    <button className={cn(css.root, css[theme], className)} {...props}>
        {children}
    </button>
);

export default Button;
