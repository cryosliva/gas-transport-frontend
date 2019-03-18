/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type LinkProps = {
    className?: string,
    children: Node,
    onClick?: () => void,
    href?: string,
};

const Link = ({
    className,
    children,
    onClick,
    href,
}: LinkProps) => (
    <a
        className={cn(css.root, className)}
        onClick={onClick}
        href={href}
    >
        {children}
    </a>
);

export default Link;
