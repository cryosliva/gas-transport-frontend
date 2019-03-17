/* @flow */

import React, {type Node} from 'react';

import css from './style.css';

type RadioButtonProps = {
    checked: string,
    name: string,
    value: string,
    children: Node,
    onChange: () => void,
};

const RadioButton = ({
    checked,
    children,
    onChange,
    value,
}: RadioButtonProps) => (
    <label className={css.root}>
        <input
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}
        />
        <div className={css.title}>{children}</div>
    </label>
);

export default RadioButton;
