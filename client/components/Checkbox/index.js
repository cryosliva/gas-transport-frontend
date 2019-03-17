/* @flow */

import React, {type Node} from 'react';

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
}: CheckboxProps) => (
    <label className={css.root}>
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
