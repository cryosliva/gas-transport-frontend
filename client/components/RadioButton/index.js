/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

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
    // name,
    value,
}: RadioButtonProps) => (
    <label className={css.root}>
        {/* {console.log(checked, value)} */}
        <input
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}
        />
        {/* <div className={css.checkbox} onClick={onClick}>
            {checked && <span className={css.checkmark} />}
        </div> */}
        <div className={css.title}>{children}</div>
    </label>
);

export default RadioButton;
