/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type CheckboxProps = {
    checked: boolean,
    theme?: string,
    className?: string,
    children: Node,
    onChange: () => void,
    value: string,
};

const Checkbox = ({
    checked = false,
    children,
    onChange,
    value,
    className,
}: CheckboxProps) => (
    <label className={cn(css.root, className)}>
        <input
            type="checkbox"
            value={value} 
            checked={checked} 
            onChange={onChange} 
        />
        <div className={css.title}>{children}</div>
    </label>
);

export default Checkbox;
