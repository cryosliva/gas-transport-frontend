/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type LinkProps = {
    className?: string,
    children: Node,
    onClick: () => void,
};

const Link = ({
    className,
    children,
    onClick,
}: LinkProps) => (
    <a className={cn(css.root, className)} onClick={onClick}>
        {children}
    </a>
);

export default Link;
